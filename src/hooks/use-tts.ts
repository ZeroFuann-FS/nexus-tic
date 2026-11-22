import { useState, useCallback, useRef, useEffect } from "react";

export function useTTS() {
  const [enabled, setEnabled] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const [voiceType, setVoiceType] = useState<'male' | 'female'>('female');
  const [volume, setVolume] = useState(1);
  const [prevVolume, setPrevVolume] = useState(1);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const handleVoicesChanged = () => {
      setVoices(window.speechSynthesis.getVoices());
    };
    window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
    handleVoicesChanged(); // Also call it directly in case voices are already loaded
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = useCallback((text: string) => {
    if (!enabled || !window.speechSynthesis || voices.length === 0) return;
    window.speechSynthesis.cancel();

    const cleanText = text.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').replace(/[^\w\s.,!?¿¡áéíóúÁÉÍÓÚñÑ]/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "es-MX";
    // Velocidad y tono naturales (antes 1.7 y 1.8 sonaban acelerados y chillones)
    utterance.rate = 1.05;
    utterance.pitch = voiceType === 'male' ? 0.9 : 1.1;
    utterance.volume = volume;

    const spanishVoices = voices.filter(voice => voice.lang.startsWith('es'));
    if (spanishVoices.length > 0) {
      const selectedVoice = spanishVoices.find(voice => 
        voiceType === 'male' ? 
          voice.name.toLowerCase().includes('male') || voice.name.toLowerCase().includes('hombre') || voice.name.toLowerCase().includes('javier') || voice.name.toLowerCase().includes('carlos') || voice.name.toLowerCase().includes('pablo') || voice.name.toLowerCase().includes('diego') :
          voice.name.toLowerCase().includes('female') || voice.name.toLowerCase().includes('mujer') || voice.name.toLowerCase().includes('carmen') || voice.name.toLowerCase().includes('rosa') || voice.name.toLowerCase().includes('maría') || voice.name.toLowerCase().includes('ana') || voice.name.toLowerCase().includes('lucia') || voice.name.toLowerCase().includes('sofia')
      ) || spanishVoices[voiceType === 'male' ? 0 : 1] || spanishVoices[0];
      utterance.voice = selectedVoice;
    }

    setSpeaking(true);
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [enabled, voiceType, volume, voices]);

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
  }, []);

  const toggle = useCallback(() => {
    if (volume > 0) {
      setPrevVolume(volume);
      setVolume(0);
    } else {
      setVolume(prevVolume);
    }
  }, [volume, prevVolume]);

  useEffect(() => {
    if (volume > 0 && !enabled) {
      setEnabled(true);
    }
    if (volume === 0 && enabled) {
      setEnabled(false);
      stop();
    }
  }, [volume, enabled, stop]);

  useEffect(() => {
    return () => { window.speechSynthesis?.cancel(); };
  }, []);

  return { enabled, speaking, speak, stop, toggle, voiceType, setVoiceType, volume, setVolume };
}
