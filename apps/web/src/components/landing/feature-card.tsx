import Image from "next/image";
import { SlideIn } from "@/components/animation/slide-in";

export function FeatureCard({
  text,
  image,
  imageWidth,
  imageHeight,
  desc,
  idx,
}: {
  text: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  desc: string;
  idx: number;
}) {
  const layout = imageLayouts[idx];
  const isReversed = idx % 2 !== 0;
  const imageFrom = isReversed ? "right" : "left";
  const textFrom = isReversed ? "left" : "right";

  return (
    <div
      className={`w-full flex flex-col-reverse sm:flex-row items-center gap-8 lg:gap-16 ${isReversed ? "sm:flex-row-reverse" : ""}`}
    >
      <SlideIn
        from={imageFrom}
        className="relative w-full sm:w-[62%] max-h-100 sm:max-h-122.5 aspect-square bg-muted-blue rounded-3xl overflow-hidden"
      >
        {layout && (
          <div className={layout.wrapper}>
            <Image
              src={image}
              alt={text}
              width={imageWidth}
              height={imageHeight}
              className={layout.img}
            />
          </div>
        )}
      </SlideIn>
      <SlideIn from={textFrom} className="w-full sm:w-[38%]">
        <h3 className="font-extrabold text-text-main text-4xl">{text}</h3>
        <p className="mt-3 lg:mt-6 text-lg font-light">{desc}</p>
      </SlideIn>
    </div>
  );
}

const imageLayouts = [
  {
    wrapper:
      "absolute lg:top-20 top-10 bottom-0 left-1/2 -translate-x-1/2 w-[72%]",
    img: "w-full h-auto",
  },
  {
    wrapper: "absolute inset-8 flex items-center justify-center",
    img: "max-w-full max-h-full object-contain",
  },
  {
    wrapper: "absolute top-1/2 -translate-y-1/2 left-1/2 lg:right-40 right-10",
    img: "w-full h-auto sm:scale-300 scale-250 ",
  },
];
