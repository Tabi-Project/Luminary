import { ProfileCard } from "@/components/directory/ProfileCard";
import { getApprovedProfiles } from "@/services/profile.service";

export async function ProfileSection() {
  const result = await getApprovedProfiles();

  // Handle API or Fetch errors gracefully by checking if the result contains an 'error' property
  if ("error" in result) {
    return (
      <section className="py-12 text-center bg-white rounded-3xl shadow-sm border border-danger/10">
        <div className="max-w-md mx-auto flex flex-col gap-3 px-6">
          <h3 className="text-xl font-bold text-danger">Unable to load profiles</h3>
          <p className="text-muted text-sm">{result.message}</p>
        </div>
      </section>
    );
  }

  const profiles = result;

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
