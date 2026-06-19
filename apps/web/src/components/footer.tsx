import Link from "next/link";
import { Button } from "./common/button";

export function Footer() {
  return (
    <footer className="w-full flex flex-col mt-10 gap-7 lg:gap-14">
      <div className="w-full flex flex-col items-center">
        <h1 className="text-4xl lg:text-[56px] text-center font-bold">
          Celebrate a woman today
        </h1>
        <span className="text-muted font-medium text-base text-center mt-2">
          Submit or nominate a story about a amazing woman in your life with
          Luminary{" "}
        </span>
        <div className="mt-6 lg:mt-10 flex items-center gap-3">
          <Button text="Submit a story" className="bg-text-main" />
          <Button
            text="Nominate a woman"
            className="bg-light-gray text-muted shadow-none"
          />
        </div>
      </div>
      <div className="border-t border-light-gray h-14 flex items-center justify-between text-muted text-sm font-medium">
        <span>© {new Date().getFullYear()} Luminary</span>
        <div className="flex items-center gap-3">
          <Link href="/news">Support</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/nominations">Nominations</Link>
        </div>
      </div>
    </footer>
  );
}
