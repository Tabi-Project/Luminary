import { PROFILE_ATTRIBUTES } from "@/data/profile";
import { ProfileDetailProps } from "@/types/profile.type";
import { capitalizeFirstLetter } from "@/utils/string";

export function ProfileAbout({ profile }: ProfileDetailProps) {
  const attributes = PROFILE_ATTRIBUTES.map(({ label, key }) => ({
    label,
    value: profile[key],
  })).filter(
    (attribute): attribute is { label: string; value: string } =>
      Boolean(attribute.value),
  );

  if (attributes.length === 0) return null;

  return (
    <section aria-label="About" className="mt-12 flex flex-col">
      <h2 className="pb-4 text-primary">About</h2>

      {attributes.map(({ label, value }) => (
        <p
          key={label}
          className="flex justify-between gap-2 border-b border-light-gray py-4 max-[375px]:flex-col"
        >
          <b className="font-bold">{label}</b>
          <span>{capitalizeFirstLetter(value.trim())}</span>
        </p>
      ))}
    </section>
  );
}
