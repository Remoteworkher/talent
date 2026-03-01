"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useResumeBuilderStore, ExperienceEntry, EducationEntry } from "@/lib/store/useResumeBuilderStore";
import ResumePreviewDocument from "@/components/Tools/ResumeBuilder/ResumePreviewDocument";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { toast } from "sonner";

/* ─── Resume template data ─────────────────────────────────────────── */
const resumeTemplates = [
  {
    image: "/resume1.svg",
    title: "Classic Professional",
    colors: ["#EDEDED", "#454545", "#0391FF"],
    value: "classic",
  },
  {
    image: "/resume4.svg",
    title: "Executive",
    colors: ["#EDEDED", "#454545", "#3DA876", "#135FA2", "#DB17D1"],
    value: "executive",
  },
  {
    image: "/resume3.svg",
    title: "Creative Bold",
    colors: ["#EDEDED", "#454545", "#0391FF"],
    value: "creative",
  },
  {
    image: "/resume5.svg",
    title: "Creative Bold",
    colors: ["#EDEDED", "#454545", "#0391FF", "#372275"],
    value: "creative2",
  },
  {
    image: "/resume2.svg",
    title: "Modern Tech",
    colors: ["#EDEDED", "#454545", "#3DA876", "#135FA2", "#DB17D1"],
    value: "modern",
  },
];

const sidebarSections = [
  "Contact",
  "Portfolio",
  "About",
  "Experience",
  "Education",
  "Skills",
];

/* ─── Social media icon SVGs ────────────────────────────────────────── */
const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#0A66C2" />
    <path
      d="M7.1 18H4.4V9.5h2.7V18zM5.75 8.3a1.57 1.57 0 110-3.14 1.57 1.57 0 010 3.14zM19.6 18h-2.7v-4.1c0-1-.02-2.3-1.4-2.3-1.4 0-1.62 1.1-1.62 2.22V18h-2.7V9.5h2.6v1.16h.04a2.85 2.85 0 012.56-1.41c2.74 0 3.25 1.8 3.25 4.14V18z"
      fill="white"
    />
  </svg>
);

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="12" fill="#161A21" />
    <path
      d="M12 5a7 7 0 00-2.21 13.64c.35.06.48-.15.48-.34v-1.2c-1.95.42-2.36-.94-2.36-.94-.32-.81-.78-1.03-.78-1.03-.64-.44.05-.43.05-.43.7.05 1.07.72 1.07.72.62 1.07 1.64.76 2.04.58.06-.45.24-.76.44-.93-1.56-.18-3.2-.78-3.2-3.47 0-.77.27-1.39.72-1.88-.07-.18-.31-.9.07-1.86 0 0 .59-.19 1.93.72a6.7 6.7 0 013.52 0c1.34-.91 1.93-.72 1.93-.72.38.97.14 1.68.07 1.86.45.49.72 1.11.72 1.88 0 2.7-1.64 3.29-3.21 3.46.25.22.48.65.48 1.31v1.94c0 .19.13.4.48.34A7 7 0 0012 5z"
      fill="white"
    />
  </svg>
);

const TwitterXIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#000" />
    <path
      d="M13.4 10.8L17.9 5.5h-1.1L12.9 10 9.7 5.5H6l4.8 6.9L6 18.5h1.1l4.2-4.9 3.4 4.9H18l-4.6-7.7zm-1.5 1.7l-.5-.7L7.5 6.4H9.2l3.2 4.6.5.7 4.2 6H15.4l-3.5-5z"
      fill="white"
    />
  </svg>
);

const DribbbleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="12" fill="#EA4C89" />
    <path
      d="M12 5a7 7 0 100 14A7 7 0 0012 5zm4.6 3.3a5.8 5.8 0 011.2 3.6c-.2 0-1.8-.4-3.5-.2-.1-.2-.1-.4-.2-.6l-.4-.9c1.7-.7 2.5-1.6 2.9-1.9zM12 6.2c1.2 0 2.3.4 3.2 1.1-.3.3-1 1-2.6 1.6-.8-1.5-1.6-2.7-1.7-2.9.4-.1.7-.2 1.1-.2zm-2.3.5l1.8 3c-2.2.6-4.2.6-4.4.6A5.8 5.8 0 019.7 6.7zM6.2 12v-.2c.2 0 2.6 0 5-.7l.4.8c-.1 0-.2.1-.3.1-2.5.8-3.8 3-3.9 3.2A5.8 5.8 0 016.2 12zm5.8 5.8c-1.3 0-2.5-.4-3.4-1.2.1-.2 1.3-2.2 3.9-3.2h.1c.7 1.9 1 3.4 1.1 4a5.8 5.8 0 01-1.7.4zm3-.7c-.1-.5-.4-1.9-1-3.6 1.6-.3 3 .2 3.2.2a5.8 5.8 0 01-2.2 3.4z"
      fill="white"
    />
  </svg>
);

