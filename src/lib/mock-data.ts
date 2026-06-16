export const CURRENT_USER = {
  id: "p1",
  full_name: "Nadia Anggraini Putri",
  initials: "NA",
  role: "participant",
  position: "Priority Bancassurance Specialist",
  placement: "SLP Jakarta Rawamangun",
  region: "Jakarta 1",
  mbti: "ESTJ",
  source: "Eksternal",
};

export const DEMO_USERS = [
  { id: "p1", initials: "NA", full_name: "Nadia Anggraini Putri", position: "PBS — SLP Jakarta Rawamangun", region: "Jakarta 1", email: "nadia@demo.score", badge: "Kompeten Unggul", badge_color: "green", final_score: 91, avatar: "bg-blue-500" },
  { id: "p2", initials: "SC", full_name: "Sahadatu Chandra", position: "PBS — SLP Pekanbaru", region: "Pekanbaru", email: "sahadatu@demo.score", badge: "Kompeten Unggul", badge_color: "green", final_score: 88.5, avatar: "bg-emerald-500" },
  { id: "p3", initials: "BB", full_name: "Brian Bagus Sadewo", position: "PBS — SLP Kelapa Gading", region: "Jakarta 1", email: "brian@demo.score", badge: "Kompeten", badge_color: "blue", final_score: 74.5, avatar: "bg-violet-500" },
];

export const ACTIVE_CLASS = {
  id: "ace-batch-3",
  title: "Affluent Customer Experience (A.C.E)",
  subtitle: "Program & Certification",
  batch: "Batch 3",
  client: "BRI Life",
  organizer: "Telsindo8",
  location: "Hotel Harris Sentul",
  date: "6–8 Agustus 2025",
  duration: "3 Hari",
  facilitators: ["Oki T. Wikan", "Arike Agung Widjaja"],
  cover_color: "from-slate-800 to-blue-700",
  max_participants: 30,
  enrolled: 9,
  description:
    "Program strategis untuk mempersiapkan Priority Bancassurance Specialist (PBS) sebagai Trusted Insurance Advisor di segmen affluent. Pelatihan intensif 3 hari mencakup workshop interaktif, simulasi end-to-end, roleplay, coaching clinic, dan akreditasi resmi.",
  objectives: [
    "Meningkatkan kapabilitas PBS dalam financial needs discovery & consultative selling",
    "Menguasai teknik presentasi, objection handling, dan closing yang terstruktur",
    "Menjalankan end-to-end advisory menggunakan framework A.C.E (PREPARE–CONNECT–PRESENT–CLOSE–RETAIN)",
    "Lulus Akreditasi ACE sebagai validasi kompetensi profesional",
  ],
  current_step: 2,
  steps: [
    { id: "pre_assessment", label: "Pre-Assessment", short: "Pre", status: "completed" },
    { id: "learning", label: "Materi", short: "Materi", status: "completed" },
    { id: "competency", label: "Assessment", short: "Assess", status: "current" },
    { id: "evaluation", label: "Evaluasi", short: "Evaluasi", status: "locked" },
    { id: "action_plan", label: "Action Plan", short: "Action", status: "locked" },
  ],
};

export const AVAILABLE_CLASSES = [
  { id: "ace-batch-4", title: "ACE Program Batch 4", subtitle: "Affluent Customer Experience", client: "BRI Life", duration: "3 Hari", cover_color: "from-blue-600 to-cyan-500", status: "locked" },
  { id: "advanced-sales", title: "Advanced Sales Mastery", subtitle: "Consultative Selling Level 2", client: "BRI Life", duration: "2 Hari", cover_color: "from-emerald-600 to-teal-500", status: "locked" },
  { id: "wealth-advisory", title: "Wealth Advisory Deep Dive", subtitle: "Estate & Legacy Planning", client: "BRI Life", duration: "2 Hari", cover_color: "from-violet-600 to-purple-500", status: "locked" },
];

