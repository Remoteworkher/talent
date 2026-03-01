"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import Image from "next/image";
import { PersonalInformation } from "@/components/Tools/ResumeBuilder/PersonalInfoStep";
import { WorkExperience } from "@/components/Tools/ResumeBuilder/ExperienceStep";
import { EducationSection } from "@/components/Tools/ResumeBuilder/EducationStep";
import { SkillsStep } from "@/components/Tools/ResumeBuilder/SkillsStep";
import ProcessModal from "@/components/reusables/ProcessModal";
import { useResumeBuilderStore, ExperienceEntry, EducationEntry } from "@/lib/store/useResumeBuilderStore";

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

const Page = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    firstName, lastName, email, phone, location, linkedinUrl, portfolioUrl, professionalSummary,
    experiences, educations, targetRole, skills,
    setPersonalInfo, setExperiences, setEducations, setSkills
  } = useResumeBuilderStore();

  const handleAddExperience = () => {
    setExperiences([
      ...experiences,
      {
        companyName: "",
        companyLocation: "",
        jobTitle: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        achievements: [""],
      },
    ]);
  };

  const handleDeleteExperience = (expIndex: number) => {
    setExperiences(experiences.filter((_, i) => i !== expIndex));
  };

  const handleExperienceChange = (
    expIndex: number,
    field: keyof ExperienceEntry,
    value: string | boolean | string[],
  ) => {
    const newExperiences = [...experiences];
    newExperiences[expIndex] = {
      ...newExperiences[expIndex],
      [field]: value,
    } as ExperienceEntry;
    setExperiences(newExperiences);
  };

  const handleAddAchievement = (expIndex: number) => {
    const newExperiences = [...experiences];
    newExperiences[expIndex].achievements.push("");
    setExperiences(newExperiences);
  };

  const handleAchievementChange = (
    expIndex: number,
    achIndex: number,
    value: string,
  ) => {
    const newExperiences = [...experiences];
    newExperiences[expIndex].achievements[achIndex] = value;
    setExperiences(newExperiences);
  };

  const handleDeleteAchievement = (expIndex: number, achIndex: number) => {
    const newExperiences = [...experiences];
    newExperiences[expIndex].achievements = newExperiences[
      expIndex
    ].achievements.filter((_, i) => i !== achIndex);
    setExperiences(newExperiences);
  };

  const handleAddEducation = () => {
    setEducations([
      ...educations,
      {
        institutionName: "",
        location: "",
        degree: "",
        fieldOfStudy: "",
        graduationYear: "",
      },
    ]);
  };

  const handleDeleteEducation = (eduIndex: number) => {
    setEducations(educations.filter((_, i) => i !== eduIndex));
  };

  const handleEducationChange = (
    eduIndex: number,
    field: keyof EducationEntry,
    value: string,
  ) => {
    const newEducations = [...educations];
    newEducations[eduIndex] = {
      ...newEducations[eduIndex],
      [field]: value,
    } as EducationEntry;
    setEducations(newEducations);
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 4) {
      // Open dialog when on last step
      setIsDialogOpen(true);
      // Simulate resume generation and redirect
      setTimeout(() => {
        router.push("/career-tools/resume/resume-builder/resume");
      }, 3000);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="bg-[#FFFCFD] px-2 md:px-4 py-14">
      <div
        className="w-full md:w-[600px] mx-auto bg-white p-3 md:p-8 border border-[#E8E8E8] rounded-[24px]"
        style={{
          boxShadow: `
            0px 96px 96px -32px #3333330F,
            0px 48px 48px -24px #3333330A,
            0px 24px 24px -12px #3333330A,
            0px 12px 12px -6px #3333330A,
            0px 6px 6px -3px #3333330A,
            0px 3px 3px -1.5px #33333305,
            0px 1px 1px 0.5px #3333330A,
            0px 0px 0px 1px #3333330A,
            0px -1px 1px -0.5px #3333330F inset
          `,
        }}
      >
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <PersonalInformation
            fullName={`${firstName} ${lastName}`.trim()}
            setFullName={(val) => {
              const [first, ...rest] = val.split(" ");
              setPersonalInfo({ firstName: first || "", lastName: rest.join(" ") || "" });
            }}
            email={email}
            setEmail={(email) => setPersonalInfo({ email })}
            countryCode={"+234"} // Hardcoded for now as store doesn't have it
            setCountryCode={() => {}}
            phoneNumber={phone}
            setPhoneNumber={(phone) => setPersonalInfo({ phone })}
            location={location}
            setLocation={(location) => setPersonalInfo({ location })}
            linkedinUrl={linkedinUrl}
            setLinkedinUrl={(linkedinUrl) => setPersonalInfo({ linkedinUrl })}
            portfolio={portfolioUrl}
            setPortfolio={(portfolioUrl) => setPersonalInfo({ portfolioUrl })}
            professionalSummary={professionalSummary}
            setProfessionalSummary={(professionalSummary) => setPersonalInfo({ professionalSummary })}
          />
        )}

        {/* Step 2: Work Experience */}
        {currentStep === 2 && (
          <WorkExperience
            experiences={experiences}
            handleExperienceChange={handleExperienceChange}
            handleAddExperience={handleAddExperience}
            handleDeleteExperience={handleDeleteExperience}
            handleAddAchievement={handleAddAchievement}
            handleAchievementChange={handleAchievementChange}
            handleDeleteAchievement={handleDeleteAchievement}
          />
        )}

        {/* Step 3: Education */}
        {currentStep === 3 && (
          <EducationSection
            educations={educations}
            handleEducationChange={handleEducationChange}
            handleAddEducation={handleAddEducation}
            handleDeleteEducation={handleDeleteEducation}
          />
        )}

        {/* Step 4: Skills */}
        {currentStep === 4 && (
          <SkillsStep
            targetRole={targetRole}
            setTargetRole={(role) => useResumeBuilderStore.setState({ targetRole: role })}
            skills={skills.join(", ")}
            setSkills={(s) => setSkills(s.split(",").map(i => i.trim()))}
          />
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-10">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            type="button"
          >
            <Image
              src={`/arrow-left-line.svg`}
              width={20}
              height={20}
              alt="arrow-left-line"
            />
            Previous
          </Button>
          <Button onClick={handleNext} type="button">
            {currentStep === 1 && "Next: Experience"}
            {currentStep === 2 && "Next: Education"}
            {currentStep === 3 && "Next: Skills"}
            {currentStep === 4 && (
              <>
                <Image
                  src={`/sparkling-line.svg`}
                  width={20}
                  height={20}
                  alt="sparkling"
                />
                Generate Resume (20 tokens)
              </>
            )}
            {currentStep !== 4 && (
              <Image
                src={`/arrow-right-line.svg`}
                width={20}
                height={20}
                alt="arrow-right-line"
              />
            )}
          </Button>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-[95vw] sm:w-[440px] p-0 border-none">
          <ProcessModal onClose={() => setIsDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;
