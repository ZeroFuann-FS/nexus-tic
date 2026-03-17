import { motion } from "framer-motion";

interface ChatProgressBarProps {
  current: number;
  total: number;
}

const ChatProgressBar = ({ current, total }: ChatProgressBarProps) => {
  const progress = (current / total) * 100;

  return (
    <div className="px-4 pt-2 pb-3 bg-secondary/50 border-b border-border">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-semibold text-primary">Nexus AI</span>
        <span className="text-xs text-muted-foreground font-mono">
          Progreso: {current}/{total}
        </span>
      </div>
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "var(--gradient-primary)" }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default ChatProgressBar;
