import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useContext(AuthContext);  // Supondo que o contexto forneça isAuthenticated
  
  // Se não estiver autenticado, redireciona para o login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Caso contrário, renderiza o componente da rota
  return element;
};

export default ProtectedRoute;
