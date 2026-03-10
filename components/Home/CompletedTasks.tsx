"use client";

import React from "react";
import Image from "next/image";
import Task from "../reusables/Task";
import { useCompletedTasks } from "@/hooks/useTask";
import { TaskListSkeleton } from "../reusables/Skeletons";

const CompletedTasks = () => {
  const { data, isLoading, error } = useCompletedTasks();

  if (isLoading) {
    return <TaskListSkeleton title="Completed Tasks" />;
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
      <section className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 p-2">
        <div className="flex justify-start items-center gap-2">
          <Image
            src={`/checkmark-badge2.svg`}
            width={24}
            height={24}
            alt="focus"
          />
          <div className="text-[#161A21] mori-semibold text-[16px]">
            Completed Tasks
          </div>
        </div>
      </section>
      <section className="space-y-3 overflow-y-auto">
        {tasks.length > 0 ? (
          tasks.map((task) => <Task key={task.task_id} task={task} />)
        ) : (
          <div className="py-8 flex flex-col items-center justify-center">
            <div className="w-full max-w-[172px]">
              <Image
                src={`/empty-tasks.svg`}
                width={172}
                height={128}
                alt="no completed tasks"
                className="w-full h-auto"
              />
            </div>
            <div className="text-[#181D27] mori-semibold text-center text-[14px] mt-4">
              No Completed Tasks to show
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default CompletedTasks;
