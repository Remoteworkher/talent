"use client";
import { BaseToolPage } from "@/components/career-tools/BaseToolPage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pencil } from "lucide-react";

const postTypes = [
  "Select an option",
  "Educational",
  "Story-telling",
  "Career Milestone",
  "Hiring Notice",
  "Thought Leadership",
];

const tones = [
  "Select an option",
  "Professional",
  "Casual",
  "Bold",
  "Humorous",
  "Enthusiastic",
];

export default function PostWriterPage() {
  return (
    <BaseToolPage
      slug="linkedin-post-writer"
      resultPath="/career-tools/linkedin/post-writer/result"
      submitButtonText="Generate post"
      icon={<Pencil className="w-6 h-6" />}
      initialData={{
        post_topic: "",
        additional_context: "",
        post_type: "Select an option",
        tone: "Select an option",
      }}
      renderFields={(formData, handleInputChange) => (
        <>
          <div className="space-y-1.5">
            <Label className="text-[14px]">Post Topic</Label>
            <Input
              value={formData.post_topic}
              onChange={(e) => handleInputChange("post_topic", e.target.value)}
              placeholder="e.g., 5 lessons from my first year as a tech lead"
            />
          </div>

          <div className="space-y-1.5 flex flex-col gap-1.5">
            <Label className="text-[14px]">Additional Context</Label>
            <div className="relative">
              <Textarea
                value={formData.additional_context}
                onChange={(e) =>
                  handleInputChange(
                    "additional_context",
                    e.target.value.slice(0, 200),
                  )
                }
                rows={4}
                placeholder="Brief overview of your career journey, skills, and what you do..."
              />
              <div className="absolute bottom-2 right-2 text-[10px] text-gray-400">
                {formData.additional_context?.length || 0}/200
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-[14px]">Post Type</Label>
            <select
              value={formData.post_type}
              onChange={(e) => handleInputChange("post_type", e.target.value)}
              className="w-full h-[40px] rounded-full border border-[#E8E8E8] bg-white px-3 text-[14px] outline-none appearance-none bg-[url('/chevron-down.svg')] bg-[length:16px] bg-[right_12px_center] bg-no-repeat"
            >
              {postTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-[14px]">Tone</Label>
            <select
              value={formData.tone}
              onChange={(e) => handleInputChange("tone", e.target.value)}
              className="w-full h-[40px] rounded-full border border-[#E8E8E8] bg-white px-3 text-[14px] outline-none appearance-none bg-[url('/chevron-down.svg')] bg-[length:16px] bg-[right_12px_center] bg-no-repeat"
            >
              {tones.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    />
  );
}
