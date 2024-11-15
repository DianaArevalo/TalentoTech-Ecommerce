import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Importación correcta
import { Global } from '../helpers/Global';

const useCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const isTokenValid = (token) => {
        try {
            if (token.split('.').length !== 3) {
                return false;
            }

            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
                console.error('Token ha expirado');
                return false;
            }

            return true;
        } catch (error) {
            console.error('Error al decodificar el token:', error);
            return false;
        }
    };

    const addToCart = async ({ inventoryId }) => {
        const token = localStorage.getItem('authToken');
        console.log('Token:', token);

        if (!token || !isTokenValid(token)) {
            navigate('/login');
            console.error('Token no disponible o inválido');
            return;
        }

        try {
            const decodedToken = jwtDecode(token); // Decodificar el token
            const userId = decodedToken.id; // Extraer el userId

            const usernamePayload = { id: userId };
            const base64UsernamePayload = btoa(JSON.stringify(usernamePayload));

            const userNameResponse = await axios.post(Global.url + "users/list/id", base64UsernamePayload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const userNameData = atob(userNameResponse.data);
            const { userName } = JSON.parse(userNameData);

            const cartPayload = {
                cartId: 1,
                inventoryId,
                quantity: 1,
                userId,
                createUser: userName
            };

            const base64CartPayload = btoa(JSON.stringify(cartPayload));

            const response = await axios.post(Global.url + "carts/addToCart", base64CartPayload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const base64Data = response.data;
            const jsonString = atob(base64Data);
            const data = JSON.parse(jsonString);

            setCartItems(data.cartItems);
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