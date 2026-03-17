import { motion } from "framer-motion";

const AudioIndicator = ({ active }: { active: boolean }) => {
  if (!active) return null;

  return (
    <div className="flex items-center gap-0.5 ml-2" aria-label="Speaking">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="w-0.5 bg-primary rounded-full"
          animate={{
            height: [4, 12, 6, 14, 4],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.12,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default AudioIndicator;
