import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Volume2, VolumeX } from "lucide-react";
import {
  AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type OpcionVoz = "none" | "female" | "male";

interface Props { isOpen: boolean; onContinue: (voz: OpcionVoz) => void; onCancel: () => void }

/** Antes de empezar: con voz (femenina o masculina) o solo texto. "Sin voz" viene elegida para no sorprender con audio. */
export const VoiceSelectionModal = ({ isOpen, onContinue, onCancel }: Props) => {
  const { t } = useTranslation();
  const [voz, setVoz] = useState<OpcionVoz>("none");
  const opciones: { id: OpcionVoz; t: string; d: string; Icono: typeof Volume2 }[] = [
    { id: "none", t: t("voice.none"), d: t("voice.noneD"), Icono: VolumeX },
    { id: "female", t: t("voice.female"), d: t("voice.voiceD"), Icono: Volume2 },
    { id: "male", t: t("voice.male"), d: t("voice.voiceD"), Icono: Volume2 },
  ];
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="max-w-md rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-display text-xl">{t("voice.title")}</AlertDialogTitle>
          <AlertDialogDescription>{t("voice.description")}</AlertDialogDescription>
        </AlertDialogHeader>
        <div role="radiogroup" aria-label={t("voice.title")} className="my-2 grid gap-2">
          {opciones.map(({ id, t: titulo, d, Icono }) => (
            <button key={id} type="button" role="radio" aria-checked={voz === id} onClick={() => setVoz(id)}
              className={cn("flex items-center gap-3 rounded-xl border p-3.5 text-left transition",
                voz === id ? "border-primary bg-primary/10" : "border-border hover:border-primary/50")}>
              <Icono className={cn("h-5 w-5 shrink-0", voz === id ? "text-primary" : "text-muted-foreground")} />
              <span className="min-w-0 flex-1"><span className="block font-semibold">{titulo}</span><span className="block text-sm text-muted-foreground">{d}</span></span>
              <span className={cn("h-4 w-4 shrink-0 rounded-full border-2", voz === id ? "border-primary bg-primary shadow-[inset_0_0_0_2px_hsl(var(--card))]" : "border-border")} />
            </button>
          ))}
        </div>
        <AlertDialogFooter className="gap-2 sm:gap-0">
          <Button variant="ghost" onClick={onCancel}>{t("voice.cancel")}</Button>
          <Button size="lg" onClick={() => onContinue(voz)}>{t("voice.start")}</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
