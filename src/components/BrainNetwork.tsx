import { useEffect, useRef, useCallback } from "react";

// Brain outline points (normalized 0-1)
const BRAIN_POINTS = [
  [0.50, 0.08], [0.38, 0.10], [0.28, 0.15], [0.20, 0.22], [0.15, 0.32],
  [0.13, 0.42], [0.14, 0.52], [0.18, 0.60], [0.22, 0.67], [0.28, 0.73],
  [0.35, 0.78], [0.42, 0.82], [0.48, 0.85], [0.50, 0.88], [0.52, 0.85],
  [0.58, 0.82], [0.65, 0.78], [0.72, 0.73], [0.78, 0.67], [0.82, 0.60],
  [0.86, 0.52], [0.87, 0.42], [0.85, 0.32], [0.80, 0.22], [0.72, 0.15],
  [0.62, 0.10], [0.50, 0.08],
  // Internal structure
  [0.50, 0.30], [0.40, 0.35], [0.35, 0.45], [0.40, 0.55], [0.50, 0.50],
  [0.60, 0.35], [0.65, 0.45], [0.60, 0.55], [0.50, 0.65], [0.45, 0.70],
  [0.55, 0.70], [0.38, 0.50], [0.62, 0.50], [0.50, 0.42],
  // Center line
  [0.50, 0.18], [0.50, 0.75],
];

interface Particle {
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
  phase: number;
}

const BrainNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef(0);

  const initParticles = useCallback((w: number, h: number) => {
    const cx = w / 2;
    const cy = h / 2;
    const scale = Math.min(w, h) * 0.8;

    particlesRef.current = BRAIN_POINTS.map(([bx, by]) => ({
      x: cx + (Math.random() - 0.5) * w,
      y: cy + (Math.random() - 0.5) * h,
      tx: cx + (bx - 0.5) * scale,
      ty: cy + (by - 0.5) * scale,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      phase: Math.random() * Math.PI * 2,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      initParticles(rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      timeRef.current += 0.008;
      const t = timeRef.current;
      // Cycle: 0-1 assemble, 1-2 hold, 2-3 disassemble, 3-4 float
      const cycle = t % 4;
      let assembleStrength: number;

      if (cycle < 1) assembleStrength = cycle;
      else if (cycle < 2) assembleStrength = 1;
      else if (cycle < 3) assembleStrength = 1 - (cycle - 2);
      else assembleStrength = 0;

      const particles = particlesRef.current;

      // Update positions
      for (const p of particles) {
        const drift = Math.sin(t * 2 + p.phase) * 1.5;
        p.x += (p.tx - p.x) * assembleStrength * 0.03 + p.vx + drift * (1 - assembleStrength) * 0.3;
        p.y += (p.ty - p.y) * assembleStrength * 0.03 + p.vy + Math.cos(t * 1.5 + p.phase) * (1 - assembleStrength) * 0.3;

        // Boundary bounce
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        p.x = Math.max(0, Math.min(w, p.x));
        p.y = Math.max(0, Math.min(h, p.y));
      }

      // Draw connections
      const maxDist = 80 + assembleStrength * 60;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * (0.15 + assembleStrength * 0.35);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(39, 110, 241, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const p of particles) {
        const glow = 3 + assembleStrength * 4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5 + assembleStrength * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(39, 110, 241, ${0.6 + assembleStrength * 0.4})`;
        ctx.shadowBlur = glow;
        ctx.shadowColor = "#276EF1";
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
      aria-label="Animated brain network visualization"
    />
  );
};

export default BrainNetwork;
