import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="flex min-h-dvh w-full items-center justify-center p-5 md:items-end md:justify-start md:p-8 lg:p-10">
        <Image
          src="/title-card.svg"
          alt="Cyber-0-Day 4.0 Title Card"
          width={1000}
          height={600}
        />
      </div>
    </div>
  );
}
