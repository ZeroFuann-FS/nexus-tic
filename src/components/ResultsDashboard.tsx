import { motion } from "framer-motion";
import { MapPin, ArrowLeft, Trophy, Zap, Building2, Download, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { companies, calculateMatch } from "@/data/companies";
import type { UserProfile } from "./ChatBot";
import jsPDF from "jspdf";

interface ResultsDashboardProps {
  profile: UserProfile;
  onRestart: () => void;
}

const ResultsDashboard = ({ profile, onRestart }: ResultsDashboardProps) => {
  const { t } = useTranslation();
  const results = companies
    .map((company) => ({
      ...company,
      match: calculateMatch(company, profile.area, profile.technologies, profile.modality),
    }))
    .filter((c) => c.match > 0)
    .sort((a, b) => b.match - a.match);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 20;

    doc.setFontSize(22);
    doc.setTextColor(39, 110, 241);
    doc.text("Nexus-TIC", pageWidth / 2, y, { align: "center" });
    y += 8;
    doc.setFontSize(11);
    doc.setTextColor(120, 120, 120);
    doc.text("Ficha de Diagnóstico de Perfil Profesional", pageWidth / 2, y, { align: "center" });
    y += 14;

    doc.setDrawColor(39, 110, 241);
    doc.setLineWidth(0.5);
    doc.line(20, y, pageWidth - 20, y);
    y += 10;

    doc.setFontSize(14);
    doc.setTextColor(9, 9, 26);
    doc.text("Datos del Estudiante", 20, y);
    y += 8;

    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    doc.text(`Nombre: ${profile.name}`, 20, y); y += 6;
    doc.text(`Área de interés: ${profile.area}`, 20, y); y += 6;
    doc.text(`Modalidad preferida: ${profile.modality}`, 20, y); y += 6;
    doc.text(`Tecnologías: ${profile.technologies.join(", ")}`, 20, y, { maxWidth: pageWidth - 40 });
    y += Math.ceil(profile.technologies.join(", ").length / 60) * 6 + 10;

    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(20, y, pageWidth - 20, y);
    y += 10;

    doc.setFontSize(14);
    doc.setTextColor(9, 9, 26);
    doc.text(`Empresas Recomendadas (${results.length})`, 20, y);
    y += 10;

    results.forEach((company, index) => {
      if (y > 250) { doc.addPage(); y = 20; }

      doc.setFillColor(245, 245, 245);
      doc.roundedRect(18, y - 4, pageWidth - 36, 36, 3, 3, "F");

      doc.setFontSize(12);
      doc.setTextColor(9, 9, 26);
      doc.text(`${index + 1}. ${company.name}`, 24, y + 4);

      doc.setFontSize(10);
      doc.setTextColor(39, 110, 241);
      doc.text(`${company.match}% ${t("results.compatibility")}`, pageWidth - 24, y + 4, { align: "right" });

      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text(`Ubicación: ${company.location}`, 24, y + 12);
      doc.text(`Modalidad: ${company.modality.join(", ")}`, 24, y + 18);

      const matchedTechs = company.technologies.filter((tech) =>
        profile.technologies.some((pt) => pt.toLowerCase() === tech.toLowerCase())
      );
      if (matchedTechs.length > 0) {
        doc.setTextColor(34, 139, 34);
        doc.text(`Tecnologías en común: ${matchedTechs.join(", ")}`, 24, y + 24, { maxWidth: pageWidth - 52 });
      }

      y += 42;
    });

    y += 6;
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Generado por Nexus-TIC · ${new Date().toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" })}`,
      pageWidth / 2, y, { align: "center" }
    );

    doc.save(`Nexus-TIC_${profile.name.replace(/\s+/g, "_")}.pdf`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-secondary/30 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-4">
          <Button variant="ghost" size="sm" onClick={onRestart}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            {t("results.newDiagnostic")}
          </Button>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-foreground">
                {t("results.companiesFound", { count: results.length })}
              </span>
            </div>
            <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
              <Download className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">{t("results.downloadPDF")}</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6 mb-8"
        >
          <div>
            <h1 className="text-xl font-bold text-foreground mb-1">
              {t("results.resultsFor")} <span className="gradient-text">{profile.name}</span>
            </h1>
            <p className="text-sm text-muted-foreground mb-4">
              {t("results.area", { area: profile.area, modality: profile.modality })}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.technologies.map((tech) => (
              <span key={tech} className="text-xs bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1 font-medium">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {results.map((company, index) => (
            <Link key={company.id} to={`/empresas/${company.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-5 group cursor-pointer h-full transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{company.logo}</div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {company.name}
                        </h3>
                        <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />{company.location}
                      </div>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm font-bold ${
                    company.match >= 70 ? "bg-accent/15 text-accent"
                    : company.match >= 40 ? "bg-primary/15 text-primary"
                    : "bg-muted text-muted-foreground"
                  }`}>
                    <Zap className="w-3 h-3" />{company.match}%
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{company.description}</p>

                <div className="flex flex-wrap gap-1.5">
                  {company.technologies.map((tech) => {
                    const isMatch = profile.technologies.some((t) => t.toLowerCase() === tech.toLowerCase());
                    return (
                      <span key={tech} className={`text-xs rounded-full px-2.5 py-0.5 font-medium ${
                        isMatch ? "bg-accent/15 text-accent border border-accent/30" : "bg-muted/60 text-muted-foreground"
                      }`}>
                        {tech}
                      </span>
                    );
                  })}
                </div>

                <div className="mt-4 flex items-center gap-1 text-xs text-muted-foreground">
                  <Building2 className="w-3 h-3" />{company.modality.join(" · ")}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {results.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-4">{t("results.noMatch")}</p>
            <Button variant="hero" onClick={onRestart}>{t("results.restart")}</Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ResultsDashboard;
