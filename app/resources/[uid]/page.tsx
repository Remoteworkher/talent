"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import ResourceDetail from "@/components/Resources/ResourceDetail";
import { useResourceDetail } from "@/hooks/useResources";
import { useUserData } from "@/hooks/userData";
import { Loader2 } from "lucide-react";

export default function ResourceDetailPage() {
  const { uid } = useParams();
  const router = useRouter();
  const { data: resource, isLoading } = useResourceDetail(uid as string);
  const { data: userData } = useUserData();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-[#322FEB]" />
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <h2 className="text-xl font-semibold">Resource not found</h2>
        <button 
          onClick={() => router.push("/resources")}
          className="text-[#322FEB] hover:underline"
        >
          Back to resources
        </button>
      </div>
    );
  }

  return (
    <ResourceDetail
      uid={resource.uid}
      title={resource.name}
      type={resource.resource_type || "Resource Guide"}
      image={resource.preview_url || "/resume-templates.svg"}
      tokenCost={resource.tokens}
      tokensAvailable={userData?.ai_tokens || 0}
      onBack={() => router.push("/resources")}
    />
  );
}
