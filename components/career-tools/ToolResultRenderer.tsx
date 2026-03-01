"use client";
import React from "react";
import Image from "next/image";
import { toast } from "sonner";
import ToolResultCard from "@/components/reusables/ToolResultCard";

export const ScoreCard = ({ title, score, max = 100 }: { title: string; score: number; max?: number }) => (
  <div className="bg-white border border-[#E8E8E8] rounded-[16px] p-6 text-center shadow-sm">
    <p className="text-[#6A6D71] text-[13px] uppercase font-semibold mb-2">{title}</p>
    <div className="text-[32px] font-bold text-[#5335E9]">
      {score}<span className="text-[16px] text-[#95969A]">/{max}</span>
    </div>
  </div>
);

export const ListSection = ({ title, items }: { title: string; items: string[] }) => (
  <div className="space-y-3">
    <h3 className="text-[#161A21] font-semibold text-[16px]">{title}</h3>
    <ul className="space-y-2">
      {items?.map((item, idx) => (
        <li key={idx} className="flex gap-2 text-[14px] text-[#444] leading-relaxed text-left">
          <span className="text-[#5335E9] font-bold">•</span>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export const ToolResultRenderer = ({ slug, output }: { slug: string; output: any }) => {
  if (!output) return null;
  const s = slug.toLowerCase();

  // 1. Headlines
  if (s.includes("headline")) {
    const headlines = Array.isArray(output) ? output : (output.headlines || []);
    return (
      <div className="w-full space-y-4">
        {headlines.map((h: string, i: number) => (
          <ToolResultCard key={i} label={`Sample Headline ${i+1}`} content={h} />
        ))}
      </div>
    );
  }

  // 2. Elevator Pitch
  if (s.includes("pitch")) {
    return (
      <div className="w-full space-y-10 text-left animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="space-y-4">
          <div className="bg-[#FBFAFF] border border-[#EBE8FF] rounded-[20px] p-6 md:p-8 space-y-5 relative group shadow-sm">
            <div className="flex items-center gap-2 text-[#4C48FF] font-bold text-[13px] md:text-[14px] uppercase tracking-widest">
              <Image src="/sparkling-line-2.svg" width={18} height={18} alt="sparkle" className="brightness-0 saturate-100 invert-[.2] sepia-[.8] saturate-[40] hue-rotate-[230deg]" />
              AI Recommendation
            </div>
            <p className="text-[#4C48FF] text-[16px] md:text-[18px] leading-[1.8] font-medium pr-10 whitespace-pre-wrap">
              {output.primary_pitch}
            </p>
            <button
               onClick={() => {
                  navigator.clipboard.writeText(output.primary_pitch);
                  toast.success("AI Recommendation copied!");
               }}
               className="absolute bottom-6 right-6 p-2 text-[#4C48FF] opacity-60 hover:opacity-100 transition-all hover:scale-110"
            >
               <Image src="/file-copy-line-2.svg" width={20} height={20} alt="copy" className="invert-[.3] sepia-[1] saturate-[5] hue-rotate-[220deg]" />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-[#161A21] font-bold text-[16px] md:text-[18px]">Alternative Versions:</h3>
          <div className="space-y-5">
            {output.alternative_pitches?.map((p: string, i: number) => (
              <div key={i} className="bg-white border border-[#E8E8E8] rounded-[16px] p-6 pr-14 relative group hover:border-[#4C48FF]/30 transition-all hover:shadow-md">
                <p className="text-[#161A21] text-[15px] md:text-[16px] leading-[1.7] whitespace-pre-wrap">
                  {p}
                </p>
                <button
                   onClick={() => {
                      navigator.clipboard.writeText(p);
                      toast.success(`Alternative Version ${i+1} copied!`);
                   }}
                   className="absolute bottom-6 right-6 p-2 text-[#6A6D71] hover:text-[#4C48FF] opacity-60 hover:opacity-100 transition-all hover:scale-110"
                >
                   <Image src="/file-copy-line-2.svg" width={20} height={20} alt="copy" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#F8F7FF] p-5 rounded-[16px] border border-[#EBE8FF] flex items-start gap-4 mx-auto max-w-full">
          <div className="shrink-0 mt-0.5 bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-sm border border-[#EBE8FF]">
             <span className="text-sm leading-none">💡</span>
          </div>
          <p className="text-[#4C48FF] text-[14px] leading-relaxed font-medium">
             <span className="font-bold opacity-70 uppercase text-[12px] tracking-wider mr-2">Tip:</span> 
             {output.practice_tip || "Practice saying this out loud until it feels natural. Time yourself to stay within 30 seconds."}
          </p>
        </div>
      </div>
    );
  }

  // 3. Resume Optimizer
  if (s.includes("resume-optimizer")) {
    return (
      <div className="w-full space-y-8 text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ScoreCard title="Overall Score" score={output.overall_score} />
          <ScoreCard title="ATS Compatibility" score={output.ats_score} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ListSection title="Strengths" items={output.strengths} />
          <ListSection title="Critical Issues" items={output.critical_issues} />
        </div>
        <ToolResultCard label="Optimized Resume Content" content={output.optimized_resume} />
      </div>
    );
  }

  // 4. Explore Careers / Salary Analyzer
  if (s.includes("explore-careers") || s.includes("salary-analyzer")) {
    const isExplore = s.includes("explore-careers");
    
    return (
      <div className="w-full space-y-12 text-left animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="space-y-4">
          <h2 className="text-[24px] md:text-[32px] sora-bold text-[#161A21]">
            {output.page_title || "Your Career Fit Analysis"}
          </h2>
          <div className="text-[18px] md:text-[20px] font-semibold text-[#161A21] flex items-center gap-2">
            Role Overview: <span className="text-[#322FEB] font-bold">{output.career_job_title || output.role_name || "Product Designer"}</span>
          </div>
        </div>

        {/* Overview Sections */}
        <div className="space-y-8">
          <section className="space-y-3">
            <h3 className="font-bold text-[18px] text-[#161A21]">About the Role</h3>
            <p className="text-[#444] text-[15px] leading-[1.7] whitespace-pre-wrap">
              {output.about_role || "No description provided."}
            </p>
          </section>

          <section className="space-y-3">
             <h3 className="font-bold text-[18px] text-[#161A21]">A Day in the Life</h3>
             <p className="text-[#444] text-[15px] leading-[1.7] whitespace-pre-wrap">
               {output.day_in_life || "No information provided."}
             </p>
          </section>

          <section className="space-y-4">
            <h3 className="font-bold text-[18px] text-[#161A21]">Key Responsibilities</h3>
            <ul className="space-y-3">
              {output.responsibilities?.map((item: string, idx: number) => (
                <li key={idx} className="flex gap-3 text-[14px] md:text-[15px] text-[#444] leading-relaxed">
                  <span className="text-[#322FEB] font-bold mt-1 text-[8px]">●</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Certifications with Icons */}
        <section className="space-y-4">
          <h3 className="font-bold text-[18px] text-[#161A21]">Certifications</h3>
          <div className="space-y-4">
            {output.certifications?.map((cert: string, idx: number) => (
              <div key={idx} className="flex items-center gap-3">
                 <div className="bg-[#F6F3FF] p-1.5 rounded-lg">
                    <Image src="/logo-icon.svg" width={18} height={18} alt="cert" className="opacity-70" />
                 </div>
                 <span className="text-[14px] md:text-[15px] text-[#444] font-medium">{cert}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <section className="space-y-4">
              <h3 className="font-bold text-[18px] text-[#161A21]">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                 {output.required_skills?.map((s: string, idx: number) => (
                    <span key={idx} className="px-4 py-2 rounded-full bg-[#EBF1FF] text-[#322FEB] text-[13px] font-semibold">
                       {s}
                    </span>
                 ))}
              </div>
           </section>
           <section className="space-y-4">
              <h3 className="font-bold text-[18px] text-[#161A21]">Soft Skills</h3>
              <div className="flex flex-wrap gap-2">
                 {output.soft_skills?.map((s: string, idx: number) => (
                    <span key={idx} className="px-4 py-2 rounded-full bg-[#F6F3FF] text-[#5335E9] text-[13px] font-semibold">
                       {s}
                    </span>
                 ))}
              </div>
           </section>
        </div>

        {/* Strengths & Development */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t pt-10">
           <section className="space-y-4">
              <h3 className="font-bold text-[18px] text-[#161A21]">Your Strength</h3>
              <div className="space-y-4">
                 {output.your_strengths?.map((s: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3">
                       <div className="w-5 h-5 rounded-full bg-[#EBF1FF] flex items-center justify-center shrink-0 mt-0.5">
                          <Image src="/check-fill.svg" width={12} height={12} alt="check" className="brightness-0 invert-[.2] sepia-[.9] saturate-[10] hue-rotate-[220deg]" />
                       </div>
                       <span className="text-[14px] md:text-[15px] text-[#444] leading-relaxed">{s}</span>
                    </div>
                 ))}
              </div>
           </section>
           <section className="space-y-4">
              <h3 className="font-bold text-[18px] text-[#161A21]">Things to Develop</h3>
              <div className="space-y-4">
                 {output.to_develop?.map((s: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3">
                       <div className="w-5 h-5 rounded-full bg-[#F6F3FF] flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-[#322FEB] font-bold text-[14px] leading-none">×</span>
                       </div>
                       <span className="text-[14px] md:text-[15px] text-[#444] leading-relaxed">{s}</span>
                    </div>
                 ))}
              </div>
           </section>
        </div>

        {/* Salary Ranges Horizontal Bars */}
        {(output.salary_ranges || output.entry_salary) && (
           <section className="space-y-6 pt-10 border-t">
              <h3 className="font-bold text-[18px] text-[#161A21]">Salary Ranges in {output.location || "Lagos, Nigeria"}</h3>
              <div className="space-y-3 max-w-[800px]">
                 <div className="relative group">
                    <div className="flex justify-between items-center mb-1"><span className="text-[11px] font-bold text-[#6A6D71] uppercase">Entry-Level</span></div>
                    <div className="w-full bg-[#EBF1FF] h-8 rounded-md flex items-center px-4 overflow-hidden">
                       <div className="absolute right-4 text-[13px] font-bold text-[#322FEB]">{output.entry_salary || output.salary_ranges?.entry_level || "₦200k/month"}</div>
                    </div>
                 </div>
                 <div className="relative group">
                    <div className="flex justify-between items-center mb-1"><span className="text-[11px] font-bold text-[#6A6D71] uppercase">Mid-Level</span></div>
                    <div className="w-6/7 bg-[#EFE9FE] h-8 rounded-md flex items-center px-4 overflow-hidden">
                       <div className="absolute right-4 text-[13px] font-bold text-[#5335E9]">{output.mid_salary || output.salary_ranges?.mid_level || "₦500k/month"}</div>
                    </div>
                 </div>
                 <div className="relative group">
                    <div className="flex justify-between items-center mb-1"><span className="text-[11px] font-bold text-[#6A6D71] uppercase">Senior-Level</span></div>
                    <div className="w-full bg-[#F6F3FF] h-8 rounded-md flex items-center px-4 overflow-hidden">
                       <div className="absolute right-4 text-[13px] font-bold text-[#5335E9]">{output.senior_salary || output.salary_ranges?.senior_level || "₦1,000,000/month"}</div>
                    </div>
                 </div>
              </div>
           </section>
        )}

        {/* Industry Outlook */}
        <section className="space-y-4 pt-10 border-t pb-10">
           <h3 className="font-bold text-[18px] text-[#161A21]">Industry Outlook</h3>
           <p className="text-[#444] text-[15px] leading-[1.8] whitespace-pre-wrap">
              {output.industry_outlook || "No further information available."}
           </p>
        </section>
      </div>
    );
  }

  // 5. Personal Brand Audit
  if (s.includes("brand-audit")) {
    return (
      <div className="w-full space-y-12 text-left animate-in fade-in slide-in-from-top-4 duration-700">
        {/* Top Score */}
        <div className="bg-white border border-[#E8E8E8] rounded-[20px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
           <div className="space-y-1">
              <p className="text-[12px] font-bold text-[#6A6D71] uppercase tracking-wide">Avg. Score</p>
              <div className="flex items-baseline gap-1">
                 <span className="text-[42px] font-extrabold text-[#322FEB]">{output.average_score || 79}</span>
                 <span className="text-[20px] font-bold text-[#95969A]">/100</span>
              </div>
           </div>
           <div className="flex-1 max-w-md w-full">
              <p className="text-[13px] text-[#6A6D71] leading-relaxed italic">
                 {output.score_context || "Your online presence shows strong consistency across platforms with room for deeper content engagement."}
              </p>
           </div>
        </div>

        {/* Brand Statement */}
        <div className="space-y-4">
           <h3 className="text-[#161A21] font-bold text-[18px]">Brand Statement</h3>
           <p className="text-[#444] text-[15px] md:text-[16px] leading-[1.7]">
              {output.brand_statement || "A typical day begins with a 'Daily Standup' with the product and engineering teams to sync on feature progress. Mid-morning is usually dedicated to deep focus work—perhaps refining a high-fidelity checkout flow or building."}
           </p>
        </div>

        {/* AI Recommendation Card */}
        <div className="bg-[#F8F9FF] border border-[#E1E4FF] rounded-[16px] p-6 space-y-4 relative group">
           <div className="flex items-center gap-2 text-[#5335E9] font-bold text-[14px]">
              <Image src="/sparkling-line-2.svg" width={18} height={18} alt="sparkle" className="brightness-0 saturate-100 invert-[.15] sepia-[.9] saturate-[50] hue-rotate-[220deg]" />
              AI Recommendation
           </div>
           <p className="text-[#161A21] text-[15px] leading-[1.8] pr-10">
              {output.ai_recommendation || "You know how most AI and Fintech apps feel like you need a PhD just to navigate the home screen? I solve that. I'm a Product Designer who takes messy early-stage ideas and turns them into high-converting products."}
           </p>
           <button
              onClick={() => {
                navigator.clipboard.writeText(output.ai_recommendation || "");
                toast.success("Copied to clipboard!");
              }}
              className="absolute bottom-6 right-6 p-2 text-[#95969A] hover:text-[#322FEB] transition-colors"
           >
              <Image src="/file-copy-line-2.svg" width={18} height={18} alt="copy" />
           </button>
        </div>

        {/* Platform Analysis Bars */}
        <div className="space-y-6">
           <h3 className="text-[#161A21] font-bold text-[18px]">Platform Analysis</h3>
           <p className="text-[#6A6D71] text-[14px] mb-6">Insight into your performance across various professional and social networks.</p>
           
           <div className="space-y-6">
              {[
                { label: "Linkedin", score: output.platform_analysis?.[0]?.score || 55, icon: "/linkedin.svg", color: "#322FEB", desc: output.platform_analysis?.[0]?.insight || "Too resume-focused; lacks a hook and a clear CTA for high-ticket opportunities." },
                { label: "Twitter/X", score: output.platform_analysis?.[1]?.score || 70, icon: "/twitter-x.svg", color: "#322FEB", desc: output.platform_analysis?.[1]?.insight || "Mainly retweeting or posting links; no original voice yet." },
                { label: "Instagram", score: output.platform_analysis?.[2]?.score || 40, icon: "/instagram.svg", color: "#322FEB", desc: output.platform_analysis?.[2]?.insight || "Mainly reposting contents; no original voice yet." },
                { label: "Dribbble", score: output.platform_analysis?.[3]?.score || 100, icon: "/dribbble.svg", color: "#322FEB", desc: output.platform_analysis?.[3]?.insight || "High visual quality but lack process documentation." },
              ].map((p, i) => (
                <div key={i} className="bg-white border border-[#F0F0F0] rounded-[16px] p-4 md:p-5 flex flex-col gap-3">
                   <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                            <span className="text-[14px]">{i === 0 ? "🔵" : i === 1 ? "✅" : i === 2 ? "🎨" : "🟣"}</span>
                         </div>
                         <div className="space-y-0.5">
                            <p className="font-bold text-[#161A21] text-[14px]">{p.label}</p>
                            <p className="text-[12px] text-[#95969A]">{p.desc}</p>
                         </div>
                      </div>
                      <div className="text-[16px] font-bold text-[#161A21]">{p.score}/100</div>
                   </div>
                   <div className="w-full bg-[#F0F0F0] h-2 rounded-full overflow-hidden">
                      <div 
                         className="h-full bg-[#322FEB] transition-all duration-1000 ease-out" 
                         style={{ width: `${p.score}%` }} 
                      />
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Strengths & Improvements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
           <div className="bg-white border border-[#E8E8E8] rounded-[20px] p-6 space-y-4">
              <h4 className="font-bold text-[#161A21] text-[16px]">Your Strength</h4>
              <div className="space-y-3">
                 {(output.your_strengths || ["Visual Consistency", "Platform Presence", "Technical Competency"]).map((s: string, idx: number) => (
                    <div key={idx} className="flex gap-3 text-[13px] text-[#444] leading-relaxed">
                       <Image src="/check-fill.svg" width={16} height={16} alt="check" className="mt-0.5 shrink-0 brightness-0 saturate-100 invert-[.15] sepia-[.9] saturate-[50] hue-rotate-[220deg]" />
                       {s}
                    </div>
                 ))}
              </div>
           </div>
           <div className="bg-white border border-[#E8E8E8] rounded-[20px] p-6 space-y-4">
              <h4 className="font-bold text-[#161A21] text-[16px]">Areas to Improve</h4>
              <div className="space-y-3">
                 {(output.areas_to_improve || ["Invisible Case Studies", "Generic LinkedIn Headline", "Lack of Opinionated Content"]).map((s: string, idx: number) => (
                    <div key={idx} className="flex gap-4 text-[13px] text-[#444] leading-relaxed items-center">
                       <span className="text-[#322FEB] font-bold text-[18px] w-4 flex justify-center">×</span>
                       {s}
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* 30-Day Action Plan */}
        <div className="space-y-6 pt-6">
           <h3 className="text-[#161A21] font-bold text-[18px]">30-Day Action Plan</h3>
           <p className="text-[#6A6D71] text-[14px]">A actionable roadmap to refine your personal brand over the next month.</p>
           
           <div className="space-y-3">
              {(output.action_plan_30_days || [
                 "Rewrite LinkedIn About Section like a story.",
                 "Design a Custom LinkedIn banner.",
                 "Select a major project.",
                 "Document the research, friction points and ROI.",
                 "Write Linkedin post about UX ethics or strategy.",
                 "Start a 5-day design tips on Twitter/X.",
                 "Pitch a guest post or collaboration to a design blog.",
                 "Host a 'Portfolio Review' or 'AMA' session on X Spaces."
              ]).map((plan: string, i: number) => (
                <div key={i} className="bg-white border border-[#E8E8E8] rounded-[12px] p-4 flex items-center gap-4 hover:shadow-sm transition-shadow">
                   <div className="w-10 h-10 rounded-lg bg-[#F8F9FF] border border-[#E1E4FF] flex items-center justify-center shrink-0">
                      <Image src="/file.svg" width={18} height={18} alt="icon" className="brightness-0 saturate-100 invert-[.15] sepia-[.9] saturate-[50] hue-rotate-[220deg]" />
                   </div>
                   <p className="text-[14px] text-[#161A21] font-medium">{plan}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    );
  }

  // 6. Career Roadmap
  if (s.includes("roadmap")) {
    return (
      <div className="w-full space-y-10 text-left">
        <div className="text-center space-y-2">
          <h2 className="text-[28px] font-bold text-[#161A21]">{output.header_title}</h2>
          <p className="text-[#6A6D71]">{output.header_subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 text-left">
            <h3 className="font-bold text-[#161A21]">Career Tracks</h3>
            <div className="space-y-3">
              {output.career_paths?.map((path: any, i: number) => (
                <div key={i} className="bg-white border border-[#E8E8E8] p-4 rounded-[16px] shadow-sm">
                  <p className="text-[#5335E9] text-[12px] font-bold tracking-wider uppercase mb-1">{path.label}</p>
                  <p className="font-bold text-[#161A21]">{path.track_title}</p>
                  <p className="text-[13px] text-[#6A6D71]">{path.track_role}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-8">
            <ListSection title="Hidden Gems" items={output.hidden_gems} />
            <ListSection title="Actions to Start Now" items={output.start_now} />
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-[#5335E920]" />
          <div className="space-y-8 pl-10">
            {output.selected_path_detail?.steps?.map((step: any, i: number) => (
              <div key={i} className="relative bg-white border border-[#E8E8E8] rounded-[24px] p-6 shadow-md">
                <div className="absolute -left-[31px] top-6 w-10 h-10 rounded-full bg-[#5335E9] text-white flex items-center justify-center border-4 border-[#FFFCFD]">
                  {step.step_number}
                </div>
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-bold text-[#161A21] text-[18px]">{step.role_title}</h4>
                  <span className="bg-[#F0F0FF] text-[#5335E9] px-3 py-1 rounded-full text-[12px] font-bold">{step.duration}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <ListSection title="Key Milestones" items={step.key_milestones} />
                   <div className="bg-[#F9FAFB] p-4 rounded-[16px] text-left">
                     <p className="text-[12px] font-bold text-[#6A6D71] uppercase mb-2">Pro Tip</p>
                     <p className="text-[14px] text-[#444] italic">"{step.pro_tip}"</p>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 7. LinkedIn Post Writer
  if (s.includes("post-writer")) {
    return (
      <div className="w-full bg-white border border-[#E8E8E8] rounded-[24px] p-6 md:p-10 shadow-lg text-left">
        <p className="text-[14px] font-bold text-[#161A21] mb-6">Your LinkedIn Post</p>
        <div className="text-[15px] text-[#333] leading-[1.8] whitespace-pre-wrap">
          {output.post_text || output.content || (typeof output === "string" ? output : JSON.stringify(output, null, 2))}
        </div>
      </div>
    );
  }

  // 8. LinkedIn Summary Generator
  if (s.includes("summary-generator")) {
    return (
      <div className="w-full bg-white border border-[#E8E8E8] rounded-[24px] p-6 md:p-10 shadow-lg text-left">
        <p className="text-[14px] font-bold text-[#161A21] mb-6">Your Summary</p>
        <div className="text-[15px] text-[#333] leading-[1.8] whitespace-pre-wrap">
          {output.summary_text || output.content || (typeof output === "string" ? output : JSON.stringify(output, null, 2))}
        </div>
      </div>
    );
  }

  // 9. Cover Letter
  if (s.includes("cover-letter")) {
    return (
      <div className="w-full bg-white border border-[#E8E8E8] rounded-[24px] p-6 md:p-10 shadow-lg text-left">
        <div className="text-[15px] text-[#333] leading-[1.8] whitespace-pre-wrap">
          {output.cover_letter_text || output.content || (typeof output === "string" ? output : JSON.stringify(output, null, 2))}
        </div>
      </div>
    );
  }

  // Default Document View (Email, Cover Letter, etc.)
  const docText = output.email_body || output.cover_letter_text || output.post_text || output.summary_text || output.content;
  const subject = output.subject || output.email_subject;
  const isEmail = !!(output.email_body || output.email_subject || s.includes("email"));

  return (
    <div className="w-full bg-white border border-[#E8E8E8] rounded-[24px] p-6 md:p-10 shadow-lg text-left">
      {subject && (
        <div className="mb-6">
          <p className="text-[14px] font-bold text-[#161A21] mb-2">{isEmail ? "Email Subject" : "Subject"}</p>
          <p className="text-[15px] text-[#222] font-medium leading-[1.7]">{subject}</p>
        </div>
      )}
      <div className="space-y-2">
        {docText && <p className="text-[14px] font-bold text-[#161A21]">{isEmail ? "Email Body" : "Content"}</p>}
        <div className="text-[15px] text-[#333] leading-[1.8] whitespace-pre-wrap">
          {docText || (typeof output === "string" ? output : JSON.stringify(output, null, 2))}
        </div>
      </div>
    </div>
  );
};
