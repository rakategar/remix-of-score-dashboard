// Generators for placeholder photos/covers across all dashboards.
// Avatars use a curated pool of formal business portraits from Unsplash
// so every user gets a professional-looking headshot.

const slug = (s: string) => encodeURIComponent(s.trim().toLowerCase().replace(/\s+/g, "-"));

// Curated formal business portrait pool (Unsplash, free to use).
// Mixed gender, mixed background — all professional attire / headshot style.
const FORMAL_PORTRAITS: string[] = [
  "https://images.unsplash.com/photo-1560250097-0b93528c311a", // man suit
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2", // woman blazer
  "https://images.unsplash.com/photo-1556157382-97eda2d62296", // woman professional
  "https://images.unsplash.com/photo-1568602471122-7832951cc4c5", // man suit glasses
  "https://images.unsplash.com/photo-1580489944761-15a19d654956", // woman smiling
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", // man portrait
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330", // woman portrait
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7", // man casual formal
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80", // woman portrait
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e", // man business
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2", // woman headshot
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e", // man headshot
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb", // woman headshot
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce", // man suit
  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f", // man portrait
  "https://images.unsplash.com/photo-1554151228-14d9def656e4", // woman portrait
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce", // woman professional
  "https://images.unsplash.com/photo-1545167622-3a6ac756afa4", // man asian professional
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e", // woman asian professional
  "https://images.unsplash.com/photo-1521119989659-a83eee488004", // man asian suit
];

// Deterministic hash so the same seed always resolves to the same portrait.
const hash = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
};

export const avatarUrl = (seed: string, size = 160) => {
  const base = FORMAL_PORTRAITS[hash(seed) % FORMAL_PORTRAITS.length];
  return `${base}?auto=format&fit=facearea&facepad=2.6&w=${size}&h=${size}&q=70`;
};

export const coverUrl = (seed: string, w = 800, h = 500) =>
  `https://picsum.photos/seed/${slug(seed)}/${w}/${h}`;

// Curated cover images that match the training context.
export const trainingCovers: Record<string, string> = {
  "ace-batch-3":
    "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=900&q=70",
  "ace-batch-4":
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=70",
  "advanced-sales":
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=70",
  "wealth-advisory":
    "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=900&q=70",
};

export const classCover = (id: string) => trainingCovers[id] ?? coverUrl(id, 900, 500);
