/* ============================================================
   YOSHIKA VERMA — HIGH-PERFORMANCE ENGINEERING PORTFOLIO
   Main JavaScript v3 — Animations, Grid BG, Live Counter, Chat
   ============================================================ */

// ─── SCROLL-REACTIVE GRID BACKGROUND ──────────────────────
function initGridBackground() {
  const canvas = document.getElementById('grid-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, scrollRatio = 0;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = document.documentElement.scrollHeight;
    draw();
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const cellSize = 48;
    const cols = Math.ceil(w / cellSize);
    const rows = Math.ceil(h / cellSize);
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    scrollRatio = maxScroll > 0 ? window.scrollY / maxScroll : 0;

    for (let r = 0; r < rows; r++) {
      const y = r * cellSize;
      const rowCenter = y / h;
      const viewCenter = (window.scrollY + window.innerHeight / 2) / h;
      const dist = Math.abs(rowCenter - viewCenter);
      const intensity = Math.max(0, 1 - dist * 3);
      const baseAlpha = 0.02 + intensity * 0.06;

      // horizontal lines
      ctx.strokeStyle = `rgba(181, 255, 0, ${baseAlpha})`;
      ctx.lineWidth = intensity > 0.3 ? 0.6 : 0.3;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();

      // add intersection dots at bright zones
      if (intensity > 0.2) {
        for (let c = 0; c < cols; c++) {
          const x = c * cellSize;
          const dotAlpha = baseAlpha * 1.5;
          ctx.fillStyle = `rgba(181, 255, 0, ${dotAlpha})`;
          ctx.fillRect(x - 1, y - 1, 2, 2);
        }
      }
    }

    // vertical lines
    for (let c = 0; c <= cols; c++) {
      const x = c * cellSize;
      ctx.strokeStyle = `rgba(181, 255, 0, 0.025)`;
      ctx.lineWidth = 0.3;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }

    // moving horizontal scan beam
    const beamY = window.scrollY + window.innerHeight * 0.5;
    const grad = ctx.createLinearGradient(0, beamY - 80, 0, beamY + 80);
    grad.addColorStop(0, 'rgba(181,255,0,0)');
    grad.addColorStop(0.5, 'rgba(181,255,0,0.08)');
    grad.addColorStop(1, 'rgba(181,255,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, beamY - 80, w, 160);
  }

  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('scroll', draw, { passive: true });
}

// ─── PARTICLE CANVAS ───────────────────────────────────────
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [], w, h;
  const COUNT = 70, DIST = 140;

  function resize() {
    w = canvas.width = canvas.parentElement.offsetWidth;
    h = canvas.height = canvas.parentElement.offsetHeight;
  }

  function create() {
    particles = [];
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 1.8 + 0.5, opacity: Math.random() * 0.4 + 0.15,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < DIST) {
          ctx.strokeStyle = `rgba(181,255,0,${(1 - dist / DIST) * 0.1})`;
          ctx.lineWidth = 0.4;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(181,255,0,${p.opacity})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  resize(); create(); draw();
  window.addEventListener('resize', () => { resize(); create(); });
}

// ─── TYPING EFFECT ─────────────────────────────────────────
function initTypingEffect() {
  const el = document.getElementById('hero-typed');
  if (!el) return;
  const phrases = [
    'Building AI-powered data systems.',
    'ML models with 94% accuracy.',
    'Cloud-native engineering at scale.',
    'From ISI Kolkata to IIT Jammu.',
    '100K+ users served and counting.',
  ];
  let phraseIdx = 0, charIdx = 0, isDeleting = false;

  function type() {
    const current = phrases[phraseIdx];
    if (!isDeleting) {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) { isDeleting = true; setTimeout(type, 2200); return; }
      setTimeout(type, 45 + Math.random() * 30);
    } else {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) { isDeleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; setTimeout(type, 400); return; }
      setTimeout(type, 20);
    }
  }
  setTimeout(type, 1500);
}

// ─── COUNTER ANIMATION ────────────────────────────────────
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const duration = 2000, start = performance.now();
        function update(now) {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 4);
          el.textContent = Math.floor(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

// ─── SCROLL REVEAL ────────────────────────────────────────
function initScrollReveal() {
  const all = document.querySelectorAll('[data-animate="reveal"]');
  const tl = document.querySelectorAll('[data-animate="timeline"]');
  const proj = document.querySelectorAll('[data-animate="project"]');

  const obs = (els, opts) => {
    const o = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 100);
          o.unobserve(e.target);
        }
      });
    }, opts);
    els.forEach(el => o.observe(el));
  };
  obs(all, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  obs(tl, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });
  obs(proj, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
}

// ─── CURSOR GLOW ──────────────────────────────────────────
function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;
  let mx = 0, my = 0, cx = 0, cy = 0;
  document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });
  (function animate() {
    cx += (mx - cx) * 0.08; cy += (my - cy) * 0.08;
    glow.style.left = cx + 'px'; glow.style.top = cy + 'px';
    requestAnimationFrame(animate);
  })();
}

// ─── PROJECT CARD GLOW ────────────────────────────────────
function initCardGlow() {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', ((e.clientX - r.left) / r.width * 100) + '%');
      card.style.setProperty('--mouse-y', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  });
}

// ─── NAVBAR ───────────────────────────────────────────────
function initNavbar() {
  const nav = document.getElementById('main-nav');
  const sections = document.querySelectorAll('.section, #hero');
  const links = document.querySelectorAll('.nav-link');
  const scrollInd = document.getElementById('scroll-indicator');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
    let cur = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 200) cur = s.id; });
    links.forEach(l => { l.classList.toggle('active', l.dataset.section === cur); });
    if (scrollInd) scrollInd.style.opacity = window.scrollY > 100 ? '0' : '1';
  });
}

