import React, { useState } from 'react';
import { sound } from '../lib/audio';
import { scrollLenisTo } from '../lib/useLenis';
import { navLinks } from '../data/portfolio';
import { ArrowUpRightIcon } from './Icons';

interface NavProps {
  onToggleTerminal: () => void;
}

const Nav: React.FC<NavProps> = ({ onToggleTerminal }) => {
  const [activeLink, setActiveLink] = useState('');

  const handleNavClick = (target: string) => {
    sound.click();
    setActiveLink(target);
    scrollLenisTo(target);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 lg:px-10 py-4">
      <div className="flex items-center justify-between max-w-[1440px] mx-auto">
        {/* Left: Brand */}
        <div className="flex items-center gap-1.5">
          <span
            className="text-base sm:text-lg font-extrabold uppercase tracking-wide"
            style={{ color: '#334b57' }}
          >
            JAYAPRAKASH
          </span>
          <span className="text-accent-cyan text-sm">✦</span>
        </div>

        {/* Center: Pill nav links */}
        <div className="hidden md:flex items-center">
          <div className="glass-pill flex items-center gap-0.5 px-2 py-1.5">
            {navLinks.filter(l => l.target !== 'process').map((link) => (
              <button
                key={link.target}
                onClick={() => handleNavClick(link.target)}
                onMouseEnter={() => sound.hover()}
                className="relative px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] rounded-full transition-all duration-300 hover:bg-white/60"
                style={{
                  color: activeLink === link.target ? '#334b57' : '#647e8b',
                  fontWeight: activeLink === link.target ? 600 : 400,
                }}
                data-cursor="interactive"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Let's Chat CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.click();
              scrollLenisTo('contact');
            }}
            onMouseEnter={() => sound.hover()}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-[11px] uppercase tracking-[0.1em] transition-all duration-300 hover:opacity-90"
            style={{
              backgroundColor: '#334b57',
              color: '#ffffff',
            }}
            data-cursor="interactive"
          >
            Let's Chat
            <ArrowUpRightIcon size={13} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
