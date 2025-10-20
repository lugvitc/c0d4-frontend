import Image from "next/image";
import Link from "next/link";

export default function SignUp() {
  return (
    <div className="relative flex min-h-screen flex-col items-start justify-center bg-black px-32 py-8">
      <Link
        href="https://lugvitc.net"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-8 right-8 text-lg text-[#00E1FF] transition-colors duration-300 hover:text-white"
        style={{ fontFamily: "var(--font-jura)" }}
      >
        lugvitc.net
      </Link>

      <div className="absolute right-10 bottom-4">
        <Image
          src="/images/titleCard.svg"
          alt="Title Card"
          width={500}
          height={105}
          className=""
        />
      </div>
      <h1
        className="mb-6 ml-36 text-6xl font-semibold tracking-wider"
        style={{
          fontFamily: "var(--font-orbitron)",
          textShadow:
            "0 0 20px #00E1FF, 0 0 40px #00E1FF, 0 0 60px #00E1FF, 0 0 80px #00E1FF",
          width: "400px",
        }}
      >
        SIGN UP
      </h1>

      <form className="ml-23 flex w-fit flex-col gap-4" method="POST">
        <input
          type="text"
          name="userName"
          placeholder="Name"
          className="rounded-lg border-2 border-gray-600 bg-transparent px-4 py-2 text-white placeholder-gray-400 transition-all duration-300 hover:border-[#00E1FF] focus:border-[#00E1FF] focus:outline-none"
          style={{ fontFamily: "var(--font-jura)", width: "400px" }}
        />
        <input
          type="text"
          name="regNo"
          placeholder="Registration Number"
          className="rounded-lg border-2 border-gray-600 bg-transparent px-4 py-2 text-white placeholder-gray-400 transition-all duration-300 hover:border-[#00E1FF] focus:border-[#00E1FF] focus:outline-none"
          style={{ fontFamily: "var(--font-jura)", width: "400px" }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="rounded-lg border-2 border-gray-600 bg-transparent px-4 py-2 text-white placeholder-gray-400 transition-all duration-300 hover:border-[#00E1FF] focus:border-[#00E1FF] focus:outline-none"
          style={{ fontFamily: "var(--font-jura)", width: "400px" }}
          autoComplete="email"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="rounded-lg border-2 border-gray-600 bg-transparent px-4 py-2 text-white placeholder-gray-400 transition-all duration-300 hover:border-[#00E1FF] focus:border-[#00E1FF] focus:outline-none"
          style={{ fontFamily: "var(--font-jura)", width: "400px" }}
        />

        <button
          type="submit"
          className="mt-4 cursor-pointer rounded-lg border border-white bg-transparent px-6 py-2 font-black text-white transition-all duration-300 hover:bg-white hover:text-black"
          style={{
            fontFamily: "var(--font-orbitron)",
            width: "400px",
            fontWeight: "700",
          }}
        >
          Sign Up
        </button>

        <div className="mt-4 -ml-4 text-center">
          <span
            className="text-gray-400"
            style={{ fontFamily: "var(--font-jura)" }}
          >
            Already have an account?
            <span className="mx-1"></span>
            <Link
              href="/?page=signIn"
              className="text-[#00E1FF] underline transition-colors duration-300 hover:text-white"
            >
              Sign In
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
