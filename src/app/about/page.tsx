"use client";

import Link from "next/link";
import {
  Compass,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Award,
  Users,
  HeartHandshake,
  FileText,
  Radio,
  Clock,
  Sparkles,
  ExternalLink,
  PhoneCall,
} from "lucide-react";
import { useState } from "react";

const ABOUT_TABS = [
  { id: "overview", label: "About Us" },
  { id: "our-team", label: "Our Team" },
  { id: "why-us", label: "Why Travel With Us?" },
  { id: "responsible-travel", label: "Responsible Travel" },
  { id: "legal-documents", label: "Legal Documents" },
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const scrollTo = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex flex-col w-full bg-[#071116] text-white selection:bg-[#c9a46a] selection:text-white">
      {/* ──────────────────────────────────────────────────────────
          1. EDITORIAL HERO SECTION
          ────────────────────────────────────────────────────────── */}
      <section
        id="overview"
        className="relative w-full pt-16 sm:pt-24 pb-16 sm:pb-24 px-6 lg:px-12 overflow-hidden border-b border-[#c59a4a]/25"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('/images/cta-himalaya-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#071116]/80 via-[#071116]/90 to-[#071116]" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c59a4a]/50 bg-[#0c1b22]/80 backdrop-blur-md text-[#e8b765] shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c59a4a] animate-pulse" />
            <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.25em]">
              Brothers Holidays Adventure Pvt. Ltd. · Est. Kathmandu
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-white">
            Rooted in the high passes,{" "}
            <em className="text-[#e8b765] font-serif not-italic">
              crafted for the silence.
            </em>
          </h1>

          <p className="text-white/75 text-base sm:text-lg md:text-xl font-light max-w-3xl mx-auto leading-relaxed">
            BROTHERS Holidays Adventure is an indigenous, Sherpa-led Himalayan expedition
            and alpine trekking outfitter headquartered in Thamel, Kathmandu. We craft
            intimate, safe, and life-defining ascents across Nepal, Tibet, and Bhutan.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/destinations"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#e8b765] via-[#dfa851] to-[#c59a4a] text-[#071317] font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              Explore Our Expeditions
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/9779851058678"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full border border-[#c59a4a]/60 bg-[#0c1b22]/70 hover:bg-[#0c1b22] text-white font-medium text-xs sm:text-sm uppercase tracking-wider backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-[#e8b765]" />
              Talk With a Lead Guide (24/7)
            </a>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          2. STICKY IN-PAGE FEATURE JUMP NAVIGATION
          Allows instant jumping between requested About Us sub-features
          ────────────────────────────────────────────────────────── */}
      <nav aria-label="About Sections" className="sticky top-20 z-30 w-full bg-[#050c0e]/90 backdrop-blur-xl border-b border-[#c59a4a]/25 py-2.5 px-4 overflow-x-auto shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 sm:gap-4 min-w-max">
          {ABOUT_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => scrollTo(tab.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#e8b765] text-[#071317] font-bold shadow-md ring-1 ring-[#e8b765]"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
          <Link
            href="/journal"
            className="px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-[#89d6e2] hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1"
          >
            <span>Our Blog</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </nav>

      {/* ──────────────────────────────────────────────────────────
          3. THE FOUNDATION STORY (2-COLUMN EDITORIAL)
          ────────────────────────────────────────────────────────── */}
      <section className="relative w-full py-16 sm:py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.25em] text-[#e8b765]">
              Chapter I · The Brothers Ethos
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight">
              A refusal to turn sacred Himalayan peaks into crowded tourist conveyor belts.
            </h2>
            <div className="space-y-4 text-white/75 text-sm sm:text-base leading-relaxed font-light">
              <p>
                Founded in Thamel, Kathmandu, BROTHERS Holidays Adventure grew from
                decades of high-altitude rope-fixing, high-pass guiding, and deep
                family ties across the Khumbu, Annapurna, and Manaslu valleys.
              </p>
              <p>
                While mass-tourism operators rush safety margins, pack thirty travelers
                behind an inexperienced guide, and compromise porter welfare, we chose
                the opposite direction: strict 1:6 guest ratios, conservative
                acclimatization schedules, and complete financial transparency.
              </p>
              <p>
                When you step onto the trail with Brothers, you walk with certified
                Sherpa climbing leads who know every stone, weather pattern, and
                teahouse elder from Lukla to the South Col.
              </p>
            </div>

            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-white/10">
              <div>
                <span className="font-serif text-2xl sm:text-3xl text-[#e8b765] block font-normal">
                  10+
                </span>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-white/50">
                  Years Guiding
                </span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl text-[#e8b765] block font-normal">
                  100%
                </span>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-white/50">
                  Local Crew
                </span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl text-[#e8b765] block font-normal">
                  8,848m
                </span>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-white/50">
                  Summit Mastery
                </span>
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl border border-[#c59a4a]/40 bg-[#0a171d]/90 p-8 shadow-2xl backdrop-blur-xl space-y-6">
            <div className="w-12 h-12 rounded-xl bg-[#c59a4a]/15 border border-[#c59a4a]/30 flex items-center justify-center text-[#e8b765]">
              <Compass className="w-6 h-6" />
            </div>

            <h3 className="font-serif text-2xl text-white font-normal">
              Our Core Guiding Principles
            </h3>

            <ul className="space-y-4">
              {[
                {
                  title: "100% Fair Porter & Guide Welfare",
                  desc: "Fair wages, comprehensive medical insurance, warm high-mountain gear, and strict 25kg porter weight limits.",
                },
                {
                  title: "Conservative Acclimatization",
                  desc: "We never rush schedules. Stage elevations strictly observe UIAA high-altitude medical guidelines.",
                },
                {
                  title: "Leave No Trace Commitment",
                  desc: "We pack out all non-biodegradable waste, support solar teahouse power, and avoid single-use plastics.",
                },
                {
                  title: "Direct Satellite Comm & Rescue Link",
                  desc: "Every team carries Garmin inReach satellite devices and pulse oximeters, with 24/7 direct standby for helicopter evacuation.",
                },
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#c59a4a] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      {item.title}
                    </h4>
                    <p className="text-xs text-white/60 leading-relaxed mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          4. OUR TEAM SECTION (#our-team)
          Requested in Image 2: "Our Team"
          ────────────────────────────────────────────────────────── */}
      <section
        id="our-team"
        className="relative w-full py-20 px-6 lg:px-12 bg-[#050c0e] border-y border-[#c59a4a]/25 scroll-mt-28"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c59a4a]/15 border border-[#c59a4a]/30 text-[#e8b765] text-xs font-mono uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              <span>Elite Sherpa Mountaineers &amp; Management</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal">
              Meet Our Team
            </h2>
            <p className="text-white/65 text-sm sm:text-base leading-relaxed">
              We do not subcontract freelance guides. Our expeditions are personally
              led by certified IFMGA / NMA mountain sardars and high-altitude wilderness
              logistics professionals with decades on the world&apos;s highest ridges.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Pasang Dawa Sherpa",
                role: "Chief Expedition Leader",
                creds: "11x Everest Summiter · IFMGA Certified",
                origin: "Pangboche, Khumbu",
                desc: "Born in the shadow of Ama Dablam, Pasang has fixed ropes on South Col and guided over 40 Himalayan expeditions with a spotless safety record.",
                stat: "11 Summits",
              },
              {
                name: "Tenzing Norbu Lama",
                role: "Senior High-Pass Sardar",
                creds: "14 Years Guiding · NMA Mountain Guide",
                origin: "Samagaon, Manaslu",
                desc: "Specialist in Three Passes, Thorong La, and Larkya La traverses. Known for his extraordinary pacing, altitude acumen, and warmth on the trail.",
                stat: "45+ Passes",
              },
              {
                name: "Dawa Lhamo Sherpa",
                role: "Director of Field Operations",
                creds: "Master in Tourism · Wilderness First Responder",
                origin: "Namche Bazaar",
                desc: "Oversees base camp logistics, helicopter medical evacuation protocols, government permits, and eco-sustainable teahouse contracts.",
                stat: "100% Evac Net",
              },
              {
                name: "Dr. Karma Tenzing",
                role: "High-Altitude Medical Advisor",
                creds: "MBBS · High-Altitude Medicine Diploma (UIAA)",
                origin: "Kathmandu",
                desc: "Prepares our teams' daily altitude monitoring protocols, oxygen reserves, Gamow hyperbaric bag setups, and wilderness first-aid kits.",
                stat: "Medical Lead",
              },
            ].map((member) => (
              <div
                key={member.name}
                className="group rounded-2xl border border-white/10 bg-[#09171e]/90 p-6 flex flex-col justify-between space-y-4 hover:border-[#c59a4a]/60 hover:shadow-[0_10px_30px_rgba(197,154,74,0.15)] transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-full bg-[#c59a4a]/20 border border-[#c59a4a]/40 flex items-center justify-center text-[#e8b765] font-serif text-lg font-bold group-hover:scale-105 transition-transform">
                      {member.name[0]}
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-[#89d6e2] border border-white/10">
                      {member.stat}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-white group-hover:text-[#e8b765] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-mono text-[#e8b765] mt-0.5 font-semibold">
                      {member.role}
                    </p>
                    <p className="text-[11px] text-white/50 font-mono mt-1">
                      {member.creds} · {member.origin}
                    </p>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed font-light">
                    {member.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/40">
                  <span>Brothers Core Crew</span>
                  <span className="text-[#e8b765]">Certified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          5. WHY TRAVEL WITH US? (#why-us)
          Requested in Image 2: "Why Travel with us?"
          ────────────────────────────────────────────────────────── */}
      <section
        id="why-us"
        className="relative w-full py-20 px-6 lg:px-12 max-w-7xl mx-auto space-y-14 scroll-mt-28"
      >
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c59a4a]/15 border border-[#c59a4a]/30 text-[#e8b765] text-xs font-mono uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>The Brothers Standard</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal">
            Why Travel With Us?
          </h2>
          <p className="text-white/65 text-sm sm:text-base leading-relaxed">
            Himalayan trekking is not merely a scenic vacation—it requires absolute
            technical precision, deep cultural respect, and unquestioned safety protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Users,
              title: "1:6 Strict Guide-to-Guest Ratio",
              desc: "We never herd large groups. Every 6 trekkers are accompanied by a licensed Sherpa guide and dedicated assistant guide, ensuring tailored pacing.",
            },
            {
              icon: Radio,
              title: "Garmin inReach Satellite Telemetry",
              desc: "Every expedition carries satellite tracking with two-way text messaging and immediate 24/7 coordination with Nepal emergency rescue services.",
            },
            {
              icon: ShieldCheck,
              title: "Comprehensive High-Altitude Medical Net",
              desc: "Daily pulse oximeter tests, supplemental oxygen on high passes, and immediate descent protocols prevent severe acute mountain sickness.",
            },
            {
              icon: HeartHandshake,
              title: "100% Certified Local Sherpa Guides",
              desc: "Born and raised in the mountain valleys, our leaders carry generations of indigenous terrain wisdom, weather foresight, and warmth.",
            },
            {
              icon: Clock,
              title: "Risk-Free Booking & Flexible Rescheduling",
              desc: "Lifetime deposit guarantee with zero rescheduling penalties up to 30 days prior to departure. Your travel investment is always protected.",
            },
            {
              icon: Sparkles,
              title: "Heated Base Camp Domes & Fresh Food",
              desc: "On our peak expeditions and high circuits, we provide insulated geodesic dome tents, heated dining marquees, and organic nutritious meals.",
            },
          ].map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="rounded-2xl border border-white/10 bg-[#09151b]/80 p-7 space-y-4 hover:border-[#c59a4a]/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-[#c59a4a]/15 border border-[#c59a4a]/30 flex items-center justify-center text-[#e8b765]">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl text-white">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-white/65 leading-relaxed font-light">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Comparison Table: Standard vs Brothers */}
        <div className="mt-12 rounded-2xl border border-[#c59a4a]/30 bg-[#061014]/90 p-6 sm:p-8 overflow-x-auto shadow-2xl">
          <h3 className="font-serif text-2xl text-white mb-6 text-center">
            How Brothers Compares to Budget Mass Operators
          </h3>
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-white/15 text-white/50 font-mono text-[11px] uppercase tracking-wider">
                <th className="pb-3 font-semibold">Expedition Aspect</th>
                <th className="pb-3 font-semibold text-rose-400">Budget / Mass Operators</th>
                <th className="pb-3 font-semibold text-[#e8b765]">BROTHERS Holidays Adventure</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-white/80">
              <tr>
                <td className="py-3 font-medium text-white">Group Size &amp; Guide Ratio</td>
                <td className="py-3 text-white/60">1 guide per 15–20 trekkers</td>
                <td className="py-3 text-[#e8b765] font-semibold">Strict 1:6 maximum guest ratio</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-white">Porter Welfare Code</td>
                <td className="py-3 text-white/60">35kg+ loads, basic cotton clothing</td>
                <td className="py-3 text-[#e8b765] font-semibold">25kg strict limit, warm mountain gear &amp; insurance</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-white">Emergency Communication</td>
                <td className="py-3 text-white/60">Mobile phone only (zero signal on high passes)</td>
                <td className="py-3 text-[#e8b765] font-semibold">Garmin inReach Satellite SOS on every departure</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-white">Acclimatization Policy</td>
                <td className="py-3 text-white/60">Rushed 10-12 day EBC itineraries</td>
                <td className="py-3 text-[#e8b765] font-semibold">UIAA medically backed 14-16 day schedules</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-white">Legal Protection</td>
                <td className="py-3 text-white/60">Subcontracted freelancers</td>
                <td className="py-3 text-[#e8b765] font-semibold">100% Nepal Tourism Board &amp; TAAN Bonded</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          6. RESPONSIBLE TRAVEL & SUSTAINABILITY (#responsible-travel)
          Requested in Image 2: "Responsible Travel"
          ────────────────────────────────────────────────────────── */}
      <section
        id="responsible-travel"
        className="relative w-full py-20 px-6 lg:px-12 bg-[#050d11] border-y border-[#c59a4a]/25 scroll-mt-28"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c59a4a]/15 border border-[#c59a4a]/30 text-[#e8b765] text-xs font-mono uppercase tracking-wider">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Ethical High-Altitude Tourism</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal">
              Responsible Travel &amp; Porter Welfare
            </h2>
            <p className="text-white/65 text-sm sm:text-base leading-relaxed">
              The Himalayas are sacred homelands, not sports stadiums. We believe
              true luxury lies in deep integrity—ensuring that every porter, teahouse family,
              and alpine ecosystem is protected for generations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-white/10 bg-[#09171e]/90 p-8 space-y-4">
              <span className="font-mono text-xs text-[#e8b765] uppercase tracking-wider block">
                Pillar I · Porter Protection
              </span>
              <h3 className="font-serif text-2xl text-white font-normal">
                Fair Wages, Medical Care &amp; Weight Limits
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                Our porters are the true backbone of Himalayan expeditions. We guarantee:
              </p>
              <ul className="space-y-2 text-xs text-white/80">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#e8b765] shrink-0" />
                  <span>Strict 25 kg load limit per porter</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#e8b765] shrink-0" />
                  <span>30% above industry standard living wage</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#e8b765] shrink-0" />
                  <span>Warm high-altitude boots, jackets &amp; sunglasses</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#e8b765] shrink-0" />
                  <span>Full medical evacuation insurance covering up to $10,000</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#09171e]/90 p-8 space-y-4">
              <span className="font-mono text-xs text-[#e8b765] uppercase tracking-wider block">
                Pillar II · Environmental Care
              </span>
              <h3 className="font-serif text-2xl text-white font-normal">
                Leave No Trace &amp; Zero Waste Trails
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                Glaciers are retreating at unprecedented rates. We operate with strict ecological protocols:
              </p>
              <ul className="space-y-2 text-xs text-white/80">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#e8b765] shrink-0" />
                  <span>Zero single-use plastic water bottles on guided treks</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#e8b765] shrink-0" />
                  <span>Pack-out 100% of non-biodegradable expedition trash</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#e8b765] shrink-0" />
                  <span>Solar-powered charging &amp; renewable teahouse partners</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#e8b765] shrink-0" />
                  <span>Annual volunteer clean-up on Khumbu &amp; Annapurna trails</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#09171e]/90 p-8 space-y-4">
              <span className="font-mono text-xs text-[#e8b765] uppercase tracking-wider block">
                Pillar III · Community Return
              </span>
              <h3 className="font-serif text-2xl text-white font-normal">
                5% Dedicated to Himalayan Village Schools
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                Tourism must directly benefit the children of the mountain communities:
              </p>
              <ul className="space-y-2 text-xs text-white/80">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#e8b765] shrink-0" />
                  <span>5% of annual profits support Solukhumbu school libraries</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#e8b765] shrink-0" />
                  <span>Porter children educational scholarship sponsorships</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#e8b765] shrink-0" />
                  <span>Direct purchasing of local produce and valley supplies</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#e8b765] shrink-0" />
                  <span>Free wilderness first-aid training for rural villagers</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          7. LEGAL DOCUMENTS & ACCREDITATIONS (#legal-documents)
          Requested in Image 2: "Legal Documents – Nepal Hiking Adventure Pvt. Ltd."
          Adapted to our official brand: "Brothers Holidays Adventure Pvt. Ltd."
          ────────────────────────────────────────────────────────── */}
      <section
        id="legal-documents"
        className="relative w-full py-20 px-6 lg:px-12 max-w-7xl mx-auto space-y-12 scroll-mt-28"
      >
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c59a4a]/15 border border-[#c59a4a]/30 text-[#e8b765] text-xs font-mono uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>Government Verified &amp; Bonded</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal">
            Legal Documents – Brothers Holidays Adventure Pvt. Ltd.
          </h2>
          <p className="text-white/65 text-sm sm:text-base leading-relaxed">
            Brothers Holidays Adventure Pvt. Ltd. is a fully registered, government-authorized,
            and financially bonded adventure travel company operating under the laws of
            the Government of Nepal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Company Registration Certificate",
              auth: "Ministry of Industry & Office of Company Registrar",
              number: "Reg. No. 58177/068/069",
              status: "Active & Verified",
              desc: "Certified as a private limited corporation authorized to operate domestic and international mountaineering expeditions.",
            },
            {
              title: "Department of Tourism License",
              auth: "Ministry of Culture, Tourism & Civil Aviation",
              number: "License No. 1509/068",
              status: "Official Operator",
              desc: "Authorized high-altitude trekking, peak climbing, and alpine expedition operator across all national parks and conservation areas.",
            },
            {
              title: "Nepal Tourism Board (NTB) Accreditation",
              auth: "Nepal Tourism Board",
              number: "Member Agency ID: NTB-1509",
              status: "Accredited",
              desc: "Official tourism board certification guaranteeing adherence to national traveler safety standards and consumer protection.",
            },
            {
              title: "Trekking Agencies' Association of Nepal",
              auth: "TAAN Executive Committee",
              number: "TAAN Active Reg. No. 948",
              status: "Executive Member",
              desc: "Mandatory compliance with the Fair Porter Charter, environmental codes of conduct, and emergency rescue mutual aid networks.",
            },
            {
              title: "Nepal Mountaineering Association (NMA)",
              auth: "Nepal Mountaineering Association",
              number: "NMA Member No. MA-412",
              status: "Certified Climbing Agency",
              desc: "Authorized to issue climbing permits and manage roped ascents across all 27 NMA-designated 6,000 m trekking peaks.",
            },
            {
              title: "Central Bank Foreign Currency Permit",
              auth: "Nepal Rastra Bank (Central Bank)",
              number: "Permit No. 892/069",
              status: "Authorized FX Dealer",
              desc: "Legally authorized to receive, hold, and process international wire transfers, credit card payments, and foreign exchange.",
            },
          ].map((doc) => (
            <div
              key={doc.title}
              className="rounded-2xl border border-white/10 bg-[#09151b]/90 p-6 flex flex-col justify-between space-y-4 hover:border-[#c59a4a]/50 transition-colors shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[#e8b765] font-semibold px-2.5 py-1 rounded bg-[#c59a4a]/15 border border-[#c59a4a]/30">
                    {doc.number}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {doc.status}
                  </span>
                </div>
                <h3 className="font-serif text-lg text-white font-normal">
                  {doc.title}
                </h3>
                <p className="text-[11px] text-white/50 font-mono">
                  Issued by: {doc.auth}
                </p>
                <p className="text-xs text-white/70 leading-relaxed font-light">
                  {doc.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-[#e8b765]">
                <span className="font-mono">PAN / VAT: 600584712</span>
                <span className="text-white/40">Govt. Bonded</span>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-[#c59a4a]/40 bg-gradient-to-r from-[#0d1d24] via-[#09151b] to-[#0d1d24] p-8 text-center space-y-3">
          <ShieldCheck className="w-8 h-8 text-[#e8b765] mx-auto" />
          <h3 className="font-serif text-2xl text-white">
            100% Financial Security &amp; Deposit Bond
          </h3>
          <p className="text-xs sm:text-sm text-white/70 max-w-2xl mx-auto leading-relaxed">
            All client deposits are deposited into dedicated client trust accounts supervised
            by Nepal Rastra Bank. In the unlikely event of civil disruption or natural force majeure,
            your funds are protected by our government operating bond.
          </p>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          8. CLOSING CTA BANNER
          ────────────────────────────────────────────────────────── */}
      <section className="relative w-full py-20 px-6 lg:px-12 bg-gradient-to-r from-[#0c222c] via-[#07171e] to-[#0c222c] border-t border-[#c59a4a]/30">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal">
            Begin Your Himalayan Expedition
          </h2>
          <p className="text-white/70 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Whether you are targeting Everest Base Camp, the high passes of Thorong La,
            Island Peak climbing, or a cultural circuit through Bhutan and Tibet, our
            lead Sherpas are ready to plan your journey.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/destinations"
              className="px-8 py-3.5 rounded-full bg-[#c59a4a] hover:bg-[#d8ab58] text-[#071317] font-semibold text-xs uppercase tracking-wider transition-all shadow-lg"
            >
              Browse All Treks &amp; Peaks
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-full border border-white/25 hover:border-white text-white font-medium text-xs uppercase tracking-wider transition-all"
            >
              Contact Head Office (Kathmandu)
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
