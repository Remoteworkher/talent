"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

// ─── Single Task Row ─────────────────────────────────────────
export const TaskSkeleton = () => (
  <div className="flex items-center gap-3 p-3 border border-[#E8E8E8] rounded-[12px]">
    <Skeleton className="w-5 h-5 rounded-[4px] shrink-0" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
    </div>
    <Skeleton className="h-8 w-16 rounded-full shrink-0" />
  </div>
);

// ─── Task List Card (Tasks / CompletedTasks / RoadmapTasks) ──
export const TaskListSkeleton = ({ title, icon }: { title?: string; icon?: boolean }) => (
  <div
    className="border border-[#E8E8E8] rounded-[24px] p-3 space-y-4 bg-white min-h-[400px]"
    style={{ boxShadow: "0px 1px 2px 0px #0A0D1408" }}
  >
    <section className="md:flex md:justify-between md:items-center p-2">
      <div className="flex justify-start items-center gap-2">
        {icon && <Skeleton className="w-6 h-6 rounded-[6px]" />}
        <Skeleton className="h-5 w-40" />
      </div>
    </section>
    <section className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <TaskSkeleton key={i} />
      ))}
    </section>
  </div>
);

// ─── Single Resource Row ─────────────────────────────────────
export const ResourceSkeleton = () => (
  <div className="flex items-center gap-3 p-3 border border-[#E8E8E8] rounded-[12px]">
    <Skeleton className="w-10 h-10 rounded-[10px] shrink-0" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/3" />
    </div>
    <Skeleton className="h-6 w-12 rounded-full shrink-0" />
  </div>
);

// ─── Resource List Card ──────────────────────────────────────
export const ResourceListSkeleton = () => (
  <div className="p-3 border border-[#E8E8E8] rounded-[16px] space-y-3">
    <div className="flex justify-between items-center border-b border-[#E8E8E8] pb-3">
      <Skeleton className="h-5 w-48" />
      <Skeleton className="h-8 w-16 rounded-[16px]" />
    </div>
    <section className="space-y-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <ResourceSkeleton key={i} />
      ))}
    </section>
  </div>
);

// ─── Welcome Banner ──────────────────────────────────────────
export const WelcomeSkeleton = () => (
  <div className="p-5 rounded-[16px] bg-gradient-to-r from-[#F3F8FF] to-[#FFFFFF]">
    <div className="space-y-2">
      <Skeleton className="h-7 w-64" />
      <Skeleton className="h-4 w-48" />
    </div>
  </div>
);

// ─── Single Event Card ───────────────────────────────────────
export const EventSkeleton = () => (
  <div className="flex flex-col sm:flex-row justify-between border border-[#E8E8E8] p-3 rounded-[12px] gap-3">
    <div className="flex flex-row gap-3">
      <Skeleton className="w-10 h-10 rounded-[10px] shrink-0" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-3 w-32" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-1 w-1 rounded-full" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </div>
    <Skeleton className="h-5 w-16 self-center shrink-0" />
  </div>
);

// ─── Event List ──────────────────────────────────────────────
export const EventListSkeleton = () => (
  <div className="space-y-3">
    {Array.from({ length: 3 }).map((_, i) => (
      <EventSkeleton key={i} />
    ))}
  </div>
);

// ─── Career Tool Form Page ───────────────────────────────────
export const ToolPageSkeleton = () => (
  <div className="bg-[#FFFCFD] min-h-screen md:px-8 py-8 flex flex-col items-center">
    <div className="w-full max-w-[1000px] space-y-8">
      <Skeleton className="h-6 w-24" />
      <div className="space-y-3">
        <Skeleton className="h-8 w-72" />
        <Skeleton className="h-4 w-full max-w-md" />
      </div>
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <Skeleton className="h-14 w-64 rounded-full" />
      </div>
    </div>
  </div>
);

// ─── Career Tool Result Page ─────────────────────────────────
export const ResultPageSkeleton = () => (
  <div className="bg-[#FFFCFD] min-h-screen md:px-8 py-8 flex flex-col items-center">
    <div className="w-full max-w-[1000px] space-y-8">
      <Skeleton className="h-6 w-24" />
      <div className="space-y-3">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-full max-w-lg" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-[16px]" />
        ))}
      </div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="space-y-3 pt-6 border-t border-[#E8E8E8]">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      ))}
    </div>
  </div>
);

// ─── Referral Tab ────────────────────────────────────────────
export const ReferralSkeleton = () => (
  <div className="space-y-8">
    <Skeleton className="h-4 w-80" />
    {/* Hero banner */}
    <Skeleton className="h-20 w-full rounded-[16px]" />
    {/* Stats grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Skeleton className="h-28 rounded-[16px]" />
      <Skeleton className="h-28 rounded-[16px]" />
    </div>
    {/* Link section */}
    <Skeleton className="h-20 w-full rounded-[16px]" />
    {/* Earning history */}
    <div className="rounded-[16px] border border-[#E8E8E8] overflow-hidden">
      <div className="p-6 border-b border-[#E8E8E8]">
        <Skeleton className="h-5 w-32" />
      </div>
      <div className="space-y-0">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="p-6 flex items-center justify-between border-b border-[#E8E8E8] last:border-0">
            <div className="flex items-center gap-4">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
            </div>
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── Account Tab ─────────────────────────────────────────────
export const AccountSkeleton = () => (
  <div className="space-y-10">
    {/* Avatar section */}
    <div className="flex items-center gap-6 py-6 border-b border-[#F0F0F0]">
      <Skeleton className="w-16 h-16 rounded-full" />
      <div className="space-y-3">
        <div className="space-y-1">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-44" />
        </div>
        <Skeleton className="h-10 w-20 rounded-full" />
      </div>
    </div>
    {/* Form fields */}
    <div className="space-y-8">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start pb-6 border-b border-[#F0F0F0]">
          <div className="space-y-1 lg:col-span-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-52" />
          </div>
          <Skeleton className="h-11 w-full rounded-md lg:col-span-2" />
        </div>
      ))}
    </div>
    {/* Action buttons */}
    <div className="flex justify-end gap-4 pt-4">
      <Skeleton className="h-12 w-24 rounded-xl" />
      <Skeleton className="h-12 w-32 rounded-xl" />
    </div>
  </div>
);

