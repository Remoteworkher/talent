import { useMutation } from "@tanstack/react-query";
import axios from "../lib/axios";

interface VerifyEmailParams {
  token: string;
  signature: string;
}

interface VerifyEmailResponse {
  event: string;
  status: string;
  message: string;
  data: null;
  errors: Record<string, string[]> | null;
}

interface SendEmailResponse {
  event: string;
  status: string;
  message: string;
  data: {
    signature: string;
  } | null;
  errors: Record<string, string[]> | null;
}

const sendEmailOTP = async (): Promise<SendEmailResponse> => {
  const res = await axios.post<SendEmailResponse>("/api/talent/settings/email/send");
  return res.data;
};

const verifyEmailOTP = async (params: VerifyEmailParams): Promise<VerifyEmailResponse> => {
  const res = await axios.post<VerifyEmailResponse>("/api/talent/settings/email/verify", params);
  return res.data;
};

export const useEmailVerification = () => {
  return {
    sendOTP: useMutation({
      mutationFn: sendEmailOTP,
    }),
    verifyOTP: useMutation({
      mutationFn: verifyEmailOTP,
    }),
  };
};
