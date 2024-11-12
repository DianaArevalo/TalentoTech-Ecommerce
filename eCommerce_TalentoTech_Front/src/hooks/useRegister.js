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
        createUser: 'REGISTER',
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
            const userObject = {
                name: formData.name,
                lastName: formData.lastName,
                userName: formData.userName,
                email: formData.email,
                password: formData.newPassword,
                status: formData.status,
                createUser: formData.createUser,
            };    

            const response = await axios.post('http://localhost:8082/auth/register', userObject, {
                headers: {
                    'Content-Type': 'application/json',
                },
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