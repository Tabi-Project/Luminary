import "@/app/globals.css";
import Image from "next/image";
import { MetricCard } from "../mertic-card";
import { Button } from "@/components/common/button";

export function HeroSection() {
  return (
    <div className="flex flex-col items-center text-center gap-4 lg:gap-6 mt-10">
      <h1 className="text-5xl lg:text-6xl font-bold text-text-main">
        Celebrating our Women
      </h1>
      <p className="text-muted sm:font-light">
        Luminary is a community-powered directory and news platform celebrating
        women who are driving change across all fields — business, science,
        arts, activism, sports, technology, agriculture, education and more.
      </p>
      <Button text="Submit a story" />

      <div className="hero-image-outer">
        <div className="hero-image-wrapper">
          <div className="hero-image-track">
            <picture>
              <Image
                src="/images/landing-illustration.webp"
                alt="Landing illustration"
                width={3051}
                height={3984}
                className="w-full h-auto"
              />
            </picture>
            <picture>
              <Image
                src="/images/landing-illustration.webp"
                alt=""
                width={3051}
                height={3984}
                className="w-full h-auto"
              />
            </picture>
          </div>
        </div>
      </div>

      <div className="w-full grid sm:grid-cols-3 gap-4 mt-14">
        <MetricCard
          text="120+ Women Represented"
          image="/icons/metric-1.svg"
          size="large"
        />
        <MetricCard text="Across 35+ Countries" image="/icons/metric-2.svg" />
        <MetricCard text="In more than 22 fields" image="/icons/metric-3.svg" />
      </div>
    </div>
  );
}
