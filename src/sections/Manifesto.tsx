import React, { useEffect, useRef } from 'react';
import { metrics } from '../data/portfolio';

const Manifesto: React.FC = () => {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="section-padding"
      style={{ backgroundColor: '#f2f6f9' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Editorial statement */}
        <div className="fade-in-up max-w-4xl">
          <p
            className="font-mono text-[10px] uppercase tracking-[0.2em] mb-6"
            style={{ color: '#859ba6' }}
          >
            // Manifesto
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1]"
            style={{ color: '#45616f' }}
          >
            Bridging the gap between{' '}
            <span className="text-gradient-cyan">theoretical AI models</span>{' '}
            and high-performance, cinematic{' '}
            <span style={{ color: '#5e8896' }}>WebGL craft</span>.
          </h2>
          <p
            className="mt-8 text-base sm:text-lg leading-relaxed max-w-2xl"
            style={{ color: '#647e8b' }}
          >
            Every line of code is a deliberate decision — from loss function selection
            to shader optimization. I engineer systems that don't just work, but
            perform at the absolute edge of what's possible.
          </p>
        </div>

        {/* Metrics HUD */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {metrics.map((metric, i) => (
            <div
              key={i}
              className="fade-in-up glass-card p-6 sm:p-8 hover-lift"
            >
              <div
                className="font-mono text-3xl sm:text-4xl font-bold"
                style={{ color: '#38bdf8' }}
              >
                {metric.value}
              </div>
              <p
                className="mt-3 font-mono text-xs uppercase tracking-wider"
                style={{ color: '#859ba6' }}
              >
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
