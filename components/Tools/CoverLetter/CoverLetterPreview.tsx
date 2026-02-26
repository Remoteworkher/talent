"use client";
import React from "react";

interface CoverLetterPreviewProps {
  recipientName?: string;
  companyName?: string;
  senderName?: string;
  senderTitle?: string;
  senderEmail?: string;
  senderPhone?: string;
  senderLocation?: string;
  date?: string;
  body?: string[];
}

const CoverLetterPreview: React.FC<CoverLetterPreviewProps> = ({
  recipientName = "Hiring Manager",
  companyName = "Ajaeq Inc.",
  senderName = "Emmanuel ThankGod",
  senderTitle = "Product Designer",
  senderEmail = "thankgodemmanuel77@gmail.com",
  senderPhone = "+234-818-9794-381",
  senderLocation = "Delaware, USA",
  date = "November 25, 2025",
  body = [
    "Dear Hiring Manager,",
    "I am writing to express my strong interest in the Product Designer position at Ajaeq Inc. With over five years of experience designing intuitive, user-centered digital products, I am confident that my skills and passion for design will make a meaningful contribution to your team.",
    "Throughout my career, I have led design initiatives that increased user engagement by up to 40% through modular UX frameworks and standardized design systems, reducing iteration time by 40% and developer handoff questions by 60%. My work has consistently bridged the gap between user needs and business objectives, delivering cohesive experiences that align with strategic goals.",
    "At Platform Lead, I served as the primary Product Designer, driving end-to-end UI/UX for web and mobile applications. I collaborated closely with cross-functional teams to translate complex requirements into elegant, scalable designs. My ability to advocate for the user while balancing technical constraints has been a cornerstone of my professional approach.",
    "I am particularly drawn to Ajaeq's mission of building impactful technology solutions and the innovative culture you've cultivated. I believe my background in user research, interaction design, and design systems positions me uniquely to contribute to your product vision from day one.",
    "I would welcome the opportunity to discuss how my experience and enthusiasm can serve Ajaeq's goals. Thank you for considering my application — I look forward to the possibility of contributing to your exceptional team.",
    "Warm regards,",
  ],
}) => {
  return (
    <div
      className="bg-white p-10 min-h-[900px]"
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      {/* Sender info header */}
      <div className="mb-8">
        <h1 className="text-[18px] font-bold text-[#161A21]">{senderName}</h1>
        <p className="text-[12px] text-[#6A6D71] mt-1">
          {senderTitle} &nbsp;|&nbsp; {senderLocation} &nbsp;|&nbsp;{" "}
          {senderPhone} &nbsp;|&nbsp; {senderEmail}
        </p>
      </div>

      <hr className="border-[#E8E8E8] mb-6" />

      {/* Date */}
      <p className="text-[12px] text-[#444] mb-5">{date}</p>

      {/* Recipient */}
      <div className="mb-6">
        <p className="text-[12px] font-semibold text-[#161A21]">
          {recipientName}
        </p>
        <p className="text-[12px] text-[#444]">{companyName}</p>
      </div>

      {/* Body paragraphs */}
      <div className="space-y-4">
        {body.map((paragraph, i) => (
          <p
            key={i}
            className="text-[12px] text-[#333] leading-[1.8]"
          >
            {paragraph}
          </p>
        ))}
      </div>

      {/* Signature */}
      <div className="mt-8">
        <p className="text-[12px] text-[#333]">{senderName}</p>
        <p className="text-[12px] text-[#6A6D71]">{senderTitle}</p>
      </div>
    </div>
  );
};

export default CoverLetterPreview;
