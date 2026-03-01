"use client";
import { BaseResultPage } from "@/components/career-tools/BaseResultPage";

export default function ElevatorPitchResultPage() {
  return (
    <BaseResultPage
      slug="elevator-pitch"
      headerTitle="Elevator Pitch Generator"
      formPath="/career-tools/growth/elevator-pitch"
      downloadPdf={(output) => {
          console.log("Downloading PDF for Elevator Pitch", output);
      }}
    />
  );
}
