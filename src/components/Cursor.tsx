import React, { useEffect, useRef, useState } from 'react';

const Cursor: React.FC = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch devices
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    // Hover detection
    const handleMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (
        el.closest('a') ||
        el.closest('button') ||
        el.closest('[data-cursor="interactive"]')
      ) {
        setHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (
        el.closest('a') ||
        el.closest('button') ||
        el.closest('[data-cursor="interactive"]')
      ) {
        setHovering(false);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    // RAF lerp loop
    let rafId: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.15);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.15);

      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${pos.current.x - 18}px, ${pos.current.y - 18}px)`;
      }
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${target.current.x - 3}px, ${target.current.y - 3}px)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [visible]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Outer ring */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: `2px solid ${hovering ? '#38bdf8' : 'rgba(51, 75, 87, 0.4)'}`,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s, border-color 0.3s, width 0.3s, height 0.3s',
          ...(hovering && {
            width: 54,
            height: 54,
            marginLeft: -9,
            marginTop: -9,
            borderColor: '#38bdf8',
            backgroundColor: 'rgba(56, 189, 248, 0.08)',
          }),
        }}
      />
      {/* Inner dot */}
      <div
        ref={innerRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: hovering ? '#38bdf8' : '#334b57',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s, background-color 0.3s',
        }}
      />
    </>
  );
};

export default Cursor;
