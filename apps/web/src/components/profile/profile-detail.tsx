import { ProfileAbout } from "@/components/profile/sections/profile-about";
import { ProfileHeader } from "@/components/profile/sections/profile-header";
import { ProfileLinks } from "@/components/profile/sections/profile-links";
import { ProfileDetailProps } from "@/types/profile.type";
import Link from "next/link";

export function ProfileDetail({ profile }: ProfileDetailProps) {
  return (
    <div className="flex w-full max-w-[51rem] flex-col px-4 pb-8">
      <Link href="/directory" className="mt-4 w-fit underline">
        Back to Directory
      </Link>

      <ProfileHeader profile={profile} />

      {profile.impact.trim() && (
        <section aria-label="Bio" className="mt-12 flex flex-col gap-2">
          <h2 className="text-primary">Description</h2>
          <p className="leading-relaxed text-text-main">
            {profile.impact.trim()}
          </p>
        </section>
      )}

      <ProfileAbout profile={profile} />

      <ProfileLinks title="Supporting Links" links={profile.socialLinks} />
      <ProfileLinks title="Evidence Links" links={profile.evidence} />
    </div>
  );
}
