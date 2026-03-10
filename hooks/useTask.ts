import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../lib/axios";

// --- Types based on API Documentation ---

export interface Task {
  task_id: string;
  task_type: string;
  title: string;
  description: string;
  urgency: "normal" | "urgent";
  time_estimate: string;
  status?: "pending" | "completed" | "skipped";
  completed?: boolean;
  category?: string;
  id?: number;
  difficulty?: "beginner" | "intermediate" | "advanced";
  route?: string;
  button_text?: string;
  completion_type?: "auto" | string;
  assigned_at?: string;
  completed_at?: string | null;
  due_date?: string | null;
}

export interface TodayTasksData {
  tasks: Task[];
  user_day: number;
}

export interface LibraryTasksData {
  tasks: Task[];
}

export interface CompletedTasksData {
  tasks: Task[];
}

export interface TaskStats {
  current_day: number;
  total_days: number;
  completed_due_tasks_count: number;
  due_tasks_count: number;
  roadmap_progress_percentage: number;
}

export interface SkipTaskData {
  task: Task;
}

interface ApiResponse<T> {
  event: string;
  status: string;
  message: string;
  data: T;
  errors: Record<string, string[]> | null;
}

// --- Fetch Hooks ---

const fetchTodayTasks = async (): Promise<TodayTasksData> => {
  const res = await axios.get<ApiResponse<TodayTasksData>>(
    "/api/talent/tasks/today",
  );
  return res.data.data;
};

export const useTodayTasks = () => {
  return useQuery<TodayTasksData>({
    queryKey: ["today-tasks"],
    queryFn: fetchTodayTasks,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

const fetchTaskLibrary = async (): Promise<LibraryTasksData> => {
  const res = await axios.get<ApiResponse<LibraryTasksData>>(
    "/api/talent/tasks/library",
  );
  return res.data.data;
};

export const useTaskLibrary = () => {
  return useQuery<LibraryTasksData>({
    queryKey: ["task-library"],
    queryFn: fetchTaskLibrary,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

const fetchCompletedTasks = async (): Promise<CompletedTasksData> => {
  const res = await axios.get<ApiResponse<CompletedTasksData>>(
    "/api/talent/tasks/completed",
  );
  return res.data.data;
};

export const useCompletedTasks = () => {
  return useQuery<CompletedTasksData>({
    queryKey: ["completed-tasks"],
    queryFn: fetchCompletedTasks,
    staleTime: 1000 * 60 * 5,
  });
};

const fetchTaskStats = async (): Promise<TaskStats> => {
  const res = await axios.get<ApiResponse<TaskStats>>(
    "/api/talent/tasks/stats",
  );
  return res.data.data;
};

export const useTaskStats = () => {
  return useQuery<TaskStats>({
    queryKey: ["task-stats"],
    queryFn: fetchTaskStats,
    staleTime: 1000 * 60 * 5,
  });
};

// --- Skip Task Mutation ---

const skipTask = async (
  id: number | string,
): Promise<ApiResponse<SkipTaskData>> => {
  const res = await axios.post<ApiResponse<SkipTaskData>>(
    `/api/talent/tasks/${id}/skip`,
  );
  return res.data;
};

export const useSkipTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number | string) => skipTask(id),
    onSuccess: () => {
      // Invalidate today tasks to refresh the list
      queryClient.invalidateQueries({ queryKey: ["today-tasks"] });
    },
  });
};
