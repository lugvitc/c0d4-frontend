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
    <div className="relative flex min-h-screen bg-transparent px-32 py-8">
      {/* Top-right link */}
      <Link
        href="https://lugvitc.net"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-8 right-8 text-lg text-[#00E1FF] transition-colors duration-300 hover:text-white"
        style={{
          fontFamily: "var(--font-jura)",
        }}
      >
        lugvitc.net
      </Link>

      {/* Bottom-right title image*/}
      <div className="absolute right-10 bottom-4">
        <Image
          src="/images/titleCard.svg"
          alt="Title Card"
          width={500}
          height={150}
        />
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div className="flex-w-[450px] flex flex-col justify-center rounded-2xl p-8 backdrop-blur-lg">
          {/* Heading */}
          <h1
            className="mb-6 text-center text-6xl font-semibold tracking-wider"
            style={{
              fontFamily: "var(--font-orbitron)",
              textShadow:
                "0 0 20px #00E1FF, 0 0 40px #00E1FF, 0 0 60px #00E1FF, 0 0 80px #00E1FF",
              width: "500px",
            }}
          >
            SUCCESS
          </h1>
          <input
            type="text"
            value={output}
            readOnly
            className="text-gray rounded-lg border-2 border-gray-600 bg-transparent px-4 py-2 text-center placeholder-gray-400 transition-all duration-300 hover:border-[#00E1FF] focus:border-[#00E1FF] focus:outline-none"
            style={{ fontFamily: "var(--font-jura)" }}
          />
          <div className="mt-6 flex flex-col gap-3">
            <button
              type="submit"
              onClick={goHome}
              className="mt-4 cursor-pointer rounded-lg border border-white bg-transparent px-6 py-2 font-black text-white transition-all duration-300 hover:bg-white hover:text-black"
              style={{
                fontFamily: "var(--font-orbitron)",
              }}
            >
              Finish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