/* ─── Bookmark icon for Education cards ─────────────────────────────── */
const BookmarkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
      fill="#95969A"
    />
  </svg>
);

/* ─── Panel: Contact ─────────────────────────────────────────────────── */
const ContactPanel = () => {
  const { firstName, lastName, email, phone, location, linkedinUrl, githubUrl, twitterUrl, dribbbleUrl, setPersonalInfo } = useResumeBuilderStore();

  return (
    <div className="px-4 pb-5 space-y-4 pt-3">
      <div className="space-y-1">
        <Label htmlFor="firstName" className="text-[#161A21] text-[13px] mori-semibold">
          First Name
        </Label>
        <Input id="firstName" placeholder="Emmanuel" type="text" value={firstName} onChange={(e) => setPersonalInfo({ firstName: e.target.value })} />
      </div>
      <div className="space-y-1">
        <Label htmlFor="lastName" className="text-[#161A21] text-[13px] mori-semibold">
          Last Name
        </Label>
        <Input id="lastName" placeholder="ThankGod" type="text" value={lastName} onChange={(e) => setPersonalInfo({ lastName: e.target.value })} />
      </div>
      <div className="space-y-1">
        <Label htmlFor="contact-email" className="text-[#161A21] text-[13px] mori-semibold">
          Email
        </Label>
        <Input id="contact-email" placeholder="thankgodemmanuel77@gmail.com" type="email" value={email} onChange={(e) => setPersonalInfo({ email: e.target.value })} />
      </div>
      <div className="space-y-1">
        <Label htmlFor="contact-phone" className="text-[#161A21] text-[13px] mori-semibold">
          Phone Number
        </Label>
        <Input id="contact-phone" placeholder="08189794361" type="tel" value={phone} onChange={(e) => setPersonalInfo({ phone: e.target.value })} />
      </div>
      <div className="space-y-1">
        <Label htmlFor="contact-location" className="text-[#161A21] text-[13px] mori-semibold">
          Location
        </Label>
        <Input id="contact-location" placeholder="Lagos, Nigeria" type="text" value={location} onChange={(e) => setPersonalInfo({ location: e.target.value })} />
      </div>

      {/* Social Media */}
      <div className="space-y-2">
        <Label className="text-[#161A21] text-[13px] mori-semibold">Social Media</Label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center gap-1.5">
            <LinkedInIcon />
            <span className="text-[11px] text-[#0A66C2] mori-semibold">LinkedIn</span>
            <span className="text-[#E8E8E8] text-[12px]">|</span>
          </div>
          <Input id="contact-linkedin" placeholder="linkedin.com/in/enter-handle" type="url" value={linkedinUrl} onChange={(e) => setPersonalInfo({ linkedinUrl: e.target.value })} className="pl-[105px] text-[12px]" />
        </div>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center gap-1.5">
            <GithubIcon />
            <span className="text-[11px] text-[#161A21] mori-semibold">Github</span>
            <span className="text-[#E8E8E8] text-[12px]">|</span>
          </div>
          <Input id="contact-github" placeholder="github.com/enter-handle" type="url" value={githubUrl} onChange={(e) => setPersonalInfo({ githubUrl: e.target.value })} className="pl-[88px] text-[12px]" />
        </div>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center gap-1.5">
            <TwitterXIcon />
            <span className="text-[11px] text-[#161A21] mori-semibold">X (Twitter)</span>
            <span className="text-[#E8E8E8] text-[12px]">|</span>
          </div>
          <Input id="contact-twitter" placeholder="twitter.com/enter-handle" type="url" value={twitterUrl} onChange={(e) => setPersonalInfo({ twitterUrl: e.target.value })} className="pl-[116px] text-[12px]" />
        </div>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center gap-1.5">
            <DribbbleIcon />
            <span className="text-[11px] text-[#EA4C89] mori-semibold">Dribbble</span>
            <span className="text-[#E8E8E8] text-[12px]">|</span>
          </div>
          <Input id="contact-dribbble" placeholder="Dribbble.com/enter-handle" type="url" value={dribbbleUrl} onChange={(e) => setPersonalInfo({ dribbbleUrl: e.target.value })} className="pl-[100px] text-[12px]" />
        </div>
      </div>
    </div>
  );
};

