"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import TemplateCard from "@/components/Resources/TemplateCard";
import GuideCard from "@/components/Resources/GuideCard";
import SalaryCTA from "@/components/Resources/SalaryCTA";
import RecordingCard from "@/components/Resources/RecordingCard";
import ResourceDetail from "@/components/Resources/ResourceDetail";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const categories = [
  { id: "all", label: "All resources" },
  { id: "templates", label: "Templates" },
  { id: "guides", label: "Guides" },
  { id: "interview", label: "Interview" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "career", label: "Career" },
  { id: "videos", label: "Videos" },
];

const mockTemplates = [
  { id: "1", title: "Resume Templates", description: "Access reusable resume templates for your next job", image: "/resume-templates.svg", tokenCost: 1, actionLabel: "View resume templates", type: "PDF + Editable Document" },
  { id: "2", title: "Cover Letter Templates", description: "Access reusable cover letter templates for your next job", image: "/resume-templates.svg", tokenCost: 1, actionLabel: "View cover letter templates", type: "PDF + Editable Document" },
  { id: "3", title: "Email Templates", description: "Access reusable email templates for your next job", image: "/resume-templates.svg", tokenCost: 1, actionLabel: "View email templates", type: "PDF + Editable Document" },
];

const mockGuides = [
  { id: "g1", title: "Remote Work 101", description: "A guide on how to secure high paying remote jobs and staying productive", tokenCost: 1, buttonLabel: "Download" },
  { id: "g2", title: "Writing Winning Resumes", description: "Access reusable resume templates for your next job", tokenCost: 1, buttonLabel: "Download" },
  { id: "g3", title: "Building Remote Work Relationship", description: "Access reusable resume templates for your next job", tokenCost: 1, buttonLabel: "Download" },
];

const mockRecordings = [
  { id: "r1", title: "Resume Building Masterclass", description: "Learn how to build a professional resume that lands a high paying job...", duration: "45mins", date: "Jan 21, 2025" },
  { id: "r2", title: "Salary Negotiation Workshop", description: "Learn how to negotiate your salary like a pro...", duration: "60mins", date: "Jan 18, 2025" },
];

export default function ResourcesPage() {
  const [selectedResource, setSelectedResource] = useState<any>(null);

  if (selectedResource) {
    return (
      <ResourceDetail
        title={selectedResource.title}
        type={selectedResource.type || "Resource Guide"}
        image={selectedResource.image || "/resume-template-1.png"}
        tokenCost={selectedResource.tokenCost || 1}
        tokensAvailable={5}
        onBack={() => setSelectedResource(null)}
      />
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto p-4 md:p-8 space-y-12 pb-20">
      {/* Header */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="sora-semibold text-[28px] md:text-[36px] text-[#161A21]">Career Resources</h1>
          <p className="text-[#6A6D71] text-[16px]">Download templates, guides, and tools to advance your career</p>
        </div>

        {/* Search */}
        <div className="relative max-w-[1000px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#95969A] w-5 h-5" />
          <Input 
            className="h-[60px] pl-12 pr-6 rounded-full border-[#E8E8E8] bg-white text-[16px] focus-visible:ring-[#322FEB]"
            placeholder="Search resources..."
          />
        </div>

        <Tabs defaultValue="all" className="w-full space-y-8">
          <TabsList className="bg-transparent h-auto p-0 flex flex-wrap gap-2 justify-start overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="px-6 py-2.5 border border-[#E8E8E8] bg-white text-[#6A6D71] data-[state=active]:bg-[#322FEB] data-[state=active]:text-white data-[state=active]:border-[#322FEB] data-[state=active]:shadow-md data-[state=active]:shadow-blue-100 transition-all text-[15px] font-medium h-auto shadow-none"
              >
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="space-y-12">
            {/* Templates Section */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="mori-semibold text-[20px] text-[#161A21]">Templates (12)</h2>
                <button className="text-[#322FEB] text-[14px] font-semibold hover:underline">View all</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockTemplates.map((item) => (
                  <TemplateCard 
                    key={item.id} 
                    {...item} 
                    onViewDetail={() => setSelectedResource(item)} 
                  />
                ))}
              </div>
            </section>

            {/* Guides Section */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="mori-semibold text-[20px] text-[#161A21]">Guides (24)</h2>
                <button className="text-[#322FEB] text-[14px] font-semibold hover:underline">View all</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockGuides.map((item) => (
                  <GuideCard key={item.id} {...item} />
                ))}
              </div>
            </section>

            {/* Salary CTA Banner */}
            <SalaryCTA />

            {/* Past Recordings Section */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="mori-semibold text-[20px] text-[#161A21]">Past Recordings</h2>
                <button className="text-[#322FEB] text-[14px] font-semibold hover:underline">View all</button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {mockRecordings.map((item) => (
                  <RecordingCard key={item.id} {...item} />
                ))}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="templates">
             <section className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockTemplates.map((item) => (
                    <TemplateCard 
                      key={item.id} 
                      {...item} 
                      onViewDetail={() => setSelectedResource(item)} 
                    />
                  ))}
                  {/* Additional mock items could go here */}
                </div>
             </section>
          </TabsContent>

          {/* ... Other TabsContent items as needed ... */}
          <TabsContent value="guides">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockGuides.map((item) => (
                <GuideCard key={item.id} {...item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockRecordings.map((item) => (
                <RecordingCard key={item.id} {...item} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
