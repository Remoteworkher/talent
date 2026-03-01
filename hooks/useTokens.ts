import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "../lib/axios";

export interface TokenPlan {
  uid: string;
  name: string;
  price: number;
  tokens: number;
}

const fetchTokenPlans = async (): Promise<TokenPlan[]> => {
  const res = await axios.get("/api/talent/tokens");
  return res.data.data;
};

export const useTokenPlans = () => {
  return useQuery<TokenPlan[]>({
    queryKey: ["token-plans"],
    queryFn: fetchTokenPlans,
  });
};

export const useBuyTokens = () => {
  return useMutation({
    mutationFn: async (tokenPlanUid: string) => {
      const res = await axios.post("/api/talent/tokens/buy", {
        token_plan_uid: tokenPlanUid,
      });
      return res.data.data;
    },
  });
};

export const useVerifyTokenTransaction = () => {
  return useMutation({
    mutationFn: async (reference: string) => {
      const res = await axios.get(`/api/talent/tokens/verify?reference=${reference}`);
      return res.data.data;
    },
  });
};

export const useTokens = () => {
  const tokenPlans = useTokenPlans();
  const buyTokensMutation = useBuyTokens();
  const verifyTokenMutation = useVerifyTokenTransaction();
  
  return {
    tokenPlans,
    buyTokensMutation,
    verifyTokenMutation,
    isLoadingTokenPlans: tokenPlans.isLoading
  };
};
