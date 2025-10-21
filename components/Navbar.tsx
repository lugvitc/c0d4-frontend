"use client";

import Image from "next/image";
import HackerLink from "./HackerText";

export default function Navbar() {
  return (
    <nav className="absolute top-12 right-20 flex flex-col items-center text-[#E0E0E0]">
      <Image
        src="/neon_penguin.svg"
        alt="Penguin Logo"
        width={300}
        height={300}
        priority
      />

      <div className="mb-24 text-center text-2xl tracking-wide">
        lugvitc.net
      </div>

      <ul className="m-0 flex list-none flex-col gap-24 p-0 text-center">
        <li>
          <HackerLink href="/signup" text="Sign Up" />
        </li>
        <li>
          <HackerLink href="/" text="Timeline" />
        </li>
        <li>
          <HackerLink href="/" text="Rules" />
        </li>
        <li>
          <HackerLink href="/leaderboard" text="Leaderboard" />
        </li>
        <li>
          <HackerLink href="/" text="Prizes" />
        </li>
      </ul>
    </nav>
  );
}
