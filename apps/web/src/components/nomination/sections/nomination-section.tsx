import { NominationForm } from "@/components/nomination/nomination-form";
import { VerificationSidebar } from "@/components/nomination/verification-sidebar";

export function NominationSection() {
  return (
    <section className="flex flex-col items-start gap-8 lg:flex-row">
      <NominationForm />
      <VerificationSidebar />
    </section>
  );
}