export const COMPETENCY_FRAMEWORK = [
  {
    id: "c1", name: "1. Professional Grooming", weight: 15,
    sub: [
      { id: "c1a", name: "Penampilan rapi sesuai standar korporat", weight: 10, rubric: { 1: "Pakaian tidak rapi, tidak sesuai standar korporat", 2: "Masih ada elemen tidak rapi (baju kusut, sepatu kurang bersih)", 3: "Penampilan cukup baik, sebagian besar sesuai standar", 4: "Penampilan rapi, sesuai standar korporat sepenuhnya", 5: "Sangat rapi, profesional, konsisten dengan citra brand premium" } },
      { id: "c1b", name: "Hygiene & kesegaran diri", weight: 5, rubric: { 1: "Terlihat tidak segar, kebersihan tidak terjaga", 2: "Kebersihan cukup, ada beberapa hal kurang terawat", 3: "Kebersihan diri cukup baik dan layak", 4: "Bersih, segar, terlihat terawat", 5: "Sangat bersih, segar, menampilkan kesan profesional yang kuat" } },
    ],
  },
  {
    id: "c2", name: "2. Workplace Professionalism", weight: 15,
    sub: [
      { id: "c2a", name: "Sikap positif & manner saat interaksi", weight: 5, rubric: { 1: "Sikap kurang sopan, kurang percaya diri", 2: "Sikap belum konsisten, ada momen tidak sesuai", 3: "Sikap cukup baik, ramah dan sopan", 4: "Sikap profesional, percaya diri, manner baik", 5: "Sangat profesional, manner prima, penuh kehangatan & kepercayaan diri" } },
      { id: "c2b", name: "Disiplin waktu & kesiapan mengikuti pelatihan", weight: 5, rubric: { 1: "Datang terlambat, tidak siap alat/material", 2: "Datang mendekati waktu mulai, persiapan minim", 3: "Siap sebagian, hadir tepat waktu", 4: "Persiapan baik, hadir sebelum waktu", 5: "Sangat siap, hadir lebih awal, proaktif menyiapkan sesi" } },
      { id: "c2c", name: "Professional presence keseluruhan", weight: 5, rubric: { 1: "Tidak menunjukkan presence profesional selama sesi", 2: "Presence profesional belum konsisten", 3: "Cukup profesional dalam sebagian besar waktu", 4: "Profesional dan konsisten sepanjang sesi", 5: "Luar biasa profesional, menjadi role model bagi peserta lain" } },
    ],
  },
  {
    id: "c3", name: "3. ACE Process — MEET", weight: 30,
    sub: [
      { id: "c3a", name: "Open Meeting (Model W.I.N: Why–Insight–Next Step)", weight: 10, rubric: { 1: "Tidak terstruktur, tidak mengikuti alur W.I.N", 2: "Struktur lemah, sebagian langkah terlewat", 3: "Cukup jelas, memenuhi sebagian alur", 4: "Terstruktur baik dan jelas", 5: "Sangat terstruktur, membuka meeting dengan percaya diri, membangun kepercayaan nasabah" } },
      { id: "c3b", name: "Identify Goals (4 Komponen Wealth Management)", weight: 10, rubric: { 1: "Tidak menggunakan prosedur, pertanyaan tidak relevan", 2: "Beberapa komponen WM tidak digali", 3: "Sesuai sebagian, masih ada area yang kurang", 4: "Hampir lengkap, mencakup komponen WM utama", 5: "Lengkap: Wealth Creation, Preservation, Distribution, Business Insurance" } },
      { id: "c3c", name: "Understand Goals — Probing C.E.O (Concern–Emotion–Outcome)", weight: 10, rubric: { 1: "Probing dangkal, tidak menggali Concern–Emotion–Outcome", 2: "Probing kurang menyentuh motivasi nasabah", 3: "Probing cukup, sebagian relevan", 4: "Probing mendalam & relevan", 5: "Probing sangat kuat, menggali motivasi emosional & kebutuhan jangka panjang" } },
    ],
  },
  {
    id: "c4", name: "4. ACE Process — PRESENT", weight: 30,
    sub: [
      { id: "c4a", name: "Menyampaikan solusi sesuai kebutuhan (4 pilar WM)", weight: 10, rubric: { 1: "Solusi tidak relevan dengan kebutuhan nasabah", 2: "Relevansi lemah, hanya sebagian sesuai", 3: "Cukup relevan & layak", 4: "Jelas, relevan, sesuai kebutuhan", 5: "Sangat relevan, kuat, langsung menjawab kebutuhan inti nasabah" } },
      { id: "c4b", name: "Storytelling & data saat menjelaskan FAB Produk", weight: 10, rubric: { 1: "Tidak tepat, tidak terhubung dengan kebutuhan nasabah", 2: "Kurang sesuai konteks, contoh kurang kuat", 3: "Cukup tepat", 4: "Tepat, menarik, membantu nasabah memahami solusi", 5: "Sangat kuat, emosional/logis, membuat nasabah engaged" } },
      { id: "c4c", name: "Objection Handling — Model C.A.R (Connect–Alignment–Reassure)", weight: 10, rubric: { 1: "Jawaban tidak tepat, tidak mengatasi keberatan", 2: "Jawaban kurang selaras & tidak menenangkan", 3: "Jawaban cukup tepat", 4: "Tepat, relevan, membantu nasabah", 5: "Sangat efektif, menenangkan kekhawatiran nasabah, meningkatkan kepercayaan" } },
    ],
  },
  {
    id: "c5", name: "5. ACE Process — ASK", weight: 10,
    sub: [
      { id: "c5a", name: "Trial to Close 4x dengan model L.A.S.T", weight: 5, rubric: { 1: "Tidak melakukan trial to close", 2: "Melakukan tetapi tidak terstruktur", 3: "Cukup jelas", 4: "Terstruktur & jelas", 5: "Sangat terstruktur, membangun keputusan dengan elegan" } },
      { id: "c5b", name: "Closing & ajakan langkah lanjut", weight: 2.5, rubric: { 1: "Tidak ada upaya closing", 2: "Upaya sangat lemah", 3: "Closing lemah atau ragu", 4: "Closing baik & jelas", 5: "Closing kuat, meyakinkan, nasabah jelas next step" } },
      { id: "c5c", name: "Meminta referral & Reciprocal business produk BRI", weight: 2.5, rubric: { 1: "Tidak meminta referral", 2: "Meminta referral dengan pasif/tidak yakin", 3: "Cukup, sesuai prosedur minimal", 4: "Meminta referral dengan percaya diri & natural", 5: "Sangat meyakinkan, menghasilkan referral berkualitas" } },
    ],
  },
] as const;

