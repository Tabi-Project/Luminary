import "@/app/styles/hero.css";
import Image from "next/image";
import Link from "next/link";
import { MetricCard } from "../mertic-card";
import { Button } from "@/components/common/button";
import { FadeIn } from "@/components/animation/fade-in";
import { Stagger, StaggerItem } from "@/components/animation/stagger";

export function HeroSection() {
  return (
    <div className="flex flex-col items-center text-center gap-4 lg:gap-6 mt-10">
      <FadeIn className="w-full">
        <h1 className="text-5xl lg:text-6xl font-bold text-text-main">
          Celebrating our Women
        </h1>
      </FadeIn>
      <FadeIn className="w-full" delay={0.1}>
        <p className="text-muted sm:font-light">
          Luminary is a community-powered directory and news platform
          celebrating women who are driving change across all fields — business,
          science, arts, activism, sports, technology, agriculture, education
          and more.
        </p>
      </FadeIn>
      <FadeIn className="w-full flex justify-center" delay={0.2}>
        <Link href="/submit-story">
          <Button text="Submit a story" />
        </Link>
      </FadeIn>


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

      <Stagger className="w-full grid sm:grid-cols-3 gap-4 mt-14">
        <StaggerItem>
          <MetricCard
            text="120+ Women Represented"
            image="/icons/metric-1.svg"
            size="large"
          />
        </StaggerItem>
        <StaggerItem>
          <MetricCard text="Across 35+ Countries" image="/icons/metric-2.svg" />
        </StaggerItem>
        <StaggerItem>
          <MetricCard
            text="In more than 22 fields"
            image="/icons/metric-3.svg"
          />
        </StaggerItem>
      </Stagger>
    </div >
  );
}
