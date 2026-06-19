import { features } from "@/data/hero";
import { FeatureCard } from "../feature-card";

export function FeaturesSection() {
  return (
    <div className="w-full flex flex-col items-center gap-6 mt-14">
      <h2 className="text-lg font-extrabold text-text-main">App Features</h2>
      <div className="w-full flex flex-col gap-12 lg:gap-24 mt-5 lg:mt-10">
        {features.map((feature, idx) => {
          return (
            <FeatureCard
              key={idx}
              idx={idx}
              text={feature.text}
              desc={feature.desc}
              image={feature.image}
              imageWidth={feature.imageWidth}
              imageHeight={feature.imageHeight}
            />
          );
        })}
      </div>
    </div>
  );
}
