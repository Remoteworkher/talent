"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import TemplateCard from "@/components/Resources/TemplateCard";
import GuideCard from "@/components/Resources/GuideCard";
import SalaryCTA from "@/components/Resources/SalaryCTA";
import RecordingCard from "@/components/Resources/RecordingCard";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { useResources, useBuyResource, useDownloadResource, ResourceItem } from "@/hooks/useResources";
import { useUserData } from "@/hooks/userData";
import { ResourcesPageSkeleton } from "@/components/reusables/Skeletons";
import { toast } from "sonner";

import { useRouter } from "next/navigation";

export default function ResourcesPage() {
  const router = useRouter();
  const [selectedResourceType, setSelectedResourceType] = useState<string | undefined>(undefined);
  const [actionUid, setActionUid] = useState<string | null>(null);
  
  const { data: resourcesData, isLoading: isResourcesLoading } = useResources(selectedResourceType === 'all' ? undefined : selectedResourceType);
  const { data: userData } = useUserData();
  const { mutate: buy, isPending: isBuying } = useBuyResource();
  const { mutate: download, isPending: isDownloading } = useDownloadResource();

  const tokensAvailable = userData?.tokens ?? userData?.ai_tokens ?? 0;
  const isProcessing = isBuying || isDownloading;

  const handleTabChange = (value: string) => {
    setSelectedResourceType(value);
  };

  const handleViewDetail = (uid: string) => {
    router.push(`/resources/${uid}`);
  };

  // For guides, linkedin, career, interview – buy then download on click
  const handleBuyAndDownload = (item: ResourceItem) => {
    if (item.purchased) {
      // Already purchased, just download
      setActionUid(item.uid);
      download(item.uid, {
        onSuccess: () => {
          toast.success("Download started!");
          setActionUid(null);
        },
        onError: () => {
          toast.error("Download failed. Please try again.");
          setActionUid(null);
        }
      });
      return;
    }

    if (tokensAvailable < item.tokens) {
      toast.error(`You need ${item.tokens} credits but only have ${tokensAvailable}.`);
      return;
    }

    setActionUid(item.uid);
    buy(item.uid, {
      onSuccess: () => {
        toast.success("Purchased! Starting download...");
        download(item.uid, {
          onSuccess: () => {
            toast.success("Download started!");
            setActionUid(null);
          },
          onError: () => {
            toast.error("Purchase succeeded but download failed. Try again.");
            setActionUid(null);
          }
        });
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "Purchase failed.");
        setActionUid(null);
      }
    });
  };

  // For videos – open external link
  const handleWatchVideo = (item: ResourceItem) => {
    if (item.preview_url) {
      window.open(item.preview_url, "_blank", "noopener,noreferrer");
    } else {
      toast.error("No video link available.");
    }
  };

  const categories = [
    { id: "all", label: "All resources" },
    ...(resourcesData?.types.map(t => ({ id: t.id, label: t.label })) || [])
  ];

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

        <Tabs defaultValue="all" className="w-full space-y-8" onValueChange={handleTabChange}>
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

          {isResourcesLoading ? (
            <ResourcesPageSkeleton />
          ) : (
            <>
              <TabsContent value={selectedResourceType || "all"} className="space-y-12">
                {resourcesData?.groups.map((group) => {
                  const type = group.resource_type || group.name.toLowerCase();
                  const isVideo = type === 'videos' || type === 'recording';
                  const isTemplate = type === 'templates';
                  
                  return (
                    <section key={group.uid} className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="mori-semibold text-[20px] text-[#161A21]">
                            {group.name} ({group.resources_count})
                          </h2>
                          {group.description && (
                            <p className="text-[#6A6D71] text-[14px]">{group.description}</p>
                          )}
                        </div>
                        <button className="text-[#322FEB] text-[14px] font-semibold hover:underline">View all</button>
                      </div>

                      <div className={
                        isVideo 
                          ? "grid grid-cols-1 lg:grid-cols-2 gap-6" 
                          : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                      }>
                        {group.resources.map((item) => (
                          <div key={item.uid}>
                            {isTemplate ? (
                              <TemplateCard 
                                title={item.name}
                                description={item.description}
                                image={item.preview_url || "/resume-templates.svg"}
                                tokenCost={item.tokens}
                                actionLabel={`View ${group.name.toLowerCase()}`}
                                onViewDetail={() => handleViewDetail(item.uid)} 
                              />
                            ) : isVideo ? (
                              <RecordingCard 
                                title={item.name}
                                description={item.description}
                                duration={(item as any).duration || "45mins"}
                                date={(item as any).date || "Jan 21, 2025"}
                                onWatch={() => handleWatchVideo(item)}
                              />
                            ) : (
                              <GuideCard 
                                title={item.name}
                                description={item.description}
                                tokenCost={item.tokens}
                                buttonLabel={
                                  actionUid === item.uid && isProcessing
                                    ? (isBuying ? "Purchasing..." : "Downloading...")
                                    : item.purchased ? "Download" : "Buy & Download"
                                }
                                isLoading={actionUid === item.uid && isProcessing}
                                onAction={() => handleBuyAndDownload(item)}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                      
                      {/* Inject Salary CTA after Templates group in "All" view */}
                      {selectedResourceType === 'all' && isTemplate && (
                        <div className="py-6">
                          <SalaryCTA />
                        </div>
                      )}
                    </section>
                  );
                })}

                {(!resourcesData?.groups || resourcesData.groups.length === 0) && (
                  <div className="py-20 text-center text-[#6A6D71]">
                    No resources found in this category.
                  </div>
                )}
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </div>
  );
}
