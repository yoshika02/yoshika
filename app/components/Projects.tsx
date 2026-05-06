'use client';
import { useReveal, useProjectReveal } from './useReveal';
import { useEffect } from 'react';

const GH = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>;
const EXT = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>;

interface Project { type: string; title: string; impact: string; desc: React.ReactNode; tags: string[]; links: { href: string; icon: React.ReactNode; title: string }[]; style?: React.CSSProperties; side?: React.ReactNode; }

function ProjectCard({ p }: { p: Project }) {
  const reveal = useProjectReveal();

  useEffect(() => {
    const card = reveal.ref.current;
    if (!card) return;

    const onMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', ((e.clientX - r.left) / r.width * 100) + '%');
      card.style.setProperty('--mouse-y', ((e.clientY - r.top) / r.height * 100) + '%');
    };
    card.addEventListener('mousemove', onMove);
    return () => card.removeEventListener('mousemove', onMove);
  }, [reveal]);

  const { ref, ...revealAttrs } = reveal;
  return (
    <div className="project-card" ref={ref} {...revealAttrs} style={p.style}>
      <div className="project-card-glow" />
      <div className="project-card-content">
        <div className="project-card-header">
          <span className="project-type">{p.type}</span>
          <div className="project-links">
            {p.links.map((l, i) => <a key={i} href={l.href} target="_blank" rel="noopener noreferrer" className="project-link" title={l.title}>{l.icon}</a>)}
          </div>
        </div>
        <h3 className="project-title">{p.title}</h3>
        {p.impact && <div className="project-impact">{p.impact}</div>}
        <p className="project-desc">{p.desc}</p>
        <div className="project-tags">{p.tags.map(t => <span className="tag" key={t}>{t}</span>)}</div>
      </div>
      {p.side}
    </div>
  );
}

const projects: Project[] = [
  { type: 'Full-Stack Platform', title: 'A/B Testing Platform', impact: 'Serves 100K+ learner sessions · Real-time variant experiments · Measurable CTR uplift on topper cards', desc: <>Real-time experimentation engine on <strong>Cloudflare Workers</strong> — variant management, visitor fingerprinting, and a React analytics dashboard. Zero-latency edge execution with <strong>KV Storage</strong> for experiment state.</>, tags: ['Cloudflare Workers', 'React', 'D1 Database', 'KV Storage'], links: [{ href: 'https://github.com/yoshika02', icon: GH, title: 'GitHub' }] },
  { type: 'AI / NLP System', title: 'Reddit AI Persona Engine', impact: '8 personas · Zero manual moderation · Organic Hinglish engagement at scale', desc: <>Deployed <strong>8 distinct AI personas</strong> across NEET subreddits using Gemini API with context-aware system prompts, persona memory, and automated post/comment scheduling.</>, tags: ['Gemini API', 'Python', 'Reddit API', 'NLP'], links: [{ href: 'https://github.com/yoshika02', icon: GH, title: 'GitHub' }] },
  { type: 'Data Pipeline / ETL', title: 'CleverTap ETL Pipeline', impact: '100K+ records · 2 weeks → 4 hours · Fully automated', desc: <>Automated HubSpot → CleverTap migration with deduplication, profile enrichment, and batch API ingestion.</>, tags: ['Python', 'CleverTap API', 'ETL'], links: [{ href: 'https://github.com/yoshika02', icon: GH, title: 'GitHub' }] },
  { type: 'Bot Development', title: 'Telegram Referral Bot', impact: 'Full referral funnel automation · PDF gating · Admin analytics', desc: <>Referral tracking, tiered rewards, PDF access control, and CSV exports. Grows the NEETprep learner base on autopilot.</>, tags: ['Python', 'Telegram API', 'SQLite'], links: [{ href: 'https://github.com/yoshika02', icon: GH, title: 'GitHub' }] },
  { type: 'ML Research', title: 'Diabetes Prediction Model', impact: '94% accuracy · Ensemble ML · IIT Jammu research', desc: <>Predicts diabetes onset from clinical parameters (BMI, insulin %, glucose, blood pressure spikes) using XGBoost + Random Forest ensemble with engineered biomarker features.</>, tags: ['XGBoost', 'Scikit-learn', 'Feature Engineering'], links: [{ href: 'https://github.com/yoshika02', icon: GH, title: 'GitHub' }] },
  {
    type: 'Hotel Management · Full-Stack', title: 'Hotel Booking Backend', impact: '', desc: <>REST API on <strong>Cloudflare Workers</strong> backed by <strong>Supabase PostgreSQL</strong> with JWT auth, room availability logic, and booking management. Deployed globally at the edge.</>, tags: ['Cloudflare Workers', 'Supabase', 'PostgreSQL', 'JWT'], links: [{ href: 'https://github.com/yoshika02', icon: GH, title: 'GitHub' }, { href: 'https://france-hotels.vercel.app/', icon: EXT, title: 'Live Site' }],
    style: { gridColumn: 'span 12', display: 'grid', gridTemplateColumns: '1fr 1fr' },
    side: <div className="project-card-side"><div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 2 }}><span style={{ color: 'var(--accent)' }}>GET</span>  /api/rooms<br /><span style={{ color: 'var(--accent)' }}>POST</span> /api/bookings<br /><span style={{ color: 'var(--accent)' }}>PUT</span>  /api/bookings/:id<br /><span style={{ color: 'var(--text-muted)' }}>// JWT authenticated</span><br /><span style={{ color: 'var(--text-muted)' }}>// Edge deployed · Global</span></div></div>,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="section-container">
        <div className="section-label" {...useReveal()}><span className="section-label-number">03</span><span className="section-label-line" /><span className="section-label-text">Projects</span></div>
        <h2 className="section-heading" {...useReveal()}>Selected <span className="text-accent">builds</span></h2>
        <div className="projects-grid">{projects.map((p, i) => <ProjectCard key={i} p={p} />)}</div>
      </div>
    </section>
  );
}
