import React, { useState, useEffect, useCallback } from 'react';
import { useLenis } from '../lib/useLenis';
import Cursor from '../components/Cursor';
import Loader from '../components/Loader';
import Nav from '../components/Nav';
import CyberTerminal from '../components/CyberTerminal';
import QuickScroll from '../components/QuickScroll';
import Hero from '../sections/Hero';
import Manifesto from '../sections/Manifesto';
import HorizontalWorks from '../sections/HorizontalWorks';
import Skills from '../sections/Skills';
import About from '../sections/About';
import Process from '../sections/Process';
import Contact from '../sections/Contact';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Initialize Lenis smooth scroll
  useLenis();

  // Keyboard shortcut for terminal (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleLoadComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <div className="relative">
      {/* Custom Cursor */}
      <Cursor />

      {/* Preloader */}
      {loading && <Loader onComplete={handleLoadComplete} />}

      {/* Navigation */}
      {!loading && (
        <Nav onToggleTerminal={() => setTerminalOpen((prev) => !prev)} />
      )}

      {/* Cyber Terminal */}
      <CyberTerminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      {/* Quick Scroll Navigator */}
      {!loading && <QuickScroll />}

      {/* Main Content */}
      <main>
        <Hero />
        <Manifesto />
        <HorizontalWorks />
        <Skills />
        <About />
        <Process />
        <Contact />
      </main>
    </div>
  );
};

export default App;
