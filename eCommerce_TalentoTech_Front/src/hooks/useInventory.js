import { useState } from 'react';
import axios from 'axios';

const useInventory = () => {
    const [products, setProducts] = useState([]);
    const [productDetails, setProductDetails] = useState(null);
    const [message, setMessage] = useState('');

    // Método para listar todos los productos
    const listAllProducts = async () => {
        try {
            const token = localStorage.getItem('token'); // O el método que uses para guardar el token
            const response = await axios.get('http://localhost:8082/inventory/list/all', {
                headers: {
                    Authorization: `Bearer ${token}`, // Ajusta el tipo de token según necesites
                },
            });
            setProducts(response.data);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error al mostrar todos los productos');
        }
    };

    return {
        products,
        productDetails,
        message,
        listAllProducts,
    };
};

export default useInventory;
