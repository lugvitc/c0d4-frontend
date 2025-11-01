"use client";

import { BACKEND_URL, CTF_SERVER_DOMAIN, HINTS_ENABLED } from "@/lib/constants";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

interface Challenge {
  id: string;
  name: string;
  points: number;
  description: string;
  author: string;
  categories: string[];
}

interface ChallengeOverlayProps {
  challenge: Challenge;
  onClose: () => void;
  onChallengeCompleted: (challengeId: string) => void;
  runningContainers: Record<string, number[]>;
  onContainerUpdate: () => Promise<void>;
  staticUrl: string | null;
  onStaticUrlUpdate: (challengeId: string, url: string | null) => void;
}

interface Hint {
  id: number;
  order: number;
  text: string;
}

const difficultyStyles = {
  easy: "border-green-500/40 bg-green-500/10 text-green-400",
  medium: "border-yellow-500/40 bg-yellow-500/10 text-yellow-400",
  hard: "border-red-500/40 bg-red-500/10 text-red-400",
};

const getDifficulty = (points: number) => {
  if (points <= 200) return { label: "Easy", className: difficultyStyles.easy };
  if (points <= 400)
    return { label: "Medium", className: difficultyStyles.medium };
  return { label: "Hard", className: difficultyStyles.hard };
};

const hintReductionPercentages = [0.9, 0.85, 0.75];
const hintsEnabled = HINTS_ENABLED;

