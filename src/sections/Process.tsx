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
      className="section-padding"
      style={{ backgroundColor: '#f2f6f9' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="fade-in-up mb-12">
          <p
            className="font-mono text-[10px] uppercase tracking-[0.2em] mb-2"
            style={{ color: '#859ba6' }}
          >
            // Methodology
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{ color: '#45616f' }}
          >
            Engineering Process
          </h2>
          <p
            className="mt-4 max-w-2xl text-base leading-relaxed"
            style={{ color: '#647e8b' }}
          >
            From discovery to deployment — a systematic approach to building
            intelligent, performant systems.
          </p>
        </div>

        {/* Process cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {processSteps.map((step, i) => (
            <div
              key={step.index}
              className="fade-in-up glass-card p-6 hover-lift group relative overflow-hidden"
              onMouseEnter={() => sound.hover()}
              data-cursor="interactive"
            >
              {/* Large background index */}
              <span
                className="absolute -top-2 -right-2 text-7xl font-black select-none transition-opacity duration-300 group-hover:opacity-[0.12]"
                style={{ color: 'rgba(56, 189, 248, 0.06)' }}
              >
                {step.index}
              </span>

              {/* Index badge */}
              <div
                className="inline-block px-2.5 py-1 rounded-full mb-4 font-mono text-[10px] font-semibold"
                style={{
                  backgroundColor: 'rgba(56, 189, 248, 0.1)',
                  color: '#38bdf8',
                }}
              >
                {step.index}
              </div>

              <h3
                className="text-base font-bold mb-3 leading-tight"
                style={{ color: '#45616f' }}
              >
                {step.title}
              </h3>

              <p
                className="text-sm leading-relaxed"
                style={{ color: '#647e8b' }}
              >
                {step.description}
              </p>

              {/* Bottom progress line */}
              <div
                className="mt-5 h-[2px] rounded-full overflow-hidden"
                style={{ backgroundColor: 'rgba(74, 99, 111, 0.08)' }}
              >
                <div
                  className="h-full rounded-full transition-all duration-700 group-hover:w-full"
                  style={{
                    width: `${(i + 1) * 20}%`,
                    background: 'linear-gradient(90deg, #38bdf8, #0284c7)',
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
