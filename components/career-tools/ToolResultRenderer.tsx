"use client";
import React from "react";
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
      <div className="w-full space-y-6">
        <ToolResultCard label="Primary Pitch" content={output.primary_pitch} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {output.alternative_pitches?.map((p: string, i: number) => (
            <ToolResultCard key={i} label={`Alternative ${i+1}`} content={p} />
          ))}
        </div>
        <div className="bg-[#E4FBF8] p-6 rounded-[20px] border border-[#BFF6ED] text-left">
          <h3 className="text-[#0D4D44] font-bold mb-2 flex items-center gap-2">
            <span className="text-lg">💡</span> Practice Tip
          </h3>
          <p className="text-[#0D4D44] text-[14px] leading-relaxed">{output.practice_tip}</p>
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
    return (
      <div className="w-full bg-white border border-[#E8E8E8] rounded-[24px] p-6 md:p-10 shadow-sm space-y-8 text-left">
         <div className="border-b pb-6">
           <h2 className="text-[24px] font-bold text-[#161A21]">{output.page_title || output.average_salary}</h2>
           <p className="text-[#6A6D71]">{output.role_overview_title || output.salary_range}</p>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {output.about_role && <div className="space-y-2"><h3 className="font-bold">About the Role</h3><p className="text-[14px] leading-relaxed text-[#444]">{output.about_role}</p></div>}
           {output.required_skills && <ListSection title="Required Skills" items={output.required_skills} />}
           {output.certifications && <ListSection title="Certifications" items={output.certifications} />}
           {output.your_strengths && <ListSection title="Your Strengths" items={output.your_strengths} />}
         </div>

         {output.salary_ranges && (
            <div className="bg-[#F7F0FC] p-8 rounded-[24px]">
              <h3 className="font-bold text-[#4C1D95] mb-6">Market Salary Ranges</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-[16px] text-center"><p className="text-[12px] text-gray-500 mb-1">Entry Level</p><p className="font-bold text-[#5335E9]">{output.salary_ranges.entry_level}</p></div>
                <div className="bg-white p-4 rounded-[16px] text-center"><p className="text-[12px] text-gray-500 mb-1">Mid Level</p><p className="font-bold text-[#5335E9]">{output.salary_ranges.mid_level}</p></div>
                <div className="bg-white p-4 rounded-[16px] text-center"><p className="text-[12px] text-gray-500 mb-1">Senior Level</p><p className="font-bold text-[#5335E9]">{output.salary_ranges.senior_level}</p></div>
              </div>
            </div>
         )}
      </div>
    );
  }

  // 5. Personal Brand Audit
  if (s.includes("brand-audit")) {
    return (
      <div className="w-full space-y-8 text-left">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div className="md:col-span-1"><ScoreCard title="Audit Score" score={output.average_score} /></div>
           <div className="md:col-span-2 bg-white border border-[#E8E8E8] rounded-[16px] p-6 flex items-center">
             <p className="text-[14px] text-[#444] italic leading-relaxed">"{output.score_context}"</p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ListSection title="Your Strengths" items={output.your_strengths} />
          <ListSection title="Areas to Improve" items={output.areas_to_improve} />
        </div>

        <div className="bg-white border border-[#E8E8E8] rounded-[24px] overflow-hidden shadow-sm text-left">
          <div className="bg-[#161A21] px-6 py-4"><h3 className="text-white font-bold">Platform Analysis</h3></div>
          <div className="divide-y divide-[#F0F0F0]">
            {output.platform_analysis?.map((pa: any, i: number) => (
              <div key={i} className="p-4 md:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <p className="font-bold text-[#161A21] uppercase text-[11px] md:text-[12px] mb-1">{pa.platform}</p>
                  <p className="text-[14px] text-[#6A6D71]">{pa.insight}</p>
                </div>
                <div className="text-[18px] font-bold text-[#5335E9] whitespace-nowrap">{pa.score}/100</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#FFF9F0] border border-[#FFE7C4] rounded-[24px] p-8 shadow-sm text-left">
           <h3 className="font-bold text-[#854D0E] mb-6">30-Day Action Plan</h3>
           <div className="space-y-4">
             {output.action_plan_30_days?.map((step: string, i: number) => (
               <div key={i} className="flex gap-4 items-start">
                 <div className="w-8 h-8 rounded-full bg-[#854D0E] text-white flex items-center justify-center shrink-0 text-[12px] font-bold">{i+1}</div>
                 <p className="text-[14px] text-[#854D0E] font-medium leading-[1.8]">{step}</p>
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
