"use client";

import Link from "next/link";
import { useRef, useState } from "react";

const linkStyles = `
  whitespace-nowrap text-[28px]
  text-[#E0E0E0] no-underline
  tracking-[3px]
  transition-all duration-300 ease-in-out
  [text-shadow:0_0_8px_rgba(224,224,224,0.6),_0_0_12px_rgba(224,224,224,0.4)]
  hover:text-[#38c8f5] hover:no-underline
  hover:[text-shadow:0_0_10px_#38c8f5,_0_0_20px_#38c8f5,_0_0_30px_#38c8f5]
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
        .map((letter, index) => {
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
