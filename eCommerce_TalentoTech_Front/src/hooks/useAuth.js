import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthLogin } from '../Context/authContext';

const useAuth = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const {login} = useAuthLogin();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);
            navigate('/products')
        }
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleAuth = async (mode) => {
        try {
            let response;
            if (mode === 'login') {
                response = await axios.post('http://localhost:8082/auth/login', {
                    email: formData.email,
                    password: formData.password,
                });
                localStorage.setItem('authToken', response.data.token);
                login(response.data.user, response.data.token);
                setMessage(response.data.message || 'Success!');
                setIsAuthenticated(true);
                navigate('/orders');
            } else if (mode === 'register') {
                response = await axios.post('http://localhost:8082/auth/register', {
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