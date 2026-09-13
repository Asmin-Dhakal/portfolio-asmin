export type Project = {
  slug: string;
  title: string;
  short: string;
  tagline: string;
  tags: string[];
  category: "web" | "mobile" | "devops";
  year: string;
  accent: string;
  image: string;
  live?: string;
  client: string;
  location: string;
  timeline?: string;
  price?: string;
  role: string;
  platform: string[];
  overview: string[];
  features: { title: string; desc: string }[];
  flow?: string[];
  outcome: string;
  /** show on /projects archive only, hide from the home journey */
  archiveOnly?: boolean;
  /** e.g. "In development" — shown as a badge on the archive card */
  status?: string;
};

const PLAY_SPORTA =
  "https://play.google.com/store/apps/details?id=com.sporta.app&hl=en";
const PLAY_UNIGO =
  "https://play.google.com/store/apps/details?id=com.unigo.app.unigo&hl=en";

const U = (id: string) =>
  `https://images.unsplash.com/${id}?q=80&w=1600&auto=format&fit=crop`;

export const IMG = {
  // Real homepage / hero imagery from the live products.
  // To use your own UNIGO screenshot instead, save it as
  // public/projects/unigo-hero.jpg and point `unigo` at it.
  unigo:
    "https://res.cloudinary.com/dfe7bcdkm/image/upload/v1775542793/homepage_ks2gj1.jpg",
  vihaani: "https://www.vihaanievents.com/herosec.jpg",
  cleanflow:
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1600&auto=format&fit=crop",
  sporta: "/projects/sporta.png", // your Sporta promo graphic in public/projects/
  unigoApp: "/projects/unigo.png", // your UNIGO app graphic in public/projects/
  desk: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
};

