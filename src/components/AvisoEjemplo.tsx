import { Info } from "lucide-react";
import { useTranslation } from "react-i18next";

/** Deja claro que las empresas son de ejemplo (para que nadie intente contactarlas). */
export default function AvisoEjemplo({ className = "" }: { className?: string }) {
  const { t } = useTranslation();
  return (
    <p role="note" className={`flex items-start gap-2.5 rounded-xl border border-border bg-secondary/60 px-4 py-3 text-sm text-muted-foreground ${className}`}>
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
      <span>{t("companies.sampleNotice")}</span>
    </p>
  );
}
