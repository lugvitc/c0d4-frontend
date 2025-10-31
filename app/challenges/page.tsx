"use client";

import ChallengeCard from "@/components/ChallengeCard";
import ChallengeOverlay from "@/components/ChallengeOverlay";
import { BACKEND_URL } from "@/lib/constants";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Challenge {
  id: string;
  name: string;
  points: number;
  description: string;
  author: string;
  categories: string[];
  isCompleted?: boolean;
}

interface Category {
  id: string;
  name: string;
  challenges: Challenge[];
}

interface ApiChallenge {
  id: number;
  name: string;
  description: string;
  points: number;
  author: string;
  tags: number;
}

interface TeamInfo {
  id: number;
  name: string;
  coins: number;
  points: number;
}

interface LeaderboardTeam {
  name: string;
  tpoints: number;
}

const challengeTypes = [
  "WEB EXPLOITATION",
  "BINARY EXPLOITATION",
  "FORENSICS",
  "OSINT",
  "REVERSING",
];

function getTypesFromMask(mask: number): string[] {
  const result: string[] = [];

  for (let i = 0; i < challengeTypes.length; i++) {
    if (mask & (1 << i)) {
      result.push(challengeTypes[i]);
    }
  }

  return result;
}

export default function ChallengesPage() {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(
    null,
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const [teamInfo, setTeamInfo] = useState<TeamInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [runningContainers, setRunningContainers] = useState<
    Record<string, number[]>
  >({});
  const [staticUrls, setStaticUrls] = useState<Record<string, string>>({});
  const [showContainerManager, setShowContainerManager] = useState(false);
  const [stoppingContainer, setStoppingContainer] = useState<string | null>(
    null,
  );

  const fetchRunningContainers = async () => {
    try {
      const response = await axios.get<Record<string, number[]>>(
        `${BACKEND_URL}/api/team/containers`,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("authToken")}`,
          },
        },
      );
      setRunningContainers(response.data);
    } catch (error) {
      console.error("Error fetching running instances:", error);
    }
  };

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setLoading(true);

        const authToken = window.localStorage.getItem("authToken");
        const headers = {
          Authorization: `Bearer ${authToken}`,
        };

        const response = await axios.get<ApiChallenge[]>(
          `${BACKEND_URL}/api/ctf/list`,
          { headers },
        );

        try {
          const teamResponse = await axios.get<TeamInfo>(
            `${BACKEND_URL}/api/team/me`,
            { headers },
          );

          try {
            const leaderboardResponse = await axios.get<LeaderboardTeam[]>(
              `${BACKEND_URL}/api/leaderboard`,
            );

            const currentTeamInLeaderboard = leaderboardResponse.data.find(
              (team) => team.name === teamResponse.data.name,
            );

            if (currentTeamInLeaderboard) {
              setTeamInfo({
                ...teamResponse.data,
                points: currentTeamInLeaderboard.tpoints,
              });
            } else {
              setTeamInfo(teamResponse.data);
            }
          } catch (leaderboardError) {
            console.error("Error fetching leaderboard:", leaderboardError);
            setTeamInfo(teamResponse.data);
          }
        } catch (teamError) {
          console.error("Error fetching team info:", teamError);
        }

        let completedIds = new Set<number>();
        try {
          const completedResponse = await axios.get<ApiChallenge[]>(
            `${BACKEND_URL}/api/ctf/completed`,
            { headers },
          );
          completedIds = new Set(completedResponse.data.map((c) => c.id));
        } catch (completedError) {
          console.error("Error fetching completed challenges:", completedError);
        }

        const categoryMap = new Map<string, Challenge[]>();

        response.data.forEach((apiChallenge) => {
          const categories = getTypesFromMask(apiChallenge.tags);

          const challenge: Challenge = {
            id: apiChallenge.id.toString(),
            name: apiChallenge.name,
            points: apiChallenge.points,
            description: apiChallenge.description,
            author: apiChallenge.author,
            categories: categories,
            isCompleted: completedIds.has(apiChallenge.id),
          };

          if (categories.length > 0) {
            const primaryCategory = categories[0];
            if (!categoryMap.has(primaryCategory)) {
              categoryMap.set(primaryCategory, []);
            }
            categoryMap.get(primaryCategory)?.push(challenge);
          }
        });

        const categoriesArray: Category[] = challengeTypes
          .map((categoryName, index) => ({
            id: index.toString(),
            name: categoryName,
            challenges: categoryMap.get(categoryName) || [],
          }))
          .filter((category) => category.challenges.length > 0);

        categoriesArray.sort((a, b) => Number(a.id) - Number(b.id));

        setCategories(categoriesArray);
        setError(null);
      } catch (err) {
        console.error("Error fetching challenges:", err);
        setError(
          "Failed to load challenges. Please check if you are authenticated.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  useEffect(() => {
    if (selectedChallenge) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedChallenge]);

  const closeModal = () => {
    setSelectedChallenge(null);
  };

  const handleStaticUrlUpdate = (challengeId: string, url: string | null) => {
    setStaticUrls((prev) => {
      if (url === null) {
        const { [challengeId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [challengeId]: url };
    });
  };

  const handleChallengeCompleted = (challengeId: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => ({
        ...category,
        challenges: category.challenges.map((challenge) =>
          challenge.id === challengeId
            ? { ...challenge, isCompleted: true }
            : challenge,
        ),
      })),
    );
  };

  const handleStopContainer = async (ctfId: string) => {
    setStoppingContainer(ctfId);

    try {
      await axios.post(
        `${BACKEND_URL}/api/ctf/${ctfId}/stop`,
        {},
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("authToken")}`,
          },
        },
      );

      await fetchRunningContainers();
    } catch (error) {
      console.error("Error stopping instance:", error);
    } finally {
      setStoppingContainer(null);
    }
  };

  const handleStopAllContainers = async () => {
    setStoppingContainer("all");

    try {
      await axios.post(
        `${BACKEND_URL}/api/ctf/stopall`,
        {},
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("authToken")}`,
          },
        },
      );

      await fetchRunningContainers();
    } catch (error) {
      console.error("Error stopping all instances:", error);
    } finally {
      setStoppingContainer(null);
    }
  };

  if (loading) {
    return (
      <div className="relative min-h-screen">
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
          <h1 className="font-orbitron mb-8 text-4xl font-bold tracking-widest md:text-6xl">
            CHALLENGES
          </h1>
          <div className="text-xl text-[#00E1FF]">Loading challenges...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative min-h-screen">
        <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
          <div className="rounded-1xl w-full max-w-xl border border-[#00E1FF]/40 bg-black/60 p-8 text-center shadow-[0_0_40px_rgba(0,225,255,0.25)] backdrop-blur-lg">
            <h1 className="font-orbitron text-4xl font-bold tracking-widest text-white md:text-5xl">
              CHALLENGES
            </h1>
            <div className="font-jura mt-4 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200 md:text-base">
              {error}
            </div>
            <div className="mt-6 flex flex-col gap-3 md:flex-row md:justify-center">
              <Link
                href="/auth/login"
                className="font-orbitron rounded-lg border border-[#00E1FF] bg-[#00E1FF]/10 px-6 py-2 text-[#00E1FF] transition hover:bg-[#00E1FF]/30 hover:text-black"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="font-orbitron rounded-lg border border-white/40 px-6 py-2 text-white transition hover:border-white hover:bg-white hover:text-black"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {teamInfo && (
        <div className="absolute top-6 left-6 z-20 rounded-lg border border-[#00E1FF]/60 bg-[#0a0a0acc] px-4 py-2 text-sm text-[#00E1FF]">
          {teamInfo.name}: {teamInfo.points} pts
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-16 md:px-8 lg:px-16">
        <h1 className="font-orbitron mb-4 text-4xl font-bold tracking-widest md:text-6xl">
          CHALLENGES
        </h1>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20">
        {categories.map((category) => (
          <div key={category.id} className="mb-16">
            <div className="mb-6 flex items-center gap-4">
              <div className="h-0.5 flex-1 bg-linear-to-r from-transparent via-[#00E1FF] to-transparent"></div>
              <h2 className="font-orbitron text-2xl font-bold tracking-wider text-[#00E1FF] md:text-3xl">
                {category.name}
              </h2>
              <div className="h-0.5 flex-1 bg-linear-to-r from-transparent via-[#00E1FF] to-transparent"></div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {category.challenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  id={challenge.id}
                  name={challenge.name}
                  points={challenge.points}
                  isCompleted={challenge.isCompleted}
                  onClick={() => {
                    if (!challenge.isCompleted) {
                      setSelectedChallenge(challenge);
                    }
                  }}
                />
              ))}
            </div>
          </div>
        ))}

        <div className="mt-12 flex flex-col items-center">
          <button
            onClick={() => {
              setShowContainerManager(!showContainerManager);
              if (!showContainerManager) {
                fetchRunningContainers();
              }
            }}
            className="font-orbitron rounded-lg border border-[#00E1FF] bg-[#00E1FF]/10 px-6 py-2 text-sm font-semibold text-[#00E1FF] transition-all duration-300 hover:bg-[#00E1FF]/20 hover:shadow-[0_0_20px_rgba(0,225,255,0.5)]"
          >
            {showContainerManager
              ? "HIDE INSTANCE MANAGER"
              : "MANAGE INSTANCES"}
          </button>

          {showContainerManager && (
            <div className="mt-6 w-full max-w-2xl rounded-lg border border-[#00E1FF]/60 bg-[#12121270] p-6 shadow-[0_0_20px_rgba(0,225,255,0.2)] backdrop-blur-md">
              <h3 className="font-orbitron mb-4 text-xl font-bold text-[#00E1FF]">
                Running Instances
              </h3>

              {Object.keys(runningContainers).length === 0 ? (
                <p className="font-jura text-center text-gray-400">
                  No running instances
                </p>
              ) : (
                <div className="space-y-3">
                  {Object.entries(runningContainers).map(([ctfId, ports]) => {
                    const challenge = categories
                      .flatMap((cat) => cat.challenges)
                      .find((c) => c.id === ctfId);

                    return (
                      <div
                        key={ctfId}
                        className="flex items-center justify-between rounded-lg border border-[#00E1FF]/40 bg-[#12121250] p-4 backdrop-blur-sm"
                      >
                        <div className="flex-1">
                          <h4 className="font-orbitron text-sm font-semibold text-white">
                            {challenge?.name || `Challenge #${ctfId}`}
                          </h4>
                          {ports.length > 0 && (
                            <div className="mt-1 flex flex-wrap gap-2">
                              {ports.map((port, idx) => (
                                <span
                                  key={idx}
                                  className="font-mono text-xs text-green-400"
                                >
                                  Port: {port}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => handleStopContainer(ctfId)}
                          disabled={stoppingContainer === ctfId}
                          className="font-orbitron ml-4 rounded-lg border border-red-500 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-400 transition-all duration-300 hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {stoppingContainer === ctfId ? "STOPPING..." : "STOP"}
                        </button>
                      </div>
                    );
                  })}

                  <button
                    onClick={handleStopAllContainers}
                    disabled={stoppingContainer === "all"}
                    className="font-orbitron mt-4 w-full rounded-lg border border-red-500 bg-red-500/10 px-6 py-2 text-sm font-semibold text-red-400 transition-all duration-300 hover:bg-red-500/20 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {stoppingContainer === "all"
                      ? "STOPPING ALL..."
                      : "STOP ALL INSTANCES"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {selectedChallenge && (
        <ChallengeOverlay
          challenge={selectedChallenge}
          onClose={closeModal}
          onChallengeCompleted={handleChallengeCompleted}
          runningContainers={runningContainers}
          onContainerUpdate={fetchRunningContainers}
          staticUrl={staticUrls[selectedChallenge.id] || null}
          onStaticUrlUpdate={handleStaticUrlUpdate}
        />
      )}
    </div>
  );
}
