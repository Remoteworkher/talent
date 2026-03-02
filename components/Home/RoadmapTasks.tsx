"use client";

import React from "react";
import Image from "next/image";
import ProgressBar from "../reusables/ProgressBar";
import Task from "../reusables/Task";
import { useTaskLibrary } from "@/hooks/useTask";
import { Loader2 } from "lucide-react";

const RoadmapTasks = () => {
  const { data, isLoading, error } = useTaskLibrary();

  if (isLoading) {
    return (
      <div className="border border-[#E8E8E8] rounded-[24px] p-8 flex justify-center items-center bg-white h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[#322FEB]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-[#E8E8E8] rounded-[24px] p-8 text-center bg-white">
        <p className="text-red-500">Failed to load tasks. Please try again.</p>
      </div>
    );
  }

  const tasks = data?.tasks || [];

  return (
    <div
      className="border border-[#E8E8E8] rounded-[24px] p-3 space-y-4 bg-white"
      style={{
        boxShadow: "0px 1px 2px 0px #0A0D1408",
      }}
    >
      <section className="md:flex md:justify-between md:items-center p-2">
        <div className="flex justify-start items-center gap-2">
          <Image src={`/atom-blue.svg`} width={24} height={24} alt="focus" />
          <div className="text-[#161A21] mori-semibold text-[16px]">
            90 Days Roadmap
          </div>
        </div>
      </section>
      <section className="space-y-3 overflow-y-auto h-[400px]">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Task key={task.task_id} task={task} />
          ))
        ) : (
          <div className="py-12 text-center text-[#6A6D71]">
            <p>No roadmap tasks available.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default RoadmapTasks;
