import { ProfileDetail } from "@/components/profile/profile-detail";
import { MOCK_PROFILES } from "@/data/profiles";
import Link from "next/link";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const profile = MOCK_PROFILES.find((item) => item.id === id);

  if (!profile) {
    return (
      <div className="flex w-full max-w-[51rem] flex-col gap-4 px-4 pt-10 pb-8">
        <Link href="/directory" className="w-fit underline">
          Back to Directory
        </Link>
        <h1 className="text-2xl font-bold text-text-main">Profile not found</h1>
      </div>
    );
  }

  return <ProfileDetail profile={profile} />;
}
