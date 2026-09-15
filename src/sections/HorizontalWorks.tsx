import React, { useState, useEffect, useRef, useMemo } from 'react';
import { projects, Project } from '../data/portfolio';
import { sound } from '../lib/audio';
import {
  GithubIcon,
  ExternalLinkIcon,
  XIcon,
} from '../components/Icons';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Cpu,
  Layers,
  Activity,
  ShieldCheck,
  Eye,
  Grid,
  SlidersHorizontal,
  ArrowRight,
  Terminal,
} from 'lucide-react';

const HorizontalWorks: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<'overview' | 'features' | 'telemetry'>('overview');
  const [activeStage, setActiveStage] = useState(0);
  const [viewMode, setViewMode] = useState<'reel' | 'grid'>('reel');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [tiltStyles, setTiltStyles] = useState<{ [key: number]: { rx: number; ry: number } }>({});

  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalProjects = projects.length;

  // Handle scroll progress and active stage calculation
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || viewMode !== 'reel') return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight - window.innerHeight;

      if (sectionHeight <= 0) return;

      const top = -rect.top;
      const progress = Math.max(0, Math.min(1, top / sectionHeight));
      setScrollProgress(progress);

      // Determine active project based on progress
      const stage = Math.min(
        totalProjects - 1,
        Math.floor(progress * totalProjects + 0.15)
      );
      setActiveStage(stage);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalProjects, viewMode]);

  // Smooth jump to project index in reel mode
  const jumpToProject = (index: number) => {
    sound.click();
    setActiveStage(index);
    if (!sectionRef.current || viewMode !== 'reel') return;

    const sectionTop = sectionRef.current.offsetTop;
    const sectionHeight = sectionRef.current.offsetHeight - window.innerHeight;
    const targetScroll = sectionTop + (index / (totalProjects - 1)) * sectionHeight;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedProject) {
        if (e.key === 'Escape') setSelectedProject(null);
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        if (activeStage < totalProjects - 1) {
          jumpToProject(activeStage + 1);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (activeStage > 0) {
          jumpToProject(activeStage - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeStage, totalProjects, selectedProject]);

  // 3D Card Hover Tilt handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - card.left;
    const y = e.clientY - card.top;
    const cx = card.width / 2;
    const cy = card.height / 2;
    const rx = ((y - cy) / cy) * -6; // max 6deg tilt
    const ry = ((x - cx) / cx) * 6;
    setTiltStyles((prev) => ({ ...prev, [id]: { rx, ry } }));
  };

  const handleMouseLeave = (id: number) => {
    setTiltStyles((prev) => ({ ...prev, [id]: { rx: 0, ry: 0 } }));
  };

  // Calculate track transform offset
  const trackTranslatePercent = useMemo(() => {
    // 100vw viewport width per item, shift by totalProjects - 1
    return scrollProgress * ((totalProjects - 1) * (100 / totalProjects) * (totalProjects));
  }, [scrollProgress, totalProjects]);

  return (
    <section
      id="works"
      ref={sectionRef}
      className="relative text-left"
      style={{
        backgroundColor: '#ebf1f6',
        // In reel mode, create enough scrollable height so user scrolls smoothly through all projects
        minHeight: viewMode === 'reel' ? `${(totalProjects + 0.8) * 100}vh` : 'auto',
      }}
    >
      {/* ─── STICKY WRAPPER (Cinematic Horizontal Reel) ─── */}
      <div
        ref={containerRef}
        className={
          viewMode === 'reel'
            ? 'sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-6 md:py-8 px-4 sm:px-6 lg:px-12'
            : 'w-full py-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto'
        }
      >
        {/* ─── HUD TOP HEADER ─── */}
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 z-20">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
              <p
                className="font-mono text-[11px] uppercase tracking-[0.25em] font-semibold"
                style={{ color: '#0284c7' }}
              >
                // Featured Builds & Research Labs
              </p>
            </div>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight"
              style={{ color: '#334b57' }}
            >
              Selected Systems
              <span className="text-cyan-500 ml-2">.</span>
            </h2>
          </div>

          {/* Controls & Jump Navigation */}
          <div className="flex items-center flex-wrap gap-2.5 sm:gap-3">
            {/* View Mode Toggle */}
            <div className="glass-pill p-1 flex items-center gap-1 shadow-sm">
              <button
                onClick={() => {
                  sound.click();
                  setViewMode('reel');
                }}
                className={`px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 ${viewMode === 'reel'
                    ? 'bg-cyan-500 text-white shadow-sm'
                    : 'text-[#647e8b] hover:text-[#334b57]'
                  }`}
                data-cursor="interactive"
                title="Cinematic Scroll Reel"
              >
                <SlidersHorizontal size={12} />
                <span>Reel Mode</span>
              </button>
              <button
                onClick={() => {
                  sound.click();
                  setViewMode('grid');
                }}
                className={`px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 ${viewMode === 'grid'
                    ? 'bg-cyan-500 text-white shadow-sm'
                    : 'text-[#647e8b] hover:text-[#334b57]'
                  }`}
                data-cursor="interactive"
                title="All Projects Grid"
              >
                <Grid size={12} />
                <span>Matrix Grid</span>
              </button>
            </div>

            {/* Stage Quick Selector (Reel Mode Only) */}
            {viewMode === 'reel' && (
              <div className="hidden lg:flex items-center glass-pill px-2 py-1 gap-1">
                {projects.map((p, idx) => {
                  const isActive = activeStage === idx;
                  return (
                    <button
                      key={p.id}
                      onClick={() => jumpToProject(idx)}
                      onMouseEnter={() => sound.hover()}
                      className={`px-2.5 py-1 rounded-full font-mono text-[10px] uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 ${isActive
                          ? 'bg-white text-[#334b57] font-bold shadow-sm'
                          : 'text-[#647e8b] hover:text-[#334b57]'
                        }`}
                      data-cursor="interactive"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: p.color }}
                      />
                      <span>0{idx + 1}</span>
                      <span className="hidden xl:inline">{p.title.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Stepper Buttons */}
            {viewMode === 'reel' && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => jumpToProject(Math.max(0, activeStage - 1))}
                  disabled={activeStage === 0}
                  className="glass-pill p-2 text-[#334b57] hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition-all"
                  data-cursor="interactive"
                  aria-label="Previous Project"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => jumpToProject(Math.min(totalProjects - 1, activeStage + 1))}
                  disabled={activeStage === totalProjects - 1}
                  className="glass-pill p-2 text-[#334b57] hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition-all"
                  data-cursor="interactive"
                  aria-label="Next Project"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ─── REEL HORIZONTAL STAGE CAROUSEL ─── */}
        {viewMode === 'reel' ? (
          <div className="relative w-full my-auto overflow-hidden py-2">
            {/* Ambient Background Gradient Orb */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[350px] sm:h-[450px] rounded-full blur-3xl opacity-20 transition-all duration-700 pointer-events-none -z-10"
              style={{
                backgroundColor: projects[activeStage]?.color || '#38bdf8',
              }}
            />

            {/* Horizontal Dynamic Track */}
            <div
              ref={trackRef}
              className="flex transition-transform duration-500 ease-out will-change-transform"
              style={{
                transform: `translateX(-${trackTranslatePercent}%)`,
                width: `${totalProjects * 100}%`,
              }}
            >
              {projects.map((project, idx) => {
                const isActive = activeStage === idx;
                const tilt = tiltStyles[project.id] || { rx: 0, ry: 0 };

                return (
                  <div
                    key={project.id}
                    className="w-full px-2 sm:px-6 md:px-10 flex items-center justify-center"
                    style={{ width: `${100 / totalProjects}%` }}
                  >
                    {/* Main Project Canvas Card */}
                    <div
                      className={`relative w-full max-w-6xl mx-auto rounded-3xl p-6 sm:p-8 lg:p-10 transition-all duration-500 backdrop-blur-xl border ${isActive
                          ? 'bg-white/80 shadow-[0_20px_70px_rgba(56,189,248,0.18)] border-white/90 scale-100 opacity-100'
                          : 'bg-white/40 shadow-sm border-white/40 scale-[0.97] opacity-60'
                        }`}
                      style={{
                        minHeight: '480px',
                      }}
                    >
                      {/* Giant Subtle Background Index */}
                      <span
                        className="absolute -top-6 right-6 select-none font-black font-mono text-7xl sm:text-9xl lg:text-[11rem] opacity-[0.06] pointer-events-none transition-all duration-700"
                        style={{ color: project.color }}
                      >
                        0{idx + 1}
                      </span>

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                        {/* LEFT COLUMN: Project Intelligence & Details */}
                        <div className="lg:col-span-5 flex flex-col justify-between z-10">
                          <div>
                            {/* Badges */}
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              <span
                                className="px-3 py-1 rounded-full font-mono text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5"
                                style={{
                                  backgroundColor: `${project.color}18`,
                                  color: project.color,
                                  border: `1px solid ${project.color}35`,
                                }}
                              >
                                <span
                                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                                  style={{ backgroundColor: project.color }}
                                />
                                {project.badge || project.category}
                              </span>

                              <span
                                className="glass-pill px-2.5 py-0.5 font-mono text-[10px] tracking-wider"
                                style={{ color: '#859ba6' }}
                              >
                                BUILD 0{idx + 1} / 0{totalProjects}
                              </span>
                            </div>

                            {/* Project Title */}
                            <h3
                              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mt-1"
                              style={{ color: '#334b57' }}
                            >
                              {project.title}
                            </h3>

                            {/* Description */}
                            <p
                              className="mt-3 text-sm sm:text-base leading-relaxed"
                              style={{ color: '#5e8896' }}
                            >
                              {project.description}
                            </p>

                            {/* Live Telemetry / Metrics Pillars */}
                            {project.stats && (
                              <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-6">
                                {project.stats.map((st, sIdx) => (
                                  <div
                                    key={sIdx}
                                    className="p-2.5 rounded-2xl bg-white/70 border border-slate-200/60 shadow-xs hover:border-cyan-300 transition-colors"
                                  >
                                    <div
                                      className="font-mono text-xs sm:text-sm font-black tracking-tight"
                                      style={{ color: project.color }}
                                    >
                                      {st.value}
                                    </div>
                                    <div
                                      className="text-[9px] sm:text-[10px] uppercase font-mono tracking-wider truncate mt-0.5"
                                      style={{ color: '#859ba6' }}
                                    >
                                      {st.label}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Tech Stack Pills */}
                            <div className="flex flex-wrap gap-1.5 mt-5">
                              {project.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2.5 py-1 rounded-lg font-mono text-[11px] font-medium transition-all duration-200 hover:scale-105"
                                  style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                    color: '#45616f',
                                    border: '1px solid rgba(74, 99, 111, 0.15)',
                                  }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-wrap items-center gap-3 mt-8 pt-4 border-t border-slate-200/60">
                            <button
                              onClick={() => {
                                sound.click();
                                setSelectedProject(project);
                              }}
                              onMouseEnter={() => sound.hover()}
                              className="px-5 py-2.5 rounded-full font-mono text-xs uppercase font-bold tracking-wider flex items-center gap-2 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                              style={{
                                backgroundColor: '#334b57',
                              }}
                              data-cursor="interactive"
                            >
                              <Sparkles size={14} className="text-cyan-400" />
                              <span>Deep Dive Architecture</span>
                            </button>

                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => sound.click()}
                                onMouseEnter={() => sound.hover()}
                                className="glass-pill px-4 py-2.5 font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 text-[#334b57] hover:bg-white hover:text-black transition-all"
                                data-cursor="interactive"
                              >
                                <GithubIcon size={14} />
                                <span>Source</span>
                              </a>
                            )}
                          </div>
                        </div>

                        {/* RIGHT COLUMN: Realistic Device Showcase with Live Content Preview */}
                        <div className="lg:col-span-7">
                          <div
                            onMouseMove={(e) => handleMouseMove(e, project.id)}
                            onMouseLeave={() => handleMouseLeave(project.id)}
                            onClick={() => {
                              sound.click();
                              setSelectedProject(project);
                            }}
                            className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-2xl transition-all duration-300"
                            style={{
                              transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                              boxShadow: `0 25px 60px -15px ${project.color}35`,
                            }}
                            data-cursor="interactive"
                          >
                            {/* Browser Frame Window Header */}
                            <div className="bg-[#1e293b] px-4 py-3 flex items-center justify-between border-b border-slate-700/60">
                              <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-[#ef4444] inline-block opacity-80 group-hover:opacity-100 transition-opacity" />
                                <span className="w-3 h-3 rounded-full bg-[#f59e0b] inline-block opacity-80 group-hover:opacity-100 transition-opacity" />
                                <span className="w-3 h-3 rounded-full bg-[#10b981] inline-block opacity-80 group-hover:opacity-100 transition-opacity" />
                              </div>

                              {/* Mock URL / System Status bar */}
                              <div className="glass-pill px-3 py-1 bg-slate-900/60 border-slate-700/80 flex items-center gap-2 max-w-[260px] sm:max-w-xs truncate">
                                <ShieldCheck size={12} className="text-emerald-400 shrink-0" />
                                <span className="font-mono text-[10px] text-slate-300 truncate">
                                  https://build.lab/{project.title.toLowerCase().replace(/[^a-z0-9]/g, '')}/v2
                                </span>
                              </div>

                              <div className="flex items-center gap-2 text-slate-400">
                                <span className="font-mono text-[10px] uppercase hidden sm:inline text-cyan-400">
                                  ● LIVE
                                </span>
                                <Maximize2 size={13} className="text-slate-400 group-hover:text-white transition-colors" />
                              </div>
                            </div>

                            {/* Crisp High-Res Project Screenshot Preview */}
                            <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                              <img
                                src={project.image}
                                alt={`${project.title} Preview Interface`}
                                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                                loading="lazy"
                              />

                              {/* Ambient Inner Vignette & Glass Shine overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />

                              {/* Hover Quick Insight Overlay */}
                              <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3 p-6 text-center">
                                <div
                                  className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300"
                                  style={{ backgroundColor: project.color }}
                                >
                                  <Eye size={20} className="text-white" />
                                </div>
                                <span className="font-mono text-xs uppercase tracking-widest text-white font-bold">
                                  Inspect Full Interface & Architecture
                                </span>
                                <span className="text-xs text-slate-300 max-w-sm">
                                  Click to view telemetry breakdown, algorithmic diagrams & full-res screenshots
                                </span>
                              </div>
                            </div>

                            {/* Bottom Card Feature Ribbon */}
                            <div className="bg-slate-900/95 px-4 py-2.5 flex items-center justify-between border-t border-slate-800 text-xs font-mono">
                              <div className="flex items-center gap-2 text-slate-300 truncate">
                                <Activity size={13} style={{ color: project.color }} />
                                <span className="truncate">
                                  {project.features?.[0] || 'High-throughput system architecture'}
                                </span>
                              </div>
                              <span
                                className="font-bold text-[11px] shrink-0 ml-2"
                                style={{ color: project.color }}
                              >
                                {project.year}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* ─── ALTERNATIVE: MATRIX GRID ARCHIVE MODE ─── */
          <div className="w-full max-w-7xl mx-auto my-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <div
                key={project.id}
                onClick={() => {
                  sound.click();
                  setSelectedProject(project);
                }}
                onMouseEnter={() => sound.hover()}
                className="group glass-card overflow-hidden hover-lift p-6 transition-all duration-300 border border-white/80 hover:border-cyan-400 bg-white/70"
                data-cursor="interactive"
              >
                {/* Browser Frame */}
                <div className="rounded-2xl overflow-hidden shadow-md mb-6 border border-slate-200">
                  <div className="bg-slate-900 px-3 py-2 flex items-center justify-between">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    </div>
                    <span className="font-mono text-[9px] text-slate-400">
                      0{idx + 1} // {project.title}
                    </span>
                  </div>
                  <div className="aspect-video relative overflow-hidden bg-slate-900">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${project.color}15`,
                      color: project.color,
                      border: `1px solid ${project.color}30`,
                    }}
                  >
                    {project.category}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">{project.year}</span>
                </div>

                <h3 className="text-xl font-bold text-[#334b57] group-hover:text-cyan-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-[#647e8b] mt-2 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.tags.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-mono font-bold text-cyan-600">
                  <span>Explore Details</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ─── HUD BOTTOM PROGRESS & CONTROLS ─── */}
        {viewMode === 'reel' && (
          <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-300/40 z-20">
            {/* Scroll Progress Bar */}
            <div className="w-full sm:w-1/2 flex items-center gap-3">
              <span className="font-mono text-[10px] font-bold uppercase text-[#859ba6] shrink-0">
                01 START
              </span>
              <div className="relative w-full h-1.5 bg-slate-300/50 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${Math.max(8, scrollProgress * 100)}%` }}
                />
              </div>
              <span className="font-mono text-[10px] font-bold uppercase text-[#859ba6] shrink-0">
                0{totalProjects} END
              </span>
            </div>

            {/* Scroll Hint Ticker */}
            <div className="flex items-center gap-2 text-[#647e8b] font-mono text-[11px]">
              <span className="hidden sm:inline">Scroll down or swipe to journey through works</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-bold text-[#334b57]">
                {String(Math.round(scrollProgress * 100)).padStart(2, '0')}%
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ─── INTERACTIVE DEEP DIVE ARCHITECTURE MODAL ─── */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Dark Glass Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity animate-fade-in"
            onClick={() => setSelectedProject(null)}
          />

          {/* Modal Card */}
          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-auto border border-slate-200 animate-scale-up">
            {/* Modal Header */}
            <div
              className="relative px-6 sm:px-8 py-6 flex flex-col justify-between"
              style={{
                background: `linear-gradient(135deg, ${selectedProject.color}15 0%, #ffffff 100%)`,
                borderBottom: '1px solid rgba(0,0,0,0.06)',
              }}
            >
              <div className="flex items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className="px-3 py-1 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider"
                    style={{
                      backgroundColor: `${selectedProject.color}20`,
                      color: selectedProject.color,
                      border: `1px solid ${selectedProject.color}40`,
                    }}
                  >
                    {selectedProject.badge || selectedProject.category}
                  </span>
                  <span className="font-mono text-xs text-slate-400">
                    // RELEASED {selectedProject.year}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  data-cursor="interactive"
                  aria-label="Close modal"
                >
                  <XIcon size={18} />
                </button>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-[#334b57]">
                {selectedProject.title}
              </h2>
            </div>

            {/* Modal Interactive Image Preview Banner */}
            <div className="relative bg-slate-950 w-full overflow-hidden max-h-[380px] border-b border-slate-200">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-3 right-4 glass-pill px-3 py-1 font-mono text-[10px] text-white bg-black/60 border-white/20">
                Verified Production Asset
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center px-6 sm:px-8 border-b border-slate-200 bg-slate-50/70 gap-2 sm:gap-4 overflow-x-auto">
              <button
                onClick={() => setActiveModalTab('overview')}
                className={`py-3.5 px-3 font-mono text-xs uppercase font-bold tracking-wider border-b-2 transition-all flex items-center gap-2 ${activeModalTab === 'overview'
                    ? 'border-cyan-500 text-cyan-700 bg-white/50'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                data-cursor="interactive"
              >
                <Layers size={14} />
                <span>Overview & Purpose</span>
              </button>

              <button
                onClick={() => setActiveModalTab('features')}
                className={`py-3.5 px-3 font-mono text-xs uppercase font-bold tracking-wider border-b-2 transition-all flex items-center gap-2 ${activeModalTab === 'features'
                    ? 'border-cyan-500 text-cyan-700 bg-white/50'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                data-cursor="interactive"
              >
                <Cpu size={14} />
                <span>Core Engineering Highlights</span>
              </button>

              <button
                onClick={() => setActiveModalTab('telemetry')}
                className={`py-3.5 px-3 font-mono text-xs uppercase font-bold tracking-wider border-b-2 transition-all flex items-center gap-2 ${activeModalTab === 'telemetry'
                    ? 'border-cyan-500 text-cyan-700 bg-white/50'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                data-cursor="interactive"
              >
                <Activity size={14} />
                <span>Metrics & Telemetry</span>
              </button>
            </div>

            {/* Modal Body Content */}
            <div className="p-6 sm:p-8 max-h-[45vh] overflow-y-auto">
              {activeModalTab === 'overview' && (
                <div className="space-y-4">
                  <p className="text-base text-slate-700 leading-relaxed">
                    {selectedProject.longDescription}
                  </p>

                  <div className="pt-4">
                    <h4 className="font-mono text-xs uppercase font-bold text-slate-500 tracking-wider mb-2">
                      Target Technologies & Frameworks
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 rounded-xl font-mono text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeModalTab === 'features' && (
                <div className="space-y-3">
                  <h4 className="font-mono text-xs uppercase font-bold text-slate-500 tracking-wider mb-2">
                    Key Innovations & Architecture
                  </h4>
                  {selectedProject.features?.map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3"
                    >
                      <div
                        className="p-1.5 rounded-lg mt-0.5"
                        style={{
                          backgroundColor: `${selectedProject.color}20`,
                          color: selectedProject.color,
                        }}
                      >
                        <Sparkles size={14} />
                      </div>
                      <p className="text-sm text-slate-700 leading-normal">{feat}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeModalTab === 'telemetry' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {selectedProject.stats?.map((stat, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center"
                      >
                        <div
                          className="font-mono text-2xl sm:text-3xl font-black"
                          style={{ color: selectedProject.color }}
                        >
                          {stat.value}
                        </div>
                        <div className="text-xs uppercase font-mono text-slate-500 mt-1">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-2xl bg-cyan-50/50 border border-cyan-200 text-xs text-cyan-900 flex items-center gap-3">
                    <Terminal size={16} className="text-cyan-600 shrink-0" />
                    <span>
                      Performance benchmarks measured on standard desktop target configurations. Zero frame drops recorded across active interaction sequences.
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer CTAs */}
            <div className="px-6 sm:px-8 py-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="font-mono text-xs text-slate-500">
                Project Code: <span className="font-bold text-slate-700">{selectedProject.title}</span>
              </div>

              <div className="flex items-center gap-3">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.click()}
                    className="px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                    data-cursor="interactive"
                  >
                    <GithubIcon size={14} />
                    <span>View Repository</span>
                  </a>
                )}
                {selectedProject.live && (
                  <a
                    href={selectedProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.click()}
                    className="px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider flex items-center gap-2 text-white transition-colors"
                    style={{ backgroundColor: selectedProject.color }}
                    data-cursor="interactive"
                  >
                    <ExternalLinkIcon size={14} />
                    <span>Live Source</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HorizontalWorks;
