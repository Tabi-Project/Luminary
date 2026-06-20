import { contributors } from "@/data/contributors";
import { ContributorCard } from "@/components/landing/contributor-card";

export function ContributorsSection() {
  return (
    <div className="w-full flex flex-col items-center">
      <h2>Meet the Contributors</h2>

      <div className="w-full lg:w-1/2 flex flex-wrap gap-6 lg:gap-8 mt-8">
        {contributors.map((contributor, idx) => (
          <ContributorCard key={idx} {...contributor} />
        ))}
      </div>
    </div>
  );
}
