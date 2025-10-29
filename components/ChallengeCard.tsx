interface ChallengeCardProps {
  id: string;
  name: string;
  points: number;
  onClick: () => void;
}

export default function ChallengeCard({
  name,
  points,
  onClick,
}: ChallengeCardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-lg border border-[#00E1FF]/60 bg-[#12121270] p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#00E1FF] hover:shadow-[0_0_20px_rgba(0,225,255,0.3)]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-br from-[#00E1FF]/10 to-transparent"></div>
      </div>

      <div className="relative z-10">
        <h3 className="font-orbitron mb-3 text-xl font-semibold text-white">
          {name}
        </h3>

        <div className="mb-3">
          <span className="font-jura text-sm text-[#00E1FF]">{points} pts</span>
        </div>

        <div className="h-[2px] w-full bg-gradient-to-r from-[#00E1FF] via-transparent to-[#00E1FF] opacity-50"></div>
      </div>
    </div>
  );
}
