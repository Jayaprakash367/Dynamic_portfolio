import { sound } from '../lib/audio'
import { scrollLenisTo } from '../lib/useLenis'
import { ArrowDown, ArrowUpRight } from 'lucide-react'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between items-center text-center overflow-hidden pt-28 pb-14 px-6 sm:px-12 select-none bg-gradient-to-b from-[#ebf0f5] via-[#f2f6f9] to-[#ebf1f6]"
    >
      {/* ── AMBIENT CENTER BLUE GLOW ANIMATION (Anchored In Center, No Mouse Tracking) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        {/* Layer 1: Core Breathing Cyan-Blue Aura */}
        <div className="absolute w-[440px] h-[440px] sm:w-[620px] sm:h-[620px] rounded-full bg-gradient-to-tr from-[#38bdf8] via-[#60a5fa] to-[#a5f3fc] opacity-80 blur-[80px] animate-center-glow-pulse animate-center-glow-morph will-change-transform" />

        {/* Layer 2: Radiant Inner Azure Spark Core */}
        <div className="absolute w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] rounded-full bg-gradient-to-br from-[#0284c7] via-[#38bdf8] to-[#93c5fd] opacity-65 blur-[65px] animate-center-float-2 will-change-transform" />

        {/* Satellite Bubble 1: Floating Top-Left of Center */}
        <div className="absolute -translate-x-28 -translate-y-24 sm:-translate-x-44 sm:-translate-y-36 w-36 h-36 sm:w-56 sm:h-56 rounded-full bg-gradient-to-br from-[#38bdf8] to-[#0284c7] opacity-65 blur-[42px] animate-center-float-1 will-change-transform" />

        {/* Satellite Bubble 2: Floating Bottom-Right of Center */}
        <div className="absolute translate-x-28 translate-y-24 sm:translate-x-44 sm:translate-y-36 w-40 h-40 sm:w-64 sm:h-64 rounded-full bg-gradient-to-tr from-[#60a5fa] to-[#93c5fd] opacity-75 blur-[48px] animate-center-float-2 will-change-transform" />

        {/* Satellite Bubble 3: Accent Mid-Right Floating Light */}
        <div className="absolute translate-x-40 translate-y-4 sm:translate-x-60 sm:translate-y-8 w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-[#38bdf8] to-[#a5f3fc] opacity-70 blur-[26px] animate-center-float-3 will-change-transform" />
      </div>

      {/* Top Header: "W e l c o m e   t o   m y" (Exact match to reference) */}
      <div className="relative z-10 pt-8 sm:pt-14 pointer-events-none">
        <p className="font-['Plus_Jakarta_Sans',sans-serif] text-base sm:text-xl md:text-2xl text-[#526b77] tracking-[0.45em] sm:tracking-[0.65em] font-semibold uppercase opacity-95">
          W e l c o m e &nbsp; t o &nbsp; m y
        </p>
      </div>

      {/* Centerpiece Hero Title: "Portfolio" (Exact match to reference) */}
      <div className="relative z-10 my-auto py-6 pointer-events-none">
        <h1 className="text-7xl sm:text-9xl md:text-[10.5rem] lg:text-[13rem] font-['Plus_Jakarta_Sans',sans-serif] font-bold tracking-tight leading-[0.88] text-[#5e8896]">
          Portfolio
        </h1>
        <div className="text-xs sm:text-sm font-['IBM_Plex_Mono',monospace] text-[#4d6b79] tracking-[0.3em] uppercase mt-5 font-semibold">
          JAYAPRAKASH K &bull; AI ENGINEER &bull; CREATIVE DEVELOPER
        </div>
      </div>

      {/* Bottom Sub-row: Left category, Center CTAs, Right year (Exact match to reference) */}
      <div className="relative z-10 w-full max-w-6xl pt-8 border-t border-[#526b77]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Bottom Left: Category */}
        <div className="text-center sm:text-left">
          <div className="text-xl sm:text-2xl md:text-3xl font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#45616f]">
            Creative Development
          </div>
          <div className="font-['IBM_Plex_Mono',monospace] text-xs text-[#5e7784] mt-1 font-medium">
            Machine Learning &bull; Computer Vision &bull; 3D WebGL
          </div>
        </div>

        {/* Center Pill Action Buttons */}
        <div className="flex items-center gap-4">
          <a
            href="#works"
            onMouseEnter={() => sound.playHover()}
            onClick={(e) => {
              e.preventDefault()
              sound.playClick()
              scrollLenisTo('#works')
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#3b5966] text-white hover:bg-[#2c444f] hover:scale-105 transition-all shadow-[0_10px_25px_rgba(59,89,102,0.25)] font-['IBM_Plex_Mono',monospace] text-xs font-semibold uppercase tracking-wider"
          >
            <span>explore work</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
          <a
            href="#contact"
            onMouseEnter={() => sound.playHover()}
            onClick={(e) => {
              e.preventDefault()
              sound.playClick()
              scrollLenisTo('#contact')
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 backdrop-blur-md border border-[#486572]/30 text-[#3b5966] hover:bg-white hover:scale-105 transition-all shadow-[0_6px_20px_rgba(0,0,0,0.06)] font-['IBM_Plex_Mono',monospace] text-xs font-semibold uppercase tracking-wider"
          >
            <span>let’s chat</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Bottom Right: 2026 */}
        <div className="text-center sm:text-right">
          <div className="text-3xl sm:text-4xl md:text-5xl font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#5e8896]">
            2026
          </div>
          <div className="font-['IBM_Plex_Mono',monospace] text-[11px] text-[#5e7784] mt-1 font-medium">
            TAMIL NADU, INDIA
          </div>
        </div>
      </div>
    </section>
  )
}
