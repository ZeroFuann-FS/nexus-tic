export interface Vacancy {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  duration: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  cover: string;
  description: string;
  longDescription: string;
  area: string[];
  technologies: string[];
  modality: string[];
  location: string;
  benefits: string[];
  contact: { email: string; phone?: string; website?: string };
  social: { linkedin?: string; github?: string };
  vacancies: Vacancy[];
}

/** EMPRESAS DE EJEMPLO: nombres, contactos y vacantes son ficticios (dominios .example, sin teléfonos ni redes). */
export const companies: Company[] = [
  {
    id: "1",
    name: "CyberShield MX",
    logo: "🛡️",
    cover: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    description: "Empresa líder en soluciones de ciberseguridad para el sector financiero.",
    longDescription: "CyberShield MX es una empresa de ciberseguridad fundada en 2018 en Monterrey. Se especializa en protección de infraestructura crítica para instituciones financieras, ofreciendo auditorías de seguridad, pentesting y monitoreo continuo de amenazas. Cuentan con un equipo de más de 50 profesionales certificados.",
    area: ["Ciberseguridad", "Redes"],
    technologies: ["Python", "Linux", "AWS", "Docker"],
    modality: ["Presencial en la región 📍", "Híbrido 💻"],
    location: "Monterrey, NL",
    benefits: ["Seguro médico", "Horarios flexibles", "Capacitación continua", "Bono por certificaciones"],
    contact: { email: "rh@cybershieldmx.example" },
    social: {},
    vacancies: [
      { id: "v1", title: "Analista de Seguridad Jr.", description: "Monitoreo de SIEM y respuesta a incidentes de seguridad.", requirements: ["Python", "Linux", "Conocimientos de redes"], duration: "6 meses" },
      { id: "v2", title: "Pentester en Formación", description: "Participar en pruebas de penetración bajo supervisión del equipo ofensivo.", requirements: ["Linux", "Bash", "Fundamentos de ciberseguridad"], duration: "4 meses" },
    ],
  },
  {
    id: "2",
    name: "AppVerse Studio",
    logo: "📱",
    cover: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
    description: "Startup de desarrollo de apps móviles con enfoque en UX.",
    longDescription: "AppVerse Studio es una startup dinámica enfocada en crear experiencias móviles excepcionales. Su equipo multidisciplinario combina diseño UX/UI de vanguardia con desarrollo técnico robusto para entregar apps que destacan en los app stores.",
    area: ["Dev Mobile", "Dev Web"],
    technologies: ["React", "React Native", "TypeScript", "Firebase"],
    modality: ["Home Office 🏠", "Híbrido 💻"],
    location: "CDMX (Remoto)",
    benefits: ["100% remoto", "Equipo de trabajo proporcionado", "Viernes cortos", "Mentoría personalizada"],
    contact: { email: "join@appverse.example" },
    social: {},
    vacancies: [
      { id: "v3", title: "Desarrollador Mobile Jr.", description: "Desarrollo de nuevas funcionalidades para apps en React Native.", requirements: ["React Native", "TypeScript", "Git"], duration: "6 meses" },
    ],
  },
  {
    id: "3",
    name: "DataNova AI",
    logo: "🧠",
    cover: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    description: "Centro de investigación aplicada en inteligencia artificial y ML.",
    longDescription: "DataNova AI es un centro de investigación líder en IA aplicada. Trabajan con modelos de machine learning y deep learning para resolver problemas complejos en industrias como salud, manufactura y logística.",
    area: ["IA", "Dev Web"],
    technologies: ["Python", "TensorFlow", "SQL", "Docker"],
    modality: ["Presencial en la región 📍"],
    location: "Guadalajara, JAL",
    benefits: ["Acceso a GPU clusters", "Publicación de papers", "Conferencias internacionales", "Cafetería gratuita"],
    contact: { email: "careers@datanova.example" },
    social: {},
    vacancies: [
      { id: "v4", title: "Research Intern - NLP", description: "Investigación y desarrollo de modelos de procesamiento de lenguaje natural.", requirements: ["Python", "TensorFlow", "Estadística"], duration: "6 meses" },
      { id: "v5", title: "Data Engineer Jr.", description: "Diseño y mantenimiento de pipelines de datos para modelos de ML.", requirements: ["Python", "SQL", "Docker"], duration: "6 meses" },
    ],
  },
  {
    id: "4",
    name: "CloudNet Solutions",
    logo: "☁️",
    cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    description: "Consultora de infraestructura cloud y redes empresariales.",
    longDescription: "CloudNet Solutions provee servicios de consultoría en infraestructura cloud para empresas medianas y grandes. Especialistas en migración a la nube, arquitectura de microservicios y redes empresariales seguras.",
    area: ["Redes", "Ciberseguridad"],
    technologies: ["AWS", "Linux", "Docker", "Cisco"],
    modality: ["Híbrido 💻", "Presencial en la región 📍"],
    location: "Querétaro, QRO",
    benefits: ["Certificaciones AWS pagadas", "Home office parcial", "Seguro de gastos médicos mayores"],
    contact: { email: "talento@cloudnet.example" },
    social: {},
    vacancies: [
      { id: "v6", title: "Cloud Support Intern", description: "Soporte en migración y mantenimiento de infraestructura AWS.", requirements: ["AWS", "Linux", "Redes básicas"], duration: "4 meses" },
    ],
  },
  {
    id: "5",
    name: "PixelForge",
    logo: "🎨",
    cover: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
    description: "Agencia digital especializada en desarrollo web full-stack.",
    longDescription: "PixelForge es una agencia 100% remota que trabaja con clientes de LATAM y Estados Unidos. Se especializan en aplicaciones web modernas, e-commerce y plataformas SaaS con tecnologías de punta.",
    area: ["Dev Web"],
    technologies: ["React", "Vue.js", "Laravel", "SQL", "TypeScript"],
    modality: ["Home Office 🏠"],
    location: "100% Remoto",
    benefits: ["100% remoto global", "Horario flexible", "Budget para setup", "Clientes internacionales"],
    contact: { email: "careers@pixelforge.example" },
    social: {},
    vacancies: [
      { id: "v7", title: "Frontend Developer Intern", description: "Desarrollo de interfaces web con React y TypeScript.", requirements: ["React", "TypeScript", "CSS/Tailwind"], duration: "6 meses" },
      { id: "v8", title: "Fullstack Intern", description: "Desarrollo de APIs con Laravel y frontend con Vue.js.", requirements: ["Vue.js", "Laravel", "SQL"], duration: "6 meses" },
    ],
  },
  {
    id: "6",
    name: "MobileTech Labs",
    logo: "🔬",
    cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    description: "Laboratorio de innovación en apps móviles y IoT.",
    longDescription: "MobileTech Labs es un laboratorio de innovación que combina desarrollo móvil con Internet de las Cosas. Crean soluciones inteligentes para hogares, industrias y ciudades conectadas.",
    area: ["Dev Mobile", "IA"],
    technologies: ["Flutter", "React Native", "Python", "Firebase"],
    modality: ["Presencial en la región 📍", "Híbrido 💻"],
    location: "León, GTO",
    benefits: ["Lab de hardware", "Proyectos de investigación", "Horario flexible"],
    contact: { email: "lab@mobiletech.example" },
    social: {},
    vacancies: [
      { id: "v9", title: "Mobile Dev Intern", description: "Desarrollo de apps con Flutter para proyectos IoT.", requirements: ["Flutter", "Dart", "Firebase"], duration: "6 meses" },
    ],
  },
  {
    id: "7",
    name: "SecureOps MX",
    logo: "🔒",
    cover: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=800&q=80",
    description: "Empresa de ciberseguridad ofensiva y pentesting.",
    longDescription: "SecureOps MX se especializa en seguridad ofensiva, realizando pruebas de penetración, red teaming y auditorías de seguridad para empresas del sector privado y gobierno. Su equipo cuenta con certificaciones OSCP, CEH y CISSP.",
    area: ["Ciberseguridad"],
    technologies: ["Python", "Linux", "Kali", "Bash"],
    modality: ["Híbrido 💻"],
    location: "Puebla, PUE",
    benefits: ["Certificaciones pagadas", "CTF internos", "Mentoría de expertos"],
    contact: { email: "rh@secureops.example" },
    social: {},
    vacancies: [
      { id: "v10", title: "Pentester Trainee", description: "Entrenamiento en técnicas de pentesting y elaboración de reportes.", requirements: ["Linux", "Python", "Redes"], duration: "4 meses" },
    ],
  },
  {
    id: "8",
    name: "WebFlow Agency",
    logo: "🌐",
    cover: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    description: "Agencia de desarrollo web con clientes internacionales.",
    longDescription: "WebFlow Agency conecta talento mexicano con proyectos internacionales. Trabajan con startups y empresas de Silicon Valley, ofreciendo desarrollo web de alta calidad con metodologías ágiles.",
    area: ["Dev Web", "Dev Mobile"],
    technologies: ["React", "Node.js", "TypeScript", "SQL", "AWS"],
    modality: ["Home Office 🏠", "Híbrido 💻"],
    location: "Remoto / Tijuana, BC",
    benefits: ["Clientes de Silicon Valley", "Pago en USD", "Equipo proporcionado", "Vacaciones flexibles"],
    contact: { email: "join@webflow.example" },
    social: {},
    vacancies: [
      { id: "v11", title: "React Developer Intern", description: "Desarrollo de aplicaciones web con React y Node.js para clientes internacionales.", requirements: ["React", "TypeScript", "Node.js"], duration: "6 meses" },
      { id: "v12", title: "QA Automation Intern", description: "Creación de pruebas automatizadas para aplicaciones web.", requirements: ["TypeScript", "Testing", "Git"], duration: "4 meses" },
    ],
  },
];

export function calculateMatch(
  company: Company,
  userArea: string,
  userTechs: string[],
  userModality: string
): number {
  let score = 0;
  const areaMap: Record<string, string> = {
    "Dev Web": "Dev Web",
    "Dev Mobile": "Dev Mobile",
    "Ciberseguridad": "Ciberseguridad",
    "Redes": "Redes",
    "IA": "IA",
  };

  if (company.area.includes(areaMap[userArea] || userArea)) {
    score += 40;
  }

  const techMatches = userTechs.filter(t =>
    company.technologies.some(ct => ct.toLowerCase() === t.toLowerCase())
  ).length;
  const techScore = userTechs.length > 0
    ? (techMatches / Math.max(userTechs.length, company.technologies.length)) * 40
    : 0;
  score += techScore;

  if (company.modality.includes(userModality)) {
    score += 20;
  }

  return Math.round(Math.min(score, 100));
}
