"use client";
import { BaseToolPage } from "@/components/career-tools/BaseToolPage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const emailTypes = [
  "Job Application",
  "Networking",
  "Follow-up",
  "Thank You",
  "Cold Outreach",
  "Interview Request",
  "Referral",
];

const emailTones = [
  "Professional",
  "Formal",
  "Confident",
  "Friendly",
  "Enthusiastic",
  "Casual",
];

export default function EmailWriterPage() {
  return (
    <BaseToolPage
      slug="email-writer"
      resultPath="/career-tools/resumes/email-writer/result"
      submitButtonText="Generate email"
      initialData={{
        email_type: "Job Application",
        email_tone: "Professional",
        recipient_name: "",
        recipient_role: "",
        company: "",
        context_details: "",
      }}
      renderFields={(formData, handleInputChange) => (
        <>
              <div className="space-y-1.5">
                <Label className="text-[14px]">Email Type</Label>
                <select value={formData.email_type} onChange={(e) => handleInputChange("email_type", e.target.value)} className="w-full h-[40px] rounded-[10px] border border-[#E8E8E8] bg-white px-3 text-[14px]">
                  {emailTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[14px]">Email Tone</Label>
                <select value={formData.email_tone} onChange={(e) => handleInputChange("email_tone", e.target.value)} className="w-full h-[40px] rounded-[10px] border border-[#E8E8E8] bg-white px-3 text-[14px]">
                  {emailTones.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            <div className="space-y-1.5"><Label className="text-[14px]">Recipient Name</Label><Input value={formData.recipient_name} onChange={(e) => handleInputChange("recipient_name", e.target.value)} placeholder="e.g., Sarah Johnson" /></div>
            <div className="space-y-1.5"><Label className="text-[14px]">Recipient Role</Label><Input value={formData.recipient_role} onChange={(e) => handleInputChange("recipient_role", e.target.value)} placeholder="e.g Senior Engineer" /></div>
            <div className="space-y-1.5"><Label className="text-[14px]">Company</Label><Input value={formData.company} onChange={(e) => handleInputChange("company", e.target.value)} placeholder="e.g. Moniepoint" /></div>
            <div className="space-y-1.5 flex flex-col gap-1.5">
              <Label className="text-[14px]">Context & Details</Label>
              <div className="relative">
                <Textarea 
                  value={formData.context_details} 
                  onChange={(e) => handleInputChange("context_details", e.target.value.slice(0, 200))} 
                  rows={4} 
                  placeholder="Provide details about the situation, what you want to communicate, the job you're applying for, etc..." 
                />
                <div className="absolute bottom-2 right-2 text-[10px] text-gray-400">
                  {formData.context_details?.length || 0}/200
                </div>
              </div>
            </div>
        </>
      )}
    />
  );
}
