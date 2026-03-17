import { motion } from "framer-motion";
import { ArrowRight, Cpu, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import BrainNetwork from "./BrainNetwork";

interface HeroSectionProps {
  onStart: () => void;
}

const HeroSection = ({ onStart }: HeroSectionProps) => {
  const { t } = useTranslation();

  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row items-center justify-center px-6 py-16 relative overflow-hidden"
      style={{ background: "var(--gradient-dark)" }}
    >
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />

      {/* Left — Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-xl lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-secondary border border-border rounded-full px-4 py-2 mb-6"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground font-medium">{t("hero.badge")}</span>
        </motion.div>

        {/* Title with neon glow */}
        <motion.h1
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight mb-3 neon-title"
        >
          <span className="gradient-text">{t("hero.title1")}</span>
          <span className="text-foreground">{t("hero.title2")}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex items-center justify-center lg:justify-start gap-2 text-muted-foreground mb-8"
        >
          <Cpu className="w-4 h-4 text-primary" />
          <span className="text-sm font-mono">{t("hero.subtitle")}</span>
        </motion.div>

        {/* Description — appears after brain */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.7 }}
          className="text-base sm:text-lg text-muted-foreground mb-10 max-w-md mx-auto lg:mx-0 leading-relaxed"
        >
          {t("hero.description")}
        </motion.p>

        {/* CTA with neon border */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.5 }}
        >
          <motion.button
            onClick={onStart}
            className="neon-button group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-bold text-primary-foreground bg-primary overflow-hidden transition-all duration-300"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Shimmer effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10 flex items-center gap-2">
              {t("hero.cta")}
              <ArrowRight className="w-5 h-5" />
            </span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Right — Brain Network */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="relative z-10 w-80 h-80 sm:w-96 sm:h-96 lg:w-[28rem] lg:h-[28rem]"
      >
        <BrainNetwork />
      </motion.div>
    </div>
  );
};

export default HeroSection;
