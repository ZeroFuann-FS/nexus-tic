import { useState, useCallback, useRef, useEffect } from "react";

const sintesis = () => (typeof window !== "undefined" && "speechSynthesis" in window ? window.speechSynthesis : null);

/** Elige una voz en español: primero de México, luego Latinoamérica/EE. UU., luego cualquiera en español. */
function elegirVoz(tipo: "male" | "female"): SpeechSynthesisVoice | undefined {
  const s = sintesis();
  if (!s) return undefined;
  const espanol = s.getVoices().filter((v) => v.lang.toLowerCase().startsWith("es"));
  if (!espanol.length) return undefined;
  const pista = tipo === "male"
    ? /male|hombre|masculin|jorge|juan|diego|carlos|pablo|javier|raul|enrique|miguel/i
    : /female|mujer|femenin|paulina|monica|sabina|carmen|rosa|maria|ana|lucia|sofia|helena|laura|elvira/i;
  const porRegion = (v: SpeechSynthesisVoice) => (/es[-_]mx/i.test(v.lang) ? 0 : /es[-_](us|419)/i.test(v.lang) ? 1 : 2);
  const orden = [...espanol].sort((a, b) => porRegion(a) - porRegion(b));
  return orden.find((v) => pista.test(v.name)) ?? orden[tipo === "male" ? Math.min(1, orden.length - 1) : 0];
}

export function useTTS() {
  const [enabled, setEnabled] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const [voiceType, setVoiceType] = useState<"male" | "female">("female");
  const [volume, setVolume] = useState(1);
  const [prevVolume, setPrevVolume] = useState(1);
  /** false si el navegador no tiene ninguna voz en español instalada (se avisa en el chat). */
  const [disponible, setDisponible] = useState(true);
  const seguro = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const s = sintesis();
    if (!s) { setDisponible(false); return; }
    const revisar = () => setDisponible(s.getVoices().some((v) => v.lang.toLowerCase().startsWith("es")) || s.getVoices().length === 0);
    s.addEventListener?.("voiceschanged", revisar);
    revisar();
    // Si a los 2 s sigue sin voces en español, se avisa (en Linux hay navegadores que no traen ninguna)
    const t = setTimeout(() => setDisponible(s.getVoices().some((v) => v.lang.toLowerCase().startsWith("es"))), 2000);
    return () => { s.removeEventListener?.("voiceschanged", revisar); clearTimeout(t); };
  }, []);

  /** Se llama dentro del toque del botón: iOS y algunos navegadores solo dejan hablar si la primera vez viene de un toque. */
  const desbloquear = useCallback(() => {
    const s = sintesis();
    if (!s) return;
    try {
      s.cancel();
      s.resume();
      const u = new SpeechSynthesisUtterance(" ");
      u.volume = 0;
      s.speak(u);
    } catch { /* sin voz */ }
  }, []);

  const speak = useCallback((text: string) => {
    const s = sintesis();
    if (!enabled || !s) return;
    s.cancel();
    const limpio = text
      .replace(/[\p{Extended_Pictographic}\u{FE0F}]/gu, "")
      .replace(/\*\*/g, "")
      .trim();
    if (!limpio) return;

    const u = new SpeechSynthesisUtterance(limpio);
    u.lang = "es-MX";
    u.rate = 1.05;   // velocidad natural
    u.pitch = voiceType === "male" ? 0.9 : 1.1;
    u.volume = volume;
    const voz = elegirVoz(voiceType);   // las voces se leen al momento (pueden cargar tarde)
    if (voz) u.voice = voz;

    setSpeaking(true);
    u.onstart = () => { clearTimeout(seguro.current); setSpeaking(true); };
    u.onend = () => { clearTimeout(seguro.current); setSpeaking(false); };
    u.onerror = () => { clearTimeout(seguro.current); setSpeaking(false); };
    // Si el navegador no arranca a hablar, no se queda trabado esperando
    clearTimeout(seguro.current);
    seguro.current = setTimeout(() => { if (!s.speaking) setSpeaking(false); }, 2500);
    s.speak(u);
  }, [enabled, voiceType, volume]);

  const stop = useCallback(() => {
    sintesis()?.cancel();
    clearTimeout(seguro.current);
    setSpeaking(false);
  }, []);

  const toggle = useCallback(() => {
    if (volume > 0) { setPrevVolume(volume); setVolume(0); } else setVolume(prevVolume);
  }, [volume, prevVolume]);

  useEffect(() => {
    if (volume > 0 && !enabled) setEnabled(true);
    if (volume === 0 && enabled) { setEnabled(false); stop(); }
  }, [volume, enabled, stop]);

  useEffect(() => () => { sintesis()?.cancel(); }, []);

  return { enabled, speaking, speak, stop, toggle, voiceType, setVoiceType, volume, setVolume, disponible, desbloquear };
}
