'use client';
import { useEffect, useRef } from 'react';

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = document.documentElement.scrollHeight;
      draw();
    }

    function draw() {
      const w = canvas!.width;
      const h = canvas!.height;
      ctx!.clearRect(0, 0, w, h);
      const cellSize = 48;
      const cols = Math.ceil(w / cellSize);
      const rows = Math.ceil(h / cellSize);

      for (let r = 0; r < rows; r++) {
        const y = r * cellSize;
        const rowCenter = y / h;
        const viewCenter = (window.scrollY + window.innerHeight / 2) / h;
        const dist = Math.abs(rowCenter - viewCenter);
        const intensity = Math.max(0, 1 - dist * 3);
        const baseAlpha = 0.02 + intensity * 0.06;

        ctx!.strokeStyle = `rgba(181,255,0,${baseAlpha})`;
        ctx!.lineWidth = intensity > 0.3 ? 0.6 : 0.3;
        ctx!.beginPath();
        ctx!.moveTo(0, y);
        ctx!.lineTo(w, y);
        ctx!.stroke();

        if (intensity > 0.2) {
          for (let c = 0; c < cols; c++) {
            const x = c * cellSize;
            ctx!.fillStyle = `rgba(181,255,0,${baseAlpha * 1.5})`;
            ctx!.fillRect(x - 1, y - 1, 2, 2);
          }
        }
      }

      for (let c = 0; c <= cols; c++) {
        const x = c * cellSize;
        ctx!.strokeStyle = `rgba(181,255,0,0.025)`;
        ctx!.lineWidth = 0.3;
        ctx!.beginPath();
        ctx!.moveTo(x, 0);
        ctx!.lineTo(x, h);
        ctx!.stroke();
      }

      const beamY = window.scrollY + window.innerHeight * 0.5;
      const grad = ctx!.createLinearGradient(0, beamY - 80, 0, beamY + 80);
      grad.addColorStop(0, 'rgba(181,255,0,0)');
      grad.addColorStop(0.5, 'rgba(181,255,0,0.08)');
      grad.addColorStop(1, 'rgba(181,255,0,0)');
      ctx!.fillStyle = grad;
      ctx!.fillRect(0, beamY - 80, w, 160);
    }

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', draw, { passive: true });
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', draw);
    };
  }, []);

  return <canvas id="grid-bg" ref={canvasRef} aria-hidden="true" />;
}
