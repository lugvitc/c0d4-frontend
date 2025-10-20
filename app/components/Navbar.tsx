"use client";

import Image from "next/image";
import HackerLink from "./HackerText";

export default function Navbar() {
  return (
    <nav className="absolute top-[43%] right-[100px] flex -translate-y-1/2 flex-col items-center text-[#E0E0E0]">
      <Image
        src="/neon_penguin.svg"
        alt="Penguin Logo"
        width={200}
        height={200}
        priority
      />

      <div className="mt-[-1px] mb-[100px] text-center text-[28px] tracking-[1px] text-[#B0B0B0]">
        lugvitc.net
      </div>

      <ul className="m-0 flex list-none flex-col gap-[100px] p-0 text-center">
        <li>
          <HackerLink href="/" text="Sign Up" />
        </li>
        <li>
          <HackerLink href="/" text="Timeline" />
        </li>
        <li>
          <HackerLink href="/" text="Rules" />
        </li>
        <li>
          <HackerLink href="/" text="Leaderboard" />
        </li>
        <li>
          <HackerLink href="/" text="Prizes" />
        </li>
      </ul>
    </nav>
  );
}
