"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("team");
  };

  return (
    <div className="relative flex min-h-screen flex-col items-start justify-center px-32 py-8">
      <Link
        href="https://lugvitc.net"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-8 right-8 text-lg text-[#00E1FF] transition-colors duration-300 hover:text-white"
        style={{ fontFamily: "var(--font-jura)" }}
      >
        lugvitc.net
      </Link>

      <div className="absolute right-10 bottom-4">
        <Image
          src="/title-card.svg"
          alt="Title Card"
          width={500}
          height={105}
          className=""
        />
      </div>

      <div
        className="absolute top-0 left-0 flex h-full w-1/2 flex-col items-center justify-center overflow-y-scroll bg-white/5 text-center backdrop-blur-lg"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        onWheel={(e) => e.currentTarget.scrollBy(0, e.deltaY)}
      >
        <style jsx>
          {`
            div::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
        <h1
          className="mb-8 text-center text-6xl font-semibold tracking-wider"
          style={{
            fontFamily: "var(--font-orbitron)",
            textShadow:
              "0 0 20px #00E1FF, 0 0 40px #00E1FF, 0 0 60px #00E1FF, 0 0 80px #00E1FF",
          }}
        >
          SIGN IN
        </h1>

        <form
          className="flex flex-col items-center justify-center gap-4"
          method="POST"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="rounded-lg border-2 border-gray-600 bg-transparent px-4 py-2 text-white placeholder-gray-400 transition-all duration-300 hover:border-[#00E1FF] focus:border-[#00E1FF] focus:outline-none"
            style={{ fontFamily: "var(--font-jura)", width: "400px" }}
            autoComplete="email"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="rounded-lg border-2 border-gray-600 bg-transparent px-4 py-2 text-white placeholder-gray-400 transition-all duration-300 hover:border-[#00E1FF] focus:border-[#00E1FF] focus:outline-none"
            style={{ fontFamily: "var(--font-jura)", width: "400px" }}
          />

          <button
            type="submit"
            className="mt-4 cursor-pointer rounded-lg border border-white bg-transparent px-6 py-2 font-black text-white transition-all duration-300 hover:bg-white hover:text-black"
            style={{
              fontFamily: "var(--font-orbitron)",
              width: "400px",
              fontWeight: "700",
            }}
          >
            Sign In
          </button>

          <div className="mt-4 -ml-4 text-center">
            <span
              className="text-gray-400"
              style={{ fontFamily: "var(--font-jura)" }}
            >
              Don&apos;t have an account?
              <span className="mx-1"></span>
              <Link
                href="/signup"
                className="text-[#00E1FF] underline transition-colors duration-300 hover:text-white"
              >
                Sign Up
              </Link>
            </span>
          </div>

          <div className="mt-2 -ml-4 text-center">
            <Link
              href="#"
              className="text-gray-400 underline transition-colors duration-300 hover:text-white"
              style={{ fontFamily: "var(--font-jura)" }}
            >
              Forgot your password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
