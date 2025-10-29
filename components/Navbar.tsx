"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import HackerLink from "./HackerText";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(!isHomePage);
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(isHomePage);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const syncAuth = () => {
      const storageToken = localStorage.getItem("authToken");
      setIsAuthenticated(Boolean(storageToken));
    };
    syncAuth();
    window.addEventListener("auth-changed", syncAuth);
    window.addEventListener("storage", syncAuth);
    return () => {
      window.removeEventListener("auth-changed", syncAuth);
      window.removeEventListener("storage", syncAuth);
    };
  }, []);

  useEffect(() => {
    if (isHomePage) {
      if (window.scrollY < 100) {
        setIsDesktopCollapsed(false);
        setIsDesktopExpanded(true);
      } else {
        setIsDesktopCollapsed(true);
        setIsDesktopExpanded(false);
      }
    } else {
      setIsDesktopCollapsed(true);
      setIsDesktopExpanded(false);
    }
    setIsMenuOpen(false);
  }, [pathname, isHomePage]);

  type MenuItem = {
    href: string;
    text: string;
    requiresAuth?: boolean;
    hideWhenAuth?: boolean;
  };

  const baseMenuItems: MenuItem[] = [
    { href: "/#prizes", text: "Prizes" },
    { href: "/#rules", text: "Rules" },
    { href: "/#timeline", text: "Timeline" },
  ];
  const menuItems = baseMenuItems.filter((item) => {
    if (item.requiresAuth) return isAuthenticated;
    if (item.hideWhenAuth) return !isAuthenticated;
    return true;
  });
  const showExpandHint = isMounted && isDesktopCollapsed && !isDesktopExpanded;
  const mobileBrandContent = (
    <>
      <Image
        src="/neon_penguin.svg"
        alt="Penguin Logo"
        width={30}
        height={30}
        priority
        className="drop-shadow-[0_0_10px_rgba(0,225,255,0.3)]"
      />
      <span className="text-sm font-bold tracking-widest text-[#E0E0E0] md:text-base">
        LUGVITC.NET
      </span>
    </>
  );

  useEffect(() => {
    if (!isMounted) return;

    let lastScrollY = window.scrollY;
    const threshold = 100;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsAtTop(currentScrollY < 50);

      if (isHomePage) {
        if (currentScrollY < threshold) {
          setIsDesktopCollapsed(false);
          setIsDesktopExpanded(true);
        } else if (currentScrollY > lastScrollY && currentScrollY > threshold) {
          setIsDesktopCollapsed(true);
          setIsDesktopExpanded(false);
        } else if (currentScrollY < lastScrollY && currentScrollY > threshold) {
          setIsDesktopCollapsed(true);
          setIsDesktopExpanded(false);
        }
      } else {
        if (currentScrollY < threshold) {
          setIsDesktopCollapsed(true);
          setIsDesktopExpanded(false);
        } else if (currentScrollY > lastScrollY && currentScrollY > threshold) {
          setIsDesktopCollapsed(true);
          setIsDesktopExpanded(false);
        } else if (currentScrollY < lastScrollY && currentScrollY > threshold) {
          setIsDesktopCollapsed(true);
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

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.dispatchEvent(new Event("auth-changed"));
    setIsAuthenticated(false);
    setIsMenuOpen(false);
    router.push("/login");
  };

  return (
    <>
      <nav className="fixed top-0 right-0 z-50 hidden h-screen lg:flex">
        <div
          className={`relative flex flex-col items-center justify-between py-8 transition-all duration-500 ease-in-out ${
            isDesktopCollapsed && !isDesktopExpanded
              ? "w-[80px] px-0"
              : "w-[280px] px-6"
          } ${!isMounted ? "opacity-0" : "opacity-100"}`}
        >
          <div
            className={`absolute inset-0 backdrop-blur-sm transition-opacity duration-500 ${
              isDesktopExpanded && !(isHomePage && isAtTop)
                ? "opacity-100"
                : "opacity-0"
            }`}
          ></div>

          <div
            className={`absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-transparent via-[#00E1FF] to-transparent opacity-50 ${!isDesktopExpanded ? "opacity-0" : ""}`}
          ></div>

          <div
            className={`absolute top-1/2 right-4 -translate-y-1/2 transition-all duration-500 ${
              isDesktopCollapsed && !isDesktopExpanded
                ? "pointer-events-auto scale-100 opacity-100"
                : "pointer-events-none scale-75 opacity-0"
            }`}
          >
            <button
              onClick={toggleDesktopMenu}
              className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-[#00E1FF]/60 bg-black/70 shadow-[0_0_20px_rgba(0,225,255,0.35)]"
              aria-label="Expand menu"
              aria-expanded={isDesktopExpanded}
            >
              <div className="absolute inset-0 rounded-full bg-[#00E1FF] opacity-25 blur-lg transition-opacity group-hover:opacity-50"></div>
              <svg
                className="relative z-10 h-7 w-7 text-[#00E1FF] transition-transform"
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
              aria-expanded={isDesktopExpanded}
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

          <div
            className={`flex flex-col items-center gap-4 transition-all duration-500 ${
              isDesktopCollapsed && !isDesktopExpanded
                ? "pointer-events-none scale-95 opacity-0"
                : "pointer-events-auto scale-100 opacity-100"
            }`}
          >
            <div className="group relative">
              <div className="absolute inset-0 rounded-full bg-[#00E1FF] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30"></div>
              <Link href="/">
                <Image
                  src="/neon_penguin.svg"
                  alt="Penguin Logo"
                  width={isDesktopExpanded ? 100 : 60}
                  height={isDesktopExpanded ? 100 : 60}
                  priority
                  className="relative drop-shadow-[0_0_15px_rgba(0,225,255,0.3)] transition-all duration-500 hover:scale-105"
                />
              </Link>
            </div>

            <div
              className={`relative overflow-hidden text-center text-xl font-bold tracking-[0.3em] whitespace-nowrap text-[#E0E0E0] transition-all duration-500 ${
                isDesktopExpanded
                  ? "max-w-full opacity-100"
                  : "max-w-0 opacity-0"
              }`}
            >
              <Link href="/">
                <span className="relative z-10 text-[#00E1FF]">
                  Cyber-0-Day
                </span>
              </Link>
            </div>
          </div>

          <ul
            className={`flex list-none flex-col gap-8 overflow-hidden p-0 transition-all duration-500 ${
              isDesktopCollapsed && !isDesktopExpanded
                ? "pointer-events-none max-h-0 scale-75 opacity-0"
                : "pointer-events-auto max-h-[500px] scale-100 opacity-100"
            }`}
          >
            {menuItems.map((item, index) => (
              <li key={item.href} className="group relative whitespace-nowrap">
                <div className="absolute top-1/2 left-[-20px] h-[2px] w-0 -translate-y-1/2 bg-[#00E1FF] shadow-[0_0_10px_#00E1FF] transition-all duration-300 group-hover:w-3"></div>
                <HackerLink href={item.href} text={item.text} />
              </li>
            ))}
            {isAuthenticated && (
              <li className="group relative whitespace-nowrap">
                <div className="absolute top-1/2 left-[-20px] h-[2px] w-0 -translate-y-1/2 bg-[#00E1FF] shadow-[0_0_10px_#00E1FF] transition-all duration-300 group-hover:w-3"></div>
                <button onClick={handleLogout}>
                  <HackerLink href="" text="Logout" />
                </button>
              </li>
            )}
          </ul>

          <div
            className={`flex flex-col items-center gap-2 overflow-hidden transition-all duration-500 ${
              isDesktopCollapsed && !isDesktopExpanded
                ? "pointer-events-none max-h-0 scale-75 opacity-0"
                : "pointer-events-auto max-h-[100px] scale-100 opacity-100"
            }`}
          >
            <div className="h-16 w-[1px] bg-gradient-to-b from-[#00E1FF] to-transparent"></div>
            <div className="h-2 w-2 animate-pulse rounded-full bg-[#00E1FF] shadow-[0_0_10px_#00E1FF]"></div>
          </div>
        </div>
      </nav>

      <nav
        className="fixed top-0 right-0 left-0 z-50 lg:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div className="relative border-b border-[#00E1FF]/20 bg-black/10 backdrop-blur-md">
          <div className="flex items-center justify-between px-6 py-4">
            {isMenuOpen ? (
              <Link
                href="/"
                className="flex items-center gap-3"
                onClick={(event) => event.stopPropagation()}
              >
                {mobileBrandContent}
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                {mobileBrandContent}
              </div>
            )}
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
                    isMenuOpen ? "opacity-0" : "-my-0.5 opacity-100"
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
              {isAuthenticated && (
                <li
                  className="border-l-2 border-transparent pl-4 transition-all hover:border-[#00E1FF]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="absolute top-1/2 left-[-20px] h-[2px] w-0 -translate-y-1/2 bg-[#00E1FF] shadow-[0_0_10px_#00E1FF] transition-all duration-300 group-hover:w-3"></div>
                  <button onClick={handleLogout}>
                    <HackerLink href="" text="Logout" />
                  </button>
                </li>
              )}
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
