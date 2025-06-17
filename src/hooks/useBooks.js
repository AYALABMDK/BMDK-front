import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

const getBooks = async () => {
  const response = await api.get('/books');
  return response.data;
};
const fetchBooksByTopicCode = async (topicCode) => {
  const response = await api.get(`/books/${topicCode}`); 
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
