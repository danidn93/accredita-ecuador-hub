import { GraduationCap, FileCheck, Users, TrendingUp, BadgeCheck } from "lucide-react";
import servicesBg from "@/assets/services-bg.jpg";

const services = [
  {
    icon: GraduationCap,
    title: "Diagnóstico (evaluación inicial)",
    description:
      "Levantamiento de brechas, riesgos y prioridades. Entregamos un diagnóstico accionable con ruta de trabajo.",
  },
  {
    icon: FileCheck,
    title: "Evidencias y documentación",
    description:
      "Matrices, trazabilidad, repositorios y consistencia narrativa. Reducimos reprocesos y aumentamos robustez documental.",
  },
  {
    icon: Users,
    title: "Capacitación y acompañamiento",
    description:
      "Transferimos capacidades: criterios, evidencias, indicadores y preparación para evaluación/validación externa.",
  },
  {
    icon: TrendingUp,
    title: "Plan de mejora y seguimiento",
    description:
      "Roadmap, responsables, indicadores y control. Convertimos requisitos en ejecución y resultados medibles.",
  },
];

const Services = () => {
  return (
    <section
      id="servicios"
      className="py-20 px-4 bg-background relative"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.94), rgba(255, 255, 255, 0.94)), url(${servicesBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-4 py-2 mb-4">
            <BadgeCheck className="h-4 w-4 text-primary" />
            <p className="text-sm font-semibold">Equipo con evaluadoras certificadas</p>
          </div>

          <h2 className="text-4xl font-bold text-foreground mb-4">Nuestros servicios</h2>
          <p className="text-lg text-muted-foreground">
            Un recorrido completo, desde el diagnóstico hasta el seguimiento del plan de mejora, con enfoque técnico y ejecución práctica.
          </p>
        </div>

        <ol className="relative max-w-4xl mx-auto">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-border hidden sm:block" />

          {services.map((s, i) => (
            <li key={s.title} className="relative pl-0 sm:pl-16 py-6">
              <div className="hidden sm:flex absolute left-0 top-6 h-10 w-10 rounded-full border bg-background items-center justify-center">
                <span className="text-sm font-semibold text-foreground">{i + 1}</span>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="max-w-4xl mx-auto mt-10 border-t pt-6 text-sm text-muted-foreground">
          La certificación de nuestras evaluadoras refuerza el rigor metodológico, la consistencia de evidencias y la preparación para escenarios de evaluación externa.
        </div>
      </div>
    </section>
  );
};

export default Services;
