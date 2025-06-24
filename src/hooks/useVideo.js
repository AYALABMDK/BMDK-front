import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";

const getVideos = async () => {
  const response = await api.get("/videos");
  return response.data;
};
const getVideoByTopicCode = async (topicCode) => {
  const response = await api.get(`/videos/${topicCode}`);
  return response.data;
};

export const useGetVideos = () => {
  return useQuery({
    queryKey: ["videos"],
    queryFn: getVideos,
    onError: (err) => {
      console.error("שגיאה בשליפת סרטונים:", err);
    },
  });
};

export const useGetVideoByTopicCode = (topicCode) => {
  return useQuery({
    queryKey: ["videoByTopic", topicCode],
    queryFn: () => getVideoByTopicCode(topicCode),
    onError: (err) => {
      console.error("שגיאה בשליפת סרטון לפי topicCode:", err);
    },
  });
};
const deleteVideo = async (code) => {
  const response = await api.delete(`/videos/${code}`);
  return response.data;
};

export const useDeleteVideo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
    },
    onError: (err) => {
      console.error("שגיאה במחיקת סרטון:", err);
    },
  });
};

const updateVideo = async ({ code, data }) => {
  const response = await api.put(`/videos/${code}`, data);
  return response.data;
};

export const useUpdateVideo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
    },
    onError: (err) => {
      console.error("שגיאה בעדכון סרטון:", err);
    },
  });
};

export const useAddVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newVideo) => api.post("/videos", newVideo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
    },
    onError: (error) => {
      console.error("שגיאה בהוספת וידאו:", error);
    },
  });
};
