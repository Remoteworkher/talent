"use client";
import React, { useRef } from "react";
import { BaseToolPage } from "@/components/career-tools/BaseToolPage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UploadCloud } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ElevatorPitchPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <BaseToolPage
      slug="elevator-pitch"
      titleOverride="Elevator Pitch Generator"
      descriptionOverride="Create a compelling 30-60 second pitch that makes you memorable"
      submitButtonText="Generate pitch"
      icon="/elevator-pitch.svg"
      resultPath="/career-tools/career/elevator-pitch/result"
      initialData={{
        current_role: "",
        target_role: "",
        context: "",
        duration: "30 seconds",
        key_strengths_skills: "",
        unique_achievements_perspectives: "",
        attachments: [] as File[],
      }}
      renderFields={(formData, handleInputChange) => (
        <div className="space-y-6">
            {/* Step 1: Upload */}
            <div className="space-y-3">
                <p className="text-[#161A21] font-semibold text-[14px] text-left">Step 1: Upload Page Image</p>
                <div 
                   onClick={() => fileInputRef.current?.click()}
                   className="border-2 border-dashed border-[#E8E8E8] rounded-[16px] p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors group"
                >
                   <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      multiple
                      onChange={(e) => {
                         const files = e.target.files;
                         if (files && files.length > 0) {
                           const existing = formData.attachments || [];
                           handleInputChange("attachments", [...existing, ...Array.from(files)]);
                         }
                         // Reset input so same file can be re-selected
                         e.target.value = "";
                      }} 
                   />
                   <div className="text-[#6A6D71] group-hover:text-[#322FEB] transition-colors">
                      <UploadCloud className="w-8 h-8" />
                   </div>
                   <div className="text-center">
                      <p className="text-[#161A21] font-bold text-[14px]">
                         {formData.attachments?.length > 0 
                           ? `${formData.attachments.length} file(s) selected` 
                           : "Upload your LinkedIn page image"}
                      </p>
                      <p className="text-[#95969A] text-[12px]">JPEG, PNG, PDF, and MP4 formats, up to 50 MB.</p>
                   </div>
                   <button 
                      type="button"
                      className="mt-2 px-6 py-2 border border-[#E8E8E8] rounded-full text-[13px] font-semibold text-[#161A21] hover:bg-white"
                   >
                      Browse File
                   </button>
                </div>
                {/* Show selected files */}
                {formData.attachments?.length > 0 && (
                  <div className="space-y-2">
                    {formData.attachments.map((file: File, idx: number) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-[#F9F9FB] border border-[#E8E8E8]">
                        <span className="text-[13px] text-[#161A21] truncate max-w-[250px]">{file.name}</span>
                        <button 
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            const updated = formData.attachments.filter((_: File, i: number) => i !== idx);
                            handleInputChange("attachments", updated);
                          }}
                          className="text-[#95969A] hover:text-red-500 text-[12px] font-medium px-2"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
            </div>

            <div className="space-y-1.5 text-left pt-2">
              <Label className="text-[#161A21] font-semibold text-[14px]">Current Role</Label>
              <Input 
                placeholder="e.g Product Designer" 
                value={formData.current_role} 
                onChange={(e) => handleInputChange("current_role", e.target.value)} 
                className="h-14 rounded-xl"
              />
            </div>
            
            <div className="space-y-1.5 text-left">
              <Label className="text-[#161A21] font-semibold text-[14px]">Target Role</Label>
              <Input 
                placeholder="e.g VP of Product" 
                value={formData.target_role} 
                onChange={(e) => handleInputChange("target_role", e.target.value)} 
                className="h-14 rounded-xl"
              />
            </div>

            <div className="space-y-1.5 text-left">
              <Label className="text-[#161A21] font-semibold text-[14px]">Context</Label>
              <Select value={formData.context} onValueChange={(v) => handleInputChange("context", v)}>
                <SelectTrigger className="h-14 rounded-xl border-[#E8E8E8]">
                  <SelectValue placeholder="Select a context e.g Networking Event" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {["Networking Event", "Job Interview", "Social Outing", "Investor Pitch", "Cold Call"].map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5 text-left">
              <Label className="text-[#161A21] font-semibold text-[14px]">Duration</Label>
              <Select value={formData.duration} onValueChange={(v) => handleInputChange("duration", v)}>
                <SelectTrigger className="h-14 rounded-xl border-[#E8E8E8]">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {["15 seconds", "30 seconds", "45 seconds", "60 seconds"].map(d => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5 text-left relative">
              <Label className="text-[#161A21] font-semibold text-[14px]">Key Strengths/Skills</Label>
              <Textarea 
                placeholder="What are you really good at? What do people come to you for?" 
                value={formData.key_strengths_skills} 
                onChange={(e) => handleInputChange("key_strengths_skills", e.target.value.slice(0, 200))} 
                className="min-h-[120px] rounded-xl pr-4 pb-8"
              />
              <div className="absolute bottom-2 right-4 text-[12px] text-[#95969A]">
                {formData.key_strengths_skills?.length || 0}/200
              </div>
            </div>

            <div className="space-y-1.5 text-left relative">
              <Label className="text-[#161A21] font-semibold text-[14px]">Any unique achievements, perspectives, or combinations of skills?</Label>
              <Textarea 
                placeholder="Any unique achievements, perspectives, or combinations of skills?" 
                value={formData.unique_achievements_perspectives} 
                onChange={(e) => handleInputChange("unique_achievements_perspectives", e.target.value.slice(0, 200))} 
                className="min-h-[120px] rounded-xl pr-4 pb-8"
              />
              <div className="absolute bottom-2 right-4 text-[12px] text-[#95969A]">
                {formData.unique_achievements_perspectives?.length || 0}/200
              </div>
            </div>
        </div>
      )}
    />
  );
}
