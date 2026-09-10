import React, { useEffect, useState } from 'react';
import { scrollLenisTo } from '../lib/useLenis';
import { sound } from '../lib/audio';

const sections = [
  { id: 'hero', label: 'Hero' },
  { id: 'manifesto', label: 'Manifesto' },
  { id: 'works', label: 'Works' },
  { id: 'skills', label: 'Skills' },
  { id: 'about', label: 'About' },
  { id: 'process', label: 'Process' },
  { id: 'contact', label: 'Contact' },
];

const QuickScroll: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-3">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => {
            sound.click();
            scrollLenisTo(section.id);
          }}
          onMouseEnter={() => sound.hover()}
          className="group relative flex items-center"
          data-cursor="interactive"
          title={section.label}
        >
          {/* Label tooltip */}
          <span
            className="absolute right-8 px-2 py-1 rounded font-mono text-[10px] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              color: '#334b57',
              backdropFilter: 'blur(8px)',
            }}
          >
            {section.label}
          </span>

          {/* Dot */}
          <div
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              backgroundColor:
                activeSection === section.id ? '#38bdf8' : 'rgba(74, 99, 111, 0.25)',
              transform: activeSection === section.id ? 'scale(1.4)' : 'scale(1)',
              boxShadow:
                activeSection === section.id
                  ? '0 0 12px rgba(56, 189, 248, 0.5)'
                  : 'none',
            }}
          />
        </button>
      ))}
    </div>
  );
};

export default QuickScroll;
