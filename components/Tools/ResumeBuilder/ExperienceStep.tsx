import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

interface Experience {
  companyName: string;
  companyLocation: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  achievements: string[];
}

interface WorkExperienceProps {
  experiences: Experience[];
  handleExperienceChange: (
    expIndex: number,
    field: keyof Experience,
    value: string | boolean | string[],
  ) => void;
  handleAddExperience: () => void;
  handleDeleteExperience: (expIndex: number) => void;
  handleAddAchievement: (expIndex: number) => void;
  handleAchievementChange: (
    expIndex: number,
    achIndex: number,
    value: string,
  ) => void;
  handleDeleteAchievement: (expIndex: number, achIndex: number) => void;
}

export const WorkExperience: React.FC<WorkExperienceProps> = ({
  experiences,
  handleExperienceChange,
  handleAddExperience,
  handleDeleteExperience,
  handleAddAchievement,
  handleAchievementChange,
  handleDeleteAchievement,
}) => {
  return (
    <section>
      <div>
        <div className="text-center text-[#161A21] sora-semibold text-[18px] md:text-[24px]">
          Work Experience
        </div>
        <div className="text-[#6A6D71] text-[14px] md:text-[16px] text-center">
          Tell us about your work experience
        </div>
      </div>

      <div className="space-y-4 mt-6">
        {experiences.map((experience, expIndex) => (
          <div
            key={expIndex}
            className="p-3 border border-[#E8E8E8] rounded-[16px]"
          >
            <div className="flex justify-between items-center pb-4 border-b border-[#E8E8E8]">
              <div className="mori-semibold text-[16px] text-[#161A21]">
                Experience {expIndex + 1}
              </div>
              {experiences.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteExperience(expIndex)}
                  type="button"
                >
                  <Image
                    src={`/delete-bin-line.svg`}
                    width={20}
                    height={20}
                    alt="delete experience"
                  />
                </Button>
              )}
            </div>
            <div className="space-y-4 mt-6">
              <div className="space-y-1.5 flex flex-col gap-1.5 pt-4">
                <Label
                  htmlFor={`companyName-${expIndex}`}
                  className="text-[#161A21] font-semibold text-[14px]"
                >
                  Company Name
                </Label>
                <Input
                  id={`companyName-${expIndex}`}
                  placeholder="Enter company name"
                  type="text"
                  value={experience.companyName}
                  onChange={(e) =>
                    handleExperienceChange(
                      expIndex,
                      "companyName",
                      e.target.value,
                    )
                  }
                  className="h-14 rounded-xl"
                  required
                />
              </div>

              <div className="space-y-1.5 flex flex-col gap-1.5 pt-4">
                <Label
                  htmlFor={`companyLocation-${expIndex}`}
                  className="text-[#161A21] font-semibold text-[14px]"
                >
                  Location
                </Label>
                <Input
                  id={`companyLocation-${expIndex}`}
                  placeholder="City, Country e.g Lagos, Nigeria"
                  type="text"
                  value={experience.companyLocation}
                  onChange={(e) =>
                    handleExperienceChange(
                      expIndex,
                      "companyLocation",
                      e.target.value,
                    )
                  }
                  className="h-14 rounded-xl"
                  required
                />
              </div>

              <div className="space-y-1.5 flex flex-col gap-1.5 pt-4">
                <Label
                  htmlFor={`jobTitle-${expIndex}`}
                  className="text-[#161A21] font-semibold text-[14px]"
                >
                  Job Title
                </Label>
                <Input
                  id={`jobTitle-${expIndex}`}
                  placeholder="Enter your job title"
                  type="text"
                  value={experience.jobTitle}
                  onChange={(e) =>
                    handleExperienceChange(expIndex, "jobTitle", e.target.value)
                  }
                  className="h-14 rounded-xl"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="space-y-1.5 flex flex-col gap-1.5">
                  <Label
                    htmlFor={`startDate-${expIndex}`}
                    className="text-[#161A21] font-semibold text-[14px]"
                  >
                    Start Date
                  </Label>
                  <Input
                    id={`startDate-${expIndex}`}
                    placeholder="MM/YYYY"
                    type="text"
                    value={experience.startDate}
                    onChange={(e) =>
                      handleExperienceChange(
                        expIndex,
                        "startDate",
                        e.target.value,
                      )
                    }
                    className="h-14 rounded-xl"
                    required
                  />
                </div>

                <div className="space-y-1.5 flex flex-col gap-1.5">
                  <Label
                    htmlFor={`endDate-${expIndex}`}
                    className="text-[#161A21] font-semibold text-[14px]"
                  >
                    End Date
                  </Label>
                  <Input
                    id={`endDate-${expIndex}`}
                    placeholder="MM/YYYY or Present"
                    type="text"
                    value={
                      experience.currentlyWorking
                        ? "Present"
                        : experience.endDate
                    }
                    onChange={(e) =>
                      handleExperienceChange(
                        expIndex,
                        "endDate",
                        e.target.value,
                      )
                    }
                    className="h-14 rounded-xl"
                    disabled={experience.currentlyWorking}
                    required={!experience.currentlyWorking}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`currentlyWorking-${expIndex}`}
                  checked={experience.currentlyWorking}
                  onCheckedChange={(checked) =>
                    handleExperienceChange(
                      expIndex,
                      "currentlyWorking",
                      checked as boolean,
                    )
                  }
                />
                <label
                  htmlFor={`currentlyWorking-${expIndex}`}
                  className="text-[#161A21] text-[14px] cursor-pointer"
                >
                  I currently work here
                </label>
              </div>

              <div className="space-y-1.5 flex flex-col gap-1.5 pt-4">
                <Label
                  htmlFor={`achievements-${expIndex}`}
                  className="text-[#161A21] font-semibold text-[14px]"
                >
                  Key Achievements
                </Label>
                {experience.achievements.map((achievement, achIndex) => (
                  <div
                    key={achIndex}
                    className="flex justify-between items-center space-x-2 mb-2"
                  >
                    <Input
                      id={`achievement-${expIndex}-${achIndex}`}
                      placeholder="Describe an achievement or responsibility..."
                      type="text"
                      value={achievement}
                      onChange={(e) =>
                        handleAchievementChange(
                          expIndex,
                          achIndex,
                          e.target.value,
                        )
                      }
                      className="h-14 rounded-xl"
                      required
                    />
                    {experience.achievements.length > 1 && (
                      <Button
                        variant="outline"
                        className="rounded-xl h-14"
                        onClick={() =>
                          handleDeleteAchievement(expIndex, achIndex)
                        }
                        type="button"
                      >
                        <Image
                          src={`/delete-bin-line.svg`}
                          width={20}
                          height={20}
                          alt="delete line bin"
                        />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="mt-2 h-12 rounded-xl border-dashed border-[#322FEB] text-[#322FEB] hover:bg-[#322FEB10]"
                  onClick={() => handleAddAchievement(expIndex)}
                  type="button"
                >
                  + Add Achievement
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Button
        variant="outline"
        className="mt-6 w-full h-14 rounded-xl border-dashed border-[#322FEB] text-[#322FEB] hover:bg-[#322FEB10]"
        onClick={handleAddExperience}
        type="button"
      >
        + Add Experience
      </Button>
    </section>
  );
};
