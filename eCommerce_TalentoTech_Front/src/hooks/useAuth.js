import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

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
                navigate('/dashboard');
            } else if (mode === 'register') {
                response = await axios.post('http://localhost:8082/auth/register', {
                    ...formData,
                });
                navigate('/register');
            }
            setMessage(response.data.message || 'Success!');
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred');
        }
    };

    return [
        formData,
        message,
        handleInputChange,
        handleAuth
    ];
};

export default useAuth;
