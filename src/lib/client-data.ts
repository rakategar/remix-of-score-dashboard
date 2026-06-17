export type ClientRole = "hr_client" | "sponsor" | "manager";

export interface ClientUser {
  id: string;
  initials: string;
  full_name: string;
  role: ClientRole;
  role_label: string;
  organization: string;
  color: string;
  access: "full" | "executive" | "direct_reports";
}

export const DEMO_CLIENTS: ClientUser[] = [
  { id: "c1", initials: "HR", full_name: "Tim HR & L&D BRI Life", role: "hr_client", role_label: "HR / L&D Client", organization: "BRI Life", color: "bg-blue-600", access: "full" },
  { id: "c2", initials: "DS", full_name: "Direktur Setiawan", role: "sponsor", role_label: "Business Sponsor", organization: "BRI Life", color: "bg-slate-700", access: "executive" },
  { id: "c3", initials: "MR", full_name: "Manager Regional Jakarta", role: "manager", role_label: "Manager Regional", organization: "BRI Life — Jakarta Region", color: "bg-emerald-600", access: "direct_reports" },
];

export const PROGRAM_DATA = {
  id: "ace-batch-3",
  title: "Affluent Customer Experience (A.C.E)",
  subtitle: "Program & Certification",
  batch: "Batch 3",
  client: "BRI Life",
  provider: "Primera Karya Sinergia",
  organizer: "Telsindo8",
  location: "Hotel Harris Sentul",
  start_date: "6 Agustus 2025",
  end_date: "8 Agustus 2025",
  duration: "3 Hari",
  status: "completed",
  total_participants: 9,
  passed: 7,
  pass_rate: 77.8,
  avg_score: 77.6,
  satisfaction_pct: 93,
  eval_avg: 4.95,
  trainer_avg: 4.99,
  facilitators: ["Oki T. Wikan", "Arike Agung Widjaja"],
  description:
    "Program strategis untuk mempersiapkan Priority Bancassurance Specialist (PBS) sebagai Trusted Insurance Advisor di segmen affluent. Pelatihan intensif 3 hari mencakup workshop interaktif, simulasi end-to-end, roleplay, coaching clinic, dan akreditasi resmi.",
  objectives: [
    "Meningkatkan kapabilitas PBS dalam financial needs discovery & consultative selling",
    "Menguasai teknik presentasi, objection handling, dan closing yang terstruktur",
    "Menjalankan end-to-end advisory menggunakan framework A.C.E (PREPARE–CONNECT–PRESENT–CLOSE–RETAIN)",
    "Lulus Akreditasi ACE sebagai validasi kompetensi profesional",
  ],
};

export type Category = "kompeten_unggul" | "kompeten" | "perlu_pengembangan";

export interface Participant {
  id: string;
  no: number;
  full_name: string;
  region: string;
  score: number;
  category: Category;
  mbti: string;
  role_model: boolean;
  strength?: string;
  dev_area?: string;
}

export const PARTICIPANTS: Participant[] = [
  { id: "p1", no: 1, full_name: "Nadia Anggraini Putri", region: "Jakarta 1", score: 91, category: "kompeten_unggul", mbti: "ESTJ", role_model: true, strength: "Sangat kuat dalam consultative selling dan probing CEO model", dev_area: "Bisa mengembangkan storytelling emosional yang lebih dalam" },
  { id: "p2", no: 2, full_name: "Sahadatu Chandra", region: "Pekanbaru", score: 88.5, category: "kompeten_unggul", mbti: "ENTJ", role_model: true, strength: "Struktur presentasi sangat terorganisir, closing kuat", dev_area: "Perlu memperhalus pendekatan untuk nasabah tipe Feeling" },
  { id: "p3", no: 3, full_name: "Siska Febriani Sihombing", region: "Jakarta 1", score: 80, category: "kompeten", mbti: "INFJ", role_model: false, strength: "Empati tinggi dan kemampuan mendengar aktif", dev_area: "Trial to close dengan model L.A.S.T masih perlu latihan" },
  { id: "p4", no: 4, full_name: "Stevanus Vebeteo Pradewata", region: "Malang", score: 78.5, category: "kompeten", mbti: "ESTJ", role_model: false, strength: "Disiplin proses, mengikuti framework dengan baik", dev_area: "Fleksibilitas adaptasi flow nasabah masih kaku" },
  { id: "p5", no: 5, full_name: "Indra Putra Apriliana", region: "Jakarta 1", score: 77.5, category: "kompeten", mbti: "ENTP", role_model: false, strength: "Kreatif dalam objection handling", dev_area: "Konsistensi mengikuti urutan ACE perlu diperkuat" },
  { id: "p6", no: 6, full_name: "Azies Koentoro", region: "Jakarta 3", score: 76.5, category: "kompeten", mbti: "ESFJ", role_model: false, strength: "Membangun rapport dengan nasabah dengan cepat", dev_area: "Penguasaan FAB produk lanjutan" },
  { id: "p7", no: 7, full_name: "Brian Bagus Sadewo", region: "Jakarta 1", score: 74.5, category: "kompeten", mbti: "ENTJ", role_model: false, strength: "Orientasi hasil dan target yang kuat", dev_area: "Probing CEO model masih dangkal" },
  { id: "p8", no: 8, full_name: "Juni Rahmansyah", region: "Yogyakarta", score: 64.5, category: "perlu_pengembangan", mbti: "ESTJ", role_model: false, strength: "Komitmen belajar tinggi", dev_area: "Perlu coaching intensif pada seluruh tahapan ACE" },
  { id: "p9", no: 9, full_name: "Monika Caesarany", region: "Jakarta 2", score: 62, category: "perlu_pengembangan", mbti: "ENTJ", role_model: false, strength: "Antusiasme dan energi positif", dev_area: "Penguasaan produk dan struktur framework" },
];

