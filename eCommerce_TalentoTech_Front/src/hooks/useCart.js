import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Importación corregida
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

  const checkIfUserHasCart = async (userId) => {
    const token = localStorage.getItem("authToken");
    if (!token || !isTokenValid(token)) {
      navigate("/login");
      console.error("Token no disponible o inválido");
      return 0;
    }
  
    try {
      const cartCheckPayload = { userId };
      const base64Payload = btoa(JSON.stringify(cartCheckPayload));
  
      const response = await axios.post(
        Global.url + "carts/findCartByUser",
        base64Payload,
        {
          headers: {
            "Content-Type": "text/plain",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Paso 1: Decodificar la respuesta Base64
      const base64Response = response.data;
      const decodedString = atob(base64Response); // Decodificamos la respuesta Base64
  
      // Paso 2: Parseamos el JSON decodificado
      const parsedResponse = JSON.parse(decodedString);
      console.log("Parsed Response from Backend:", parsedResponse);
  
      // Paso 3: Extraemos y parseamos el campo 'data' (ya es un JSON válido)
      const innerData = parsedResponse?.data;
      const innerParsedData = JSON.parse(innerData); // Parseamos el contenido del campo 'data'
      console.log("Decoded Inner Data:", innerParsedData);
  
      // Extraer el cartId del JSON decodificado
      const cartId = innerParsedData.cartId || 0;
      console.log("Cart ID obtenido:", cartId);
      return cartId;
  
    } catch (error) {
      console.error("Error en checkIfUserHasCart:", error);
      setError("Error al verificar el carrito");
      return 0;
    }
  };
  

  const addToCart = async (product) => {
    const token = localStorage.getItem("authToken");

    if (!token || !isTokenValid(token)) {
      navigate("/login");
      console.error("Token no disponible o inválido");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = parseInt(decodedToken.sub);
      const usernamePayload = { id: userId };
      const base64UsernamePayload = btoa(JSON.stringify(usernamePayload));

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

      const userNameData = JSON.parse(atob(userNameResponse.data));
      const { userName } = userNameData.data;

      // Verificar si el usuario ya tiene un carrito existente
      const cartId = await checkIfUserHasCart(userId);
      console.log("Response from cart check:", cartId);

      const cartPayload = {
        cartId, // Usar el ID del carrito existente o 0
        inventoryId: product.id,
        quantity: 1,
        userId,
        createUser: userName,
      };
      console.log("Response from cart check:", cartPayload.cartId);
      console.log("Response from cart check:", cartPayload.inventoryId);
      console.log("Response from cart check:", cartPayload);
      

      const base64CartPayload = btoa(JSON.stringify(cartPayload));

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
