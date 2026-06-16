export const DEMO_STAFF = [
  { id: "s1", initials: "OW", full_name: "Oki T. Wikan", role: "facilitator", role_label: "Fasilitator Senior", color: "bg-blue-500" },
  { id: "s2", initials: "AA", full_name: "Arike Agung Widjaja", role: "facilitator", role_label: "Fasilitator", color: "bg-emerald-500" },
  { id: "s3", initials: "AD", full_name: "Demo Admin", role: "super_admin", role_label: "Super Admin", color: "bg-violet-500" },
  { id: "s4", initials: "PM", full_name: "Project Manager", role: "project_manager", role_label: "Project Manager", color: "bg-amber-500" },
  { id: "s5", initials: "CH", full_name: "Coach Handoko", role: "coach", role_label: "Coach", color: "bg-rose-500" },
] as const;

export type StaffUser = (typeof DEMO_STAFF)[number];

export const ROLE_BADGE: Record<string, string> = {
  super_admin: "bg-violet-100 text-violet-700",
  project_manager: "bg-amber-100 text-amber-700",
  facilitator: "bg-blue-100 text-blue-700",
  coach: "bg-rose-100 text-rose-700",
};

export const ALL_PARTICIPANTS = [
  { id:"p1", no:1, initials:"NA", color:"bg-blue-500", full_name:"Nadia Anggraini Putri", placement:"SLP Jakarta Rawamangun", region:"Jakarta 1", mbti:"ESTJ", final_score:91, category:"kompeten_unggul", steps_done:5, coaching:1, strength:"Terstruktur, detail, percaya diri", dev_area:"Fleksibilitas, kelola ketidakpastian", focus:"Fleksibilitas & kreativitas", observation_notes:"Sangat terstruktur dan disiplin. Membuka meeting dengan percaya diri tinggi." },
  { id:"p2", no:2, initials:"SC", color:"bg-emerald-500", full_name:"Sahadatu Chandra", placement:"SLP Pekanbaru", region:"Pekanbaru", mbti:"ENTJ", final_score:88.5, category:"kompeten_unggul", steps_done:5, coaching:2, strength:"Tegas, percaya diri, natural leader", dev_area:"Delegasi, empati, adaptasi", focus:"Empati & adaptasi", observation_notes:"Natural leader yang kuat. Cenderung over-confident, perlu belajar mendengarkan lebih aktif." },
  { id:"p3", no:3, initials:"SF", color:"bg-rose-500", full_name:"Siska Febriani Sihombing", placement:"SLP Jakarta Pluit", region:"Jakarta 1", mbti:"INFJ", final_score:80, category:"kompeten", steps_done:4, coaching:1, strength:"Pendengar baik, analitis, interpersonal kuat", dev_area:"Ketegasan, komunikasi aktif", focus:"Ketegasan & komunikasi aktif", observation_notes:"Pendengar sangat baik namun perlu lebih berani memimpin percakapan." },
  { id:"p4", no:4, initials:"SV", color:"bg-orange-500", full_name:"Stevanus Vebeteo Pradewata", placement:"SLP Malang Kawi", region:"Malang", mbti:"ESTJ", final_score:78.5, category:"kompeten", steps_done:4, coaching:0, strength:"Praktis, cepat bertindak, detail", dev_area:"Fleksibilitas, kreativitas", focus:"Adaptasi & fleksibilitas", observation_notes:"Perlu tambah wawasan tentang Asuransi Jiwa agar bisa menjawab pertanyaan klien." },
  { id:"p5", no:5, initials:"IP", color:"bg-cyan-500", full_name:"Indra Putra Apriliana", placement:"SLP Cut Mutiah", region:"Jakarta 1", mbti:"ENTP", final_score:77.5, category:"kompeten", steps_done:3, coaching:0, strength:"Kreatif, fleksibel, antusias", dev_area:"Konsistensi, struktur", focus:"Konsistensi & struktur kerja", observation_notes:"Kreatif dan antusias namun kurang data Storytelling-nya." },
  { id:"p6", no:6, initials:"AK", color:"bg-violet-500", full_name:"Azies Koentoro", placement:"SLP Jakarta Puri Niaga", region:"Jakarta 3", mbti:"ESFJ", final_score:76.5, category:"kompeten", steps_done:3, coaching:1, strength:"Komunikasi baik, konsisten, harmonis", dev_area:"Tahan kritik, kemandirian", focus:"Kemandirian & ketahanan kritik", observation_notes:"Komunikasi baik namun perlu lebih banyak menggali cerita nasabah." },
  { id:"p7", no:7, initials:"BB", color:"bg-purple-500", full_name:"Brian Bagus Sadewo", placement:"SLP Kelapa Gading", region:"Jakarta 1", mbti:"ENTJ", final_score:74.5, category:"kompeten", steps_done:3, coaching:0, strength:"Komunikasi tegas, visioner, orientasi hasil", dev_area:"Kurangi kritik, konsistensi, empati", focus:"Delegasi & sensitivitas emosional", observation_notes:"Perlu perbanyak pengetahuan untuk menjawab keberatan nasabah yang lebih update." },
  { id:"p8", no:8, initials:"JR", color:"bg-teal-500", full_name:"Juni Rahmansyah", placement:"SLP Solo", region:"Yogyakarta", mbti:"ESTJ", final_score:64.5, category:"perlu_pengembangan", steps_done:2, coaching:0, strength:"Praktis, cepat bertindak", dev_area:"Fleksibilitas, kelola ketidakpastian", focus:"Adaptasi & fleksibilitas", observation_notes:"Terkesan arogan dan terlalu to the point. Tidak membangun kedekatan emosi." },
  { id:"p9", no:9, initials:"MC", color:"bg-pink-500", full_name:"Monika Caesarany", placement:"SLP Pondok Indah", region:"Jakarta 2", mbti:"ENTJ", final_score:62, category:"perlu_pengembangan", steps_done:2, coaching:0, strength:"Tegas, efisien, peduli kebutuhan orang", dev_area:"Delegasi, empati", focus:"Delegasi & empati", observation_notes:"Kurang percaya diri, ekspresi datar dan monoton. Penjelasan cukup jelas namun masih banyak pakai catatan." },
] as const;

