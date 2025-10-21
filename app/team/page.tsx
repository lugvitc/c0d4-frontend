"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function TeamDetailsPage() {
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState([{ name: "", registrationID: "" }]);

  const addMember = () => {
    setMembers([...members, { name: "", registrationID: "" }]);
  };

  const removeMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...members];
    updated[index] = { ...updated[index], [field]: value };
    setMembers(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ teamName, members });
  };

  const handleCreateTeam = () => {
    const teamData = { teamName, members };
    console.log("Team Created:", teamData);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-start justify-center px-32 py-8">
      {/* Top-right link */}
      <Link
        href="https://lugvitc.net"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-8 right-8 text-lg text-[#00E1FF] transition-colors duration-300 hover:text-white"
        style={{
          fontFamily: "var(--font-jura)",
        }}
      >
        lugvitc.net
      </Link>

      {/* Bottom-right title image*/}
      <div className="absolute right-10 bottom-4">
        <Image
          src="/images/titleCard.svg"
          alt="Title Card"
          width={500}
          height={150}
        />
      </div>

      <div className="flex w-[450px] flex-col justify-center rounded-2xl p-8 backdrop-blur-lg">
        {/* Heading */}
        <h1
          className="mb-6 text-6xl font-semibold tracking-wider whitespace-nowrap"
          style={{
            fontFamily: "var(--font-orbitron)",
            textShadow:
              "0 0 20px #00E1FF, 0 0 40px #00E1FF, 0 0 60px #00E1FF, 0 0 80px #00E1FF",
            width: "500px",
          }}
        >
          CREATE A TEAM
        </h1>

        {/* Form */}
        <form
          className="ml-23 flex w-fit flex-col gap-4"
          onSubmit={handleSubmit}
        >
          {/* Team Name */}
          <div className="w-[400px]">
            <label
              htmlFor="teamName"
              className="text-lg text-gray-400"
              style={{ fontFamily: "var(--font-jura)" }}
            >
              Team Name
            </label>
            <input
              id="teamName"
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter your team name"
              className="rounded-lg border-2 border-gray-600 bg-transparent px-4 py-2 text-white placeholder-gray-400 transition-all duration-300 hover:border-[#00E1FF] focus:border-[#00E1FF] focus:outline-none"
              style={{
                fontFamily: "var(--font-jura)",
                width: "400px",
              }}
            />
          </div>

          {/* Team Members */}
          {members.map((member, index) => (
            <div key={index} className="flex flex-col gap-2">
              <label
                className="text-lg text-gray-400"
                style={{ fontFamily: "var(--font-jura)" }}
              >
                Team Member {index + 1} {index === 0 && "(Team Lead)"}
              </label>
              <input
                type="text"
                value={member.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
                placeholder="Full Name"
                className="rounded-lg border-2 border-gray-600 bg-transparent px-4 py-2 text-white placeholder-gray-400 transition-all duration-300 hover:border-[#00E1FF] focus:border-[#00E1FF] focus:outline-none"
                style={{
                  fontFamily: "var(--font-jura)",
                  width: "400px",
                }}
              />
              <input
                type="registrationID"
                value={member.registrationID}
                onChange={(e) =>
                  handleChange(index, "registrationID", e.target.value)
                }
                placeholder="Registration Number"
                className="rounded-lg border-2 border-gray-600 bg-transparent px-4 py-2 text-white placeholder-gray-400 transition-all duration-300 hover:border-[#00E1FF] focus:border-[#00E1FF] focus:outline-none"
                style={{
                  fontFamily: "var(--font-jura)",
                  width: "400px",
                }}
              />

              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeMember(index)}
                  className="mt-2 self-end rounded-md border border-gray-500 bg-transparent px-4 py-1 text-white transition-all duration-300 hover:border-white"
                  style={{
                    fontFamily: "var(--font-jura)",
                  }}
                >
                  Delete Member
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addMember}
            className="mt-4 cursor-pointer rounded-lg border border-white bg-transparent px-6 py-2 font-black text-white transition-all duration-300 hover:bg-white hover:text-black"
            style={{
              fontFamily: "var(--font-orbitron)",
              width: "400px",
            }}
          >
            Add Member
          </button>

          {/* Buttons */}
          <div className="mt-6 flex flex-col gap-3">
            <button
              type="submit"
              onClick={handleCreateTeam}
              className="mt-4 cursor-pointer rounded-lg border border-white bg-transparent px-6 py-2 font-black text-white transition-all duration-300 hover:bg-white hover:text-black"
              style={{
                fontFamily: "var(--font-orbitron)",
                width: "400px",
              }}
            >
              Create Team
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
