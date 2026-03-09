"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToolBySlug, useGenerateToolOutput } from "@/hooks/useCareerTools";
import { Loader2, ArrowLeft, RefreshCw } from "lucide-react";
import { ToolPageSkeleton } from "@/components/reusables/Skeletons";
import { toast } from "sonner";
import ToolFormWrapper from "@/components/reusables/ToolFormWrapper";
import { useCareerStore } from "@/lib/store/useCareerStore";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ProcessModal from "@/components/reusables/ProcessModal";

const MAX_CHARS = 200;

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

const Page = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const router = useRouter();
  const { data: tool, isLoading: isLoadingTool } = useToolBySlug(slug);
  const generateMutation = useGenerateToolOutput(slug);
  const addResult = useCareerStore((state) => state.addResult);

  const [formData, setFormData] = useState<any>({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Initialize form data based on tool slug rules
  useEffect(() => {
    if (!slug) return;
    
    // Check slug or tool name for better matching
    const effectiveSlug = slug.toLowerCase();

    if (effectiveSlug.includes("email")) {
      setFormData({
        email_type: "Job Application",
        email_tone: "Professional",
        recipient_name: "",
        recipient_role: "",
        company: "",
        context_details: "",
      });
    } else if (effectiveSlug.includes("headline")) {
      setFormData({
        current_role: "",
        target_role: "",
        industry: "",
        key_skills: "",
      });
    } else if (effectiveSlug.includes("cover-letter")) {
      setFormData({
        template: "Modern Professional",
        full_name: "",
        job_title: "",
        company_name: "",
        writing_tone: "Professional",
        job_description: "",
        relevant_experience: "",
        key_skills: "",
      });
    } else if (effectiveSlug.includes("post-writer")) {
      setFormData({
        post_topic: "",
        additional_context: "",
        post_type: "Educational",
        tone: "Professional",
      });
    } else if (effectiveSlug.includes("summary-generator")) {
      setFormData({
        current_role: "",
        target_audience: "",
        tone: "Professional",
        experience_background: "",
        key_achievements: "",
      });
    } else if (effectiveSlug.includes("explore-careers")) {
      setFormData({
        career_job_title: "",
        location: "",
      });
    } else if (effectiveSlug.includes("roadmap")) {
      setFormData({
        current_role: "",
        years_of_experience: "",
        key_skills: "",
        target_monthly_income: "",
        timeline: "12 months",
      });
    } else if (effectiveSlug.includes("salary-analyzer")) {
      setFormData({
        job_title: "",
        location: "",
        experience_level: "Mid-level",
        industry: "",
      });
    } else if (effectiveSlug.includes("pitch")) {
      setFormData({
        current_role: "",
        target_role: "",
        context: "",
        duration: "30 seconds",
        key_strengths_skills: "",
        unique_achievements_perspectives: "",
      });
    } else if (effectiveSlug.includes("resume-optimizer")) {
      setFormData({
        current_resume: "",
        job_description: "",
      });
    } else if (effectiveSlug.includes("brand-audit")) {
      setFormData({
        current_role: "",
        desired_brand_perception: "",
        linkedin_url: "",
        portfolio_url: "",
      });
    } else {
      setFormData({ context_details: "" });
    }
  }, [slug]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const data = await generateMutation.mutateAsync(formData);
      addResult(slug, data);
      toast.success("Content generated successfully!");
      router.push(`/career-tools/${slug}/result`);
    } catch (error: any) {
      console.error("Content generation error:", error?.response?.data || error.message);
      toast.error(error?.response?.data?.message || "Failed to generate content.");
      setIsProcessing(false);
    }
  };

  if (isLoadingTool) {
    return <ToolPageSkeleton />;
  }

  if (!tool) {
    return (
      <div className="p-8 text-center space-y-4">
        <h1 className="text-2xl font-bold">Tool not found</h1>
        <Button onClick={() => router.push("/career-tools")}>Go Back</Button>
      </div>
    );
  }

  /* ──────────────── Form Logic Rendering ──────────────── */
  const renderFormFields = () => {
    const s = slug.toLowerCase();
    
    if (s.includes("cover-letter")) {
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label>Full Name</Label><Input placeholder="John Doe" value={formData.full_name || ""} onChange={(e) => handleInputChange("full_name", e.target.value)} /></div>
              <div className="space-y-1.5"><Label>Job Title</Label><Input placeholder="Frontend Engineer" value={formData.job_title || ""} onChange={(e) => handleInputChange("job_title", e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label>Company Name</Label><Input placeholder="e.g. Google" value={formData.company_name || ""} onChange={(e) => handleInputChange("company_name", e.target.value)} /></div>
              <div className="space-y-1.5">
                <Label>Writing Tone</Label>
                <select value={formData.writing_tone} onChange={(e) => handleInputChange("writing_tone", e.target.value)} className="w-full h-[40px] rounded-[10px] border border-[#E8E8E8] bg-white px-3 text-[14px]">
                  {["Professional", "Friendly", "Enthusiastic", "Confident", "Academic"].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="space-y-1.5"><Label>Key Skills</Label><Input placeholder="React, TypeScript, UI Design" value={formData.key_skills || ""} onChange={(e) => handleInputChange("key_skills", e.target.value)} /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label>Relevant Experience (Max 200 chars)</Label><Textarea value={formData.relevant_experience || ""} onChange={(e) => handleInputChange("relevant_experience", e.target.value.slice(0, 200))} rows={3} /></div>
              <div className="space-y-1.5"><Label>Job Description (Optional, Max 200 chars)</Label><Textarea value={formData.job_description || ""} onChange={(e) => handleInputChange("job_description", e.target.value.slice(0, 200))} rows={3} /></div>
            </div>
          </>
        );
    }

    if (s.includes("email")) {
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Email Type</Label>
                <select value={formData.email_type} onChange={(e) => handleInputChange("email_type", e.target.value)} className="w-full h-[40px] rounded-[10px] border border-[#E8E8E8] bg-white px-3 text-[14px]">
                  {emailTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label>Email Tone</Label>
                <select value={formData.email_tone} onChange={(e) => handleInputChange("email_tone", e.target.value)} className="w-full h-[40px] rounded-[10px] border border-[#E8E8E8] bg-white px-3 text-[14px]">
                  {emailTones.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5"><Label>Recipient Name</Label><Input value={formData.recipient_name || ""} onChange={(e) => handleInputChange("recipient_name", e.target.value)} /></div>
                <div className="space-y-1.5"><Label>Recipient Role</Label><Input value={formData.recipient_role || ""} onChange={(e) => handleInputChange("recipient_role", e.target.value)} /></div>
            </div>
            <div className="space-y-1.5"><Label>Company</Label><Input value={formData.company || ""} onChange={(e) => handleInputChange("company", e.target.value)} /></div>
            <div className="space-y-1.5"><Label>Context Details (Max 200 chars)</Label><Textarea value={formData.context_details || ""} onChange={(e) => handleInputChange("context_details", e.target.value.slice(0, 200))} rows={4} /></div>
          </>
        );
    }

    if (s.includes("resume-optimizer")) {
        return (
          <>
            <div className="space-y-1.5"><Label>Your Current Resume (Paste Content)</Label><Textarea value={formData.current_resume || ""} onChange={(e) => handleInputChange("current_resume", e.target.value)} rows={6} /></div>
            <div className="space-y-1.5"><Label>Target Job Description</Label><Textarea value={formData.job_description || ""} onChange={(e) => handleInputChange("job_description", e.target.value)} rows={6} /></div>
          </>
        );
    }

    if (s.includes("headline")) {
        return (
          <>
            <div className="space-y-1.5"><Label>Current Role</Label><Input value={formData.current_role || ""} onChange={(e) => handleInputChange("current_role", e.target.value)} /></div>
            <div className="space-y-1.5"><Label>Target Role (Optional)</Label><Input value={formData.target_role || ""} onChange={(e) => handleInputChange("target_role", e.target.value)} /></div>
            <div className="space-y-1.5"><Label>Industry</Label><Input value={formData.industry || ""} onChange={(e) => handleInputChange("industry", e.target.value)} /></div>
            <div className="space-y-1.5"><Label>Key Skills</Label><Input placeholder="React, Node, Leadership" value={formData.key_skills || ""} onChange={(e) => handleInputChange("key_skills", e.target.value)} /></div>
          </>
        );
    }

    if (s.includes("post-writer")) {
        return (
          <>
            <div className="space-y-1.5"><Label>Post Topic</Label><Input value={formData.post_topic || ""} onChange={(e) => handleInputChange("post_topic", e.target.value)} /></div>
            <div className="space-y-1.5"><Label>Post Type</Label>
              <select value={formData.post_type} onChange={(e) => handleInputChange("post_type", e.target.value)} className="w-full h-[40px] rounded-[10px] border border-[#E8E8E8] bg-white px-3">
                {["Educational", "Story-telling", "Career Milestone", "Hiring Notice", "Thought Leadership"].map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label>Tone</Label>
              <select value={formData.tone} onChange={(e) => handleInputChange("tone", e.target.value)} className="w-full h-[40px] rounded-[10px] border border-[#E8E8E8] bg-white px-3">
                {["Professional", "Casual", "Bold", "Humorous"].map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="space-y-1.5"><Label>Additional Context (Optional)</Label><Textarea value={formData.additional_context || ""} onChange={(e) => handleInputChange("additional_context", e.target.value)} rows={3} /></div>
          </>
        );
    }

    if (s.includes("summary-generator")) {
        return (
          <>
            <div className="space-y-1.5"><Label>Current Role</Label><Input value={formData.current_role || ""} onChange={(e) => handleInputChange("current_role", e.target.value)} /></div>
            <div className="space-y-1.5"><Label>Target Audience</Label><Input placeholder="e.g. Fintech Recruiters" value={formData.target_audience || ""} onChange={(e) => handleInputChange("target_audience", e.target.value)} /></div>
            <div className="space-y-1.5">
              <Label>Tone</Label>
              <select value={formData.tone} onChange={(e) => handleInputChange("tone", e.target.value)} className="w-full h-[40px] rounded-[10px] border border-[#E8E8E8] bg-white px-3">
                {["Confident", "Professional", "Approachable", "Creative"].map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="space-y-1.5"><Label>Experience Background</Label><Textarea value={formData.experience_background || ""} onChange={(e) => handleInputChange("experience_background", e.target.value)} rows={3} /></div>
            <div className="space-y-1.5"><Label>Key Achievements</Label><Textarea value={formData.key_achievements || ""} onChange={(e) => handleInputChange("key_achievements", e.target.value)} rows={3} /></div>
          </>
        );
    }

    if (s.includes("explore-careers") || s.includes("salary-analyzer")) {
        return (
          <>
            <div className="space-y-1.5"><Label>{s.includes("explore") ? "Career Job Title" : "Job Title"}</Label><Input value={formData.career_job_title || formData.job_title || ""} onChange={(e) => handleInputChange(s.includes("explore") ? "career_job_title" : "job_title", e.target.value)} /></div>
            <div className="space-y-1.5"><Label>Location</Label><Input placeholder="e.g. Lagos, Nigeria" value={formData.location || ""} onChange={(e) => handleInputChange("location", e.target.value)} /></div>
            {s.includes("salary") && (
              <div className="space-y-1.5">
                <Label>Experience Level</Label>
                <select value={formData.experience_level} onChange={(e) => handleInputChange("experience_level", e.target.value)} className="w-full h-[40px] rounded-[10px] border border-[#E8E8E8] bg-white px-3">
                  {["Entry-level", "Mid-level", "Senior-level", "Executive"].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            )}
          </>
        );
    }
  
    if (s.includes("roadmap")) {
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label>Current Role</Label><Input value={formData.current_role || ""} onChange={(e) => handleInputChange("current_role", e.target.value)} /></div>
              <div className="space-y-1.5"><Label>Years of Experience</Label><Input value={formData.years_of_experience || ""} onChange={(e) => handleInputChange("years_of_experience", e.target.value)} /></div>
            </div>
            <div className="space-y-1.5"><Label>Key Skills</Label><Input value={formData.key_skills || ""} onChange={(e) => handleInputChange("key_skills", e.target.value)} /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label>Target Monthly Income</Label><Input value={formData.target_monthly_income || ""} onChange={(e) => handleInputChange("target_monthly_income", e.target.value)} /></div>
              <div className="space-y-1.5"><Label>Timeline</Label><Input value={formData.timeline || ""} onChange={(e) => handleInputChange("timeline", e.target.value)} /></div>
            </div>
          </>
        );
    }

    if (s.includes("pitch")) {
        return (
          <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5"><Label>Current Role</Label><Input value={formData.current_role || ""} onChange={(e) => handleInputChange("current_role", e.target.value)} /></div>
                <div className="space-y-1.5"><Label>Target Role</Label><Input value={formData.target_role || ""} onChange={(e) => handleInputChange("target_role", e.target.value)} /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5"><Label>Context</Label><Input placeholder="e.g Networking Event" value={formData.context || ""} onChange={(e) => handleInputChange("context", e.target.value)} /></div>
                <div className="space-y-1.5"><Label>Duration</Label><select value={formData.duration} onChange={(e) => handleInputChange("duration", e.target.value)} className="w-full h-[40px] rounded-[10px] border border-[#E8E8E8] bg-white px-3">
                  {["15 seconds", "30 seconds", "60 seconds"].map(t => <option key={t} value={t}>{t}</option>)}
                </select></div>
              </div>
              <div className="space-y-1.5"><Label>Key Strengths & Skills</Label><Input value={formData.key_strengths_skills || ""} onChange={(e) => handleInputChange("key_strengths_skills", e.target.value)} /></div>
              <div className="space-y-1.5"><Label>Unique Achievements</Label><Textarea value={formData.unique_achievements_perspectives || ""} onChange={(e) => handleInputChange("unique_achievements_perspectives", e.target.value)} rows={3} /></div>
          </>
        );
    }

    if (s.includes("brand-audit")) {
        return (
          <>
             <div className="space-y-1.5"><Label>Current Role</Label><Input value={formData.current_role || ""} onChange={(e) => handleInputChange("current_role", e.target.value)} /></div>
             <div className="space-y-1.5"><Label>Desired Brand Perception</Label><Input placeholder="e.g. Reliable Fintech Expert" value={formData.desired_brand_perception || ""} onChange={(e) => handleInputChange("desired_brand_perception", e.target.value)} /></div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="space-y-1.5"><Label>LinkedIn URL (Optional)</Label><Input value={formData.linkedin_url || ""} onChange={(e) => handleInputChange("linkedin_url", e.target.value)} /></div>
               <div className="space-y-1.5"><Label>Portfolio URL (Optional)</Label><Input value={formData.portfolio_url || ""} onChange={(e) => handleInputChange("portfolio_url", e.target.value)} /></div>
             </div>
          </>
        );
    }

    return (
      <div className="space-y-1.5">
        <Label>Additional Context & Details</Label>
        <div className="relative">
          <Textarea
            placeholder="Provide details about the situation..."
            value={formData.context_details || ""}
            onChange={(e) => handleInputChange("context_details", e.target.value.slice(0, MAX_CHARS))}
            rows={6}
            className="rounded-[20px] resize-none pr-4"
          />
          <span className="absolute bottom-3 right-4 text-[11px] text-[#95969A]">
            {formData.context_details?.length || 0}/{MAX_CHARS}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#FFFCFD] min-h-screen px-4 md:px-8 py-8 flex flex-col items-center">
      <div className="w-full max-w-[1000px]">

        <ToolFormWrapper
          icon="/sparkling-line.svg"
          title={tool?.name || "Career Tool"}
          description={tool?.description || "Loading..."}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {renderFormFields()}
            
            <div className="pt-4 flex justify-center">
              <Button type="submit" disabled={generateMutation.isPending} className="gap-2 px-10 h-14 bg-[#322FEB] hover:bg-[#322FEB]/90 rounded-full shadow-[0px_8px_16px_0px_#322FEB4D] transition-all active:scale-95 text-[16px]">
                {generateMutation.isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Image src="/sparkling-line.svg" width={20} height={20} alt="gen" className="brightness-[10]" />
                )}
                {generateMutation.isPending ? "Generating Content..." : `Generate ${tool?.name || "Content"} (${tool?.generate_token_cost || 0} tokens)`}
              </Button>
            </div>
          </form>
        </ToolFormWrapper>
      </div>

      <Dialog open={isProcessing}>
        <DialogContent 
          className="sm:max-w-md p-0 overflow-hidden border-none" 
          showCloseButton={false}
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <div className="p-10 bg-white">
            <ProcessModal 
              title={`Generating ${tool?.name || 'Content'}`}
              description={`AI is crafting your ${tool?.name?.toLowerCase() || 'response'}. Please wait a few seconds...`}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;
