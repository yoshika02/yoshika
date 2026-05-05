'use client';
import { useEffect, useRef } from 'react';

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = ref.current;
    if (!glow) return;
    let mx = 0, my = 0, cx = 0, cy = 0;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener('mousemove', onMove);

    let raf: number;
    function animate() {
      cx += (mx - cx) * 0.08;
      cy += (my - cy) * 0.08;
      glow!.style.left = cx + 'px';
      glow!.style.top = cy + 'px';
      raf = requestAnimationFrame(animate);
    }
    animate();
    return () => { document.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);

  return <div id="cursor-glow" ref={ref} aria-hidden="true" />;
}

export function FilmGrain() {
  return <div id="film-grain" aria-hidden="true" />;
}
