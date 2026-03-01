import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Education {
  institutionName: string;
  location: string;
  degree: string;
  fieldOfStudy: string;
  graduationYear: string;
}

interface EducationProps {
  educations: Education[];
  handleEducationChange: (
    eduIndex: number,
    field: keyof Education,
    value: string,
  ) => void;
  handleAddEducation: () => void;
  handleDeleteEducation: (eduIndex: number) => void;
}

export const EducationSection: React.FC<EducationProps> = ({
  educations,
  handleEducationChange,
  handleAddEducation,
  handleDeleteEducation,
}) => {
  return (
    <section>
      <div>
        <div className="text-center text-[#161A21] sora-semibold text-[18px] md:text-[24px]">
          Education
        </div>
        <div className="text-[#6A6D71] text-[14px] md:text-[16px] text-center">
          Choose your immediate priority
        </div>
      </div>

      <div className="space-y-4 mt-6">
        {educations.map((education, eduIndex) => (
          <div
            key={eduIndex}
            className="p-3 border border-[#E8E8E8] rounded-[16px]"
          >
            <div className="flex justify-between items-center pb-4 border-b border-[#E8E8E8]">
              <div className="mori-semibold text-[16px] text-[#161A21]">
                Education {eduIndex + 1}
              </div>
              {educations.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteEducation(eduIndex)}
                  type="button"
                >
                  <Image
                    src={`/delete-bin-line.svg`}
                    width={20}
                    height={20}
                    alt="delete education"
                  />
                </Button>
              )}
            </div>
            <div className="space-y-4 mt-6">
              <div className="space-y-1.5 flex flex-col gap-1.5 pt-4">
                <Label
                  htmlFor={`institutionName-${eduIndex}`}
                  className="text-[#161A21] font-semibold text-[14px]"
                >
                  Institution Name
                </Label>
                <Input
                  id={`institutionName-${eduIndex}`}
                  placeholder="Enter institution name"
                  type="text"
                  value={education.institutionName}
                  onChange={(e) =>
                    handleEducationChange(
                      eduIndex,
                      "institutionName",
                      e.target.value,
                    )
                  }
                  className="h-14 rounded-xl"
                  required
                />
              </div>

              <div className="space-y-1.5 flex flex-col gap-1.5 pt-4">
                <Label
                  htmlFor={`location-${eduIndex}`}
                  className="text-[#161A21] font-semibold text-[14px]"
                >
                  Location
                </Label>
                <Input
                  id={`location-${eduIndex}`}
                  placeholder="City, Country e.g Lagos, Nigeria"
                  type="text"
                  value={education.location}
                  onChange={(e) =>
                    handleEducationChange(eduIndex, "location", e.target.value)
                  }
                  className="h-14 rounded-xl"
                  required
                />
              </div>

              <div className="space-y-1.5 flex flex-col gap-1.5 pt-4">
                <Label
                  htmlFor={`degree-${eduIndex}`}
                  className="text-[#161A21] font-semibold text-[14px]"
                >
                  Degree
                </Label>
                <select
                  id={`degree-${eduIndex}`}
                  value={education.degree}
                  onChange={(e) =>
                    handleEducationChange(eduIndex, "degree", e.target.value)
                  }
                  className="flex h-14 w-full rounded-xl border border-[#E8E8E8] bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#322FEB] disabled:cursor-not-allowed disabled:opacity-50 appearance-none bg-[url('/arrow-down.svg')] bg-[length:16px] bg-[right_16px_center] bg-no-repeat"
                  required
                >
                  <option value="">Select degree</option>
                  <option value="High School Diploma">
                    High School Diploma
                  </option>
                  <option value="Associate Degree">Associate Degree</option>
                  <option value="Bachelor's Degree">Bachelors Degree</option>
                  <option value="Master's Degree">Masters Degree</option>
                  <option value="Doctorate (PhD)">Doctorate (PhD)</option>
                  <option value="Professional Degree">
                    Professional Degree
                  </option>
                  <option value="Certificate">Certificate</option>
                </select>
              </div>

              <div className="space-y-1.5 flex flex-col gap-1.5 pt-4">
                <Label
                  htmlFor={`fieldOfStudy-${eduIndex}`}
                  className="text-[#161A21] font-semibold text-[14px]"
                >
                  Field of Study
                </Label>
                <Input
                  id={`fieldOfStudy-${eduIndex}`}
                  placeholder="e.g. Computer Science"
                  type="text"
                  value={education.fieldOfStudy}
                  onChange={(e) =>
                    handleEducationChange(
                      eduIndex,
                      "fieldOfStudy",
                      e.target.value,
                    )
                  }
                  className="h-14 rounded-xl"
                  required
                />
              </div>

              <div className="space-y-1.5 flex flex-col gap-1.5 pt-4">
                <Label
                  htmlFor={`graduationYear-${eduIndex}`}
                  className="text-[#161A21] font-semibold text-[14px]"
                >
                  Graduation Year
                </Label>
                <Input
                  id={`graduationYear-${eduIndex}`}
                  placeholder="YYYY"
                  type="text"
                  value={education.graduationYear}
                  onChange={(e) =>
                    handleEducationChange(
                      eduIndex,
                      "graduationYear",
                      e.target.value,
                    )
                  }
                  className="h-14 rounded-xl"
                  required
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <Button
        variant="outline"
        className="mt-6 w-full h-14 rounded-xl border-dashed border-[#322FEB] text-[#322FEB] hover:bg-[#322FEB10]"
        onClick={handleAddEducation}
        type="button"
      >
        + Add Education
      </Button>
    </section>
  );
};
