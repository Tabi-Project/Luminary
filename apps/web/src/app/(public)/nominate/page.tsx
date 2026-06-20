import { NominationHeader } from "@/components/nomination/sections/nomination-header";
import { NominationSection } from "@/components/nomination/sections/nomination-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nominate | Luminary",
  description:
    "Recognize a woman making an impact by nominating her for the directory, or submit your own profile for verification.",
};

export default function NominatePage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 p-4 md:p-8 lg:p-10">
      <NominationHeader />
      <NominationSection />
    </main>
  );
}
