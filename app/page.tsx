import GridBackground from './components/GridBackground';
import { CursorGlow, FilmGrain } from './components/Overlays';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Leadership from './components/Leadership';
import LiveMetrics from './components/LiveMetrics';
import PersonaChat from './components/PersonaChat';
import Contact from './components/Contact';

export default function Home() {
  return (
    <>
      <CursorGlow />
      <FilmGrain />
      <GridBackground />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Leadership />
      <LiveMetrics />
      <PersonaChat />
      <Contact />
    </>
  );
}
