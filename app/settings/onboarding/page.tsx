"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2, Upload, Link as LinkIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useOnboardingGoals,
  useOnboardingQuestions,
  useSetPrimaryGoal,
  useStoreOnboardingAnswers,
  OnboardingQuestion,
} from "@/hooks/useOnboarding";
import { toast } from "sonner";

const OnboardingPage = () => {
  const router = useRouter();
  const { data: goalsData, isLoading: goalsLoading } = useOnboardingGoals();
  const { data: questionsData, isLoading: questionsLoading } = useOnboardingQuestions();
  const setGoalMutation = useSetPrimaryGoal();
  const storeAnswersMutation = useStoreOnboardingAnswers();

  const [selectedGoal, setSelectedGoal] = useState<string>("");
  const [answers, setAnswers] = useState<Record<string, any>>({});

  useEffect(() => {
    if (questionsData?.questions && questionsData.questions.length > 0 && !selectedGoal) {
       // Pre-set goal logic if needed
    }
  }, [questionsData, selectedGoal]);

  const handleGoalChange = async (goal: string) => {
    setSelectedGoal(goal);
    try {
      await setGoalMutation.mutateAsync(goal);
      toast.success("Goal set!");
    } catch (error) {
      toast.error("Failed to set goal.");
    }
  };

  const handleAnswerChange = (key: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleApplyChanges = async () => {
    try {
      const formData = new FormData();
      
      Object.entries(answers).forEach(([key, answer]) => {
        let finalAnswer = answer;
        
        // Format range object as string "from-to" and strip commas
        if (typeof answer === 'object' && answer !== null && 'from' in answer && 'to' in answer) {
          const from = String(answer.from).replace(/,/g, '');
          const to = String(answer.to).replace(/,/g, '');
          finalAnswer = `${from}-${to}`;
        }

        // Check if answer is a File for multipart submission, otherwise append as string
        if (finalAnswer instanceof File) {
          formData.append(key, finalAnswer);
        } else {
          formData.append(key, String(finalAnswer));
        }
      });

      const res = await storeAnswersMutation.mutateAsync(formData);
      if (res.status === "success") {
        toast.success("Onboarding answers saved successfully!");
        router.push("/settings");
      } else {
        toast.error(res.message || "Failed to save answers.");
      }
    } catch (error: any) {
      const serverMessage = error.response?.data?.message;
      const validationErrors = error.response?.data?.errors;
      
      if (validationErrors) {
        const firstError = Object.values(validationErrors)[0] as string[];
        toast.error(firstError[0] || serverMessage || "Validation failed.");
      } else {
        toast.error(serverMessage || "Failed to save answers.");
      }
    }
  };

  if (goalsLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[#322FEB]" />
      </div>
    );
  }

  const renderQuestionInput = (question: OnboardingQuestion) => {
    const { type, placeholder, label: inputLabel, base_label } = question.input;
    const options = question.options.map(opt => typeof opt === 'string' ? { label: opt, value: opt } : opt);

    if (type === "range") {
      const currentVal = answers[question.key] || { from: "", to: "" };
      const fromVal = typeof currentVal === "object" ? currentVal.from : "";
      const toVal = typeof currentVal === "object" ? currentVal.to : "";

      const updateRange = (field: "from" | "to", val: string) => {
        handleAnswerChange(question.key, {
          ... (typeof currentVal === "object" ? currentVal : {}),
          [field]: val
        });
      };

      return (
        <div className="space-y-4 w-full max-w-[600px]">
          <Label className="text-[14px] text-[#161A21] font-medium">{inputLabel || "Salary Range"}</Label>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[#95969A] text-[16px]">₦</span>
              <input
                type="text"
                placeholder="input your salary"
                className="w-full h-[64px] pl-10 pr-6 rounded-full border border-[#E8E8E8] text-[15px] focus:outline-none focus:border-[#322FEB] placeholder:text-[#95969A]"
                value={fromVal}
                onChange={(e) => updateRange("from", e.target.value)}
              />
            </div>
            <span className="text-[#161A21] text-[16px] font-medium">to</span>
            <div className="relative flex-1">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[#95969A] text-[16px]">₦</span>
              <input
                type="text"
                placeholder="input your salary"
                className="w-full h-[64px] pl-10 pr-6 rounded-full border border-[#E8E8E8] text-[15px] focus:outline-none focus:border-[#322FEB] placeholder:text-[#95969A]"
                value={toVal}
                onChange={(e) => updateRange("to", e.target.value)}
              />
            </div>
          </div>
          {base_label && <p className="text-[#161A21]/80 text-[15px] mt-2">{base_label}</p>}
        </div>
      );
    }

    if (type === "dropdown") {
      return (
        <div className="space-y-2 w-full max-w-[500px]">
          <Label className="text-[14px] text-[#161A21] font-medium">{inputLabel}</Label>
          <Select
            value={answers[question.key] || ""}
            onValueChange={(val) => handleAnswerChange(question.key, val)}
          >
            <SelectTrigger className="h-[52px] w-full rounded-xl border-[#E8E8E8] bg-white text-[15px]">
              <SelectValue placeholder={placeholder || "Select an option"} />
            </SelectTrigger>
            <SelectContent>
              {options.length > 0 ? (
                options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="placeholder" disabled>No options available</SelectItem>
              )}
            </SelectContent>
          </Select>
          {base_label && <p className="text-[#6A6D71] text-[13px]">{base_label}</p>}
        </div>
      );
    }

    if (type === "radio" || type === "single-selection") {
      return (
        <RadioGroup
          value={answers[question.key] || ""}
          onValueChange={(val) => handleAnswerChange(question.key, val)}
          className="space-y-3 w-full"
        >
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                answers[question.key] === opt.value
                  ? "border-[#322FEB] bg-[#F6F3FF]"
                  : "border-[#E8E8E8] bg-white hover:border-[#322FEB]/30"
              }`}
              onClick={() => handleAnswerChange(question.key, opt.value)}
            >
              <RadioGroupItem value={opt.value} id={`${question.key}-${opt.value}`} />
              <Label
                htmlFor={`${question.key}-${opt.value}`}
                className="flex-1 cursor-pointer text-[15px] text-[#161A21]"
              >
                {opt.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      );
    }

    if (type === "file") {
      return (
        <label className="flex flex-col items-center justify-center w-full max-w-[500px] h-[120px] border-2 border-dashed border-[#E8E8E8] rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 text-[#95969A] mb-2" />
            <p className="text-sm text-[#161A21] font-medium">
              {answers[question.key] instanceof File ? answers[question.key].name : (answers[question.key] || "Click to upload file")}
            </p>
            <p className="text-xs text-[#95969A]">PDF, DOCX up to 10MB</p>
          </div>
          <input 
            type="file" 
            className="hidden" 
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleAnswerChange(question.key, file);
            }} 
          />
        </label>
      );
    }

    if (type === "text") {
       return (
        <div className="relative w-full max-w-[500px]">
           <div className="absolute left-4 top-1/2 -translate-y-1/2">
             <LinkIcon className="w-4 h-4 text-[#95969A]" />
           </div>
           <input 
            type="text"
            placeholder={placeholder}
            className="w-full h-[52px] pl-10 pr-4 rounded-xl border border-[#E8E8E8] text-[15px] focus:outline-none focus:border-[#322FEB]"
            value={answers[question.key] || ""}
            onChange={(e) => handleAnswerChange(question.key, e.target.value)}
           />
        </div>
       )
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full mx-auto p-8 space-y-12 pb-32">
        <div className="space-y-1">
          <h1 className="sora-semibold text-[28px] text-[#161A21]">Onboarding Questions</h1>
          <p className="text-[#6A6D71] text-[15px]">Manage your preferences and configure various options.</p>
        </div>

        {/* Primary Goal Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <h3 className="mori-semibold text-[18px] text-[#161A21] pt-4">What's your primary goal with Remote Workher?</h3>
          <RadioGroup
            value={selectedGoal}
            onValueChange={handleGoalChange}
            className="space-y-3 w-full"
          >
            {goalsData?.goals.map((goal) => (
              <div
                key={goal.value}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedGoal === goal.value
                    ? "border-[#322FEB] bg-[#F6F3FF]"
                    : "border-[#E8E8E8] bg-white hover:border-[#322FEB]/30"
                }`}
                onClick={() => handleGoalChange(goal.value)}
              >
                <RadioGroupItem value={goal.value} id={`goal-${goal.value}`} />
                <Label
                  htmlFor={`goal-${goal.value}`}
                  className="flex-1 cursor-pointer text-[15px] text-[#161A21]"
                >
                  {goal.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Dynamic Questions */}
        {questionsLoading && selectedGoal && (
           <div className="flex justify-center py-10">
              <Loader2 className="w-6 h-6 animate-spin text-[#322FEB]" />
           </div>
        )}

        {selectedGoal && !questionsLoading && questionsData?.questions.map((question) => (
          <div key={question.key} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pt-8 border-t border-[#F0F0F0]">
            <h3 className="mori-semibold text-[18px] text-[#161A21] pt-2">{question.label}</h3>
            <div className="w-full">
               {renderQuestionInput(question)}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-[#F0F0F0] flex justify-end gap-4 shadow-lg z-20">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="h-[48px] px-8 rounded-xl border-[#E8E8E8] text-[#161A21] font-semibold"
        >
          Discard
        </Button>
        <Button
          onClick={handleApplyChanges}
          disabled={
            storeAnswersMutation.isPending || 
            !selectedGoal || 
            !questionsData?.questions ||
            questionsData.questions.length === 0 ||
            !questionsData.questions.every(q => {
              const val = answers[q.key];
              if (q.input.type === "range") {
                return val && typeof val === "object" && val.from && val.to;
              }
              return val !== undefined && val !== "";
            })
          }
          className="h-[48px] px-8 rounded-xl bg-[#322FEB] hover:bg-[#2826c8] text-white font-semibold flex items-center gap-2"
        >
          {storeAnswersMutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          Apply Changes
        </Button>
      </div>
    </div>
  );
};

export default OnboardingPage;
