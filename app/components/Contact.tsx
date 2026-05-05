'use client';
import { useReveal } from './useReveal';

export default function Contact() {
  return (
    <section id="contact" className="section section--contact">
      <div className="section-container">
        <div className="contact-content">
          <div className="section-label" {...useReveal()}><span className="section-label-number">08</span><span className="section-label-line" /><span className="section-label-text">Contact</span></div>
          <h2 className="contact-heading" {...useReveal()}>Let&apos;s build<br /><span className="text-accent">something great.</span></h2>
          <p className="contact-subtext" {...useReveal()}>Open to full-time roles in AI/ML Engineering, Data Engineering, and Full-Stack Development. Let&apos;s connect.</p>
          <div className="contact-links" {...useReveal()}>
            <a href="mailto:yoshikaverma815@gmail.com" className="contact-link contact-link--primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              yoshikaverma815@gmail.com
            </a>
            <a href="tel:+919780910223" className="contact-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              +91 9780910223
            </a>
            <a href="https://github.com/yoshika02" target="_blank" rel="noopener noreferrer" className="contact-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              github.com/yoshika02
            </a>
            <a href="https://linkedin.com/in/yoshikaverma" target="_blank" rel="noopener noreferrer" className="contact-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              LinkedIn Profile
            </a>
          </div>
        </div>
      </div>
      <footer className="footer"><p className="footer-text">Designed &amp; Engineered by Yoshika Verma · 2026</p></footer>
    </section>
  );
}
