import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

const getOrders = async () => {
  const response = await api.get('/orders');
  return response.data;
};

const addOrder = async (orderData) => {
  const response = await api.post('/orders', orderData);
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

export const useAddOrder = () => {
    debugger
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
