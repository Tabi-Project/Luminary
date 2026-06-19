import { contributors } from "@/data/contributors";
import { Modal } from "../../common/modal";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { Button } from "../../common/button";

export function ContributorModal({
  contributor,
  open,
  setOpen,
}: {
  contributor: (typeof contributors)[0];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Modal open={open} setOpen={setOpen} footer={<Footer />}>
      <div className="w-full flex flex-col items-center text-center p-2">
        <Image
          width={150}
          height={150}
          alt={contributor.name}
          src={contributor.image}
          className="rounded-full w-30 aspect-square object-cover"
        />
        <span className="mt-4 text-text-main font-semibold text-lg leading-[100%]">
          {contributor.name}
        </span>
        <span className="text-sm text-primary">{contributor.role}</span>
        <p className="text-sm font-light mt-2">{contributor.bio}</p>
      </div>
    </Modal>
  );
}

function Footer() {
  return (
    <div className="w-full h-fit flex gap-4 justify-end">
      <Button
        text="Github"
        icon={
          <Image src="/icons/github.svg" alt="GitHub" width={20} height={20} />
        }
        className="bg-text-main"
      />
      <Button
        text="LinkedIn"
        icon={
          <Image
            src="/icons/linkedin.svg"
            alt="LinkedIn"
            width={20}
            height={20}
          />
        }
        className="bg-text-main h-full"
      />
    </div>
  );
}
