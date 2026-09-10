import React, { useState, useEffect, useRef } from 'react';
import { projects, Project } from '../data/portfolio';
import { sound } from '../lib/audio';
import CircularGallery from '../components/CircularGallery';
import { XIcon, GithubIcon, ExternalLinkIcon } from '../components/Icons';

const HorizontalWorks: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-in-up').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Close modal on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <section
      id="works"
      ref={sectionRef}
      className="section-padding"
      style={{ backgroundColor: '#ebf1f6' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header HUD */}
        <div className="fade-in-up flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <p
              className="font-mono text-[10px] uppercase tracking-[0.2em] mb-2"
              style={{ color: '#859ba6' }}
            >
              // Selected Works
            </p>
            <h2
              className="text-2xl sm:text-3xl font-bold"
              style={{ color: '#45616f' }}
            >
              3D WebGL Cylindrical Archive
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span
              className="font-mono text-[10px] uppercase tracking-wider"
              style={{ color: '#859ba6' }}
            >
              {String(projects.length).padStart(2, '0')} BUILDS
            </span>

            {/* Project dropdown */}
            <select
              value={activeIndex}
              onChange={(e) => {
                const idx = Number(e.target.value);
                setActiveIndex(idx);
                sound.click();
              }}
              className="glass-pill px-3 py-1.5 font-mono text-xs appearance-none bg-transparent outline-none"
              style={{ color: '#647e8b' }}
              data-cursor="interactive"
            >
              {projects.map((p, i) => (
                <option key={p.id} value={i}>
                  {String(i + 1).padStart(2, '0')} — {p.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active index indicators */}
        <div className="fade-in-up flex items-center gap-1.5 mb-6">
          {projects.map((_, i) => (
            <div
              key={i}
              className="h-1 rounded-full transition-all duration-300"
              style={{
                width: i === activeIndex ? 24 : 8,
                backgroundColor: i === activeIndex ? '#38bdf8' : 'rgba(74, 99, 111, 0.2)',
              }}
            />
          ))}
        </div>

        {/* 3D Gallery */}
        <div className="fade-in-up gallery-container">
          <CircularGallery
            onProjectClick={(project) => {
              setSelectedProject(project);
              setActiveIndex(projects.findIndex((p) => p.id === project.id));
            }}
          />
        </div>

        {/* Project grid fallback (below gallery) */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="fade-in-up glass-card p-5 hover-lift group"
              onClick={() => {
                sound.click();
                setSelectedProject(project);
                setActiveIndex(i);
              }}
              onMouseEnter={() => sound.hover()}
              data-cursor="interactive"
            >
              {/* Cover strip */}
              <div
                className="h-2 rounded-full mb-4 transition-all duration-500 group-hover:h-3"
                style={{
                  background: `linear-gradient(90deg, ${project.color}66, ${project.color})`,
                }}
              />
              <p
                className="font-mono text-[10px] uppercase tracking-wider"
                style={{ color: '#859ba6' }}
              >
                {project.category}
              </p>
              <h3
                className="text-lg font-bold mt-1"
                style={{ color: '#45616f' }}
              >
                {project.title}
              </h3>
              <p
                className="text-sm mt-2 leading-relaxed"
                style={{ color: '#647e8b' }}
              >
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${project.color}15`,
                      color: project.color,
                      border: `1px solid ${project.color}30`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Project Modal ─── */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-2xl glass-card overflow-hidden">
            {/* Cover */}
            <div
              className="h-48 sm:h-56 relative"
              style={{
                background: `linear-gradient(135deg, ${selectedProject.color}33 0%, ${selectedProject.color}77 50%, ${selectedProject.color}aa 100%)`,
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl sm:text-7xl font-black text-white/80">
                  {selectedProject.title.charAt(0)}
                </span>
              </div>

              {/* Category badge */}
              <div className="absolute top-4 left-4">
                <span
                  className="glass-pill px-3 py-1 font-mono text-[10px] uppercase tracking-wider"
                  style={{ color: '#334b57' }}
                >
                  {selectedProject.category}
                </span>
              </div>

              {/* Close button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors"
                data-cursor="interactive"
              >
                <XIcon size={16} className="text-white" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8">
              <h3
                className="text-2xl sm:text-3xl font-bold"
                style={{ color: '#45616f' }}
              >
                {selectedProject.title}
              </h3>

              <p
                className="mt-4 leading-relaxed"
                style={{ color: '#647e8b' }}
              >
                {selectedProject.longDescription}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                {selectedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: `${selectedProject.color}12`,
                      color: selectedProject.color,
                      border: `1px solid ${selectedProject.color}25`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex items-center gap-3 mt-8">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.click()}
                    onMouseEnter={() => sound.hover()}
                    className="glass-pill px-5 py-2.5 font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-all duration-300"
                    style={{ color: '#334b57' }}
                    data-cursor="interactive"
                  >
                    <GithubIcon size={14} />
                    GitHub
                  </a>
                )}
                {selectedProject.live && (
                  <a
                    href={selectedProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.click()}
                    onMouseEnter={() => sound.hover()}
                    className="px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-all duration-300"
                    style={{
                      backgroundColor: '#334b57',
                      color: '#ffffff',
                    }}
                    data-cursor="interactive"
                  >
                    <ExternalLinkIcon size={14} />
                    Live Demo
                  </a>
                )}
              </div>

              {/* Year */}
              <p
                className="mt-6 font-mono text-[10px] uppercase tracking-wider"
                style={{ color: '#859ba6' }}
              >
                Year: {selectedProject.year}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HorizontalWorks;
