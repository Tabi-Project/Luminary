import Image from "next/image";

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

  return (
    <div
      className={`w-full flex flex-col-reverse sm:flex-row items-center gap-8 sm:gap-16 ${idx % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
    >
      <div className="relative w-full sm:w-[62%] max-h-122.5 aspect-square bg-muted-blue rounded-3xl overflow-hidden">
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
      </div>
      <div className="w-full sm:w-[38%]">
        <h3 className="font-extrabold text-text-main text-4xl">{text}</h3>
        <p className="mt-3 lg:mt-6 text-lg font-light">{desc}</p>
      </div>
    </div>
  );
}

const imageLayouts = [
  {
    wrapper:
      "absolute sm:top-20 bottom-0 left-1/2 -translate-x-1/2 w-4/5 sm:w-[72%]",
    img: "w-full h-auto",
  },
  {
    wrapper: "absolute inset-8 flex items-center justify-center",
    img: "max-w-full max-h-full object-contain",
  },
  {
    wrapper: "absolute top-1/2 -translate-y-1/2 left-1/2 sm:right-40 right-10",
    img: "w-full h-auto scale-300 ",
  },
];
