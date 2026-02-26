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
  experiences = [
    {
      companyName: "Ajaeq",
      companyLocation: "Atlanta, GA, USA",
      jobTitle: "Principal Product Designer",
      startDate: "Mar '24",
      endDate: "Nov '25",
      currentlyWorking: false,
      achievements: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut et dolore",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut",
      ],
    },
    {
      companyName: "Platform Lead",
      companyLocation: "Remote",
      jobTitle: "Product Designer",
      startDate: "Jan '24",
      endDate: "Jun '25",
      currentlyWorking: false,
      achievements: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut et dolore",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut",
      ],
    },
    {
      companyName: "Emages Multimedia",
      companyLocation: "Remote",
      jobTitle: "User Experience  Designer",
      startDate: "Mar '24",
      endDate: "Nov '25",
      currentlyWorking: false,
      achievements: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut et dolore",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut",
      ],
    },
  ],
  educations = [
    {
      institutionName: "UNIVERSITY NAME",
      location: "",
      degree: "Bachelor's Degree",
      fieldOfStudy: "Microbiology",
      graduationYear: "Year of Graduation",
    },
  ],
  skills = ["Adobe", "Agile", "Design Thinking", "DevOps"],
}) => {
  return (
    <div
      className="bg-white rounded-[8px] p-8 min-h-[900px] font-serif"
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h1
          className="text-[22px] font-bold text-[#161A21]"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {fullName}
        </h1>
        <p className="text-[11px] text-[#444] mt-1">
          {jobTitle} | {location} | {phoneNumber} | {email} |
        </p>
        <p className="text-[11px] text-[#444]">
          {portfolio} | {linkedinUrl}
        </p>
      </div>

      {/* Divider */}
      <hr className="border-[#C8C8C8] mb-4" />

      {/* About Section */}
      {professionalSummary && (
        <div className="mb-5">
          <h2 className="text-[12px] font-bold text-[#161A21] mb-2 uppercase tracking-wide">
            About
          </h2>
          <p className="text-[11px] text-[#444] leading-[1.6]">
            {professionalSummary}
          </p>
        </div>
      )}

      {/* Experience Section */}
      {experiences && experiences.length > 0 && (
        <div className="mb-5">
          <h2 className="text-[12px] font-bold text-[#161A21] mb-3 uppercase tracking-wide border-b border-[#C8C8C8] pb-1">
            Experience
          </h2>
          <div className="space-y-5">
            {experiences.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-semibold text-[#161A21]">
                    {exp.companyName}
                  </span>
                  <span className="text-[10px] text-[#6A6D71]">
                    {exp.companyLocation}
                  </span>
                </div>
                <div className="flex justify-between items-start mt-[2px]">
                  <span className="text-[10px] text-[#444] italic">
                    {exp.jobTitle}
                  </span>
                  <span className="text-[10px] text-[#6A6D71]">
                    {exp.startDate} – {exp.currentlyWorking ? "Present" : exp.endDate}
                  </span>
                </div>
                <ul className="mt-2 space-y-[3px] pl-1">
                  {exp.achievements.map((ach, j) => (
                    <li
                      key={j}
                      className="text-[10px] text-[#444] leading-[1.55] flex items-start gap-1"
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
        <div className="mb-5">
          <h2 className="text-[12px] font-bold text-[#161A21] mb-3 uppercase tracking-wide border-b border-[#C8C8C8] pb-1">
            Education
          </h2>
          <div className="space-y-3">
            {educations.map((edu, i) => (
              <div key={i}>
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-semibold text-[#161A21] uppercase">
                    {edu.institutionName}
                  </span>
                  <span className="text-[10px] text-[#6A6D71]">
                    {edu.graduationYear}
                  </span>
                </div>
                <div className="flex justify-between items-start mt-[2px]">
                  <span className="text-[10px] text-[#444]">
                    {edu.degree} | {edu.fieldOfStudy}
                  </span>
                  <span className="text-[10px] text-[#6A6D71]">
                    Mar &apos;24 – Nov &apos;25
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills Section */}
      {skills && skills.length > 0 && (
        <div className="mb-5">
          <h2 className="text-[12px] font-bold text-[#161A21] mb-3 uppercase tracking-wide border-b border-[#C8C8C8] pb-1">
            Skills
          </h2>
          <ul className="space-y-[3px] pl-1">
            {skills.map((skill, i) => (
              <li
                key={i}
                className="text-[10px] text-[#444] flex items-start gap-1"
              >
                <span className="mt-[3px] shrink-0">•</span>
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResumePreviewDocument;
