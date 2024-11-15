// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import {jwtDecode} from 'jwt-decode';
// import { useNavigate } from 'react-router-dom';
// import useAuth from '../hooks/useAuth';

// const useUserProfile = () => {
//     const [profile, setProfile] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();
//     const [, , , , isAuthenticated] = useAuth(); // Desestructuración para obtener `isAuthenticated`

//     useEffect(() => {
//         const fetchProfile = async () => {
//             if (!isAuthenticated) {
//                 navigate('/login');
//                 return;
//             }

//             try {
//                 const token = localStorage.getItem('authToken');
//                 if (!token) throw new Error('No token found');

//                 // Decodificar el token para obtener el ID del usuario
//                 const decodedToken = jwtDecode ? jwtDecode(token) : jwtDecode(token);
//                 const userId = decodedToken.sub;

//                 // Codificar `userId` en base64
//                 const base64UserId = btoa(JSON.stringify({ id: userId }));

//                 const response = await axios.post(
//                     Global.url + "users/list/id",
//                     base64UserId, // Enviar el `userId` codificado como payload en base64
//                     {
//                         headers: {
//                             'Authorization': `Bearer ${token}`,
//                             'Content-Type': 'application/json'
//                         }
//                     }
//                 );

//                 // Asumiendo que la respuesta ya es JSON
//                 const data = response.data;
//                 setProfile(data);
//             } catch (err) {
//                 console.error('Error fetching profile:', err);
//                 setError('Unable to fetch profile');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProfile();
//     }, [isAuthenticated, navigate]);

//     return { profile, loading, error };
// };

// export default useUserProfile;
