"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignUp() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("authToken")) {
      router.replace("/challenges");
    }
  }, [router]);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/login");
  };

  return (
    <div className="relative flex min-h-screen flex-col items-start justify-center px-32 py-8">
      <div className="absolute right-4 bottom-4 md:right-10 md:bottom-4">
        <Image
          src="/title-card.svg"
          alt="Title Card"
          width={500}
          height={150}
          className=""
        />
      </div>

      <div className="no-scrollbar absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center overflow-y-scroll bg-transparent text-center backdrop-blur-none md:w-1/2 md:bg-white/5 md:backdrop-blur-lg">
        <h1
          className="mb-8 text-center text-4xl font-semibold tracking-wider sm:text-5xl md:text-6xl"
          style={{
            fontFamily: "var(--font-orbitron)",
            textShadow:
              "0 0 20px #00E1FF, 0 0 40px #00E1FF, 0 0 60px #00E1FF, 0 0 80px #00E1FF",
          }}
        >
          SIGN UP
        </h1>

        <form
          className="flex w-full max-w-md flex-col items-center justify-center gap-4 px-4"
          method="POST"
          onSubmit={handleSignIn}
        >
          <input
            type="text"
            name="userName"
            placeholder="Name"
            className="w-[300px] rounded-lg border-2 border-gray-600 bg-gray-800/20 px-4 py-2 text-white placeholder-slate-400 transition-all duration-300 hover:border-[#00E1FF] focus:border-[#00E1FF] focus:outline-none md:w-[400px] md:bg-transparent"
            style={{ fontFamily: "var(--font-jura)" }}
          />
          <input
            type="text"
            name="regNo"
            placeholder="Registration Number"
            className="w-[300px] rounded-lg border-2 border-gray-600 bg-gray-800/20 px-4 py-2 text-white placeholder-slate-400 transition-all duration-300 hover:border-[#00E1FF] focus:border-[#00E1FF] focus:outline-none md:w-[400px] md:bg-transparent"
            style={{ fontFamily: "var(--font-jura)" }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-[300px] rounded-lg border-2 border-gray-600 bg-gray-800/20 px-4 py-2 text-white placeholder-slate-400 transition-all duration-300 hover:border-[#00E1FF] focus:border-[#00E1FF] focus:outline-none md:w-[400px] md:bg-transparent"
            style={{ fontFamily: "var(--font-jura)" }}
            autoComplete="email"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-[300px] rounded-lg border-2 border-gray-600 bg-gray-800/20 px-4 py-2 text-white placeholder-slate-400 transition-all duration-300 hover:border-[#00E1FF] focus:border-[#00E1FF] focus:outline-none md:w-[400px] md:bg-transparent"
            style={{ fontFamily: "var(--font-jura)" }}
          />

          <button
            type="submit"
            className="mt-4 w-[300px] cursor-pointer rounded-lg border border-white bg-transparent px-6 py-2 font-black text-white transition-all duration-300 hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-50 md:w-[400px]"
            style={{
              fontFamily: "var(--font-orbitron)",
              fontWeight: "700",
            }}
          >
            Sign Up
          </button>

          <div className="mt-4 -ml-4 text-center">
            <span
              className="text-gray-800/20 md:text-gray-400"
              style={{ fontFamily: "var(--font-jura)" }}
            >
              Already have an account?
              <span className="mx-1"></span>
              <Link
                href="/login"
                className="text-[#00E1FF] underline transition-colors duration-300 hover:text-white"
              >
                Sign In
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
