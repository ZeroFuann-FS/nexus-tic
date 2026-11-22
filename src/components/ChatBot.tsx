import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, ArrowLeft, Volume1, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import TypingIndicator from "./TypingIndicator";
import ChatProgressBar from "./ChatProgressBar";
import Marca from "./Marca";
import BrainNetwork from "./BrainNetwork";
import { sinEmoji } from "@/lib/utils";
import AudioIndicator from "./AudioIndicator";
import { useTTS } from "@/hooks/use-tts";
import { useSound } from "@/hooks/use-sound";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";

interface Message {
  id: string;
  role: "bot" | "user";
  content: string;
}

interface ChatBotProps {
  onComplete: (profile: UserProfile) => void;
  onBack?: () => void;
  tts: ReturnType<typeof useTTS>;
}

export interface UserProfile {
  name: string;
  area: string;
  technologies: string[];
  modality: string;
}

const AREAS = ["Dev Web", "Dev Mobile", "Ciberseguridad", "Redes", "IA"];

const INTERESTS = [
  { label: "Diseñar interfaces en Figma", area: "Dev Web" },
  { label: "Crear páginas y apps web", area: "Dev Web" },
  { label: "Trabajar con bases de datos", area: "Dev Web" },
  { label: "Desarrollar apps móviles", area: "Dev Mobile" },
  { label: "Programar con Arduino/IoT", area: "Dev Mobile" },
  { label: "Hacking ético y pentesting", area: "Ciberseguridad" },
  { label: "Proteger sistemas y datos", area: "Ciberseguridad" },
  { label: "Configurar routers y redes", area: "Redes" },
  { label: "Administrar servidores Linux", area: "Redes" },
  { label: "Infraestructura en la nube", area: "Redes" },
  { label: "Machine Learning e IA", area: "IA" },
  { label: "Analizar datos con Python", area: "IA" },
];

function detectAreaFromInterests(selected: string[]): string {
  const scores: Record<string, number> = {};
  for (const interest of selected) {
    const match = INTERESTS.find(i => i.label === interest);
    if (match) {
      scores[match.area] = (scores[match.area] || 0) + 1;
    }
  }
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return sorted.length > 0 ? sorted[0][0] : "Dev Web";
}

const TECHNOLOGIES = [
  "React", "Vue.js", "Angular", "Laravel", "Node.js",
  "Python", "Java", "TypeScript", "SQL", "Flutter",
  "React Native", "Docker", "AWS", "Linux", "Firebase",
  "TensorFlow", "C#", "Bash",
];

const MODALITIES = ["Home Office 🏠", "Presencial en la región 📍", "Híbrido 💻"];

type Step = "name" | "interests" | "area" | "tech" | "modality" | "processing";

