import { Button } from "@/components/common/button";

export default function Home() {
  return (
    <div className="w-full max-w-6xl flex flex-col items-center justify-center p-4 md:p-8 lg:p-10">
      <HeroSection />
    </div>
  );
}

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center text-center gap-5">
      <h1 className="text-6xl font-bold text-text-main">
        Celebrating our Women
      </h1>
      <p className="text-muted font-light">
        Luminary is a community-powered directory and news platform celebrating
        women who are driving change across all fields — business, science,
        arts, activism, sports, technology, agriculture, education and more.
      </p>
      <Button text="Submit a story" />
    </div>
  );
};
