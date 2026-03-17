import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, MapPin, Briefcase, Filter, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { companies } from "@/data/companies";
import { Button } from "@/components/ui/button";

import Navbar from "@/components/Navbar";

const ALL_AREAS = ["Dev Web", "Dev Mobile", "Ciberseguridad", "Redes", "IA"];
const ALL_MODALITIES = ["Home Office 🏠", "Presencial en la región 📍", "Híbrido 💻"];

const Companies = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedModality, setSelectedModality] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return companies.filter((c) => {
      const matchesSearch =
        !search ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase()) ||
        c.technologies.some((tech) => tech.toLowerCase().includes(search.toLowerCase()));
      const matchesArea = !selectedArea || c.area.includes(selectedArea);
      const matchesModality = !selectedModality || c.modality.includes(selectedModality);
      return matchesSearch && matchesArea && matchesModality;
    });
  }, [search, selectedArea, selectedModality]);

  const totalVacancies = filtered.reduce((sum, c) => sum + c.vacancies.length, 0);
  const hasFilters = selectedArea || selectedModality;

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-2">
            {t("companies.title")} <span className="gradient-text">{t("companies.titleHighlight")}</span>
          </h1>
          <p className="text-muted-foreground">
            {t("companies.subtitle", { count: companies.length, vacancies: companies.reduce((s, c) => s + c.vacancies.length, 0) })}
          </p>
        </motion.div>

        {/* Search & Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("companies.searchPlaceholder")}
                className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
              />
            </div>
            <Button
              variant={showFilters ? "default" : "outline"}
              size="lg"
              onClick={() => setShowFilters(!showFilters)}
              className="rounded-xl"
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline ml-1">{t("companies.filters")}</span>
            </Button>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="glass-card rounded-xl p-4 space-y-4"
            >
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">{t("companies.area")}</p>
                <div className="flex flex-wrap gap-2">
                  {ALL_AREAS.map((area) => (
                    <Button
                      key={area}
                      variant={selectedArea === area ? "chipActive" : "chip"}
                      size="chip"
                      onClick={() => setSelectedArea(selectedArea === area ? null : area)}
                    >
                      {area}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">{t("companies.modality")}</p>
                <div className="flex flex-wrap gap-2">
                  {ALL_MODALITIES.map((mod) => (
                    <Button
                      key={mod}
                      variant={selectedModality === mod ? "chipActive" : "chip"}
                      size="chip"
                      onClick={() => setSelectedModality(selectedModality === mod ? null : mod)}
                    >
                      {mod}
                    </Button>
                  ))}
                </div>
              </div>
              {hasFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => { setSelectedArea(null); setSelectedModality(null); }}
                  className="text-destructive"
                >
                  <X className="w-3 h-3 mr-1" /> {t("companies.clearFilters")}
                </Button>
              )}
            </motion.div>
          )}

          <p className="text-sm text-muted-foreground">
            {filtered.length} empresa{filtered.length !== 1 ? "s" : ""} · {totalVacancies} vacante{totalVacancies !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Grid — Glassmorphism cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((company, i) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              <Link
                to={`/empresas/${company.id}`}
                className="block glass-card rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-36 overflow-hidden">
                  <img
                    src={company.cover}
                    alt={company.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{company.logo}</span>
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {company.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {company.location}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{company.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {company.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="text-xs bg-muted/60 text-muted-foreground rounded-full px-2.5 py-0.5">
                        {tech}
                      </span>
                    ))}
                    {company.technologies.length > 4 && (
                      <span className="text-xs text-muted-foreground">+{company.technologies.length - 4}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-primary font-medium">
                    <Briefcase className="w-3 h-3" />
                    {company.vacancies.length} vacante{company.vacancies.length !== 1 ? "s" : ""} disponible{company.vacancies.length !== 1 ? "s" : ""}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-2">{t("companies.noResults")}</p>
            <p className="text-sm text-muted-foreground">{t("companies.noResultsHint")}</p>
          </div>
        )}
      </main>
    </>
  );
};

export default Companies;
