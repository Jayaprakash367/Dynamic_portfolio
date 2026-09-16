import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '../lib/audio';
import { profile } from '../data/portfolio';
import {
  SendIcon,
  MailIcon,
  MapPinIcon,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
} from '../components/Icons';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
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

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      sound.click();
      return;
    }

    sound.success();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#38bdf8', '#0284c7', '#ffffff'],
    });

    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const inputClasses =
    'w-full px-4 py-3 rounded-xl bg-white/[0.04] text-white border border-white/15 focus:border-cyan-400 focus:outline-none transition-colors font-mono text-sm placeholder:text-muted-foreground/60';

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding relative"
      style={{ backgroundColor: 'hsl(var(--background))' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="fade-in-up mb-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent-cyan mb-2">
            // Dispatch & Contact
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-normal text-foreground"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Let's Build Something Extraordinary
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground font-body">
            Have a project in mind, an AI research collaboration, or just want to connect? Send
            a message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Form (3 cols) */}
          <div className="lg:col-span-3 fade-in-up">
            <div className="liquid-glass p-6 sm:p-8 rounded-2xl border border-white/10">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4 border border-cyan-400/40"
                    style={{
                      background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(2, 132, 199, 0.3))',
                    }}
                  >
                    <span className="text-2xl text-accent-cyan">✓</span>
                  </div>
                  <h3
                    className="text-2xl font-normal text-foreground"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    Transmission Received
                  </h3>
                  <p className="mt-2 font-mono text-sm text-muted-foreground">
                    Thank you! I will respond promptly to your dispatch.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-wider block mb-1.5 text-muted-foreground">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onClick={() => sound.click()}
                      className={inputClasses}
                      placeholder="e.g. Elena Rostova"
                    />
                    {errors.name && (
                      <p className="mt-1 font-mono text-[10px] text-red-400">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-wider block mb-1.5 text-muted-foreground">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onClick={() => sound.click()}
                      className={inputClasses}
                      placeholder="elena@studio.design"
                    />
                    {errors.email && (
                      <p className="mt-1 font-mono text-[10px] text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-wider block mb-1.5 text-muted-foreground">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onClick={() => sound.click()}
                      className={inputClasses}
                      placeholder="Project Inquiry / Creative Collaboration"
                    />
                    {errors.subject && (
                      <p className="mt-1 font-mono text-[10px] text-red-400">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-wider block mb-1.5 text-muted-foreground">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onClick={() => sound.click()}
                      rows={4}
                      className={`${inputClasses} resize-none`}
                      placeholder="Tell me about your product vision, timeline, and requirements..."
                    />
                    {errors.message && (
                      <p className="mt-1 font-mono text-[10px] text-red-400">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    onMouseEnter={() => sound.hover()}
                    className="liquid-glass w-full sm:w-auto px-8 py-3.5 rounded-full font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 text-white hover:scale-[1.03] transition-all cursor-pointer font-semibold"
                    data-cursor="interactive"
                  >
                    <SendIcon size={14} className="text-accent-cyan" />
                    <span>Transmit Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact info (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Email */}
            <div className="fade-in-up liquid-glass p-5 hover-lift rounded-2xl border border-white/10" data-cursor="interactive">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(2, 132, 199, 0.25))',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                  }}
                >
                  <MailIcon size={16} className="text-accent-cyan" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    Direct Channel
                  </p>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-sm font-semibold text-white hover:text-accent-cyan transition-colors"
                  >
                    {profile.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="fade-in-up liquid-glass p-5 hover-lift rounded-2xl border border-white/10" data-cursor="interactive">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(2, 132, 199, 0.25))',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                  }}
                >
                  <MapPinIcon size={16} className="text-accent-cyan" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    Base Station
                  </p>
                  <p className="text-sm font-semibold text-white">
                    {profile.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Social pills */}
            <div className="fade-in-up liquid-glass p-5 rounded-2xl border border-white/10">
              <p className="font-mono text-[10px] uppercase tracking-wider mb-4 text-muted-foreground">
                Network Coordinates
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.click()}
                  onMouseEnter={() => sound.hover()}
                  className="liquid-glass px-4 py-2 font-mono text-xs flex items-center gap-2 rounded-full text-slate-300 hover:text-white transition-all"
                  data-cursor="interactive"
                >
                  <GithubIcon size={14} className="text-accent-cyan" />
                  GitHub
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.click()}
                  onMouseEnter={() => sound.hover()}
                  className="liquid-glass px-4 py-2 font-mono text-xs flex items-center gap-2 rounded-full text-slate-300 hover:text-white transition-all"
                  data-cursor="interactive"
                >
                  <LinkedinIcon size={14} className="text-accent-cyan" />
                  LinkedIn
                </a>
                <a
                  href={profile.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.click()}
                  onMouseEnter={() => sound.hover()}
                  className="liquid-glass px-4 py-2 font-mono text-xs flex items-center gap-2 rounded-full text-slate-300 hover:text-white transition-all"
                  data-cursor="interactive"
                >
                  <TwitterIcon size={14} className="text-accent-cyan" />
                  Twitter/X
                </a>
              </div>
            </div>

            {/* Footer */}
            <div className="fade-in-up mt-auto pt-4 border-t border-white/10 text-muted-foreground text-xs font-mono">
              <p className="tracking-wider">
                &copy; 2026 Velorah &bull; Jayaprakash K. All rights reserved.
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground/70">
                Crafted with React, Three.js, WebGL &amp; Liquid Glass Architecture.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
