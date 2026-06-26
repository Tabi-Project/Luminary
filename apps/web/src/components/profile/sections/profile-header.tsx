import "@/app/styles/profile.css";
import { ProfileDetailProps } from "@/types/profile.type";
import Image from "next/image";

export function ProfileHeader({ profile }: ProfileDetailProps) {
  const fullName =
    `${profile.firstname} ${profile.lastname}`.trim() || "Unknown";

  return (
    <section
      aria-label="profile header"
      className="mt-10 flex flex-wrap items-center gap-10 max-[475px]:flex-col max-[475px]:gap-4 max-[475px]:text-center"
    >
      <div className="profile-photo shrink-0">
        <Image
          src={profile.profilePhoto}
          alt={fullName}
          width={190}
          height={190}
          className="profile-photo-img"
        />
      </div>

      <div
        aria-label="name and occupation"
        className="flex flex-col justify-center gap-2"
      >
        <h1 className="text-4xl font-bold text-text-main">{fullName}</h1>
        <p aria-label="Occupation" className="text-muted">
          {profile.field || "Unknown Field"}
        </p>
      </div>
    </section>
  );
}
