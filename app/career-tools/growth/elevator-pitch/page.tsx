"use client";
import { BaseToolPage } from "@/components/career-tools/BaseToolPage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ElevatorPitchPage() {
  return (
    <BaseToolPage
      slug="elevator-pitch"
      resultPath="/career-tools/growth/elevator-pitch/result"
      initialData={{
        current_role: "",
        target_role: "",
        context: "",
        duration: "30 seconds",
        key_strengths_skills: "",
        unique_achievements_perspectives: "",
      }}
      renderFields={(formData, handleInputChange) => (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label>Current Role</Label><Input value={formData.current_role} onChange={(e) => handleInputChange("current_role", e.target.value)} /></div>
              <div className="space-y-1.5"><Label>Target Role</Label><Input value={formData.target_role} onChange={(e) => handleInputChange("target_role", e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label>Context</Label><Input placeholder="e.g Networking Event" value={formData.context} onChange={(e) => handleInputChange("context", e.target.value)} /></div>
              <div className="space-y-1.5">
                  <Label>Duration</Label>
                  <select value={formData.duration} onChange={(e) => handleInputChange("duration", e.target.value)} className="w-full h-[40px] rounded-[10px] border border-[#E8E8E8] bg-white px-3">
                    {["15 seconds", "30 seconds", "60 seconds"].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
              </div>
            </div>
            <div className="space-y-1.5"><Label>Key Strengths & Skills</Label><Input value={formData.key_strengths_skills} onChange={(e) => handleInputChange("key_strengths_skills", e.target.value)} /></div>
            <div className="space-y-1.5"><Label>Unique Achievements</Label><Textarea value={formData.unique_achievements_perspectives} onChange={(e) => handleInputChange("unique_achievements_perspectives", e.target.value)} rows={3} placeholder="What makes you stand out?" /></div>
        </>
      )}
    />
  );
}