export type Participant = (typeof ALL_PARTICIPANTS)[number];

export const COACHING_SESSIONS = [
  { id:"cs1", participant_id:"p2", participant_name:"Sahadatu Chandra", initials:"SC", color:"bg-emerald-500", session_number:1, session_date:"15 Agustus 2025", topic:"Implementasi ACE Framework pasca training", challenge:"Nasabah tidak mau diarahkan ke produk baru", root_cause:"Probing kebutuhan emosional belum mendalam", agreed_action:"Latih ulang sesi MEET terutama CEO Probing dengan 3 nasabah eksisting", progress_status:"on_track", coach_notes:"Sahadatu menunjukkan komitmen tinggi. Perlu lebih sabar dalam proses discovery.", next_date:"29 Agustus 2025" },
  { id:"cs2", participant_id:"p2", participant_name:"Sahadatu Chandra", initials:"SC", color:"bg-emerald-500", session_number:2, session_date:"29 Agustus 2025", topic:"Review progress implementasi MEET & Objection Handling", challenge:"Kesulitan saat nasabah keberatan soal biaya premi", root_cause:"Storytelling FAB produk belum menyentuh aspek emosional", agreed_action:"Buat 3 cerita nasabah (persona) berbeda untuk 3 tipe Wealth Pillars", progress_status:"completed", coach_notes:"Progress baik. Sahadatu sudah berhasil onboard 1 nasabah baru.", next_date:null as string | null },
  { id:"cs3", participant_id:"p1", participant_name:"Nadia Anggraini Putri", initials:"NA", color:"bg-blue-500", session_number:1, session_date:"20 Agustus 2025", topic:"Pengembangan fleksibilitas pendekatan ACE", challenge:"Terlalu kaku mengikuti framework tanpa adaptasi terhadap flow nasabah", root_cause:"Karakter ESTJ sangat terstruktur — butuh latihan improvisasi", agreed_action:"Variasikan urutan MEET sesuai respons nasabah dalam 5 kali roleplay mandiri", progress_status:"on_track", coach_notes:"Nadia sangat disiplin. Tantangan utama adalah fleksibilitas bukan kompetensi teknis.", next_date:"3 September 2025" },
];

export const STRATEGIC_NOTES_DATA = {
  biggest_strength: "Mayoritas peserta (7 dari 9) menunjukkan kompetensi tinggi dalam Professional Grooming dan Workplace Professionalism. Tim didominasi tipe kepribadian Ekstrovert-Judging (ESTJ, ENTJ) yang kuat dalam eksekusi dan orientasi hasil.",
  biggest_dev_area: "Product Storyselling — hampir semua peserta perlu memperkuat kemampuan menghubungkan data/cerita nasabah dengan produk secara emosional. Probing CEO (Concern-Emotion-Outcome) masih dangkal pada sebagian besar peserta.",
  common_challenge: "Nasabah affluent yang sudah memiliki trusted advisor existing dan resistensi terhadap produk bancassurance yang dianggap kurang prestigious.",
  organizational_insight: "Tim PBS Batch 3 memiliki potensi tinggi namun butuh pendampingan post-training yang terstruktur. 2 Role Model (Nadia & Sahadatu) dapat dijadikan peer mentor.",
  recommendation: "Performance Coaching 30 hari, monitoring via WA Group untuk success story harian, dan Advanced Module Wealth Advisory Deep Dive dalam 60 hari.",
  suggested_next_program: "Wealth Advisory Deep Dive — fokus pada legacy planning, estate planning, dan advanced objection handling untuk nasabah UHNWI.",
};

export const SAVED_REPORTS = [
  { id:"r1", type:"training_impact", title:"Training Impact Report — ACE Batch 3", date:"12 Jun 2025", pages:12 },
  { id:"r2", type:"individual_profile", title:"Individual Profile — Nadia Anggraini Putri", date:"12 Jun 2025", pages:2 },
  { id:"r3", type:"individual_profile", title:"Individual Profile — Sahadatu Chandra", date:"12 Jun 2025", pages:2 },
];

export const CATEGORY_BADGE: Record<string, { label: string; cls: string }> = {
  kompeten_unggul: { label: "★ Kompeten Unggul", cls: "bg-green-100 text-green-700" },
  kompeten: { label: "✓ Kompeten", cls: "bg-blue-100 text-blue-700" },
  perlu_pengembangan: { label: "△ Perlu Dev.", cls: "bg-red-100 text-red-600" },
};
