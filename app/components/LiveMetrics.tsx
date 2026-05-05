'use client';
import { useEffect, useRef, useState } from 'react';
import { useReveal } from './useReveal';

export default function LiveMetrics() {
  const [events, setEvents] = useState(0);
  const [api, setApi] = useState(0);
  const [barW, setBarW] = useState(0);
  const active = useRef(false);
  const apiBase = useRef(14283);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && !active.current) {
          active.current = true;
          tick();
        }
      });
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  function tick() {
    if (!active.current) return;
    setEvents(Math.floor(820 + Math.random() * 380));
    apiBase.current += Math.floor(Math.random() * 15 + 5);
    setApi(apiBase.current);
    setBarW(60 + Math.random() * 35);
    setTimeout(tick, 1800 + Math.random() * 1200);
  }

  return (
    <section id="live-metrics" className="section">
      <div className="section-container">
        <div className="section-label" {...useReveal()}><span className="section-label-number">06</span><span className="section-label-line" /><span className="section-label-text">Live Systems</span></div>
        <h2 className="section-heading" {...useReveal()}>Built to handle <span className="text-accent">production scale</span></h2>
        <div className="live-dashboard" {...useReveal()}>
          <div className="live-counter-panel" ref={panelRef}>
            <div className="live-counter-header">
              <span className="live-counter-dot" />
              <span className="live-counter-label">SYSTEM THROUGHPUT — LIVE SIMULATION</span>
            </div>
            <div className="live-counters">
              <div className="live-counter"><span className="live-counter-value">{events.toLocaleString()}</span><span className="live-counter-unit">events / min</span></div>
              <div className="live-counter"><span className="live-counter-value">{api.toLocaleString()}</span><span className="live-counter-unit">API calls today</span></div>
              <div className="live-counter"><span className="live-counter-value">99.97</span><span className="live-counter-unit">% uptime</span></div>
            </div>
            <div className="live-bar-container"><div className="live-bar" style={{ width: barW + '%' }} /></div>
          </div>
          <div className="testimonial-panel">
            <div className="testimonial-quote">
              <svg className="testimonial-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" opacity="0.3"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/></svg>
              <p className="testimonial-text">Yoshika single-handedly automated our entire settlement reconciliation pipeline — what used to take our accounts team an entire day now runs in minutes. The CleverTap migration saved us weeks. His A/B testing platform is now core infrastructure at NEETprep.</p>
              <div className="testimonial-author">
                <div className="testimonial-author-info">
                  <span className="testimonial-author-name">Engineering Lead</span>
                  <span className="testimonial-author-role">NEETprep · New Delhi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
