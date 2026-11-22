/** Iniciales de la empresa en un cuadro (en lugar de emojis como logotipo). */
export default function Monograma({ nombre, size = 40 }: { nombre: string; size?: number }) {
  const ini = nombre.split(/\s+/).filter((w) => /^[A-ZÁÉÍÓÚÑ]/.test(w)).slice(0, 2).map((w) => w[0]).join("") || nombre.slice(0, 2);
  return (
    <span aria-hidden="true" className="grid shrink-0 place-items-center rounded-lg bg-secondary font-display font-bold text-primary"
      style={{ width: size, height: size, fontSize: size * 0.36 }}>
      {ini.toUpperCase()}
    </span>
  );
}
