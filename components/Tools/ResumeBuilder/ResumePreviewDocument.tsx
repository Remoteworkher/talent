"use client";
import React from "react";

interface Experience {
  companyName: string;
  companyLocation: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  achievements: string[];
}

interface Education {
  institutionName: string;
  location: string;
  degree: string;
  fieldOfStudy: string;
  graduationYear: string;
}

interface ResumePreviewDocumentProps {
  fullName?: string;
  jobTitle?: string;
  location?: string;
  phoneNumber?: string;
  email?: string;
  portfolio?: string;
  linkedinUrl?: string;
  professionalSummary?: string;
  experiences?: Experience[];
  educations?: Education[];
  skills?: string[];
  themeColor?: string;
  template?: string;
  highlightSection?: string | null;
}

const ResumePreviewDocument: React.FC<ResumePreviewDocumentProps> = ({
  fullName = "Emmanuel ThankGod",
  jobTitle = "Product Designer",
  location = "Delaware, USA",
  phoneNumber = "+234-818-9794-381",
  email = "thankgodemmanuel77@gmail.com",
  portfolio = "http://thankgodemmanuel.framer.website/",
  linkedinUrl = "linkedin.com/in/emmanuel-thankgod-878a7821b",
  professionalSummary = "Led design initiatives that increased user engagement by up to 40% through modular UX frameworks and standardized design systems, reducing iteration time by 40% and developer handoff questions by 60%. Experienced in guiding cross-platform applications with a focus on user-centered design, I have channeled up to 30% improvements in usability test completion and accelerated feature launches by 20%. Skilled in mentoring teams and collaborating across disciplines to deliver cohesive, intuitive experiences aligned with strategic goals.",
  experiences = [],
  educations = [],
  skills = [],
  themeColor = "#322FEB",
  template = "classic",
  highlightSection = null,
}) => {
  const getHighlightStyle = (section: string) => {
    if (highlightSection?.toLowerCase() === section.toLowerCase()) {
      return {
        backgroundColor: `${themeColor}0D`,
        outline: `2px dashed ${themeColor}`,
        outlineOffset: "4px",
        transition: "all 0.3s ease",
        borderRadius: "4px",
      };
    }
    return {};
  };

  const renderClassic = () => (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="text-center mb-4 md:mb-6" style={getHighlightStyle("Contact")}>
        <h1
          className="text-[18px] md:text-[22px] font-bold text-[#161A21]"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {fullName}
        </h1>
        <p className="text-[10px] md:text-[11px] text-[#444] mt-1 leading-relaxed">
          {jobTitle} | {location} | {phoneNumber} | {email}
        </p>
        <p className="text-[10px] md:text-[11px] text-[#444] mt-1" style={getHighlightStyle("Portfolio")}>
          {portfolio} | {linkedinUrl}
        </p>
      </div>

      <hr className="border-[#C8C8C8] mb-4" />

      {/* About Section */}
      {professionalSummary && (
        <div className="mb-4 md:mb-5" style={getHighlightStyle("About")}>
          <h2 className="text-[10px] md:text-[12px] font-bold text-[#161A21] mb-2 uppercase tracking-wide">
            About
          </h2>
          <p className="text-[10px] md:text-[11px] text-[#444] leading-[1.6]">
            {professionalSummary}
          </p>
        </div>
      )}

      {/* Experience Section */}
      {experiences && experiences.length > 0 && (
        <div className="mb-4 md:mb-5" style={getHighlightStyle("Experience")}>
          <h2
            className="text-[10px] md:text-[12px] font-bold mb-3 uppercase tracking-wide border-b pb-1"
            style={{ color: themeColor, borderColor: themeColor }}
          >
            Experience
          </h2>
          <div className="space-y-4 md:space-y-5">
            {experiences.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-start gap-2">
                  <span className="text-[10px] md:text-[11px] font-semibold text-[#161A21]">
                    {exp.companyName}
                  </span>
                  <span className="text-[9px] md:text-[10px] text-[#6A6D71] text-right shrink-0">
                    {exp.companyLocation}
                  </span>
                </div>
                <div className="flex justify-between items-start mt-[2px] gap-2">
                  <span className="text-[9px] md:text-[10px] text-[#444] italic">
                    {exp.jobTitle}
                  </span>
                  <span className="text-[9px] md:text-[10px] text-[#6A6D71] text-right shrink-0">
                    {exp.startDate} – {exp.currentlyWorking ? "Present" : exp.endDate}
                  </span>
                </div>
                <ul className="mt-2 space-y-[3px] pl-1">
                  {exp.achievements.map((ach, j) => (
                    <li
                      key={j}
                      className="text-[9px] md:text-[10px] text-[#444] leading-[1.55] flex items-start gap-1"
                    >
                      <span className="mt-[3px] shrink-0">•</span>
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Section */}
      {educations && educations.length > 0 && (
        <div className="mb-4 md:mb-5" style={getHighlightStyle("Education")}>
          <h2
            className="text-[10px] md:text-[12px] font-bold mb-3 uppercase tracking-wide border-b pb-1"
            style={{ color: themeColor, borderColor: themeColor }}
          >
            Education
          </h2>
          <div className="space-y-3">
            {educations.map((edu, i) => (
              <div key={i}>
                <div className="flex justify-between items-start gap-2">
                  <span className="text-[10px] md:text-[11px] font-semibold text-[#161A21] uppercase">
                    {edu.institutionName}
                  </span>
                  <span className="text-[9px] md:text-[10px] text-[#6A6D71] text-right shrink-0">
                    {edu.graduationYear}
                  </span>
                </div>
                <div className="flex justify-between items-start mt-[2px] gap-2">
                  <span className="text-[9px] md:text-[10px] text-[#444]">
                    {edu.degree} | {edu.fieldOfStudy}
                  </span>
                  <span className="text-[9px] md:text-[10px] text-[#6A6D71] text-right shrink-0">
                     {edu.location }
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills Section */}
      {skills && skills.length > 0 && (
        <div className="mb-4 md:mb-5" style={getHighlightStyle("Skills")}>
          <h2
            className="text-[10px] md:text-[12px] font-bold mb-2 md:mb-3 uppercase tracking-wide border-b pb-1"
            style={{ color: themeColor, borderColor: themeColor }}
          >
            Skills
          </h2>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {skills.map((skill, i) => (
              <span key={i} className="text-[9px] md:text-[10px] text-[#444] px-2 py-0.5 border border-[#E8E8E8] rounded-full bg-white">{skill}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderModern = () => (
    <div className="flex flex-col md:flex-row min-h-[900px]">
      {/* Sidebar */}
      <div className="w-full md:w-[200px] lg:w-[240px] border-b md:border-b-0 md:border-r border-[#E8E8E8] p-4 md:p-6 shrink-0" style={{ backgroundColor: `${themeColor}05` }}>
        <div className="mb-6 md:mb-8" style={getHighlightStyle("Contact")}>
           <h1 className="text-[18px] md:text-[20px] font-bold text-[#161A21] leading-tight mb-2">{fullName}</h1>
           <p className="text-[10px] md:text-[11px] text-[#6A6D71] mb-4 md:mb-6">{jobTitle}</p>
           
           <div className="space-y-3 md:space-y-4 mt-2 md:mt-4">
              <div className="text-[9px] md:text-[10px]">
                 <p className="text-[#6A6D71] uppercase mori-semibold mb-0.5 md:mb-1">Contact</p>
                 <p className="text-[#161A21] break-all">{email}</p>
                 <p className="text-[#161A21]">{phoneNumber}</p>
              </div>
              <div className="text-[9px] md:text-[10px]">
                 <p className="text-[#6A6D71] uppercase mori-semibold mb-0.5 md:mb-1">Location</p>
                 <p className="text-[#161A21]">{location}</p>
              </div>
              <div className="text-[9px] md:text-[10px]" style={getHighlightStyle("Portfolio")}>
                 <p className="text-[#6A6D71] uppercase mori-semibold mb-0.5 md:mb-1">Online</p>
                 <p className="text-[#161A21] break-all">{portfolio}</p>
                 <p className="text-[#161A21] break-all">{linkedinUrl}</p>
              </div>
           </div>
        </div>

        <div className="pt-2 md:pt-4" style={getHighlightStyle("Skills")}>
           <p className="text-[11px] md:text-[12px] font-bold text-[#161A21] uppercase mb-3 md:mb-4" style={{ borderLeft: `3px solid ${themeColor}`, paddingLeft: "8px" }}>Expertise</p>
           <ul className="flex flex-wrap md:flex-col gap-2 md:gap-2 pl-1 md:pl-2">
              {skills.map((skill, i) => (
                 <li key={i} className="text-[10px] md:text-[11px] text-[#444] md:border-b border-[#E8E8E8] pb-1 flex justify-between items-center group bg-white md:bg-transparent px-2 py-0.5 md:px-0 md:py-0 rounded-full md:rounded-none border md:border-none">
                    <span>{skill}</span>
                    <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-[#E8E8E8] group-hover:bg-themeColor opacity-30" style={{ backgroundColor: themeColor }}></div>
                 </li>
              ))}
           </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
         <div className="mb-6 md:mb-8" style={getHighlightStyle("About")}>
            <div className="w-10 md:w-12 h-1 mb-3 md:mb-4" style={{ backgroundColor: themeColor }}></div>
            <p className="text-[11px] md:text-[13px] text-[#161A21] leading-[1.7] md:leading-[1.8] italic">
               {professionalSummary}
            </p>
         </div>

         <div className="mb-8 md:mb-10" style={getHighlightStyle("Experience")}>
            <h2 className="text-[12px] md:text-[14px] font-bold text-[#161A21] uppercase mb-4 md:mb-6 tracking-widest flex items-center gap-2 md:gap-3">
               <span style={{ color: themeColor }}>01.</span> Professional Record
            </h2>
            <div className="space-y-6 md:space-y-8">
               {experiences.map((exp, i) => (
                  <div key={i} className="relative pl-5 md:pl-6 border-l border-[#E8E8E8]">
                     <div className="absolute left-[-4px] top-0 w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }} />
                     <div className="flex justify-between items-baseline mb-1 gap-2">
                        <span className="text-[11px] md:text-[13px] font-bold text-[#161A21]">{exp.jobTitle}</span>
                        <span className="text-[9px] md:text-[10px] text-[#6A6D71] uppercase mori-semibold tracking-tighter shrink-0">{exp.startDate} &mdash; {exp.currentlyWorking ? "Present" : exp.endDate}</span>
                     </div>
                     <p className="text-[10px] md:text-[11px] text-[#322FEB] mori-semibold mb-2 md:mb-3" style={{ color: themeColor }}>{exp.companyName}</p>
                     <ul className="mt-2 space-y-1.5 md:space-y-2">
                        {exp.achievements.map((ach, j) => (
                           <li key={j} className="text-[9px] md:text-[10px] text-[#444] leading-[1.6] flex gap-2">
                              <span className="opacity-40" style={{ color: themeColor }}>•</span>
                              <span>{ach}</span>
                           </li>
                        ))}
                     </ul>
                  </div>
               ))}
            </div>
         </div>

         <div style={getHighlightStyle("Education")}>
            <h2 className="text-[12px] md:text-[14px] font-bold text-[#161A21] uppercase mb-4 md:mb-6 tracking-widest flex items-center gap-2 md:gap-3">
               <span style={{ color: themeColor }}>02.</span> Educational Background
            </h2>
            <div className="space-y-5 md:space-y-6">
               {educations.map((edu, i) => (
                  <div key={i} className="flex gap-2 md:gap-4">
                     <div className="text-[9px] md:text-[10px] text-[#6A6D71] w-16 md:w-20 shrink-0 mt-1">{edu.graduationYear}</div>
                     <div>
                        <p className="text-[11px] md:text-[12px] font-bold text-[#161A21]">{edu.degree}</p>
                        <p className="text-[10px] md:text-[11px] text-[#444]">{edu.fieldOfStudy}</p>
                        <p className="text-[9px] md:text-[10px] text-[#6A6D71] mt-0.5 md:mt-1">{edu.institutionName}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );

  const renderExecutive = () => (
    <div className="p-4 md:p-12">
       <div className="flex flex-col md:flex-row border-b-4 md:border-b-8 pb-6 md:pb-8 mb-6 md:mb-10 items-center md:items-start" style={{ borderBottomColor: themeColor, ...getHighlightStyle("Contact") }}>
          <div className="flex-1 md:pr-12 text-center md:text-left mb-6 md:mb-0">
             <h1 className="text-[24px] md:text-[36px] font-serif font-black text-[#161A21] uppercase tracking-[-1px] md:tracking-[-1.5px] leading-tight md:leading-none mb-3">{fullName}</h1>
             <p className="text-[12px] md:text-[15px] text-[#6A6D71] mori-semibold uppercase tracking-[2px] md:tracking-[5px] opacity-80">{jobTitle}</p>
          </div>
          <div className="w-full md:w-[280px] lg:w-[300px] border-t md:border-t-0 md:border-l border-[#E8E8E8] pt-4 md:pt-0 md:pl-8 text-[10px] md:text-[11px] text-[#161A21] space-y-2">
             <div className="flex justify-between border-b border-[#F0F0F0] pb-1.5 gap-4">
                <span className="text-[#95969A] uppercase mori-semibold text-[8px] md:text-[9px] shrink-0">Location</span>
                <span className="text-right truncate">{location}</span>
             </div>
             <div className="flex justify-between border-b border-[#F0F0F0] pb-1.5 gap-4">
                <span className="text-[#95969A] uppercase mori-semibold text-[8px] md:text-[9px] shrink-0">Direct</span>
                <span className="text-right">{phoneNumber}</span>
             </div>
             <div className="flex justify-between border-b border-[#F0F0F0] pb-1.5 gap-4">
                <span className="text-[#95969A] uppercase mori-semibold text-[8px] md:text-[9px] shrink-0">Email</span>
                <span className="mori-semibold text-right truncate">{email}</span>
             </div>
             <div className="flex justify-between pt-1 gap-4" style={getHighlightStyle("Portfolio")}>
                <span className="text-[#95969A] uppercase mori-semibold text-[8px] md:text-[9px] shrink-0">Profile</span>
                <span className="text-right truncate">{linkedinUrl}</span>
             </div>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="col-span-1 md:col-span-12 mb-2 md:mb-4" style={getHighlightStyle("About")}>
             <p className="text-[11px] md:text-[13px] text-[#161A21] leading-[1.8] md:leading-[1.9] text-justify font-serif border-l-4 pl-4 md:pl-6" style={{ borderLeftColor: themeColor }}>
                {professionalSummary}
             </p>
          </div>

          <div className="col-span-1 md:col-span-8 flex flex-col gap-8 md:gap-10 mt-4 md:mt-6" style={getHighlightStyle("Experience")}>
             <div className="flex items-center gap-3 md:gap-4">
                <h2 className="text-[13px] md:text-[15px] font-black uppercase tracking-[2px] md:tracking-[4px] text-[#161A21] whitespace-nowrap">Career Summary</h2>
                <div className="flex-1 h-[1px] bg-[#E8E8E8]"></div>
             </div>
             {experiences.map((exp, i) => (
                <div key={i} className="group">
                   <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline mb-2 gap-1">
                      <span className="text-[12px] md:text-[14px] font-bold text-[#161A21] uppercase group-hover:text-themeColor transition-colors" style={{ color: themeColor }}>{exp.companyName}</span>
                      <span className="text-[9px] md:text-[11px] text-[#161A21] font-black tracking-widest uppercase">{exp.startDate} / {exp.currentlyWorking ? "PRESENT" : exp.endDate}</span>
                   </div>
                   <p className="text-[11px] md:text-[12px] font-serif mori-semibold text-[#161A21] mb-3 md:mb-4">{exp.jobTitle}</p>
                   <div className="space-y-3 pl-1 md:pl-2">
                      {exp.achievements.map((ach, j) => (
                         <div key={j} className="text-[10px] md:text-[11px] text-[#444] leading-[1.6] md:leading-[1.7] flex gap-3 md:gap-4">
                           <span className="mt-[2px] leading-none text-[12px] md:text-[14px]" style={{ color: themeColor }}>›</span> 
                           <span className="flex-1">{ach}</span>
                         </div>
                      ))}
                   </div>
                </div>
             ))}
          </div>

          <div className="col-span-1 md:col-span-4 flex flex-col gap-10 md:gap-12 mt-4 md:mt-6">
             <div style={getHighlightStyle("Education")}>
                <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                   <h2 className="text-[13px] md:text-[15px] font-black uppercase tracking-[2px] md:tracking-[4px] text-[#161A21]">Academic</h2>
                </div>
                <div className="space-y-4 md:space-y-6">
                   {educations.map((edu, i) => (
                      <div key={i} className="relative">
                         <div className="text-[10px] md:text-[11px] font-black text-[#161A21] mb-1">{edu.degree}</div>
                         <p className="text-[9px] md:text-[10px] text-[#6A6D71] mori-semibold uppercase tracking-[1px] mb-1">{edu.fieldOfStudy}</p>
                         <p className="text-[9px] md:text-[10px] text-[#95969A]">{edu.institutionName}, {edu.graduationYear}</p>
                      </div>
                   ))}
                </div>
             </div>

             <div style={getHighlightStyle("Skills")}>
                <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                   <h2 className="text-[13px] md:text-[15px] font-black uppercase tracking-[2px] md:tracking-[4px] text-[#161A21]">Competencies</h2>
                </div>
                <div className="flex flex-col gap-1.5 md:gap-1">
                   {skills.map((skill, i) => (
                      <div key={i} className="flex justify-between items-center bg-[#161A21] px-3 md:px-4 py-2 md:py-2.5 rounded-[0px]">
                         <span className="text-[9px] md:text-[10px] text-white mori-semibold uppercase tracking-wider md:tracking-widest">{skill}</span>
                         <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full" style={{ backgroundColor: themeColor }}></div>
                      </div>
                   ))}
                </div>
             </div>
          </div>
       </div>
    </div>
  );

  return (
    <div
      className="bg-white min-h-[700px] md:min-h-[1100px] transition-all duration-500 shadow-sm overflow-hidden"
      style={{ fontFamily: template === 'classic' || template === 'executive' ? "Georgia, serif" : "Inter, sans-serif" }}
    >
      {template === 'modern' && renderModern()}
      {template === 'executive' && renderExecutive()}
      {(template === 'classic' || !['modern', 'executive'].includes(template)) && renderClassic()}
    </div>
  );
};

export default ResumePreviewDocument;
