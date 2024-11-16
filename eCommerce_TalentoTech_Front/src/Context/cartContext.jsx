import React, { createContext, useState, useContext } from 'react';

// Crear el contexto del carrito
const CartContext = createContext();

// Proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);

    // Método para agregar un producto al carrito
    const addToCart = async ({ cartId, inventoryId, quantity, userId, createUser }) => {
        try {
            // Codificación en Base64 del payload
            const payload = {
                cartId,
                inventoryId,
                quantity,
                userId,
                createUser,
            };
            const base64Payload = btoa(JSON.stringify(payload));

            // Solicitud POST a través de Axios con el payload codificado en Base64
            const response = await axios.post('http://localhost:8082/carts/addToCart', base64Payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Decodificación de la respuesta en Base64
            const base64Data = response.data;
            const jsonString = atob(base64Data);
            const data = JSON.parse(jsonString);

            setCartItems(data.cartItems); // Actualiza el estado del carrito con los datos decodificados
        } catch (error) {
            console.error('Error en addToCart:', error);
            setError('Error al agregar el producto al carrito');
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, error }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook para acceder al contexto del carrito
export const useCart = () => {
    return useContext(CartContext);
};