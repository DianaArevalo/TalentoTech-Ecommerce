import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Global } from '../helpers/Global';

const useAuth = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleAuth = async (mode) => {
        try {
            let response;
            if (mode === 'login') {
                response = await axios.post(Global.url + "auth/login", {
                    email: formData.email,
                    password: formData.password,
                });
                localStorage.setItem('authToken', response.data.jwt);
                setIsAuthenticated(true);
                navigate('/products');
            } else if (mode === 'register') {
                response = await axios.post(Global.url + "auth/register", {
                    ...formData,
                });
                navigate('/register');
            }
            setMessage(response.data.message || 'Success!');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Invalid Username or Password');
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        navigate('/login');
    };

    return [
        formData,
        message,
        handleInputChange,
        handleAuth,
        isAuthenticated,
        logout,
    ];
};

export default useAuth;
