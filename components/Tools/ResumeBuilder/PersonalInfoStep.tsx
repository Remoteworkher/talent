import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface PersonalInformationProps {
  fullName: string;
  setFullName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  countryCode: string;
  setCountryCode: (value: string) => void;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  linkedinUrl: string;
  setLinkedinUrl: (value: string) => void;
  portfolio: string;
  setPortfolio: (value: string) => void;
  professionalSummary: string;
  setProfessionalSummary: (value: string) => void;
}

export const PersonalInformation: React.FC<PersonalInformationProps> = ({
  fullName,
  setFullName,
  email,
  setEmail,
  countryCode,
  setCountryCode,
  phoneNumber,
  setPhoneNumber,
  location,
  setLocation,
  linkedinUrl,
  setLinkedinUrl,
  portfolio,
  setPortfolio,
  professionalSummary,
  setProfessionalSummary,
}) => {
  return (
    <section>
      <div>
        <div className="text-center text-[#161A21] sora-semibold text-[18px] md:text-[24px]">
          Personal Information
        </div>
        <div className="text-[#6A6D71] text-[14px] md:text-[16px] text-center">
          Tell us about yourself
        </div>
      </div>

      <div className="space-y-4 mt-6">
          <Label htmlFor="fullName" className="text-[#161A21] font-semibold text-[14px]">
            Full Name
          </Label>
          <Input
            id="fullName"
            placeholder="Enter your full name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="h-14 rounded-xl"
            required
          />

          <Label htmlFor="email" className="text-[#161A21] font-semibold text-[14px]">
            Email Address
          </Label>
          <Input
            id="email"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-14 rounded-xl"
            required
          />

          <Label htmlFor="phoneNumber" className="text-[#161A21] font-semibold text-[14px]">
            Phone Number
          </Label>
          <div className="flex gap-2">
            <Input
              id="countryCode"
              placeholder="+234"
              type="text"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="w-24 h-14 rounded-xl"
              required
            />
            <Input
              id="phoneNumber"
              placeholder="Enter your phone number"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="h-14 rounded-xl"
              required
            />
          </div>

          <Label htmlFor="location" className="text-[#161A21] font-semibold text-[14px]">
            Location
          </Label>
          <Input
            id="location"
            placeholder="City, Country"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="h-14 rounded-xl"
            required
          />

          <Label htmlFor="linkedinUrl" className="text-[#161A21] font-semibold text-[14px]">
            LinkedIn URL (Optional)
          </Label>
          <Input
            id="linkedinUrl"
            placeholder="https://linkedin.com/in/yourprofile"
            type="url"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            className="h-14 rounded-xl"
          />

          <Label htmlFor="portfolio" className="text-[#161A21] font-semibold text-[14px]">
            Portfolio/Website (Optional)
          </Label>
          <Input
            id="portfolio"
            placeholder="https://yourportfolio.com"
            type="url"
            value={portfolio}
            onChange={(e) => setPortfolio(e.target.value)}
            className="h-14 rounded-xl"
          />

          <Label
            htmlFor="professionalSummary"
            className="text-[#161A21] font-semibold text-[14px]"
          >
            Professional Summary
          </Label>
          <Textarea
            id="professionalSummary"
            placeholder="Write a brief summary about your professional background..."
            value={professionalSummary}
            onChange={(e) => setProfessionalSummary(e.target.value)}
            rows={6}
            className="min-h-[132px] rounded-xl"
            required
          />
      </div>
    </section>
  );
};
