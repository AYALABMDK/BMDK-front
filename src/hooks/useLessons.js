import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";

// פונקציות שליפה מהשרת
const getLessons = async () => {
  const response = await api.get("/lessons");
  return response.data;
};
const addLesson = async (newLesson) => {
  const response = await api.post("/lessons", newLesson);
  return response.data;
};

const fetchLessonsByTopicCode = async (topicCode) => {
    const response = await api.get(`/lessons/${topicCode}`); 
    return response.data;
};
const updateLesson = async ({ code, updatedData }) => {
  const response = await api.put(`/lessons/${code}`, updatedData);
  return response.data;
};

// מחיקת שיעור
const deleteLesson = async (code) => {
  const response = await api.delete(`/lessons/${code}`);
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
export const useAddLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addLesson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lessons"] }); // רענון רשימת השיעורים
    },
    onError: (err) => {
      console.error("שגיאה בהוספת שיעור:", err);
    },
  });
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
export const useUpdateLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateLesson,
    onSuccess: () => {
      queryClient.invalidateQueries(["lessons"]);
    },
    onError: (err) => {
      console.error("שגיאה בעדכון שיעור:", err);
    },
  });
};

export const useDeleteLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteLesson,
    onSuccess: () => {
      queryClient.invalidateQueries(["lessons"]);
    },
    onError: (err) => {
      console.error("שגיאה במחיקת שיעור:", err);
    },
  });
};
