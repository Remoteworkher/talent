import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface SkillsStepProps {
  targetRole: string;
  setTargetRole: (value: string) => void;
  skills: string;
  setSkills: (value: string) => void;
}

export const SkillsStep: React.FC<SkillsStepProps> = ({
  targetRole,
  setTargetRole,
  skills,
  setSkills,
}) => {
  return (
    <section>
      <div>
        <div className="text-center text-[#161A21] sora-semibold text-[18px] md:text-[24px]">
          Skills
        </div>
        <div className="text-[#6A6D71] text-[14px] md:text-[16px] text-center">
          Choose your immediate priority
        </div>
      </div>

      <div className="space-y-4 mt-6">
        <div className="space-y-1.5 flex flex-col gap-1.5 pt-4">
          <Label htmlFor="targetRole" className="text-[#161A21] font-semibold text-[14px]">
            Target Role (for AI optimization)
          </Label>
          <Input
            id="targetRole"
            placeholder="e.g. Senior Software Engineer, Product Manager"
            type="text"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="h-14 rounded-xl"
            required
          />
        </div>

        <div className="space-y-1.5 flex flex-col gap-1.5 pt-4">
          <Label htmlFor="skills" className="text-[#161A21] font-semibold text-[14px]">
            Skills (comma-separated)
          </Label>
          <Textarea
            id="skills"
            placeholder="e.g. JavaScript, React, Node.js, Python, AWS, Docker, Team Leadership, Project Management"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            rows={6}
            className="min-h-[132px] rounded-xl"
            required
          />
        </div>
      </div>
    </section>
  );
};
