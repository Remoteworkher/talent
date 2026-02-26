import { useQuery } from "@tanstack/react-query";
import axios from "../lib/axios";

export interface Referral {
  uid: string;
  name: string;
}

export interface ReferralsData {
  commission: number;
  referral_code: string;
  referral_count: number;
  referrals: Referral[];
}

interface ApiResponse<T> {
  event: string;
  status: string;
  message: string;
  data: T;
  errors: Record<string, string[]> | null;
}

const fetchReferrals = async (): Promise<ReferralsData> => {
  const res = await axios.get<ApiResponse<ReferralsData>>(
    "/api/talent/settings/referrals",
  );
  return res.data.data;
};

export const useReferrals = () => {
  return useQuery<ReferralsData>({
    queryKey: ["referrals"],
    queryFn: fetchReferrals,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
