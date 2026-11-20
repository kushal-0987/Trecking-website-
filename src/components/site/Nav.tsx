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
// PEAK CATEGORIES (6000m - 8848m & Multiple Peaks)
// ──────────────────────────────────────────────────────────
export interface PeakItem {
  name: string;
  altitude: string;
  days: string;
  slug: string;
  highlight: string;
  image: string;
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
        image: "/images/trips/peak.jpg",
      },
      {
        name: "Mera Peak Climbing",
        altitude: "6,476 m",
        days: "17 Days",
        slug: "mera-peak-climbing",
        highlight: "Nepal's highest trekking peak with views of 5x 8,000m giants.",
        image: "/images/trips/gokyo.jpg",
      },
      {
        name: "Lobuche East Peak",
        altitude: "6,119 m",
        days: "16 Days",
        slug: "lobuche-east-peak-climbing",
        highlight: "Sharp alpine ridge climbing above the Khumbu Glacier.",
        image: "/images/trips/everest.jpg",
      },
      {
        name: "Chulu West Peak",
        altitude: "6,419 m",
        days: "21 Days",
        slug: "chulu-west-peak-climbing",
        highlight: "Grand glacier ascent overlooking the Annapurna Sanctuary.",
        image: "/images/trips/annapurna.jpg",
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
        image: "/images/trips/hero-ama-dablam.jpg",
      },
      {
        name: "Himlung Himal Expedition",
        altitude: "7,126 m",
        days: "30 Days",
        slug: "himlung-himal-expedition",
        highlight: "Remote border giant near Phu; premier 7,000m stepping stone.",
        image: "/images/trips/manaslu.jpg",
      },
      {
        name: "Baruntse Expedition",
        altitude: "7,129 m",
        days: "32 Days",
        slug: "baruntse-expedition",
        highlight: "Pristine Hunku Basin giant with exceptional summit success.",
        image: "/images/trips/peak.jpg",
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
        image: "/images/trips/everest.jpg",
      },
      {
        name: "Manaslu Expedition",
        altitude: "8,163 m",
        days: "45 Days",
        slug: "manaslu-expedition",
        highlight: "The Mountain of the Spirit; premier autumn 8,000m ascent.",
        image: "/images/trips/manaslu.jpg",
      },
      {
        name: "Kanchenjunga Base & Peak",
        altitude: "8,586 m",
        days: "52 Days",
        slug: "kanchenjunga-base-camp-trek",
        highlight: "Eastern giant on the Sikkim border in untouched wilderness.",
        image: "/images/trips/kanchenjunga.jpg",
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
        image: "/images/trips/peak.jpg",
      },
      {
        name: "Everest Three Passes + Island Peak",
        altitude: "6,189 m",
        days: "21 Days",
        slug: "everest-three-high-passes-trek",
        highlight: "Renjo La, Cho La, Kongma La plus an Island Peak summit finish.",
        image: "/images/trips/gokyo.jpg",
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
            MAIN FLOATING NAVBAR PILL (Alpine Teal & Glacial Cyan Glass)
            - Deep alpine teal/oceanic spruce glass matched to the website theme
            - Logo on left
            - Nepal, Tibet, Bhutan, Nepal Trekking, Tour Packages, Travel Guide, About Us, Contact Us
            - Search & Enquire on right
            ────────────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto relative pointer-events-auto">
          <nav
            className={`w-full rounded-2xl border transition-all duration-300 px-4 sm:px-6 py-2 flex items-center justify-between gap-2 lg:gap-4 shadow-xl backdrop-blur-xl ${
              scrolled || activeDropdown
                ? "bg-gradient-to-r from-[#001e23]/95 via-[#00333b]/95 to-[#001e23]/95 border-[#006b78]/60 shadow-[0_12px_44px_rgba(0,25,30,0.7)] ring-1 ring-[#89d6e2]/25"
                : "bg-gradient-to-r from-[#00262c]/80 via-[#003d46]/75 to-[#00262c]/80 hover:from-[#002e35]/90 hover:via-[#004853]/85 hover:to-[#002e35]/90 border-[#006b78]/50 hover:border-[#89d6e2]/50 shadow-[0_8px_32px_rgba(0,35,42,0.45)] ring-1 ring-white/10"
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
                      ? "text-[#89d6e2] bg-[#00515b]/50 ring-1 ring-[#89d6e2]/30"
                      : "text-white/90 hover:text-[#89d6e2]"
                  }`}
                >
                  <span>Nepal</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform ${
                      activeDropdown === "nepal" ? "rotate-180 text-[#89d6e2]" : "text-[#89d6e2]/70"
                    }`}
                  />
                </button>
              </div>

              {/* TIBET ▾ */}
              <div className="relative" onMouseEnter={() => openDropdown("tibet")}>
                <button
                  type="button"
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                    activeDropdown === "tibet"
                      ? "text-[#89d6e2] bg-[#00515b]/50 ring-1 ring-[#89d6e2]/30"
                      : "text-white/90 hover:text-[#89d6e2]"
                  }`}
                >
                  <span>Tibet</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform ${
                      activeDropdown === "tibet" ? "rotate-180 text-[#89d6e2]" : "text-[#89d6e2]/70"
                    }`}
                  />
                </button>
              </div>

              {/* BHUTAN ▾ */}
              <div className="relative" onMouseEnter={() => openDropdown("bhutan")}>
                <button
                  type="button"
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                    activeDropdown === "bhutan"
                      ? "text-[#89d6e2] bg-[#00515b]/50 ring-1 ring-[#89d6e2]/30"
                      : "text-white/90 hover:text-[#89d6e2]"
                  }`}
                >
                  <span>Bhutan</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform ${
                      activeDropdown === "bhutan" ? "rotate-180 text-[#89d6e2]" : "text-[#89d6e2]/70"
                    }`}
                  />
                </button>
              </div>

              {/* NEPAL TREKKING ▾ */}
              <div className="relative" onMouseEnter={() => openDropdown("trekking")}>
                <button
                  type="button"
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                    activeDropdown === "trekking"
                      ? "text-[#89d6e2] bg-[#00515b]/50 ring-1 ring-[#89d6e2]/30"
                      : "text-white/90 hover:text-[#89d6e2]"
                  }`}
                >
                  <span>Nepal Trekking</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform ${
                      activeDropdown === "trekking" ? "rotate-180 text-[#89d6e2]" : "text-[#89d6e2]/70"
                    }`}
                  />
                </button>
              </div>

              {/* TOUR PACKAGES ▾ */}
              <div className="relative" onMouseEnter={() => openDropdown("tours")}>
                <button
                  type="button"
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                    activeDropdown === "tours"
                      ? "text-[#89d6e2] bg-[#00515b]/50 ring-1 ring-[#89d6e2]/30"
                      : "text-white/90 hover:text-[#89d6e2]"
                  }`}
                >
                  <span>Tour Packages</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform ${
                      activeDropdown === "tours" ? "rotate-180 text-[#89d6e2]" : "text-[#89d6e2]/70"
                    }`}
                  />
                </button>
              </div>

              {/* TRAVEL GUIDE ▾ */}
              <div className="relative" onMouseEnter={() => openDropdown("guide")}>
                <button
                  type="button"
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                    activeDropdown === "guide"
                      ? "text-[#89d6e2] bg-[#00515b]/50 ring-1 ring-[#89d6e2]/30"
                      : "text-white/90 hover:text-[#89d6e2]"
                  }`}
                >
                  <span>Travel Guide</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform ${
                      activeDropdown === "guide" ? "rotate-180 text-[#89d6e2]" : "text-[#89d6e2]/70"
                    }`}
                  />
                </button>
              </div>

              {/* ABOUT US ▾ (Image 2 Reference) */}
              <div className="relative" onMouseEnter={() => openDropdown("about")}>
                <button
                  type="button"
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                    activeDropdown === "about"
                      ? "text-[#89d6e2] bg-[#00515b]/50 ring-1 ring-[#89d6e2]/30"
                      : "text-white/90 hover:text-[#89d6e2]"
                  }`}
                >
                  <span>About Us</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform ${
                      activeDropdown === "about" ? "rotate-180 text-[#89d6e2]" : "text-[#89d6e2]/70"
                    }`}
                  />
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
                className="w-8 h-8 rounded-lg bg-[#004650]/40 hover:bg-[#005a66]/60 border border-[#006b78]/50 hover:border-[#89d6e2]/60 text-[#89d6e2] flex items-center justify-center transition-colors cursor-pointer shadow-sm"
                aria-label="Search Treks & Destinations"
                title="Search destinations..."
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Enquire Button (Alpine Gold Gradient Pill) */}
              <Link
                href="/#enquiry"
                className="group flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[#c88a3e] hover:border-[#e8b765] bg-gradient-to-r from-[#c88a3e]/25 to-[#e8b765]/20 hover:from-[#c88a3e] hover:to-[#e8b765] text-[#e8b765] hover:text-[#002228] text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_2px_12px_rgba(200,138,62,0.3)] hover:shadow-[0_4px_20px_rgba(232,183,101,0.5)] cursor-pointer whitespace-nowrap"
              >
                <Send className="w-3 h-3 text-[#e8b765] group-hover:text-[#002228] transition-all group-hover:translate-x-0.5" />
                <span className="hidden sm:inline">Enquire</span>
              </Link>

              {/* Mobile Menu Hamburger */}
              <button
                type="button"
                className="xl:hidden w-8 h-8 rounded-lg bg-[#004650]/40 border border-[#006b78]/50 text-[#89d6e2] hover:border-[#89d6e2]/60 flex items-center justify-center cursor-pointer transition-colors shadow-sm"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close menu" : "Open menu"}
              >
                {open ? <X className="h-4 w-4 text-[#e8b765]" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </nav>

          {/* ──────────────────────────────────────────────────────────
              3. PEAK ALTITUDE TIER SUB-NAV (Alpine Teal & Cyan Theme)
              6000m-6500m | 6501-7000m | 7001m-8848m | Multiple Peaks
              ────────────────────────────────────────────────────────── */}
          <div className="hidden xl:flex items-center justify-center mt-1.5">
            <div className="inline-flex items-center gap-4 sm:gap-6 px-5 py-1 rounded-full border border-[#006b78]/50 bg-gradient-to-r from-[#00242a]/85 via-[#003840]/80 to-[#00242a]/85 hover:from-[#002c33]/90 hover:via-[#00444e]/85 hover:to-[#002c33]/90 backdrop-blur-xl shadow-[0_6px_22px_rgba(0,30,36,0.45)] text-[11px] font-mono tracking-wider transition-colors ring-1 ring-[#89d6e2]/15">
              <span className="text-[#89d6e2] flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest">
                <Mountain className="w-3 h-3 text-[#e8b765]" />
                Peak Tiers:
              </span>

              {PEAK_TIERS.map((tier) => (
                <div
                  key={tier.id}
                  className="relative"
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (activeDropdown === tier.id) {
                        setActiveDropdown(null);
                      } else {
                        if (closeTimer.current) window.clearTimeout(closeTimer.current);
                        setActiveDropdown(tier.id);
                      }
                    }}
                    className={`flex items-center gap-1 transition-colors cursor-pointer py-0.5 ${
                      activeDropdown === tier.id
                        ? "text-[#89d6e2] font-bold drop-shadow-[0_0_8px_rgba(137,214,226,0.4)]"
                        : "text-white/80 hover:text-[#89d6e2]"
                    }`}
                  >
                    <span>{tier.label}</span>
                    <ChevronDown
                      className={`w-3 h-3 transition-transform ${
                        activeDropdown === tier.id ? "rotate-180 text-[#89d6e2]" : "text-[#89d6e2]/50"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ──────────────────────────────────────────────────────────
              4. DROPDOWN PANELS (Desktop)
              Alpine Teal & Cyan Theme matched to Selected High Routes
              ────────────────────────────────────────────────────────── */}
          {activeDropdown && (
            <div
              onMouseEnter={() => {
                if (closeTimer.current) window.clearTimeout(closeTimer.current);
              }}
              className="hidden xl:block mt-2 rounded-2xl border border-[#006b78]/60 bg-gradient-to-b from-[#002a31]/98 via-[#003840]/96 to-[#002227]/98 shadow-[0_24px_64px_rgba(0,20,25,0.85)] backdrop-blur-2xl p-6 ring-1 ring-[#89d6e2]/20 animate-in fade-in slide-in-from-top-2 duration-200"
            >
              {/* NEPAL DROPDOWN */}
              {activeDropdown === "nepal" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#006b78]/40 pb-2">
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#89d6e2]">
                      Nepal Expeditions &amp; High Valleys
                    </p>
                    <Link
                      href="/destinations?country=nepal"
                      onClick={() => setActiveDropdown(null)}
                      className="font-mono text-xs uppercase text-[#e8b765] hover:text-[#f4cb7d] hover:underline flex items-center gap-1"
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
                            className="font-mono text-[11px] uppercase tracking-wider text-[#e8b765] font-semibold hover:text-[#f4cb7d] hover:underline block"
                          >
                            {region.label}
                          </Link>
                          <ul className="space-y-1.5">
                            {list.map((trip) => (
                              <li key={trip.slug}>
                                <Link
                                  href={`/destinations/${trip.slug}`}
                                  onClick={() => setActiveDropdown(null)}
                                  className="text-xs text-white/80 hover:text-[#89d6e2] transition-colors block truncate"
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
                  <div className="flex items-center justify-between border-b border-[#006b78]/40 pb-2">
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#89d6e2]">
                      Tibet Roof of the World Expeditions
                    </p>
                    <Link
                      href="/destinations?country=tibet"
                      onClick={() => setActiveDropdown(null)}
                      className="font-mono text-xs uppercase text-[#e8b765] hover:text-[#f4cb7d] hover:underline flex items-center gap-1"
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
                        className="group rounded-xl border border-[#006b78]/40 bg-[#00242b]/60 hover:bg-[#00515b]/45 hover:border-[#89d6e2]/60 p-4 transition-all duration-200 shadow-sm hover:shadow-[0_4px_20px_rgba(137,214,226,0.18)]"
                      >
                        <h4 className="font-serif text-base text-white group-hover:text-[#89d6e2] transition-colors">
                          {trip.name}
                        </h4>
                        <p className="text-xs text-white/70 mt-1 line-clamp-2">
                          {trip.overview}
                        </p>
                        <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-[#89d6e2]">
                          <span>{trip.days} Days</span>
                          <span className="font-semibold">{trip.maxAltitude} m</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* BHUTAN DROPDOWN */}
              {activeDropdown === "bhutan" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#006b78]/40 pb-2">
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#89d6e2]">
                      Kingdom of Bhutan Dzongs &amp; Alpine Passes
                    </p>
                    <Link
                      href="/destinations?country=bhutan"
                      onClick={() => setActiveDropdown(null)}
                      className="font-mono text-xs uppercase text-[#e8b765] hover:text-[#f4cb7d] hover:underline flex items-center gap-1"
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
                        className="group rounded-xl border border-[#006b78]/40 bg-[#00242b]/60 hover:bg-[#00515b]/45 hover:border-[#89d6e2]/60 p-4 transition-all duration-200 shadow-sm hover:shadow-[0_4px_20px_rgba(137,214,226,0.18)]"
                      >
                        <h4 className="font-serif text-base text-white group-hover:text-[#89d6e2] transition-colors">
                          {trip.name}
                        </h4>
                        <p className="text-xs text-white/70 mt-1 line-clamp-2">
                          {trip.overview}
                        </p>
                        <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-[#89d6e2]">
                          <span>{trip.days} Days</span>
                          <span className="font-semibold">{trip.maxAltitude} m</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* NEPAL TREKKING DROPDOWN */}
              {activeDropdown === "trekking" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#006b78]/40 pb-2">
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#89d6e2]">
                      Nepal Trekking Routes by Region
                    </p>
                    <Link
                      href="/treks"
                      onClick={() => setActiveDropdown(null)}
                      className="font-mono text-xs uppercase text-[#e8b765] hover:text-[#f4cb7d] hover:underline flex items-center gap-1"
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
                            className="font-mono text-[11px] uppercase tracking-wider text-[#e8b765] font-semibold hover:text-[#f4cb7d] hover:underline block"
                          >
                            {region.label}
                          </Link>
                          <ul className="space-y-1.5">
                            {trips.map((t) => (
                              <li key={t.slug}>
                                <Link
                                  href={`/destinations/${t.slug}`}
                                  onClick={() => setActiveDropdown(null)}
                                  className="text-xs text-white/80 hover:text-[#89d6e2] transition-colors block truncate"
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
                  <div className="flex items-center justify-between border-b border-[#006b78]/40 pb-2">
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#89d6e2]">
                      Himalayan Cultural Tours, Safari &amp; Helicopter Flights
                    </p>
                    <Link
                      href="/destinations?category=tours"
                      onClick={() => setActiveDropdown(null)}
                      className="font-mono text-xs uppercase text-[#e8b765] hover:text-[#f4cb7d] hover:underline flex items-center gap-1"
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
                          className="font-mono text-xs uppercase tracking-wider text-[#e8b765] font-semibold hover:text-[#f4cb7d] hover:underline block"
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
                                  className="text-xs text-white/80 hover:text-[#89d6e2] transition-colors block truncate"
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
                  <div className="flex items-center justify-between border-b border-[#006b78]/40 pb-2">
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#89d6e2]">
                      High-Altitude Expedition Guides &amp; Protocols
                    </p>
                    <Link
                      href="/process"
                      onClick={() => setActiveDropdown(null)}
                      className="font-mono text-xs uppercase text-[#e8b765] hover:text-[#f4cb7d] hover:underline flex items-center gap-1"
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
                          className="group rounded-xl border border-[#006b78]/40 bg-[#00242b]/60 hover:bg-[#00515b]/45 hover:border-[#89d6e2]/60 p-4 transition-all duration-200 space-y-2 block shadow-sm hover:shadow-[0_4px_20px_rgba(137,214,226,0.18)]"
                        >
                          <Icon className="w-5 h-5 text-[#89d6e2] group-hover:scale-110 transition-transform" />
                          <h4 className="font-serif text-sm text-white group-hover:text-[#89d6e2] transition-colors">
                            {g.title}
                          </h4>
                          <p className="text-[11px] text-white/70 leading-relaxed">
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
                  <div className="flex items-center justify-between border-b border-[#006b78]/40 pb-2">
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#89d6e2]">
                      BROTHERS Holidays Adventure Pvt. Ltd.
                    </p>
                    <Link
                      href="/about"
                      onClick={() => setActiveDropdown(null)}
                      className="font-mono text-xs uppercase text-[#e8b765] hover:text-[#f4cb7d] hover:underline flex items-center gap-1"
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
                          className="group flex items-start gap-3 rounded-xl border border-[#006b78]/40 bg-[#00242b]/60 hover:bg-[#00515b]/45 hover:border-[#89d6e2]/60 p-3.5 transition-all duration-200 shadow-sm hover:shadow-[0_4px_20px_rgba(137,214,226,0.18)]"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#00515b]/50 border border-[#89d6e2]/35 flex items-center justify-center text-[#89d6e2] group-hover:text-[#e8b765] group-hover:border-[#e8b765]/50 shrink-0 group-hover:scale-105 transition-all">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-serif text-sm text-white group-hover:text-[#89d6e2] transition-colors leading-snug">
                              {sub.label}
                            </h4>
                            <p className="text-[11px] text-white/65 leading-tight mt-0.5">
                              {sub.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* PEAK TIERS DROPDOWNS — Image Cards Design (Reference: Popular Destinations) */}
              {PEAK_TIERS.some((t) => t.id === activeDropdown) && (
                <div>
                  {(() => {
                    const tier = PEAK_TIERS.find((t) => t.id === activeDropdown)!;
                    return (
                      <div className="space-y-5">
                        {/* Header: "Explore Our Treks / Popular Destinations" style */}
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Mountain className="w-4 h-4 text-[#89d6e2]" />
                              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#89d6e2]/80 font-semibold">
                                Explore Our Treks
                              </span>
                            </div>
                            <h3 className="font-serif text-xl text-white leading-snug">
                              Popular{" "}
                              <em className="text-[#e8b765] not-italic font-semibold">Destinations</em>
                            </h3>
                            <p className="text-[11px] text-white/60 font-mono mt-0.5">
                              {tier.label} · {tier.range}
                            </p>
                          </div>
                          <Link
                            href="/destinations?category=peak-climbing"
                            onClick={() => setActiveDropdown(null)}
                            className="font-mono text-xs uppercase text-[#e8b765] hover:text-[#f4cb7d] hover:underline flex items-center gap-1 whitespace-nowrap"
                          >
                            All Climbing Expeditions <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>

                        {/* Peak Cards with Images */}
                        <div className="grid grid-cols-3 gap-4">
                          {tier.peaks.map((peak) => (
                            <Link
                              key={peak.name}
                              href={`/destinations/${peak.slug}`}
                              onClick={() => setActiveDropdown(null)}
                              className="group rounded-xl border border-[#2a5e3a]/50 bg-gradient-to-br from-[#0c2a15]/80 to-[#0a1f10]/80 hover:border-[#55c024]/60 hover:shadow-[0_6px_24px_rgba(85,192,36,0.2)] p-0 transition-all duration-300 block overflow-hidden"
                            >
                              {/* Image Section */}
                              <div className="relative h-28 w-full overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={peak.image}
                                  alt={peak.name}
                                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f10]/90 via-[#0a1f10]/30 to-transparent" />
                                {/* Duration & Altitude Badges over image */}
                                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#1b3d1f]/90 border border-[#55c024]/40 text-[10px] font-mono font-bold text-white backdrop-blur-sm">
                                    <Mountain className="w-2.5 h-2.5 text-[#7ce63a]" />
                                    {peak.days}
                                  </span>
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#55c024]/25 border border-[#55c024]/50 text-[10px] font-mono font-bold text-[#7ce63a] backdrop-blur-sm">
                                    <Mountain className="w-2.5 h-2.5" />
                                    {peak.altitude}
                                  </span>
                                </div>
                              </div>
                              {/* Text Section */}
                              <div className="p-3.5 space-y-1.5">
                                <h4 className="font-serif text-sm text-white group-hover:text-[#7ce63a] transition-colors leading-snug">
                                  {peak.name}
                                </h4>
                                <p className="text-[11px] text-white/65 leading-relaxed font-light line-clamp-2">
                                  {peak.highlight}
                                </p>
                                <div className="flex items-center justify-end pt-1">
                                  <span className="w-6 h-6 rounded-full bg-[#55c024]/20 border border-[#55c024]/40 flex items-center justify-center group-hover:bg-[#55c024] group-hover:border-[#7ce63a] transition-all">
                                    <ArrowUpRight className="w-3 h-3 text-[#7ce63a] group-hover:text-white transition-colors" />
                                  </span>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>

                        {/* Bottom: Trek · Explore · Discover */}
                        <div className="flex items-center gap-3 pt-1 border-t border-[#2a5e3a]/30">
                          <Mountain className="w-4 h-4 text-[#e8b765]" />
                          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#e8b765]/70 font-bold">
                            Trek · Explore · Discover
                          </span>
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
              Complete nested accordions with alpine teal & cyan styling
              ────────────────────────────────────────────────────────── */}
          {open && (
            <div className="mt-2 rounded-2xl border border-[#006b78]/60 bg-gradient-to-b from-[#00282f]/98 via-[#00373f]/98 to-[#002026]/98 px-5 py-6 backdrop-blur-2xl xl:hidden shadow-2xl max-h-[82vh] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200 space-y-4 ring-1 ring-[#89d6e2]/20">
              <div className="flex items-center justify-between border-b border-[#006b78]/40 pb-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#89d6e2] font-semibold">
                  Expedition Menu
                </span>
                <span className="text-xs font-mono text-[#89d6e2]/60">Nepal · Tibet · Bhutan</span>
              </div>

              {/* Nepal */}
              <div className="border-b border-[#006b78]/30 pb-2">
                <button
                  type="button"
                  onClick={() => setMobileExpanded((e) => (e === "nepal" ? null : "nepal"))}
                  className="flex w-full items-center justify-between py-2 text-xs font-semibold uppercase tracking-wider text-white hover:text-[#89d6e2] transition-colors"
                >
                  <span>Nepal Destinations</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      mobileExpanded === "nepal" ? "rotate-180 text-[#89d6e2]" : "text-[#89d6e2]/70"
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
                                className="block text-[11px] text-white/75 hover:text-[#89d6e2]"
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
              <div className="border-b border-[#006b78]/30 pb-2">
                <button
                  type="button"
                  onClick={() => setMobileExpanded((e) => (e === "tibet" ? null : "tibet"))}
                  className="flex w-full items-center justify-between py-2 text-xs font-semibold uppercase tracking-wider text-white hover:text-[#89d6e2] transition-colors"
                >
                  <span>Tibet Tours</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      mobileExpanded === "tibet" ? "rotate-180 text-[#89d6e2]" : "text-[#89d6e2]/70"
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
                          className="block text-[11px] text-white/75 hover:text-[#89d6e2]"
                        >
                          {t.name} ({t.days}d)
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Bhutan */}
              <div className="border-b border-[#006b78]/30 pb-2">
                <button
                  type="button"
                  onClick={() => setMobileExpanded((e) => (e === "bhutan" ? null : "bhutan"))}
                  className="flex w-full items-center justify-between py-2 text-xs font-semibold uppercase tracking-wider text-white hover:text-[#89d6e2] transition-colors"
                >
                  <span>Bhutan Expeditions</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      mobileExpanded === "bhutan" ? "rotate-180 text-[#89d6e2]" : "text-[#89d6e2]/70"
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
                          className="block text-[11px] text-white/75 hover:text-[#89d6e2]"
                        >
                          {t.name} ({t.days}d)
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Peak Climbing by Elevation (Image 3) */}
              <div className="border-b border-[#006b78]/30 pb-2">
                <button
                  type="button"
                  onClick={() => setMobileExpanded((e) => (e === "peaks" ? null : "peaks"))}
                  className="flex w-full items-center justify-between py-2 text-xs font-semibold uppercase tracking-wider text-[#89d6e2] hover:text-white transition-colors"
                >
                  <span>Peak Climbing Tiers (6000m - 8848m)</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      mobileExpanded === "peaks" ? "rotate-180 text-[#89d6e2]" : "text-[#89d6e2]/70"
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
                                className="block text-[11px] text-white/75 hover:text-[#89d6e2]"
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
              <div className="border-b border-[#006b78]/30 pb-2">
                <button
                  type="button"
                  onClick={() => setMobileExpanded((e) => (e === "about" ? null : "about"))}
                  className="flex w-full items-center justify-between py-2 text-xs font-semibold uppercase tracking-wider text-white hover:text-[#89d6e2] transition-colors"
                >
                  <span>About Us</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      mobileExpanded === "about" ? "rotate-180 text-[#89d6e2]" : "text-[#89d6e2]/70"
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
                          className="block text-[11px] text-white/80 hover:text-[#89d6e2]"
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
                  className="block py-1.5 text-xs font-mono uppercase tracking-wider text-white/80 hover:text-[#89d6e2]"
                >
                  All Destinations (38 Trips)
                </Link>
                <Link
                  href="/treks"
                  onClick={() => setOpen(false)}
                  className="block py-1.5 text-xs font-mono uppercase tracking-wider text-white/80 hover:text-[#89d6e2]"
                >
                  Trek Profiles &amp; Elevation Charts
                </Link>
                <Link
                  href="/process"
                  onClick={() => setOpen(false)}
                  className="block py-1.5 text-xs font-mono uppercase tracking-wider text-white/80 hover:text-[#89d6e2]"
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
                className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-600/30 border border-emerald-500/50 text-emerald-300 font-mono text-xs font-bold hover:bg-emerald-600/40 transition-colors"
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
          Triggered by Search icon in navigation (Alpine Teal Theme)
          ────────────────────────────────────────────────────────── */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 sm:pt-32 p-4 bg-[#00171c]/85 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl rounded-2xl border border-[#006b78]/70 bg-gradient-to-b from-[#00282f] via-[#00363e] to-[#001f25] p-6 shadow-2xl space-y-4 ring-1 ring-[#89d6e2]/25">
            <div className="flex items-center justify-between border-b border-[#006b78]/40 pb-3">
              <div className="flex items-center gap-2 text-[#89d6e2] text-xs font-mono uppercase tracking-wider">
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
              className="w-full bg-[#001c21] border border-[#006b78]/60 focus:border-[#89d6e2] rounded-xl px-4 py-3 text-sm text-white placeholder-[#89d6e2]/40 outline-none transition-colors"
            />

            {searchQuery.trim() && (
              <div className="max-h-72 overflow-y-auto space-y-2 pt-2 divide-y divide-[#006b78]/30">
                {filteredTrips.length === 0 ? (
                  <p className="text-xs text-[#89d6e2]/60 font-mono py-4 text-center">
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
                      className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#00515b]/35 border border-transparent hover:border-[#006b78]/40 transition-colors group cursor-pointer"
                    >
                      <div>
                        <h4 className="font-serif text-sm text-white group-hover:text-[#89d6e2] transition-colors">
                          {trip.name}
                        </h4>
                        <p className="text-[11px] font-mono text-[#89d6e2]/70">
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

            <div className="pt-2 border-t border-[#006b78]/40 flex items-center justify-between text-[11px] font-mono text-white/50">
              <span>Press ESC or close button to exit</span>
              <Link
                href="/destinations"
                onClick={() => setSearchOpen(false)}
                className="text-[#e8b765] hover:text-[#f4cb7d] hover:underline"
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
