import { BadgeCheck, ClipboardList, FileText, FolderCheck, BarChart3, CheckCircle2, Users, Flag } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "1) Levantamiento y diagnóstico",
    desc: "Revisión del estado actual, alcance, cronograma y riesgos. Identificación de brechas frente a criterios y evidencias disponibles.",
  },
  {
    icon: BarChart3,
    title: "2) Planificación e indicadores",
    desc: "Definición de ruta de trabajo, responsables, hitos e indicadores. Priorización de acciones por impacto y factibilidad.",
  },
  {
    icon: FolderCheck,
    title: "3) Matriz de evidencias y trazabilidad",
    desc: "Organización de repositorios y construcción de matriz: fuente, responsable, vigencia, consistencia y soporte verificable.",
  },
  {
    icon: FileText,
    title: "4) Autoevaluación y documentación",
    desc: "Redacción/estructuración de informes, narrativas técnicas y anexos. Coherencia entre evidencia, resultados e indicadores.",
  },
  {
    icon: CheckCircle2,
    title: "5) Plan de mejora",
    desc: "Acciones correctivas y preventivas con metas, plazos, responsables y mecanismo de seguimiento para sostenibilidad.",
  },
  {
    icon: Users,
    title: "6) Preparación para evaluación externa",
    desc: "Simulación de entrevistas, verificación de evidencias críticas, consistencia del discurso institucional y control de hallazgos.",
  },
  {
    icon: Flag,
    title: "7) Acompañamiento y seguimiento",
    desc: "Soporte durante el proceso y posterior seguimiento de compromisos, indicadores y mejora continua.",
  },
];

const AccreditationProcess = () => {
  return (
    <section id="proceso" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border bg-secondary/20 px-4 py-2 mb-4">
            <BadgeCheck className="h-4 w-4 text-primary" />
            <p className="text-sm font-semibold">Evaluadoras certificadas</p>
            <span className="text-sm text-muted-foreground">• Rigor evaluativo • Evidencia trazable</span>
          </div>

          <h2 className="text-4xl font-bold text-foreground mb-4">Proceso de Acreditación</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Un proceso sólido combina criterios, evidencias y mejora continua. A continuación, los pasos típicos que guiamos
            con una metodología clara y verificable.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Línea vertical */}
          <div className="absolute left-5 top-0 bottom-40 w-px bg-border hidden sm:block" />

          <ul className="space-y-8">
            {steps.map((s, idx) => (
              <li key={s.title} className="relative pl-0 sm:pl-16">
                {/* Número */}
                <div className="hidden sm:flex absolute left-0 top-0 h-10 w-10 rounded-full border bg-background items-center justify-center">
                  <span className="text-sm font-semibold text-foreground">{idx + 1}</span>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <s.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xl font-semibold text-foreground">{s.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 border-t pt-6 text-sm text-muted-foreground">
            Nota: El orden puede ajustarse según el modelo, el alcance (carrera/institución) y los plazos. Nuestro enfoque con evaluadoras
            certificadas refuerza consistencia de criterios, control de evidencias y preparación para evaluación externa.
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccreditationProcess;
