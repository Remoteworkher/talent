"use client";
import React from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Copy } from "lucide-react";
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

  // 4a. Salary Analyzer (dedicated renderer)
  if (s.includes("salary-analyzer")) {
    // Fallback dummy data when API fields are empty
    const fallbackCompanyTypes = [
      { type: "Startups", levels: [{ level: "Entry-Level", salary: "₦200k/month" }, { level: "Mid-Level", salary: "₦500k/month" }, { level: "Senior Level", salary: "₦1,000,000/month" }] },
      { type: "Mid-size Companies", levels: [{ level: "Entry-Level", salary: "₦200k/month" }, { level: "Mid-Level", salary: "₦600k/month" }, { level: "Senior Level", salary: "₦1,000,000/month" }] },
      { type: "Enterprise", levels: [{ level: "Entry-Level", salary: "₦200k/month" }, { level: "Mid-Level", salary: "₦650k/month" }, { level: "Senior Level", salary: "₦1,000,000/month" }] },
    ];
    const fallbackDrivers = [
      { title: "UX Research & Data Analytics", description: "Move beyond 'visuals' and show how your design decisions increased conversion rates (CRO) or reduced churn in previous roles.", percentage: "+35%" },
      { title: "Fintech Domain Expertise", description: "Demonstrate deep knowledge of CBN regulations, KYC flows, and transaction security patterns specific to the African market.", percentage: "+40%" },
      { title: "Technical Proficiency (Framer/Webflow/No-code)", description: "Become a 'Designer who ships' by building high-fidelity interactive prototypes that reduce developer handoff friction.", percentage: "+20%" },
    ];
    const fallbackNegotiation = { anchor_high: "₦1,200,000 monthly (Gross)", walk_away_point: "₦600,000 monthly" };
    const fallbackLeverage = [
      "Portfolio showing 3+ complex end-to-end product cycles",
      "Experience with Design Systems (Atomic Design)",
      "Success metrics from previous E-commerce or Fintech roles",
    ];
    const fallbackScripts = [
      { text: "Based on the complexity of the product and my experience optimizing conversion funnels in the Fintech space, I am looking for a package in the ₦1.1M to ₦1.3M range." },
      { text: "While I am excited about the company vision, the current offer of ₦800k is below market rate for a mid-level designer with my specific background in high-transaction E-commerce. Can we move closer to ₦900k if we include performance bonuses?" },
      { text: "Can we discuss a performance-based salary review in 6 months once I've hit the design milestones we discussed?" },
    ];
    const fallbackCompensation = [
      { title: "Remote Work Allowance/Internet Stipend", description: "Ask if the company covers the cost of a high-speed fiber connection and power backup/inverter to ensure 100% uptime.", value: "₦480,000/year" },
      { title: "Health Insurance (HMO)", description: "Request a Tier-1 HMO plan that includes dental and optical for yourself and a dependent.", value: "₦250,000/year" },
      { title: "Learning & Development Budget", description: "Negotiate for a dedicated annual stipend for global design certifications (Interaction Design Foundation, NN/g) or design conference tickets.", value: "₦750,000/year" },
    ];
    const fallbackOutlook = "The design industry in Nigeria is experiencing rapid growth driven by fintech expansion, increased digital adoption, and a growing startup ecosystem. Mid-level designers with strong UX research skills and domain expertise in financial services are particularly well-positioned for salary growth over the next 2–3 years.";

    const companyTypes = (output.salary_by_company_type && Array.isArray(output.salary_by_company_type) && output.salary_by_company_type.length > 0) ? output.salary_by_company_type : fallbackCompanyTypes;
    const drivers = (output.what_drives_higher_pay && output.what_drives_higher_pay.length > 0) ? output.what_drives_higher_pay : fallbackDrivers;
    const negotiation = output.negotiation_strategy || fallbackNegotiation;
    const leveragePoints = (output.leverage_points && output.leverage_points.length > 0) ? output.leverage_points : fallbackLeverage;
    const scriptsList = (output.scripts && output.scripts.length > 0) ? output.scripts : fallbackScripts;
    const hiddenComp = (output.hidden_compensation && output.hidden_compensation.length > 0) ? output.hidden_compensation : fallbackCompensation;
    const industryOutlook = output.industry_outlook || fallbackOutlook;

    return (
      <div className="w-full space-y-6 md:space-y-10 text-left animate-in fade-in slide-in-from-top-4 duration-700 px-4 md:px-0">
        {/* Subtitle */}
        <div className="space-y-2">
          <p className="text-[14px] md:text-[15px] text-[#6A6D71]">
            {output.subtitle || "Discover detailed information about any career and see how well you fit based on your skills"}
          </p>
        </div>

        {/* Salary Overview - 3 column cards */}
        <section className="space-y-3 md:space-y-4 w-full">
          <h3 className="sora-semibold text-[18px] md:text-[20px] text-[#161A21]">Salary Overview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3  overflow-hidden">
            <div className="bg-white border border-[#E8E8E8] rounded-[12px] md:rounded-[16px] p-4 md:p-5 space-y-1">
              <p className="text-[11px] md:text-[12px] text-[#6A6D71] font-medium">Average Salary</p>
              <p className="text-[18px] md:text-[22px] font-bold text-[#161A21]">{output.average_salary || "₦850,000/month"}</p>
            </div>
            <div className="bg-white border border-[#E8E8E8] rounded-[12px] md:rounded-[16px] p-4 md:p-5 space-y-1">
              <p className="text-[11px] md:text-[12px] text-[#6A6D71] font-medium">Salary Range</p>
              <p className="text-[18px] md:text-[22px] font-bold text-[#161A21]">{output.salary_range || "₦500,000 – ₦1,300,000/month"}</p>
            </div>
            <div className="bg-white border border-[#E8E8E8] rounded-[12px] md:rounded-[16px] p-4 md:p-5 space-y-1">
              <p className="text-[11px] md:text-[12px] text-[#6A6D71] font-medium">Experience Level</p>
              <p className="text-[18px] md:text-[22px] font-bold text-[#161A21]">{output.experience_level || "Mid-Level Designer"}</p>
            </div>
          </div>
        </section>

        {/* Salary by Company Type */}
        <section className="space-y-3 md:space-y-4 w-full border-t border-[#E8E8E8] pt-6 md:pt-10">
          <h3 className="font-bold text-[16px] md:text-[18px] text-[#161A21]">Salary by Company Type</h3>
          {output.salary_by_company_type_description && (
            <p className="text-[13px] md:text-[14px] text-[#6A6D71] leading-relaxed">{output.salary_by_company_type_description}</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6">
            {companyTypes.map((company: any, ci: number) => (
              <div key={ci} className="space-y-2">
                <p className="font-bold text-[13px] md:text-[16px] text-[#161A21]">{company.type}</p>
                <div className="space-y-1.5">
                  {company.levels?.map((level: any, li: number) => (
                    <div key={li} className="flex justify-between items-center bg-[#F6F3FF] mori-semibold px-3 py-2 md:py-2.5">
                      <span className="text-[11px] md:text-[12px] text-[#6A6D71]">{level.level}</span>
                      <span className="text-[11px] md:text-[12px] text-[#161A21]">{level.salary}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What Drives Higher Pay */}
        <section className="space-y-4 md:space-y-5 border-t border-[#E8E8E8] pt-6 md:pt-10">
          <h3 className="font-bold text-[16px] md:text-[18px] text-[#161A21]">What Drives Higher Pay</h3>
          <div className="space-y-5 md:space-y-6">
            {drivers.map((driver: any, di: number) => (
              <div key={di} className="flex items-start gap-3 md:gap-4">
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#F6F3FF] flex items-center justify-center shrink-0 mt-0.5">
                  <Image src="/dollar-circle.svg" width={20} height={20} alt="add" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 md:gap-3">
                    <p className="font-bold text-[14px] md:text-[15px] text-[#161A21]">{typeof driver === "string" ? driver : driver.title}</p>
                    {driver.percentage && (
                      <span className="shrink-0 text-[#059669] font-bold text-[13px] md:text-[14px]">{driver.percentage}</span>
                    )}
                  </div>
                  {driver.description && (
                    <p className="text-[12px] md:text-[13px] text-[#6A6D71] mt-1 leading-relaxed">{driver.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Negotiation Strategy */}
        <section className="space-y-4 md:space-y-5 border-t border-[#E8E8E8] pt-6 md:pt-10">
          <h3 className="font-bold text-[16px] md:text-[18px] text-[#161A21]">Negotiation Strategy</h3>
          <div className="space-y-4 md:space-y-5">
            {negotiation.anchor_high && (
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#F6F3FF] border border-[#E0D9FC] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[#5335E9] text-[14px] md:text-[16px]">⊙</span>
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-[14px] md:text-[15px] text-[#161A21]">Anchor High</p>
                  <p className="text-[13px] md:text-[14px] text-[#6A6D71] mt-0.5">{negotiation.anchor_high}</p>
                </div>
              </div>
            )}
            {negotiation.walk_away_point && (
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#F6F3FF] border border-[#E0D9FC] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[#5335E9] text-[14px] md:text-[16px]">⊙</span>
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-[14px] md:text-[15px] text-[#161A21]">Walk Away Point</p>
                  <p className="text-[13px] md:text-[14px] text-[#6A6D71] mt-0.5">{negotiation.walk_away_point}</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Leverage Points */}
        <section className="space-y-3 md:space-y-4 border-t border-[#E8E8E8] pt-6 md:pt-10">
          <h3 className="font-bold text-[16px] md:text-[18px] text-[#161A21]">Leverage Points</h3>
          <ul className="space-y-2 md:space-y-2.5">
            {leveragePoints.map((point: string, pi: number) => (
              <li key={pi} className="flex items-start gap-2 md:gap-3 text-[13px] md:text-[14px] text-[#444] leading-relaxed">
                <span className="text-[#6A6D71] mt-0.5 shrink-0 text-[8px]">●</span>
                {point}
              </li>
            ))}
          </ul>
        </section>

        {/* Scripts to Use */}
        <section className="space-y-4 md:space-y-5 border-t border-[#E8E8E8] pt-6 md:pt-10">
          <h3 className="font-bold text-[16px] md:text-[18px] text-[#161A21]">Script to Use</h3>
          <div className="space-y-3 md:space-y-4">
            {scriptsList.map((script: any, si: number) => {
              const scriptText = typeof script === "string" ? script : script.text;
              return (
                <div key={si} className="bg-[#F6F3FF] border border-[#E0D9FC] rounded-[12px] md:rounded-[16px] p-4 md:p-5 pr-12 md:pr-14 relative">
                  <p className="text-[#5335E9] text-[12px] md:text-[13px] font-bold mb-2 flex items-center gap-1.5">
                    <span>✦</span> Script {si + 1}
                  </p>
                  <p className="text-[13px] md:text-[14px] text-[#444] italic leading-relaxed">
                    &ldquo;{scriptText}&rdquo;
                  </p>
                  <button
                    className="absolute top-4 right-4 md:top-5 md:right-5 w-7 h-7 md:w-8 md:h-8 rounded-lg bg-white border border-[#E0D9FC] flex items-center justify-center hover:bg-[#F0EEFF] transition-colors"
                    onClick={() => {
                      navigator.clipboard.writeText(scriptText);
                      toast.success("Script copied!");
                    }}
                  >
                    <Copy className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#5335E9]" />
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Hidden Compensation */}
        <section className="space-y-4 md:space-y-5 border-t border-[#E8E8E8] pt-6 md:pt-10">
          <h3 className="font-bold text-[16px] md:text-[18px] text-[#161A21]">Hidden Compensation</h3>
          <div className="space-y-5 md:space-y-6">
            {hiddenComp.map((comp: any, ci: number) => (
              <div key={ci} className="flex items-start gap-3 md:gap-4">
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#F6F3FF] border border-[#E0D9FC] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[#5335E9] text-[14px] md:text-[16px]">⊙</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-3">
                    <p className="font-bold text-[14px] md:text-[15px] text-[#161A21]">{comp.title}</p>
                    {comp.value && (
                      <span className="shrink-0 font-bold text-[13px] md:text-[14px] text-[#161A21]">{comp.value}</span>
                    )}
                  </div>
                  {comp.description && (
                    <p className="text-[12px] md:text-[13px] text-[#6A6D71] mt-1 leading-relaxed">{comp.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Industry Outlook */}
        <section className="space-y-3 border-t border-[#E8E8E8] pt-6 md:pt-10">
          <h3 className="font-bold text-[16px] md:text-[18px] text-[#161A21]">Industry Outlook</h3>
          <p className="text-[#444] text-[14px] md:text-[15px] leading-[1.8] whitespace-pre-wrap">{industryOutlook}</p>
        </section>
      </div>
    );
  }

  // 4b. Explore Careers
  if (s.includes("explore-careers")) {
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

  // 5. Personal Brand Audit / LinkedIn Optimizer
  if (s.includes("brand-audit") || s.includes("profile-optimizer") || s.includes("linkedin-optimizer")) {
    const isOptimizer = s.includes("optimizer");
    
    return (
      <div className="w-full space-y-12 text-left animate-in fade-in slide-in-from-top-4 duration-700">
        {/* Top Score */}
        <div className="bg-white border border-[#E8E8E8] rounded-[16px] p-4 md:p-4 flex flex-col md:flex-col items-start justify-between gap-5 relative overflow-hidden">
           <div className="space-y-1 z-10">
              <p className="text-[16px] font-bold text-[#6A6D71]  tracking-wider mb-2">Avg. Score</p>
              <div className="flex items-baseline gap-1">
                 <span className="text-[16px] md:text-[24px] sora-semibold text-[#322FEB] leading-none">{output.average_score || 79}</span>
                 <span className="text-[16px] md:text-[24px] sora-semibold text-[#95969A]">/100</span>
              </div>
           </div>
           
           <div className="flex-1 w-full z-10 space-y-3">
              {(output.score_suggestions || output.suggestions || [
                "Quantify your early career roles with the same rigor as your recent ones.",
                "Add 'Senior Product Designer' to the current job title to help with HR searches.",
                "Build a 'Featured' section to showcase the Framer portfolio visually."
              ]).map((item: string, i: number) => (
                <div key={i} className="flex gap-3 items-start">
                  <Image src="/check-fill.svg" width={16} height={16} alt="check" className="mt-0.5 shrink-0 brightness-0 saturate-100 invert-[.15] sepia-[.9] saturate-[50] hue-rotate-[220deg]" />
                  <p className="text-[#6A6D71] text-[14px] leading-relaxed italic">
                    {item}
                  </p>
                </div>
              ))}
           </div>
        </div>

        {isOptimizer ? (
          <div className="space-y-12">
            {/* Optimized Headline Section */}
            <div className="space-y-4">
              <h3 className="text-[#161A21] font-bold text-[18px] md:text-[20px]">Optimized Headline</h3>
              <p className="text-[#6A6D71] text-[14px] italic">Current: {output.current_headline || "Emmanuel ThankGod Product Designer | Delaware, USA"}</p>
              <div className="bg-[#F6F3FF] border border-[#C3BCFC] rounded-[12px] p-6 md:p-8 space-y-5 relative group">
                <div className="flex items-center gap-2 text-[#5335E9] font-bold text-[13px] uppercase tracking-widest">
                  <Image src="/sparkling-line-2.svg" width={18} height={18} alt="sparkle" className="brightness-0 saturate-100 invert-[.15] sepia-[.9] saturate-[50] hue-rotate-[220deg]" />
                  Optimized:
                </div>
                <p className="text-[#161A21] text-[16px] md:text-[18px] leading-[1.8] font-medium pr-10">
                  {output.optimized_headline || "Senior Product Designer | Helping SaaS & Tech Teams Scale via Modular UX Frameworks & Design Systems | Increased User Engagement by 40% | UX Research & Product Strategy"}
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(output.optimized_headline || "");
                    toast.success("Headline copied!");
                  }}
                  className="absolute bottom-6 right-6 p-2 text-[#95969A] hover:text-[#322FEB] transition-all hover:scale-110"
                >
                  <Image src="/file-copy-line-2.svg" width={20} height={20} alt="copy" />
                </button>
              </div>
            </div>

            {/* Optimized About Section */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-[#161A21] font-bold text-[18px] md:text-[20px]">Optimized About Section</h3>
                <p className="text-[#6A6D71] text-[14px] md:text-[15px] leading-relaxed max-w-[800px]">
                  {output.about_description || "Does your design system actually speed up development, or is it just a library of pretty buttons? I specialize in bridging the gap between complex engineering requirements and intuitive user experiences. Over the last 7+ years, I've led design initiatives that didn't just look good—they moved the needle."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-[#E8E8E8] rounded-[24px] p-6 md:p-8 space-y-6 shadow-sm">
                  <h4 className="font-bold text-[#161A21] text-[16px]">What I bring to the table:</h4>
                  <div className="space-y-4">
                    {(output.strengths || output.what_i_bring || [
                      "Strategic Design Leadership: Leading end-to-end product lifecycles from discovery to launch.",
                      "Modular Architecture: Building design systems that reduce iteration cycles by up to 45%.",
                      "Data-Driven UX: Using quantitative analysis and Google Analytics to drive 30% improvements in usability completion.",
                      "Cross-Functional Synergy: Facilitating workshops that align developers, PMs, and stakeholders."
                    ]).map((s: string, idx: number) => (
                      <div key={idx} className="flex gap-3 text-[13px] md:text-[14px] text-[#444] leading-relaxed">
                        <Image src="/check-fill.svg" width={16} height={16} alt="check" className="mt-0.5 shrink-0 brightness-0 saturate-100 invert-[.15] sepia-[.9] saturate-[40] hue-rotate-[230deg]" />
                        {s}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-[#E8E8E8] rounded-[24px] p-6 md:p-8 space-y-6 shadow-sm">
                  <h4 className="font-bold text-[#161A21] text-[16px]">Areas to Improve.</h4>
                  <div className="space-y-4">
                    {(output.improvements || output.areas_to_improve || [
                      "Use white space to make it readable on mobile.",
                      "Keep the email address visible so recruiters don't have to hunt for it.",
                      "Bold key achievements to make them pop during a quick skim."
                    ]).map((s: string, idx: number) => (
                      <div key={idx} className="flex gap-4 text-[13px] md:text-[14px] text-[#444] leading-relaxed">
                        <Image src="/check-fill.svg" width={16} height={16} alt="check" className="mt-0.5 shrink-0 brightness-0 saturate-100 invert-[.15] sepia-[.9] saturate-[40] hue-rotate-[230deg]" />
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Skills */}
            <div className="space-y-5">
              <h3 className="text-[#161A21] font-bold text-[18px] md:text-[20px]">Recommended Skills</h3>
              <div className="flex flex-wrap gap-3">
                {(output.recommended_skills || ["UX Design", "Prototyping", "Wireframing", "Information Architecture", "User Research", "Stakeholder Management", "UX Audit", "Design System"]).map((skill: string, i: number) => (
                  <span 
                    key={i} 
                    className="px-5 py-2.5 border border-[#322FEB] text-[#322FEB] rounded-full text-[13px] md:text-[14px] font-medium hover:bg-[#F6F3FF] cursor-default transition-all"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Brand Statement */}
            <div className="space-y-4">
               <h3 className="text-[#161A21] font-bold text-[18px]">Brand Statement</h3>
               <p className="text-[#444] text-[15px] md:text-[16px] leading-[1.7]">
                  {output.brand_statement || "A typical day begins with a 'Daily Standup' with the product and engineering teams."}
               </p>
            </div>

            {/* AI Recommendation Card */}
            <div className="bg-[#F8F9FF] border border-[#E1E4FF] rounded-[16px] p-6 space-y-4 relative group">
               <div className="flex items-center gap-2 text-[#5335E9] font-bold text-[14px]">
                  <Image src="/sparkling-line-2.svg" width={18} height={18} alt="sparkle" className="brightness-0 saturate-100 invert-[.15] sepia-[.9] saturate-[50] hue-rotate-[220deg]" />
                  AI Recommendation
               </div>
               <p className="text-[#161A21] text-[15px] leading-[1.8] pr-10">
                  {output.ai_recommendation || "You know how most AI and Fintech apps feel like you need a PhD just to navigate the home screen?"}
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
               <div className="space-y-4">
                  {(output.platform_analysis || []).map((p: any, i: number) => (
                    <div key={i} className="bg-white border border-[#F0F0F0] rounded-[16px] p-4 flex flex-col gap-3">
                       <div className="flex justify-between items-center">
                          <p className="font-bold text-[#161A21] text-[14px]">{p.label}</p>
                          <div className="text-[16px] font-bold text-[#161A21]">{p.score}/100</div>
                       </div>
                       <div className="w-full bg-[#F0F0F0] h-2 rounded-full overflow-hidden">
                          <div className="h-full bg-[#322FEB] transition-all duration-1000" style={{ width: `${p.score}%` }} />
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* 30-Day Action Plan */}
            <div className="space-y-6 pt-6">
               <h3 className="text-[#161A21] font-bold text-[18px]">30-Day Action Plan</h3>
               <div className="space-y-3">
                  {(output.action_plan_30_days || [
                     "Rewrite LinkedIn About Section like a story.",
                     "Design a Custom LinkedIn banner.",
                     "Select a major project.",
                     "Document the research, friction points and ROI."
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
        )}
      </div>
    );
  }

  // 6. Career Roadmap
  if (s.includes("roadmap")) {
    const RoadmapTabs = () => {
      const [activeTab, setActiveTab] = React.useState<"paths" | "gems" | "start">("paths");
      const [selectedPathIdx, setSelectedPathIdx] = React.useState(0);

      const tabs = [
        { key: "paths" as const, label: "Career Paths" },
        { key: "gems" as const, label: "Hidden Gems" },
        { key: "start" as const, label: "Start Now" },
      ];

      const selectedPath = output.career_paths?.[selectedPathIdx];

      return (
        <div className="w-full space-y-8 text-left animate-in fade-in slide-in-from-top-4 duration-700">
          {/* Subtitle */}
          <p className="text-[15px] text-[#6A6D71]">
            {output.header_subtitle || `${output.current_role || "Your Role"} → Multiple possibilities`}
          </p>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-[#E8E8E8]">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-3 text-[14px] font-medium transition-all border-b-2 ${
                  activeTab === tab.key
                    ? "border-[#322FEB] text-[#161A21]"
                    : "border-transparent text-[#6A6D71] hover:text-[#161A21]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ─── TAB 1: Career Paths ─── */}
          {activeTab === "paths" && (
            <div className="space-y-10">
              {/* Path summary cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {output.career_paths?.map((path: any, i: number) => {
                  const isSelected = selectedPathIdx === i;
                  const tagColors: Record<string, { bg: string; text: string; border: string }> = {
                    ambitious: { bg: "#F6F3FF", text: "#5335E9", border: "#C3BCFC" },
                    challenging: { bg: "#ECFDF5", text: "#059669", border: "#A7F3D0" },
                    practical: { bg: "#FFF7ED", text: "#D97706", border: "#FDE68A" },
                  };
                  const tagLabel = (path.label || "").toLowerCase();
                  const colors = tagColors[tagLabel] || tagColors.ambitious;
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedPathIdx(i)}
                      className={`text-left w-full p-5 rounded-[16px] border-2 transition-all ${
                        isSelected
                          ? "border-[#322FEB] bg-white"
                          : "border-[#E8E8E8] bg-white hover:border-[#322FEB40]"
                      }`}
                    >
                      <span
                        className="inline-block px-3 py-1 rounded-full text-[12px] font-bold mb-3"
                        style={{ backgroundColor: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
                      >
                        {path.label}
                      </span>
                      <p className="font-bold text-[#161A21] text-[16px] mb-1">{path.track_title}</p>
                      <p className="text-[13px] text-[#6A6D71] mb-3">{path.track_role}</p>
                      {path.income_multiplier && (
                        <p className="text-[13px] text-[#322FEB] font-semibold flex items-center gap-1">
                          <span>↗</span> {path.income_multiplier}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Selected path detail */}
              {selectedPath && (
                <div className="space-y-8">
                  <h3 className="text-[24px] font-bold text-[#161A21]">{selectedPath.track_title}</h3>
                  {selectedPath.description && (
                    <p className="text-[15px] text-[#6A6D71] leading-relaxed">{selectedPath.description}</p>
                  )}

                  {/* Destination bar */}
                  {(selectedPath.destination_role || selectedPath.track_role) && (
                    <div className="bg-[#1E1B3A] text-white rounded-[12px] px-5 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="bg-white/20 px-3 py-1 rounded-md text-[12px] font-bold">Destination</span>
                        <span className="text-[14px]">
                          {selectedPath.destination_role || selectedPath.track_role}
                          {selectedPath.destination_income ? ` ${selectedPath.destination_income}` : ""}
                        </span>
                      </div>
                      {selectedPath.destination_timeline && (
                        <span className="flex items-center gap-1 text-[13px] text-white/80 shrink-0">
                          ⏱ {selectedPath.destination_timeline}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Steps timeline */}
                  <div className="space-y-8">
                    {(selectedPath.steps || output.selected_path_detail?.steps)?.map((step: any, i: number) => (
                      <div key={i} className="relative pl-14">
                        {/* Step number circle */}
                        <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-[#F6F3FF] border-2 border-[#C3BCFC] text-[#322FEB] flex items-center justify-center font-bold text-[16px]">
                          {step.step_number || i + 1}
                        </div>

                        <div className="space-y-4">
                          {/* Step header */}
                          <div>
                            <h4 className="font-bold text-[#161A21] text-[18px]">{step.role_title}</h4>
                            <p className="text-[13px] text-[#6A6D71]">{step.duration}</p>
                          </div>

                          {/* Milestones + Skills grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Key Milestones */}
                            {step.key_milestones && step.key_milestones.length > 0 && (
                              <div className="space-y-3">
                                <p className="text-[13px] font-bold text-[#161A21]">Key Milestones</p>
                                {step.key_milestones.map((m: string, mi: number) => (
                                  <div key={mi} className="flex items-start gap-2">
                                    <span className="text-[#059669] mt-0.5 shrink-0">✓</span>
                                    <span className="text-[14px] text-[#444]">{m}</span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Skills to Stack */}
                            {step.skills_to_stack && step.skills_to_stack.length > 0 && (
                              <div className="space-y-3">
                                <p className="text-[13px] font-bold text-[#161A21]">Skills to Stack</p>
                                {step.skills_to_stack.map((skill: any, si: number) => {
                                  const priorityColors: Record<string, { bg: string; text: string }> = {
                                    critical: { bg: "#FFF7ED", text: "#D97706" },
                                    important: { bg: "#F6F3FF", text: "#5335E9" },
                                  };
                                  const priority = (typeof skill === "string") ? "" : (skill.priority || "").toLowerCase();
                                  const pColors = priorityColors[priority] || priorityColors.important;
                                  return (
                                    <div key={si} className="flex items-start gap-2">
                                      {typeof skill === "string" ? (
                                        <>
                                          <span className="text-[#D97706] mt-0.5 shrink-0">✕</span>
                                          <span className="text-[14px] text-[#444]">{skill}</span>
                                        </>
                                      ) : (
                                        <>
                                          <span
                                            className="shrink-0 px-2 py-0.5 rounded text-[11px] font-bold mt-0.5"
                                            style={{ backgroundColor: pColors.bg, color: pColors.text, border: `1px solid ${pColors.text}30` }}
                                          >
                                            {skill.priority || "Important"}
                                          </span>
                                          <div>
                                            <p className="text-[14px] font-semibold text-[#161A21]">{skill.name}</p>
                                            {skill.resource && <p className="text-[12px] text-[#6A6D71]">{skill.resource}</p>}
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>

                          {/* Pro tip */}
                          {step.pro_tip && (
                            <div className="flex items-start gap-3 bg-[#FFF9F0] border border-[#FFE4B5] rounded-[12px] px-5 py-3.5">
                              <span className="text-[18px] shrink-0">💡</span>
                              <p className="text-[14px] text-[#6A6D71]">
                                <span className="font-bold text-[#161A21]">Pro tip </span>
                                {step.pro_tip}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ─── TAB 2: Hidden Gems ─── */}
          {activeTab === "gems" && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F6F3FF] flex items-center justify-center text-[18px] shrink-0">🔍</div>
                <div>
                  <p className="font-bold text-[#161A21] text-[16px]">Roles You Probably Don&apos;t Know About</p>
                  <p className="text-[13px] text-[#6A6D71]">These are perfect for your background but often overlooked</p>
                </div>
              </div>

              {/* Hidden gem cards */}
              {(output.hidden_gems || []).map((gem: any, i: number) => {
                if (typeof gem === "string") {
                  return (
                    <div key={i} className="bg-white border border-[#E8E8E8] rounded-[16px] p-6">
                      <p className="text-[15px] text-[#161A21]">{gem}</p>
                    </div>
                  );
                }
                return (
                  <div key={i} className="bg-white border border-[#E8E8E8] rounded-[16px] p-6 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <h4 className="font-bold text-[#161A21] text-[16px]">{gem.title || gem.role}</h4>
                      {gem.salary && (
                        <p className="text-[18px] font-bold text-[#161A21] shrink-0">{gem.salary}</p>
                      )}
                    </div>
                    {gem.description && <p className="text-[14px] text-[#6A6D71]">{gem.description}</p>}
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {gem.skills_to_add && gem.skills_to_add.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-[13px] font-bold text-[#161A21]">Skills to add:</p>
                          <div className="flex flex-wrap gap-2">
                            {gem.skills_to_add.map((sk: string, si: number) => (
                              <span key={si} className="px-3 py-1.5 rounded-full border border-[#C3BCFC] text-[#5335E9] text-[12px] font-medium bg-[#F6F3FF]">
                                {sk}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {gem.top_employers && gem.top_employers.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-[13px] font-bold text-[#161A21]">Top Employers</p>
                          <div className="flex flex-wrap gap-2">
                            {gem.top_employers.map((emp: string, ei: number) => (
                              <span key={ei} className="px-3 py-1.5 rounded-full border border-[#E8E8E8] text-[#161A21] text-[12px] font-medium bg-white">
                                {emp}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ─── TAB 3: Start Now ─── */}
          {activeTab === "start" && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F6F3FF] flex items-center justify-center text-[18px] shrink-0">🎯</div>
                <div>
                  <p className="font-bold text-[#161A21] text-[16px]">Start This Week</p>
                  <p className="text-[13px] text-[#6A6D71]">Concrete actions to begin your career progression</p>
                </div>
              </div>

              {/* Action items */}
              {(output.start_now || []).map((action: any, i: number) => {
                const actionText = typeof action === "string" ? action : action.title || action.action;
                const actionTime = typeof action === "string" ? null : action.time;
                const actionImpact = typeof action === "string" ? null : action.impact;
                return (
                  <div key={i} className="bg-white border border-[#E8E8E8] rounded-[16px] p-5 flex items-center gap-4">
                    {/* Number */}
                    <div className="w-10 h-10 rounded-full bg-[#F6F3FF] border-2 border-[#C3BCFC] text-[#322FEB] flex items-center justify-center font-bold text-[16px] shrink-0">
                      {i + 1}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] text-[#161A21] font-medium">{actionText}</p>
                      <div className="flex items-center gap-3 mt-1">
                        {actionTime && (
                          <span className="text-[12px] text-[#6A6D71] flex items-center gap-1">
                            ⏱ {actionTime}
                          </span>
                        )}
                        {actionImpact && (
                          <span className="text-[12px] text-[#059669] font-semibold flex items-center gap-1">
                            ↗ {actionImpact}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Start Now button */}
                    <button className="shrink-0 px-5 py-2.5 bg-[#161A21] text-white rounded-full text-[13px] font-semibold hover:bg-[#2a2e35] transition-colors">
                      Start Now
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    };

    return <RoadmapTabs />;
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
      <div className="w-full bg-white border border-[#E8E8E8] rounded-[24px] p-8 md:p-12 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] text-left">
        <h3 className="text-[14px] mori-semibold text-[#161A21] mb-8">Your Summary</h3>
        <div className="text-[15px] md:text-[16px] text-[#161A21] leading-[1.8] whitespace-pre-wrap font-normal">
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

  // 10. Tax Calculator
  if (s.includes("tax-calculator")) {
    const mode = output?.mode || output?.calculation_mode || "annual";
    const modeLabel = mode === "annual" ? "Annual" : "Monthly";

    // Helper to safely extract display value from a field that might be string or object
    const getVal = (val: any): string => {
      if (!val) return "₦0.00";
      if (typeof val === "string") return val;
      if (typeof val === "number") return `₦${val.toLocaleString()}`;
      if (typeof val === "object") return val.total || val.value || "";
      return String(val);
    };
    const getMonthly = (val: any, fallback?: any): string => {
      if (typeof val === "object" && val?.monthly_average) return String(val.monthly_average);
      if (fallback) return getVal(fallback);
      return "₦0.00";
    };
    const getLabel = (val: any, fallback: string): string => {
      if (typeof val === "object" && val?.label) return String(val.label).toUpperCase();
      return fallback;
    };
    const getDesc = (val: any, fallback: string): string => {
      if (typeof val === "object" && val?.description) return String(val.description);
      return fallback;
    };

    const payeTaxDue = output?.paye_tax_due;
    const takeHomePay = output?.take_home_pay;
    const breakdown = Array.isArray(output?.breakdown) ? output.breakdown : [];
    const summaryRows = Array.isArray(output?.summary_rows) ? output.summary_rows : [];
    const note = typeof output?.note === "string" ? output.note : output?.note?.description || "";

    return (
      <div className="w-full space-y-6 text-left animate-in fade-in slide-in-from-top-4 duration-500">
        {/* Mode indicator */}
        <div className="bg-[#F5F5F5] rounded-xl py-3 text-center text-[14px] font-medium text-[#161A21]">
          {modeLabel}
        </div>

        {/* PAYE TAX DUE */}
        <div className="border-2 border-[#322FEB] rounded-[16px] p-6 space-y-2 bg-white">
          <span className="inline-block px-3 py-1 rounded-full border border-[#322FEB] text-[#322FEB] text-[12px] font-bold">
            {getLabel(payeTaxDue, "PAYE TAX DUE")}
          </span>
          <p className="text-[14px] text-[#6A6D71] mt-2">
            {getDesc(payeTaxDue, "Tax payable for this year")}
          </p>
          <p className="text-[32px] font-bold text-[#161A21]">
            {getVal(payeTaxDue)}
          </p>
          <p className="text-[13px] text-[#322FEB] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#322FEB] inline-block" />
            Monthly average ({getMonthly(payeTaxDue, output?.paye_monthly_average)})
          </p>
        </div>

        {/* TAKE-HOME PAY */}
        <div className="border border-[#E8E8E8] rounded-[16px] p-6 space-y-2 bg-white">
          <span className="inline-block px-3 py-1 rounded-full border border-[#E8E8E8] text-[#161A21] text-[12px] font-bold">
            {getLabel(takeHomePay, "TAKE - HOME PAY")}
          </span>
          <p className="text-[14px] text-[#6A6D71] mt-2">
            {getDesc(takeHomePay, "Cash after PAYE and payroll deductions (pension, NHF, NHIS, insurance, home-loan interest). Rent relief lowers tax, not cash paid out.")}
          </p>
          <p className="text-[32px] font-bold text-[#161A21]">
            {getVal(takeHomePay)}
          </p>
          <p className="text-[13px] text-[#322FEB] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#322FEB] inline-block" />
            Monthly average ({getMonthly(takeHomePay, output?.take_home_monthly_average)})
          </p>
        </div>

        {/* How we calculated this */}
        {breakdown.length > 0 && (
          <div className="space-y-4 pt-2 bg-white border border-[#E8E8E8] rounded-[16px] p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-[16px] text-[#161A21]">How we calculated this</h3>
                <p className="text-[12px] text-[#6A6D71]">These are the amounts used in your calculation...</p>
              </div>
              <span className="text-[12px] text-[#6A6D71] font-medium uppercase">
                {mode === "annual" ? "ANNUAL VIEW" : "MONTHLY VIEW"}
              </span>
            </div>

            <div className="space-y-0 divide-y divide-[#F0F0F0]">
              {breakdown.map((row: any, i: number) => (
                <div key={i} className="flex justify-between items-start py-3">
                  <span className={`text-[14px] ${row.indent ? "pl-6 text-[#6A6D71]" : "text-[#161A21]"} ${row.bold ? "font-bold" : ""}`}>
                    {String(row.label || "")}
                  </span>
                  <span className={`text-[14px] font-semibold shrink-0 ${
                    row.negative ? "text-[#D92D20]" : "text-[#161A21]"
                  } ${row.bold ? "font-bold" : ""}`}>
                    {String(row.value || row.total || "")}
                  </span>
                </div>
              ))}
            </div>

            {note && (
              <p className="text-[12px] text-[#6A6D71] italic leading-relaxed pt-2">
                {note}
              </p>
            )}

            {summaryRows.map((row: any, i: number) => (
              <div key={`s-${i}`} className="flex justify-between items-start py-3 border-t border-[#F0F0F0]">
                <span className={`text-[14px] ${row.bold ? "font-bold text-[#161A21]" : "text-[#6A6D71]"}`}>
                  {String(row.label || "")}
                </span>
                <span className={`text-[14px] font-semibold shrink-0 ${
                  row.negative ? "text-[#D92D20]" : "text-[#161A21]"
                } ${row.bold ? "font-bold" : ""}`}>
                  {String(row.value || row.total || "")}
                </span>
              </div>
            ))}
          </div>
        )}
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
