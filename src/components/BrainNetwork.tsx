import { useEffect, useRef } from "react";

/* Animación original de Nexus-TIC: puntos sueltos que se juntan y forman un cerebro, se sostienen y se vuelven a soltar.
   Versión compacta: toma el color del tema, se pausa fuera de pantalla y queda quieta con "reducir movimiento". */

// Contorno y estructura del cerebro (coordenadas de 0 a 1)
const PUNTOS = [
  [0.50, 0.08], [0.38, 0.10], [0.28, 0.15], [0.20, 0.22], [0.15, 0.32],
  [0.13, 0.42], [0.14, 0.52], [0.18, 0.60], [0.22, 0.67], [0.28, 0.73],
  [0.35, 0.78], [0.42, 0.82], [0.48, 0.85], [0.50, 0.88], [0.52, 0.85],
  [0.58, 0.82], [0.65, 0.78], [0.72, 0.73], [0.78, 0.67], [0.82, 0.60],
  [0.86, 0.52], [0.87, 0.42], [0.85, 0.32], [0.80, 0.22], [0.72, 0.15],
  [0.62, 0.10],
  [0.50, 0.30], [0.40, 0.35], [0.35, 0.45], [0.40, 0.55], [0.50, 0.50],
  [0.60, 0.35], [0.65, 0.45], [0.60, 0.55], [0.50, 0.65], [0.45, 0.70],
  [0.55, 0.70], [0.38, 0.50], [0.62, 0.50], [0.50, 0.42],
  [0.50, 0.18], [0.50, 0.75],
];

interface Particula { x: number; y: number; tx: number; ty: number; vx: number; vy: number; fase: number }

export default function BrainNetwork({ size = 120, className = "", etiqueta = "Animación de puntos que forman un cerebro" }: { size?: number; className?: string; etiqueta?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr; canvas.height = size * dpr;
    ctx.scale(dpr, dpr);
    const k = size / 400;            // las distancias originales eran para 400 px
    const escala = size * 0.86;
    const quieto = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const color = () => getComputedStyle(document.documentElement).getPropertyValue("--primary").trim() || "221 78% 46%";

    const ps: Particula[] = PUNTOS.map(([bx, by]) => ({
      x: quieto ? size / 2 + (bx - 0.5) * escala : Math.random() * size,
      y: quieto ? size / 2 + (by - 0.5) * escala : Math.random() * size,
      tx: size / 2 + (bx - 0.5) * escala, ty: size / 2 + (by - 0.5) * escala,
      vx: (Math.random() - 0.5) * 0.5 * k * 2, vy: (Math.random() - 0.5) * 0.5 * k * 2, fase: Math.random() * Math.PI * 2,
    }));

    let t = 0, id = 0, visible = true;
    const dibujar = (fuerza: number) => {
      const c = color();
      ctx.clearRect(0, 0, size, size);
      const maxDist = (80 + fuerza * 60) * k;   // misma proporción que la original
      for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++) {
        const d = Math.hypot(ps[i].x - ps[j].x, ps[i].y - ps[j].y);
        if (d < maxDist) {
          ctx.beginPath(); ctx.moveTo(ps[i].x, ps[i].y); ctx.lineTo(ps[j].x, ps[j].y);
          ctx.strokeStyle = `hsl(${c} / ${(1 - d / maxDist) * (0.18 + fuerza * 0.4)})`;
          ctx.lineWidth = Math.max(0.5, 0.8 * k * 1.5); ctx.stroke();
        }
      }
      for (const p of ps) {
        ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(1.1, (2.5 + fuerza * 1.5) * k * 1.25), 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${c} / ${0.6 + fuerza * 0.4})`; ctx.fill();
      }
    };

    if (quieto) { dibujar(1); return; }

    const paso = () => {
      t += 0.008;
      const ciclo = t % 4;   // 0-1 se arma · 1-2 se sostiene · 2-3 se suelta · 3-4 flota
      const fuerza = ciclo < 1 ? ciclo : ciclo < 2 ? 1 : ciclo < 3 ? 3 - ciclo : 0;
      for (const p of ps) {
        p.x += (p.tx - p.x) * fuerza * 0.035 + p.vx + Math.sin(t * 2 + p.fase) * (1 - fuerza) * 0.3 * k * 2;
        p.y += (p.ty - p.y) * fuerza * 0.035 + p.vy + Math.cos(t * 1.5 + p.fase) * (1 - fuerza) * 0.3 * k * 2;
        if (p.x < 0 || p.x > size) p.vx *= -1;
        if (p.y < 0 || p.y > size) p.vy *= -1;
        p.x = Math.max(0, Math.min(size, p.x)); p.y = Math.max(0, Math.min(size, p.y));
      }
      dibujar(fuerza);
      if (visible) id = requestAnimationFrame(paso);
    };
    // Solo se anima cuando se ve (ahorra batería)
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(id);
      if (visible) id = requestAnimationFrame(paso);
    });
    io.observe(canvas);
    return () => { io.disconnect(); cancelAnimationFrame(id); };
  }, [size]);

  return <canvas ref={ref} role="img" aria-label={etiqueta} className={`block ${className}`} style={{ width: size, height: size }} />;
}
