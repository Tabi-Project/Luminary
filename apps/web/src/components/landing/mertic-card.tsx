import Image from "next/image";

export function MetricCard({
  text,
  image,
  size = "small",
}: {
  text: string;
  image: string;
  size?: "small" | "large";
}) {
  return (
    <div className="w-full flex flex-col items-center">
      <Image
        alt={text}
        src={image}
        className="rounded-full"
        width={size === "large" ? 130 : 100}
        height={size === "large" ? 88 : 100}
      />
      <p className="mt-4 text-text-main max-w-[133px] font-extrabold text-lg leading-[130%]">
        {text}
      </p>
    </div>
  );
}
