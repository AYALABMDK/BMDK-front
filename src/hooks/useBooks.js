import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

// --- GET ---

const getBooks = async () => {
  const response = await api.get('/books');
  return response.data;
};

export const useGetBooks = () => {
  return useQuery({
    queryKey: ['books'],
    queryFn: getBooks,
    onError: (err) => {
      console.error('שגיאה בשליפת ספרים:', err);
    }
  });
};

const fetchBooksByTopicCode = async (topicCode) => {
  const response = await api.get(`/books/${topicCode}`); 
  return response.data;
};

export const useGetBooksByTopicCode = (topicCode) => {
  return useQuery({
    enabled: !!topicCode,
    queryKey: ['booksByTopic', topicCode],
    queryFn: () => fetchBooksByTopicCode(topicCode),
    onError: (err) => {
      console.error('שגיאה בשליפת ספרים לפי topicCode:', err);
    },
  });
};

// --- DELETE ---
const deleteBook = async (bookCode) => {
  const response = await api.delete(`/books/${bookCode}`);
  return response.data;
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
    },
    onError: (err) => {
      console.error('שגיאה במחיקת הספר:', err);
    },
  });
};

// --- PUT (UPDATE) ---
const updateBook = async ({ bookCode, updateData }) => {
  const response = await api.put(`/books/${bookCode}`, updateData);
  return response.data;
};

export const useUpdateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBook,
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
    },
    onError: (err) => {
      console.error('שגיאה בעדכון הספר:', err);
    },
  });
};

// --- POST (Add) ---
export const useCreateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newBook) => {
      const response = await api.post('/books', newBook);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
    onError: (err) => {
      console.error('שגיאה בהוספת הספר:', err);
    },
  });
};