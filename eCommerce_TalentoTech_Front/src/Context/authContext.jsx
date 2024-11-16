import { createContext, useState, useContext } from 'react';

// Crear el contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: null,
    isLoggedIn: false
  });

  // Función para hacer login
  const login = (userData, token) => {
    setAuth({ user: userData, token, isLoggedIn: true });
    localStorage.setItem('authToken', token); // Guardar token en localStorage
  };

  // Función para hacer logout
  const logout = () => {
    setAuth({ user: null, token: null, isLoggedIn: false });
    localStorage.removeItem('authToken'); // Eliminar token de localStorage
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const useAuthLogin = () => {
  return useContext(AuthContext);
};

 