export default function ChallengeOverlay({
  challenge,
  onClose,
  onChallengeCompleted,
  runningContainers,
  onContainerUpdate,
  staticUrl,
  onStaticUrlUpdate,
}: ChallengeOverlayProps) {
  const [flagInput, setFlagInput] = useState("");
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "correct" | "incorrect" | "submitting"
  >("idle");
  const [isClosing, setIsClosing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [containerStatus, setContainerStatus] = useState<
    "idle" | "starting" | "stopping"
  >("idle");
  const [containerMessage, setContainerMessage] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"details" | "hints">("details");
  const [viewedHints, setViewedHints] = useState<Hint[]>([]);
  const [hintsLoading, setHintsLoading] = useState(false);
  const [hintError, setHintError] = useState<string | null>(null);
  const [hintInfoMessage, setHintInfoMessage] = useState<string | null>(null);
  const [requestingHint, setRequestingHint] = useState(false);
  const [copiedPort, setCopiedPort] = useState<number | null>(null);
  const [originalPoints, setOriginalPoints] = useState<number | null>(null);
  const [currentPoints, setCurrentPoints] = useState(challenge.points);
  const [isHintModalOpen, setIsHintModalOpen] = useState(false);
  const [pendingReduction, setPendingReduction] = useState<number | null>(null);
  const difficultyPoints = originalPoints ?? challenge.points;
  const difficulty = getDifficulty(difficultyPoints);

  const isContainerRunning = challenge.id in runningContainers;
  const containerPorts = runningContainers[challenge.id] || [];

  useEffect(() => {
    onContainerUpdate();
  }, []);
  useEffect(() => {
    setCurrentPoints(challenge.points);
  }, [challenge.points]);
  useEffect(() => {
    const fetchOriginalPoints = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/ctf/${challenge.id}`,
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("authToken")}`,
            },
          },
        );
        const data = Array.isArray(response.data)
          ? response.data[0]
          : response.data;
        if (typeof data?.points === "number") {
          setOriginalPoints(data.points);
        } else {
          setOriginalPoints(challenge.points);
        }
      } catch {
        setOriginalPoints(challenge.points);
      }
    };
    fetchOriginalPoints();
  }, [challenge.id, challenge.points]);

  const loadViewedHints = useCallback(async () => {
    if (!hintsEnabled) {
      setViewedHints([]);
      setHintsLoading(false);
      return;
    }
    setHintsLoading(true);
    setHintError(null);
    try {
      const response = await axios.get<Hint[]>(
        `${BACKEND_URL}/api/ctf/${challenge.id}/viewed_hints`,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("authToken")}`,
          },
        },
      );
      setViewedHints(response.data);
    } catch (error) {
      setHintError("Failed to load hints.");
    } finally {
      setHintsLoading(false);
    }
  }, [challenge.id, hintsEnabled]);

  useEffect(() => {
    if (!hintsEnabled) return;
    loadViewedHints();
  }, [hintsEnabled, loadViewedHints]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleStartContainer = async () => {
    setContainerStatus("starting");
    setContainerMessage("");

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/ctf/${challenge.id}/start`,
        {},
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("authToken")}`,
          },
        },
      );

      if (response.data?.msg_code === 8) {
        setContainerMessage(
          "Instance limit reached for your team. Please stop a running instance first.",
        );
        setTimeout(() => {
          setContainerMessage("");
          setContainerStatus("idle");
        }, 3000);
        return;
      }

      const { static_url } = response.data;

      if (static_url) {
        const urlWithSlash = static_url.endsWith("/")
          ? static_url
          : `${static_url}/`;
        onStaticUrlUpdate(challenge.id, urlWithSlash);
      }

      setContainerMessage("Instance started successfully!");
      setContainerStatus("idle");

      await onContainerUpdate();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.msg_code === 8) {
        setContainerMessage(
          "Instance limit reached for your team. Please stop a running instance first.",
        );
      } else {
        setContainerMessage("Failed to start instance. Please try again.");
      }
      setTimeout(() => {
        setContainerMessage("");
        setContainerStatus("idle");
      }, 3000);
    }
  };

  const handleStopContainer = async () => {
    setContainerStatus("stopping");
    setContainerMessage("");

    try {
      await axios.post(
        `${BACKEND_URL}/api/ctf/${challenge.id}/stop`,
        {},
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("authToken")}`,
          },
        },
      );

      onStaticUrlUpdate(challenge.id, null);

      setContainerMessage("Instance stopped successfully!");
      setContainerStatus("idle");

      await onContainerUpdate();

      setTimeout(() => {
        setContainerMessage("");
      }, 3000);
    } catch (error) {
      setContainerMessage("Failed to stop instance. Please try again.");
      setTimeout(() => {
        setContainerMessage("");
        setContainerStatus("idle");
      }, 3000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!flagInput.trim()) {
      return;
    }

    setSubmitStatus("submitting");
    setErrorMessage("");

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/ctf/${challenge.id}/flag`,
        { flag: flagInput },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200 && response.data?.status === true) {
        setSubmitStatus("correct");
        onChallengeCompleted(challenge.id);
        setTimeout(() => {
          handleClose();
          setFlagInput("");
          setSubmitStatus("idle");
        }, 2000);
      } else if (response.status === 200 && response.data?.status === false) {
        setSubmitStatus("incorrect");
        setErrorMessage("Incorrect flag. Try again!");

        setTimeout(() => {
          setSubmitStatus("idle");
          setErrorMessage("");
        }, 3000);
      }
    } catch (error) {
      setSubmitStatus("incorrect");
      setErrorMessage("Incorrect flag. Try again!");

      setTimeout(() => {
        setSubmitStatus("idle");
        setErrorMessage("");
      }, 3000);
    }
  };

  const handleRequestHint = async (reduction?: number) => {
    if (!hintsEnabled) return;
    setRequestingHint(true);
    setHintError(null);
    setHintInfoMessage(null);
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/ctf/${challenge.id}/hint`,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("authToken")}`,
          },
        },
      );
      setHintInfoMessage("New hint unlocked.");
      await loadViewedHints();
      if (typeof reduction === "number") {
        setCurrentPoints((prev) => Math.max(prev - reduction, 0));
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        console.log(status);

        if (status === 403) {
          setHintInfoMessage("No more hints available.");
        } else {
          setHintError("This challenge has no hints.");
        }
      } else {
        setHintError("Unable to fetch a new hint right now.");
      }
    } finally {
      setRequestingHint(false);
      setPendingReduction(null);
    }
  };

  const handleOpenHintModal = () => {
    if (!hintsEnabled || requestingHint) return;
    setHintError(null);
    setHintInfoMessage(null);
    if (!originalPoints) {
      setHintError("Unable to determine hint cost right now.");
      return;
    }
    const nextHintIndex = viewedHints.length;
    const targetMultiplier = hintReductionPercentages[nextHintIndex];
    if (typeof targetMultiplier !== "number") {
      setHintInfoMessage("No more hints available.");
      return;
    }
    const targetPoints = Math.round(originalPoints * targetMultiplier);
    const reduction = Math.max(0, currentPoints - targetPoints);
    if (reduction <= 0) {
      setHintInfoMessage("No more hints available.");
      return;
    }
    setPendingReduction(reduction);
    setIsHintModalOpen(true);
  };

  const handleConfirmHint = async () => {
    if (pendingReduction == null) {
      setIsHintModalOpen(false);
      return;
    }
    setIsHintModalOpen(false);
    await handleRequestHint(pendingReduction);
  };

  const handleCancelHint = () => {
    setIsHintModalOpen(false);
    setPendingReduction(null);
  };

  return (
    <>
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

          <div className="border-b border-[#00E1FF]/30 bg-linear-to-r from-[#00E1FF]/10 to-transparent p-6">
            <h2 className="font-orbitron mb-2 text-2xl font-bold text-white md:text-3xl">
              {challenge.name}
            </h2>
            <div className="mb-3 flex flex-wrap gap-2">
              {challenge.categories.map((category, index) => (
                <span
                  key={index}
                  className="rounded-md border border-[#00E1FF]/40 bg-[#00E1FF]/10 px-2 py-1 font-mono text-xs text-[#00E1FF]"
                >
                  {category}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-jura text-[#00E1FF]">
                {challenge.points} points
              </span>
              <span
                className={`font-jura rounded-full border px-3 py-1 text-xs tracking-wide uppercase ${difficulty.className}`}
              >
                {difficulty.label}
              </span>
              <span className="font-mono text-sm text-gray-400">
                by {challenge.author}
              </span>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-6 flex gap-3">
              <button
                type="button"
                onClick={() => setActiveTab("details")}
                className={`font-orbitron rounded-lg border px-4 py-2 text-sm transition-all ${
                  activeTab === "details"
                    ? "border-[#00E1FF] bg-[#00E1FF]/20 text-[#00E1FF]"
                    : "border-[#333] bg-transparent text-gray-400 hover:border-[#00E1FF]/60 hover:text-[#00E1FF]"
                }`}
              >
                DETAILS
              </button>
              {hintsEnabled && (
                <button
                  type="button"
                  onClick={() => setActiveTab("hints")}
                  className={`font-orbitron rounded-lg border px-4 py-2 text-sm transition-all ${
                    activeTab === "hints"
                      ? "border-[#00E1FF] bg-[#00E1FF]/20 text-[#00E1FF]"
                      : "border-[#333] bg-transparent text-gray-400 hover:border-[#00E1FF]/60 hover:text-[#00E1FF]"
                  }`}
                >
                  HINTS
                </button>
              )}
            </div>

            {activeTab === "details" || !hintsEnabled ? (
              <>
                <div className="mb-6">
                  <h3 className="font-jura mb-2 text-lg font-semibold text-gray-300">
                    Description
                  </h3>
                  <div className="no-scrollbar max-h-32 overflow-y-auto rounded-lg border border-[#333] bg-[#141414] p-3">
                    <p className="font-mono text-sm leading-relaxed text-gray-400">
                      {challenge.description}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-jura mb-3 text-lg font-semibold text-gray-300">
                    Challenge
                  </h3>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handleStartContainer}
                      disabled={
                        containerStatus === "starting" || isContainerRunning
                      }
                      className="font-orbitron flex-1 rounded-lg border border-green-500 bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-400 transition-all duration-300 hover:bg-green-500/20 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-green-500/10 disabled:hover:shadow-none"
                    >
                      {containerStatus === "starting"
                        ? "STARTING..."
                        : isContainerRunning
                          ? "RUNNING"
                          : "START"}
                    </button>
                    <button
                      type="button"
                      onClick={handleStopContainer}
                      disabled={
                        containerStatus === "stopping" || !isContainerRunning
                      }
                      className="font-orbitron flex-1 rounded-lg border border-red-500 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 transition-all duration-300 hover:bg-red-500/20 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-red-500/10 disabled:hover:shadow-none"
                    >
                      {containerStatus === "stopping" ? "STOPPING..." : "STOP"}
                    </button>
                  </div>
                  {containerMessage && (
                    <div className="font-jura mt-3 rounded-lg border border-[#00E1FF]/40 bg-[#00E1FF]/10 p-3 text-center text-sm text-[#00E1FF]">
                      {containerMessage}
                    </div>
                  )}

                  {containerPorts.length > 0 && (
                    <div className="mt-3 rounded-lg border border-green-500/40 bg-green-500/10 p-4">
                      <h4 className="font-jura mb-2 text-sm font-semibold text-green-400">
                        Connection Details:
                      </h4>
                      <div className="space-y-2">
                        {containerPorts.map((port: number, index: number) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 rounded bg-black/40 p-2"
                          >
                            <span className="font-mono text-sm text-gray-300">
                              {CTF_SERVER_DOMAIN}:{port}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  `${CTF_SERVER_DOMAIN}:${port}`,
                                );
                                setCopiedPort(port);
                                setTimeout(() => setCopiedPort(null), 2000);
                              }}
                              className="ml-auto rounded border border-green-500/40 bg-green-500/10 px-2 py-1 text-xs text-green-400 transition hover:bg-green-500/20"
                            >
                              {copiedPort === port ? "Copied!" : "Copy"}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {staticUrl && (
                    <div className="mt-3 rounded-lg border border-blue-500/40 bg-blue-500/10 p-4">
                      <h4 className="font-jura mb-2 text-sm font-semibold text-blue-400">
                        Static Files:
                      </h4>
                      <a
                        href={staticUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded bg-black/40 p-2 font-mono text-sm text-blue-400 transition hover:bg-black/60 hover:text-blue-300"
                      >
                        <span>Download Files</span>
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </div>
                  )}
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
                      placeholder="C0D{...}"
                      className="w-full rounded-lg border border-[#333] bg-[#141414] px-4 py-3 font-mono text-white placeholder-gray-600 transition-all duration-300 focus:border-[#00E1FF] focus:ring-2 focus:ring-[#00E1FF]/50 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={
                      !flagInput.trim() || submitStatus === "submitting"
                    }
                    className="font-orbitron w-full rounded-lg border border-[#00E1FF] bg-[#00E1FF]/10 px-6 py-3 font-semibold text-[#00E1FF] transition-all duration-300 hover:bg-[#00E1FF]/20 hover:shadow-[0_0_20px_rgba(0,225,255,0.5)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#00E1FF]/10 disabled:hover:shadow-none"
                  >
                    {submitStatus === "submitting" ? "SUBMITTING..." : "SUBMIT"}
                  </button>

                  {submitStatus === "correct" && (
                    <div className="font-jura animate-pulse rounded-lg border border-green-500/50 bg-green-500/10 p-3 text-center text-green-400">
                      ✓ Correct! Flag accepted!
                    </div>
                  )}
                  {submitStatus === "incorrect" && (
                    <div className="font-jura animate-pulse rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-center text-red-400">
                      ✗ {errorMessage || "Incorrect flag. Try again!"}
                    </div>
                  )}
                </form>
              </>
            ) : (
              <div className="space-y-4">
                <div className="font-jura rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-center text-sm text-red-400">
                  For each hint viewed, points will be deducted from the total
                  you receive for the question.
                </div>

                <button
                  type="button"
                  onClick={handleOpenHintModal}
                  disabled={requestingHint}
                  className="font-orbitron w-full rounded-lg border border-[#00E1FF] bg-[#00E1FF]/10 px-4 py-2 text-sm font-semibold text-[#00E1FF] transition-all duration-300 hover:bg-[#00E1FF]/20 hover:shadow-[0_0_15px_rgba(0,225,255,0.5)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {requestingHint ? "REQUESTING..." : "GET NEXT HINT"}
                </button>

                {hintError && (
                  <div className="font-jura rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-center text-sm text-red-300">
                    {hintError}
                  </div>
                )}
                {hintInfoMessage && (
                  <div className="font-jura rounded-lg border border-[#00E1FF]/40 bg-[#00E1FF]/10 p-3 text-center text-sm text-[#00E1FF]">
                    {hintInfoMessage}
                  </div>
                )}

                {hintsLoading ? (
                  <div className="font-jura rounded-lg border border-[#00E1FF]/40 bg-[#00E1FF]/10 p-4 text-center text-sm text-[#00E1FF]">
                    Loading hints...
                  </div>
                ) : viewedHints.length === 0 ? (
                  <div className="font-jura rounded-lg border border-[#333] bg-[#141414] p-4 text-center text-sm text-gray-400">
                    No hints viewed yet.
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {viewedHints.map((hint) => (
                      <li
                        key={hint.id}
                        className="rounded-lg border border-[#00E1FF]/30 bg-[#0f0f0f] p-4"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-orbitron text-xs text-[#00E1FF]">
                            Hint #{hint.order + 1}
                          </span>
                        </div>
                        <p className="mt-2 font-mono text-sm leading-relaxed text-gray-300">
                          {hint.text}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {hintsEnabled && isHintModalOpen && pendingReduction !== null && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-sm rounded-xl border border-[#00E1FF]/40 bg-[#0a0a0a] p-6 text-center shadow-[0_0_30px_rgba(0,225,255,0.25)]">
            <p className="font-jura text-sm text-gray-200">
              Are you sure you want to view the next hint?
            </p>
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={handleCancelHint}
                className="font-orbitron flex-1 rounded-lg border border-[#333] bg-transparent px-4 py-2 text-sm text-gray-400 transition-all hover:border-[#00E1FF]/60 hover:text-[#00E1FF]"
              >
                CANCEL
              </button>
              <button
                type="button"
                onClick={handleConfirmHint}
                disabled={requestingHint}
                className="font-orbitron flex-1 rounded-lg border border-[#00E1FF] bg-[#00E1FF]/10 px-4 py-2 text-sm text-[#00E1FF] transition-all hover:bg-[#00E1FF]/20 hover:shadow-[0_0_15px_rgba(0,225,255,0.5)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {requestingHint ? "REQUESTING..." : "CONFIRM"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
