// Generators for placeholder photos/covers across all dashboards.
// We use pravatar (faces) for avatars and picsum (random scenes) for covers.

const slug = (s: string) => encodeURIComponent(s.trim().toLowerCase().replace(/\s+/g, "-"));

export const avatarUrl = (seed: string, size = 160) =>
  `https://i.pravatar.cc/${size}?u=${slug(seed)}`;

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
