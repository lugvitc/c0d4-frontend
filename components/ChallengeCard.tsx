interface ChallengeCardProps {
  id: string;
  name: string;
  points: number;
  onClick: () => void;
  isCompleted?: boolean;
}

const difficultyStyles = {
  easy: "border-green-500/40 bg-green-500/10 text-green-400",
  medium: "border-yellow-500/40 bg-yellow-500/10 text-yellow-400",
  hard: "border-red-500/40 bg-red-500/10 text-red-400",
};

const getDifficulty = (points: number) => {
  if (points <= 200) return { label: "Easy", className: difficultyStyles.easy };
  if (points <= 400)
    return { label: "Medium", className: difficultyStyles.medium };
  return { label: "Hard", className: difficultyStyles.hard };
};

export default function ChallengeCard({
  name,
  points,
  onClick,
  isCompleted = false,
}: ChallengeCardProps) {
  const difficulty = getDifficulty(points);

  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-lg border p-6 backdrop-blur-md transition-all duration-300 ${
        isCompleted
          ? "cursor-default border-green-500/60 bg-green-500/10"
          : "cursor-pointer border-[#00E1FF]/60 bg-[#12121270] hover:-translate-y-1 hover:border-[#00E1FF] hover:shadow-[0_0_20px_rgba(0,225,255,0.3)]"
      }`}
    >
      {!isCompleted && (
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-br from-[#00E1FF]/10 to-transparent"></div>
        </div>
      )}

      {isCompleted && (
        <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full border border-green-500/40 bg-green-500/20">
          <svg
            className="h-5 w-5 text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      )}

      <div className="relative z-10">
        <h3
          className={`font-orbitron mb-3 text-xl font-semibold ${
            isCompleted ? "text-green-400" : "text-white"
          }`}
        >
          {name}
        </h3>

        <div className="mb-3 flex items-center justify-between">
          <span
            className={`font-jura text-sm ${
              isCompleted ? "text-green-400" : "text-[#00E1FF]"
            }`}
          >
            {points} pts
          </span>
          <span
            className={`font-jura rounded-full border px-3 py-1 text-xs tracking-wide uppercase ${difficulty.className}`}
          >
            {difficulty.label}
          </span>
        </div>

        <div
          className={`h-[2px] w-full bg-gradient-to-r opacity-50 ${
            isCompleted
              ? "from-green-500 via-transparent to-green-500"
              : "from-[#00E1FF] via-transparent to-[#00E1FF]"
          }`}
        ></div>
      </div>
    </div>
  );
}
