import { avatarUrl } from "@/lib/dummy-images";

interface AvatarProps {
  seed: string;
  initials: string;
  colorClass?: string;
  size?: number;
  className?: string;
  rounded?: string; // e.g. "rounded-full" | "rounded-2xl"
  textClass?: string;
}

/**
 * Photo avatar with initials fallback. Renders the colored circle
 * with the initials as background, then layers an <img> on top.
 * If the image fails (offline), initials remain visible.
 */
export function Avatar({
  seed,
  initials,
  colorClass = "bg-slate-400",
  size = 36,
  className = "",
  rounded = "rounded-full",
  textClass = "text-white text-xs font-semibold",
}: AvatarProps) {
  return (
    <div
      className={`${colorClass} ${rounded} relative overflow-hidden flex items-center justify-center flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <span className={textClass}>{initials}</span>
      <img
        src={avatarUrl(seed, Math.max(size * 2, 128))}
        alt={seed}
        loading="lazy"
        className={`absolute inset-0 w-full h-full object-cover ${rounded}`}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
    </div>
  );
}
