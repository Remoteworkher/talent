"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { useUserData } from "@/hooks/userData";
import { WelcomeSkeleton } from "../reusables/Skeletons";

const Welcome = () => {
  const { data, isLoading } = useUserData();

  if (isLoading) {
    return <WelcomeSkeleton />;
  }

  return (
    <div className="p-5 rounded-[16px] flex justify-between items-center bg-gradient-to-r from-[#F3F8FF] to-[#FFFFFF]">
      <div className="flex justify-start items-center gap-4">
        <div>
          <div className="mori-semibold text-[24px] text-[#161A21]">
            Welcome back! {data?.first_name ?? ""} 👋
          </div>
          {data?.goal && (
            <div className="text-[14px] text-[#161A21]">
              {/* You can fetch and display user goal/role/salary here if available in backend */}
              Your goal:{" "}
              <span className="mori-semibold capitalize">{data?.goal?.replaceAll("-", " ") ?? ""}</span> 
              {/* <span className="text-[#322FEB] mori-semibold">₦{data?.salary ?? ""}/month</span>  */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
