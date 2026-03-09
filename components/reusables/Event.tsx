"use client";
import Image from "next/image";
import React from "react";
import { useEvents } from "@/hooks/useEvents";
import { EventListSkeleton } from "../reusables/Skeletons";

const Event = () => {
  const { data, isLoading, isError } = useEvents({ filter: "upcoming" });

  if (isLoading) return <EventListSkeleton />;
  if (isError) return <div>Failed to load events.</div>;

  return (
    <div>
      {data?.events.data.map((event) => (
        <div
          key={event.uid}
          className="flex flex-col sm:flex-row justify-between border border-[#E8E8E8] p-3 rounded-[12px] mb-3 gap-3"
        >
          <div className="flex flex-row sm:flex-row justify-start gap-3">
            <div className="bg-[#F7F0FC] rounded-[10px] p-2 h-[40px] flex items-center justify-center">
              <Image
                src={event.image || `/gift-line-purple.svg`}
                width={24}
                height={24}
                alt="event icon"
              />
            </div>
            <div className="space-y-1">
              <div className="text-[#161A21] text-[16px] mori-semibold">
                {event.title}
              </div>
              <div className="text-[#6A6D71] text-[14px]">
                {event.location || event.city}
              </div>
              <div className="flex flex-wrap justify-start items-center gap-2">
                <div className="flex justify-start items-center gap-1">
                  <Image
                    src={`/calendar-line.svg`}
                    width={16}
                    height={16}
                    alt="calendar"
                  />
                  <div className="text-[#6A6D71] text-[12px] pt-[1px]">
                    {new Date(event.starts_at).toLocaleDateString("en-NG", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
                <div className="bg-[#AAABAE] rounded-full w-[4px] h-[4px]"></div>
                <div className="flex justify-start items-center gap-1">
                  <Image
                    src={`/calendar-line.svg`}
                    width={16}
                    height={16}
                    alt="calendar"
                  />
                  <div className="text-[#6A6D71] text-[12px] pt-[1px]">
                    {new Date(event.starts_at).toLocaleTimeString("en-NG", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    ({event.timezone})
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-[#322FEB] mori-semibold text-[16px] mt-2 sm:mt-0 sm:self-center">
            ₦{event.member_price.toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Event;
