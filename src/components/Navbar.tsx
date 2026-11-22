import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import Marca from "./Marca";

const Navbar = () => {
  const location = useLocation();
  const [abierto, setAbierto] = useState(false);
  const { t } = useTranslation();

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/empresas", label: t("nav.companies") },
    { to: "/diagnostico", label: t("nav.diagnostic") },
  ];
  const activo = (to: string) => (to === "/" ? location.pathname === "/" : location.pathname.startsWith(to));

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight" aria-label="Nexus-TIC, inicio">
          <Marca />
          <span>Nexus<span className="text-primary">-TIC</span></span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link key={l.to} to={l.to} aria-current={activo(l.to) ? "page" : undefined}
              className={cn("rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                activo(l.to) ? "text-foreground underline decoration-primary decoration-2 underline-offset-[10px]" : "text-muted-foreground hover:text-foreground")}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setAbierto(!abierto)} aria-label="Menú" aria-expanded={abierto}>
            {abierto ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {abierto && (
        <div className="space-y-1 border-t border-border bg-background px-4 py-3 md:hidden">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setAbierto(false)} aria-current={activo(l.to) ? "page" : undefined}
              className={cn("block rounded-lg px-4 py-3 text-base font-medium", activo(l.to) ? "bg-secondary text-foreground" : "text-muted-foreground")}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
