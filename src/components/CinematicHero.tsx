import React, { useRef, useEffect } from 'react';
import CinematicNav from './CinematicNav';
import { sound } from '../lib/audio';
import { scrollLenisTo } from '../lib/useLenis';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

interface CinematicHeroProps {
  onBeginJourney?: () => void;
}

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4';

export const CinematicHero: React.FC<CinematicHeroProps> = ({ onBeginJourney }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Safe autoplay fallback
      });
    }
  }, []);

  const handleExplore = () => {
    try {
      sound.click();
    } catch {
      // Safe fallback
    }
    if (onBeginJourney) {
      onBeginJourney();
    } else {
      scrollLenisTo('#works');
    }
  };

  const handleContact = () => {
    try {
      sound.click();
    } catch {
      // Safe fallback
    }
    scrollLenisTo('#contact');
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-background select-none"
    >
      {/* ── Video Background ── */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        src={VIDEO_URL}
      />

      {/* ── Top Navigation Bar ── */}
      <CinematicNav onBeginJourney={handleContact} />

      {/* ── Centered Hero Content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-16 pb-24 my-auto mx-auto max-w-6xl">
        {/* Status / Identity Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md mb-8 animate-fade-rise">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-slate-300 font-medium">
            Jayaprakash K &bull; AI Engineer &bull; Creative Developer
          </span>
        </div>

        {/* H1 Headline */}
        <h1
          className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-6xl font-normal text-foreground animate-fade-rise"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Where{' '}
          <em className="not-italic text-muted-foreground">dreams</em>
          {' '}rise{' '}
          <em className="not-italic text-muted-foreground">through the silence.</em>
        </h1>

        {/* Subtext linking with portfolio */}
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed animate-fade-rise-delay font-body">
          Architecting high-performance Machine Learning systems, autonomous computer vision pipelines,
          and cinematic 3D WebGL experiences. Digital spaces engineered for sharp focus and inspired work.
        </p>

        {/* CTAs Row */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-12 animate-fade-rise-delay-2">
          <button
            type="button"
            onClick={handleExplore}
            onMouseEnter={() => {
              try {
                sound.hover();
              } catch {
                // Safe
              }
            }}
            className="liquid-glass rounded-full px-10 sm:px-12 py-4 text-sm sm:text-base text-foreground hover:scale-[1.03] cursor-pointer active:scale-[0.98] transition-transform duration-200 select-none font-medium inline-flex items-center gap-2.5"
          >
            <span>Explore Work</span>
            <ArrowDown className="w-4 h-4 animate-bounce opacity-80" />
          </button>

          <button
            type="button"
            onClick={handleContact}
            onMouseEnter={() => {
              try {
                sound.hover();
              } catch {
                // Safe
              }
            }}
            className="liquid-glass rounded-full px-8 sm:px-10 py-4 text-sm sm:text-base text-foreground/90 hover:text-white hover:scale-[1.03] cursor-pointer active:scale-[0.98] transition-transform duration-200 select-none font-medium inline-flex items-center gap-2"
          >
            <span>Let’s Connect</span>
            <ArrowUpRight className="w-4 h-4 opacity-80" />
          </button>
        </div>
      </div>

      {/* ── Bottom Sub-Row Linking directly into Portfolio ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 pb-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-4 text-slate-400">
        <div className="text-xs font-mono uppercase tracking-wider text-center sm:text-left">
          <span className="text-accent-cyan">01 //</span> Machine Learning &bull; Computer Vision &bull; 3D WebGL
        </div>
        <div className="text-xs font-mono tracking-widest uppercase text-center sm:text-right text-slate-400">
          Tamil Nadu, India &bull; 2026
        </div>
      </div>
    </section>
  );
};

export default CinematicHero;
