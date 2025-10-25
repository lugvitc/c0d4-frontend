"use client";

import ChallengeCard from "@/components/ChallengeCard";
import ChallengeOverlay from "@/components/ChallengeOverlay";
import axios from "axios";
import { useEffect, useState } from "react";

interface Challenge {
  id: string;
  name: string;
  points: number;
  description: string;
  author: string;
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

// Category mapping based on tags
const CATEGORY_MAP: Record<number, string> = {
  1: "WEB EXPLOITATION",
  2: "BINARY EXPLOITATION",
  3: "FORENSICS",
  4: "OSINT",
  5: "REVERSING",
};

export default function ChallengesPage() {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(
    null,
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setLoading(true);

        const response = await axios.get<ApiChallenge[]>(
          "https://dev.lugvitc.net/api/ctf/list",
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("authToken")}`,
            },
          },
        );

        const categoryMap = new Map<number, Challenge[]>();

        response.data.forEach((apiChallenge) => {
          const tagId = apiChallenge.tags;

          if (!categoryMap.has(tagId)) {
            categoryMap.set(tagId, []);
          }

          const challenge: Challenge = {
            id: apiChallenge.id.toString(),
            name: apiChallenge.name,
            points: apiChallenge.points,
            description: apiChallenge.description,
            author: apiChallenge.author,
          };

          categoryMap.get(tagId)?.push(challenge);
        });

        const categoriesArray: Category[] = Array.from(
          categoryMap.entries(),
        ).map(([tagId, challenges]) => ({
          id: tagId.toString(),
          name: CATEGORY_MAP[tagId] || `CATEGORY ${tagId}`,
          challenges,
        }));

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

  const closeModal = () => {
    setSelectedChallenge(null);
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
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
          <h1 className="font-orbitron mb-8 text-4xl font-bold tracking-widest md:text-6xl">
            CHALLENGES
          </h1>
          <div className="text-xl text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-16 md:px-8 lg:px-16">
        <h1 className="font-orbitron mb-4 text-4xl font-bold tracking-widest md:text-6xl">
          CHALLENGES
        </h1>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20">
        {categories.map((category) => (
          <div key={category.id} className="mb-16">
            <div className="mb-6 flex items-center gap-4">
              <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-[#00E1FF] to-transparent"></div>
              <h2 className="font-orbitron text-2xl font-bold tracking-wider text-[#00E1FF] md:text-3xl">
                {category.name}
              </h2>
              <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-[#00E1FF] to-transparent"></div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {category.challenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  id={challenge.id}
                  name={challenge.name}
                  points={challenge.points}
                  onClick={() => setSelectedChallenge(challenge)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedChallenge && (
        <ChallengeOverlay challenge={selectedChallenge} onClose={closeModal} />
      )}
    </div>
  );
}
