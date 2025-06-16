import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

const getVideos = async () => {
  const response = await api.get('/videos');
  return response.data;
};
const getVideoByTopicCode = async (topicCode) => {
  const response = await api.get(`/videos/${topicCode}`); 
  return response.data;
};

// ___________________________

export const useGetVideos = () => {
  return useQuery({
    queryKey: ['books'],
    queryFn: getVideos,
    onError: (err) => {
      console.error('שגיאה בשליפת סרטונים:', err);
    }
  });
};

export const useGetVideoByTopicCode = (topicCode) => {
  return useQuery({
    queryKey: ['videoByTopic', topicCode],
    queryFn: () => getVideoByTopicCode(topicCode),
    onError: (err) => {
      console.error('שגיאה בשליפת סרטון לפי topicCode:', err);
    },
  });
};
