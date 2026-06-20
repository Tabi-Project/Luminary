import { MOCK_PROFILES } from "@/data/profiles";
import ProfileCard from "@/components/directory/ProfileCard";

export function ProfileContainer() {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {MOCK_PROFILES.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>
    </section>
  );
}