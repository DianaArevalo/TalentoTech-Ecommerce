import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Importación correcta
import { Global } from "../helpers/Global";

const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const isTokenValid = (token) => {
    try {
      if (token.split(".").length !== 3) {
        return false;
      }

      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        console.error("Token ha expirado");
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      return false;
    }
  };

  const addToCart = async (product) => {
    console.log(product, "id");
    const token = localStorage.getItem("authToken");
    console.log("Token:", token);

    if (!token || !isTokenValid(token)) {
      navigate("/login");
      console.error("Token no disponible o inválido");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);

      const userId = parseInt(decodedToken.sub);
      console.log("userId", typeof userId);

      const usernamePayload = { id: userId };
      const base64UsernamePayload = btoa(JSON.stringify(usernamePayload));

      console.log(base64UsernamePayload, "user");

      const userNameResponse = await axios.post(
        Global.url + "users/list/id",
        base64UsernamePayload,
        {
          headers: {
            "Content-Type": "text/plain",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response from server:", userNameResponse.data);

      // Verifica que el dato a decodificar sea válido
      try {
        const userNameData = atob(userNameResponse.data);
        console.log(userNameData, 'objeto')
        const jsonUserName  = JSON.parse(userNameData);
        const {userName} = jsonUserName.data
        console.log(userName, 'userName')

        const cartPayload = {
          cartId: 1,
          inventoryId: product.id,
          quantity: 1,
          userId,
          createUser: userName,
        };

        const base64CartPayload = btoa(JSON.stringify(cartPayload));
        console.log(base64CartPayload, "base64");

        const response = await axios.post(
          Global.url + "carts/addToCart",
          base64CartPayload,
          {
            headers: {
              "Content-Type": "text/plain",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const base64Data = response.data;
        if (base64Data && base64Data.length % 4 === 0) {
          const jsonString = atob(base64Data);
          const data = JSON.parse(jsonString);
          setCartItems(data.cartItems);
        } else {
          console.error("Invalid Base64 string:", base64Data);
          setError("Invalid data format from server");
        }
      } catch (decodeError) {
        console.error("Error decoding Base64:", decodeError);
        setError("Error decoding server response");
      }
    } catch (error) {
      console.error("Error en addToCart:", error);
      setError("Error al agregar el producto al carrito");
    }
  };

  return {
    cartItems,
    addToCart,
    error,
  };
};

export default useCart;
