import type { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/common/button";
import { Globe, UserCircle } from "lucide-react";
import { ProfileCardProps } from "@/types/profile.type";
import { cn } from "@/utils/cn";

const ProfileCard: FC<ProfileCardProps> = ({ profile, className }) => {
  return (
    <article
      className={cn(
        "bg-white rounded-[2.5rem] p-6 shadow-sm flex flex-col gap-6 hover:shadow-md transition-all duration-300",
        className,
      )}
    >
      <div className="flex gap-5 items-center">
        <div className="relative w-24 h-24 shrink-0">
          <Image
            width={96}
            height={96}
            src={profile.profilePhoto}
            alt={profile.firstname}
            className="object-cover rounded-[1.25rem] w-24 h-24"
          />
        </div>

        <div className="flex flex-col gap-0.5 text-2xl font-semibold text-text-main leading-tight">
          <h3>{profile.firstname}</h3>
          <h3>{profile.lastname}</h3>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {profile.tags.map((tag) => (
          <span
            key={tag}
            className="px-4 py-1.5 bg-[#f3f4f6] text-text-main text-xs font-semibold rounded-lg"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="h-30 overflow-hidden">
        <p className="text-text-main leading-relaxed text-[15px] line-clamp-5">
          {profile.impact}
        </p>
      </div>

      <div className="h-[1px] bg-light-gray w-full" />

      <div className="flex flex-col gap-4">
        <h4 className="text-muted text-[13px] font-bold uppercase tracking-wider">
          Links & Profiles
        </h4>
        <div className="flex flex-col gap-3">
          {profile.socialLinks.map((link, idx) => (
            <div key={idx} className="flex items-center gap-3 text-text-main">
              <UserCircle className="w-5 h-5 text-muted opacity-70" />
              <Link
                href={link.startsWith("http") ? link : `https://${link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-semibold hover:underline truncate"
              >
                {link.replace(/^https?:\/\//, "")}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h4 className="text-muted text-[13px] font-bold uppercase tracking-wider">
          Evidence & Coverage
        </h4>
        <div className="flex flex-col gap-3">
          {profile.evidence.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 text-text-main">
              <Globe className="w-5 h-5 text-muted opacity-70" />
              <Link
                href={item.startsWith("http") ? item : `https://${item}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-semibold hover:underline truncate"
              >
                {item.replace(/^https?:\/\//, "")}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Button
        text="View Full Profile"
        className="w-full bg-primary text-white justify-center py-4 rounded-2xl font-bold text-base hover:bg-[#097676] transition-colors mt-4"
      />
    </article>
  );
};

export default ProfileCard;