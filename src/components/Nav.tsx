import React, { useState, useEffect } from 'react';
import { sound } from '../lib/audio';
import { scrollLenisTo } from '../lib/useLenis';
import { navLinks } from '../data/portfolio';
import { ArrowUpRightIcon } from './Icons';
import { Terminal } from 'lucide-react';

interface NavProps {
  onToggleTerminal: () => void;
}

const Nav: React.FC<NavProps> = ({ onToggleTerminal }) => {
  const [activeLink, setActiveLink] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Reveal sticky navigation when scrolled past initial hero area
      if (window.scrollY > 320) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (target: string) => {
    sound.click();
    setActiveLink(target);
    scrollLenisTo(target);
  };

  if (!isScrolled) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 lg:px-10 py-3 transition-all duration-300 animate-fade-in">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 py-2 rounded-full liquid-glass border border-white/10 backdrop-blur-md bg-black/40">
        {/* Left: Brand */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-1.5 text-foreground hover:opacity-90 transition-opacity"
        >
          <span
            className="text-xl tracking-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Velorah
          </span>
          <sup className="text-[10px] font-sans text-muted-foreground">®</sup>
          <span className="hidden sm:inline-block ml-1 text-xs text-accent-cyan font-mono">✦</span>
        </a>

        {/* Center: Pill nav links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks
            .filter((l) => l.target !== 'process')
            .map((link) => (
              <button
                key={link.target}
                onClick={() => handleNavClick(link.target)}
                onMouseEnter={() => sound.hover()}
                className={`px-3 py-1 text-xs uppercase tracking-[0.15em] font-mono rounded-full transition-all duration-200 cursor-pointer ${
                  activeLink === link.target
                    ? 'text-white bg-white/10 font-semibold'
                    : 'text-muted-foreground hover:text-white hover:bg-white/5'
                }`}
                data-cursor="interactive"
              >
                {link.label}
              </button>
            ))}
        </div>

        {/* Right: Terminal & Contact */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              sound.click();
              onToggleTerminal();
            }}
            onMouseEnter={() => sound.hover()}
            className="p-2 rounded-full text-muted-foreground hover:text-white hover:bg-white/10 transition-colors"
            title="Open CLI Terminal (Ctrl+K)"
          >
            <Terminal className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              sound.click();
              scrollLenisTo('contact');
            }}
            onMouseEnter={() => sound.hover()}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-[0.1em] text-foreground liquid-glass hover:scale-105 transition-all cursor-pointer font-medium"
            data-cursor="interactive"
          >
            <span>Let's Chat</span>
            <ArrowUpRightIcon size={12} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