export const projects: Project[] = [
  {
    slug: "unigo-website",
    title: "UNIGO Nepal — Consultancy Website + CMS",
    short:
      "Official website for UNIGO Education Experts with a full CMS / admin panel — every page, destination, blog and event editable without code.",
    tagline: "Consultancy website with full CMS admin — live in production.",
    tags: ["Next.js", "React", "Tailwind", "CMS"],
    category: "web",
    year: "2026",
    accent: "from-lime-300 to-emerald-400",
    image: IMG.unigo,
    live: "https://www.unigo.edu.np",
    client: "UNIGO Education Experts",
    location: "Kathmandu, Nepal",
    role: "Lead Developer — Manager Digital Operations & Technology",
    platform: ["Marketing website", "CMS / Admin panel"],
    overview: [
      "UNIGO Nepal is an international education consultancy. I designed and built their official website as a complete digital presence for destinations, visa services, success stories, blogs and events.",
      "The key requirement was independence: the UNIGO team manages everything themselves. So I built a CMS / admin panel where every section — hero, destinations, services, testimonials, blogs, events, contact info — can be changed without touching code.",
    ],
    features: [
      { title: "Full CMS admin", desc: "Edit all pages, destinations, blogs, events, testimonials and SEO from one panel." },
      { title: "Destinations system", desc: "Country pages for Finland, UK, Australia, Canada and more with courses and requirements." },
      { title: "Blog + events", desc: "Guides, visa explainers and event listings with detail pages." },
      { title: "Lead capture", desc: "Register-interest and contact flows wired to the consultancy team." },
      { title: "Performance + SEO", desc: "Fast Next.js build, responsive across desktop and mobile." },
    ],
    outcome:
      "A polished, scalable site with 98.5% visa-success storytelling that the non-technical team fully controls — live at unigo.edu.np.",
  },
  {
    slug: "vihaani-events",
    title: "Vihaani Events — Event Management + CMS",
    short:
      "Website for Vihaani Events, a professional event management company in Nepal — services, portfolio, galleries and bookings, all editable from a CMS.",
    tagline: "May 2026 • $400–600 • 7–30 days • live client site with CMS.",
    tags: ["Next.js", "Tailwind", "CMS", "SEO"],
    category: "web",
    year: "2026",
    accent: "from-fuchsia-300 to-purple-400",
    image: IMG.vihaani,
    live: "https://www.vihaanievents.com",
    client: "Vihaani Events",
    location: "Kathmandu, Nepal",
    timeline: "7–30 days",
    price: "$400–600",
    role: "Designer + Full-Stack Developer",
    platform: ["Marketing website", "CMS / Admin panel"],
    overview: [
      "Vihaani Events needed a complete digital presence to showcase weddings, corporate events, sports tournaments, private parties, cultural events, event design and venue sourcing.",
      "I built a modern, responsive site with an events calendar, detailed event pages, project/portfolio showcases, image galleries, testimonials and contact/consultation flows — plus a CMS so the team can add events, projects and galleries themselves.",
    ],
    features: [
      { title: "Service system", desc: "Weddings, corporate, sports, parties, cultural, design, venue sourcing — structured pages." },
      { title: "Events calendar", desc: "Upcoming events like FUTSAL MANIA 2026 with detail pages." },
      { title: "Portfolio + gallery", desc: "Project showcases and image galleries with visual storytelling layouts." },
      { title: "Testimonials", desc: "Client voices, e.g. weddings and Laurea University collaboration." },
      { title: "CMS admin", desc: "Team edits services, events, projects and content without a developer." },
      { title: "Consultation flow", desc: "Book-consultation CTAs converting visitors into clients." },
    ],
    outcome:
      "A brand-consistent, scalable site that establishes Vihaani's online presence and turns visitors into event inquiries — live at vihaanievents.com.",
  },
  {
    slug: "cleanflow",
    title: "CleanFlow — 365 Multi Cleaning (Aruba)",
    short:
      "Multi-platform cleaning system for 365 Multi Cleaning & Services, Aruba: client booking panel, worker mobile app and admin panel with QR check-in/out and work-hour tracking.",
    tagline: "Client panel + worker app + admin — live multi-platform system.",
    tags: ["Next.js", "Flutter", "QR System", "Vercel"],
    category: "web",
    year: "2026",
    accent: "from-cyan-300 to-sky-400",
    image: IMG.cleanflow,
    live: "https://cleaning-app-client-frontend.vercel.app/",
    client: "365 Multi Cleaning & Services",
    location: "Aruba (client) • cleaning services provider",
    role: "Full-Stack Developer — web, mobile + deploy",
    platform: ["Client panel (web)", "Worker mobile app", "Admin panel"],
    overview: [
      "CleanFlow was built for 365 Multi Cleaning & Services, a cleaning services provider in Aruba. The owner needed one system connecting customers, field workers and management.",
      "Clients book cleaning services from the client panel. Workers receive tasks in the mobile app, travel to the site, complete the job and upload proof of completed work with photos. Clients see the result and confirm. Every shift uses QR code check-in and checkout, so work hours are recorded automatically.",
    ],
    features: [
      { title: "Client booking panel", desc: "Customers book cleanings, track status, view completed-work uploads and confirm." },
      { title: "Worker mobile app", desc: "Task list, navigation to site, photo upload of finished work, shift handling." },
      { title: "QR check-in / checkout", desc: "Scan on arrival and departure — accurate, fraud-resistant attendance." },
      { title: "Work-hour records", desc: "Hours logged per employee per job for payroll and reporting." },
      { title: "Photo proof flow", desc: "Worker uploads completion photos → client reviews → confirms." },
      { title: "Admin panel", desc: "Manage clients, workers, bookings, assignments and reports in one place." },
    ],
    flow: [
      "Client books a cleaning from the client panel",
      "Admin assigns a worker to the job",
      "Worker checks in with QR at the property",
      "Worker completes the cleaning and uploads photos in the app",
      "Client views the proof and confirms",
      "Hours are logged from QR check-in/out for payroll",
    ],
    outcome:
      "A complete operations loop — booking to verified completion — giving the Aruba owner full visibility over staff, hours and service quality.",
  },
  {
    slug: "sporta",
    title: "Sporta — Tournament, Turf & Live Scores",
    short:
      "Flutter sports app on the Play Store: find and book turfs, follow live tournaments, scores, fixtures, standings and highlights.",
    tagline: "Live Flutter app on Google Play — booking + live scores.",
    tags: ["Flutter", "Dart", "Google Sign-In", "Play Store"],
    category: "mobile",
    year: "2026",
    accent: "from-sky-300 to-indigo-400",
    image: IMG.sporta,
    live: PLAY_SPORTA,
    client: "UNIGO Education Experts (publisher)",
    location: "Nepal",
    role: "Mobile Developer — Flutter",
    platform: ["Android app (Play Store)"],
    overview: [
      "Sporta is an all-in-one sports companion for futsal, football, basketball, volleyball, cricket and more — which I developed and shipped to Google Play.",
      "Users discover and book nearby turfs in seconds, then follow tournaments live: scores, fixtures, results, standings, brackets and video highlights. Players sign in with Google to manage teams, track stats and vote for the Puskas Award.",
    ],
    features: [
      { title: "Turf discovery + booking", desc: "Nearby futsal/sports venues, availability compare, book in seconds." },
      { title: "Live tournaments", desc: "Scores, fixtures, results, standings, brackets and highlights." },
      { title: "Teams + stats", desc: "Create/join teams, squad view, matches, goals, assists, cards, history." },
      { title: "Puskas voting", desc: "Watch best goals and vote for favourites." },
      { title: "Google sign-in", desc: "Browse instantly; sign in unlocks teams, stats and profile." },
    ],
    outcome:
      "Live on Google Play under UNIGO Education Experts — from booking a turf to winning a tournament in one fast, clean app.",
  },
  {
    slug: "unigo-app",
    title: "UNIGO App — Tournament + Study Abroad (WIP)",
    short:
      "Work-in-progress Flutter app: futsal tournament registration with QR payments and verification, plus a study-abroad university browser.",
    tagline: "WIP Flutter app — 50+ downloads, actively developed.",
    tags: ["Flutter", "Dart", "QR Payments", "Play Store"],
    category: "mobile",
    year: "2026",
    accent: "from-violet-300 to-purple-400",
    image: IMG.unigoApp,
    live: PLAY_UNIGO,
    client: "UNIGO Education Experts",
    location: "Nepal",
    role: "Mobile Developer — Flutter (WIP)",
    platform: ["Android app (Play Store, early access)"],
    overview: [
      "The UNIGO app combines two worlds: futsal tournament operations and study-abroad discovery. It is live on the Play Store with 50+ downloads and under active development.",
      "Managers register 5-player teams in-app, upload ID + selfie verification, pay via QR scan and track approval live. Alongside, students browse partner universities across Finland, Greece, Lithuania, Dubai and more — courses, entry requirements, visas and scholarships.",
    ],
    features: [
      { title: "One-tap team registration", desc: "Manager flow with player name, email, phone in minutes." },
      { title: "ID + selfie verification", desc: "Document upload with real-time verification status." },
      { title: "QR payments", desc: "Scan-to-pay registration fees, receipts saved to gallery." },
      { title: "University browser", desc: "Courses, requirements, visas, scholarships per destination." },
      { title: "Secure by design", desc: "HTTPS, bcrypt passwords, Cloudinary docs, account deletion in-app." },
    ],
    outcome:
      "Initial release live — tournament management today, deeper university tooling shipping next.",
  },
  {
    slug: "unigo-b2b-portal",
    title: "UNIGO B2B Portal — Finland Admissions",
    short:
      "Production B2B portal where partner consultancies submit and track student applications to Finnish universities (SAMK, Laurea, Karelia UAS) while UNIGO staff drive each file to offer letter, tuition payment and visa grant.",
    tagline: "B2B admissions system replacing chat-and-spreadsheet coordination.",
    tags: ["Next.js 16", "Prisma", "PostgreSQL", "NextAuth", "Resend", "Cloudinary"],
    category: "web",
    year: "2026",
    accent: "from-sky-300 to-blue-500",
    image: "/projects/b2b-portal.svg",
    client: "UNIGO Education Experts",
    location: "Kathmandu, Nepal",
    role: "Sole designer/developer — architecture, database, all workspaces, UI/UX",
    platform: ["Partner portal", "Staff console", "Super Admin"],
    archiveOnly: true,
    status: "In development",
    overview: [
      "A production B2B web portal for UNIGO Education Experts (Nepal) that lets partner consultancies submit and track student applications to Finnish universities of applied sciences — SAMK, Laurea and Karelia UAS — while UNIGO staff process each application from submission through offer letter, tuition payment and visa grant.",
      "It replaces manual, chat-and-spreadsheet coordination between UNIGO and its partners with a single system of record: applications, documents, task pipelines, status tracking and automated partner emails in one place.",
    ],
    features: [
      { title: "Partner portal", desc: "Dashboard with KPI cards, pipeline visualization, trend charts and needs-attention alerts; student profiles with passport, academic and language documents; bulk applications to intakes; real-time progress; two-way task channel with staff." },
      { title: "Staff workspace", desc: "Per-application detail with student dossier, task checklists that fire templated emails on completion, pipeline control (Submitted → In Review → On Hold → Completed/Cancelled), document-request composer with instant email, delivery log." },
      { title: "Super Admin console", desc: "Partner approval, suspend and reactivate lifecycle; full user management with staff creation, suspend and password resets; catalogue management for universities, programs, intakes, forms, checklists and email templates; soft-delete restore; global oversight." },
      { title: "Finland domain logic", desc: "Joint intakes (1–6 programs per application) vs. separate intakes (1 program), university/program tag compatibility and automatic open/closed/upcoming intake computation." },
      { title: "Secure platform", desc: "Role-based auth with credentials plus OTP email verification and brute-force lockout; authorized document proxy with per-file access control and original-filename downloads; soft deletes kept as audit proof." },
    ],
    flow: [
      "Partner submits a student application (single or bulk) to an open intake",
      "Staff review the dossier, request missing documents, track tasks",
      "Application advances: Submitted → In Review → offer letter secured",
      "Tuition payment confirmed, visa file prepared and granted",
      "Templated emails fire automatically at every completion step",
    ],
    outcome:
      "In active development toward production launch, seeded with demo data — admin operations and staff workflows complete. Built iteratively with AI-assisted development.",
  },
  {
    slug: "unigo-eod-tracker",
    title: "Unigo — Work Tracking & Attendance",
    short:
      "Internal HR platform for a Nepal company: Kathmandu-timezone check-in/lunch/checkout, hourly EOD logging with pause chains, overtime tracking, and Bikram Sambat reports with CSV export.",
    tagline:
      "Full-stack HR productivity platform replacing manual end-of-day reporting with live attendance and hourly task logging.",
    tags: ["Next.js 16", "Drizzle ORM", "Neon Postgres", "Auth.js", "Bikram Sambat", "Asia/Kathmandu"],
    category: "web",
    year: "2026",
    accent: "from-amber-300 to-orange-400",
    image: "/projects/eod-tracker.svg",
    live: "https://unigo-eod.vercel.app/",
    client: "UNIGO Education Experts — internal HR",
    location: "Kathmandu, Nepal",
    role: "Sole designer/developer — architecture, database, all workspaces, UI/UX",
    platform: ["Employee app", "Live admin dashboard", "BS reports + CSV"],
    archiveOnly: true,
    status: "In production — internal",
    overview: [
      "Built to replace manual EOD reporting, EOD Tracker digitizes the entire workday from login to checkout. Employees check in, log what they work on every hour, pause for lunch, and check out — all automatically validated for late arrivals, early checkouts, and overtime.",
      "The system runs entirely on Asia/Kathmandu time and the Bikram Sambat calendar: month/day navigation in BS (Baisakh–Chaitra), BS↔AD conversion for every query, daily hours bar charts with drill-down, and a monthly BS calendar. Five roles — admin / manager / hr / team_lead / employee — are enforced in both UI and API.",
    ],
    features: [
      { title: "Smart attendance state machine", desc: "out → working → on_lunch → working → checked_out with lunch auto-pause/resume of tasks, lunch pause reasons, and mobile check-in (mobile) badges for admins." },
      { title: "Hourly EOD logging", desc: "In-progress / done / partially_completed entries, pause history, editHistory audit trail, and ↳ continue chains for unfinished work carried forward." },
      { title: "Overtime & accountability", desc: "Per-employee thresholds (default 10:00 in / 17:00 out), 15-min grace, mandatory late/early reasons, auto overtime = checkout − threshold." },
      { title: "Bikram Sambat reports", desc: "BS month length calc, BS↔AD conversion, Nepali month-boundary reporting, daily bar charts, one-click drill-down, and BS-labeled CSV export." },
      { title: "Attendance calendar", desc: "Monthly BS calendar with check-in/lunch/checkout/overtime, holiday highlighting, Saturday dimming, click-to-view entries, admin edit/delete." },
      { title: "Leave management", desc: "Single/multi-date requests, half-day/sick/casual/annual types, per-date approve/reject/needs_talk with comments, bulk actions, auto-derived partial status." },
      { title: "Teams & live oversight", desc: "Today Overview (Checked In / On Lunch / Checked Out / Absent) auto-refreshing every 30s, late/early tables, teams with leads, EMP001 IDs, Nepali holidays, meetings & todos." },
    ],
    flow: [
      "Login → Check In (late? reason required)",
      "Add hourly tasks → Pause/Resume/Complete with notes",
      "Lunch Start (auto-pauses tasks) → Lunch End (auto-resumes)",
      "Checkout (early? reason required, overtime auto-calculated)",
      "Verify in My Reports / Attendance; HR views live dashboard & BS monthly reports",
    ],
    outcome:
      "A timezone-correct, BS-native HR system with 8 tables (22 Drizzle migrations), 12 API groups, concurrent task auto-pause logic, and full audit trails — auditable, concurrent, and built for Nepal from the ground up.",
  },
  {
    slug: "udante-nepal",
    title: "Udante — Nepal Tours & Travels",
    short:
      "Full-viewport Nepal trekking site with interactive trek maps, altitude profiles and Quote/WhatsApp booking — built for conversion and SEO.",
    tagline:
      "Premium trekking & tour operator website converting organic search into WhatsApp inquiries — udante.com.np",
    tags: ["Next.js 16", "Tailwind v4", "Leaflet", "OpenStreetMap", "Framer Motion", "Lenis"],
    category: "web",
    year: "2026",
    accent: "from-cyan-400 to-teal-500",
    image: "/projects/udante.svg",
    live: "https://udante.vercel.app/",
    client: "Udante — Nepal Tours & Travels",
    location: "Thapagaun, New Baneshwor, Kathmandu — M8RM+FF (udante.com.np)",
    role: "Designer + Full-Stack Developer — design, build, maps, booking flows, deploy",
    platform: ["Marketing website", "Trek maps + booking"],
    archiveOnly: true,
    overview: [
      "Udante is a licensed Nepali tour operator website I designed and built from scratch at udante.com.np (Vercel). It showcases 6 flagship packages — Everest Base Camp, Annapurna Circuit, Chitwan Safari and more — with day-by-day itineraries, altitude charts and accurate GeoJSON trek routes, and drives inquiries via a Quote/WhatsApp flow.",
      "Built mobile-first with Next.js 16 App Router, TypeScript, Tailwind v4, Leaflet + OpenTopoMap/Carto (no API key), Framer Motion and Lenis, and optimized for SEO, Core Web Vitals and conversion. Nepal-specific trust is baked in throughout: NTB Reg/TAAN/NMA/HRA badges, TIMS/ACAP/Sagarmatha permit handling, 1% community pledge and Mar–May / Sep–Nov season logic.",
    ],
    features: [
      { title: "Homepage", desc: "100dvh Ken Burns slideshow (4 Himalayan images, AnimatePresence crossfade), fixed transparent navbar with mega-menu (Tours & Treks → 6 categories), baseline-aligned EBC card (5,364m • 14 days • Strenuous), CustomSelect filters with flip-above logic, cloud-shaped testimonials drifting left (18s, 7s gaps, true SVG cloud), masonry gallery with lightbox." },
      { title: "Tours", desc: "Filterable /packages (hero + sidebar Category/Difficulty/Budget + sort Price/Rating, 1920w hires cards) and /packages/[slug] with breadcrumbs, sticky quick-facts, day-by-day timeline (Acclimatize badges), gradient altitude chart (700×160, gain pill), and 420px interactive trek map." },
      { title: "Trek maps", desc: "Accurate 32-point EBC LineString (Lukla 27.686,86.728 → Kala Patthar 28.007,86.83, valley-following) and 9 day-labeled Point waypoints (D2 … ★ EBC) with hover highlight — OSM tiles, no API key, GeoJSON in src/lib/geojson.ts." },
      { title: "Flows", desc: "Custom Trip Builder 4-step wizard (progress bar, icon cards, radio budget, live preview, POST /api/inquiry), Contact with Google Maps M8RM+FF iframe + hero, About / Blog (featured + TIMS Rs 2,000 pills) / Gallery / FAQ / Legal / sitemap.xml + robots.txt." },
      { title: "Polish", desc: "Lenis 1.1s expo smooth scroll with scroll-to-top on route change, branded 10px scrollbar (#0e7490→#0a2a3a), dynamic header (transparent→white/95 auto-hide), Next/Image logo (h-12), NTB/TAAN trust bars throughout." },
      { title: "Challenges solved", desc: "Fixed valley-cutting GeoJSON straight-line bug, overflow-hidden clipping CustomSelect, Lenis + App Router scroll preservation, module not found: lenis on Windows mount (/tmp vs /mnt/d install), and Chitwan 404 Unsplash hires." },
    ],
    flow: [
      "Browse packages → filter by Category/Difficulty/Budget or custom Trip Builder wizard",
      "Open package → inspect altitude profile, day-by-day timeline and interactive trek map",
      "Request Quote → WhatsApp inquiry pre-filled with package + dates",
      "Contact via M8RM+FF map/office or Blog/FAQ for permits & prep",
    ],
    outcome:
      "Lighthouse-ready, 24 static routes (6 packages SSG), Vercel-deployed and CMS-ready (src/lib/data.ts + src/lib/geojson.ts shaped for future Sanity + Prisma admin) — turning Nepal trekking search into WhatsApp conversations.",
  },
  {
    slug: "minons-aruba",
    title: "Minons — Burger & Grill Aruba",
    short:
      "Full-screen restaurant site for Minions Burger & Grill in Oranjestad: night-time street-grill menu with 50+ items, cart and WhatsApp ordering — Spanish-first, Aruba-priced in AWG.",
    tagline:
      "Aruba street-grill e-commerce — menu, cart and WhatsApp checkout for a night-only grill spot.",
    tags: ["Next.js", "Tailwind", "WhatsApp Order", "AWG Pricing"],
    category: "web",
    year: "2026",
    accent: "from-yellow-300 to-amber-500",
    image: "/projects/minons.svg",
    live: "https://www.minonsaruba.com/",
    client: "Minions Burger & Grill Aruba",
    location: "Seroe Blanco 54, Oranjestad, Aruba — 7PM till late",
    role: "Designer + Full-Stack Developer — menu, ordering flows, deploy",
    platform: ["Restaurant website", "Menu + cart + WhatsApp"],
    archiveOnly: true,
    overview: [
      "Minions Burger & Grill is a night-only street-grill spot in Oranjestad (Seroe Blanco 54, open 7PM till late, +297 743 9894). I built their full-screen website as a bilingual, mobile-first menu and ordering surface: hero with Minion mascots and grill photography, marquee ticker, and direct WhatsApp ordering.",
      "The menu covers 8 categories — patacón, hamburguesa, parrilla, wrap, cabimera, basket, pepitos & hot dogs, arepas — with 50+ items, AWG pricing (16–55 AWG), image modals, and a cart that builds a WhatsApp message for pickup or delivery with location sharing.",
    ],
    features: [
      { title: "Full menu system", desc: "Patacón / Hamburguesa / Parrilla / Wrap / Cabimera / Basket / Pepitos & Hot Dogs / Arepas — 50+ SKUs with AWG tiers (S/M/L/Mega) and crisp photography." },
      { title: "Cart → WhatsApp checkout", desc: "Add to cart, quantity stepper, optional papas fritas add-on, cart total, and Enviar por WhatsApp that pre-fills the order + pickup/delivery choice." },
      { title: "Night-grill branding", desc: "Minion mascots, fire imagery, Spanish copy (INICIO / EL GRILL / ENCUÉNTRANOS), Seroe Blanco address and 7PM–3AM hours throughout." },
      { title: "Mobile-first ordering", desc: "Sticky cart (TU PEDIDO / HACER PEDIDO →), drawer modals for every item with version pickers, and wa.me/2977439894 handoff." },
      { title: "Trust & findability", desc: "Google Maps GXGH+44 link, Seroe Blanco 54 address, and 2019-founded street-food story (Cap. 01 / El Parche / Hecho en Aruba)." },
    ],
    flow: [
      "Browse menu → pick patacón/hamburguesa/parrilla etc. → choose version (Pollo/Steak/Mix) → add to cart",
      "Adjust quantity / add papas fritas → view TU PEDIDO total in AWG",
      "Choose Para recoger / Delivery → Enviar por WhatsApp → location sharing prompt",
      "Restaurant confirms on WhatsApp and prepares the grill order for the night",
    ],
    outcome:
      "A night-grill e-commerce surface turning Instagram discovery into WhatsApp orders — menu, pricing, cart and location in one thumb-friendly site, live at minonsaruba.com.",
  },
];

