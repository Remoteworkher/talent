"use client";
import HeaderSub from "@/components/reusables/HeaderSub";
import SubHeader from "@/components/reusables/SubHeader";
import TokensCard from "@/components/reusables/TokensCard";
import ToolCard from "@/components/reusables/ToolCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import { useToolTypes, useToolGroups, Tool } from "@/hooks/useCareerTools";
import { Loader2 } from "lucide-react";

const getToolUrl = (slug: string) => {
  const routes: Record<string, string> = {
    "headline-generator": "/career-tools/linkedin/headline-generator",
    "linkedin-headline-generator": "/career-tools/linkedin/headline-generator",
    "post-writer": "/career-tools/linkedin/post-writer",
    "linkedin-post-writer": "/career-tools/linkedin/post-writer",
    "summary-generator": "/career-tools/linkedin/summary-generator",
    "linkedin-summary-generator": "/career-tools/linkedin/summary-generator",
    "cover-letter-builder": "/career-tools/resumes/cover-letter",
    "email-writer": "/career-tools/resumes/email-writer",
    "resume-optimizer": "/career-tools/resumes/optimizer",
    "explore-careers": "/career-tools/growth/explore",
    "career-roadmap": "/career-tools/growth/roadmap",
    "salary-analyzer": "/career-tools/growth/salary-analyzer",
    "personal-brand-audit": "/career-tools/growth/brand-audit",
    "elevator-pitch": "/career-tools/growth/elevator-pitch",
  };
  return routes[slug] || `/career-tools/${slug}`;
};

const getToolStyle = (slug: string) => {
  const styles: Record<string, { icon: string; bgColor: string }> = {
    "resume-builder": { icon: "/text-line.svg", bgColor: "#E4FBF8" },
    "resume-optimizer": { icon: "/resume-optimizer.svg", bgColor: "#FFF3EB" },
    "cover-letter-builder": { icon: "/cover-letter-builder.svg", bgColor: "#F6F3FF" },
    "email-writer": { icon: "/email-writer.svg", bgColor: "#F7F0FC" },
    "profile-optimizer": { icon: "/profile-optimizer.svg", bgColor: "#EBF1FF" },
    "headline-generator": { icon: "/headline-generator.svg", bgColor: "#EBF1FF" },
    "linkedin-headline-generator": { icon: "/headline-generator.svg", bgColor: "#EBF1FF" },
    "summary-generator": { icon: "/summary-generator.svg", bgColor: "#EBF1FF" },
    "linkedin-summary-generator": { icon: "/summary-generator.svg", bgColor: "#EBF1FF" },
    "post-writer": { icon: "/post-writer.svg", bgColor: "#EBF1FF" },
    "linkedin-post-writer": { icon: "/post-writer.svg", bgColor: "#EBF1FF" },
    "explore-careers": { icon: "/explore-careers.svg", bgColor: "#F7F0FC" },
    "career-roadmap": { icon: "/career-roadmap.svg", bgColor: "#EBF1FF" },
    "interview-prep": { icon: "/interview-prep.svg", bgColor: "#E4FBF8" },
    "salary-analyzer": { icon: "/salary-analyzer.svg", bgColor: "#FFF3EB" },
    "tax-calculator": { icon: "/tax-calculator.svg", bgColor: "#E0FAEC" },
    "elevator-pitch": { icon: "/elevator-pitch.svg", bgColor: "#FFFAEB" },
    "personal-brand-audit": { icon: "/personal-brand-audit.svg", bgColor: "#E4FBF8" },
  };
  return styles[slug] || { icon: "/text-line.svg", bgColor: "#F7F0FC" };
};

const Page = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const { data: toolTypes, isLoading: isLoadingTypes } = useToolTypes();
  const { data: toolGroups, isLoading: isLoadingGroups } = useToolGroups(activeTab);

  if (isLoadingTypes) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[#322FEB]" />
      </div>
    );
  }

  return (
    <div className="space-y-3 p-4">
      <HeaderSub
        title="Career Tools"
        subtitle="AI-powered tools to help you advance your career"
      />
      <TokensCard />
      <section className="space-y-3 pt-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-transparent flex gap-2 overflow-x-auto no-scrollbar">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-[#322FEB] data-[state=active]:text-white px-4 py-5 border border-[#E8E8E8] rounded-md transition whitespace-nowrap"
            >
              Overview
            </TabsTrigger>
            {toolTypes?.map((type) => (
              <TabsTrigger
                key={type.id}
                value={type.id}
                className="data-[state=active]:bg-[#322FEB] data-[state=active]:text-white px-4 py-5 border border-[#E8E8E8] rounded-md transition capitalize whitespace-nowrap"
              >
                {type.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="space-y-6 pt-4">
            {isLoadingGroups ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-[#322FEB]" />
              </div>
            ) : (
              toolGroups?.map((group) => (
                <section key={group.uid} className="space-y-4">
                  <SubHeader
                    title={group.name}
                    subtitle={group.description}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {group.tools.map((tool) => {
                      const style = getToolStyle(tool.slug);
                      return (
                        <ToolCard
                          key={tool.uid}
                          name={tool.name}
                          description={tool.description}
                          icon={style.icon}
                          bgColor={style.bgColor}
                          url={getToolUrl(tool.slug)}
                        />
                      );
                    })}
                  </div>
                </section>
              ))
            )}
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default Page;
