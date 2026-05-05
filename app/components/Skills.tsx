'use client';
import { useReveal } from './useReveal';

const categories = [
  { title: 'Languages & Core', cls: '', items: ['Python', 'SQL', 'JavaScript', 'C', 'R'] },
  { title: 'Machine Learning', cls: 'skill-orb--accent', items: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'XGBoost', 'Keras'] },
  { title: 'Cloud & Web', cls: 'skill-orb--secondary', items: ['Cloudflare Workers', 'Next.js', 'Supabase', 'PostgreSQL', 'Node.js'] },
  { title: 'Data & Analytics', cls: 'skill-orb--tertiary', items: ['Tableau', 'Power BI', 'Pandas', 'NumPy', 'Git'] },
];

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="section-container">
        <div className="section-label" {...useReveal()}><span className="section-label-number">04</span><span className="section-label-line" /><span className="section-label-text">Skills</span></div>
        <h2 className="section-heading" {...useReveal()}>Tech <span className="text-accent">arsenal</span></h2>
        <div className="skills-grid" {...useReveal()}>
          {categories.map(c => (
            <div className="skill-category" key={c.title}>
              <div className="skill-category-title">{c.title}</div>
              <div className="skill-orbs">{c.items.map(s => <span className={`skill-orb ${c.cls}`} key={s}>{s}</span>)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