export const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind",
  "Framer Motion",
  "Flutter",
  "Dart",
  "Node.js",
  "NestJS",
  "Postgres",
  "MongoDB",
  "Prisma",
  "Docker",
  "Nginx",
  "AWS",
  "Vercel",
  "Firebase",
  "CI/CD",
];

export const experience = [
  {
    role: "Manager Digital Operations & Technology",
    place: "UNIGO Education Experts • Full-time",
    time: "Mar 2026 — Present",
    desc: "Lead digital dev + tech ops while hands-on full-stack. Oversee 4 devs/designers across frontend, backend, UI/UX. Build web/mobile apps, CRM, CMS, automation — plus hosting, domains, DNS, servers, DBs and monitoring.",
  },
  {
    role: "Full Stack Developer — Web & Mobile",
    place: "Plus Tech Pvt • Full-time",
    time: "Jan 2025 — Feb 2026",
    desc: "Built responsive web with React/Next.js and backends with Node/NestJS. Flutter apps for Android+iOS. Auth, RBAC, CMS, API integrations with MongoDB, Postgres, Prisma, TypeScript, Tailwind — concept to production.",
  },
  {
    role: "Freelance Full-Stack Developer",
    place: "Fiverr • asmin_dhakal",
    time: "2024 — Now",
    desc: "Custom Flutter apps + animated full-stack websites from $100. Clean code, hosting + deployment included, 1-hour avg response. React, Next, Nest, Flutter, Prisma.",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
