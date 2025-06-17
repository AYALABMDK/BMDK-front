import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

// פונקציית שליפה מהשרת
const getTopics = async () => {
  const response = await api.get("/topics");
  return response.data;
};


// וידאו
export const useGetTopics = () => {
  debugger
  const queryFn = getTopics;
  const queryKey = ["topics"];
  const onError = (err) => {
    console.error("error in useQuery:", err);
  };

  return useQuery({ queryKey, queryFn, onError });
};

