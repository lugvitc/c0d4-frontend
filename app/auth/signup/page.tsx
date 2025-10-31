"use client";

import { BACKEND_URL } from "@/lib/constants";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateTeam() {
  const router = useRouter();
  const [teamName, setTeamName] = useState("");
  const [teamPassword, setTeamPassword] = useState("");
  const [regNumbers, setRegNumbers] = useState(["", "", ""]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [unavailableRegNumbers, setUnavailableRegNumbers] = useState<string[]>(
    [],
  );
  const [unregisteredRegNumbers, setUnregisteredRegNumbers] = useState<
    string[]
  >([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("authToken")) {
      router.replace("/challenges");
    }
  }, [router]);

  const handleRegNumberChange = (index: number, value: string) => {
    const updated = [...regNumbers];
    updated[index] = value;
    setRegNumbers(updated);
    if (unavailableRegNumbers.length > 0) {
      setUnavailableRegNumbers([]);
    }
    if (unregisteredRegNumbers.length > 0) {
      setUnregisteredRegNumbers([]);
    }
  };

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setUnavailableRegNumbers([]);
    setUnregisteredRegNumbers([]);

    const filledRegNumbers = regNumbers.filter(
      (reg) => reg.trim().toLowerCase() !== "",
    );

    if (!teamName || !teamPassword || filledRegNumbers.length === 0) {
      setError(
        "Please fill in team name, password, and at least one registration number",
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/auth/signup`, {
        name: teamName,
        password: teamPassword,
        tags: filledRegNumbers,
      });

      if (response.status === 200) {
        router.push("/auth/login");
      } else {
        setError("Failed to create team. Please try again.");
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.msg_code === 20) {
        const unavailableTags = err.response.data.tags || [];
        const unavailableTagsList = unavailableTags.map(
          (tag: { tag: string }) => tag.tag.toLowerCase(),
        );
        setUnavailableRegNumbers(unavailableTagsList);
        setError("Some users are already part of a team.");
      } else if (
        axios.isAxiosError(err) &&
        err.response?.data?.msg_code === 24
      ) {
        const unregisteredTags = err.response.data.tags || [];
        const unregisteredTagsList = unregisteredTags.map((tag: string) =>
          tag.toLowerCase(),
        );
        setUnregisteredRegNumbers(unregisteredTagsList);
        setError("Some registration numbers are not registered.");
      } else {
        setError("An error occurred. Please try again.");
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
          CREATE TEAM
        </h1>

        <form
          className="flex w-full max-w-sm flex-col items-center justify-center gap-4 px-4 md:max-w-md"
          method="POST"
          onSubmit={handleCreateTeam}
        >
          <input
            type="text"
            name="teamName"
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="w-full rounded-lg border-2 border-gray-500 bg-gray-800/40 px-4 py-2 text-sm text-white placeholder-gray-400 transition-all duration-300 hover:border-[#00E1FF] focus:border-[#00E1FF] focus:outline-none sm:text-base"
            style={{ fontFamily: "var(--font-jura)" }}
            required
          />
          <input
            type="password"
            name="teamPassword"
            placeholder="Team Password"
            value={teamPassword}
            onChange={(e) => setTeamPassword(e.target.value)}
            className="w-full rounded-lg border-2 border-gray-500 bg-gray-800/40 px-4 py-2 text-sm text-white placeholder-gray-400 transition-all duration-300 hover:border-[#00E1FF] focus:border-[#00E1FF] focus:outline-none sm:text-base"
            style={{ fontFamily: "var(--font-jura)" }}
            required
          />

          <div className="w-full">
            <label
              className="mb-2 block text-center text-xs text-gray-300 sm:text-sm"
              style={{ fontFamily: "var(--font-jura)" }}
            >
              Registration Number 1 (Team Lead)
            </label>
            <input
              type="text"
              placeholder="Registration Number (Team Lead)"
              value={regNumbers[0]}
              onChange={(e) => handleRegNumberChange(0, e.target.value)}
              className={`w-full rounded-lg border-2 ${
                unavailableRegNumbers.includes(regNumbers[0].toLowerCase()) ||
                unregisteredRegNumbers.includes(regNumbers[0].toLowerCase())
                  ? "border-red-500"
                  : "border-gray-500"
              } bg-gray-800/40 px-4 py-2 text-sm text-white placeholder-gray-400 transition-all duration-300 hover:border-[#00E1FF] focus:border-[#00E1FF] focus:outline-none sm:text-base`}
              style={{ fontFamily: "var(--font-jura)" }}
              required
            />
            {unavailableRegNumbers.includes(regNumbers[0].toLowerCase()) && (
              <p
                className="mt-1 text-xs text-red-400 sm:text-sm"
                style={{ fontFamily: "var(--font-jura)" }}
              >
                This user is already part of a team
              </p>
            )}
            {unregisteredRegNumbers.includes(regNumbers[0].toLowerCase()) && (
              <p
                className="mt-1 text-xs text-red-400 sm:text-sm"
                style={{ fontFamily: "var(--font-jura)" }}
              >
                This user has not registered
              </p>
            )}
          </div>

          <div className="w-full">
            <label
              className="mb-2 block text-center text-xs text-gray-300 sm:text-sm"
              style={{ fontFamily: "var(--font-jura)" }}
            >
              Registration Number 2 (Optional)
            </label>
            <input
              type="text"
              placeholder="Registration Number (Optional)"
              value={regNumbers[1]}
              onChange={(e) => handleRegNumberChange(1, e.target.value)}
              className={`w-full rounded-lg border-2 ${
                unavailableRegNumbers.includes(regNumbers[1].toLowerCase()) ||
                unregisteredRegNumbers.includes(regNumbers[1].toLowerCase())
                  ? "border-red-500"
                  : "border-gray-500"
              } bg-gray-800/40 px-4 py-2 text-sm text-white placeholder-gray-400 transition-all duration-300 hover:border-[#00E1FF] focus:border-[#00E1FF] focus:outline-none sm:text-base`}
              style={{ fontFamily: "var(--font-jura)" }}
            />
            {unavailableRegNumbers.includes(regNumbers[1].toLowerCase()) && (
              <p
                className="mt-1 text-xs text-red-400 sm:text-sm"
                style={{ fontFamily: "var(--font-jura)" }}
              >
                This user is already part of a team
              </p>
            )}
            {unregisteredRegNumbers.includes(regNumbers[1].toLowerCase()) && (
              <p
                className="mt-1 text-xs text-red-400 sm:text-sm"
                style={{ fontFamily: "var(--font-jura)" }}
              >
                This user has not registered
              </p>
            )}
          </div>

          <div className="w-full">
            <label
              className="mb-2 block text-center text-xs text-gray-300 sm:text-sm"
              style={{ fontFamily: "var(--font-jura)" }}
            >
              Registration Number 3 (Optional)
            </label>
            <input
              type="text"
              placeholder="Registration Number (Optional)"
              value={regNumbers[2]}
              onChange={(e) => handleRegNumberChange(2, e.target.value)}
              className={`w-full rounded-lg border-2 ${
                unavailableRegNumbers.includes(regNumbers[2].toLowerCase()) ||
                unregisteredRegNumbers.includes(regNumbers[2].toLowerCase())
                  ? "border-red-500"
                  : "border-gray-500"
              } bg-gray-800/40 px-4 py-2 text-sm text-white placeholder-gray-400 transition-all duration-300 hover:border-[#00E1FF] focus:border-[#00E1FF] focus:outline-none sm:text-base`}
              style={{ fontFamily: "var(--font-jura)" }}
            />
            {unavailableRegNumbers.includes(regNumbers[2].toLowerCase()) && (
              <p
                className="mt-1 text-xs text-red-400 sm:text-sm"
                style={{ fontFamily: "var(--font-jura)" }}
              >
                This user is already part of a team
              </p>
            )}
            {unregisteredRegNumbers.includes(regNumbers[2].toLowerCase()) && (
              <p
                className="mt-1 text-xs text-red-400 sm:text-sm"
                style={{ fontFamily: "var(--font-jura)" }}
              >
                This user has not registered
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 w-full cursor-pointer rounded-lg border border-white bg-transparent px-6 py-2 text-sm font-black text-white transition-all duration-300 hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
            style={{
              fontFamily: "var(--font-orbitron)",
              fontWeight: "700",
            }}
          >
            {isLoading ? "Creating..." : "Create Team"}
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
              Already have a team?
              <span className="mx-1"></span>
              <Link
                href="/auth/login"
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
