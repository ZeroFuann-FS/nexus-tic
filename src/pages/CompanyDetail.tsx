import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Mail, Briefcase, CheckCircle2, Building2, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { companies } from "@/data/companies";
import Monograma from "@/components/Monograma";
import AvisoEjemplo from "@/components/AvisoEjemplo";
import { sinEmoji } from "@/lib/utils";

const CompanyDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const company = companies.find((c) => c.id === id);

  if (!company) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground text-lg mb-4">{t("companyDetail.notFound")}</p>
        <Link to="/empresas">
          <Button variant="outline"><ArrowLeft className="w-4 h-4 mr-1" /> {t("companyDetail.backToDirectory")}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/empresas" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> {t("companyDetail.backToDirectory")}
      </Link>

      <AvisoEjemplo className="mb-5" />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl overflow-hidden mb-6 h-48 sm:h-64">
        <img src={company.cover} alt={company.name} className="w-full h-full object-cover" />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-4 mb-3">
          <Monograma nombre={company.name} size={56} />
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">{company.name}</h1>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {company.location}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {company.area.map((a) => (
            <span key={a} className="text-xs bg-primary/15 text-primary border border-primary/20 rounded-full px-3 py-1 font-medium">{a}</span>
          ))}
          {company.modality.map((m) => (
            <span key={m} className="text-xs bg-muted text-muted-foreground rounded-full px-3 py-1">{sinEmoji(m)}</span>
          ))}
        </div>
        <p className="text-foreground leading-relaxed">{company.longDescription}</p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-3 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-5">
          <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-primary" /> {t("companyDetail.technologies")}
          </h2>
          <div className="flex flex-wrap gap-2">
            {company.technologies.map((tech) => (
              <span key={tech} className="text-sm bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1">{tech}</span>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="glass-card rounded-2xl p-5">
          <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-accent" /> {t("companyDetail.benefits")}
          </h2>
          <ul className="space-y-2">
            {company.benefits.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />{b}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-5">
          <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Mail className="w-4 h-4 text-primary" /> {t("companyDetail.contact")}
          </h2>
          {/* Sin enlaces: el correo es de ejemplo y no debe abrirse ni copiarse como si fuera real */}
          <div className="space-y-1.5 text-sm">
            <p className="flex items-center gap-2 text-foreground"><Mail className="w-3.5 h-3.5 text-muted-foreground" /> {company.contact.email}</p>
            <p className="text-xs text-muted-foreground">{t("companyDetail.sampleContact")}</p>
          </div>
        </motion.div>

      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-primary" />
          {t("companyDetail.vacanciesTitle", { count: company.vacancies.length })}
        </h2>
        <div className="space-y-4">
          {company.vacancies.map((vacancy) => (
            <div key={vacancy.id} className="glass-card rounded-2xl p-5 hover:border-primary/30 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-foreground">{vacancy.title}</h3>
                <span className="flex items-center gap-1 text-xs text-muted-foreground bg-muted rounded-full px-3 py-1">
                  <Clock className="w-3 h-3" /> {vacancy.duration}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{vacancy.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {vacancy.requirements.map((req) => (
                  <span key={req} className="text-xs bg-accent/10 text-accent border border-accent/20 rounded-full px-2.5 py-0.5 font-medium">{req}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CompanyDetail;
