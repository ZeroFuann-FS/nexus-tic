import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const current = i18n.language;

  const toggle = () => {
    const next = current === "es" ? "en" : "es";
    i18n.changeLanguage(next);
    localStorage.setItem("nexus-lang", next);
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggle} aria-label="Change language">
      <Globe className="w-4 h-4" />
      <span className="text-xs font-bold ml-0.5">{current.toUpperCase()}</span>
    </Button>
  );
};

export default LanguageSwitcher;
