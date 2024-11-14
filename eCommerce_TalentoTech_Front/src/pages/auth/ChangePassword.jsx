import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useChangePassword from '../../hooks/useChangePassword';

const ChangePassword = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const tokenFromQuery = query.get('token');

    const {
        formData,
        message,
        passwordsMatch,
        handleInputChange,
        validatePasswords,
        sendResetEmail,
        changePassword,
        setFormData,
    } = useChangePassword();

    useEffect(() => {
        if (tokenFromQuery) {
            setFormData((prevData) => ({ ...prevData, token: tokenFromQuery }));
        }
    }, [tokenFromQuery, setFormData]);

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        sendResetEmail();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        changePassword();
    };

    return (
        <div className='container mx-auto mt-5 md:justify-center xl:top-0 md:top-2 sm:top-10 m-8 anyBox'>
            {!formData.token ? (
                <form
                    onSubmit={handleEmailSubmit}
                    className='container md:w-[518px] md:h-[400px] w-[306px] h-[464px] bg-fourty shadow-2xl rounded-sm text-sm md:text-xl anyBox'
                >
                    <div className='p-5 mt-0'>
                        <h2 className='text-xl'>Reset Password</h2>
                    </div>
                    <div className='anyBox flex-row w-[193px] h-[252px] mx-10 md:ml-18 p-5'>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className='input-primary'
                            required
                        />
                        <button
                            type="submit"
                            className='w-[193px] h-[43px] md:w-[360px] md:h-[48px] btn-primary'
                        >
                            Send Reset Email
                        </button>
                    </div>
                    <footer className='p-5 mx-10 bottom-0 anyBox'>
                        <Link to="/login" className='btn-secondary mb-5'>Volver a Iniciar Sesión</Link>
                    </footer>
                </form>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    className='container md:w-[518px] md:h-[684px] w-[306px] h-[464px] bg-fourty shadow-2xl rounded-sm text-sm md:text-xl anyBox'
                >
                    <div className='p-5 mt-0'>
                        <h2 className='text-xl'>Change Password</h2>
                    </div>
                    <div className='anyBox flex-row w-[193px] h-[252px] mx-10 md:ml-18 p-5'>
                        <input
                            type="password"
                            name="newPassword"
                            placeholder="New Password"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            onBlur={validatePasswords}
                            className='input-primary'
                            required
                        />
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm New Password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            onBlur={validatePasswords}
                            className='input-primary'
                            required
                        />
                        {!passwordsMatch && <p style={{ color: 'red' }}>Passwords do not match!</p>}
                        <button
                            type="submit"
                            className='w-[193px] h-[43px] md:w-[360px] md:h-[48px] btn-primary'
                        >
                            Change Password
                        </button>
                    </div>
                    <footer className='p-5 mx-10 bottom-0 anyBox'>
                        <Link to="/login" className='btn-secondary mb-5'>Volver a Iniciar Sesión</Link>
                    </footer>
                </form>
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default ChangePassword;
