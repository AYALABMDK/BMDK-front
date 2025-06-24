import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

// --- GET ---
const getOrders = async () => {
  const response = await api.get('/orders');
  return response.data;
};

export const useGetOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
    onError: (err) => {
      console.error('שגיאה בשליפת ההזמנות:', err);
    },
  });
};

// --- POST ---
const addOrder = async (orderData) => {
  const response = await api.post('/orders', orderData);
  return response.data;
};

export const useAddOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
    },
    onError: (err) => {
      console.error('שגיאה בשליחת הזמנה:', err);
    },
  });
};

// --- DELETE ---
const deleteOrder = async (orderCode) => {
  const response = await api.delete(`/orders/${orderCode}`);
  return response.data;
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
    },
    onError: (err) => {
      console.error('שגיאה במחיקת ההזמנה:', err);
    },
  });
};

// --- PUT (UPDATE) ---
const updateOrder = async ({ orderCode, updateData }) => {
  const response = await api.put(`/orders/${orderCode}`, updateData);
  return response.data;
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
    },
    onError: (err) => {
      console.error('שגיאה בעדכון ההזמנה:', err);
    },
  });
};

const sendStatusEmail = async ({ orderCode, status }) => {
  const response = await api.put(`/orders/${orderCode}`, { status });
  return response.data;
};

export const useSendStatusEmail = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sendStatusEmail,
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
    },
    onError: (err) => {
      console.error("שגיאה בשליחת מייל סטטוס:", err);
    },
  });
};
const sendCustomEmail = async ({ to, subject, message }) => {
  const response = await api.post("/orders/send-custom-email", {
    to,
    subject,
    message,
  });
  return response.data;
};

export const useSendCustomEmail = () => {
  return useMutation({
    mutationFn: sendCustomEmail,
    onError: (err) => {
      console.error("שגיאה בשליחת מייל מותאם:", err);
    },
  });
};
