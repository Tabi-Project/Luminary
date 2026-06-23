"use client";
import Image from "next/image";
import { ContributorModal } from "./modals/contributor-modal";
import { useState } from "react";

export function ContributorCard({
  name,
  image,
  role,
  bio,
  github,
  linkedin,
}: {
  name: string;
  image: string;
  role: string;
  bio: string;
  github: string;
  linkedin: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="w-fit shrink-0 flex flex-col gap-2 items-center justify-center cursor-pointer"
      >
        <Image
          alt={name}
          width={150}
          height={150}
          src={image}
          className="rounded-full w-24 sm:w-30 aspect-square object-cover border-primary border-2 hover:scale-105 transition-all duration-200 ease"
        />
        <div className="flex flex-col items-center w-full">
          <span className="text-sm font-semibold">{name}</span>
          <span className="text-muted text-xs">{role}</span>
        </div>
      </div>
      <ContributorModal
        open={open}
        setOpen={setOpen}
        contributor={{ name, image, role, bio, github, linkedin }}
      />
    </>
  );
}