// ─── SMOOTH SCROLL ────────────────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const t = document.querySelector(a.getAttribute('href'));
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// ─── PROFILE IMAGE ────────────────────────────────────────
function initProfileImage() {
  const img = document.getElementById('about-photo');
  if (!img) return;
  const c = document.createElement('canvas');
  c.width = 400; c.height = 533;
  const ctx = c.getContext('2d');
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
}

// ─── LIVE EVENT COUNTER SIMULATOR ─────────────────────────
function initLiveCounters() {
  const eventsEl = document.getElementById('counter-events');
  const apiEl = document.getElementById('counter-api');
  const bar = document.getElementById('live-bar');
  if (!eventsEl || !apiEl || !bar) return;

  let apiBase = 14283;
  let active = false;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !active) {
        active = true;
        tick();
      }
    });
  }, { threshold: 0.3 });

  obs.observe(eventsEl.closest('.live-counter-panel'));

  function tick() {
    if (!active) return;
    const events = Math.floor(820 + Math.random() * 380);
    apiBase += Math.floor(Math.random() * 15 + 5);
    eventsEl.textContent = events.toLocaleString();
    apiEl.textContent = apiBase.toLocaleString();
    bar.style.width = (60 + Math.random() * 35) + '%';
    setTimeout(tick, 1800 + Math.random() * 1200);
  }
}

// ─── HINGLISH PERSONA CHAT DEMO ───────────────────────────
function initPersonaChat() {
  const input = document.getElementById('persona-input');
  const sendBtn = document.getElementById('persona-send');
  const messages = document.getElementById('persona-messages');
  if (!input || !sendBtn || !messages) return;

  const responses = {
    'mitochondria': 'Arre yaar, mitochondria toh cell ka powerhouse hai na! 🔋 ATP banata hai through oxidative phosphorylation. NEET mein bahut baar poocha hai — Krebs cycle aur ETC yaad rakhna pakka! NEETprep pe iske achhe notes hain, check karo.',
    'photosynthesis': 'Photosynthesis = light + CO₂ + H₂O → glucose + O₂ 🌱 Light reaction thylakoid mein hoti hai aur Calvin cycle stroma mein. NEET ke liye C3, C4 aur CAM plants ka difference zaroor yaad rakhna. Bohot important hai!',
    'dna': 'DNA = Deoxyribonucleic acid 🧬 Double helix structure Watson & Crick ne discover kiya tha. A pairs with T, G pairs with C — yeh Chargaff\'s rule hai. Replication semi-conservative hoti hai. NEET mein har saal aata hai, pakka padho!',
    'genetics': 'Genetics mein Mendel ke laws sabse pehle samjho — Law of Segregation aur Independent Assortment 🌿 Phir codominance, incomplete dominance, aur multiple alleles pe dhyan do. Blood group inheritance NEET ka favourite hai!',
    'cell': 'Cell biology NEET ka backbone hai! 🔬 Prokaryotic vs Eukaryotic, cell organelles aur unke functions — sab yaad hona chahiye. Rough ER protein banata hai, smooth ER lipid synthesis karta hai. Golgi packaging karta hai. Simple hai!',
    'default': 'Achha sawaal hai! 🤔 Dekho, NEET biology mein yeh topic important hai. Main suggest karungi ki NEETprep app pe isko detail mein padho — wahan video lectures aur practice questions dono milenge. Koi aur doubt ho toh poochho! 💪'
  };

  function getResponse(msg) {
    const lower = msg.toLowerCase();
    for (const [key, resp] of Object.entries(responses)) {
      if (key !== 'default' && lower.includes(key)) return resp;
    }
    if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
      return 'Hey! 😄 Kaise ho? Biology mein koi doubt hai toh pooch lo — main help karungi! NEET 2027 ki prep chal rahi hai kya?';
    }
    if (lower.includes('neet') || lower.includes('exam') || lower.includes('score')) {
      return 'NEET ki tension mat lo! 📚 Daily 3-4 ghante consistently padho, NCERT line by line karo, aur NEETprep pe mock tests do. Previous year questions solve karna bahut zaroori hai. Tum kar loge! 💪';
    }
    return responses.default;
  }

  function addMessage(text, isUser) {
    const div = document.createElement('div');
    div.className = 'persona-msg ' + (isUser ? 'persona-msg--user' : 'persona-msg--bot');
    div.innerHTML = '<span>' + text + '</span>';
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function handleSend() {
    const msg = input.value.trim();
    if (!msg) return;
    addMessage(msg, true);
    input.value = '';

    // Simulate typing delay
    const typing = document.createElement('div');
    typing.className = 'persona-msg persona-msg--bot persona-typing';
    typing.innerHTML = '<span class="typing-dots"><span>.</span><span>.</span><span>.</span></span>';
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;

    setTimeout(() => {
      typing.remove();
      addMessage(getResponse(msg), false);
    }, 800 + Math.random() * 1200);
  }

  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleSend(); });
}

// ─── INITIALIZE EVERYTHING ────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initGridBackground();
  initParticles();
  initTypingEffect();
  initCounters();
  initScrollReveal();
  initCursorGlow();
  initCardGlow();
  initNavbar();
  initSmoothScroll();
  initProfileImage();
  initLiveCounters();
  initPersonaChat();
});
