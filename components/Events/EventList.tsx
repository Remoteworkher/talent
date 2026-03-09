"use client";
import React from "react";
import { useEvents } from "@/hooks/useEvents";
import EventCard from "../reusables/EventCard";
import { EventListSkeleton } from "../reusables/Skeletons";

const EventList = () => {
  const { data, isLoading, isError } = useEvents({ filter: "upcoming" });

  if (isLoading) return <EventListSkeleton />;
  if (isError) return <div>Failed to load events.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {data?.events.data.map((event) => (
        <EventCard key={event.uid} event={event} />
      ))}
    </div>
  );
};

export default EventList;
