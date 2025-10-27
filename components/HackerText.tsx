"use client";

import Link from "next/link";
import { useRef, useState } from "react";

const linkStyles = `
  whitespace-nowrap text-2xl
  text-[#E0E0E0] no-underline
  tracking-wider
  transition-all duration-300 ease-in-out
  hover:text-[#38c8f5] hover:no-underline
  select-none
`;

const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!<>-_\\/[]{}—=+*^?#";

export default function HackerLink({
  href,
  text,
}: {
  href: string;
  text: string;
}) {
  const [displayedText, setDisplayedText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  function stopScramble() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  const handleMouseOver = () => {
    stopScramble();
    let iteration = 0;

    intervalRef.current = setInterval(() => {
      const newText = text
        .split("")
        .map((_, index) => {
          if (index < iteration) {
            return text[index];
          }
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplayedText(newText);

      if (iteration >= text.length) {
        stopScramble();
        setDisplayedText(newText);
      }

      iteration += 1 / 3;
    }, 30);
  };

  const handleMouseOut = () => {
    stopScramble();
    setDisplayedText(text);
  };

  return (
    <Link
      href={href}
      className={linkStyles}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {displayedText}
    </Link>
  );
}
