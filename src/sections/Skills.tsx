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
      className="section-padding"
      style={{ backgroundColor: '#f2f6f9' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="fade-in-up">
          <p
            className="font-mono text-[10px] uppercase tracking-[0.2em] mb-2"
            style={{ color: '#859ba6' }}
          >
            // Technical Skills
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{ color: '#45616f' }}
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
              className={`glass-pill px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-[#334b57] !text-white border-transparent'
                  : ''
              }`}
              style={{
                color: activeCategory === cat.id ? '#ffffff' : '#647e8b',
                backgroundColor: activeCategory === cat.id ? '#334b57' : undefined,
              }}
              data-cursor="interactive"
            >
              <span style={{ color: activeCategory === cat.id ? '#38bdf8' : '#859ba6' }}>
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
              className="glass-card p-4 sm:p-5 hover-lift group"
              onMouseEnter={() => sound.hover()}
              data-cursor="interactive"
              style={{
                opacity: 0,
                animation: `fadeInUp 0.4s ease forwards ${i * 0.06}s`,
              }}
            >
              {/* Skill icon placeholder — decorative gradient dot */}
              <div
                className="w-8 h-8 rounded-lg mb-3 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(2, 132, 199, 0.2))',
                }}
              >
                <span
                  className="font-mono text-xs font-bold"
                  style={{ color: '#38bdf8' }}
                >
                  {skill.charAt(0)}
                </span>
              </div>
              <p
                className="font-semibold text-sm"
                style={{ color: '#45616f' }}
              >
                {skill}
              </p>
              <div
                className="mt-2 h-1 rounded-full overflow-hidden"
                style={{ backgroundColor: 'rgba(74, 99, 111, 0.1)' }}
              >
                <div
                  className="h-full rounded-full transition-all duration-700 group-hover:w-full"
                  style={{
                    width: '0%',
                    background: 'linear-gradient(90deg, #38bdf8, #0284c7)',
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
            to { width: ${70 + Math.random() * 30}%; }
          }
        `}</style>
      </div>
    </section>
  );
};

export default Skills;
