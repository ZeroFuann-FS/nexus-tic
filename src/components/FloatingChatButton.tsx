import { Link } from "react-router-dom";
import { Bot } from "lucide-react";
import { motion } from "framer-motion";

const FloatingChatButton = () => {
  return (
    <Link to="/diagnostico">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg glow-primary hover:scale-110 transition-transform cursor-pointer"
        title="Iniciar diagnóstico con Nexus AI"
      >
        <Bot className="w-6 h-6" />
      </motion.div>
    </Link>
  );
};

export default FloatingChatButton;
