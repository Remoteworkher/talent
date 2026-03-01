import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "../lib/axios";

export interface Plan {
  uid: string;
  tag: string | null;
  name: string;
  price: string;
  tokens: string;
  currency: string;
  billing_period: string;
  features: string[];
}

export interface PlansByPeriod {
  monthly?: Plan[];
  quarterly?: Plan[];
  yearly?: Plan[];
}

const fetchPlans = async (): Promise<PlansByPeriod> => {
  const res = await axios.get("/api/talent/plans");
  return res.data.data;
};

export const usePlans = () => {
  return useQuery<PlansByPeriod>({
    queryKey: ["plans"],
    queryFn: fetchPlans,
  });
};

export const useVerifyPlanTransaction = () => {
  return useMutation({
    mutationFn: async (reference: string) => {
      const res = await axios.get(`/api/talent/plans/verify?reference=${reference}`);
      return res.data.data;
    },
  });
};
