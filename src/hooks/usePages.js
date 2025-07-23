import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";

// --- GET ---
const fetchPageByKey = async (key) => {
  const response = await api.get(`/pages/${key}`);
  return response.data;
};

export const useGetPageByKey = (key) => {
  return useQuery({
    queryKey: ["page", key],
    queryFn: () => fetchPageByKey(key),
    enabled: !!key,
    onError: (err) => {
      console.error("שגיאה בשליפת עמוד:", err);
    },
  });
};

// --- PUT ---
const updatePage = async ({ key, updateData }) => {
  const response = await api.put(`/pages/${key}`, updateData);
  return response.data;
};

export const useUpdatePage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePage,
    onSuccess: (_, { key }) => {
      queryClient.invalidateQueries(["page", key]);
    },
    onError: (err) => {
      console.error("שגיאה בעדכון העמוד:", err);
    },
  });
};
