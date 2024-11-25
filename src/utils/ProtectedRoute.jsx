import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('token');

  const isTokenExpired = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // In seconds
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error("Error decoding token: ", error);
      return true;
    }
  };

  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
