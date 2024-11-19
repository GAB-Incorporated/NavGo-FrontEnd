import { createContext, useState, useEffect } from 'react';

// Criação do contexto de autenticação
export const AuthContext = createContext();

// Componente provider que envolverá os componentes que precisam acessar o contexto
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verifique a autenticação, por exemplo, com um token armazenado no localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
