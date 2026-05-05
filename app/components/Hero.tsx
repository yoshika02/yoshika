'use client';
import { useEffect, useRef, useState } from 'react';

function useCountUp(target: number, suffix: string, threshold = 0.5) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const dur = 2000, start = performance.now();
          function update(now: number) {
            const p = Math.min((now - start) / dur, 1);
            el!.textContent = Math.floor(target * (1 - Math.pow(1 - p, 4))) + suffix;
            if (p < 1) requestAnimationFrame(update);
          }
          requestAnimationFrame(update);
          obs.unobserve(el);
        }
      });
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, suffix, threshold]);
  return ref;
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let w: number, h: number, raf: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    const COUNT = 70, DIST = 140;

    function resize() {
      w = canvas!.width = canvas!.parentElement!.offsetWidth;
      h = canvas!.height = canvas!.parentElement!.offsetHeight;
    }
    function create() {
      particles.length = 0;
      for (let i = 0; i < COUNT; i++) {
        particles.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35, size: Math.random() * 1.8 + 0.5, opacity: Math.random() * 0.4 + 0.15 });
      }
    }
    function draw() {
      ctx!.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < DIST) {
            ctx!.strokeStyle = `rgba(181,255,0,${(1 - dist / DIST) * 0.1})`;
            ctx!.lineWidth = 0.4;
            ctx!.beginPath(); ctx!.moveTo(particles[i].x, particles[i].y); ctx!.lineTo(particles[j].x, particles[j].y); ctx!.stroke();
          }
        }
      }
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx!.beginPath(); ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(181,255,0,${p.opacity})`; ctx!.fill();
      }
      raf = requestAnimationFrame(draw);
    }
    resize(); create(); draw();
    const onResize = () => { resize(); create(); };
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('resize', onResize); cancelAnimationFrame(raf); };
  }, []);
  return <canvas id="particle-canvas" ref={canvasRef} aria-hidden="true" />;
}

function TypingEffect() {
  const [text, setText] = useState('');
  useEffect(() => {
    const phrases = ['Building AI-powered data systems.', 'ML models with 94% accuracy.', 'Cloud-native engineering at scale.', 'From ISI Kolkata to IIT Jammu.', '100K+ users served and counting.'];
    let phraseIdx = 0, charIdx = 0, isDeleting = false, timeout: ReturnType<typeof setTimeout>;
    function type() {
      const current = phrases[phraseIdx];
      if (!isDeleting) {
        setText(current.substring(0, charIdx + 1)); charIdx++;
        if (charIdx === current.length) { isDeleting = true; timeout = setTimeout(type, 2200); return; }
        timeout = setTimeout(type, 45 + Math.random() * 30);
      } else {
        setText(current.substring(0, charIdx - 1)); charIdx--;
        if (charIdx === 0) { isDeleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; timeout = setTimeout(type, 400); return; }
        timeout = setTimeout(type, 20);
      }
    }
    timeout = setTimeout(type, 1500);
    return () => clearTimeout(timeout);
  }, []);
  return <p className="hero-subtitle">{text}<span className="hero-cursor">|</span></p>;
}

export default function Hero() {
  const ref1 = useCountUp(3, '');
  const ref2 = useCountUp(6, '');
  const ref3 = useCountUp(100, 'K+');
  const ref4 = useCountUp(94, '%');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (scrollRef.current) scrollRef.current.style.opacity = window.scrollY > 100 ? '0' : '1';
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="hero">
      <ParticleCanvas />
      <div className="hero-scan-line" aria-hidden="true" />
      <div className="hero-content">
        <div className="hero-tag">
          <span className="hero-tag-dot" />
          <span className="hero-tag-text">AI &amp; Data Engineering · New Delhi, India</span>
        </div>
        <h1 className="hero-name">
          <span className="hero-name-line"><span className="hero-name-word">Yoshika</span></span>
          <span className="hero-name-line"><span className="hero-name-word">Verma</span></span>
        </h1>
        <TypingEffect />
        <div className="hero-stats">
          {[{ ref: ref1, label: 'Research Internships' }, { ref: ref2, label: 'Major Projects' }, { ref: ref3, label: 'Users Impacted' }, { ref: ref4, label: 'ML Accuracy' }].map((s, i) => (
            <div className="hero-stat" key={i}>
              <span className="hero-stat-number" ref={s.ref}>0</span>
              <span className="hero-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="scroll-indicator" id="scroll-indicator" ref={scrollRef}>
        <div className="scroll-indicator-line" />
        <span className="scroll-indicator-text">Scroll</span>
      </div>
    </section>
  );
}
