"use client";
import { BaseResultPage } from "@/components/career-tools/BaseResultPage";

export default function EmailWriterResultPage() {
  return (
    <BaseResultPage
      slug="email-writer"
      formPath="/career-tools/resumes/email-writer"
      headerTitle="Your email writer is ready!"
      downloadPdf={(output) => {
          console.log("Downloading PDF for Email", output);
      }}
    />
  );
}
