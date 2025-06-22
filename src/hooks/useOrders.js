// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import api from '../services/api';

// const getOrders = async () => {
//   const response = await api.get('/orders');
//   return response.data;
// };

// const addOrder = async (orderData) => {
//   const response = await api.post('/orders', orderData);
//   return response.data;
// };

// export const useGetOrders = () => {
//   return useQuery({
//     queryKey: ['orders'],
//     queryFn: getOrders,
//     onError: (err) => {
//       console.error('שגיאה בשליפת ההזמנות:', err);
//     },
//   });
// };

// export const useAddOrder = () => {
//     debugger
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: addOrder,
//     onSuccess: () => {
//       queryClient.invalidateQueries(['orders']);
//     },
//     onError: (err) => {
//       console.error('שגיאה בשליחת הזמנה:', err);
//     },
//   });
// };
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
