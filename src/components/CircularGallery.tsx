import React, { useRef, useEffect, useState, useCallback } from 'react';
import { projects, Project } from '../data/portfolio';
import { sound } from '../lib/audio';
import './CircularGallery.css';

interface CircularGalleryProps {
  onProjectClick: (project: Project) => void;
}

const CircularGallery: React.FC<CircularGalleryProps> = ({ onProjectClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef(0);
  const rotationStart = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const animRef = useRef<number>(0);

  const totalItems = projects.length;
  const angleStep = 360 / totalItems;

  // Inertial animation
  useEffect(() => {
    const animate = () => {
      if (!isDragging) {
        velocity.current *= 0.95; // friction
        if (Math.abs(velocity.current) > 0.01) {
          setRotation((prev) => prev + velocity.current);
        } else {
          velocity.current = 0;
        }
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [isDragging]);

  // Auto-rotate when not dragging
  useEffect(() => {
    if (isDragging) return;
    const interval = setInterval(() => {
      if (Math.abs(velocity.current) < 0.01) {
        setRotation((prev) => prev + 0.08);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [isDragging]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      setIsDragging(true);
      dragStart.current = e.clientX;
      rotationStart.current = rotation;
      lastX.current = e.clientX;
      lastTime.current = Date.now();
      velocity.current = 0;
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    },
    [rotation]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStart.current;
      const containerWidth = containerRef.current?.clientWidth || 1000;
      const newRotation = rotationStart.current + (dx / containerWidth) * 180;
      setRotation(newRotation);

      // Calculate velocity
      const now = Date.now();
      const dt = now - lastTime.current;
      if (dt > 0) {
        velocity.current = ((e.clientX - lastX.current) / containerWidth) * 50;
      }
      lastX.current = e.clientX;
      lastTime.current = now;
    },
    [isDragging]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div
      ref={containerRef}
      className="circular-gallery-wrapper"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      style={{ touchAction: 'none', userSelect: 'none' }}
    >
      {/* 3D perspective container */}
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{ perspective: '1200px' }}
      >
        <div
          className="relative"
          style={{
            width: 320,
            height: 400,
            transformStyle: 'preserve-3d',
            transform: `rotateY(${rotation}deg)`,
            transition: isDragging ? 'none' : 'transform 0.05s linear',
          }}
        >
          {projects.map((project, index) => {
            const angle = index * angleStep;
            const radius = 520;

            return (
              <div
                key={project.id}
                className="gallery-card"
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  marginLeft: -160,
                  marginTop: -200,
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                }}
              >
                <div
                  className="gallery-card-inner hover-lift"
                  onClick={(e) => {
                    e.stopPropagation();
                    sound.click();
                    onProjectClick(project);
                  }}
                  onMouseEnter={() => sound.hover()}
                  data-cursor="interactive"
                >
                  {/* Cover */}
                  <div
                    className="gallery-card-cover"
                    style={{
                      background: `linear-gradient(135deg, ${project.color}33 0%, ${project.color}66 50%, ${project.color}99 100%)`,
                    }}
                  >
                    <div className="gallery-card-cover-gradient">
                      {project.title.charAt(0)}
                    </div>
                    {/* Decorative circles */}
                    <div
                      className="absolute top-4 right-4 w-8 h-8 rounded-full"
                      style={{
                        background: `${project.color}40`,
                        backdropFilter: 'blur(4px)',
                      }}
                    />
                    <div
                      className="absolute bottom-4 left-4 w-12 h-12 rounded-full"
                      style={{
                        background: `${project.color}30`,
                        backdropFilter: 'blur(4px)',
                      }}
                    />
                  </div>

                  {/* Body */}
                  <div className="gallery-card-body">
                    <div>
                      <div className="gallery-card-category">{project.category}</div>
                      <div className="gallery-card-title">{project.title}</div>
                      <div className="gallery-card-desc">{project.description}</div>
                    </div>
                    <div className="gallery-card-tags">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="gallery-card-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Gradient edges */}
      <div
        className="absolute inset-y-0 left-0 w-24 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, rgba(235, 241, 246, 0.95) 0%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-y-0 right-0 w-24 pointer-events-none"
        style={{
          background: 'linear-gradient(270deg, rgba(235, 241, 246, 0.95) 0%, transparent 100%)',
        }}
      />
    </div>
  );
};

export default CircularGallery;
