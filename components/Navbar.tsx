"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import HackerLink from "./HackerText";

export default function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsDesktopExpanded(isHomePage);
  }, [isHomePage]);

  const menuItems = [
    { href: "/signup", text: "Sign Up" },
    { href: "#timeline", text: "Timeline" },
    { href: "#rules", text: "Rules" },
    { href: "/leaderboard", text: "Leaderboard" },
    { href: "/", text: "Prizes" },
  ];

  useEffect(() => {
    if (!isMounted) return;

    let lastScrollY = window.scrollY;
    const threshold = 100;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsAtTop(currentScrollY < 50);

      if (isHomePage) {
        if (currentScrollY < threshold) {
          setIsDesktopExpanded(true);
        } else if (currentScrollY > lastScrollY) {
          setIsDesktopExpanded(false);
        }
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage, isMounted]);

  const toggleDesktopMenu = () => {
    setIsDesktopExpanded(!isDesktopExpanded);
  };

  const handleDesktopMouseEnter = () => {
    setIsDesktopExpanded(true);
  };

  const handleDesktopMouseLeave = () => {
    if (!isHomePage) setIsDesktopExpanded(false);
  };

  const shouldShowBlur = !isHomePage || !isAtTop;

  return (
    <>
      <nav className="fixed top-0 right-0 z-50 hidden h-screen lg:flex">
        <div
          onMouseEnter={handleDesktopMouseEnter}
          onMouseLeave={handleDesktopMouseLeave}
          className={`relative flex flex-col items-center justify-between py-8 transition-all duration-500 ease-in-out ${
            isDesktopExpanded ? "w-[280px] px-6" : "w-[80px] px-0"
          } ${!isMounted ? "opacity-0" : "opacity-100"}`}
        >
          <div
            className={`absolute inset-0 backdrop-blur-sm transition-opacity duration-500 ${
              isDesktopExpanded ? "opacity-100" : "opacity-0"
            }`}
          ></div>

          <div
            className={`absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-transparent via-[#00E1FF] to-transparent opacity-50 ${!isDesktopExpanded ? "opacity-0" : ""}`}
          ></div>

          <div
            className={`absolute top-1/2 right-4 -translate-y-1/2 transition-all duration-500 ${
              !isDesktopExpanded
                ? "pointer-events-auto scale-100 opacity-100"
                : "pointer-events-none scale-75 opacity-0"
            }`}
          >
            <button
              onClick={toggleDesktopMenu}
              className="group relative flex h-12 w-12 items-center justify-center"
              aria-label="Expand menu"
            >
              <svg
                className="relative z-10 h-6 w-6 text-[#00E1FF] transition-transform group-hover:scale-110"
                fill="none"
                strokeWidth="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>

          <div
            className={`absolute top-1/2 right-4 -translate-y-1/2 transition-all duration-500 ${
              isDesktopExpanded && !(isHomePage && isAtTop)
                ? "pointer-events-auto scale-100 opacity-100"
                : "pointer-events-none scale-75 opacity-0"
            }`}
          >
            <button
              onClick={toggleDesktopMenu}
              className="group relative flex h-12 w-12 items-center justify-center"
              aria-label="Collapse menu"
            >
              <div className="absolute inset-0 rounded-full bg-[#00E1FF] opacity-20 blur-lg transition-opacity group-hover:opacity-40"></div>
              <svg
                className="relative z-10 h-6 w-6 text-[#00E1FF] transition-transform group-hover:scale-110"
                fill="none"
                strokeWidth="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-col items-center gap-4 transition-all duration-500">
            {isHomePage && (
              <div className="group relative">
                <div className="absolute inset-0 rounded-full bg-[#00E1FF] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30"></div>
                <Image
                  src="/neon_penguin.svg"
                  alt="Penguin Logo"
                  width={isDesktopExpanded ? 100 : 60}
                  height={isDesktopExpanded ? 100 : 60}
                  priority
                  className="relative drop-shadow-[0_0_15px_rgba(0,225,255,0.3)] transition-all duration-500 hover:scale-105"
                />
              </div>
            )}

            <div
              className={`relative overflow-hidden text-center text-xl font-bold tracking-[0.3em] whitespace-nowrap text-[#E0E0E0] transition-all duration-500 ${
                isDesktopExpanded
                  ? "max-w-full opacity-100"
                  : "max-w-0 opacity-0"
              }`}
            >
              <span className="relative z-10 text-[#00E1FF]">LUGVITC.NET</span>
            </div>
          </div>

          <ul
            className={`flex list-none flex-col gap-8 overflow-hidden p-0 transition-all duration-500 ${
              isDesktopExpanded
                ? "pointer-events-auto max-h-[500px] scale-100 opacity-100"
                : "pointer-events-none max-h-0 scale-75 opacity-0"
            }`}
          >
            {menuItems.map((item, index) => (
              <li key={item.href} className="group relative whitespace-nowrap">
                <div className="absolute top-1/2 left-[-20px] h-[2px] w-0 -translate-y-1/2 bg-[#00E1FF] shadow-[0_0_10px_#00E1FF] transition-all duration-300 group-hover:w-3"></div>
                <HackerLink href={item.href} text={item.text} />
              </li>
            ))}
          </ul>

          <div
            className={`flex flex-col items-center gap-2 overflow-hidden transition-all duration-500 ${
              isDesktopExpanded
                ? "pointer-events-auto max-h-[100px] scale-100 opacity-100"
                : "pointer-events-none max-h-0 scale-75 opacity-0"
            }`}
          >
            <div className="h-16 w-[1px] bg-gradient-to-b from-[#00E1FF] to-transparent"></div>
            <div className="h-2 w-2 animate-pulse rounded-full bg-[#00E1FF] shadow-[0_0_10px_#00E1FF]"></div>
          </div>
        </div>
      </nav>

      <nav className="fixed top-0 right-0 left-0 z-50 lg:hidden">
        <div className="relative border-b border-[#00E1FF]/20 bg-black/10 backdrop-blur-md">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              {isHomePage && (
                <Image
                  src="/neon_penguin.svg"
                  alt="Penguin Logo"
                  width={30}
                  height={30}
                  priority
                  className="drop-shadow-[0_0_10px_rgba(0,225,255,0.3)]"
                />
              )}
              <span className="text-sm font-bold tracking-widest text-[#E0E0E0] md:text-base">
                LUGVITC.NET
              </span>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative h-10 w-10 focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span
                  className={`block h-0.5 w-6 bg-[#00E1FF] shadow-[0_0_5px_#00E1FF] transition-all duration-300 ${
                    isMenuOpen ? "translate-y-0 rotate-45" : "-translate-y-2"
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-6 bg-[#00E1FF] shadow-[0_0_5px_#00E1FF] transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : "my-1.5 opacity-100"
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-6 bg-[#00E1FF] shadow-[0_0_5px_#00E1FF] transition-all duration-300 ${
                    isMenuOpen ? "translate-y-0 -rotate-45" : "translate-y-2"
                  }`}
                ></span>
              </div>
            </button>
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <ul className="flex list-none flex-col gap-4 px-6 pt-2 pb-6">
              {menuItems.map((item) => (
                <li
                  key={item.href}
                  className="border-l-2 border-transparent pl-4 transition-all hover:border-[#00E1FF]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <HackerLink href={item.href} text={item.text} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <style jsx>{`
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
