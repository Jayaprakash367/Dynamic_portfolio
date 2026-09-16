import React, { useState, useEffect, useRef } from 'react';
import { skillCategories } from '../data/portfolio';
import { sound } from '../lib/audio';

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('ai');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-in-up').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 80);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const currentCategory = skillCategories.find((c) => c.id === activeCategory)!;

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-padding relative"
      style={{ backgroundColor: 'hsl(var(--background))' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="fade-in-up">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent-cyan mb-2">
            // Core Capabilities
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-normal text-foreground"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Engineering Matrix
          </h2>
        </div>

        {/* Category tabs */}
        <div className="fade-in-up flex flex-wrap gap-2 mt-8">
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                sound.click();
              }}
              onMouseEnter={() => sound.hover()}
              className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-white/20 text-white font-semibold border border-cyan-400/50 shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                  : 'liquid-glass text-muted-foreground hover:text-white border border-white/10'
              }`}
              data-cursor="interactive"
            >
              <span className={activeCategory === cat.id ? 'text-accent-cyan' : 'text-slate-400'}>
                {cat.index}
              </span>{' '}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {currentCategory.skills.map((skill, i) => (
            <div
              key={`${activeCategory}-${skill}`}
              className="liquid-glass p-4 sm:p-5 hover-lift group rounded-2xl border border-white/10"
              onMouseEnter={() => sound.hover()}
              data-cursor="interactive"
              style={{
                opacity: 0,
                animation: `fadeInUp 0.4s ease forwards ${i * 0.06}s`,
              }}
            >
              {/* Skill icon badge */}
              <div
                className="w-8 h-8 rounded-lg mb-3 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(2, 132, 199, 0.3))',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                }}
              >
                <span className="font-mono text-xs font-bold text-accent-cyan">
                  {skill.charAt(0)}
                </span>
              </div>
              <p className="font-medium text-sm text-foreground group-hover:text-cyan-300 transition-colors">
                {skill}
              </p>
              <div
                className="mt-3 h-1 rounded-full overflow-hidden"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              >
                <div
                  className="h-full rounded-full transition-all duration-700 group-hover:w-full"
                  style={{
                    width: '0%',
                    background: 'linear-gradient(90deg, #38bdf8, #a5f3fc)',
                    animation: `growBar 0.8s ease forwards ${0.3 + i * 0.06}s`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Inline keyframes */}
        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes growBar {
            from { width: 0%; }
            to { width: ${75 + (activeCategory.charCodeAt(0) % 20)}%; }
          }
        `}</style>
      </div>
    </section>
  );
};

export default Skills;
