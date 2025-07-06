import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";

// פונקציית שליפה מהשרת
const getTopics = async () => {
  const response = await api.get("/topics");
  return response.data;
};

export const useGetTopics = () => {
  const queryFn = getTopics;
  const queryKey = ["topics"];
  const onError = (err) => {
    console.error("error in useQuery:", err);
  };

  return useQuery({ queryKey, queryFn, onError });
};

export const useAddTopic = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newTopic) =>
      api.post("/topics", newTopic).then((res) => res.data),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["topics"] });
    },
    onError: (error) => {
      console.error("שגיאה בהוספת נושא:", error);
    },
  });
};

export const useUpdateTopic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, name, notes }) =>
      api.put(`/topics/${id}`, { name, notes }).then((res) => res.data),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["topics"] });
    },
    onError: (error) => {
      console.error("שגיאה בעדכון נושא:", error);
    },
  });
};

export const useDeleteTopic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) =>
      api.delete(`/topics/${id}`).then((res) => res.data),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["topics"] });
    },
    onError: (error) => {
      console.error("שגיאה במחיקת נושא:", error);
    },
  });
};