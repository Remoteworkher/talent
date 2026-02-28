import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import NameCard from "../reusables/NameCard";
import { useUserData } from "@/hooks/userData";
import { useProfile } from "@/hooks/useProfile";

const routeTitles: Record<string, string> = {
  "/": "Dashboard",
  "/career-tools": "Tools",
  "/jobs": "Job Board",
  "/applications": "Applications",
  "/courses": "Courses",
  "/events": "Events",
  "/community": "Community",
  "/find-a-mentor": "Find a Mentor",
  "/perks": "Perks",
  "/resources": "Resources",
  "/challenges": "Challenges",
  "/settings": "Settings",
  "/support": "Support",
  // Add more routes as needed
};

const TalentTopBar = ({
  onToggleSidebar,
}: {
  onToggleSidebar?: () => void;
}) => {
  const pathname = usePathname();
  const title = routeTitles[pathname] || "Dashboard";

  const { data: userData } = useUserData();
  const { data: userProfile } = useProfile();

  return (
    <div className="w-full max-w-[1168px] flex justify-between items-center py-5 px-4 md:px-10 border-b border-[#E8E8E8] bg-white">
      <div className="flex flex-1 justify-start items-center gap-4">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="focus:outline-none md:hidden"
          aria-label="Toggle menu"
        >
          <Image src="/hamburger.svg" alt="logo" width={40} height={40} />
        </button>
        <div className="text-[18px]">{title}</div>
      </div>

      <div className="flex justify-end items-center gap-2 lg:gap-6">
        <div className="border border-[#E8E8E8] p-2 rounded-[10px] flex justify-start items-center gap-2">
          <Image src={`/coins-line-colored.svg`} alt="coin" width={20} height={20} />
          <div className="text-[14px] text-[#535862]">{userData?.tokens ?? 0}</div>
        </div>
        <div className="border border-[#E8E8E8] p-2 rounded-[10px]">
          <Image src="/search-icon.svg" alt="search" width={20} height={20} />
        </div>
        <div className="border border-[#E8E8E8] p-2 rounded-[10px]">
          <Image
            src="/bett-icon.svg"
            alt="notification bell"
            width={20}
            height={20}
          />
        </div>
        <div className="hidden md:block">
          <NameCard profileData={userProfile} />
        </div>
      </div>
    </div>
  );
};

export default TalentTopBar;
