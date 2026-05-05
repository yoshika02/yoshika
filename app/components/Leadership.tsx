'use client';
import { useReveal } from './useReveal';

const cards = [
  { icon: 'Alumni Network', title: 'Student Alumni Club', role: 'Core Member · NIT Jalandhar', desc: 'Orchestrated mentorship sessions connecting 500+ current students with industry alumni. Pioneered structured mock-interview programs and curated a career resources repository adopted college-wide.' },
  { icon: 'Creative Arts', title: 'Kalakaar Club', role: 'PR Head · NIT Jalandhar', desc: "Managed public relations and digital outreach for the institute's creative arts society — growing social media reach by 3× through strategic content campaigns and cross-club collaborations." },
  { icon: 'Tech Festival', title: "Nakshatra '24", role: 'Honorary Member', desc: 'Recognised for outstanding contributions to the annual technical festival — coordinated cross-functional teams, managed event logistics for 1000+ attendees, and drove sponsorship outreach.' },
];

export default function Leadership() {
  return (
    <section id="leadership" className="section">
      <div className="section-container">
        <div className="section-label" {...useReveal()}><span className="section-label-number">05</span><span className="section-label-line" /><span className="section-label-text">Leadership</span></div>
        <h2 className="section-heading" {...useReveal()}>Beyond <span className="text-accent">the terminal</span></h2>
        <div className="leadership-cards" {...useReveal()}>
          {cards.map(c => (
            <div className="leadership-card" key={c.title}>
              <div className="leadership-icon">{c.icon}</div>
              <h3 className="leadership-title">{c.title}</h3>
              <p className="leadership-role">{c.role}</p>
              <p className="leadership-desc">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
