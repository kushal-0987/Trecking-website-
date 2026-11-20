"use client";

import {
  ArrowUpRight,
  ChevronDown,
  Menu,
  Mountain,
  Send,
  X,
  Search,
  Compass,
  ShieldCheck,
  FileText,
  Users,
  HeartHandshake,
  BookOpen,
  Calendar,
  Layers,
  PhoneCall,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  TRIPS,
  REGIONS,
  tripsByCountry,
  tripsByRegion,
  type Trip,
} from "@/data/trips";

// ──────────────────────────────────────────────────────────
// PEAK CATEGORIES (Image 3 Reference: 6000m - 8848m & Multiple)
// ──────────────────────────────────────────────────────────
export interface PeakItem {
  name: string;
  altitude: string;
  days: string;
  slug: string;
  highlight: string;
}

export const PEAK_TIERS: {
  id: string;
  label: string;
  range: string;
  peaks: PeakItem[];
}[] = [
  {
    id: "6000-6500",
    label: "6000m - 6500m Peaks",
    range: "Trekking Peaks (NMA Group B)",
    peaks: [
      {
        name: "Island Peak (Imja Tse)",
        altitude: "6,189 m",
        days: "18 Days",
        slug: "island-peak-climbing",
        highlight: "Classic first Himalayan summit above Chhukung.",
      },
      {
        name: "Mera Peak Climbing",
        altitude: "6,476 m",
        days: "17 Days",
        slug: "mera-peak-climbing",
        highlight: "Nepal's highest trekking peak with views of 5x 8,000m giants.",
      },
      {
        name: "Lobuche East Peak",
        altitude: "6,119 m",
        days: "16 Days",
        slug: "lobuche-east-peak-climbing",
        highlight: "Sharp alpine ridge climbing above the Khumbu Glacier.",
      },
      {
        name: "Chulu West Peak",
        altitude: "6,419 m",
        days: "21 Days",
        slug: "chulu-west-peak-climbing",
        highlight: "Grand glacier ascent overlooking the Annapurna Sanctuary.",
      },
    ],
  },
  {
    id: "6501-7000",
    label: "6501-7000m Peaks",
    range: "Technical Alpine Ascents",
    peaks: [
      {
        name: "Ama Dablam Expedition",
        altitude: "6,812 m",
        days: "28 Days",
        slug: "ama-dablam-expedition",
        highlight: "The Matterhorn of the Himalayas via the Southwest Ridge.",
      },
      {
        name: "Himlung Himal Expedition",
        altitude: "7,126 m",
        days: "30 Days",
        slug: "himlung-himal-expedition",
        highlight: "Remote border giant near Phu; premier 7,000m stepping stone.",
      },
      {
        name: "Baruntse Expedition",
        altitude: "7,129 m",
        days: "32 Days",
        slug: "baruntse-expedition",
        highlight: "Pristine Hunku Basin giant with exceptional summit success.",
      },
    ],
  },
  {
    id: "7001-8848",
    label: "7001m-8848m Peaks",
    range: "The Great 8,000m Expeditions",
    peaks: [
      {
        name: "Mt. Everest Expedition (South Col)",
        altitude: "8,848.86 m",
        days: "60 Days",
        slug: "mount-everest-expedition",
        highlight: "The roof of the earth; 1:1 Sherpa guide and topout oxygen.",
      },
      {
        name: "Manaslu Expedition",
        altitude: "8,163 m",
        days: "45 Days",
        slug: "manaslu-expedition",
        highlight: "The Mountain of the Spirit; premier autumn 8,000m ascent.",
      },
      {
        name: "Kanchenjunga Base & Peak",
        altitude: "8,586 m",
        days: "52 Days",
        slug: "kanchenjunga-base-camp-trek",
        highlight: "Eastern giant on the Sikkim border in untouched wilderness.",
      },
    ],
  },
  {
    id: "multiple-peaks",
    label: "Multiple Peaks",
    range: "Linked Summit Traverses",
    peaks: [
      {
        name: "Island Peak & Mera Peak Double Ascent",
        altitude: "6,476 m",
        days: "22 Days",
        slug: "island-mera-combo-climbing",
        highlight: "Two 6,000m summits linked via the technical Amphu Labtsa Pass.",
      },
      {
        name: "Everest Three Passes + Island Peak",
        altitude: "6,189 m",
        days: "21 Days",
        slug: "everest-three-high-passes-trek",
        highlight: "Renjo La, Cho La, Kongma La plus an Island Peak summit finish.",
      },
    ],
  },
];

