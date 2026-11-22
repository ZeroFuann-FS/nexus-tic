import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatBot, { type UserProfile } from "@/components/ChatBot";
import ResultsDashboard from "@/components/ResultsDashboard";
import { VoiceSelectionModal, type OpcionVoz } from "@/components/VoiceSelectionModal";
import { useTTS } from "@/hooks/use-tts";

const STORAGE_KEY = "nexus-tic-profile";

const Diagnostic = () => {
  const navigate = useNavigate();
  const tts = useTTS();
  const [showModal, setShowModal] = useState(true);
  const [renderChatBot, setRenderChatBot] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (profile) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    }
  }, [profile]);

  const handleContinue = (voz: OpcionVoz) => {
    if (voz === "none") tts.setVolume(0);
    else { tts.setVoiceType(voz); tts.setVolume(1); }
    setShowModal(false);
    setTimeout(() => setRenderChatBot(true), 300); // Wait for animation
  };

  const handleCancel = () => {
    setShowModal(false);
    setTimeout(() => navigate("/"), 300); // Wait for animation
  };

  const handleComplete = (p: UserProfile) => setProfile(p);

  const handleRestart = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setProfile(null);
    setRenderChatBot(false);
    setShowModal(true);
  };

  if (profile) {
    return <ResultsDashboard profile={profile} onRestart={handleRestart} />;
  }

  return (
    <>
      <VoiceSelectionModal isOpen={showModal} onContinue={handleContinue} onCancel={handleCancel} />
      {renderChatBot && (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-3xl mx-auto rounded-xl shadow-2xl overflow-hidden border border-border">
            <ChatBot onComplete={handleComplete} tts={tts} />
          </div>
        </div>
      )}
    </>
  );
};

export default Diagnostic;
