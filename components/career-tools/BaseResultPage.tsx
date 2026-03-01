"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToolBySlug } from "@/hooks/useCareerTools";
import { Loader2, Copy, Download, Plus, ArrowLeft, Sparkles } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useCareerStore } from "@/lib/store/useCareerStore";
import { ToolResultRenderer } from "./ToolResultRenderer";

interface BaseResultPageProps {
  slug: string;
  formPath?: string;
  downloadPdf?: (output: any) => void;
  headerTitle?: string;
}

export const BaseResultPage: React.FC<BaseResultPageProps> = ({ 
  slug, 
  formPath,
  downloadPdf,
  headerTitle
}) => {
  const router = useRouter();
  const { data: tool, isLoading: isLoadingTool } = useToolBySlug(slug);
  const resultsBySlug = useCareerStore((state) => state.resultsBySlug);
  const results = resultsBySlug[slug] || [];

  // Wait for Zustand persist to rehydrate from sessionStorage
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (isLoadingTool || !hydrated) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[#322FEB]" />
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="bg-[#FFFCFD] min-h-screen px-4 md:px-8 py-8 flex flex-col items-center justify-center space-y-4">
        <h2 className="text-xl font-bold">No results found</h2>
        <Button onClick={() => router.push(formPath || `/career-tools/${slug}`)}>Go to Form</Button>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFCFD] min-h-screen md:px-8 py-8 pb-32 flex flex-col items-center relative">
      <div className="w-full max-w-[1000px] pb-8 flex flex-col">
        <div className="w-full flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <h2 className="text-[24px] md:text-[32px] sora-semibold text-[#161A21] text-center md:text-left">{headerTitle || tool?.name || "Career Tool Output"}</h2>
            <div className="hidden md:block">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto shrink-0">
              <Button 
                onClick={() => {
                  const latest = results[0]?.payload?.output;
                  const text = latest?.email_body || latest?.cover_letter_text || latest?.post_text || latest?.summary_text || latest?.optimized_headline || latest?.about_description || latest?.content || (Array.isArray(latest) ? latest.join('\n') : JSON.stringify(latest));
                  navigator.clipboard.writeText(text);
                  toast.success("Copied to clipboard!");
                }} 
                variant="outline" 
                className="h-11 rounded-xl gap-2 border-[#E8E8E8] bg-white text-[#161A21] px-6 w-full sm:w-auto"
              >
                <Copy className="w-4 h-4" /> Copy text
              </Button>
              {downloadPdf ? (
                <Button 
                  onClick={() => downloadPdf(results[0]?.payload?.output)} 
                  className="gap-2 bg-[#322FEB] hover:bg-[#322FEB]/90 rounded-xl h-11 px-6 shadow-md w-full sm:w-auto"
                >
                  <Download className="w-4 h-4" /> Download PDF
                </Button>
              ) : (
                <Button 
                  onClick={() => router.push(formPath || `/career-tools/${slug}`)} 
                  className="gap-2 bg-[#322FEB] hover:bg-[#322FEB]/90 rounded-xl h-11 px-6 shadow-md w-full sm:w-auto"
                >
                  <Image src="/sparkling-line.svg" width={16} height={16} alt="gen" className="brightness-[10]" />
                  Regenerate {tool?.generate_token_cost ? `(${tool.generate_token_cost} tokens)` : ""}
                </Button>
              )}
           </div>
            </div>
        </div>

        <div className="w-full space-y-12">
            <div className="space-y-16">
              {results.map((res, idx) => (
                <div key={idx} className="relative w-full flex flex-col items-center animate-in fade-in slide-in-from-top-4 duration-500">
                  {/* <div className="absolute -top-4 left-6 bg-white px-3 py-1 rounded-[20px] border border-[#E8E8E8] text-[11px] font-bold text-[#6A6D71] z-10 shadow-sm">
                    VERSION {results.length - idx}
                  </div> */}
                  <ToolResultRenderer slug={slug} output={res.payload.output} />
                  
                  {/* Common Actions like Download PDF could go here if needed across all tools */}
                  {/* <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full">
                     <Button variant="outline" className="h-12 rounded-xl gap-2 hover:bg-gray-50 text-[14px] w-full sm:w-auto px-6" onClick={() => {
                        const output = res.payload.output;
                        const text = output.email_body || output.cover_letter_text || output.post_text || output.summary_text || output.content || (Array.isArray(output) ? output.join('\n') : JSON.stringify(output));
                        navigator.clipboard.writeText(text);
                        toast.success("Copied to clipboard!");
                     }}>
                        <Copy className="w-4 h-4" /> Copy result
                     </Button>
                     {downloadPdf && (
                        <Button className="h-12 rounded-xl gap-2 bg-[#161A21] hover:bg-black text-[14px] w-full sm:w-auto px-6" onClick={() => downloadPdf(res.payload.output)}>
                           <Download className="w-4 h-4" /> Download PDF
                        </Button>
                     )}
                  </div> */}

                </div>
              ))}
            </div>
        </div>
      </div>

      {/* Mobile Fixed Bottom Actions */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E8E8E8] p-4 z-20">
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          {downloadPdf ? (
            <Button 
              onClick={() => downloadPdf(results[0]?.payload?.output)} 
              className="gap-2 bg-[#322FEB] hover:bg-[#322FEB]/90 rounded-full h-[54px] px-6 shadow-md w-full"
            >
              <Download className="w-4 h-4" /> Download PDF
            </Button>
          ) : (
            <Button 
              onClick={() => router.push(formPath || `/career-tools/${slug}`)} 
              className="gap-2 bg-[#322FEB] hover:bg-[#322FEB]/90 rounded-full h-[54px] px-6 shadow-md w-full"
            >
              <Image src="/sparkling-line.svg" width={16} height={16} alt="gen" className="brightness-[10]" />
              Regenerate ({tool?.generate_token_cost || 0})
            </Button>
          )}
          <Button 
            onClick={() => {
              const latest = results[0]?.payload?.output;
              const text = latest?.email_body || latest?.cover_letter_text || latest?.post_text || latest?.summary_text || latest?.optimized_headline || latest?.about_description || latest?.content || (Array.isArray(latest) ? latest.join('\n') : JSON.stringify(latest));
              navigator.clipboard.writeText(text);
              toast.success("Copied to clipboard!");
            }} 
            variant="outline" 
            className="h-[54px] rounded-full gap-2 border-[#E8E8E8] bg-white text-[#161A21] px-6 w-full"
          >
            <Copy className="w-4 h-4" /> Copy text
          </Button>
        </div>
      </div>
    </div>
  );
};
