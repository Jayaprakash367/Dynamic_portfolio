import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

let lenisInstance: Lenis | null = null;

export function useLenis() {
  const rafId = useRef<number>(0);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    lenisInstance = lenis;

    function raf(time: number) {
      lenis.raf(time);
      rafId.current = requestAnimationFrame(raf);
    }

    rafId.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId.current);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
}

export function scrollLenisTo(targetId: string) {
  const cleanId = targetId.replace(/^#/, '');
  const el = document.getElementById(cleanId);
  if (el && lenisInstance) {
    lenisInstance.scrollTo(el, { offset: -80, duration: 1.2 });
  } else if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
