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
            // Prepara el objeto de usuario
            const userObject = {
                name: formData.name,
                lastName: formData.lastName,
                userName: formData.userName,
                email: formData.email,
                password: formData.newPassword, // Puedes codificar la contraseña en el backend
                status: formData.status,
                createUser: formData.createUser,
            };
    
            // Convierte el objeto a cadena JSON y luego a Base64 usando Buffer
            const base64String = Buffer.from(JSON.stringify(userObject)).toString('base64');
    
            // Envía el objeto codificado al backend
            const response = await axios.post('http://localhost:8082/auth/register', {
                userData: base64String, // Envía el objeto codificado
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
