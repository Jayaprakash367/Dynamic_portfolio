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
      newErrors.email = 'Invalid email format';
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

    // Success!
    setSubmitted(true);
    sound.success();

    // Confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#0284c7', '#a5f3fc', '#334b57'],
    });

    // Reset after delay
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    sound.terminalKey();

    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const inputClasses =
    'w-full bg-transparent border-b-2 px-1 py-3 font-mono text-sm outline-none transition-all duration-300 focus:border-[#38bdf8]';

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding"
      style={{ backgroundColor: '#ebf1f6' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="fade-in-up mb-12">
          <p
            className="font-mono text-[10px] uppercase tracking-[0.2em] mb-2"
            style={{ color: '#859ba6' }}
          >
            // Contact
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{ color: '#45616f' }}
          >
            Let's Build Something Extraordinary
          </h2>
          <p
            className="mt-4 max-w-2xl text-base leading-relaxed"
            style={{ color: '#647e8b' }}
          >
            Have a project in mind, a research collaboration, or just want to say
            hello? Drop me a message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Form (3 cols) */}
          <div className="lg:col-span-3 fade-in-up">
            <div className="glass-card p-6 sm:p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(2, 132, 199, 0.2))',
                    }}
                  >
                    <span className="text-2xl">✓</span>
                  </div>
                  <h3
                    className="text-xl font-bold"
                    style={{ color: '#45616f' }}
                  >
                    Message Sent Successfully
                  </h3>
                  <p
                    className="mt-2 font-mono text-sm"
                    style={{ color: '#647e8b' }}
                  >
                    Thank you! I'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label
                      className="font-mono text-[10px] uppercase tracking-wider block mb-1"
                      style={{ color: '#859ba6' }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onClick={() => sound.click()}
                      className={inputClasses}
                      style={{
                        color: '#334b57',
                        borderColor: errors.name
                          ? '#ef4444'
                          : 'rgba(74, 99, 111, 0.2)',
                      }}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="mt-1 font-mono text-[10px] text-red-500">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      className="font-mono text-[10px] uppercase tracking-wider block mb-1"
                      style={{ color: '#859ba6' }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onClick={() => sound.click()}
                      className={inputClasses}
                      style={{
                        color: '#334b57',
                        borderColor: errors.email
                          ? '#ef4444'
                          : 'rgba(74, 99, 111, 0.2)',
                      }}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 font-mono text-[10px] text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      className="font-mono text-[10px] uppercase tracking-wider block mb-1"
                      style={{ color: '#859ba6' }}
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onClick={() => sound.click()}
                      className={inputClasses}
                      style={{
                        color: '#334b57',
                        borderColor: errors.subject
                          ? '#ef4444'
                          : 'rgba(74, 99, 111, 0.2)',
                      }}
                      placeholder="Project Inquiry"
                    />
                    {errors.subject && (
                      <p className="mt-1 font-mono text-[10px] text-red-500">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      className="font-mono text-[10px] uppercase tracking-wider block mb-1"
                      style={{ color: '#859ba6' }}
                    >
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onClick={() => sound.click()}
                      rows={4}
                      className={`${inputClasses} resize-none`}
                      style={{
                        color: '#334b57',
                        borderColor: errors.message
                          ? '#ef4444'
                          : 'rgba(74, 99, 111, 0.2)',
                      }}
                      placeholder="Tell me about your project..."
                    />
                    {errors.message && (
                      <p className="mt-1 font-mono text-[10px] text-red-500">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    onMouseEnter={() => sound.hover()}
                    className="w-full sm:w-auto px-8 py-3 rounded-full font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
                    style={{
                      backgroundColor: '#334b57',
                      color: '#ffffff',
                    }}
                    data-cursor="interactive"
                  >
                    <SendIcon size={14} />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact info (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Email */}
            <div className="fade-in-up glass-card p-5 hover-lift" data-cursor="interactive">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(56, 189, 248, 0.12), rgba(2, 132, 199, 0.18))',
                  }}
                >
                  <MailIcon size={16} className="text-[#38bdf8]" />
                </div>
                <div>
                  <p
                    className="font-mono text-[10px] uppercase tracking-wider"
                    style={{ color: '#859ba6' }}
                  >
                    Email
                  </p>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-sm font-semibold hover:text-[#38bdf8] transition-colors"
                    style={{ color: '#45616f' }}
                  >
                    {profile.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="fade-in-up glass-card p-5 hover-lift" data-cursor="interactive">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(56, 189, 248, 0.12), rgba(2, 132, 199, 0.18))',
                  }}
                >
                  <MapPinIcon size={16} className="text-[#38bdf8]" />
                </div>
                <div>
                  <p
                    className="font-mono text-[10px] uppercase tracking-wider"
                    style={{ color: '#859ba6' }}
                  >
                    Location
                  </p>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: '#45616f' }}
                  >
                    {profile.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Social pills */}
            <div className="fade-in-up glass-card p-5">
              <p
                className="font-mono text-[10px] uppercase tracking-wider mb-4"
                style={{ color: '#859ba6' }}
              >
                Connect
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.click()}
                  onMouseEnter={() => sound.hover()}
                  className="glass-pill px-4 py-2 font-mono text-xs flex items-center gap-2 transition-all duration-300"
                  style={{ color: '#647e8b' }}
                  data-cursor="interactive"
                >
                  <GithubIcon size={14} />
                  GitHub
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.click()}
                  onMouseEnter={() => sound.hover()}
                  className="glass-pill px-4 py-2 font-mono text-xs flex items-center gap-2 transition-all duration-300"
                  style={{ color: '#647e8b' }}
                  data-cursor="interactive"
                >
                  <LinkedinIcon size={14} />
                  LinkedIn
                </a>
                <a
                  href={profile.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.click()}
                  onMouseEnter={() => sound.hover()}
                  className="glass-pill px-4 py-2 font-mono text-xs flex items-center gap-2 transition-all duration-300"
                  style={{ color: '#647e8b' }}
                  data-cursor="interactive"
                >
                  <TwitterIcon size={14} />
                  Twitter/X
                </a>
              </div>
            </div>

            {/* Footer */}
            <div className="fade-in-up mt-auto pt-4">
              <p
                className="font-mono text-[10px] uppercase tracking-wider text-center lg:text-left"
                style={{ color: '#859ba6' }}
              >
                © 2024 Jayaprakash K. All rights reserved.
              </p>
              <p
                className="font-mono text-[10px] mt-1 text-center lg:text-left"
                style={{ color: '#bcc8d0' }}
              >
                Crafted with React, Three.js, GSAP & ♥
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
