/** Marca de Nexus-TIC: dos puntos unidos (estudiante ↔ empresa) dentro de un cuadro. */
export default function Marca({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" className={`shrink-0 ${className}`}>
      <rect width="32" height="32" rx="8" className="fill-primary" />
      <path d="M10.5 21.5 21.5 10.5" className="stroke-primary-foreground" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="10.5" cy="21.5" r="3.6" className="fill-primary-foreground" />
      <circle cx="21.5" cy="10.5" r="3.6" className="fill-primary-foreground" />
    </svg>
  );
}
