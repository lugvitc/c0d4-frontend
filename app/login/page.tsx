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
        "https://dev.lugvitc.net/api/auth/login",
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
        const status = err.response.status;
        const errorData = err.response.data;

        switch (status) {
          case 401:
            setError(
              errorData.detail ||
                "Invalid credentials. Please check your team name and password.",
            );
            break;
          case 404:
            setError(
              errorData.detail ||
                "Team not found. Please check your team name.",
            );
            break;
          case 422:
            setError(
              errorData.detail ||
                "Invalid input. Please check your credentials.",
            );
            break;
          case 500:
            setError("Server error. Please try again later.");
            break;
          default:
            setError(
              errorData.detail ||
                errorData.message ||
                "Login failed. Please try again.",
            );
        }
      } else {
        setError("Network error. Please check your connection and try again.");
      }
    } finally {
      setIsLoading(false);
    }
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
          SIGN IN
        </h1>

        <form
          className="flex w-full max-w-md flex-col items-center justify-center gap-4 px-4"
          method="POST"
          onSubmit={handleSubmit}
        >
          {error && (
            <div
              className="w-[400px] rounded-lg border-2 border-red-500 bg-red-500/10 px-4 py-2 text-center text-red-500"
              style={{ fontFamily: "var(--font-jura)" }}
            >
              {error}
            </div>
          )}

          <input
            name="teamName"
            placeholder="Team Name"
            className="w-[300px] rounded-lg border-2 border-gray-600 bg-transparent px-4 py-2 text-white placeholder-gray-400 transition-all duration-300 hover:border-[#00E1FF] focus:border-[#00E1FF] focus:outline-none md:w-[400px]"
            style={{ fontFamily: "var(--font-jura)" }}
            disabled={isLoading}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-[300px] rounded-lg border-2 border-gray-600 bg-transparent px-4 py-2 text-white placeholder-gray-400 transition-all duration-300 hover:border-[#00E1FF] focus:border-[#00E1FF] focus:outline-none md:w-[400px]"
            style={{ fontFamily: "var(--font-jura)" }}
            disabled={isLoading}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 w-[300px] cursor-pointer rounded-lg border border-white bg-transparent px-6 py-2 font-black text-white transition-all duration-300 hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-50 md:w-[400px]"
            style={{
              fontFamily: "var(--font-orbitron)",
              fontWeight: "700",
            }}
          >
            {isLoading ? "Signing In..." : "Sign In"}
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
