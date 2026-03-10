"use client";

import React from "react";
import TaskCard from "@/components/reusables/TaskCard";
import OverallProgress from "@/components/reusables/OverallProgress";
import { useTaskStats } from "@/hooks/useTask";
import { Skeleton } from "@/components/ui/skeleton";

const RoadmapStats = () => {
  const { data, isLoading } = useTaskStats();

  if (isLoading) {
    return (
      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-20 rounded-[12px]" />
          <Skeleton className="h-20 rounded-[12px]" />
        </div>
        <Skeleton className="h-16 rounded-[16px]" />
      </div>
    );
  }

  const currentDay = data?.current_day ?? 1;
  const totalDays = data?.total_days ?? 90;
  const completedCount = data?.completed_due_tasks_count ?? 0;
  const dueCount = data?.due_tasks_count ?? 0;
  const progress = data?.roadmap_progress_percentage ?? 0;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TaskCard
          icon="/thunder-outline.svg"
          label={`Day ${currentDay}`}
          sublabel={`of ${totalDays}`}
        />
        <TaskCard
          icon="/check-circle.svg"
          label={`${completedCount}/${dueCount}`}
          sublabel="Tasks Done"
        />
      </div>
      <OverallProgress progress={progress} />
    </div>
  );
};

export default RoadmapStats;
