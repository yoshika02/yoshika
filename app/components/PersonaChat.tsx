'use client';
import { useState, useRef, useEffect } from 'react';
import { useReveal } from './useReveal';

const responses: Record<string, string> = {
  // Biology Topics
  mitochondria: 'Arre yaar, mitochondria toh cell ka powerhouse hai na! 🔋 ATP banata hai through oxidative phosphorylation. Krebs cycle (citric acid cycle) aur electron transport chain yaad rakhna pakka! Inner membrane mein cristae hote hain — zyada surface area, zyada ATP production.',
  photosynthesis: 'Photosynthesis = light + CO₂ + H₂O → glucose + O₂ 🌱 Light reaction thylakoid mein hoti hai (P680, PSI, PSII yaad hai?), aur Calvin cycle stroma mein hoti hai. C3, C4, aur CAM plants ka difference samajhna zaroori hai. Fixation → Reduction → Regeneration — repeat!',
  dna: 'DNA = Deoxyribonucleic acid 🧬 Double helix structure Watson & Crick ne discover kiya tha. A pairs with T (2 bonds), G pairs with C (3 bonds). Replication semi-conservative hoti hai. Semi-discontinuous replication — leading aur lagging strands mein Okazaki fragments bante hain. Yaad rakhna!',
  genetics: 'Genetics NEET ka sabse important topic hai! 🌿 Mendel ke 3 laws — Segregation, Independent Assortment, aur Dominance. Codominance (blood groups), incomplete dominance (flowers), multiple alleles. Dihybrid cross mein 9:3:3:1 ratio. Linkage aur crossing over bhi important hai!',
  cell: 'Cell biology backbone hai! 🔬 Prokaryotic vs Eukaryotic structure samajho. Cell organelles: Nucleus (genetic material), Mitochondria (ATP), Rough ER (protein), Smooth ER (lipid), Golgi (packaging), Lysosomes (digestion), Centrosome. Plant cells mein chloroplast aur cell wall hote hain.',
  photosynthesis_equation: 'Light reaction: 2H₂O + light energy → O₂ + ATP + NADPH 💡 Calvin cycle: CO₂ + ATP + NADPH → G3P (glyceraldehyde-3-phosphate). Z scheme samajhna zaroori — electron flow PSI se PSII tak. Noncyclic aur cyclic photophosphorylation mein farak hai.',
  respiration: 'Cellular respiration: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 30-32 ATP 🔥 Glycolysis (cytoplasm, 2 ATP net), Krebs cycle (mitochondrial matrix, 2 ATP), ETC (inner membrane, 26-28 ATP). Anaerobic respiration mein fermentation hoti hai — lactate ya ethanol banta hai.',
  evolution: 'Evolution ka basic concept: Natural selection 🧬 Variation, inheritance, selection — yeh teeno mil ke evolution create karte hain. Lamarck ka theory galat hai. Darwin ka Natural Selection theek hai. Speciation mein reproductive isolation zaroori hai.',
  ecology: 'Ecology = organisms + environment ke beech interaction 🌍 Food chain, food web, energy flow (10% rule), nutrient cycling. Population dynamics — natality, mortality, immigration, emigration. Community structure aur succession.',
  reproduction: 'Human reproduction: Gametogenesis (meiosis), fertilization, aur embryonic development 🤰 Spermatogenesis mein 4 haploid sperm bante hain. Oogenesis mein 1 ovum aur 3 polar bodies. Menstrual cycle 28 days — follicular (days 1-14), luteal (days 15-28).',
  
  // General NEET Questions
  neet: 'NEET 2027 ki prep? Toh listen! 📚 Daily 4-5 ghante consistent padho. NCERT ko ek-ek line dhyan se read karo — 90% questions NCERT se hi aate hain. Previous year papers solve karo. Mock tests regular lo. Revision schedule banao.',
  exam: 'Exam strategy: Mock tests mein time manage karo — 3 hours mein 180 questions! ⏱️ Biology → Chemistry → Physics order mein karo (ya jo comfortable ho). Negative marking hai 1 mark, toh unsure questions mein risk mat lo. Calculation questions ko aakhir mein kar dena.',
  study: 'Study tips: 📖 NCERT padhna compulsory hai. Diagrams banao aur label karo — visual memory strong hoti hai. Revise regularly — spaced repetition best method hai. Group study mein time waste ho jata hai, solo padhna better. Consistency > Intensity!',
  doubt: 'Koi doubt ho toh pooch lo! 🙋‍♀️ Biology ke kisi bhi topic mein confused ho toh explain karo — mitochondria, genes, cells, organs kuch bhi. Simple terms mein explain karungi. Questions ke answers bhi de sakti hoon!',
  motivation: 'Tum kar loge! 💪 Haan, NEET tough hai, lekin millions prepare kar rahe hain — tum bhi kar sakte ho! Consistency banao, dedication karo. Difficult topics ko break down karo — choti-choti steps mein. Every day small progress = big results! Believe in yourself! 🌟',
  
  // Greetings
  hello: 'Hey! 😄 Kaise ho? Main BioWaliDidi hoon. Biology ke doubts, NEET prep tips, ya motivational speech — kuch bhi pooch sakte ho! Mitochondria se lekar evolution tak, sab cover kar lunga. Bol, kya poochna hai? 🧬',
  hi: 'Hii! 👋 Welcome! Main yahan biology ke sab topics explain karne ke liye ready hoon. NEET ka student ho toh bilkul right place! Koi specific topic poochna hai ya general guidance chahiye? 💯',
};

