"use client";
import React from "react";
import { Button } from "../ui/button";
import Event from "../reusables/Event";
import { useRouter } from "next/navigation";

const Events = () => {
  const router = useRouter();

  return (
    <div className="p-3 border border-[#E8E8E8] rounded-[16px] space-y-3">
      <div className="flex justify-between items-center border-b border-[#E8E8E8] pb-3">
        <div className="text-[#161A21] text-[16px] mori-semibold">
          Events You’ll Love
        </div>
      </div>
      <section className="space-y-3">
        <Event />
      </section>
    </div>
  );
};

export default Events;