/* ─── Panel: Portfolio ───────────────────────────────────────────────── */
const PortfolioPanel = () => {
  const { portfolioUrl, setPersonalInfo } = useResumeBuilderStore();
  return (
    <div className="px-4 pb-5 pt-3 space-y-2">
      <p className="text-[12px] text-[#95969A]">Add your portfolio link here</p>
      <Textarea
        id="portfolio-url"
        placeholder="https://thankgodemmanuel.framer.website/"
        value={portfolioUrl}
        onChange={(e) => setPersonalInfo({ portfolioUrl: e.target.value })}
        rows={3}
        className="rounded-[16px] text-[13px] resize-none focus-visible:border-[#322FEB] focus-visible:ring-[#322FEB]/20"
      />
    </div>
  );
};

/* ─── Panel: About ───────────────────────────────────────────────────── */
const AboutPanel = () => {
  const { professionalSummary, setPersonalInfo } = useResumeBuilderStore();
  return (
    <div className="px-4 pb-5 pt-3 space-y-2">
      <p className="text-[12px] text-[#95969A] leading-[1.5]">
        Highlight relevant skills, experiences, and accomplishments tailored to the job. Use concise language, industry-specific keywords, and quantify achievements. Show passion and enthusiasm.
      </p>
      <Textarea
        id="about-summary"
        placeholder="Led design initiatives that increased user engagement by up to 40%..."
        value={professionalSummary}
        onChange={(e) => setPersonalInfo({ professionalSummary: e.target.value })}
        rows={8}
        className="rounded-[16px] text-[13px] resize-none focus-visible:border-[#322FEB] focus-visible:ring-[#322FEB]/20 min-h-[180px]"
      />
    </div>
  );
};

