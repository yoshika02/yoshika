'use client';
import { useEffect, useRef } from 'react';
import { useReveal } from './useReveal';

export default function About() {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    const c = document.createElement('canvas');
    c.width = 400; c.height = 533;
    const ctx = c.getContext('2d')!;
    const grad = ctx.createLinearGradient(0, 0, 400, 533);
    grad.addColorStop(0, '#0a0a0a'); grad.addColorStop(0.5, '#111'); grad.addColorStop(1, '#080808');
    ctx.fillStyle = grad; ctx.fillRect(0, 0, 400, 533);
    ctx.globalAlpha = 0.06;
    ctx.fillStyle = '#b5ff00'; ctx.beginPath(); ctx.arc(100, 150, 120, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#00d4ff'; ctx.beginPath(); ctx.arc(300, 400, 100, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 1;
    ctx.font = 'bold 110px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const tg = ctx.createLinearGradient(100, 200, 300, 350);
    tg.addColorStop(0, '#b5ff00'); tg.addColorStop(1, '#00d4ff');
    ctx.fillStyle = tg; ctx.fillText('YV', 200, 266);
    img.src = c.toDataURL();
  }, []);

  return (
    <section id="about" className="section">
      <div className="section-container">
        <div className="section-label" {...useReveal()}>
          <span className="section-label-number">01</span>
          <span className="section-label-line" />
          <span className="section-label-text">About</span>
        </div>
        <div className="about-grid">
          <div className="about-image-col" {...useReveal()}>
            <div className="about-image-frame">
              <img id="about-photo" ref={imgRef} src="" alt="Yoshika Verma" className="about-photo" />
              <div className="about-image-overlay" />
              <div className="about-image-corner"><span>yoshika_verma.jpg</span></div>
            </div>
            <div className="about-badges">
              <span className="about-badge">NIT Jalandhar</span>
              <span className="about-badge">B.Tech &apos;26</span>
            </div>
          </div>
          <div className="about-text-col">
            <h2 className="about-heading" {...useReveal()}>
              Biotech-trained engineer building<br /><span className="text-accent">AI systems at production scale.</span>
            </h2>
            <p className="about-description" {...useReveal()}>
              My path is unconventional — a <strong>Biotechnology major at NIT Jalandhar</strong> who pivoted deep into AI and Data Engineering. That background is a feature, not a bug. I apply <strong>statistical rigour and systems thinking</strong> from life sciences to build ML models and data pipelines that are robust, interpretable, and production-ready.
            </p>
            <p className="about-description" {...useReveal()}>
              I&apos;ve interned at <strong>ISI Kolkata</strong> (federated learning research) and <strong>IIT Jammu</strong> (biostatistical ML), and am currently at <strong>NEETprep, New Delhi</strong> — architecting data infrastructure, A/B testing platforms, and AI engagement systems that serve <strong>100K+ active learners</strong>.
            </p>
            <div className="about-metrics" {...useReveal()}>
              {[{ v: '100K+', l: 'Users Served' }, { v: '3', l: 'IIT/ISI Internships' }, { v: '94%', l: 'ML Accuracy' }].map((m, i) => (
                <div className="about-metric" key={i}><span className="about-metric-value">{m.v}</span><span className="about-metric-label">{m.l}</span></div>
              ))}
            </div>
            <div className="about-details" {...useReveal()}>
              {[
                { l: 'Education', v: 'B.Tech Biotechnology, NIT Jalandhar' },
                { l: 'Current Role', v: 'AI & Data Intern · NEETprep, New Delhi' },
                { l: 'Focus Areas', v: 'MLOps · Data Pipelines · Cloud Engineering' },
                { l: 'Stack', v: 'Python · SQL · Cloudflare · Next.js · PyTorch' },
              ].map((d, i) => (
                <div className="about-detail" key={i}><span className="about-detail-label">{d.l}</span><span className="about-detail-value">{d.v}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
