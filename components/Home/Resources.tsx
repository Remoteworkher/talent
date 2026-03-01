"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Resource from "../reusables/Resource";
import { useResources } from "@/hooks/useResources";
import { Loader2 } from "lucide-react";

const Resources = () => {
  const router = useRouter();
  const { data, isLoading } = useResources();

  const resources = data?.groups?.flatMap(group => group.resources).slice(0, 3) || [];

  return (
    <div className="p-3 border border-[#E8E8E8] rounded-[16px] space-y-3">
      <div className="flex justify-between items-center border-b border-[#E8E8E8] pb-3">
        <div className="text-[#161A21] text-[16px] mori-semibold">
          Recommended Resources
        </div>
        <div>
          <Button
            variant={"outline"}
            size={"sm"}
            className="rounded-[16px]"
            onClick={() => router.push("/resources")}
          >
            See All
          </Button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-[#322FEB]" />
        </div>
      ) : resources.length > 0 ? (
        <section className="space-y-3">
          {resources.map((resource) => (
            <Resource key={resource.uid} resource={resource} />
          ))}
        </section>
      ) : (
        <div className="text-center py-8 text-[#6A6D71] text-[14px]">
          No recommended resources found.
        </div>
      )}
    </div>
  );
};

export default Resources;
