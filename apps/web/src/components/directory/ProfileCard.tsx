import React from 'react';
import Image from 'next/image';
import { Globe, UserCircle } from 'lucide-react';
import { NomineeProfile } from '@/types/profile.type';
import { cn } from '@/utils/cn';

interface ProfileCardProps {
  profile: NomineeProfile;
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, className }) => {
  return (
    <article
      className={cn(
        "bg-white rounded-[2.5rem] p-8 shadow-sm flex flex-col gap-6 hover:shadow-md transition-all duration-300",
        className,
      )}
    >
      {/* Header section */}
      <div className="flex gap-5 items-start">
        <div className="relative w-24 h-24 flex-shrink-0">
          <img
            src={profile.profilePhoto}
            alt={profile.name}
            className="object-cover rounded-[1.25rem]"
          />
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <h3 className="text-2xl font-bold text-[var(--color-text-main)] leading-tight">
              {profile.name}
            </h3>
            {/* <p className="text-[var(--color-muted)] text-base font-medium">
              {profile.organization}
            </p> */}
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 bg-[#f3f4f6] text-[var(--color-text-main)] text-xs font-semibold rounded-lg"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="min-h-[80px]">
        <p className="text-[var(--color-text-main)] leading-relaxed text-[15px]">
          {profile.impact}
        </p>
      </div>

      {/* Divider */}
      <div className="h-[1px] bg-[#f3f4f6] w-full" />

      {/* Links Section */}
      <div className="flex flex-col gap-4">
        <h4 className="text-[var(--color-muted)] text-[13px] font-bold uppercase tracking-wider">
          Links & Profiles
        </h4>
        <div className="flex flex-col gap-3">
          {profile.socialLinks.map((link, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 text-[var(--color-text-main)]"
            >
              <UserCircle className="w-5 h-5 text-[var(--color-muted)] opacity-70" />
              <a
                href={link.startsWith("http") ? link : `https://${link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-semibold hover:underline truncate"
              >
                {link.replace(/^https?:\/\//, "")}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Evidence Section */}
      <div className="flex flex-col gap-4">
        <h4 className="text-[var(--color-muted)] text-[13px] font-bold uppercase tracking-wider">
          Evidence & Coverage
        </h4>
        <div className="flex flex-col gap-3">
          {profile.evidence.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 text-[var(--color-text-main)]"
            >
              <Globe className="w-5 h-5 text-[var(--color-muted)] opacity-70" />
              <a
                href={item.startsWith("http") ? item : `https://${item}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-semibold hover:underline truncate"
              >
                {item.replace(/^https?:\/\//, "")}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Action */}
      <button className="w-full bg-[#1e293b] text-white py-4 rounded-2xl font-bold text-base hover:bg-[#0f172a] transition-colors mt-4">
        View Full Profile
      </button>
    </article>
  );
};

export default ProfileCard;
