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
      className="section-padding relative"
      style={{ backgroundColor: 'hsl(var(--background))' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="fade-in-up mb-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent-cyan mb-2">
            // Profile
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-normal text-foreground"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            The Engineer Behind the Systems
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Identity Card */}
          <div className="fade-in-up">
            <div className="liquid-glass glow-brackets p-6 sm:p-8 rounded-2xl border border-white/10">
              {/* Studio photo/monogram centerpiece */}
              <div
                className="w-full aspect-[4/5] rounded-xl mb-6 flex items-center justify-center relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #011933 0%, #002b54 50%, #02417a 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                {/* Initials */}
                <span className="text-7xl sm:text-8xl font-black select-none text-white/10 font-mono tracking-tighter">
                  JP
                </span>

                {/* Ambient glow accent */}
                <div
                  className="absolute top-6 right-6 w-20 h-20 rounded-full blur-xl"
                  style={{ background: 'rgba(56, 189, 248, 0.2)' }}
                />
                <div
                  className="absolute bottom-8 left-8 w-32 h-32 rounded-full blur-2xl"
                  style={{ background: 'rgba(2, 132, 199, 0.25)' }}
                />

                {/* Name overlay */}
                <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <p className="font-mono text-sm text-white uppercase tracking-wider font-semibold">
                    {profile.name}
                  </p>
                  <p className="font-mono text-xs text-accent-cyan uppercase tracking-wider mt-1">
                    {profile.title}
                  </p>
                </div>
              </div>

              {/* Quick info */}
              <div className="flex items-center gap-6 flex-wrap text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPinIcon size={14} className="text-accent-cyan" />
                  <span className="font-mono text-xs text-slate-300">
                    {profile.location}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MailIcon size={14} className="text-accent-cyan" />
                  <a
                    href={`mailto:${profile.email}`}
                    className="font-mono text-xs text-slate-300 hover:text-white transition-colors"
                  >
                    {profile.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Bio & Education */}
          <div className="flex flex-col gap-6">
            {/* Bio */}
            <div className="fade-in-up liquid-glass p-6 sm:p-8 rounded-2xl border border-white/10">
              <h3
                className="text-xl font-normal mb-4 text-foreground"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Biography
              </h3>
              <p className="leading-relaxed text-muted-foreground font-body text-sm sm:text-base">
                {profile.bio}
              </p>
            </div>

            {/* Education timeline */}
            <div className="fade-in-up liquid-glass p-6 sm:p-8 rounded-2xl border border-white/10">
              <h3
                className="text-xl font-normal mb-6 text-foreground"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Education & Credentials
              </h3>

              {education.map((edu, i) => (
                <div
                  key={i}
                  className="relative pl-6 pb-6 last:pb-0"
                  style={{
                    borderLeft: '2px solid rgba(56, 189, 248, 0.25)',
                  }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-accent-cyan shadow-[0_0_8px_rgba(56,189,248,0.8)]" />

                  <p className="font-mono text-[10px] uppercase tracking-wider mb-1 text-accent-cyan">
                    {edu.year}
                  </p>
                  <h4 className="font-semibold text-white">
                    {edu.degree}
                  </h4>
                  <p className="text-sm mt-1 text-slate-300">
                    {edu.institution}
                  </p>
                  <p className="text-xs sm:text-sm mt-2 leading-relaxed text-muted-foreground">
                    {edu.details}
                  </p>
                </div>
              ))}
            </div>

            {/* Download Resume CTA */}
            <div className="fade-in-up">
              <a
                href="#contact"
                onClick={() => {
                  sound.success();
                }}
                onMouseEnter={() => sound.hover()}
                className="liquid-glass inline-flex items-center gap-2 px-6 py-3 rounded-full font-mono text-xs uppercase tracking-wider text-white hover:scale-[1.03] transition-all cursor-pointer font-medium"
                data-cursor="interactive"
              >
                <DownloadIcon size={14} className="text-accent-cyan" />
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
