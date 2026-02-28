"use client";
import { BaseToolPage } from "@/components/career-tools/BaseToolPage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BrandAuditPage() {
  return (
    <BaseToolPage
      slug="personal-brand-audit"
      resultPath="/career-tools/growth/brand-audit/result"
      initialData={{
        current_role: "",
        desired_brand_perception: "",
        linkedin_url: "",
        portfolio_url: "",
      }}
      renderFields={(formData, handleInputChange) => (
        <>
             <div className="space-y-1.5"><Label>Current Role</Label><Input value={formData.current_role} onChange={(e) => handleInputChange("current_role", e.target.value)} /></div>
             <div className="space-y-1.5"><Label>Desired Brand Perception</Label><Input placeholder="e.g. Reliable Fintech Expert" value={formData.desired_brand_perception} onChange={(e) => handleInputChange("desired_brand_perception", e.target.value)} /></div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="space-y-1.5"><Label>LinkedIn URL (Optional)</Label><Input value={formData.linkedin_url} onChange={(e) => handleInputChange("linkedin_url", e.target.value)} /></div>
               <div className="space-y-1.5"><Label>Portfolio URL (Optional)</Label><Input value={formData.portfolio_url} onChange={(e) => handleInputChange("portfolio_url", e.target.value)} /></div>
             </div>
        </>
      )}
    />
  );
}
