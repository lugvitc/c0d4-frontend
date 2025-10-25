interface TeamCardProps {
  name: string;
  points: number;
  rank: number;
}

export default function TeamCard({ name, points, rank }: TeamCardProps) {
  return (
    <div className="group relative flex items-center gap-4 overflow-hidden rounded-r-full border-l-4 border-[#00E1FF]/30 bg-gradient-to-r from-[#00E1FF]/10 via-[#00E1FF]/5 to-transparent p-3 backdrop-blur-md transition-all duration-500 hover:scale-[1.02] hover:border-[#00E1FF]/60 hover:shadow-[0_0_20px_rgba(0,225,255,0.2)] md:gap-6">
      <div className="flex-shrink-0">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#00E1FF]/30 bg-black/40 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-[#00E1FF]/60 md:h-14 md:w-14">
          <span className="font-orbitron text-lg font-bold text-[#00E1FF] md:text-xl">
            {rank}
          </span>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="font-orbitron truncate text-lg font-bold text-white transition-all duration-300 group-hover:text-[#00E1FF] md:text-xl">
            {name}
          </h3>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="font-orbitron text-2xl font-bold text-[#00E1FF] md:text-3xl">
            {points.toFixed(0)}
          </span>
          <span className="font-jura text-sm text-gray-400">pts</span>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-[#00E1FF]/10 via-[#00E1FF]/5 to-transparent"></div>
      </div>
    </div>
  );
}
