import ProfileCard from "@/components/directory/ProfileCard";
import { getApprovedProfiles } from "@/services/profile.service";

export async function ProfileSection() {
  const profiles = await getApprovedProfiles();

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {profiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
        {profiles.length === 0 && (
          <p className="text-center col-span-full py-10 text-muted">
            No approved profiles found.
          </p>
        )}
      </div>
    </section>
  );
}