import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ExperienceEntry {
  companyName: string;
  companyLocation: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  achievements: string[];
}

export interface EducationEntry {
  institutionName: string;
  location: string;
  degree: string;
  fieldOfStudy: string;
  graduationYear: string;
}

interface ResumeState {
  template: string;
  themeColor: string;
  
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  
  // Social/Portfolio
  linkedinUrl: string;
  portfolioUrl: string;
  githubUrl: string;
  twitterUrl: string;
  dribbbleUrl: string;
  
  // Summary & Role
  professionalSummary: string;
  targetRole: string;
  
  // Sections
  experiences: ExperienceEntry[];
  educations: EducationEntry[];
  skills: string[];
  
  // Actions
  setTemplate: (template: string) => void;
  setThemeColor: (color: string) => void;
  setPersonalInfo: (info: Partial<ResumeState>) => void;
  setExperiences: (experiences: ExperienceEntry[]) => void;
  setEducations: (educations: EducationEntry[]) => void;
  setSkills: (skills: string[]) => void;
  resetResume: () => void;
}

const initialState = {
  template: "classic",
  themeColor: "#322FEB",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  location: "",
  linkedinUrl: "",
  portfolioUrl: "",
  githubUrl: "",
  twitterUrl: "",
  dribbbleUrl: "",
  professionalSummary: "",
  targetRole: "",
  experiences: [
    {
      companyName: "",
      companyLocation: "",
      jobTitle: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      achievements: [""],
    },
  ],
  educations: [
    {
      institutionName: "",
      location: "",
      degree: "",
      fieldOfStudy: "",
      graduationYear: "",
    },
  ],
  skills: [],
};

export const useResumeBuilderStore = create<ResumeState>()(
  persist(
    (set) => ({
      ...initialState,
      setTemplate: (template) => set({ template }),
      setThemeColor: (themeColor) => set({ themeColor }),
      setPersonalInfo: (info) => set((state) => ({ ...state, ...info })),
      setExperiences: (experiences) => set({ experiences }),
      setEducations: (educations) => set({ educations }),
      setSkills: (skills) => set({ skills }),
      resetResume: () => set(initialState),
    }),
    {
      name: "resume-builder-storage",
    }
  )
);
