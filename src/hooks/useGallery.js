import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

// שליפת כל התמונות
const fetchImages = async () => {
  const res = await api.get('/gallery');
  return res.data.images;
};

export const useGetImages = () => {
  return useQuery({
    queryKey: ['gallery'],
    queryFn: fetchImages,
    onError: (err) => {
      console.error('שגיאה בטעינת תמונות:', err);
    },
  });
};

// העלאת תמונה
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  await api.post('/gallery', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  });
};

export const useUploadImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadImage,
    onSuccess: () => {
      queryClient.invalidateQueries(['gallery']);
    },
    onError: (err) => {
      console.error('שגיאה בהעלאת תמונה:', err);
    },
  });
};

// מחיקת תמונה (אם תרצי)
const deleteImage = async (imgName) => {
  await api.delete(`/gallery/${encodeURIComponent(imgName)}`);
};

export const useDeleteImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteImage,
    onSuccess: () => {
      queryClient.invalidateQueries(['galleryImages']);
    },
    onError: (err) => {
      console.error('שגיאה במחיקת תמונה:', err);
    },
  });
};