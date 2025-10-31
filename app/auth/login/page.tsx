"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignIn() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("authToken")) {
      router.replace("/challenges");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const teamName = formData.get("teamName") as string;
    const password = formData.get("password") as string;

    if (!teamName || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://pwn.lugvitc.net/api/auth/login",
        {
          name: teamName,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = response.data;

      if (data.access_token) {
        localStorage.setItem("authToken", data.access_token);
        window.dispatchEvent(new Event("auth-changed"));
        router.push("/challenges");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);

      if (axios.isAxiosError(err) && err.response) {
        const errorData = err.response.data;

        if (errorData?.msg_code === 10) {
          setError("Team not found. Please check your team name.");
        } else if (errorData?.msg_code === 14) {
          setError("Incorrect password. Please try again.");
        } else {
          setError("Login failed. Please try again.");
        }
      } else {
        setError("Network error. Please check your connection and try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-start justify-center px-4 py-8 sm:px-8 md:px-16 lg:px-32">
      <div className="absolute right-4 bottom-4 md:right-10 md:bottom-4">
        <Image
          src="/title-card.svg"
          alt="Title Card"
          width={500}
          height={150}
          className=""
        />
      </div>

      <div className="no-scrollbar absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center overflow-y-scroll bg-transparent text-center backdrop-blur-none lg:w-1/2 lg:bg-white/5 lg:backdrop-blur-lg">
        <h1
          className="mb-6 px-4 text-center text-3xl font-semibold tracking-wider sm:mb-8 sm:text-4xl md:text-5xl lg:text-6xl"
          style={{
            fontFamily: "var(--font-orbitron)",
            textShadow:
              "0 0 20px #00E1FF, 0 0 40px #00E1FF, 0 0 60px #00E1FF, 0 0 80px #00E1FF",
          }}
        >
          SIGN IN
        </h1>

        <form
          className="flex w-full max-w-sm flex-col items-center justify-center gap-4 px-4 md:max-w-md"
          method="POST"
          onSubmit={handleSubmit}
        >
          <input
            name="teamName"
            placeholder="Team Name"
            className="w-full rounded-lg border-2 border-gray-500 bg-gray-800/40 px-4 py-2 text-sm text-white placeholder-gray-400 transition-all duration-300 hover:border-[#00E1FF] focus:border-[#00E1FF] focus:outline-none sm:text-base"
            style={{ fontFamily: "var(--font-jura)" }}
            disabled={isLoading}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full rounded-lg border-2 border-gray-500 bg-gray-800/40 px-4 py-2 text-sm text-white placeholder-gray-400 transition-all duration-300 hover:border-[#00E1FF] focus:border-[#00E1FF] focus:outline-none sm:text-base"
            style={{ fontFamily: "var(--font-jura)" }}
            disabled={isLoading}
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 w-full cursor-pointer rounded-lg border border-white bg-transparent px-6 py-2 text-sm font-black text-white transition-all duration-300 hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
            style={{
              fontFamily: "var(--font-orbitron)",
              fontWeight: "700",
            }}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>

          {error && (
            <div
              className="w-full rounded-lg border border-red-500 bg-red-500/20 px-4 py-2 text-sm text-red-300 sm:text-base"
              style={{ fontFamily: "var(--font-jura)" }}
            >
              {error}
            </div>
          )}

          <div className="mt-4 text-center">
            <span
              className="text-xs text-gray-200 sm:text-sm"
              style={{ fontFamily: "var(--font-jura)" }}
            >
              Don&apos;t have a team?
              <span className="mx-1"></span>
              <Link
                href="/auth/signup"
                className="text-[#00E1FF] underline transition-colors duration-300 hover:text-white"
              >
                Sign Up
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
