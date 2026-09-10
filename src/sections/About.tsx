import React, { useEffect, useRef } from 'react';
import { profile, education } from '../data/portfolio';
import { sound } from '../lib/audio';
import { DownloadIcon, MapPinIcon, MailIcon } from '../components/Icons';

const About: React.FC = () => {
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
      id="about"
      ref={sectionRef}
      className="section-padding"
      style={{ backgroundColor: '#ebf1f6' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="fade-in-up mb-12">
          <p
            className="font-mono text-[10px] uppercase tracking-[0.2em] mb-2"
            style={{ color: '#859ba6' }}
          >
            // About
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{ color: '#45616f' }}
          >
            The Engineer Behind the Code
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Photo card */}
          <div className="fade-in-up">
            <div className="glass-card glow-brackets p-6 sm:p-8">
              {/* Studio photo placeholder */}
              <div
                className="w-full aspect-[4/5] rounded-xl mb-6 flex items-center justify-center relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #334b57 0%, #45616f 50%, #5e8896 100%)',
                }}
              >
                {/* Initials */}
                <span
                  className="text-6xl sm:text-7xl font-black select-none"
                  style={{ color: 'rgba(255, 255, 255, 0.2)' }}
                >
                  JP
                </span>
                {/* Decorative elements */}
                <div
                  className="absolute top-6 right-6 w-16 h-16 rounded-full"
                  style={{ background: 'rgba(56, 189, 248, 0.15)' }}
                />
                <div
                  className="absolute bottom-8 left-8 w-24 h-24 rounded-full"
                  style={{ background: 'rgba(56, 189, 248, 0.1)' }}
                />
                {/* Name overlay */}
                <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/40 to-transparent">
                  <p className="font-mono text-xs text-white/80 uppercase tracking-wider">
                    {profile.name}
                  </p>
                  <p className="font-mono text-[10px] text-white/50 uppercase tracking-wider mt-1">
                    {profile.title}
                  </p>
                </div>
              </div>

              {/* Quick info */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <MapPinIcon size={14} className="text-[#859ba6]" />
                  <span
                    className="font-mono text-xs"
                    style={{ color: '#647e8b' }}
                  >
                    {profile.location}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MailIcon size={14} className="text-[#859ba6]" />
                  <span
                    className="font-mono text-xs"
                    style={{ color: '#647e8b' }}
                  >
                    {profile.email}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Bio & Education */}
          <div className="flex flex-col gap-6">
            {/* Bio */}
            <div className="fade-in-up glass-card p-6 sm:p-8">
              <h3
                className="text-lg font-bold mb-4"
                style={{ color: '#45616f' }}
              >
                Biography
              </h3>
              <p
                className="leading-relaxed"
                style={{ color: '#647e8b' }}
              >
                {profile.bio}
              </p>
            </div>

            {/* Education timeline */}
            <div className="fade-in-up glass-card p-6 sm:p-8">
              <h3
                className="text-lg font-bold mb-6"
                style={{ color: '#45616f' }}
              >
                Education & Credentials
              </h3>

              {education.map((edu, i) => (
                <div
                  key={i}
                  className="relative pl-6 pb-6 last:pb-0"
                  style={{
                    borderLeft: '2px solid rgba(56, 189, 248, 0.2)',
                  }}
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-[-5px] top-1 w-2 h-2 rounded-full"
                    style={{ backgroundColor: '#38bdf8' }}
                  />

                  <p
                    className="font-mono text-[10px] uppercase tracking-wider mb-1"
                    style={{ color: '#38bdf8' }}
                  >
                    {edu.year}
                  </p>
                  <h4
                    className="font-semibold"
                    style={{ color: '#45616f' }}
                  >
                    {edu.degree}
                  </h4>
                  <p
                    className="text-sm mt-1"
                    style={{ color: '#5e8896' }}
                  >
                    {edu.institution}
                  </p>
                  <p
                    className="text-sm mt-2 leading-relaxed"
                    style={{ color: '#647e8b' }}
                  >
                    {edu.details}
                  </p>
                </div>
              ))}
            </div>

            {/* Download Resume CTA */}
            <div className="fade-in-up">
              <button
                onClick={() => {
                  sound.success();
                }}
                onMouseEnter={() => sound.hover()}
                className="glass-pill px-6 py-3 font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-all duration-300 hover:border-[rgba(59,89,102,0.35)]"
                style={{ color: '#334b57' }}
                data-cursor="interactive"
              >
                <DownloadIcon size={14} />
                Download Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
