import { NominationForm } from "@/components/nomination/nomination-form";
import { VerificationSidebar } from "@/components/nomination/verification-sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nominate | Luminary",
  description:
    "Recognize a woman making an impact by nominating her for the directory, or submit your own profile for verification.",
};

export default function NominatePage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 p-4 md:p-8 lg:p-10">
      <section className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-text-main">Nominate</h1>
        <p className="max-w-xl text-muted">
          Recognize a woman making an impact by nominating her for the
          directory, or submit your own profile for verification.
        </p>
      </section>

      <section className="flex flex-col items-start gap-8 lg:flex-row">
        <NominationForm />
        <VerificationSidebar />
      </section>
    </main>
  );
}
