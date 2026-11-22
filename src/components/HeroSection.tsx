import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BrainNetwork from "./BrainNetwork";

/** Una tarjeta de resultado real (misma forma que en el diagnóstico) para mostrar qué obtienes. */
function VistaPrevia() {
  const { t } = useTranslation();
  const reducir = useReducedMotion();
  const filas = [
    { ini: "CS", nombre: "CyberShield MX", lugar: "Monterrey, NL", pct: 86, comun: ["Python", "Linux", "Docker"] },
    { ini: "DN", nombre: "DataNova AI", lugar: "Guadalajara, JAL", pct: 64, comun: ["Python", "SQL"] },
    { ini: "CN", nombre: "CloudNet Solutions", lugar: "Querétaro, QRO", pct: 41, comun: ["Linux"] },
  ];
  return (
    <div className="min-w-0 rounded-2xl border border-border bg-card p-4 sm:p-5">
      <p className="text-sm font-semibold">{t("hero.demoTitle")}</p>
      <ul className="mt-3 divide-y divide-border">
        {filas.map((f, i) => (
          <li key={f.nombre} className="flex items-center gap-3 py-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-secondary font-display text-sm font-bold text-primary">{f.ini}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">{f.nombre}</p>
              <p className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" />{f.lugar}</p>
              <p className="mt-1 truncate text-xs text-muted-foreground">{t("hero.demoCommon")}: <span className="text-foreground">{f.comun.join(", ")}</span></p>
            </div>
            <div className="w-16 shrink-0 text-right">
              <p className="num font-display text-xl font-bold">{f.pct}%</p>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-secondary">
                <motion.div className="h-full rounded-full bg-primary" initial={{ width: reducir ? `${f.pct}%` : 0 }} animate={{ width: `${f.pct}%` }}
                  transition={{ delay: 0.4 + i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }} />
              </div>
              <p className="mt-0.5 text-[11px] text-muted-foreground">{t("hero.demoMatch")}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-muted-foreground">{t("hero.sample")}</p>
    </div>
  );
}

const HeroSection = ({ onStart }: { onStart: () => void }) => {
  const { t } = useTranslation();
  const pasos = [1, 2, 3].map((n) => ({ n, t: t(`hero.step${n}`), d: t(`hero.step${n}d`) }));
  return (
    <>
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 pb-16 pt-10 sm:pt-16 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:pt-20">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <BrainNetwork size={84} className="-ml-2" />
            <p className="text-sm font-medium text-muted-foreground">{t("hero.label")}</p>
          </div>
          <h1 className="mt-4 font-display text-[clamp(2.2rem,5.4vw,3.6rem)] font-extrabold leading-[1.05]">{t("hero.title")}</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">{t("hero.description")}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <button onClick={onStart}
              className="group inline-flex items-center gap-2.5 rounded-xl bg-primary px-7 py-4 text-base font-semibold text-primary-foreground transition hover:brightness-110 active:scale-[0.97]">
              {t("hero.cta")} <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </button>
            <Link to="/empresas" className="text-[15px] font-semibold underline decoration-border decoration-2 underline-offset-[6px] transition hover:decoration-primary">
              {t("hero.secondary")}
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">{t("hero.time")}</p>
        </div>
        <VistaPrevia />
      </section>

      <section className="border-t border-border bg-card/50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">{t("hero.how")}</h2>
          <ol className="mt-8 grid gap-8 sm:grid-cols-3">
            {pasos.map((p) => (
              <li key={p.n} className="flex gap-4">
                <span className="num grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-primary font-display text-sm font-bold text-primary">{p.n}</span>
                <div>
                  <h3 className="font-semibold">{p.t}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
