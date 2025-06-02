import { Navigate } from 'react-router-dom';
import Cookies from "js-cookie";

function ProtectedRoute({ children }: { children:any }) {
  const token = Cookies.get('token'); // Assuming the token is stored in localStorage

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
