import React, { useState } from 'react';
import { sound } from '../lib/audio';
import { scrollLenisTo } from '../lib/useLenis';

interface CinematicNavProps {
  onBeginJourney?: () => void;
  onNavigate?: (section: string) => void;
}

const NAV_ITEMS = [
  { label: 'Work', id: 'works' },
  { label: 'Skills', id: 'skills' },
  { label: 'About', id: 'about' },
  { label: 'Process', id: 'process' },
  { label: 'Contact', id: 'contact' },
];

export const CinematicNav: React.FC<CinematicNavProps> = ({ onBeginJourney, onNavigate }) => {
  const [activeItem, setActiveItem] = useState<string>('Work');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handleClick = (item: { label: string; id: string }) => {
    try {
      sound.click();
    } catch {
      // Audio fallback safe
    }
    setActiveItem(item.label);
    setMobileMenuOpen(false);

    if (onNavigate) {
      onNavigate(item.id);
    } else {
      if (item.id === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(item.id);
        if (el) {
          scrollLenisTo(`#${item.id}`);
        }
      }
    }
  };

  const handleCta = () => {
    try {
      sound.click();
    } catch {
      // Audio fallback safe
    }
    if (onBeginJourney) {
      onBeginJourney();
    } else {
      scrollLenisTo('#contact');
    }
  };

  return (
    <nav className="relative z-20 w-full">
      <div className="flex flex-row items-center justify-between px-6 sm:px-8 py-6 max-w-7xl mx-auto">
        {/* Brand Logo for Jayaprakash K */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-2xl sm:text-3xl tracking-tight text-foreground select-none transition-opacity hover:opacity-90 inline-flex items-baseline gap-1"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          <span>Jayaprakash</span>
          <span className="text-accent-cyan text-sm font-sans">✦</span>
          <sup className="text-xs font-sans font-normal text-slate-400">®</sup>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = activeItem === item.label;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => handleClick(item)}
                onMouseEnter={() => {
                  try {
                    sound.hover();
                  } catch {
                    // Safe
                  }
                }}
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
        </div>

        {/* CTA Button & Mobile Menu Trigger */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCta}
            onMouseEnter={() => {
              try {
                sound.hover();
              } catch {
                // Safe
              }
            }}
            className="liquid-glass rounded-full px-5 sm:px-6 py-2.5 text-xs sm:text-sm text-foreground hover:scale-[1.03] transition-transform duration-200 cursor-pointer select-none font-medium active:scale-[0.98]"
          >
            Let's Talk
          </button>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev: boolean) => !prev)}
            className="md:hidden text-foreground p-2 rounded-lg hover:bg-white/5 transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-8 pb-6 pt-3 bg-[#001931]/95 backdrop-blur-xl border-b border-white/10 animate-fade-rise">
          <div className="flex flex-col gap-4">
            {NAV_ITEMS.map((item) => {
              const isActive = activeItem === item.label;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleClick(item)}
                  className={`text-left text-base py-1.5 transition-colors ${
                    isActive
                      ? 'text-accent-cyan font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default CinematicNav;
