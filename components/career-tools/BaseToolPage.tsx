"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToolBySlug, useGenerateToolOutput } from "@/hooks/useCareerTools";
import { Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import ToolFormWrapper from "@/components/reusables/ToolFormWrapper";
import { useCareerStore } from "@/lib/store/useCareerStore";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ProcessModal from "@/components/reusables/ProcessModal";

interface BaseToolPageProps {
  slug: string;
  initialData?: any;
  renderFields: (formData: any, handleInputChange: (f: string, v: any) => void) => React.ReactNode;
  resultPath?: string;
  submitButtonText?: string;
  icon?: string | React.ReactNode;
  onBack?: () => void;
  titleOverride?: string;
  descriptionOverride?: string;
}

export const BaseToolPage: React.FC<BaseToolPageProps> = ({ 
  slug,
  initialData,
  renderFields,
  resultPath,
  submitButtonText,
  icon,
  onBack,
  titleOverride,
  descriptionOverride
}) => {
  const router = useRouter();
  const { data: tool, isLoading: isLoadingTool } = useToolBySlug(slug);
  const generateMutation = useGenerateToolOutput(slug);
  const addResult = useCareerStore((state) => state.addResult);

  const [formData, setFormData] = useState<any>(initialData);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const data = await generateMutation.mutateAsync(formData);
      addResult(slug, data);
      toast.success("Content generated successfully!");
      router.push(resultPath || `/career-tools/${slug}/result`);
    } catch (error: any) {
      console.error("Content generation error:", error?.response?.data || error.message);
      toast.error(error?.response?.data?.message || "Failed to generate content.");
      setIsProcessing(false);
    }
  };

  if (isLoadingTool) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[#322FEB]" />
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="p-8 text-center space-y-4">
        <h1 className="text-2xl font-bold">Tool not found</h1>
        <Button onClick={() => router.push("/career-tools")}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFCFD] min-h-screen px-4 md:px-8 py-8 flex flex-col items-center">
      <div className="w-full max-w-[1000px]">
        <ToolFormWrapper
          icon={icon || tool.icon_url || "/sparkling-line.svg"}
          title={titleOverride || tool.name}
          description={descriptionOverride || tool.description}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {renderFields(formData, handleInputChange)}
            
            <div className={`pt-4 flex flex-col sm:flex-row gap-4 ${onBack ? 'justify-between' : 'justify-center'} items-center`}>
              {onBack && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onBack}
                  className="h-14 w-full sm:w-auto px-10 rounded-full border-[#E8E8E8] text-[#161A21] hover:bg-gray-50 flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Previous
                </Button>
              )}
              <Button type="submit" disabled={generateMutation.isPending} className="gap-2 w-full sm:w-auto px-10 h-14 bg-[#322FEB] hover:bg-[#322FEB]/90 rounded-full shadow-[0px_8px_16px_0px_#322FEB4D] transition-all active:scale-95 text-[16px] justify-center">
                {generateMutation.isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Image src="/sparkling-line.svg" width={20} height={20} alt="gen" className="brightness-[10]" />
                )}
                {generateMutation.isPending ? "Generating Content..." : (submitButtonText ? `${submitButtonText} (${tool.generate_token_cost || 0} tokens)` : `Generate ${tool.name} (${tool.generate_token_cost || 0} tokens)`)}
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
              title={`Generating ${tool.name}`}
              description={`AI is crafting your ${tool.name.toLowerCase()}. Please wait a few seconds...`}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
