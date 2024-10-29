import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useRegister = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        userName: '',
        status: 1,
        newPassword: '',
        confirmPassword: '',
        createUser: 'Carolina Arevalo', // Agregar createUser aquí
    });
    
    const [message, setMessage] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validatePasswords = () => {
        setPasswordsMatch(formData.newPassword === formData.confirmPassword);
    };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!passwordsMatch) {
        setMessage('Passwords do not match!');
        return;
    }

    try {
        // Asegúrate de que la contraseña se codifica en UTF-8 antes de usar btoa
        const encodedPassword = btoa(unescape(encodeURIComponent(formData.newPassword))); // Codificación en Base64 de la contraseña
        const response = await axios.post('http://localhost:8082/auth/register', {
            name: formData.name,
            lastName: formData.lastName,
            userName: formData.userName,
            email: formData.email,
            password: encodedPassword, // Contraseña codificada
            status: formData.status,
            createUser: formData.createUser,
        });
        setMessage(response.data.message || 'Registration successful!');
        navigate('/');
    } catch (error) {
        setMessage(error.response?.data?.message || 'An error occurred during registration');
    }
};

    

    return {
        formData,
        message,
        passwordsMatch,
        handleInputChange,
        validatePasswords,
        handleRegister
    };
};

export default useRegister;
