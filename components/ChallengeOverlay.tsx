"use client";

import { useState } from "react";

interface Challenge {
  id: string;
  name: string;
  points: number;
  description: string;
  author: string;
}

interface ChallengeOverlayProps {
  challenge: Challenge;
  onClose: () => void;
}

export default function ChallengeOverlay({
  challenge,
  onClose,
}: ChallengeOverlayProps) {
  const [flagInput, setFlagInput] = useState("");
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "correct" | "incorrect"
  >("idle");
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (flagInput.toLowerCase().includes("c0d4{")) {
      setSubmitStatus("correct");
      setTimeout(() => {
        handleClose();
        setFlagInput("");
        setSubmitStatus("idle");
      }, 2000);
    } else {
      setSubmitStatus("incorrect");
      setTimeout(() => setSubmitStatus("idle"), 2000);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md ${
        isClosing ? "animate-fadeOut" : "animate-fadeIn"
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative w-full max-w-2xl overflow-hidden rounded-xl border border-[#00E1FF]/50 bg-[#0a0a0a] shadow-[0_0_50px_rgba(0,225,255,0.3)] ${
          isClosing ? "animate-scaleOut" : "animate-scaleIn"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#333] bg-[#141414] text-gray-400 transition-all duration-300 hover:border-[#00E1FF] hover:text-[#00E1FF]"
          aria-label="Close modal"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            strokeWidth="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="border-b border-[#00E1FF]/30 bg-gradient-to-r from-[#00E1FF]/10 to-transparent p-6">
          <h2 className="font-orbitron mb-2 text-2xl font-bold text-white md:text-3xl">
            {challenge.name}
          </h2>
          <div className="flex gap-4">
            <span className="font-jura text-[#00E1FF]">
              {challenge.points} points
            </span>
            <span className="font-mono text-sm text-gray-400">
              by {challenge.author}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="font-jura mb-2 text-lg font-semibold text-gray-300">
              Description
            </h3>
            <p className="font-mono leading-relaxed text-gray-400">
              {challenge.description}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="flag-input"
                className="font-jura mb-2 block text-sm font-semibold text-gray-300"
              >
                Submit Flag
              </label>
              <input
                id="flag-input"
                type="text"
                value={flagInput}
                onChange={(e) => setFlagInput(e.target.value)}
                placeholder="c0d4{...}"
                className="w-full rounded-lg border border-[#333] bg-[#141414] px-4 py-3 font-mono text-white placeholder-gray-600 transition-all duration-300 focus:border-[#00E1FF] focus:ring-2 focus:ring-[#00E1FF]/50 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={!flagInput.trim()}
              className="font-orbitron w-full rounded-lg border border-[#00E1FF] bg-[#00E1FF]/10 px-6 py-3 font-semibold text-[#00E1FF] transition-all duration-300 hover:bg-[#00E1FF]/20 hover:shadow-[0_0_20px_rgba(0,225,255,0.5)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#00E1FF]/10 disabled:hover:shadow-none"
            >
              SUBMIT
            </button>

            {submitStatus === "correct" && (
              <div className="font-jura animate-pulse rounded-lg border border-green-500/50 bg-green-500/10 p-3 text-center text-green-400">
                ✓ Correct! Flag accepted!
              </div>
            )}
            {submitStatus === "incorrect" && (
              <div className="font-jura animate-pulse rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-center text-red-400">
                ✗ Incorrect flag. Try again!
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