// ─── Career Tools Page (initial load) ────────────────────────
export const CareerToolsPageSkeleton = () => (
  <div className="space-y-4 p-3 md:p-6 lg:p-8 mx-auto md:w-full">
    {/* Header */}
    <div className="space-y-2">
      <Skeleton className="h-7 w-40" />
      <Skeleton className="h-4 w-72" />
    </div>
    {/* Tokens card */}
    <Skeleton className="h-16 w-full rounded-[16px]" />
    {/* Tab pills */}
    <div className="flex flex-wrap gap-2 pt-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-10 rounded-md" style={{ width: `${80 + i * 15}px` }} />
      ))}
    </div>
    {/* Tool cards grid */}
    <CareerToolsGridSkeleton />
  </div>
);

// ─── Career Tools Grid (tab switching) ───────────────────────
export const CareerToolsGridSkeleton = () => (
  <div className="space-y-8 pt-4">
    {Array.from({ length: 2 }).map((_, gi) => (
      <section key={gi} className="space-y-5">
        <div className="space-y-1">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-3 w-64" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="border border-[#E8E8E8] rounded-[16px] p-4 space-y-3 bg-white">
              <Skeleton className="w-10 h-10 rounded-[10px]" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          ))}
        </div>
      </section>
    ))}
  </div>
);

// ─── Resources Page (full page) ──────────────────────────────
export const ResourcesPageSkeleton = () => (
  <div className="max-w-[1440px] mx-auto p-4 md:p-8 space-y-12 pb-20">
    {/* Header */}
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>
      {/* Search bar */}
      <Skeleton className="h-[60px] w-full max-w-[1000px] rounded-full" />
      {/* Tab pills */}
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-10 rounded-md" style={{ width: `${90 + i * 20}px` }} />
        ))}
      </div>
    </div>
    {/* Resource groups */}
    {Array.from({ length: 2 }).map((_, gi) => (
      <section key={gi} className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-3 w-60" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border border-[#E8E8E8] rounded-[16px] p-4 space-y-3 bg-white">
              <Skeleton className="h-40 w-full rounded-[12px]" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <div className="flex items-center justify-between pt-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-9 w-28 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </section>
    ))}
  </div>
);

// ─── Resource Detail Page ────────────────────────────────────
export const ResourceDetailSkeleton = () => (
  <div className="min-h-screen bg-[#FDFDFD] max-w-[1440px] mx-auto p-6 lg:p-6 space-y-4">
    <div className="space-y-1">
      <Skeleton className="h-6 w-64" />
      <Skeleton className="h-4 w-24" />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Main preview */}
      <div className="lg:col-span-8">
        <Skeleton className="h-[800px] w-full rounded-[8px]" />
      </div>
      {/* Sidebar */}
      <div className="lg:col-span-4 space-y-6">
        <div className="border border-[#E8E8E8] rounded-[12px] p-4 space-y-6 bg-white">
          <div className="space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-3 w-24" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-40" />
          </div>
          <Skeleton className="h-11 w-full rounded-full" />
        </div>
      </div>
    </div>
  </div>
);

// ─── Onboarding Page ─────────────────────────────────────────
export const OnboardingSkeleton = () => (
  <div className="min-h-screen bg-white">
    <div className="w-full mx-auto p-8 space-y-12 pb-32">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <Skeleton className="h-5 w-72" />
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded-xl" />
          ))}
        </div>
      </div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pt-8 border-t border-[#F0F0F0]">
          <Skeleton className="h-5 w-52" />
          <Skeleton className="h-14 w-full rounded-xl" />
        </div>
      ))}
    </div>
  </div>
);

// ─── Plans Tab ───────────────────────────────────────────────
export const PlansTabSkeleton = () => (
  <div className="space-y-8">
    <div className="flex flex-col lg:flex-row gap-6">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="flex-1 p-8 rounded-[24px] border border-[#E8E8E8] bg-white space-y-6">
          <div className="space-y-4 flex flex-col items-center">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-9 w-40" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-[52px] w-full rounded-full" />
          <div className="space-y-4 pt-4">
            {Array.from({ length: 4 }).map((_, j) => (
              <div key={j} className="flex items-start gap-3">
                <Skeleton className="w-[18px] h-[18px] rounded-[4px] shrink-0" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ─── Verify Email / Suspense Fallback ────────────────────────
export const VerifyEmailSkeleton = () => (
  <div className="min-h-screen bg-white flex justify-center items-start">
    <div className="max-w-[600px] mx-auto pt-20 pb-10 px-6 flex flex-col items-center text-center space-y-8">
      <Skeleton className="w-24 h-24 rounded-full" />
      <div className="space-y-3 w-full">
        <Skeleton className="h-8 w-72 mx-auto" />
        <Skeleton className="h-4 w-80 mx-auto" />
        <Skeleton className="h-4 w-48 mx-auto" />
      </div>
      <div className="flex gap-3 justify-center">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="w-12 h-14 rounded-lg" />
        ))}
      </div>
      <Skeleton className="h-[52px] w-full rounded-xl" />
    </div>
  </div>
);
