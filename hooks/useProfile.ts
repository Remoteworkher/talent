import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../lib/axios";

export interface ProfileData {
  name: string;
  email: string;
  phone: string;
  job_title?: string;
  bio?: string;
  avatar?: string;
}

interface ApiResponse<T> {
  event: string;
  status: string;
  message: string;
  data: T;
  errors: Record<string, string[]> | null;
}

const fetchProfile = async (): Promise<ProfileData> => {
  const res = await axios.get<ApiResponse<ProfileData[] | ProfileData>>("/api/talent/settings/profile");
  const data = res.data.data;
  return Array.isArray(data) ? data[0] : (data as ProfileData);
};

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });
};

const updateProfile = async (data: Partial<ProfileData> | FormData): Promise<ProfileData> => {
  const isFormData = data instanceof FormData;
  const res = await axios.post<ApiResponse<ProfileData>>("/api/talent/settings/profile", data, {
    headers: {
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
    },
  });
  // The response data is an array of profile data objects based on the example
  return Array.isArray(res.data.data) ? res.data.data[0] : res.data.data;
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (newData) => {
      queryClient.setQueryData(["profile"], newData);
      queryClient.invalidateQueries({ queryKey: ["user-data"] });
    },
  });
};
