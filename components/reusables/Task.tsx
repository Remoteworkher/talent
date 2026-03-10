"use client";

import React, { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import Image from "next/image";
import { Button } from "../ui/button";
import { Task as TaskType, useSkipTask } from "@/hooks/useTask";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEmailVerification } from "@/hooks/useEmailVerification";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ProcessModal from "@/components/reusables/ProcessModal";

const TASK_TYPE_ROUTES: Record<string, string> = {
  onboarding: "/settings/onboarding",
  email_verification: "/settings/verify-email",
  avatar_upload: "/settings",
  compass_profile_completion: "/settings/",
  compass_community_introduction: "https://remoteworkher.com/",
  // New tasks can be easily added here
};

const Task = ({ task }: { task: TaskType }) => {
  const { mutate: skip, isPending: isSkipping } = useSkipTask();

  const handleSkip = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (task.id) {
      skip(task.id, {
        onSuccess: () => toast.success("Task skipped"),
        onError: () => toast.error("Failed to skip task"),
      });
    } else {
      // Fallback to task_id if numeric id is missing,
      // though the API spec suggests numeric ID in URL
      skip(task.task_id, {
        onSuccess: () => toast.success("Task skipped"),
        onError: () => toast.error("Failed to skip task"),
      });
    }
  };

  const isUrgent = task.urgency === "urgent";
  const router = useRouter();
  const { sendOTP } = useEmailVerification();
  const [isTriggering, setIsTriggering] = useState(false);

  // Scalable Route Resolution
  const taskRoute = task.route || TASK_TYPE_ROUTES[task.task_type] || null;

  // Determine if this is an external redirect based on:
  // 1. API completion_type (if explicitly set to something other than "auto")
  // 2. OR if the resolved route is an absolute URL starting with http/https
  const isExternal =
    (task.completion_type && task.completion_type !== "auto") ||
    taskRoute?.startsWith("http");

  const handleAction = async (e: React.MouseEvent) => {
    // Special internal flow: email verification needs OTP trigger first
    if (task.task_type === "email_verification" && !isExternal) {
      e.preventDefault();
      setIsTriggering(true);
      try {
        const res = await sendOTP.mutateAsync();
        if (res.status === "success" && res.data?.signature) {
          toast.success("Verification code sent!");
          router.push(`/settings/verify-email?signature=${res.data.signature}`);
        } else {
          toast.error(res.message || "Failed to trigger verification.");
          setIsTriggering(false);
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
        setIsTriggering(false);
      }
      return;
    }

    if (!taskRoute) return;

    if (isExternal) {
      // Redirect to external link in a new tab
      window.open(taskRoute, "_blank", "noopener,noreferrer");
    } else {
      // Internal navigation
      router.push(taskRoute);
    }
  };

  return (
    <div className="border border-[#E8E8E8] rounded-[12px] p-4 relative group hover:border-[#322FEB] transition-all bg-white">
      <section className="flex justify-start md:items-center gap-3">
        <Checkbox className="" checked={task.completed} />
        <div className="space-y-3 md:space-y-0 md:flex md:justify-between md:items-center w-full gap-">
          <div className="">
            {/* <div className="flex justify-start items-center gap-3">
              {isUrgent && (
                <div className="text-[#E16614] text-[11px] bg-[#FFF3EB] rounded-full px-2.5 py-0.5 mori-semibold uppercase tracking-wider">
                  URGENT
                </div>
              )}
              <div className="flex justify-start items-center gap-1">
                <Image
                  src={`/time-line.svg`}
                  width={16}
                  height={16}
                  alt="time line"
                />
                <div className="text-[#6A6D71] text-[12px]">
                  {task.time_estimate}
                </div>
              </div>
            </div> */}
            <div className="text-[#161A21] text-[16px] mori-semibold leading-tight">
              {task.title}
            </div>
            {/* <div className="text-[14px] text-[#6A6D71] leading-relaxed">
              {task.description}
            </div> */}
          </div>
          <div className="flex md:justify-end items-center">
            {!task.completed && (
              <Button
                onClick={handleAction}
                className="px-6 rounded-full bg-[#322FEB] hover:bg-[#2826c8] flex items-center gap-2"
                disabled={isTriggering}
              >
                {task.button_text ? task.button_text : "Action"}
                <Image
                  src={`/apply-icon.svg`}
                  width={18}
                  height={18}
                  alt="arrow"
                />
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Skip Button */}
      {/* <button 
        onClick={handleSkip}
        className="absolute top-2 right-2 p-1.5 opacity-0 group-hover:opacity-100 text-[#95969A] hover:text-red-500 transition-all rounded-full hover:bg-red-50"
        title="Skip task"
        disabled={isSkipping}
      >
        {isSkipping ? <Loader2 className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
      </button> */}

      <Dialog open={isTriggering}>
        <DialogContent
          className="sm:max-w-md p-0 overflow-hidden border-none"
          showCloseButton={false}
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <div className="p-10 bg-white">
            <ProcessModal
              title={
                task.task_type === "email_verification"
                  ? "Sending Verification Code"
                  : "Preparing Onboarding"
              }
              description={
                task.task_type === "email_verification"
                  ? "We're sending a fresh verification code to your email."
                  : "Taking you to the onboarding flow..."
              }
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Task;
