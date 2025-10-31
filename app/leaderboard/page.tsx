"use client";

import TeamCard from "@/components/TeamCard";
import { BACKEND_URL } from "@/lib/constants";
import axios from "axios";
import { useEffect, useState } from "react";

interface TeamData {
  name: string;
  tpoints: number;
}

export default function Leaderboard() {
  const [teams, setTeams] = useState<TeamData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const response = await axios.get<TeamData[]>(
          `${BACKEND_URL}/api/leaderboard`,
        );

        const sortedTeams = response.data.sort((a, b) => b.tpoints - a.tpoints);
        setTeams(sortedTeams);
        setError(null);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
        setError("Failed to load leaderboard. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen px-4 py-16 md:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block">
            <h1 className="font-orbitron text-5xl font-black tracking-tight md:text-6xl lg:text-7xl">
              LEADERBOARD
            </h1>
          </div>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#00E1FF]/20 border-t-[#00E1FF]"></div>
            <p className="font-jura text-lg text-[#00E1FF]">Loading teams...</p>
          </div>
        )}

        {error && (
          <div className="mx-auto max-w-2xl rounded-2xl border border-red-500/50 bg-red-500/10 p-8 text-center backdrop-blur-md">
            <div className="mb-3 text-4xl">⚠️</div>
            <p className="font-jura text-lg text-red-400">{error}</p>
          </div>
        )}

        {!loading && !error && teams.length > 0 && (
          <div className="space-y-3">
            {teams.map((team, index) => (
              <TeamCard
                key={index}
                name={team.name}
                points={team.tpoints}
                rank={index + 1}
              />
            ))}
          </div>
        )}

        {!loading && !error && teams.length === 0 && (
          <div className="mx-auto max-w-2xl rounded-2xl border border-[#00E1FF]/30 bg-[#00E1FF]/5 p-12 text-center backdrop-blur-md">
            <div className="mb-4 text-6xl">🏆</div>
            <h3 className="font-orbitron mb-2 text-2xl font-bold text-white">
              No Teams Yet
            </h3>
            <p className="font-jura text-gray-400">
              The competition hasn&apos;t started. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
