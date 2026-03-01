"use client";
import { BaseToolPage } from "@/components/career-tools/BaseToolPage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const INCOME_STEPS = [
  "₦100K", "₦200K", "₦300K", "₦400K", "₦500K", "₦600K", "₦700K", "₦800K", "₦900K",
  "₦1M", "₦1.5M", "₦2M", "₦2.5M", "₦3M", "₦3.5M", "₦4M", "₦4.5M", "₦5M+"
];

const TIMELINE_OPTIONS = ["6-12 Months", "1-2 Years", "2-3 Years", "3-5 Years"];

export default function CareerRoadmapPage() {
  const [sliderValue, setSliderValue] = useState(4); // default index 4 = ₦500K

  return (
    <BaseToolPage
      slug="career-roadmap"
      resultPath="/career-tools/career/roadmap/result"
      submitButtonText="Show my career roadmap"
      initialData={{
        current_role: "",
        years_of_experience: "",
        key_skills: "",
        target_monthly_income: INCOME_STEPS[4],
        timeline: "3-5 Years",
      }}
      renderFields={(formData, handleInputChange) => (
        <div className="space-y-7">
          {/* Current Role */}
          <div className="space-y-2 text-left">
            <Label className="text-[#161A21] font-semibold text-[14px]">What&apos;s your current role?</Label>
            <Input
              placeholder="e.g., Virtual Assistant, Customer Support, Junior Designer"
              value={formData.current_role}
              onChange={(e) => handleInputChange("current_role", e.target.value)}
              className="h-14 rounded-xl border-[#E8E8E8] bg-white"
            />
          </div>

          {/* Years of Experience */}
          <div className="space-y-2 text-left">
            <Label className="text-[#161A21] font-semibold text-[14px]">Years of experience</Label>
            <Select
              value={formData.years_of_experience}
              onValueChange={(val) => handleInputChange("years_of_experience", val)}
            >
              <SelectTrigger className="h-14 rounded-xl border-[#E8E8E8] bg-white text-left">
                <SelectValue placeholder="Select year of experience" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="0-1 years">0-1 years</SelectItem>
                <SelectItem value="1-2 years">1-2 years</SelectItem>
                <SelectItem value="2-3 years">2-3 years</SelectItem>
                <SelectItem value="3-5 years">3-5 years</SelectItem>
                <SelectItem value="5-7 years">5-7 years</SelectItem>
                <SelectItem value="7-10 years">7-10 years</SelectItem>
                <SelectItem value="10+ years">10+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Key Skills */}
          <div className="space-y-2 text-left">
            <Label className="text-[#161A21] font-semibold text-[14px]">Key Skills (comma-separated)</Label>
            <Input
              placeholder="JavaScript, React, Team Leadership, Problem Solving..."
              value={formData.key_skills}
              onChange={(e) => handleInputChange("key_skills", e.target.value)}
              className="h-14 rounded-xl border-[#E8E8E8] bg-white"
            />
          </div>

          {/* Target Monthly Income Slider */}
          <div className="space-y-3 text-left">
            <Label className="text-[#161A21] font-semibold text-[14px]">
              Target Monthly Income: <span className="text-[#322FEB] font-bold">{INCOME_STEPS[sliderValue]}</span>
            </Label>
            <input
              type="range"
              min={0}
              max={INCOME_STEPS.length - 1}
              value={sliderValue}
              onChange={(e) => {
                const idx = parseInt(e.target.value);
                setSliderValue(idx);
                handleInputChange("target_monthly_income", INCOME_STEPS[idx]);
              }}
              className="w-full h-2 rounded-full appearance-none cursor-pointer accent-[#322FEB]"
              style={{
                background: `linear-gradient(to right, #322FEB 0%, #322FEB ${(sliderValue / (INCOME_STEPS.length - 1)) * 100}%, #E8E8E8 ${(sliderValue / (INCOME_STEPS.length - 1)) * 100}%, #E8E8E8 100%)`,
              }}
            />
            <div className="flex justify-between text-[12px] text-[#6A6D71]">
              <span>₦100K</span>
              <span>₦5M+</span>
            </div>
          </div>

          {/* Timeline Radio Options */}
          <div className="space-y-3 text-left">
            <Label className="text-[#161A21] font-semibold text-[14px]">Timeline to reach your goal</Label>
            <div className="flex flex-wrap gap-3">
              {TIMELINE_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleInputChange("timeline", option)}
                  className={`px-5 py-3 rounded-full border-2 text-[14px] font-medium transition-all ${
                    formData.timeline === option
                      ? "border-[#322FEB] text-[#322FEB] bg-white"
                      : "border-[#E8E8E8] text-[#6A6D71] bg-white hover:border-[#322FEB40]"
                  }`}
                >
                  {formData.timeline === option && (
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#322FEB] mr-2" />
                  )}
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    />
  );
}
