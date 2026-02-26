import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../lib/axios";
import { AxiosError } from "axios"; // 1. Import AxiosError

// --- Types based on API Documentation ---

// 1. API Response Wrapper
interface ApiResponse<T> {
  event: string;
  status: string;
  message: string;
  data: T;
  errors: Record<string, string[]> | null;
}

// 2. Question Object Structure
export interface OnboardingQuestion {
  label: string;
  key: string;
  input: {
    type: "dropdown" | "radio" | "text" | "number" | "range" | "file";
    label: string;
    placeholder: string;
    base_label?: string;
  };
  other: null | any;
  options: { label: string; value: string }[];
}

export interface OnboardingQuestionsData {
  questions: OnboardingQuestion[];
}

// 3. Payload Structure for Saving Answers
export interface OnboardingAnswerItem {
  key: string;
  answer: string | string[] | number;
}

export interface OnboardingAnswersPayload {
  answers: OnboardingAnswerItem[];
}

// --- Goal Mutation Hook ---

const setPrimaryGoal = async (goal: string): Promise<OnboardingQuestionsData> => {
  const res = await axios.post<ApiResponse<OnboardingQuestionsData>>(
    "/api/talent/onboarding/goal",
    { goal },
  );
  return res.data.data;
};

export const useSetPrimaryGoal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: setPrimaryGoal,
    onSuccess: (data) => {
      queryClient.setQueryData(["onboarding-questions"], data);
    },
  });
};

// --- Fetch Hook ---

const fetchOnboardingQuestions = async (): Promise<OnboardingQuestionsData> => {
  const res = await axios.get<ApiResponse<OnboardingQuestionsData>>(
    "/api/talent/onboarding/questions",
  );
  return res.data.data;
};

export const useOnboardingQuestions = () => {
  return useQuery({
    queryKey: ["onboarding-questions"],
    queryFn: fetchOnboardingQuestions,
    staleTime: 1000 * 60 * 5,
  });
};

// --- Store Mutation Hook ---

const storeOnboardingAnswers = async (payload: OnboardingAnswersPayload) => {
  const res = await axios.post<ApiResponse<null>>(
    "/api/talent/onboarding/answers",
    payload,
  );
  return res.data;
};

export const useStoreOnboardingAnswers = () => {
  return useMutation<
    ApiResponse<null>,
    AxiosError<ApiResponse<null>>,
    OnboardingAnswersPayload
  >({
    mutationFn: storeOnboardingAnswers,
    onSuccess: (data) => {
      console.log("Onboarding saved:", data.message);
    },
    onError: (error) => {
      const serverMessage = error.response?.data?.message;
      const fallbackMessage = error.message;
      console.error("Save failed:", serverMessage || fallbackMessage);
    },
  });
};
