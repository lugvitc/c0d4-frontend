"use client";

import { usePathname } from "next/navigation";

export default function BackgroundVideo() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <video
      className={`${isHomePage ? "absolute" : "fixed"} -z-10 h-full w-full object-cover blur-sm`}
      autoPlay
      loop
      muted
    >
      <source src="/background.mp4" type="video/mp4" />
    </video>
  );
}
