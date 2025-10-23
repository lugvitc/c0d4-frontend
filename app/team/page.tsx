"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TeamDetailsPage() {
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState([{ name: "", registrationID: "" }]);
  const router = useRouter();

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

  const handleSubmit = () => {
    console.log({ teamName, members });
  };

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    const teamData = { teamName, members };
    console.log("Team Created:", teamData);
    router.push("/success");
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
          src="/title-card.svg"
          alt="Title Card"
          width={500}
          height={150}
        />
      </div>

      <div className="no-scrollbar absolute top-0 left-0 flex h-full w-1/2 flex-col items-center justify-center overflow-y-scroll bg-white/5 text-center backdrop-blur-lg">
        {/* Heading */}
        <h1
          className="mb-8 text-center text-6xl font-semibold tracking-wider"
          style={{
            fontFamily: "var(--font-orbitron)",
            textShadow:
              "0 0 20px #00E1FF, 0 0 40px #00E1FF, 0 0 60px #00E1FF, 0 0 80px #00E1FF",
          }}
        >
          CREATE A TEAM
        </h1>

        {/* Form */}
        <form
          className="flex flex-col items-center justify-center gap-4"
          onSubmit={handleSubmit}
        >
          {/* Team Name */}
          <div className="flex w-[400px] flex-col items-start">
            <label
              htmlFor="teamName"
              className="text-left text-lg text-gray-400"
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
                className="text-left text-lg text-gray-400"
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
                  className="mt-2 cursor-pointer self-end rounded-md border border-gray-500 bg-transparent px-4 py-1 font-black text-white transition-all duration-300 hover:bg-white hover:text-black"
                  style={{
                    fontFamily: "var(--font-jura)",
                  }}
                >
                  Delete Member
                </button>
              )}
            </div>
          ))}

          {/* Buttons */}
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
          <button
            type="button"
            onClick={handleCreateTeam}
            className="mt-4 cursor-pointer rounded-lg border border-white bg-transparent px-6 py-2 font-black text-white transition-all duration-300 hover:bg-white hover:text-black"
            style={{
              fontFamily: "var(--font-orbitron)",
              width: "400px",
            }}
          >
            Create Team
          </button>
        </form>
      </div>
    </div>
  );
}
