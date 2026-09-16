import React, { useEffect, useRef } from 'react';
import { processSteps } from '../data/portfolio';
import { sound } from '../lib/audio';

const Process: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-in-up').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 120);
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="section-padding relative"
      style={{ backgroundColor: 'hsl(var(--background))' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="fade-in-up mb-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent-cyan mb-2">
            // Methodology
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-normal text-foreground"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Engineering Process
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground font-body">
            From algorithmic discovery to production deployment — a disciplined approach to building
            intelligent, performant systems.
          </p>
        </div>

        {/* Process cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {processSteps.map((step, i) => (
            <div
              key={step.index}
              className="fade-in-up liquid-glass p-6 hover-lift group relative overflow-hidden rounded-2xl border border-white/10"
              onMouseEnter={() => sound.hover()}
              data-cursor="interactive"
            >
              {/* Large background watermark index */}
              <span className="absolute -top-2 -right-2 text-7xl font-mono font-black select-none transition-opacity duration-300 opacity-5 group-hover:opacity-15 text-accent-cyan pointer-events-none">
                {step.index}
              </span>

              {/* Index badge */}
              <div className="inline-block px-2.5 py-1 rounded-full mb-4 font-mono text-[10px] font-semibold bg-cyan-400/10 text-accent-cyan border border-cyan-400/20">
                {step.index}
              </div>

              <h3 className="text-base font-semibold mb-3 leading-tight text-white group-hover:text-cyan-300 transition-colors">
                {step.title}
              </h3>

              <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>

              {/* Bottom progress line */}
              <div className="mt-5 h-[2px] rounded-full overflow-hidden bg-white/10">
                <div
                  className="h-full rounded-full transition-all duration-700 group-hover:w-full bg-gradient-to-r from-[#38bdf8] to-[#0284c7]"
                  style={{
                    width: `${(i + 1) * 20}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