export const PRE_ASSESSMENT_DATA = {
  business_challenge: "Membangun kepercayaan nasabah affluent yang sudah memiliki advisor lain dan cenderung skeptis terhadap produk bancassurance. Banyak nasabah sudah punya relasi kuat dengan advisor dari perusahaan asuransi lain.",
  learning_needs: "Teknik consultative selling yang lebih sistematis, framework yang terstruktur untuk menggali kebutuhan finansial mendalam, dan cara mengatasi objection dari nasabah tier premium secara elegan.",
  existing_strengths: "Pengalaman 4 tahun di industri asuransi, network nasabah eksisting yang cukup kuat, kemampuan komunikasi yang baik, dan pemahaman produk yang solid.",
  development_areas: "Kemampuan probing kebutuhan emosional nasabah, teknik storytelling saat presentasi produk, dan konsistensi dalam menjalankan proses ACE end-to-end secara disiplin.",
  stakeholder_expectations: "Target meningkatkan closing rate dari 20% menjadi 35% dalam 3 bulan setelah training. Minimal 2 nasabah baru per bulan dari segment affluent.",
};

export const LEARNING_TOPICS = [
  { id: "t1", topic: "Champion Mindset — Trusted Advisor vs Seller", understood: true },
  { id: "t2", topic: "Professional Advisor Manner & Branch Collaboration", understood: true },
  { id: "t3", topic: "Pipeline & Personal Goal Setting", understood: true },
  { id: "t4", topic: "PRA-ACE: Strategic Prospecting (Get, Select, Call)", understood: true },
  { id: "t5", topic: "MEET Part 1 — Open Meeting (W.I.N: Why–Insight–Next Step)", understood: true },
  { id: "t6", topic: "MEET Part 2 — Understanding Goals (4 Wealth Pillars)", understood: true },
  { id: "t7", topic: "MEET Part 3 — Deep Dive dengan Model C.E.O", understood: true },
  { id: "t8", topic: "MEET Part 4 — Wealth Persona Strategy", understood: true },
  { id: "t9", topic: "PRESENT Part 1 — Recommend & C.A.R Objection Handling", understood: true },
  { id: "t10", topic: "PRESENT Part 2 — Trial Close dengan L.A.S.T", understood: true },
  { id: "t11", topic: "ASK — Referrals & Next Appointment Strategy", understood: true },
  { id: "t12", topic: "POST-ACE — Follow-Up, Deepen Relationship, Reminder", understood: true },
  { id: "t13", topic: "Wealth Protection & Legacy Planning", understood: true },
  { id: "t14", topic: "ACE Program Simulation — Full End-to-End", understood: true },
];
