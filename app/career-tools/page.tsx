"use client";
import HeaderSub from "@/components/reusables/HeaderSub";
import SubHeader from "@/components/reusables/SubHeader";
import TokensCard from "@/components/reusables/TokensCard";
import ToolCard from "@/components/reusables/ToolCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import { useToolTypes, useToolGroups, Tool } from "@/hooks/useCareerTools";
import { CareerToolsPageSkeleton, CareerToolsGridSkeleton } from "@/components/reusables/Skeletons";
import { useSearchParams, useRouter } from "next/navigation";
import { useTokens } from "@/hooks/useTokens";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const getToolUrl = (slug: string) => {
  const routes: Record<string, string> = {
    "headline-generator": "/career-tools/linkedin/headline-generator",
    "linkedin-headline-generator": "/career-tools/linkedin/headline-generator",
    "post-writer": "/career-tools/linkedin/post-writer",
    "linkedin-post-writer": "/career-tools/linkedin/post-writer",
    "summary-generator": "/career-tools/linkedin/summary-generator",
    "linkedin-summary-generator": "/career-tools/linkedin/summary-generator",
    "cover-letter-builder": "/career-tools/resumes/cover-letter",
    "tax-calculator": "/career-tools/career/tax-calculator",
    "email-writer": "/career-tools/resumes/email-writer",
    "profile-optimizer": "/career-tools/linkedin/profile-optimizer",
    "explore-careers": "/career-tools/career/explore",
    "career-roadmap": "/career-tools/career/roadmap",
    "salary-analyzer": "/career-tools/career/salary-analyzer",
    "personal-brand-audit": "/career-tools/career/brand-audit",
    "elevator-pitch": "/career-tools/career/elevator-pitch",
    "resume-builder": "/career-tools/resume/resume-builder",
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
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const reference = searchParams.get("reference");
  const { data: toolTypes, isLoading: isLoadingTypes } = useToolTypes();
  const { data: toolGroups, isLoading: isLoadingGroups } = useToolGroups(activeTab);

  if (isLoadingTypes) {
    return <CareerToolsPageSkeleton />;
  }

  return (
    <div className="space-y-4 p-3 md:p-6 lg:p-8 mx-auto md:w-full">
      <HeaderSub
        title="Career Tools"
        subtitle="AI-powered tools to help you advance your career"
      />
      <TokensCard />
      <section className="space-y-4 pt-2 md:pt-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-transparent h-auto p-0 flex flex-wrap gap-2 justify-start overflow-x-auto no-scrollbar pb-1">
            <TabsTrigger
              value="overview"
              className="px-6 py-2.5 border border-[#E8E8E8] bg-white text-[#6A6D71] data-[state=active]:bg-[#322FEB] data-[state=active]:text-white data-[state=active]:border-[#322FEB] data-[state=active]:shadow-md data-[state=active]:shadow-blue-100 transition-all text-[15px] font-medium h-auto shadow-none rounded-md whitespace-nowrap"
            >
              Overview
            </TabsTrigger>
            {toolTypes?.map((type) => (
              <TabsTrigger
                key={type.id}
                value={type.id}
                className="px-6 py-2.5 border border-[#E8E8E8] bg-white text-[#6A6D71] data-[state=active]:bg-[#322FEB] data-[state=active]:text-white data-[state=active]:border-[#322FEB] data-[state=active]:shadow-md data-[state=active]:shadow-blue-100 transition-all text-[15px] font-medium h-auto shadow-none rounded-md whitespace-nowrap capitalize"
              >
                {type.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="space-y-8 pt-4">
            {isLoadingGroups ? (
              <CareerToolsGridSkeleton />
            ) : (
              toolGroups?.map((group) => (
                <section key={group.uid} className="space-y-5">
                  <div className="flex justify-between items-end gap-4">
                    <SubHeader
                      title={group.name}
                      subtitle={group.description}
                    />
                    {activeTab === "overview" && group.tools.length > 4 && (
                      <button
                        onClick={() => setActiveTab(group.type)}
                        className="text-[#322FEB] text-[14px] mori-semibold hover:underline shrink-0 pb-0.5"
                      >
                        See all
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {(activeTab === "overview" ? group.tools.slice(0, 4) : group.tools).map((tool) => {
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