function getResponse(msg: string): string {
  const lower = msg.toLowerCase().trim();
  
  // Exact keyword matching (higher priority)
  for (const [key, resp] of Object.entries(responses)) {
    if (lower.includes(key)) return resp;
  }
  
  // Greeting variations
  if (/\b(hello|hi|hey|hii|yo|sup|namaste)\b/i.test(lower))
    return responses.hello;
  
  // NEET/Exam variations
  if (/\b(neet|exam|board|competitive|score|rank)\b/i.test(lower))
    return responses.exam;
  
  // Study variations
  if (/\b(study|padhna|prepare|revision|notes|tips)\b/i.test(lower))
    return responses.study;
  
  // Doubt/Help variations
  if (/\b(doubt|question|help|confused|samajh|explain|kya hai)\b/i.test(lower))
    return responses.doubt;
  
  // Motivation variations
  if (/\b(motivation|confidence|scared|nervous|difficult|hard|heavy)\b/i.test(lower))
    return responses.motivation;
  
  // Default response
  const defaultResponses = [
    'Achha sawaal hai! 🤔 Yeh topic NEET biology mein important hai. Kya tum isko detail mein samajhna chahte ho? Specific part batao — cellular level se organize, organisms tak, ya broader concept?',
    'Interesting! 🧬 Yeh biology ka fundamental concept hai. Kya tum pehle se samajh rahe ho ya zero se shuru karna hai? Main step-by-step explain karungi!',
    'Bilkul sahi observation! 💡 NEET mein yeh topics often combined pooche jate hain. Related concepts samajhne se achha marks aate hain. Kya tum iska connection samajhna chahte ho?',
    'Wah! Thinking critically! 🌟 Yeh NEET exams mein achha aata hai. Real-world application samajhne se topic better yaad rehta hai. Specific example doon kya?',
  ];
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

interface Msg { text: string; isUser: boolean; }

export default function PersonaChat() {
  const [messages, setMessages] = useState<Msg[]>([
    { text: 'Hey! 👋 Main BioWaliDidi hoon — NEETprep ka AI persona! NEET biology mein koi bhi doubt ho toh pooch lo — mitochondria, genes, evolution, photosynthesis kuch bhi! 🧬 Hinglish mein explain karungi taaki asaan ho. Bol na, kya poochna hai? 💪', isUser: false },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const msgRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    msgRef.current?.scrollTo({ top: msgRef.current.scrollHeight });
  }, [messages, typing]);

  function handleSend() {
    const msg = input.trim();
    if (!msg) return;
    
    setMessages(prev => [...prev, { text: msg, isUser: true }]);
    setInput('');
    setCharacterCount(0);
    setTyping(true);
    
    // Simulate typing delay
    const delay = 600 + Math.random() * 1000;
    setTimeout(() => {
      setTyping(false);
      const response = getResponse(msg);
      setMessages(prev => [...prev, { text: response, isUser: false }]);
    }, delay);
  }

  return (
    <section id="persona-demo" className="section">
      <div className="section-container">
        <div className="section-label" {...useReveal()}><span className="section-label-number">07</span><span className="section-label-line" /><span className="section-label-text">AI Demo</span></div>
        <h2 className="section-heading" {...useReveal()}>Chat with <span className="text-accent">BioWaliDidi</span></h2>
        <p className="persona-subtitle" {...useReveal()}>An AI persona trained to teach NEET biology in conversational Hinglish. Ask about mitochondria, genetics, photosynthesis, evolution — or get exam prep tips! This demonstrates my work building 8 distinct personas for NEETprep's Reddit community.</p>
        <div className="persona-chat-container" {...useReveal()}>
          <div className="persona-chat-header">
            <div className="persona-chat-avatar">BD</div>
            <div className="persona-chat-info">
              <span className="persona-chat-name">BioWaliDidi</span>
              <span className="persona-chat-status">· AI Biology Expert · Always Online</span>
            </div>
            <span className="persona-chat-badge">ACTIVE</span>
          </div>
          <div className="persona-chat-messages" ref={msgRef}>
            {messages.map((m, i) => (
              <div key={i} className={`persona-msg ${m.isUser ? 'persona-msg--user' : 'persona-msg--bot'}`}>
                <span>{m.text}</span>
              </div>
            ))}
            {typing && (
              <div className="persona-msg persona-msg--bot persona-typing">
                <span className="typing-dots">
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </span>
              </div>
            )}
          </div>
          <div className="persona-chat-input">
            <input 
              ref={inputRef}
              type="text" 
              value={input} 
              onChange={e => {
                setInput(e.target.value);
                setCharacterCount(e.target.value.length);
              }}
              onKeyDown={e => e.key === 'Enter' && handleSend()} 
              placeholder="Ask about photosynthesis, genetics, or NEET tips..." 
              autoComplete="off"
              maxLength={500}
            />
            <button 
              type="button" 
              onClick={handleSend}
              disabled={!input.trim()}
              className={!input.trim() ? 'disabled' : ''}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
