import Categories from "@/components/Categories";
import Timeline from "@/components/Timeline";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative">
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
        <p>Biggest CyberSecurity Event</p>
      </div>

      <div
        id="prizes"
        className="font-jura flex justify-center gap-10 py-20 text-center text-2xl font-bold tracking-tight md:gap-20 md:text-4xl lg:gap-96 lg:text-5xl"
      >
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
          style={{
            filter:
              "drop-shadow(0 0 5rem #00E1FF) drop-shadow(0 0 10rem #00E1FF)",
          }}
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
          style={{
            filter:
              "drop-shadow(0 0 5rem #00E1FF) drop-shadow(0 0 10rem #00E1FF)",
          }}
        >
          Enter the world of cybersecurity
        </div>
        <div className="text-xl md:text-2xl lg:text-3xl">
          Tailor made jeopardy-style CTFs and workshops from Pentathon
          Finalists!
        </div>
      </div>

      <Categories />

      <div className="font-jura mx-5 my-20 flex flex-col justify-center gap-5 font-bold uppercase">
        <div
          id="rules"
          className="text-center text-3xl text-[#00E1FF] md:text-4xl lg:text-6xl"
          style={{
            filter:
              "drop-shadow(0 0 2rem #00E1FF) drop-shadow(0 0 5rem #00E1FF)",
          }}
        >
          The Rules
        </div>
        <div className="mx-auto flex max-w-5xl justify-center p-5 text-xl md:text-2xl lg:text-3xl">
          <ol className="flex w-full list-decimal flex-col gap-3 text-left">
            <li>Offline Overnight Jeopardy-style CTF</li>
            <li>
              Categories: Web, OSINT, Binary, Reversing, Forensics,
              Cryptography, Miscellaneous
            </li>
            <li>Flag format: c0d&#123;__&#125;</li>
            <li>
              Teams of upto 3 members can be formed on the day of the event
            </li>
            <li>Points will be dynamic depending on number of solves</li>
            <li>Flag sharing is not permitted (Good luck doing that ;)</li>
          </ol>
        </div>
      </div>
      <div
        id="timeline"
        className="font-jura my-20 text-center text-3xl font-bold text-[#00E1FF] uppercase md:text-4xl lg:text-6xl"
        style={{
          filter: "drop-shadow(0 0 2rem #00E1FF) drop-shadow(0 0 5rem #00E1FF)",
        }}
      >
        The Timeline
      </div>
      <Timeline />

      <div className="flex flex-col items-center justify-center gap-2">
        <Image
          src="/title-card.svg"
          alt="Cyber-0-Day 4.0 Title Card"
          width={1000}
          height={200}
        />
        <div
          className="font-orbitron rounded-lg border-2 border-[#00E1FF] text-2xl text-[#00E1FF] uppercase transition-all duration-200 hover:bg-[#00E1FF] hover:text-black"
          style={{
            filter:
              "drop-shadow(0 0 1rem #FFFFFF) drop-shadow(0 0 2rem #FFFFFF)",
          }}
        >
          <div className="px-8 py-1">
            <Link href="/signup">Register</Link>
          </div>
        </div>
        <div className="m-10 max-w-2xs text-center text-2xl font-bold">
          Don&apos;t miss the ultimate hacking experience of the year
        </div>
      </div>
    </div>
  );
}