/* ─── Panel: Experience ──────────────────────────────────────────────── */
const ExperiencePanel = () => {
  const { experiences, setExperiences } = useResumeBuilderStore();

  const addAchievement = (expIdx: number) => {
    const updated = [...experiences];
    updated[expIdx].achievements.push("");
    setExperiences(updated);
  };

  const updateAchievement = (expIdx: number, achIdx: number, val: string) => {
    const updated = [...experiences];
    updated[expIdx].achievements[achIdx] = val;
    setExperiences(updated);
  };

  return (
    <div className="px-4 pb-5 pt-3 space-y-4">
      {experiences.map((exp, expIdx) => (
        <div key={expIdx} className="space-y-2">
          {/* Experience header info */}
          <div>
            <p className="text-[13px] mori-semibold text-[#161A21]">{exp.companyName || "Company Name"}</p>
            <p className="text-[11px] text-[#6A6D71]">{exp.jobTitle || "Job Title"}</p>
            <p className="text-[11px] text-[#6A6D71]">{exp.startDate} – {exp.currentlyWorking ? "Present" : exp.endDate}</p>
          </div>

          {/* Achievement bullets */}
          <div className="space-y-2">
            {exp.achievements.map((ach, achIdx) => (
              <div key={achIdx} className="space-y-1">
                 <Textarea
                    value={ach}
                    onChange={(e) => updateAchievement(expIdx, achIdx, e.target.value)}
                    rows={3}
                    className="rounded-[16px] text-[12px] resize-none focus-visible:border-[#322FEB] focus-visible:ring-[#322FEB]/20 leading-[1.5]"
                    placeholder="Describe an achievement..."
                  />
              </div>
            ))}
          </div>

          {/* + Achievement button */}
          <button
            type="button"
            onClick={() => addAchievement(expIdx)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-[20px] bg-[#F6F3FF] text-[#322FEB] text-[13px] mori-semibold hover:bg-[#EDE9FF] transition-colors"
          >
            <span className="text-[16px] leading-none">+</span>
            Achievement
          </button>

          {expIdx < experiences.length - 1 && (
            <div className="border-b border-[#E8E8E8] pt-2" />
          )}
        </div>
      ))}
    </div>
  );
};

/* ─── Panel: Education ───────────────────────────────────────────────── */
const EducationPanel = () => {
  const { educations, setEducations } = useResumeBuilderStore();

  const addEducation = () => {
    setEducations([
      ...educations,
      { institutionName: "", location: "", degree: "", fieldOfStudy: "", graduationYear: "" },
    ]);
  };

  return (
    <div className="px-4 pb-5 pt-3 space-y-3">
      {educations.map((edu, idx) => (
        <div
          key={idx}
          className="border border-[#E8E8E8] rounded-[16px] p-3 space-y-1 bg-white"
        >
          {/* Header row with bookmark icon + location */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-[8px] bg-[#F0F0F0] flex items-center justify-center shrink-0">
              <BookmarkIcon />
            </div>
            <span className="text-[12px] mori-semibold text-[#161A21]">{edu.institutionName || "—"}</span>
          </div>
          <p className="text-[13px] mori-semibold text-[#161A21] pl-[36px]">{edu.fieldOfStudy || "—"}</p>
          <p className="text-[12px] text-[#95969A] pl-[36px]">{edu.degree || "—"} | {edu.graduationYear}</p>
        </div>
      ))}

      {/* + Add Education */}
      <button
        type="button"
        onClick={addEducation}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-[20px] bg-[#F6F3FF] text-[#322FEB] text-[13px] mori-semibold hover:bg-[#EDE9FF] transition-colors"
      >
        <span className="text-[16px] leading-none">+</span>
        Add Education
      </button>
    </div>
  );
};

/* ─── Panel: Skills ──────────────────────────────────────────────────── */
const SkillsPanel = () => {
  const { skills, setSkills } = useResumeBuilderStore();
  const [newSkill, setNewSkill] = useState("");

  const updateSkill = (idx: number, val: string) => {
    const updated = [...skills];
    updated[idx] = val;
    setSkills(updated);
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="px-4 pb-5 pt-3 space-y-2">
      {/* Existing skills */}
      {skills.map((skill, idx) => (
         <div key={idx} className="flex gap-2">
            <Input
                value={skill}
                onChange={(e) => updateSkill(idx, e.target.value)}
                className="text-[13px]"
                placeholder="Skill name"
            />
         </div>
      ))}

      {/* New Skill input */}
      <div className="space-y-1 pt-1">
        <Label className="text-[#161A21] text-[13px] mori-semibold">New Skill</Label>
        <Input
          id="new-skill"
          placeholder="Enter new skill"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleKeyDown}
          className="text-[13px]"
        />
      </div>

      {/* + Add Skill */}
      <button
        type="button"
        onClick={addSkill}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-[20px] bg-[#F6F3FF] text-[#322FEB] text-[13px] mori-semibold hover:bg-[#EDE9FF] transition-colors mt-1"
      >
        <span className="text-[16px] leading-none">+</span>
        Add Skill
      </button>
    </div>
  );
};

/* ─── Section panel resolver ─────────────────────────────────────────── */
const SectionPanel = ({ label }: { label: string }) => {
  switch (label) {
    case "Contact":    return <ContactPanel />;
    case "Portfolio":  return <PortfolioPanel />;
    case "About":      return <AboutPanel />;
    case "Experience": return <ExperiencePanel />;
    case "Education":  return <EducationPanel />;
    case "Skills":     return <SkillsPanel />;
    default:           return null;
  }
};

/* ─── Main Page ──────────────────────────────────────────────────────── */
const Page = () => {
  const { 
    template: selectedTemplate, setTemplate, setThemeColor, 
    firstName, lastName, targetRole, location, phone, email, portfolioUrl, linkedinUrl, professionalSummary,
    experiences, educations, skills, themeColor
  } = useResumeBuilderStore();
  const [openSection, setOpenSection] = useState<string | null>(null);
  const resumeRef = useRef<HTMLDivElement>(null);

  const toggleSection = (label: string) => {
    setOpenSection((prev) => (prev === label ? null : label));
  };

  const handleTemplateSelect = (template: typeof resumeTemplates[0]) => {
     setTemplate(template.value);
     // Default to third color as theme color
     if (template.colors.length >= 3) {
        setThemeColor(template.colors[2]);
     }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="-m-4 bg-[#FFFCFD] min-h-[calc(100vh-80px)] flex flex-col">
      {/* Page Top Bar */}
      <div className="w-full border-b border-[#E8E8E8] bg-white sticky top-0 z-40">
        {/* Desktop Header */}
        <div className="hidden md:flex justify-between items-center py-8 px-4 md:px-8">
          <div className="flex items-center gap-4">
            <h1 className="sora-semibold text-[#161A21] text-[18px] md:text-[22px]">
              Your resume is ready!
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2 text-[14px] flex">
              <Image src="/reset-right-line.svg" width={18} height={18} alt="regenerate" />
              Regenerate resume
            </Button>
            <Button onClick={handlePrint} className="gap-2 text-[14px]">
              <Image src="/download-line.svg" width={18} height={18} alt="download" className="brightness-[10]" />
              Download PDF
            </Button>
          </div>
        </div>
        
        {/* Mobile Header */}
        
      </div>

      {/* Three-column layout */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* ── Left Sidebar ── */}
        <aside className="hidden md:flex flex-col w-[230px] shrink-0 border-r border-[#E8E8E8] bg-white overflow-y-auto">
          {sidebarSections.map((label, index) => {
            const isOpen = openSection === label;
            return (
              <div key={label}>
                {/* Trigger row */}
                <button
                  type="button"
                  onClick={() => toggleSection(label)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#F7F7F7] transition-colors group text-left"
                >
                  <span className="p-1.5 rounded-[8px] bg-[#F6F3FF] flex items-center justify-center shrink-0 transition-colors">
                    <Image
                      src={isOpen ? "/subtract-line.svg" : "/add-line.svg"}
                      width={16}
                      height={16}
                      alt={isOpen ? "collapse" : "expand"}
                    />
                  </span>
                  <span className="text-[14px] mori-semibold text-[#161A21]">{label}</span>
                </button>

                {/* Expandable panel */}
                {isOpen && (
                  <div className="border-t border-[#F0F0F0] bg-white">
                    <SectionPanel label={label} />
                  </div>
                )}

                {index < sidebarSections.length - 1 && (
                  <div className="border-b border-[#E8E8E8]" />
                )}
              </div>
            );
          })}
        </aside>

        {/* ── Center: Resume Preview ── */}
        <main className="flex-1 overflow-y-auto py-6 px-4 md:px-8 flex flex-col items-center print:p-0 print:m-0 print:bg-white bg-[#F9F9F9] md:bg-inherit transition-colors">
          
          {/* Mobile Title */}
          <div className="md:hidden py-4 text-center mb-4">
             <h1 className="text-[20px] sora-semibold text-[#161A21]">Your resume is ready!</h1>
          </div>

          <div
            ref={resumeRef}
            id="resume-to-print"
            className="w-full max-w-[360px] md:max-w-[860px] border border-[#E8E8E8] bg-white rounded-[16px] md:rounded-none overflow-hidden print:border-none print:shadow-none print:max-w-none print:rounded-none"
            style={{
              boxShadow: `
                0px 96px 96px -32px #3333330F,
                0px 48px 48px -24px #3333330A,
                0px 24px 24px -12px #3333330A,
                0px 12px 12px -6px #3333330A,
                0px 6px 6px -3px #3333330A,
                0px 3px 3px -1.5px #33333305,
                0px 1px 1px 0.5px #3333330A,
                0px 0px 0px 1px #3333330A
              `,
            }}
          >
            {/* Wrapper for responsive scaling on mobile */}
            <div className="w-full overflow-hidden origin-top scale-[0.95] xs:scale-100 transition-transform">
              <ResumePreviewDocument 
                 fullName={`${firstName} ${lastName}`}
                 jobTitle={targetRole}
                 location={location}
                 phoneNumber={phone}
                 email={email}
                 portfolio={portfolioUrl}
                 linkedinUrl={linkedinUrl}
                 professionalSummary={professionalSummary}
                 experiences={experiences}
                 educations={educations}
                 skills={skills}
                 themeColor={themeColor}
                 template={selectedTemplate}
                 highlightSection={openSection}
               />
            </div>
          </div>

          {/* Mobile Template Preview Thumbnail (as seen in the guide image) */}
          <div className="md:hidden mt-10 mb-20 w-full flex justify-center">
            <div className="bg-white p-3 rounded-[16px] border-[2px] border-[#322FEB] w-[280px] relative">
               <div className="absolute top-2 right-2 w-5 h-5 bg-[#322FEB] rounded-full flex items-center justify-center">
                  <span className="text-white text-[12px]">✓</span>
               </div>
               <div className="bg-[#F7F7F7] p-1 rounded-lg">
                  <Image 
                    src={resumeTemplates.find(t => t.value === selectedTemplate)?.image || "/resume1.svg"} 
                    width={200} 
                    height={200} 
                    className="w-full object-cover rounded-[10px]" 
                    alt="current template" 
                  />
               </div>
            </div>
          </div>
        </main>
        {/* ── Right Panel: Template Selector ── */}
        <aside className="hidden lg:flex flex-col w-[210px] shrink-0 border-l border-[#E8E8E8] bg-white overflow-y-auto py-4">
          <div className="flex flex-col gap-4 px-3">
            {resumeTemplates.map((template) => (
              <button
                key={template.value}
                type="button"
                onClick={() => handleTemplateSelect(template)}
                className="text-left focus:outline-none"
              >
                <div
                  className={`rounded-[10px] border overflow-hidden transition-all ${
                    selectedTemplate === template.value
                      ? "border-[2px] border-[#322FEB]"
                      : "border-[#E8E8E8]"
                  }`}
                >
                  <div className="relative">
                    <div className="absolute top-1.5 right-1.5 z-10">
                      <div
                        className={`w-[14px] h-[14px] rounded-full border-2 flex items-center justify-center bg-white ${
                          selectedTemplate === template.value
                            ? "border-[#322FEB]"
                            : "border-[#C8C8C8]"
                        }`}
                      >
                        {selectedTemplate === template.value && (
                          <div className="w-[6px] h-[6px] rounded-full bg-[#322FEB]" />
                        )}
                      </div>
                    </div>
                    <div className="bg-[#F7F7F7] p-1">
                      <Image
                        src={template.image}
                        width={120}
                        height={130}
                        alt={template.title}
                        className="w-full object-cover rounded-[4px]"
                      />
                    </div>
                  </div>
                  <div className="px-2 py-1.5">
                    <div className="text-[10px] mori-semibold text-[#161A21] leading-tight">
                      {template.title}
                    </div>
                    <div className="flex items-center gap-1 mt-[3px]">
                      <span className="text-[9px] text-[#6A6D71]">Simple</span>
                      <span className="text-[9px] text-[#C8C8C8]">•</span>
                      <span className="text-[9px] text-[#6A6D71]">Classic</span>
                    </div>
                    <div className="flex items-center gap-[3px] mt-1.5 flex-wrap">
                      {template.colors.map((color: string, ci: number) => (
                        <div
                          key={ci}
                          onClick={(e) => {
                             e.stopPropagation();
                             setThemeColor(color);
                          }}
                          className={`w-[13px] h-[13px] rounded-[3px] cursor-pointer hover:scale-110 transition-transform ${themeColor === color ? "border-[2px] border-[#322FEB]" : ci === 0 ? "border border-[#5335E9]" : ""}`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </aside>
      </div>

      {/* Mobile Sticky Footer (as seen in the guide image) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E8E8E8] p-4 flex flex-col gap-3 z-50">
         <Button onClick={handlePrint} className="w-full bg-[#322FEB] hover:bg-[#322FEB]/90 h-[56px] rounded-[16px] gap-2 text-[15px] mori-semibold uppercase tracking-wide">
            <Image src="/download-line.svg" width={20} height={20} alt="download" className="brightness-[10]" />
            Download PDF
         </Button>
         <Button variant="outline" className="w-full border-[#E8E8E8] h-[56px] rounded-[16px] text-[#161A21] gap-2 text-[15px] mori-semibold uppercase tracking-wide bg-white">
            <Image src="/reset-right-line.svg" width={20} height={20} alt="regenerate" />
            Regenerate resume
         </Button>
      </div>
    </div>
  );
};

/* ─── Styles for Printing ─── */
const printStyles = `
@media print {
  body * {
    visibility: hidden;
  }
  #resume-to-print, #resume-to-print * {
    visibility: visible;
  }
  #resume-to-print {
    position: fixed;
    left: 0;
    top: 0;
    width: 210mm;
    height: 297mm;
    margin: 0;
    padding: 0;
    border: none !important;
    box-shadow: none !important;
    background: white !important;
    z-index: 9999;
  }
  @page {
    size: A4;
    margin: 0;
  }
}
`;

export default function ResumeBuilderPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: printStyles }} />
      <Page />
    </>
  );
}
