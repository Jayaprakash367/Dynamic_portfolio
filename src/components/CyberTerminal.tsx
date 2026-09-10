import React, { useState, useRef, useEffect, useCallback } from 'react';
import { sound } from '../lib/audio';
import { projects, skillCategories, profile } from '../data/portfolio';
import { XIcon } from './Icons';

interface CyberTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TerminalLine {
  type: 'input' | 'output' | 'system' | 'matrix';
  content: string;
}

const CyberTerminal: React.FC<CyberTerminalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'system', content: '╔══════════════════════════════════════════════╗' },
    { type: 'system', content: '║  JAYAPRAKASH.K // PORTFOLIO TERMINAL v2.0   ║' },
    { type: 'system', content: '╚══════════════════════════════════════════════╝' },
    { type: 'system', content: '' },
    { type: 'output', content: 'Type "help" to see available commands.' },
    { type: 'system', content: '' },
  ]);
  const [matrixActive, setMatrixActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-focus input
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  // Keyboard shortcut to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handler);
      return () => window.removeEventListener('keydown', handler);
    }
  }, [isOpen, onClose]);

  const processCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();
      const newLines: TerminalLine[] = [
        { type: 'input', content: `jp@portfolio:~$ ${cmd}` },
      ];

      switch (trimmed) {
        case 'help':
          newLines.push(
            { type: 'system', content: '' },
            { type: 'output', content: '┌─ AVAILABLE COMMANDS ─────────────────────┐' },
            { type: 'output', content: '│  help      → Show this help menu         │' },
            { type: 'output', content: '│  projects  → List all 9 builds           │' },
            { type: 'output', content: '│  skills    → Print tech matrix           │' },
            { type: 'output', content: '│  about     → Biography & credentials     │' },
            { type: 'output', content: '│  contact   → Email, GitHub, LinkedIn     │' },
            { type: 'output', content: '│  matrix    → Green digital rain effect   │' },
            { type: 'output', content: '│  clear     → Clear terminal output       │' },
            { type: 'output', content: '└──────────────────────────────────────────┘' },
            { type: 'system', content: '' }
          );
          break;

        case 'projects':
          newLines.push(
            { type: 'system', content: '' },
            { type: 'output', content: '── ENGINEERED BUILDS ──────────────────────' }
          );
          projects.forEach((p, i) => {
            newLines.push({
              type: 'output',
              content: `  [${String(i + 1).padStart(2, '0')}] ${p.title} — ${p.category}`,
            });
          });
          newLines.push({ type: 'system', content: '' });
          break;

        case 'skills':
          newLines.push({ type: 'system', content: '' });
          skillCategories.forEach((cat) => {
            newLines.push({
              type: 'output',
              content: `── ${cat.index} // ${cat.label.toUpperCase()} ──`,
            });
            newLines.push({
              type: 'output',
              content: `   ${cat.skills.join(' • ')}`,
            });
            newLines.push({ type: 'system', content: '' });
          });
          break;

        case 'about':
          newLines.push(
            { type: 'system', content: '' },
            { type: 'output', content: `Name:     ${profile.name}` },
            { type: 'output', content: `Title:    ${profile.title}` },
            { type: 'output', content: `Location: ${profile.location}` },
            { type: 'output', content: `Coords:   ${profile.coordinates}` },
            { type: 'system', content: '' },
            { type: 'output', content: profile.bio },
            { type: 'system', content: '' }
          );
          break;

        case 'contact':
          newLines.push(
            { type: 'system', content: '' },
            { type: 'output', content: `Email:    ${profile.email}` },
            { type: 'output', content: `GitHub:   ${profile.github}` },
            { type: 'output', content: `LinkedIn: ${profile.linkedin}` },
            { type: 'output', content: `Twitter:  ${profile.twitter}` },
            { type: 'system', content: '' }
          );
          break;

        case 'matrix':
          setMatrixActive(true);
          newLines.push(
            { type: 'system', content: '' },
            { type: 'matrix', content: 'Initiating digital rain sequence...' },
            { type: 'system', content: '' }
          );
          setTimeout(() => setMatrixActive(false), 5000);
          break;

        case 'clear':
          setLines([]);
          return;

        default:
          newLines.push(
            { type: 'system', content: '' },
            {
              type: 'output',
              content: `Command not found: "${cmd}". Type "help" for available commands.`,
            },
            { type: 'system', content: '' }
          );
      }

      setLines((prev) => [...prev, ...newLines]);
      sound.click();
    },
    []
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      processCommand(input);
      setInput('');
    } else {
      sound.terminalKey();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Terminal Window */}
      <div
        className="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl scanlines"
        style={{
          background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
          border: '1px solid rgba(56, 189, 248, 0.2)',
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ borderBottom: '1px solid rgba(56, 189, 248, 0.15)' }}
        >
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="font-mono text-xs ml-2" style={{ color: '#94a3b8' }}>
              jp@portfolio — terminal
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-white/10 transition-colors"
            data-cursor="interactive"
          >
            <XIcon size={14} className="text-slate-400" />
          </button>
        </div>

        {/* Terminal body */}
        <div
          ref={scrollRef}
          className="p-4 h-80 sm:h-96 overflow-y-auto font-mono text-sm leading-relaxed"
          style={{ color: '#e2e8f0' }}
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((line, i) => (
            <div key={i} className="min-h-[1.5em]">
              {line.type === 'input' && (
                <span style={{ color: '#38bdf8' }}>{line.content}</span>
              )}
              {line.type === 'output' && (
                <span style={{ color: '#cbd5e1' }}>{line.content}</span>
              )}
              {line.type === 'system' && (
                <span style={{ color: '#475569' }}>{line.content}</span>
              )}
              {line.type === 'matrix' && (
                <span style={{ color: '#4ade80' }}>{line.content}</span>
              )}
            </div>
          ))}

          {/* Input line */}
          <div className="flex items-center gap-2 mt-1">
            <span style={{ color: '#38bdf8' }}>jp@portfolio:~$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none font-mono text-sm caret-cyan-400"
              style={{ color: '#e2e8f0' }}
              spellCheck={false}
              autoComplete="off"
            />
            <span
              className="terminal-cursor inline-block w-2 h-4"
              style={{ backgroundColor: '#38bdf8' }}
            />
          </div>
        </div>

        {/* Matrix rain overlay */}
        {matrixActive && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="absolute font-mono text-xs"
                style={{
                  left: `${(i / 30) * 100}%`,
                  color: '#4ade80',
                  opacity: 0.6 + Math.random() * 0.4,
                  animation: `matrixFall ${2 + Math.random() * 3}s linear infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              >
                {Array.from({ length: 20 })
                  .map(() => String.fromCharCode(0x30a0 + Math.random() * 96))
                  .join('\n')}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CyberTerminal;