// ──────────────────────────────────────────────────────────
// ABOUT US SUB-FEATURES (Image 2 Reference)
// ──────────────────────────────────────────────────────────
export const ABOUT_SUBMENU = [
  {
    label: "About Us",
    href: "/about",
    desc: "Our high-altitude heritage, story & ethos.",
    icon: Compass,
  },
  {
    label: "Our Blog",
    href: "/journal",
    desc: "Expedition field notes, medical dispatches & route news.",
    icon: BookOpen,
  },
  {
    label: "Our Team",
    href: "/about#our-team",
    desc: "Lead Sherpa Sardars, IFMGA guides & medical leads.",
    icon: Users,
  },
  {
    label: "Responsible Travel",
    href: "/about#responsible-travel",
    desc: "Porter protection charter, zero-waste & school funding.",
    icon: HeartHandshake,
  },
  {
    label: "Why Travel with Us?",
    href: "/about#why-us",
    desc: "1:6 guest ratios, Garmin satellite SOS & safety net.",
    icon: ShieldCheck,
  },
  {
    label: "Legal Documents – Brothers Holidays Adventure Pvt. Ltd.",
    href: "/about#legal-documents",
    desc: "Govt. Reg. 58177/068/069, NTB, TAAN & NMA licenses.",
    icon: FileText,
  },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openDropdown = (key: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setActiveDropdown(key);
  };

  const scheduleClose = () => {
    closeTimer.current = window.setTimeout(() => setActiveDropdown(null), 180);
  };

  // Real-time filtered search results
  const filteredTrips = searchQuery.trim()
    ? TRIPS.filter(
        (t) =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.maxAltitude.toString().includes(searchQuery)
      ).slice(0, 8)
    : [];

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 pt-2.5 sm:pt-3.5 px-3 sm:px-6 pointer-events-none transition-all duration-300"
        onMouseLeave={scheduleClose}
      >
        {/* ──────────────────────────────────────────────────────────
            MAIN FLOATING NAVBAR PILL (Refined Glass & Blurry Translucent)
            - Blurry transparent obsidian glass matched to high-altitude hero
            - Logo on left
            - Nepal, Tibet, Bhutan, Nepal Trekking, Tour Packages, Travel Guide, About Us, Contact Us
            - Search & Enquire on right
            ────────────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto relative pointer-events-auto">
          <nav
            className={`w-full rounded-2xl border transition-all duration-300 px-4 sm:px-6 py-2 flex items-center justify-between gap-2 lg:gap-4 shadow-xl backdrop-blur-xl ${
              scrolled || activeDropdown
                ? "bg-[#071317]/80 border-[#c59a4a]/40 shadow-[0_12px_40px_rgba(0,0,0,0.6)] ring-1 ring-white/10"
                : "bg-[#050c0e]/40 hover:bg-[#071317]/55 border-[#c59a4a]/25 shadow-[0_8px_32px_rgba(0,0,0,0.35)] ring-1 ring-white/5"
            }`}
          >
            {/* 1. LEFT BRAND LOGO */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              data-launch-reload="true"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                setActiveDropdown(null);
                // eslint-disable-next-line @next/next/no-location-assign-relative-destination
                window.location.href = "/";
              }}
              className="group flex items-center text-white shrink-0 cursor-pointer mr-1"
              aria-label="BROTHERS Holidays Adventure Home"
              onMouseEnter={scheduleClose}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/brothers_logo_navbar.png"
                alt="BROTHERS Holidays Adventure"
                className="h-7 sm:h-8 md:h-9 w-auto max-w-[130px] sm:max-w-[150px] md:max-w-none object-contain transition-transform duration-300 group-hover:scale-[1.03] drop-shadow-md"
              />
            </a>

            {/* 2. DESKTOP MAIN NAVIGATION */}
            <div className="hidden xl:flex items-center gap-1 2xl:gap-2">
              {/* NEPAL ▾ */}
              <div className="relative" onMouseEnter={() => openDropdown("nepal")}>
                <button
                  type="button"
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                    activeDropdown === "nepal"
                      ? "text-[#e8b765] bg-white/5"
                      : "text-white/90 hover:text-[#e8b765]"
                  }`}
                >
                  <span>Nepal</span>
                  <ChevronDown className="w-3 h-3 text-[#e8b765]" />
                </button>
              </div>

              {/* TIBET ▾ */}
              <div className="relative" onMouseEnter={() => openDropdown("tibet")}>
                <button
                  type="button"
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                    activeDropdown === "tibet"
                      ? "text-[#e8b765] bg-white/5"
                      : "text-white/90 hover:text-[#e8b765]"
                  }`}
                >
                  <span>Tibet</span>
                  <ChevronDown className="w-3 h-3 text-[#e8b765]" />
                </button>
              </div>

              {/* BHUTAN ▾ */}
              <div className="relative" onMouseEnter={() => openDropdown("bhutan")}>
                <button
                  type="button"
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                    activeDropdown === "bhutan"
                      ? "text-[#e8b765] bg-white/5"
                      : "text-white/90 hover:text-[#e8b765]"
                  }`}
                >
                  <span>Bhutan</span>
                  <ChevronDown className="w-3 h-3 text-[#e8b765]" />
                </button>
              </div>

              {/* NEPAL TREKKING ▾ */}
              <div className="relative" onMouseEnter={() => openDropdown("trekking")}>
                <button
                  type="button"
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                    activeDropdown === "trekking"
                      ? "text-[#e8b765] bg-white/5"
                      : "text-white/90 hover:text-[#e8b765]"
                  }`}
                >
                  <span>Nepal Trekking</span>
                  <ChevronDown className="w-3 h-3 text-[#e8b765]" />
                </button>
              </div>

              {/* TOUR PACKAGES ▾ */}
              <div className="relative" onMouseEnter={() => openDropdown("tours")}>
                <button
                  type="button"
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                    activeDropdown === "tours"
                      ? "text-[#e8b765] bg-white/5"
                      : "text-white/90 hover:text-[#e8b765]"
                  }`}
                >
                  <span>Tour Packages</span>
                  <ChevronDown className="w-3 h-3 text-[#e8b765]" />
                </button>
              </div>

              {/* TRAVEL GUIDE ▾ */}
              <div className="relative" onMouseEnter={() => openDropdown("guide")}>
                <button
                  type="button"
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                    activeDropdown === "guide"
                      ? "text-[#e8b765] bg-white/5"
                      : "text-white/90 hover:text-[#e8b765]"
                  }`}
                >
                  <span>Travel Guide</span>
                  <ChevronDown className="w-3 h-3 text-[#e8b765]" />
                </button>
              </div>

              {/* ABOUT US ▾ (Image 2 Reference) */}
              <div className="relative" onMouseEnter={() => openDropdown("about")}>
                <button
                  type="button"
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                    activeDropdown === "about"
                      ? "text-[#e8b765] bg-white/5"
                      : "text-white/90 hover:text-[#e8b765]"
                  }`}
                >
                  <span>About Us</span>
                  <ChevronDown className="w-3 h-3 text-[#e8b765]" />
                </button>
              </div>

              {/* CONTACT US (Coral/Red Accent from Image 1) */}
              <Link
                href="/contact"
                onMouseEnter={scheduleClose}
                className="px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider text-rose-400 hover:text-rose-300 transition-colors"
              >
                Contact Us
              </Link>
            </div>

            {/* 3. RIGHT SECTION: Search + Enquire Button */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Instant Search Button */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#e8b765]/50 text-white/80 hover:text-[#e8b765] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Search Treks & Destinations"
                title="Search destinations..."
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Enquire Button */}
              <Link
                href="/#enquiry"
                className="group flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[#d99f38] hover:border-[#e8b765] bg-[#d99f38]/15 hover:bg-[#d99f38] text-[#e8b765] hover:text-[#071317] text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm cursor-pointer whitespace-nowrap"
              >
                <Send className="w-3 h-3 text-[#e8b765] group-hover:text-[#071317] transition-all group-hover:translate-x-0.5" />
                <span className="hidden sm:inline">Enquire</span>
              </Link>

              {/* Mobile Menu Hamburger */}
              <button
                type="button"
                className="xl:hidden w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white flex items-center justify-center cursor-pointer hover:border-[#e8b765]/50 transition-colors"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close menu" : "Open menu"}
              >
                {open ? <X className="h-4 w-4 text-[#e8b765]" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </nav>

          {/* ──────────────────────────────────────────────────────────
              3. PEAK ALTITUDE TIER SUB-NAV (Image 3 Reference)
              6000m-6500m | 6501-7000m | 7001m-8848m | Multiple Peaks
              ────────────────────────────────────────────────────────── */}
          <div className="hidden xl:flex items-center justify-center mt-1.5">
            <div className="inline-flex items-center gap-4 sm:gap-6 px-5 py-1 rounded-full border border-[#c59a4a]/20 bg-[#050c0e]/40 hover:bg-[#071317]/60 backdrop-blur-xl shadow-lg text-[11px] font-mono tracking-wider transition-colors">
              <span className="text-[#e8b765]/70 flex items-center gap-1 text-[10px] uppercase font-bold">
                <Mountain className="w-3 h-3 text-[#e8b765]" />
                Peak Tiers:
              </span>

              {PEAK_TIERS.map((tier) => (
                <div
                  key={tier.id}
                  className="relative"
                  onMouseEnter={() => openDropdown(tier.id)}
                >
                  <button
                    type="button"
                    className={`flex items-center gap-1 transition-colors cursor-pointer py-0.5 ${
                      activeDropdown === tier.id
                        ? "text-[#e8b765] font-bold"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    <span>{tier.label}</span>
                    <ChevronDown
                      className={`w-3 h-3 transition-transform ${
                        activeDropdown === tier.id ? "rotate-180 text-[#e8b765]" : "text-white/40"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ──────────────────────────────────────────────────────────
              4. DROPDOWN PANELS (Desktop)
              Attached seamlessly beneath the navbar
              ────────────────────────────────────────────────────────── */}
          {activeDropdown && (
            <div
              onMouseEnter={() => {
                if (closeTimer.current) window.clearTimeout(closeTimer.current);
              }}
              className="hidden xl:block mt-2 rounded-2xl border border-[#c59a4a]/40 bg-[#071317]/98 shadow-[0_20px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl p-6 animate-in fade-in slide-in-from-top-2 duration-200"
            >
              {/* NEPAL DROPDOWN */}
              {activeDropdown === "nepal" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#89d6e2]">
                      Nepal Expeditions &amp; High Valleys
                    </p>
                    <Link
                      href="/destinations?country=nepal"
                      onClick={() => setActiveDropdown(null)}
                      className="font-mono text-xs uppercase text-[#e8b765] hover:underline flex items-center gap-1"
                    >
                      View all Nepal routes <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-4 gap-6">
                    {REGIONS.map((region) => {
                      const list = tripsByRegion(region.id).slice(0, 4);
                      return (
                        <div key={region.id} className="space-y-2">
                          <Link
                            href={`/destinations?region=${region.id}`}
                            onClick={() => setActiveDropdown(null)}
                            className="font-mono text-[11px] uppercase tracking-wider text-[#e8b765] font-semibold hover:underline block"
                          >
                            {region.label}
                          </Link>
                          <ul className="space-y-1.5">
                            {list.map((trip) => (
                              <li key={trip.slug}>
                                <Link
                                  href={`/destinations/${trip.slug}`}
                                  onClick={() => setActiveDropdown(null)}
                                  className="text-xs text-white/75 hover:text-white transition-colors block truncate"
                                >
                                  {trip.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TIBET DROPDOWN */}
              {activeDropdown === "tibet" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#89d6e2]">
                      Tibet Roof of the World Expeditions
                    </p>
                    <Link
                      href="/destinations?country=tibet"
                      onClick={() => setActiveDropdown(null)}
                      className="font-mono text-xs uppercase text-[#e8b765] hover:underline flex items-center gap-1"
                    >
                      View all Tibet routes <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    {tripsByCountry("tibet").map((trip) => (
                      <Link
                        key={trip.slug}
                        href={`/destinations/${trip.slug}`}
                        onClick={() => setActiveDropdown(null)}
                        className="group rounded-xl border border-white/10 bg-white/5 p-4 hover:border-[#c59a4a]/50 transition-all"
                      >
                        <h4 className="font-serif text-base text-white group-hover:text-[#e8b765]">
                          {trip.name}
                        </h4>
                        <p className="text-xs text-white/60 mt-1 line-clamp-2">
                          {trip.overview}
                        </p>
                        <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-[#89d6e2]">
                          <span>{trip.days} Days</span>
                          <span>{trip.maxAltitude} m</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* BHUTAN DROPDOWN */}
              {activeDropdown === "bhutan" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#89d6e2]">
                      Kingdom of Bhutan Dzongs &amp; Alpine Passes
                    </p>
                    <Link
                      href="/destinations?country=bhutan"
                      onClick={() => setActiveDropdown(null)}
                      className="font-mono text-xs uppercase text-[#e8b765] hover:underline flex items-center gap-1"
                    >
                      View all Bhutan routes <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    {tripsByCountry("bhutan").map((trip) => (
                      <Link
                        key={trip.slug}
                        href={`/destinations/${trip.slug}`}
                        onClick={() => setActiveDropdown(null)}
                        className="group rounded-xl border border-white/10 bg-white/5 p-4 hover:border-[#c59a4a]/50 transition-all"
                      >
                        <h4 className="font-serif text-base text-white group-hover:text-[#e8b765]">
                          {trip.name}
                        </h4>
                        <p className="text-xs text-white/60 mt-1 line-clamp-2">
                          {trip.overview}
                        </p>
                        <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-[#89d6e2]">
                          <span>{trip.days} Days</span>
                          <span>{trip.maxAltitude} m</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* NEPAL TREKKING DROPDOWN */}
              {activeDropdown === "trekking" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#89d6e2]">
                      Nepal Trekking Routes by Region
                    </p>
                    <Link
                      href="/treks"
                      onClick={() => setActiveDropdown(null)}
                      className="font-mono text-xs uppercase text-[#e8b765] hover:underline flex items-center gap-1"
                    >
                      View full routes directory <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-4 gap-6">
                    {REGIONS.map((region) => {
                      const trips = tripsByRegion(region.id).slice(0, 4);
                      return (
                        <div key={region.id} className="space-y-2">
                          <Link
                            href={`/destinations?region=${region.id}`}
                            onClick={() => setActiveDropdown(null)}
                            className="font-mono text-[11px] uppercase tracking-wider text-[#e8b765] font-semibold hover:underline block"
                          >
                            {region.label}
                          </Link>
                          <ul className="space-y-1.5">
                            {trips.map((t) => (
                              <li key={t.slug}>
                                <Link
                                  href={`/destinations/${t.slug}`}
                                  onClick={() => setActiveDropdown(null)}
                                  className="text-xs text-white/75 hover:text-white transition-colors block truncate"
                                >
                                  {t.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TOUR PACKAGES DROPDOWN */}
              {activeDropdown === "tours" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#89d6e2]">
                      Himalayan Cultural Tours, Safari &amp; Helicopter Flights
                    </p>
                    <Link
                      href="/destinations?category=tours"
                      onClick={() => setActiveDropdown(null)}
                      className="font-mono text-xs uppercase text-[#e8b765] hover:underline flex items-center gap-1"
                    >
                      View all tours <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    {[
                      {
                        title: "Cultural & Heritage",
                        trips: ["Kathmandu Valley Heritage Tour", "Nepal Heritage & Lakes Tour"],
                        catHref: "/destinations?category=tours",
                      },
                      {
                        title: "Wildlife Safari",
                        trips: ["Chitwan Jungle Safari", "Bardia Tiger Safari"],
                        catHref: "/destinations?category=wildlife-safari",
                      },
                      {
                        title: "Helicopter Expeditions",
                        trips: [
                          "Everest Base Camp Helicopter Tour",
                          "Annapurna Base Camp Helicopter Tour",
                          "Gosainkunda Helicopter Tour",
                        ],
                        catHref: "/destinations?category=helicopter-tours",
                      },
                    ].map((group) => (
                      <div key={group.title} className="space-y-2.5">
                        <Link
                          href={group.catHref}
                          onClick={() => setActiveDropdown(null)}
                          className="font-mono text-xs uppercase tracking-wider text-[#e8b765] font-semibold hover:underline block"
                        >
                          {group.title}
                        </Link>
                        <ul className="space-y-1.5">
                          {group.trips.map((name) => {
                            const trip = TRIPS.find((t) => t.name === name);
                            return (
                              <li key={name}>
                                <Link
                                  href={trip ? `/destinations/${trip.slug}` : "/destinations"}
                                  onClick={() => setActiveDropdown(null)}
                                  className="text-xs text-white/75 hover:text-white transition-colors block truncate"
                                >
                                  {name}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TRAVEL GUIDE DROPDOWN */}
              {activeDropdown === "guide" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#89d6e2]">
                      High-Altitude Expedition Guides &amp; Protocols
                    </p>
                    <Link
                      href="/process"
                      onClick={() => setActiveDropdown(null)}
                      className="font-mono text-xs uppercase text-[#e8b765] hover:underline flex items-center gap-1"
                    >
                      Our 5-Stage Methodology <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-4 gap-6">
                    {[
                      {
                        title: "Best Seasons to Trek",
                        desc: "Autumn (Oct–Nov) crystal skies vs. Spring (Mar–May) rhododendrons.",
                        icon: Calendar,
                        href: "/process#preparation",
                      },
                      {
                        title: "Trekking Permits & TIMS",
                        desc: "Sagarmatha, ACAP, MCAP & restricted area permit regulations.",
                        icon: FileText,
                        href: "/process#permits",
                      },
                      {
                        title: "High Altitude & AMS Protocol",
                        desc: "Daily pulse oximeter monitoring, Gamow bag & ascent pacing.",
                        icon: ShieldCheck,
                        href: "/process#medical",
                      },
                      {
                        title: "Expedition Gear Checklist",
                        desc: "Layering, -20°C sleeping bags, crampons & satellite tracking.",
                        icon: Layers,
                        href: "/process#gear",
                      },
                    ].map((g) => {
                      const Icon = g.icon;
                      return (
                        <Link
                          key={g.title}
                          href={g.href}
                          onClick={() => setActiveDropdown(null)}
                          className="group rounded-xl border border-white/10 bg-white/5 p-4 hover:border-[#c59a4a]/50 transition-all space-y-2 block"
                        >
                          <Icon className="w-5 h-5 text-[#e8b765] group-hover:scale-110 transition-transform" />
                          <h4 className="font-serif text-sm text-white group-hover:text-[#e8b765]">
                            {g.title}
                          </h4>
                          <p className="text-[11px] text-white/60 leading-relaxed">
                            {g.desc}
                          </p>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ABOUT US DROPDOWN (Image 2 Reference - Exact Match) */}
              {activeDropdown === "about" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#89d6e2]">
                      BROTHERS Holidays Adventure Pvt. Ltd.
                    </p>
                    <Link
                      href="/about"
                      onClick={() => setActiveDropdown(null)}
                      className="font-mono text-xs uppercase text-[#e8b765] hover:underline flex items-center gap-1"
                    >
                      About Us Overview <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {ABOUT_SUBMENU.map((sub) => {
                      const Icon = sub.icon;
                      return (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          onClick={() => setActiveDropdown(null)}
                          className="group flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3.5 hover:border-[#c59a4a]/60 hover:bg-white/[0.08] transition-all"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#c59a4a]/20 border border-[#c59a4a]/30 flex items-center justify-center text-[#e8b765] shrink-0 group-hover:scale-105 transition-transform">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-serif text-sm text-white group-hover:text-[#e8b765] transition-colors leading-snug">
                              {sub.label}
                            </h4>
                            <p className="text-[11px] text-white/55 leading-tight mt-0.5">
                              {sub.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* PEAK TIERS DROPDOWNS (Image 3 Reference: 6000m-6500m, 6501-7000m, etc.) */}
              {PEAK_TIERS.some((t) => t.id === activeDropdown) && (
                <div>
                  {(() => {
                    const tier = PEAK_TIERS.find((t) => t.id === activeDropdown)!;
                    return (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-white/10 pb-2">
                          <div>
                            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#89d6e2]">
                              {tier.label}
                            </p>
                            <p className="text-[11px] text-white/50 font-mono mt-0.5">
                              {tier.range}
                            </p>
                          </div>
                          <Link
                            href="/destinations?category=peak-climbing"
                            onClick={() => setActiveDropdown(null)}
                            className="font-mono text-xs uppercase text-[#e8b765] hover:underline flex items-center gap-1"
                          >
                            All Climbing Expeditions <ArrowUpRight className="w-3 h-3" />
                          </Link>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          {tier.peaks.map((peak) => (
                            <Link
                              key={peak.name}
                              href={`/destinations/${peak.slug}`}
                              onClick={() => setActiveDropdown(null)}
                              className="group rounded-xl border border-white/10 bg-white/5 p-4 hover:border-[#c59a4a]/60 hover:bg-white/[0.08] transition-all space-y-2 block"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-xs font-bold text-[#e8b765] px-2 py-0.5 rounded bg-[#c59a4a]/15 border border-[#c59a4a]/30">
                                  {peak.altitude}
                                </span>
                                <span className="font-mono text-[10px] text-white/50">
                                  {peak.days}
                                </span>
                              </div>
                              <h4 className="font-serif text-base text-white group-hover:text-[#e8b765] transition-colors">
                                {peak.name}
                              </h4>
                              <p className="text-xs text-white/60 leading-relaxed font-light">
                                {peak.highlight}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          )}

          {/* ──────────────────────────────────────────────────────────
              5. MOBILE NAVIGATION DRAWER
              Complete nested accordions with all requested items
              ────────────────────────────────────────────────────────── */}
          {open && (
            <div className="mt-2 rounded-2xl border border-[#c59a4a]/40 bg-[#071317]/98 px-5 py-6 backdrop-blur-2xl xl:hidden shadow-2xl max-h-[82vh] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#e8b765] font-semibold">
                  Expedition Menu
                </span>
                <span className="text-xs font-mono text-white/40">Nepal · Tibet · Bhutan</span>
              </div>

              {/* Nepal */}
              <div className="border-b border-white/10 pb-2">
                <button
                  type="button"
                  onClick={() => setMobileExpanded((e) => (e === "nepal" ? null : "nepal"))}
                  className="flex w-full items-center justify-between py-2 text-xs font-semibold uppercase tracking-wider text-white"
                >
                  <span>Nepal Destinations</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      mobileExpanded === "nepal" ? "rotate-180 text-[#e8b765]" : ""
                    }`}
                  />
                </button>
                {mobileExpanded === "nepal" && (
                  <div className="space-y-3 pt-2 pl-3">
                    {REGIONS.map((r) => (
                      <div key={r.id}>
                        <p className="font-mono text-[10px] uppercase text-[#e8b765] font-semibold">
                          {r.label}
                        </p>
                        <ul className="space-y-1 mt-1 pl-2">
                          {tripsByRegion(r.id).slice(0, 3).map((t) => (
                            <li key={t.slug}>
                              <Link
                                href={`/destinations/${t.slug}`}
                                onClick={() => setOpen(false)}
                                className="block text-[11px] text-white/70 hover:text-white"
                              >
                                {t.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Tibet */}
              <div className="border-b border-white/10 pb-2">
                <button
                  type="button"
                  onClick={() => setMobileExpanded((e) => (e === "tibet" ? null : "tibet"))}
                  className="flex w-full items-center justify-between py-2 text-xs font-semibold uppercase tracking-wider text-white"
                >
                  <span>Tibet Tours</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      mobileExpanded === "tibet" ? "rotate-180 text-[#e8b765]" : ""
                    }`}
                  />
                </button>
                {mobileExpanded === "tibet" && (
                  <ul className="space-y-1.5 pt-2 pl-3">
                    {tripsByCountry("tibet").map((t) => (
                      <li key={t.slug}>
                        <Link
                          href={`/destinations/${t.slug}`}
                          onClick={() => setOpen(false)}
                          className="block text-[11px] text-white/70 hover:text-white"
                        >
                          {t.name} ({t.days}d)
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Bhutan */}
              <div className="border-b border-white/10 pb-2">
                <button
                  type="button"
                  onClick={() => setMobileExpanded((e) => (e === "bhutan" ? null : "bhutan"))}
                  className="flex w-full items-center justify-between py-2 text-xs font-semibold uppercase tracking-wider text-white"
                >
                  <span>Bhutan Expeditions</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      mobileExpanded === "bhutan" ? "rotate-180 text-[#e8b765]" : ""
                    }`}
                  />
                </button>
                {mobileExpanded === "bhutan" && (
                  <ul className="space-y-1.5 pt-2 pl-3">
                    {tripsByCountry("bhutan").map((t) => (
                      <li key={t.slug}>
                        <Link
                          href={`/destinations/${t.slug}`}
                          onClick={() => setOpen(false)}
                          className="block text-[11px] text-white/70 hover:text-white"
                        >
                          {t.name} ({t.days}d)
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Peak Climbing by Elevation (Image 3) */}
              <div className="border-b border-white/10 pb-2">
                <button
                  type="button"
                  onClick={() => setMobileExpanded((e) => (e === "peaks" ? null : "peaks"))}
                  className="flex w-full items-center justify-between py-2 text-xs font-semibold uppercase tracking-wider text-[#e8b765]"
                >
                  <span>Peak Climbing Tiers (6000m - 8848m)</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      mobileExpanded === "peaks" ? "rotate-180 text-[#e8b765]" : ""
                    }`}
                  />
                </button>
                {mobileExpanded === "peaks" && (
                  <div className="space-y-3 pt-2 pl-3">
                    {PEAK_TIERS.map((tier) => (
                      <div key={tier.id}>
                        <p className="font-mono text-[10px] uppercase text-[#89d6e2] font-semibold">
                          {tier.label}
                        </p>
                        <ul className="space-y-1 mt-1 pl-2">
                          {tier.peaks.map((p) => (
                            <li key={p.name}>
                              <Link
                                href={`/destinations/${p.slug}`}
                                onClick={() => setOpen(false)}
                                className="block text-[11px] text-white/70 hover:text-white"
                              >
                                {p.name} · {p.altitude}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* About Us (Image 2) */}
              <div className="border-b border-white/10 pb-2">
                <button
                  type="button"
                  onClick={() => setMobileExpanded((e) => (e === "about" ? null : "about"))}
                  className="flex w-full items-center justify-between py-2 text-xs font-semibold uppercase tracking-wider text-white"
                >
                  <span>About Us</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      mobileExpanded === "about" ? "rotate-180 text-[#e8b765]" : ""
                    }`}
                  />
                </button>
                {mobileExpanded === "about" && (
                  <ul className="space-y-2 pt-2 pl-3">
                    {ABOUT_SUBMENU.map((sub) => (
                      <li key={sub.label}>
                        <Link
                          href={sub.href}
                          onClick={() => setOpen(false)}
                          className="block text-[11px] text-white/80 hover:text-[#e8b765]"
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Quick Route Links */}
              <div className="pt-2 space-y-2">
                <Link
                  href="/destinations"
                  onClick={() => setOpen(false)}
                  className="block py-1.5 text-xs font-mono uppercase tracking-wider text-white/80 hover:text-white"
                >
                  All Destinations (38 Trips)
                </Link>
                <Link
                  href="/treks"
                  onClick={() => setOpen(false)}
                  className="block py-1.5 text-xs font-mono uppercase tracking-wider text-white/80 hover:text-white"
                >
                  Trek Profiles &amp; Elevation Charts
                </Link>
                <Link
                  href="/process"
                  onClick={() => setOpen(false)}
                  className="block py-1.5 text-xs font-mono uppercase tracking-wider text-white/80 hover:text-white"
                >
                  Our Expedition Methodology
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="block py-1.5 text-xs font-mono uppercase tracking-wider text-rose-400 font-bold"
                >
                  Contact Head Office (Kathmandu)
                </Link>
              </div>

              {/* WhatsApp Hotline Button */}
              <a
                href="https://wa.me/9779851058678"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-600/30 border border-emerald-500/50 text-emerald-300 font-mono text-xs font-bold"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>WhatsApp: +977 9851 058678 (24/7)</span>
              </a>
            </div>
          )}
        </div>
      </header>

      {/* ──────────────────────────────────────────────────────────
          6. INSTANT INTERACTIVE SEARCH MODAL
          Triggered by Search icon in navigation
          ────────────────────────────────────────────────────────── */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 sm:pt-32 p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl rounded-2xl border border-[#c59a4a]/50 bg-[#071317] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-white/50 text-xs font-mono uppercase tracking-wider">
                <Search className="w-4 h-4 text-[#e8b765]" />
                <span>Quick Route Search</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                }}
                className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <input
              type="text"
              autoFocus
              placeholder="Search by peak, region or trek name (e.g. Everest, 6000m, Annapurna, Island Peak)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0a1820] border border-white/15 focus:border-[#e8b765] rounded-xl px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition-colors"
            />

            {searchQuery.trim() && (
              <div className="max-h-72 overflow-y-auto space-y-2 pt-2 divide-y divide-white/5">
                {filteredTrips.length === 0 ? (
                  <p className="text-xs text-white/50 font-mono py-4 text-center">
                    No matching expeditions found for &ldquo;{searchQuery}&rdquo;.
                  </p>
                ) : (
                  filteredTrips.map((trip: Trip) => (
                    <Link
                      key={trip.slug}
                      href={`/destinations/${trip.slug}`}
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="flex items-center justify-between p-2.5 rounded-lg hover:bg-white/5 transition-colors group cursor-pointer"
                    >
                      <div>
                        <h4 className="font-serif text-sm text-white group-hover:text-[#e8b765]">
                          {trip.name}
                        </h4>
                        <p className="text-[11px] font-mono text-white/50">
                          {trip.area} · {trip.country.toUpperCase()}
                        </p>
                      </div>
                      <div className="text-right font-mono text-xs">
                        <span className="text-[#89d6e2] font-semibold">{trip.maxAltitude} m</span>
                        <span className="text-white/40 ml-2">{trip.days}d</span>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            )}

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/40">
              <span>Press ESC or close button to exit</span>
              <Link
                href="/destinations"
                onClick={() => setSearchOpen(false)}
                className="text-[#e8b765] hover:underline"
              >
                Browse All 45 Expeditions &raquo;
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Nav;
