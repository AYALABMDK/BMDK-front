import { Outlet, Navigate } from 'react-router-dom';
import { useAdminAuth } from '../../hooks/useAdminAuth';

const AdminLayout = () => {
  const isAdmin = useAdminAuth();

  if (isAdmin === null) return <div>טוען...</div>;
  if (!isAdmin) return <Navigate to="/admin/login" />;

  return (
    <div>
      {/* אפשר לשים כאן תפריט מנהל */}
      <Outlet />
    </div>
  );
};

export default AdminLayout;
