"use client";

import { useEffect, useRef, useState } from "react";

interface TimelineEvent {
  time: string;
  title: string;
  instructor: string;
  tag?: string;
}

const events: TimelineEvent[] = [
  {
    time: "10:00 TO 10:45",
    title: "LINUX BASICS",
    instructor: "BY JOHN DOE",
    tag: "WORKSHOP",
  },
  {
    time: "10:00 TO 11:00",
    title: "WEB EXPLOITATION",
    instructor: "BY JOHN DOE",
    tag: "WORKSHOP",
  },
  {
    time: "10:50 TO 11:35",
    title: "FORENSICS",
    instructor: "BY JOHN DOE",
    tag: "WORKSHOP",
  },
  {
    time: "11:40 TO 12:25",
    title: "OSINT",
    instructor: "BY JOHN DOE",
    tag: "WORKSHOP",
  },
  {
    time: "12:30 TO 13:30",
    title: "LUNCH BREAK",
    instructor: "",
    tag: "BREAK",
  },
  {
    time: "14:00 TO 14:45",
    title: "WEB EXPLOITATION",
    instructor: "BY JOHN DOE",
    tag: "WORKSHOP",
  },
  {
    time: "14:50 TO 15:35",
    title: "REVERSING",
    instructor: "BY JOHN DOE",
    tag: "WORKSHOP",
  },
  {
    time: "15:40 TO 16:25",
    title: "OSINT",
    instructor: "BY JOHN DOE",
    tag: "WORKSHOP",
  },
  {
    time: "16:30 TO 17:15",
    title: "ANDROID",
    instructor: "BY JOHN DOE",
    tag: "WORKSHOP",
  },
];

export default function Timeline() {
  const [lineHeight, setLineHeight] = useState(0);
  const [visibleDots, setVisibleDots] = useState<boolean[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const timelineTop = timelineRef.current.getBoundingClientRect().top;
      const timelineHeight = timelineRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      const scrollProgress = Math.max(
        0,
        Math.min(
          1,
          (windowHeight - timelineTop) / (timelineHeight + windowHeight * 0.5),
        ),
      );

      setLineHeight(scrollProgress * 100);

      const newVisibleDots = dotRefs.current.map((dot) => {
        if (!dot) return false;
        const dotTop = dot.getBoundingClientRect().top;
        return dotTop < windowHeight * 0.7;
      });
      setVisibleDots(newVisibleDots);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="font-jura mx-auto my-20 max-w-4xl px-6" ref={timelineRef}>
      {/* Date header */}
      <div className="mb-12 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#00E1FF]/20"></div>
        <span className="font-orbitron text-sm font-bold tracking-wider text-[#00E1FF]/70 uppercase">
          30 OCTOBER
        </span>
        <div className="h-px flex-1 bg-[#00E1FF]/20"></div>
      </div>

      <div className="relative">
        {/* Timeline line*/}
        <div className="absolute top-0 bottom-0 left-8 w-0.5 bg-[#00E1FF]/30 md:left-1/2"></div>
        <div
          className="absolute top-0 left-8 w-0.5 bg-gradient-to-b from-[#00E1FF] to-[#00E1FF]/50 transition-all duration-300 ease-out md:left-1/2"
          style={{
            height: `${lineHeight}%`,
            boxShadow: "0 0 10px rgba(0, 225, 255, 0.5)",
          }}
        ></div>

        {/* Events */}
        <div className="space-y-12">
          {events.map((event, index) => {
            const isBreak = event.tag === "BREAK";
            const breakIndex = events.findIndex((e) => e.tag === "BREAK");
            const effectiveIndex = index <= breakIndex ? index : index - 1;

            return (
              <div
                key={index}
                className={`relative flex items-start gap-8 ${
                  isBreak
                    ? ""
                    : effectiveIndex % 2 === 0
                      ? "md:flex-row"
                      : "md:flex-row-reverse"
                }`}
              >
                {/*  Dot */}
                {!isBreak ? (
                  <div
                    ref={(el) => {
                      dotRefs.current[index] = el;
                    }}
                    className="absolute left-8 -translate-x-1/2 md:left-1/2"
                  >
                    <div className="relative h-4 w-4 rounded-full border-2 border-[#00E1FF] bg-black shadow-[0_0_10px_rgba(0,225,255,0.5)]">
                      <div
                        className={`absolute inset-0 m-[1px] rounded-full bg-[#00E1FF] transition-transform duration-500 ease-out ${
                          visibleDots[index] ? "scale-100" : "scale-0"
                        }`}
                        style={{
                          boxShadow: visibleDots[index]
                            ? "0 0 15px rgba(0, 225, 255, 0.8)"
                            : "none",
                        }}
                      ></div>
                    </div>
                  </div>
                ) : null}

                {/* Content */}
                {isBreak ? (
                  <div className="ml-20 flex w-full justify-center md:ml-0">
                    <div className="w-full max-w-md rounded-lg border border-[#00E1FF] bg-[#141414]/90 p-8 text-center backdrop-blur-sm transition-all duration-300 hover:border-[#00E1FF] hover:shadow-[0_0_30px_rgba(0,225,255,0.4)]">
                      <div className="mb-3 text-lg font-semibold tracking-wider text-[#00E1FF] uppercase">
                        {event.time}
                      </div>
                      <h3 className="font-orbitron text-2xl font-bold text-white">
                        {event.title}
                      </h3>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`ml-20 flex-1 md:ml-0 ${
                      effectiveIndex % 2 === 0
                        ? "md:pr-12 md:text-right"
                        : "md:pl-12"
                    }`}
                  >
                    <div className="rounded-lg border border-[#00E1FF]/50 bg-[#141414]/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#00E1FF] hover:shadow-[0_0_20px_rgba(0,225,255,0.3)]">
                      {/* Tag */}
                      <div className="mb-3">
                        <span className="inline-block rounded border border-[#00E1FF] bg-[#00E1FF]/5 px-3 py-1 text-xs font-bold tracking-widest text-[#00E1FF] uppercase shadow-[0_0_10px_rgba(0,225,255,0.2)]">
                          {event.tag}
                        </span>
                      </div>

                      <div className="mb-2 text-sm font-semibold tracking-wider text-gray-400 uppercase">
                        {event.time}
                      </div>
                      <h3 className="font-orbitron mb-1 text-xl font-bold text-white">
                        {event.title}
                      </h3>
                      {event.instructor && (
                        <p className="text-sm text-[#00E1FF]">
                          {event.instructor}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {!isBreak && <div className="hidden flex-1 md:block"></div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
