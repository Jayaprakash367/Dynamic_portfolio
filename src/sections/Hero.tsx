import React, { useRef, useEffect, useState, useCallback } from 'react';
import { sound } from '../lib/audio';
import { scrollLenisTo } from '../lib/useLenis';
import {
  ArrowDown,
  ArrowUpRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  Terminal,
} from 'lucide-react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4';

interface HeroProps {
  onBeginJourney?: () => void;
}

interface StarParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
}

const NAV_ITEMS = [
  { label: 'Works', target: '#works' },
  { label: 'Skills', target: '#skills' },
  { label: 'About', target: '#about' },
  { label: 'Process', target: '#process' },
  { label: 'Contact', target: '#contact' },
];

export const Hero: React.FC<HeroProps> = ({ onBeginJourney }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeNav, setActiveNav] = useState('Works');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAudioMuted, setIsAudioMuted] = useState(sound.isMuted());
  const [cursorPos, setCursorPos] = useState({ x: -1000, y: -1000 });

  // 3D Parallax Tilt state
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });
  const videoWrapperRef = useRef<HTMLDivElement>(null);

  // Parallax Tilt loop
  useEffect(() => {
    let animId: number;

    const updateTilt = () => {
      // Smooth linear interpolation (lerp)
      mouseCurrent.current.x += (mouseTarget.current.x - mouseCurrent.current.x) * 0.06;
      mouseCurrent.current.y += (mouseTarget.current.y - mouseCurrent.current.y) * 0.06;

      if (videoWrapperRef.current) {
        const tiltX = mouseCurrent.current.y * -4.5;
        const tiltY = mouseCurrent.current.x * 4.5;
        const panX = mouseCurrent.current.x * -24;
        const panY = mouseCurrent.current.y * -18;

        videoWrapperRef.current.style.transform = `scale(1.08) translate3d(${panX}px, ${panY}px, 0) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      }

      animId = requestAnimationFrame(updateTilt);
    };

    animId = requestAnimationFrame(updateTilt);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Track mouse coordinates for 3D tilt & spotlight
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    mouseTarget.current = { x: nx, y: ny };
    setCursorPos({ x: e.clientX, y: e.clientY });
  }, []);

  // Interactive Starfield / Neural Particle Canvas Overlay
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate 45 constellation stars
    const stars: StarParticle[] = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 1.8 + 0.8,
      alpha: Math.random() * 0.6 + 0.2,
      baseAlpha: Math.random() * 0.5 + 0.3,
    }));

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Current mouse position on screen
      const mx = cursorPos.x;
      const my = cursorPos.y;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.x += s.vx;
        s.y += s.vy;

        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        // Pulse brightness
        s.alpha = s.baseAlpha + Math.sin(Date.now() * 0.002 + i) * 0.2;

        // Draw star
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(165, 243, 252, ${Math.max(0, s.alpha)})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#38bdf8';
        ctx.fill();

        // Connect nearby stars with subtle neural threads
        for (let j = i + 1; j < stars.length; j++) {
          const s2 = stars[j];
          const dist = Math.hypot(s.x - s2.x, s.y - s2.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(s2.x, s2.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${(1 - dist / 100) * 0.15})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        // Connect star to interactive cursor if nearby
        if (mx > 0 && my > 0) {
          const distToCursor = Math.hypot(s.x - mx, s.y - my);
          if (distToCursor < 140) {
            ctx.beginPath();
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(mx, my);
            ctx.strokeStyle = `rgba(56, 189, 248, ${(1 - distToCursor / 140) * 0.4})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      ctx.shadowBlur = 0;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [cursorPos]);

  // Video Autoplay safety
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

  const toggleVideoPlayback = () => {
    sound.click();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleAudio = () => {
    const isNowMuted = sound.toggleMute();
    setIsAudioMuted(isNowMuted);
    if (!isNowMuted) {
      sound.success();
    }
  };

  const handleNavClick = (item: typeof NAV_ITEMS[0]) => {
    sound.click();
    setActiveNav(item.label);
    scrollLenisTo(item.target);
  };

  const handleExploreWorks = () => {
    sound.click();
    if (onBeginJourney) {
      onBeginJourney();
    } else {
      scrollLenisTo('#works');
    }
  };

  const handleContact = () => {
    sound.click();
    scrollLenisTo('#contact');
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#00172e] select-none"
      style={{ perspective: '1200px' }}
    >
      {/* ── Interactive Video Background Wrapper (3D Parallax Window) ── */}
      <div
        ref={videoWrapperRef}
        className="absolute inset-0 w-full h-full pointer-events-none will-change-transform transition-transform duration-75 ease-out"
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={VIDEO_URL}
        />
      </div>

      {/* ── Interactive Ambient Cursor Spotlight ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] transition-opacity duration-300"
        style={{
          background: `radial-gradient(650px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(56, 189, 248, 0.12), transparent 75%)`,
        }}
      />

      {/* ── Interactive Starfield & Constellation Canvas ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-[2]"
      />

      {/* ── Top Navigation Bar (Branded for Jayaprakash K) ── */}
      <header className="relative z-10 w-full">
        <div className="flex flex-row items-center justify-between px-6 sm:px-8 py-6 max-w-7xl mx-auto">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onMouseEnter={() => sound.hover()}
              className="text-2xl sm:text-3xl tracking-tight text-foreground select-none inline-flex items-baseline gap-1 hover:opacity-90 transition-opacity"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              <span>Jayaprakash</span>
              <span className="text-accent-cyan text-sm">✦</span>
              <sup className="text-xs font-sans font-normal text-slate-400">®</sup>
            </a>

            {/* Role indicator */}
            <span className="hidden sm:inline-block border-l border-white/20 pl-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              AI Engineer &bull; Creative Developer
            </span>
          </div>

          {/* Real Portfolio Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => {
              const isActive = activeNav === item.label;
              return (
                <button
                  key={item.target}
                  type="button"
                  onClick={() => handleNavClick(item)}
                  onMouseEnter={() => sound.hover()}
                  className={`text-sm tracking-wide transition-colors cursor-pointer ${
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

          {/* Right Action: Let's Connect */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleContact}
              onMouseEnter={() => sound.hover()}
              className="liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 cursor-pointer select-none font-medium flex items-center gap-2"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-accent-cyan" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Centered Hero Section (Exact Portfolio Content for Jayaprakash K) ── */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-16 sm:pt-24 pb-28 my-auto mx-auto max-w-6xl">
        {/* Welcome Tag */}
        <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.45em] text-accent-cyan font-semibold mb-3 animate-fade-rise">
          W E L C O M E &nbsp; T O &nbsp; M Y
        </p>

        {/* Centerpiece Hero Title: Portfolio */}
        <h1
          className="text-7xl sm:text-9xl md:text-[9.5rem] lg:text-[11.5rem] leading-[0.88] tracking-[-3px] font-normal text-white animate-fade-rise drop-shadow-2xl"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Portfolio<span className="text-accent-cyan">.</span>
        </h1>

        {/* Identity & Role Badge */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/[0.08] border border-white/15 backdrop-blur-md mt-6 mb-3 animate-fade-rise shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.25em] text-white font-bold">
            JAYAPRAKASH K &bull; AI ENGINEER &bull; CREATIVE DEVELOPER
          </span>
        </div>

        {/* Subtext directly based on real portfolio skills */}
        <p className="text-slate-200 text-sm sm:text-base md:text-lg max-w-2xl mt-3 leading-relaxed animate-fade-rise-delay font-body">
          Specializing in real-time Computer Vision pipelines, Deep Learning systems, and
          high-performance cinematic 3D WebGL experiences.
        </p>

        {/* Core Domains */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-5 animate-fade-rise-delay font-mono text-[11px] uppercase tracking-wider text-slate-300">
          <span className="liquid-glass px-3.5 py-1 rounded-full border border-white/15 text-accent-cyan">
            Computer Vision
          </span>
          <span className="liquid-glass px-3.5 py-1 rounded-full border border-white/15 text-accent-cyan">
            Machine Learning
          </span>
          <span className="liquid-glass px-3.5 py-1 rounded-full border border-white/15 text-accent-cyan">
            3D WebGL Craft
          </span>
          <span className="liquid-glass px-3.5 py-1 rounded-full border border-white/15 text-accent-cyan">
            Neural Systems
          </span>
        </div>

        {/* Hero Interactive Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8 sm:mt-10 animate-fade-rise-delay-2">
          {/* Primary CTA: Explore Works */}
          <button
            type="button"
            onClick={handleExploreWorks}
            onMouseEnter={() => sound.hover()}
            className="liquid-glass rounded-full px-9 sm:px-11 py-3.5 sm:py-4 text-xs sm:text-sm uppercase font-mono tracking-wider font-semibold text-white hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 cursor-pointer select-none flex items-center gap-2.5 shadow-xl hover:shadow-cyan-500/25"
          >
            <span>Explore Works</span>
            <ArrowDown className="w-3.5 h-3.5 text-accent-cyan animate-bounce" />
          </button>

          {/* Secondary CTA: Let's Chat */}
          <button
            type="button"
            onClick={handleContact}
            onMouseEnter={() => sound.hover()}
            className="liquid-glass rounded-full px-8 sm:px-10 py-3.5 sm:py-4 text-xs sm:text-sm uppercase font-mono tracking-wider font-semibold text-slate-300 hover:text-white hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 cursor-pointer select-none flex items-center gap-2"
          >
            <span>Let's Chat</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-accent-cyan" />
          </button>
        </div>
      </div>

      {/* ── Interactive Video Animation Controls & Bottom Coordinate Bar ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 pb-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-4 text-muted-foreground text-xs font-mono uppercase tracking-wider">
        {/* Left: Core tech coordinates */}
        <div className="flex items-center gap-2">
          <span className="text-accent-cyan font-bold">01 //</span>
          <span>Computer Vision &bull; Neural Systems &bull; 3D WebGL</span>
        </div>

        {/* Center/Right: Interactive Video HUD Controls */}
        <div className="flex items-center gap-3">
          {/* Pause / Play Video Controller */}
          <button
            type="button"
            onClick={toggleVideoPlayback}
            onMouseEnter={() => sound.hover()}
            className="liquid-glass flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] text-slate-300 hover:text-white transition-all cursor-pointer"
            title={isPlaying ? 'Pause Interactive Video' : 'Resume Interactive Video'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3 text-accent-cyan" />
                <span className="hidden sm:inline">Motion Active</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-amber-400" />
                <span className="hidden sm:inline">Motion Paused</span>
              </>
            )}
          </button>

          {/* Ambient Sound Synthesis Controller */}
          <button
            type="button"
            onClick={toggleAudio}
            onMouseEnter={() => sound.hover()}
            className="liquid-glass p-2 rounded-full text-slate-300 hover:text-white transition-all cursor-pointer"
            title={isAudioMuted ? 'Unmute Interface Audio' : 'Mute Interface Audio'}
          >
            {isAudioMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-slate-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-accent-cyan" />
            )}
          </button>

          {/* Location / Year Stamp */}
          <div className="hidden md:block pl-3 border-l border-white/15 text-muted-foreground/80">
            SRM Institute &bull; Chennai, India &bull; 2026
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
