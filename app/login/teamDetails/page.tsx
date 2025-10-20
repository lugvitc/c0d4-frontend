// src/app/login/team_details/page.tsx
"use client";

import { useState } from "react";

export default function TeamDetailsPage() {
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState([{ name: "", email: "" }]);

  const addMember = () => {
    setMembers([...members, { name: "", email: "" }]);
  };

  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...members];
    updated[index] = { ...updated[index], [field]: value };
    setMembers(updated);
  };

  const handleCreateTeam = () => {
    const teamData = { teamName, members };
    console.log("Team Created:", teamData);
  };

  return (
    <div className="flex min-h-screen items-center justify-start px-20">
      <div className="w-full max-w-md rounded-2xl p-8 backdrop-blur-md">
        <h1 className="font-orbitron mb-8 text-5xl text-blue-300 drop-shadow-[0_0_10px_#60a5fa]">
          Create A Team
        </h1>

        <div className="space-y-6">
          {/* Team Name */}
          <div>
            <label
              htmlFor="teamName"
              className="font-jura mb-1 block text-sm text-gray-500"
            >
              Team Name
            </label>
            <input
              id="teamName"
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-transparent p-2 text-white focus:ring-1 focus:ring-gray-400 focus:outline-none"
              placeholder="Enter team name"
            />
          </div>

          {/* Team Members */}
          {members.map((member, index) => (
            <div key={index} className="space-y-2">
              <label className="font-jura mb-1 block text-sm text-gray-500">
                Team Member {index + 1} {index === 0 && "(Team Lead)"}
              </label>
              <input
                type="text"
                value={member.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
                placeholder="Name"
                className="w-full rounded-lg border border-gray-300 bg-transparent p-2 text-white focus:ring-1 focus:ring-gray-400 focus:outline-none"
              />
              <input
                type="email"
                value={member.email}
                onChange={(e) => handleChange(index, "email", e.target.value)}
                placeholder="Email"
                className="w-full rounded-lg border border-gray-300 bg-transparent p-2 text-white focus:ring-1 focus:ring-gray-400 focus:outline-none"
              />
            </div>
          ))}

          {/* Buttons */}
          <div className="mt-6 flex justify-between">
            <button
              onClick={addMember}
              className="rounded-lg border border-gray-400 bg-transparent px-4 py-2 text-white transition hover:bg-gray-800/30"
            >
              + Add Member
            </button>
            <button
              onClick={handleCreateTeam}
              className="rounded-lg border border-gray-400 bg-transparent px-4 py-2 text-white transition hover:bg-gray-800/30"
            >
              Create Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