export const MANAGER_DIRECT_REPORT_IDS = ["p1", "p3", "p5", "p7"];

export const EVALUATION_DATA = {
  program_avg: 4.95,
  trainer_avg: 4.99,
  nps: 9.2,
  satisfaction_pct: 93,
  program_items: [
    { label: "Tujuan pelatihan jelas", score: 5.0 },
    { label: "Relevansi materi untuk PBS", score: 4.83 },
    { label: "Membantu jadi Trusted Advisor", score: 5.0 },
    { label: "Urutan penyampaian mudah dipahami", score: 5.0 },
    { label: "Contoh kasus & simulasi efektif", score: 5.0 },
    { label: "Durasi pelatihan sesuai kebutuhan", score: 4.67 },
    { label: "Media & alat bantu efektif", score: 5.0 },
    { label: "Lokasi & fasilitas mendukung", score: 5.0 },
    { label: "Lebih percaya diri pasca pelatihan", score: 5.0 },
    { label: "Kepuasan keseluruhan", score: 5.0 },
  ],
  trainer_items: [
    { label: "Penguasaan materi", score: 5.0 },
    { label: "Gaya penyampaian menarik", score: 5.0 },
    { label: "Mendorong partisipasi aktif", score: 5.0 },
    { label: "Contoh & studi kasus relevan", score: 5.0 },
    { label: "Umpan balik personal", score: 5.0 },
    { label: "Suasana kelas positif", score: 4.97 },
  ],
  qualitative: [
    "Ilmu yang disampaikan sangat bermanfaat dan penyampaian materinya menyenangkan",
    "Cara menarik untuk presentasi depan nasabah — langsung applicable",
    "Mendapatkan pelatihan dan upgrade skill dalam berjualan di segmen affluent",
    "Saya menjadi terpikirkan terhadap hal-hal yang selama ini tidak terpikirkan",
    "Memberikan solusi konkret untuk tantangan sehari-hari sebagai PBS",
  ],
  improvement: [
    "Durasi training bisa lebih lama — 3 hari terasa kurang",
    "Tambahkan sesi khusus tentang Tax & Estate Planning",
    "Lebih banyak roleplay dengan skenario nasabah UHNWI",
  ],
};

