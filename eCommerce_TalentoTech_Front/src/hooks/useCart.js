import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Importación corregida
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

      const base64Response = response.data;
      const decodedString = atob(base64Response);
      const parsedResponse = JSON.parse(decodedString);
      const innerData = parsedResponse?.data;
      const innerParsedData = JSON.parse(innerData);

      const cartId = innerParsedData.cartId || 0;
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
      const cartId = await checkIfUserHasCart(userId);

      const cartPayload = {
        cartId,
        inventoryId: product.inventoryId,
        quantity: 1,
        userId,
        createUser: userName,
      };

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

  const validateCart = async () => {
    const token = localStorage.getItem("authToken");
  
    if (!token || !isTokenValid(token)) {
      navigate("/login");
      console.error("Token no disponible o inválido");
      return { success: false, items: [] };
    }
  
    try {
      const decodedToken = jwtDecode(token);
      const userId = parseInt(decodedToken.sub);
      const usernamePayload = { id: userId };
      const base64UsernamePayload = btoa(JSON.stringify(usernamePayload));
  
      // Obtener el nombre del usuario
      const userNameResponse = await fetch(Global.url + "users/list/id", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
          Authorization: `Bearer ${token}`,
        },
        body: base64UsernamePayload,
      });
  
      if (!userNameResponse.ok) {
        throw new Error(`Error en la respuesta del servidor: ${userNameResponse.status}`);
      }
  
      const userNameBase64Data = await userNameResponse.text();
      const userNameData = JSON.parse(atob(userNameBase64Data));
      const { userName } = userNameData.data;
  
      // Verificar el carrito
      const cartId = await checkIfUserHasCart(userId);
      if (cartId === 0) {
        console.error("No se encontró el carrito del usuario.");
        return { success: false, items: [] };
      }
  
      const cartValidationPayload = {
        cartId,
        createUser: userName,
      };
  
      const cartValidationResponse = await fetch(
        Global.url + "order-items/validate/cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(cartValidationPayload),
        }
      );
  
      if (!cartValidationResponse.ok) {
        throw new Error(`Error en la respuesta del servidor: ${cartValidationResponse.status}`);
      }
  
      const base64Data = await cartValidationResponse.text();
      const jsonString = atob(base64Data);
      const data = JSON.parse(jsonString);
  
      if (data.data === true) {
        const payload = { page: 1 };
        const base64Payload = btoa(JSON.stringify(payload));
  
        const orderItemsResponse = await fetch(Global.url + "order-items/list/all", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
           body: base64Payload,
        });
  
        if (!orderItemsResponse.ok) {
          throw new Error(`Error en la respuesta del servidor: ${orderItemsResponse.status}`);
        }
  
        const orderItemsBase64Data = await orderItemsResponse.text();
        const jsonString = atob(orderItemsBase64Data);
        const dataString = JSON.parse(jsonString);
        if (dataString.data && dataString.data.content) {
          const items = dataString.data.content; 
          setCartItems(items); 
          return { success: true, items }; 
        }
        // return dataString;
      } 
    } catch (error) {
      console.error("Error en validateCart:", error);
      setError("Error al validar el carrito");
    }
  };

  const updateItemQuantity = async (item) => {
    const token = localStorage.getItem("authToken");
  
    if (!token || !isTokenValid(token)) {
      navigate("/login");
      console.error("Token no disponible o inválido");
      return;
    }
  
    try {
      const orderItemDto = {
        id: item.id,
        name: item.name,
        cartId: item.cartId,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        updateUser: item.userName,
      };
  
      const base64OrderItemDto = btoa(JSON.stringify(orderItemDto));
  
      const response = await axios.post(
        Global.url + "order-items/updateRecord",
        base64OrderItemDto,
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
        const updatedItem = JSON.parse(jsonString);
  
        // Actualiza el estado de cartItems asegurando que provoque una re-renderización
        setCartItems((prevItems) => {
          const updatedItems = prevItems.map((cartItem) =>
            cartItem.id === updatedItem.id
              ? { ...cartItem, quantity: updatedItem.quantity }
              : cartItem
          );
  
          // Si la cantidad es 0, eliminamos el ítem del carrito
          return updatedItems.filter((cartItem) => cartItem.quantity > 0);
        });
      } else {
        console.error("Invalid Base64 string:", base64Data);
        setError("Invalid data format from server");
      }
    } catch (error) {
      console.error("Error updating item quantity:", error);
      setError("Error al actualizar la cantidad del ítem");
    }
  };
  

  return {
    cartItems,
    addToCart,
    validateCart,
    updateItemQuantity,
    error,
  };  
};

export default useCart;