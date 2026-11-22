import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import Marca from "@/components/Marca";

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <main className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-md place-items-center px-4 text-center">
      <div>
        <Marca size={56} className="mx-auto" />
        <p className="num mt-6 font-display text-7xl font-extrabold tracking-tight">404</p>
        <h1 className="mt-3 font-display text-2xl font-bold">{t("notFound.title")}</h1>
        <p className="mt-2 text-muted-foreground">{t("notFound.text")}</p>
        <Link to="/" className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition hover:brightness-110 active:scale-[0.97]">
          {t("notFound.home")} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
