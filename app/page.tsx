import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      <div className="pointer-events-none absolute top-[75vh] left-0 z-[-1] h-[25vh] w-full bg-gradient-to-b from-transparent to-[#0088DC61]"></div>

      <div className="pointer-events-none absolute top-[100vh] left-0 z-[-1] h-[25vh] w-full bg-gradient-to-b from-[#0088DC61] to-transparent"></div>

      <div className="flex min-h-dvh w-full items-center justify-center p-5 md:items-end md:justify-start md:p-8 lg:p-10">
        <Image
          src="/title-card.svg"
          alt="Cyber-0-Day 4.0 Title Card"
          width={1000}
          height={600}
        />
      </div>

      <div className="font-jura my-20 flex flex-col justify-center gap-3 text-center text-3xl font-bold uppercase md:my-32 md:text-5xl lg:text-7xl">
        <p>VIT Chennai&apos;s</p>
        <p>Biggest Hackathon</p>
      </div>

      <div className="font-jura flex justify-center gap-10 py-20 text-center text-2xl font-bold tracking-tight md:gap-20 md:text-4xl lg:gap-96 lg:text-5xl">
        <div>
          <p>200+</p>
          <p
            style={{
              WebkitTextStroke: "1px white",
              WebkitTextFillColor: "transparent",
            }}
          >
            Hackers
          </p>
        </div>
        <div
          className="text-[#00E1FF]"
          style={{ filter: "drop-shadow(0 0 1rem #00E1FF)" }}
        >
          <p>₹20,000+</p>
          <p
            style={{
              WebkitTextStroke: "1px #00E1FF",
              WebkitTextFillColor: "transparent",
            }}
          >
            Prizes
          </p>
        </div>
        <div>
          <p className="font-orbitron">24</p>
          <p
            style={{
              WebkitTextStroke: "1px white",
              WebkitTextFillColor: "transparent",
            }}
          >
            Hours
          </p>
        </div>
      </div>

      <div className="font-jura mx-5 my-20 flex flex-col justify-center gap-5 text-center font-bold uppercase">
        <div
          className="text-3xl text-[#00E1FF] md:text-4xl lg:text-6xl"
          style={{ filter: "drop-shadow(0 0 2rem #00E1FF)" }}
        >
          Enter the world of cybersecurity
        </div>
        <div className="text-xl md:text-2xl lg:text-3xl">
          Tailor made jeopardy-style CTFs and workshops
        </div>
      </div>
    </div>
  );
}
