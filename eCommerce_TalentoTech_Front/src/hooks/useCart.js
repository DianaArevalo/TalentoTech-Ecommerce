import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Importar useNavigate
import useAuth  from '../hooks/useAuth'; // Importar el hook useAuth

const useCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);
    const { isAuthenticated, userData  } = useAuth(); // Obtener el estado de autenticación
    const navigate = useNavigate(); // Navegar al login si no está autenticado

    // Método para agregar un producto al carrito
    const addToCart = async ({ cartId, inventoryId, quantity }) => {
        if (!isAuthenticated) {
            // Si no está autenticado, redirigir al login
            navigate('/login');
            return;
        }

        try {
            // Codificación en Base64 del payload
            const payload = {
                cartId,
                inventoryId,
                quantity,
                userId: userData.userId,    // Usar userId de los datos decodificados
                createUser: userData.createUser,
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

    return {
        cartItems,
        addToCart,
        error,
    };
};

export default useCart;