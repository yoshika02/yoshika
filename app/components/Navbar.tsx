'use client';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = document.querySelectorAll<HTMLElement>('.section, #hero');
      let cur = '';
      sections.forEach(s => { if (window.scrollY >= s.offsetTop - 200) cur = s.id; });
      setActive(cur);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const links = [
    { href: '#about', label: 'About', section: 'about' },
    { href: '#experience', label: 'Experience', section: 'experience' },
    { href: '#projects', label: 'Projects', section: 'projects' },
    { href: '#skills', label: 'Skills', section: 'skills' },
    { href: '#contact', label: 'Contact', section: 'contact' },
  ];

  return (
    <nav id="main-nav" className={scrolled ? 'scrolled' : ''}>
      <a href="#hero" className="nav-logo" onClick={e => handleClick(e, '#hero')}>YV.dev</a>
      <div className="nav-links">
        {links.map(l => (
          <a key={l.section} href={l.href} className={`nav-link ${active === l.section ? 'active' : ''}`}
             data-section={l.section} onClick={e => handleClick(e, l.href)}>{l.label}</a>
        ))}
      </div>
      <div className="nav-actions">
        <div className="nav-status">
          <span className="status-dot" />
          <span className="status-text">Open to work</span>
        </div>
        <a href="/resume.pdf" className="btn-resume" download="Yoshika_Verma_Resume.pdf">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Resume
        </a>
      </div>
    </nav>
  );
}
