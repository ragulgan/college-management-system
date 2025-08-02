import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
    const tokenData = localStorage.getItem('adminInfo');
    const parsedToken = tokenData ? JSON.parse(tokenData) : null;
    return parsedToken?.token ? children : <Navigate to="/login" />;
  };
  
  export default ProtectedRoute;