"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { ChevronLeft, ChevronRight, Loader2, CheckCircle2 } from "lucide-react";
import {
  useOnboardingQuestions,
  useStoreOnboardingAnswers,
  useSetPrimaryGoal,
  OnboardingQuestion,
} from "@/hooks/useOnboarding";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const goals = [
  { label: "Get a new job in the next 90 Days", value: "new-job" },
  { label: "Learn a new skill to advance my career", value: "new-skill" },
  { label: "Build my professional network", value: "professional-network" },
  { label: "Transition to a new career path", value: "new-career" },
  { label: "Improve my current skills for promotion", value: "improve-skills" },
  { label: "Start freelancing or a side hustle", value: "free-lancing" },
];

const OnboardingFlow = () => {
  const [step, setStep] = useState<"goal" | "questions" | "completed">("goal");
  const [selectedGoal, setSelectedGoal] = useState<string>("");
  const [currentQuestionStep, setCurrentQuestionStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [dynamicQuestions, setDynamicQuestions] = useState<OnboardingQuestion[]>([]);

  const { mutate: setGoal, isPending: isSettingGoal } = useSetPrimaryGoal();
  const { mutate: saveAnswers, isPending: isSaving } = useStoreOnboardingAnswers();

  const handleGoalSubmit = () => {
    if (!selectedGoal) {
      toast.error("Please select a goal to continue.");
      return;
    }
    setGoal(selectedGoal, {
      onSuccess: (data) => {
        setDynamicQuestions(data.questions);
        setStep("questions");
      },
      onError: (err: any) => {
        const message = err?.response?.data?.message || "Failed to set primary goal. Please try again.";
        toast.error(message);
      }
    });
  };

  const handleAnswerChange = (key: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleRangeChange = (key: string, part: 'min' | 'max', value: string) => {
    setAnswers((prev) => {
      const currentRange = prev[key] || { min: "", max: "" };
      return {
        ...prev,
        [key]: { ...currentRange, [part]: value }
      };
    });
  };

  const currentQuestion = dynamicQuestions[currentQuestionStep];

  const handleNext = () => {
    const currentAnswer = answers[currentQuestion.key];
    
    // Validation for range
    if (currentQuestion.input.type === 'range') {
      if (!currentAnswer?.min || !currentAnswer?.max) {
        toast.error("Please fill in both range fields.");
        return;
      }
    } else if (currentQuestion.input.type === 'file') {
      // Optional file, so we allow proceeding
    } else if (!currentAnswer) {
      toast.error("Please answer the current question.");
      return;
    }

    if (currentQuestionStep < dynamicQuestions.length - 1) {
      setCurrentQuestionStep((prev) => prev + 1);
    } else {
      const payload = {
        answers: Object.entries(answers).map(([key, value]) => ({
          key,
          answer: typeof value === 'object' ? `${value.min}-${value.max}` : value,
        })),
      };
      saveAnswers(payload, {
        onSuccess: () => {
          setStep("completed");
          toast.success("Profile optimization complete!");
        },
      });
    }
  };

  const handleBack = () => {
    if (currentQuestionStep > 0) {
      setCurrentQuestionStep((prev) => prev - 1);
    } else {
      setStep("goal");
    }
  };

  if (step === "goal") {
    return (
      <div className="space-y-10 max-w-[600px] mx-auto">
        <div className="text-center space-y-3">
          <h2 className="sora-semibold text-[26px] md:text-[32px] text-[#161A21] leading-tight">
            What&apos;s your primary goal with Remote<br />Workher?
          </h2>
        </div>

        <RadioGroup value={selectedGoal} onValueChange={setSelectedGoal} className="space-y-4">
          {goals.map((goal) => (
            <FieldLabel key={goal.value} htmlFor={goal.value} className="w-full has-[>[data-slot=field]]:border-none has-[>[data-slot=field]]:rounded-none">
              <Field 
                orientation="horizontal" 
                data-slot="field"
                className={`cursor-pointer h-[64px] rounded-full border px-6 flex items-center gap-4 transition-all duration-200 ${
                  selectedGoal === goal.value 
                    ? 'border-[#322FEB] bg-[#F6F3FF] ring-1 ring-[#322FEB]' 
                    : 'border-[#E8E8E8] hover:border-[#322FEB] hover:bg-gray-50'
                }`}
              >
                <RadioGroupItem value={goal.value} id={goal.value} />
                <FieldContent className="flex-row">
                  <FieldDescription className="text-[#161A21] text-[16px] font-medium leading-none">
                    {goal.label}
                  </FieldDescription>
                </FieldContent>
              </Field>
            </FieldLabel>
          ))}
        </RadioGroup>

        <div className="flex justify-between items-center pt-8">
          <Button 
            variant="outline" 
            className="rounded-full h-[52px] px-8 border-[#E8E8E8] text-[#95969A] font-medium"
            disabled
          >
            <ChevronLeft className="mr-2 w-4 h-4" /> Back
          </Button>
          <Button 
            onClick={handleGoalSubmit} 
            className="rounded-full h-[52px] px-10 bg-[#322FEB] hover:bg-[#2826c8] transition-all" 
            disabled={isSettingGoal || !selectedGoal}
          >
            {isSettingGoal ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              <div className="flex items-center gap-2">
                Next <ChevronRight className="w-4 h-4" />
              </div>
            )}
          </Button>
        </div>
      </div>
    );
  }

  if (step === "completed") {
    return (
      <div className="text-center space-y-8 max-w-[500px] mx-auto py-12">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-[#E8F8EE] flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-[#13A351]" />
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="sora-semibold text-[28px] text-[#161A21]">All Set!</h2>
          <p className="text-[#6A6D71] text-[16px]">Your professional profile has been optimized based on your goals.</p>
        </div>
        <Button asChild className="w-full h-[56px] rounded-full text-[16px] bg-[#322FEB]">
          <a href="/career-tools">Go to Career Tools</a>
        </Button>
      </div>
    );
  }

  if (!currentQuestion) return null;

  const progress = ((currentQuestionStep + 1) / dynamicQuestions.length) * 100;

  return (
    <div className="space-y-8 max-w-[700px] mx-auto">
      {/* Progress Section */}
      <div className="space-y-4 max-w-[400px] mx-auto">
         <p className="text-[#6A6D71] text-[14px] text-center font-medium">
           Step {currentQuestionStep + 1} of {dynamicQuestions.length}
         </p>
         <div className="h-[6px] w-full bg-[#E8E8E8] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#322FEB] transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }}
            />
         </div>
      </div>

      <div className="text-center space-y-3 pt-4">
        <h2 className="sora-semibold text-[26px] md:text-[32px] text-[#161A21] leading-tight">
          {currentQuestion.label}
        </h2>
      </div>

      <div className="min-h-[220px] flex flex-col items-center justify-center w-full max-w-[500px] mx-auto">
        {currentQuestion.input.type === "dropdown" && (
          <Select onValueChange={(val: string) => handleAnswerChange(currentQuestion.key, val)} value={answers[currentQuestion.key]}>
            <SelectTrigger className="w-full h-[64px] rounded-full px-6 border-[#E8E8E8]">
              <SelectValue placeholder={currentQuestion.input.placeholder} />
            </SelectTrigger>
            <SelectContent className="rounded-2xl">
              {currentQuestion.options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {currentQuestion.input.type === "radio" && (
          <RadioGroup 
            onValueChange={(val) => handleAnswerChange(currentQuestion.key, val)} 
            value={answers[currentQuestion.key]} 
            className="w-full space-y-4"
          >
            {currentQuestion.options.map((opt) => (
              <FieldLabel key={opt.value} htmlFor={opt.value} className="w-full has-[>[data-slot=field]]:border-none has-[>[data-slot=field]]:rounded-none">
                <Field 
                  orientation="horizontal" 
                  data-slot="field"
                  className={`cursor-pointer h-[64px] rounded-full border px-6 transition-all ${
                    answers[currentQuestion.key] === opt.value 
                      ? 'border-[#322FEB] bg-[#F6F3FF] ring-1 ring-[#322FEB]' 
                      : 'border-[#E8E8E8] hover:border-[#322FEB] hover:bg-gray-50'
                  }`}
                >
                  <RadioGroupItem value={opt.value} id={opt.value} />
                  <FieldContent className="flex-row">
                    <FieldDescription className="text-[#161A21] text-[16px] font-medium">{opt.label}</FieldDescription>
                  </FieldContent>
                </Field>
              </FieldLabel>
            ))}
          </RadioGroup>
        )}

        {(currentQuestion.input.type === "text" || currentQuestion.input.type === "number") && (
          <Input
            type={currentQuestion.input.type}
            placeholder={currentQuestion.input.placeholder}
            className="h-[64px] rounded-full px-6 border-[#E8E8E8] focus-visible:ring-[#322FEB]"
            value={answers[currentQuestion.key] || ""}
            onChange={(e) => handleAnswerChange(currentQuestion.key, e.target.value)}
          />
        )}

        {currentQuestion.input.type === "range" && (
          <div className="w-full space-y-4">
            <div className="flex flex-col gap-2">
              <span className="text-[#161A21] text-[15px] font-medium ml-1">
                {currentQuestion.input.base_label || "Salary Range"}
              </span>
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#95969A] text-[18px]">₦</span>
                  <Input
                    type="number"
                    placeholder={currentQuestion.input.placeholder || "input your salary"}
                    className="h-[64px] rounded-full pl-10 pr-6 border-[#E8E8E8] focus-visible:ring-[#322FEB]"
                    value={answers[currentQuestion.key]?.min || ""}
                    onChange={(e) => handleRangeChange(currentQuestion.key, 'min', e.target.value)}
                  />
                </div>
                <span className="text-[#6A6D71] font-medium italic">to</span>
                <div className="relative flex-1">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#95969A] text-[18px]">₦</span>
                  <Input
                    type="number"
                    placeholder={currentQuestion.input.placeholder || "input your salary"}
                    className="h-[64px] rounded-full pl-10 pr-6 border-[#E8E8E8] focus-visible:ring-[#322FEB]"
                    value={answers[currentQuestion.key]?.max || ""}
                    onChange={(e) => handleRangeChange(currentQuestion.key, 'max', e.target.value)}
                  />
                </div>
              </div>
            </div>
            <p className="text-[#6A6D71] text-[14px] ml-1">
              Example: ₦300,000 - ₦500,000 monthly
            </p>
          </div>
        )}

        {currentQuestion.input.type === "file" && (
          <div className="w-full space-y-4">
            <p className="text-[#161A21] text-[15px] font-medium ml-1">
              {currentQuestion.input.label || "Upload resume (optional)"}
            </p>
            <div 
              className="w-full border-2 border-dashed border-[#E8E8E8] rounded-2xl flex flex-col items-center justify-center py-10 px-6 bg-white relative hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <input 
                type="file" 
                id="file-upload" 
                className="hidden" 
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleAnswerChange(currentQuestion.key, file);
                }}
              />
              <div className="bg-[#F6F3FF] w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <ChevronRight className="w-6 h-6 text-[#322FEB] -rotate-90" />
              </div>
              <p className="text-[#161A21] text-[16px] font-medium">
                {answers[currentQuestion.key] instanceof File ? answers[currentQuestion.key].name : "Upload file"}
              </p>
              <p className="text-[#6A6D71] text-[14px] mt-1 text-center">
                JPEG, PNG, PDF, and MP4 formats, up to 50 MB.
              </p>
              <Button 
                variant="outline" 
                className="mt-6 rounded-full px-8 border-[#E8E8E8] text-[#161A21]"
                asChild
              >
                <span>Browse File</span>
              </Button>
            </div>
            <p className="text-[#6A6D71] text-[15px] text-center mt-6">
              We&apos;ll analyze it for free and give you an ATS score + improvement tips.
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-between gap-4 pt-6 max-w-[500px] mx-auto w-full">
        <Button 
          variant="outline" 
          className="rounded-full h-[52px] px-8 border-[#E8E8E8] text-[#161A21] font-medium" 
          onClick={handleBack} 
          disabled={isSaving}
        >
          <ChevronLeft className="mr-2 w-4 h-4" /> Back
        </Button>
        <Button 
          className="rounded-full h-[52px] px-10 bg-[#322FEB] font-medium hover:bg-[#2826c8]" 
          onClick={handleNext} 
          disabled={isSaving}
        >
          {isSaving ? <Loader2 className="animate-spin" /> : (
            currentQuestionStep === dynamicQuestions.length - 1 ? "Finish" : (
              <div className="flex items-center gap-2">Next <ChevronRight className="w-4 h-4" /></div>
            )
          )}
        </Button>
      </div>
    </div>
  );
};

export default OnboardingFlow;
