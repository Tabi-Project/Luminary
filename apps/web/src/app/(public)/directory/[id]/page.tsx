import { ProfileDetail } from "@/components/profile/profile-detail";
import { getProfileById } from "@/services/profile.service";
import Link from "next/link";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getProfileById(id);

  if ("error" in result) {
    return (
      <div className="flex w-full max-w-[51rem] flex-col gap-4 px-4 pt-10 pb-8">
        <Link href="/directory" className="w-fit underline">
          Back to Directory
        </Link>
        <h1 className="text-2xl font-bold text-text-main">Profile not found</h1>
        <p className="text-muted">{result.message}</p>
      </div>
    );
  }

  return <ProfileDetail profile={result} />;
}
