import { useEffect, useState } from 'react';
import api from '../services/api';

export const useAdminAuth = () => {
  const [isAdmin, setIsAdmin] = useState(null); // null = loading

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get('/admin/auth-check'); // בשרת יש ראוט כזה שמחזיר 200 אם מחובר
        setIsAdmin(true);
      } catch (err) {
        setIsAdmin(false);
      }
    };

    checkAuth();
  }, []);

  return isAdmin;
};
