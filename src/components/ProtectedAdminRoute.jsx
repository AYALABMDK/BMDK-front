import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../hooks/useAdminAuth';

const ProtectedAdminRoute = ({ children }) => {
  const isAdmin = useAdminAuth();

  if (isAdmin === null) return <div>טוען...</div>;
  if (!isAdmin) return <Navigate to="/admin/login" />;

  return children;
};

export default ProtectedAdminRoute;
