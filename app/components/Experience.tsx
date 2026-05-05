'use client';
import { useReveal, useTimelineReveal } from './useReveal';

const GH_ICON = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>;

interface TimelineEntry {
  date: string; role: string; company: string; badge: string; badgeClass: string;
  details: React.ReactNode[]; tags: string[]; hasPulse?: boolean;
}

function TimelineItem({ entry }: { entry: TimelineEntry }) {
  const reveal = useTimelineReveal();
  return (
    <div className="timeline-item" {...reveal}>
      <div className="timeline-dot">
        <div className="timeline-dot-inner" />
        {entry.hasPulse && <div className="timeline-dot-pulse" />}
      </div>
      <div className="timeline-card">
        <div className="timeline-card-header">
          <div>
            <span className="timeline-date">{entry.date}</span>
            <h3 className="timeline-role">{entry.role}</h3>
            <span className="timeline-company">{entry.company}</span>
          </div>
          <div className={`timeline-card-badge ${entry.badgeClass}`}>{entry.badge}</div>
        </div>
        <ul className="timeline-details">{entry.details.map((d, i) => <li key={i}>{d}</li>)}</ul>
        <div className="timeline-tags">{entry.tags.map(t => <span className="tag" key={t}>{t}</span>)}</div>
      </div>
    </div>
  );
}

const entries: TimelineEntry[] = [
  {
    date: 'Jan 2026 — Present', role: 'AI & Data Engineering Intern', company: 'NEETprep · New Delhi',
    badge: 'Current', badgeClass: 'current', hasPulse: true,
    details: [
      <>Architected and deployed a full <strong>A/B testing platform</strong> on <em>Cloudflare Workers</em>, enabling live variant experiments on topper cards — driving measurable uplift in click-through rates across <strong>100K+ learner sessions</strong></>,
      <>Built a <strong>Reddit AI persona system</strong> — deployed <strong>8 distinct Hinglish AI personas</strong> across NEET-focused subreddits using <em>Gemini API</em>, handling organic community engagement and doubt resolution at scale with zero manual moderation overhead</>,
      <>Designed the <strong>CleverTap data migration pipeline</strong> — automated ETL from <em>HubSpot CRM</em>, migrating <strong>100K+ user records</strong> with deduplication and enrichment, reducing what was a 2-week manual process to under 4 hours</>,
      <>Built a <strong>Telegram referral bot</strong> with reward tracking, PDF gating, and admin analytics — grew referral channel registrations by automating the full funnel</>,
      <>Automated <strong>e-commerce settlement reconciliation</strong> (Amazon + Flipkart → Tally Prime) saving the accounts team <strong>~12 hours/week</strong> of manual data entry</>,
    ],
    tags: ['Python', 'Cloudflare Workers', 'Next.js', 'D1 Database', 'Gemini API', 'HubSpot API', 'CleverTap'],
  },
  {
    date: 'Jun — Jul 2025', role: 'Data Science Research Intern', company: 'Indian Statistical Institute · Kolkata',
    badge: 'Research', badgeClass: 'research',
    details: [
      <>Researched <strong>Federated Learning</strong> frameworks for privacy-preserving distributed ML — studied gradient aggregation strategies (FedAvg, FedProx) under non-IID data conditions</>,
      <>Implemented <strong>differential privacy</strong> mechanisms using <em>PyTorch</em> to enable model training without exposing raw patient data — applied to a medical imaging classification task</>,
      <>Collaborated with ISI faculty on publishing-grade research, gaining exposure to rigorous statistical methodology and academic writing</>,
    ],
    tags: ['Federated Learning', 'PyTorch', 'Differential Privacy', 'Research'],
  },
  {
    date: 'Jun — Jul 2024', role: 'Data Science Research Intern', company: 'IIT Jammu',
    badge: 'Research', badgeClass: 'research',
    details: [
      <>Built a <strong>diabetes prediction model</strong> using ensemble ML — combining <em>XGBoost</em> and <em>Random Forest</em> on clinical parameters (BMI, insulin levels, glucose, blood pressure), achieving <strong>94% accuracy</strong> on patient classification</>,
      <>Engineered features from raw clinical data — insulin ratios, glucose spikes, BMI categories — and applied statistical feature selection to identify the most predictive biomarkers</>,
      <>Leveraged domain knowledge from Biotechnology coursework to design medically meaningful feature sets — a direct application of the Biotech-to-AI pipeline</>,
    ],
    tags: ['XGBoost', 'Scikit-learn', 'Feature Engineering', 'Biostatistics'],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="section-container">
        <div className="section-label" {...useReveal()}><span className="section-label-number">02</span><span className="section-label-line" /><span className="section-label-text">Experience</span></div>
        <h2 className="section-heading" {...useReveal()}>Where I made <span className="text-accent">measurable impact</span></h2>
        <div className="impact-strip" {...useReveal()}>
          {[{ v: '100K+', l: 'Learner records migrated' }, { v: '8', l: 'AI personas deployed' }, { v: '80%', l: 'Report automation rate' }, { v: '94%', l: 'Diabetes predictor accuracy' }].map((c, i) => (
            <div className="impact-cell" key={i}><span className="impact-cell-value">{c.v}</span><span className="impact-cell-label">{c.l}</span></div>
          ))}
        </div>
        <div className="timeline">{entries.map((e, i) => <TimelineItem key={i} entry={e} />)}</div>
      </div>
    </section>
  );
}
