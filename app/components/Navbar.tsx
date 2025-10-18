import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-[43%] right-[100px] flex -translate-y-1/2 flex-col items-center text-[#E0E0E0]">
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
          <Link
            href="/"
            className="text-[28px] tracking-[1px] whitespace-nowrap text-[#E0E0E0] no-underline transition-all duration-200 ease-in-out [text-shadow:0_0_8px_rgba(224,224,224,0.6),_0_0_12px_rgba(224,224,224,0.4)] hover:text-[#38c8f5] hover:no-underline hover:[text-shadow:0_0_10px_#38c8f5,_0_0_20px_#38c8f5,_0_0_30px_#38c8f5]"
          >
            Sign Up
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="text-[28px] tracking-[1px] whitespace-nowrap text-[#E0E0E0] no-underline transition-all duration-200 ease-in-out [text-shadow:0_0_8px_rgba(224,224,224,0.6),_0_0_12px_rgba(224,224,224,0.4)] hover:text-[#38c8f5] hover:no-underline hover:[text-shadow:0_0_10px_#38c8f5,_0_0_20px_#38c8f5,_0_0_30px_#38c8f5]"
          >
            Timeline
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="text-[28px] tracking-[1px] whitespace-nowrap text-[#E0E0E0] no-underline transition-all duration-200 ease-in-out [text-shadow:0_0_8px_rgba(224,224,224,0.6),_0_0_12px_rgba(224,224,224,0.4)] hover:text-[#38c8f5] hover:no-underline hover:[text-shadow:0_0_10px_#38c8f5,_0_0_20px_#38c8f5,_0_0_30px_#38c8f5]"
          >
            Rules
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="text-[28px] tracking-[1px] whitespace-nowrap text-[#E0E0E0] no-underline transition-all duration-200 ease-in-out [text-shadow:0_0_8px_rgba(224,224,224,0.6),_0_0_12px_rgba(224,224,224,0.4)] hover:text-[#38c8f5] hover:no-underline hover:[text-shadow:0_0_10px_#38c8f5,_0_0_20px_#38c8f5,_0_0_30px_#38c8f5]"
          >
            Leaderboard
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="text-[28px] tracking-[1px] whitespace-nowrap text-[#E0E0E0] no-underline transition-all duration-200 ease-in-out [text-shadow:0_0_8px_rgba(224,224,224,0.6),_0_0_12px_rgba(224,224,224,0.4)] hover:text-[#38c8f5] hover:no-underline hover:[text-shadow:0_0_10px_#38c8f5,_0_0_20px_#38c8f5,_0_0_30px_#38c8f5]"
          >
            Prizes
          </Link>
        </li>
      </ul>
    </nav>
  );
}
