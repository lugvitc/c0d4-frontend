"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SuccessPage() {
  const router = useRouter();
  const [output, setOutput] = useState("Here's your team password");

  const goHome = () => {
    router.push("/");
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-transparent px-4 py-8 md:px-32">
      {/* Top-right link */}
      <Link
        href="https://lugvitc.net"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-8 right-8 text-sm text-[#00E1FF] transition-colors duration-300 hover:text-white md:text-lg"
        style={{
          fontFamily: "var(--font-jura)",
        }}
      >
        lugvitc.net
      </Link>

      {/* Bottom-right title image*/}
      <div className="absolute right-4 bottom-4 md:right-10 md:bottom-4">
        <Image
          src="/title-card.svg"
          alt="Title Card"
          width={500}
          height={150}
        />
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div className="flex-w-[450px] flex flex-col justify-center rounded-2xl p-6 md:p-8">
          {/* Heading */}
          <h1
            className="mb-6 text-center text-4xl font-semibold tracking-wider md:text-6xl"
            style={{
              fontFamily: "var(--font-orbitron)",
              textShadow:
                "0 0 20px #00E1FF, 0 0 40px #00E1FF, 0 0 60px #00E1FF, 0 0 80px #00E1FF",
            }}
          >
            SUCCESS
          </h1>
          <input
            type="text"
            value={output}
            readOnly
            className="w-full rounded-lg border-2 border-gray-600 bg-transparent px-4 py-2 text-center text-sm text-white placeholder-gray-200 transition-all duration-300 hover:border-[#00E1FF] focus:border-[#00E1FF] focus:outline-none md:text-base"
            style={{ fontFamily: "var(--font-jura)" }}
          />
          <div className="mt-6 flex flex-col gap-3">
            <button
              type="submit"
              onClick={goHome}
              className="mt-4 w-[300px] cursor-pointer rounded-lg border border-white bg-transparent px-6 py-2 font-black text-white transition-all duration-300 hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-50 md:w-[400px]"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              Finish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
