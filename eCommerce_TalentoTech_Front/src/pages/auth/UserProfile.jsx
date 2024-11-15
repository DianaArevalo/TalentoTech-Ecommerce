// import { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-regular-svg-icons';
// import useUserProfile from '../../hooks/useUserProfile.js';

// const UserProfile = () => {
//     const { profile, loading, error } = useUserProfile();
//     const [showProfile, setShowProfile] = useState(false);

//     const handleIconClick = () => {
//         setShowProfile(!showProfile);
//     };

//     if (loading) {
//         return <div>Cargando...</div>;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     return (
//         <div style={{ position: 'relative', display: 'inline-block' }}>
//             <FontAwesomeIcon
//                 icon={faUser}
//                 style={{ cursor: 'pointer', fontSize: 24 }}
//                 onClick={handleIconClick}
//             />
//             {showProfile && profile && (
//                 <div style={{
//                     position: 'absolute',
//                     top: '100%',
//                     right: 0,
//                     backgroundColor: 'white',
//                     border: '1px solid #ccc',
//                     padding: '10px',
//                     boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
//                     zIndex: 1000
//                 }}>
//                     <p><strong>Nombre:</strong> {profile.name}</p>
//                     <p><strong>Email:</strong> {profile.email}</p>
//                     {/* Agrega más campos según los datos disponibles */}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default UserProfile;