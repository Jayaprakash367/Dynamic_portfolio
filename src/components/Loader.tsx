import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let current = 0;
    const duration = 2000; // 2 seconds total
    const steps = 100;
    const stepTime = duration / steps;

    intervalRef.current = setInterval(() => {
      current += 1;
      setCount(current);

      if (current >= 100) {
        if (intervalRef.current) clearInterval(intervalRef.current);

        // Animate out
        setTimeout(() => {
          if (containerRef.current) {
            gsap.to(containerRef.current, {
              opacity: 0,
              y: -40,
              duration: 0.6,
              ease: 'power3.inOut',
              onComplete: () => {
                onComplete();
              },
            });
          }
        }, 300);
      }
    }, stepTime);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
      style={{ backgroundColor: '#ebf1f6' }}
    >
      {/* Counter */}
      <div
        className="font-mono text-7xl sm:text-8xl md:text-9xl font-semibold tracking-tight"
        style={{ color: '#5e8896' }}
      >
        {String(count).padStart(3, '0')}
      </div>

      {/* Progress bar */}
      <div className="mt-8 w-48 sm:w-64 h-[2px] rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(74, 99, 111, 0.15)' }}>
        <div
          className="h-full rounded-full transition-all duration-75 ease-linear"
          style={{
            width: `${count}%`,
            background: 'linear-gradient(90deg, #38bdf8, #0284c7)',
            boxShadow: '0 0 20px rgba(56, 189, 248, 0.5)',
          }}
        />
      </div>

      {/* Label */}
      <p
        className="mt-4 font-mono text-xs tracking-[0.2em] uppercase"
        style={{ color: '#859ba6' }}
      >
        Initializing Portfolio
      </p>
    </div>
  );
};

export default Loader;
