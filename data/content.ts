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
