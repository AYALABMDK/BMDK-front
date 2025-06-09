import { useMutation } from '@tanstack/react-query';
import api from '../services/api';

const sendContactForm = async (formData) => {
  const response = await api.post('/contact', formData);
  return response.data;
};

export const useSendContactForm = () => {
  return useMutation({
    mutationFn: sendContactForm,
    onSuccess: () => {
      console.log("ההודעה נשלחה בהצלחה");
    },
    onError: (error) => {
      console.error("שגיאה בשליחת ההודעה:", error);
    },
  });
};