export const ORG_INSIGHT = {
  generated_at: "12 Jun 2025",
  model: "claude-haiku-4-5-20251001",
  sections: {
    executive_summary:
      "Program ACE Batch 3 berhasil meningkatkan kompetensi 9 PBS BRI Life dengan tingkat kelulusan 77,8% (7 dari 9 peserta). Dua peserta meraih predikat Kompeten Unggul dan berpotensi menjadi Role Model internal. Evaluasi peserta sangat positif dengan kepuasan 93% dan rata-rata 4,95/5,00 — mengindikasikan program yang relevan, berkualitas, dan berdampak langsung pada pekerjaan.",
    capability_strength:
      "Tim PBS Batch 3 menunjukkan kekuatan kolektif dalam tiga area utama: (1) Professional Grooming & Workplace Professionalism — 8 dari 9 peserta mencapai standar penampilan korporat BRI Life yang tinggi; (2) Kemampuan komunikasi dan orientasi hasil — dominasi kepribadian ENTJ dan ESTJ (6 dari 9) menghasilkan tim yang action-oriented dan terstruktur; (3) Pemahaman framework ACE secara konseptual — seluruh peserta memahami alur PREPARE–CONNECT–PRESENT–CLOSE–RETAIN.",
    capability_gap:
      "Tiga gap kompetensi yang memerlukan perhatian segera: (1) Product Storyselling — 7 dari 9 peserta masih perlu memperkuat kemampuan menghubungkan cerita nasabah dengan FAB produk secara emosional; (2) Deep Probing (CEO Model) — kemampuan menggali Concern, Emotion, dan Outcome nasabah masih dangkal; (3) Fleksibilitas Pendekatan — peserta dengan tipe kepribadian Judging (ESTJ/ENTJ) cenderung kaku mengikuti framework tanpa adaptasi terhadap flow nasabah.",
    recommendations: [
      "Performance Coaching individual 30 hari: review implementasi ACE, simulasi kasus riil, coaching personal untuk 9 PBS",
      "Peer mentoring: Nadia Anggraini Putri dan Sahadatu Chandra (Kompeten Unggul) didorong mendampingi Juni Rahmansyah dan Monika Caesarany",
      "Advanced Module dalam 60 hari: Wealth Advisory Deep Dive — fokus pada legacy planning, estate planning, dan advanced objection handling untuk nasabah UHNWI",
    ],
    roadmap: [
      { period: "Agustus–September 2025", activity: "Performance Coaching 1:1 untuk semua PBS", status: "on_track" },
      { period: "September 2025", activity: "Monitoring WA Group — success story & tips harian", status: "planned" },
      { period: "Oktober 2025", activity: "Advanced Module: Wealth Advisory Deep Dive (Batch 1)", status: "planned" },
      { period: "November 2025", activity: "Review & Assessment pasca Advanced Module", status: "planned" },
      { period: "Desember 2025", activity: "ACE Batch 4 — New PBS BRI Life", status: "planned" },
    ],
    roi_projection:
      "Berdasarkan peningkatan kompetensi yang terukur, proyeksi dampak bisnis dalam 90 hari: peningkatan conversion rate PBS dari rata-rata 20% menjadi 28–32% (estimasi berdasarkan benchmark industri pasca ACE training); potensi penambahan 15–20 nasabah affluent baru per bulan untuk seluruh tim (9 PBS); peningkatan average case size 15–20% melalui pendekatan wealth advisory yang lebih komprehensif.",
  },
};

export const REPORTS = [
  { id: "r1", type: "training_impact", title: "Training Impact Report — ACE Batch 3", description: "Laporan komprehensif 12 halaman mencakup semua aspek program", date: "12 Jun 2025", pages: 12, size: "2.4 MB", access: ["hr_client", "sponsor"] },
  { id: "r2", type: "executive_summary", title: "Executive Summary — ACE Batch 3", description: "Ringkasan 1 halaman untuk presentasi ke direksi", date: "12 Jun 2025", pages: 1, size: "0.8 MB", access: ["hr_client", "sponsor", "manager"] },
  { id: "r3", type: "individual_profile", title: "Individual Profile — Nadia Anggraini Putri", description: "Profil pengembangan individual — Kompeten Unggul", date: "12 Jun 2025", pages: 2, size: "1.1 MB", access: ["hr_client", "manager"] },
  { id: "r4", type: "individual_profile", title: "Individual Profile — Sahadatu Chandra", description: "Profil pengembangan individual — Kompeten Unggul", date: "12 Jun 2025", pages: 2, size: "1.1 MB", access: ["hr_client", "manager"] },
  { id: "r5", type: "org_insight", title: "Organizational Development Insight", description: "AI-generated insight level organisasi & rekomendasi strategis", date: "12 Jun 2025", pages: 3, size: "1.5 MB", access: ["hr_client", "sponsor"] },
] as const;

export const MANAGER_FEEDBACK_ITEMS = [
  { participant_id: "p1", participant_name: "Nadia Anggraini Putri", feedback_given: true, learning_application: "Sudah mulai menerapkan framework ACE secara konsisten dalam setiap meeting nasabah", behavior_change: "Lebih terstruktur dalam membuka meeting dan menggali kebutuhan nasabah secara mendalam", performance_improvement: "Berhasil onboard 2 nasabah affluent baru dalam 30 hari pasca training", rating: 5 as number | null, feedback_date: "15 September 2025" as string | null },
  { participant_id: "p3", participant_name: "Siska Febriani Sihombing", feedback_given: true, learning_application: "Mulai lebih aktif dalam memimpin percakapan dengan nasabah", behavior_change: "Terlihat lebih percaya diri dalam melakukan closing", performance_improvement: "Pipeline nasabah bertambah 3 prospek baru", rating: 4 as number | null, feedback_date: "20 September 2025" as string | null },
  { participant_id: "p5", participant_name: "Indra Putra Apriliana", feedback_given: false, learning_application: "", behavior_change: "", performance_improvement: "", rating: null, feedback_date: null },
  { participant_id: "p7", participant_name: "Brian Bagus Sadewo", feedback_given: false, learning_application: "", behavior_change: "", performance_improvement: "", rating: null, feedback_date: null },
];
