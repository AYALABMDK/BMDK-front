import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

// פונקציות שליפה מהשרת
const getLessons = async () => {
  const response = await api.get("/lessons");
  return response.data;
};

const fetchLessonsByTopicCode = async (topicCode) => {
    const response = await api.get(`/lessons/${topicCode}`); 
    return response.data;
};

// הוקים לשימוש בקומפוננטות
export const useGetLessons = () => {
  const queryFn = getLessons;
  const queryKey = ["lessons"];
  const onError = (err) => {
    console.error("error in useQuery:", err);
  };

  return useQuery({ queryKey, queryFn, onError });
};

export const useGetLessonsByTopicCode = (topicCode) => {
  return useQuery({
    queryKey: ['lessonsByTopic', topicCode],
    queryFn: () => fetchLessonsByTopicCode(topicCode),
    onError: (err) => {
      console.error('שגיאה בשליפת שיעורים לפי topicCode:', err);
    },
  });
};