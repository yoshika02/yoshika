'use client';
import { useState, useRef } from 'react';
import { useReveal } from './useReveal';

const responses: Record<string, string> = {
  mitochondria: 'Arre yaar, mitochondria toh cell ka powerhouse hai na! 🔋 ATP banata hai through oxidative phosphorylation. NEET mein bahut baar poocha hai — Krebs cycle aur ETC yaad rakhna pakka! NEETprep pe iske achhe notes hain, check karo.',
  photosynthesis: 'Photosynthesis = light + CO₂ + H₂O → glucose + O₂ 🌱 Light reaction thylakoid mein hoti hai aur Calvin cycle stroma mein. NEET ke liye C3, C4 aur CAM plants ka difference zaroor yaad rakhna.',
  dna: "DNA = Deoxyribonucleic acid 🧬 Double helix structure Watson & Crick ne discover kiya tha. A pairs with T, G pairs with C — yeh Chargaff's rule hai. Replication semi-conservative hoti hai. NEET mein har saal aata hai!",
  genetics: 'Genetics mein Mendel ke laws sabse pehle samjho — Law of Segregation aur Independent Assortment 🌿 Phir codominance, incomplete dominance, aur multiple alleles pe dhyan do. Blood group inheritance NEET ka favourite hai!',
  cell: 'Cell biology NEET ka backbone hai! 🔬 Prokaryotic vs Eukaryotic, cell organelles aur unke functions — sab yaad hona chahiye. Rough ER protein banata hai, smooth ER lipid synthesis karta hai. Golgi packaging karta hai.',
};

function getResponse(msg: string): string {
  const lower = msg.toLowerCase();
  for (const [key, resp] of Object.entries(responses)) {
    if (lower.includes(key)) return resp;
  }
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey'))
    return 'Hey! 😄 Kaise ho? Biology mein koi doubt hai toh pooch lo — main help karungi! NEET 2027 ki prep chal rahi hai kya?';
  if (lower.includes('neet') || lower.includes('exam') || lower.includes('score'))
    return 'NEET ki tension mat lo! 📚 Daily 3-4 ghante consistently padho, NCERT line by line karo, aur NEETprep pe mock tests do. Previous year questions solve karna bahut zaroori hai. Tum kar loge! 💪';
  return 'Achha sawaal hai! 🤔 Dekho, NEET biology mein yeh topic important hai. Main suggest karungi ki NEETprep app pe isko detail mein padho — wahan video lectures aur practice questions dono milenge. Koi aur doubt ho toh poochho! 💪';
}

interface Msg { text: string; isUser: boolean; }

export default function PersonaChat() {
  const [messages, setMessages] = useState<Msg[]>([
    { text: 'Hey! 👋 Main BioWaliDidi hoon. NEET biology mein koi bhi doubt ho toh pooch lo — mitochondria se lekar genetics tak, sab cover karenge! 🧬', isUser: false },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const msgRef = useRef<HTMLDivElement>(null);

  function handleSend() {
    const msg = input.trim();
    if (!msg) return;
    setMessages(prev => [...prev, { text: msg, isUser: true }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { text: getResponse(msg), isUser: false }]);
      setTimeout(() => { msgRef.current?.scrollTo({ top: msgRef.current.scrollHeight, behavior: 'smooth' }); }, 50);
    }, 800 + Math.random() * 1200);
  }

  return (
    <section id="persona-demo" className="section">
      <div className="section-container">
        <div className="section-label" {...useReveal()}><span className="section-label-number">07</span><span className="section-label-line" /><span className="section-label-text">AI Demo</span></div>
        <h2 className="section-heading" {...useReveal()}>Chat with a <span className="text-accent">Hinglish AI Persona</span></h2>
        <p className="persona-subtitle" {...useReveal()}>I built 8 AI personas for NEETprep&apos;s Reddit community engagement. Try asking a NEET biology doubt below — the persona responds in natural Hinglish, just like a real student peer.</p>
        <div className="persona-chat-container" {...useReveal()}>
          <div className="persona-chat-header">
            <div className="persona-chat-avatar">BD</div>
            <div>
              <span className="persona-chat-name">BioWaliDidi</span>
              <span className="persona-chat-status">· AI Persona · Lucknow</span>
            </div>
            <span className="persona-chat-badge">DEMO</span>
          </div>
          <div className="persona-chat-messages" ref={msgRef}>
            {messages.map((m, i) => (
              <div key={i} className={`persona-msg ${m.isUser ? 'persona-msg--user' : 'persona-msg--bot'}`}><span>{m.text}</span></div>
            ))}
            {typing && <div className="persona-msg persona-msg--bot persona-typing"><span className="typing-dots"><span>.</span><span>.</span><span>.</span></span></div>}
          </div>
          <div className="persona-chat-input">
            <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="Ask a NEET biology doubt..." autoComplete="off" />
            <button type="button" onClick={handleSend}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