const ChatBot = ({ onComplete, onBack, tts }: ChatBotProps) => {
  const { t } = useTranslation();
  const sound = useSound();
  const [messages, setMessages] = useState<Message[]>([]);
  const [step, setStep] = useState<Step>("name");
  const [isTyping, setIsTyping] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    area: "",
    technologies: [],
    modality: "",
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasInitialized = useRef(false);

  const isBusy = isTyping || tts.speaking;

  const stepNumber = { name: 0, interests: 1, area: 2, tech: 3, modality: 4, processing: 5 };
  const totalSteps = 5;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  const addBotMessage = useCallback((content: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: "bot",
        content,
      }]);
      setIsTyping(false);
      sound.playChime();
      tts.speak(content);
    }, 1200);
  }, [tts, sound]);

  const addUserMessage = (content: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: "user",
      content,
    }]);
    sound.playSend();
  };

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      addBotMessage(t("chat.greeting"));
    }
  }, [addBotMessage, t]);

  const handleNameSubmit = () => {
    if (!inputValue.trim()) return;
    const name = inputValue.trim();
    addUserMessage(name);
    setProfile(p => ({ ...p, name }));
    setInputValue("");
    setTimeout(() => {
      addBotMessage(t("chat.niceToMeet", { name }));
      setStep("interests");
    }, 300);
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const handleInterestsSubmit = () => {
    if (selectedInterests.length === 0) return;
    addUserMessage(selectedInterests.join(", "));
    const detectedArea = detectAreaFromInterests(selectedInterests);
    setTimeout(() => {
      addBotMessage(t("chat.areaDetected", { area: detectedArea }));
      setProfile(p => ({ ...p, area: detectedArea }));
      setStep("area");
    }, 300);
  };

  const handleAreaSelect = (area: string) => {
    addUserMessage(area === profile.area ? t("chat.areaConfirm", { area }) : area);
    setProfile(p => ({ ...p, area }));
    setTimeout(() => {
      addBotMessage(t("chat.greatChoice"));
      setStep("tech");
    }, 300);
  };

  const toggleTech = (tech: string) => {
    setSelectedTechs(prev =>
      prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
    );
  };

  const handleTechSubmit = () => {
    if (selectedTechs.length === 0) return;
    addUserMessage(selectedTechs.join(", "));
    setProfile(p => ({ ...p, technologies: selectedTechs }));
    setTimeout(() => {
      addBotMessage(t("chat.vibeQuestion"));
      setStep("modality");
    }, 300);
  };

  const handleModalitySelect = (modality: string) => {
    addUserMessage(sinEmoji(modality));
    const finalProfile = { ...profile, modality };
    setProfile(finalProfile);
    setStep("processing");
    setTimeout(() => {
      addBotMessage(t("chat.processing"));
      setTimeout(() => {
        addBotMessage(t("chat.resultsFound"));
        setTimeout(() => onComplete(finalProfile), 1500);
      }, 2000);
    }, 300);
  };

  return (
    <div className="lg:flex min-h-screen bg-background relative">

      {/* Left Column (Header & Progress) */}
      <div className="lg:w-1/3 lg:border-r border-border flex flex-col">
        <div className="border-b border-border bg-secondary/30 backdrop-blur-sm sticky top-16 z-10 lg:static">
          <div className="flex items-center gap-3 px-4 py-3">
            {onBack && (
              <Button variant="ghost" size="icon" onClick={onBack} className="lg:hidden">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
            <Marca size={36} />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-sm text-foreground">Nexus</h2>
                <AudioIndicator active={tts.speaking} />
              </div>
              <span className="text-xs text-muted-foreground">{t("chat.online")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-8 px-2 ${tts.volume > 0 ? "text-primary" : "text-muted-foreground"}`}
                    aria-label={tts.volume > 0 ? t("chat.voiceOn") : t("chat.voiceOff")}
                  >
                    {tts.volume === 0 ? <VolumeX className="w-4 h-4" /> : tts.volume < 0.5 ? <Volume1 className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-40">
                  <Slider
                    max={1}
                    step={0.1}
                    value={[tts.volume]}
                    onValueChange={(value) => tts.setVolume(value[0])}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          {tts.enabled && !tts.disponible && (
            <p role="status" className="border-t border-border px-4 py-2 text-xs text-muted-foreground">
              Tu navegador no tiene voces en español instaladas, así que el asistente no puede hablar. Puedes seguir leyendo en pantalla.
            </p>
          )}
          <ChatProgressBar current={Math.min(stepNumber[step], totalSteps)} total={totalSteps} />
        </div>
        <div className="hidden lg:block p-4 text-sm text-muted-foreground">
          <p>Responde cinco preguntas sobre tus intereses y tecnologías. Al final verás las empresas ordenadas por compatibilidad con tu perfil.</p>
        </div>
      </div>

      {/* Right Column (Chat) */}
      <div className="flex-1 flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 relative z-[1]">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "bot" && (
                  <Marca size={28} className="mt-1" />
                )}
                <div
                  className={`max-w-[80%] sm:max-w-[70%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-card text-card-foreground rounded-bl-md card-shadow"
                  }`}
                >
                  {msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-4 h-4 text-muted-foreground" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-2"
            >
              <Marca size={28} className="mt-1" />
              <TypingIndicator />
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="border-t border-border bg-secondary/30 backdrop-blur-sm p-4 relative z-[1]">
          {step === "name" && !isBusy && (
            <form
              onSubmit={(e) => { e.preventDefault(); handleNameSubmit(); }}
              className="flex gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={t("chat.namePlaceholder")}
                className="flex-1 bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                autoFocus
              />
              <Button type="submit" size="icon" className="rounded-xl h-12 w-12">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          )}

          {step === "interests" && !isBusy && (
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground">{t("chat.selectInterests", { count: selectedInterests.length })}</p>
              <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                {INTERESTS.map((interest) => (
                  <Button
                    key={interest.label}
                    variant={selectedInterests.includes(interest.label) ? "chipActive" : "chip"}
                    size="chip"
                    onClick={() => toggleInterest(interest.label)}
                  >
                    {interest.label}
                  </Button>
                ))}
              </div>
              {selectedInterests.length > 0 && (
                <Button variant="default" size="lg" onClick={handleInterestsSubmit} className="w-full">
                  {t("chat.continueWith", { count: selectedInterests.length })}
                </Button>
              )}
            </div>
          )}

          {step === "area" && !isBusy && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground mb-2">{t("chat.confirmArea")}</p>
              <div className="flex flex-wrap gap-2">
                {AREAS.map((area) => (
                  <Button
                    key={area}
                    variant={area === profile.area ? "chipActive" : "option"}
                    size="chip"
                    onClick={() => handleAreaSelect(area)}
                  >
                    {area === profile.area ? `✓ ${area}` : area}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {step === "tech" && !isBusy && (
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground">{t("chat.selectTechs", { count: selectedTechs.length })}</p>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {TECHNOLOGIES.map((tech) => (
                  <Button
                    key={tech}
                    variant={selectedTechs.includes(tech) ? "chipActive" : "chip"}
                    size="chip"
                    onClick={() => toggleTech(tech)}
                  >
                    {tech}
                  </Button>
                ))}
              </div>
              {selectedTechs.length > 0 && (
                <Button variant="default" size="lg" onClick={handleTechSubmit} className="w-full">
                  {t("chat.continueTechs", { count: selectedTechs.length })}
                </Button>
              )}
            </div>
          )}

          {step === "modality" && !isBusy && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground mb-2">{t("chat.chooseModality")}</p>
              <div className="flex flex-col gap-2">
                {MODALITIES.map((mod) => (
                  <Button
                    key={mod}
                    variant="option"
                    size="option"
                    onClick={() => handleModalitySelect(mod)}
                  >
                    {sinEmoji(mod)}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {step === "processing" && (
            <div className="flex flex-col items-center gap-1 py-1 text-sm text-muted-foreground" role="status">
              <BrainNetwork size={112} etiqueta={t("chat.analyzing")} />
              {t("chat.analyzing")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
