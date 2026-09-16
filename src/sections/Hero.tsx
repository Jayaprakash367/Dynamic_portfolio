import React, { useRef, useEffect, useState } from 'react';
import { sound } from '../lib/audio';
import { scrollLenisTo } from '../lib/useLenis';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4';

interface HeroProps {
  onBeginJourney?: () => void;
}

const NAV_ITEMS = [
  { label: 'Home', id: 'hero', target: '#hero' },
  { label: 'Studio', id: 'studio', target: '#works' },
  { label: 'About', id: 'about', target: '#about' },
  { label: 'Journal', id: 'journal', target: '#skills' },
  { label: 'Reach Us', id: 'contact', target: '#contact' },
];

export const Hero: React.FC<HeroProps> = ({ onBeginJourney }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeNav, setActiveNav] = useState('Home');

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Safe autoplay fallback
      });
    }
  }, []);

  const handleNavClick = (item: typeof NAV_ITEMS[0]) => {
    try {
      sound.click();
    } catch {
      // Safe audio
    }
    setActiveNav(item.label);

    if (item.target === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      scrollLenisTo(item.target);
    }
  };

  const handleBeginJourney = () => {
    try {
      sound.click();
    } catch {
      // Safe audio
    }
    if (onBeginJourney) {
      onBeginJourney();
    } else {
      scrollLenisTo('#works');
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-background select-none"
    >
      {/* ── Fullscreen Video Background ── */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        src={VIDEO_URL}
      />

      {/* ── Navigation Bar ── */}
      <header className="relative z-10 w-full">
        <div className="flex flex-row items-center justify-between px-8 py-6 max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-3xl tracking-tight text-foreground select-none inline-flex items-baseline gap-0.5 hover:opacity-90 transition-opacity"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              <span>Velorah</span>
              <sup className="text-xs font-sans font-normal text-muted-foreground">®</sup>
            </a>

            {/* Subtle portfolio attribution badge */}
            <span className="hidden sm:inline-block border-l border-white/15 pl-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Jayaprakash K Portfolio
            </span>
          </div>

          {/* Nav Links (hidden on mobile, md:flex) */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => {
              const isActive = activeNav === item.label;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item)}
                  onMouseEnter={() => {
                    try {
                      sound.hover();
                    } catch {
                      // Safe
                    }
                  }}
                  className={`text-sm transition-colors cursor-pointer ${
                    isActive
                      ? 'text-foreground font-medium'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Nav CTA button */}
          <div>
            <button
              type="button"
              onClick={handleBeginJourney}
              onMouseEnter={() => {
                try {
                  sound.hover();
                } catch {
                  // Safe
                }
              }}
              className="liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground hover:scale-[1.03] active:scale-[0.98] transition-transform duration-200 cursor-pointer select-none font-medium"
            >
              Begin Journey
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero Section (centered, text-center) ── */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-40 py-[90px] my-auto mx-auto max-w-7xl">
        {/* Status / Identity Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-8 animate-fade-rise">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-slate-300 font-medium">
            Jayaprakash K &bull; AI Engineer &bull; Creative Developer
          </span>
        </div>

        {/* H1 Heading */}
        <h1
          className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal text-foreground animate-fade-rise"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Where{' '}
          <em className="not-italic text-muted-foreground">dreams</em>
          {' '}rise{' '}
          <em className="not-italic text-muted-foreground">through the silence.</em>
        </h1>

        {/* Subtext */}
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed animate-fade-rise-delay font-body">
          We're designing tools for deep thinkers, bold creators, and quiet rebels. Amid the
          chaos, we build digital spaces for sharp focus and inspired work.
        </p>

        {/* Hero CTA button */}
        <button
          type="button"
          onClick={handleBeginJourney}
          onMouseEnter={() => {
            try {
              sound.hover();
            } catch {
              // Safe
            }
          }}
          className="liquid-glass rounded-full px-14 py-5 text-base text-foreground mt-12 hover:scale-[1.03] active:scale-[0.98] transition-transform duration-200 cursor-pointer select-none animate-fade-rise-delay-2 font-medium"
        >
          Begin Journey
        </button>
      </div>

      {/* ── Subtle bottom coordinate bar linking to portfolio ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 pb-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-4 text-muted-foreground text-xs font-mono uppercase tracking-wider">
        <div>
          <span className="text-accent-cyan">01 //</span> Machine Learning &bull; Computer Vision &bull; 3D WebGL
        </div>
        <div className="text-muted-foreground/80">
          Tamil Nadu, India &bull; 2026
        </div>
      </div>
    </section>
  );
};

export default Hero;
