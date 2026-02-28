import { useQuery } from "@tanstack/react-query";
import axios from "../lib/axios";

interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  tokens: number;
  ai_tokens?: number; // Keep for backward compatibility if any
  email_verified: boolean;
  plan_uid: string;
  completed_onboarding: boolean;
}

interface ApiResponse<T> {
  event: string;
  status: string;
  message: string;
  data: T;
  errors: Record<string, string[]> | null;
}

const fetchUserData = async (): Promise<UserData> => {
  const res = await axios.get<ApiResponse<UserData>>(
    "/api/talent/profile/userdata",
  );
  return res.data.data;
};

export const useUserData = () => {
  return useQuery<UserData>({
    queryKey: ["user-data"],
    queryFn: fetchUserData,
    staleTime: 1000 * 60 * 5,
  });
};
