import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, FileCheck, Users, TrendingUp, BadgeCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import servicesBg from "@/assets/services-bg.jpg";

const services = [
  {
    icon: GraduationCap,
    title: "Evaluación inicial (diagnóstico)",
    description:
      "Levantamiento de estado real: criterios, evidencias, brechas, riesgos y prioridades. Entregamos un diagnóstico accionable.",
  },
  {
    icon: FileCheck,
    title: "Gestión de evidencias y documentación",
    description:
      "Estructuramos repositorios, matrices, trazabilidad y narrativa técnica. Reducimos reprocesos y elevamos consistencia documental.",
  },
  {
    icon: Users,
    title: "Capacitación y acompañamiento",
    description:
      "Transferimos capacidades al equipo académico y administrativo: estándares, evidencias, indicadores y preparación para evaluación externa.",
  },
  {
    icon: TrendingUp,
    title: "Plan de mejora y seguimiento",
    description:
      "Roadmap, responsables, indicadores y seguimiento. Convertimos requisitos en ejecución y resultados medibles.",
  },
];

const Services = () => {
  return (
    <section
      id="servicios"
      className="py-20 px-4 bg-background relative"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), url(${servicesBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="flex justify-center mb-4">
            <Badge variant="outline" className="rounded-full px-4 py-1 text-xs">
              <BadgeCheck className="h-4 w-4 mr-1" />
              Certificados como evaluadores
            </Badge>
          </div>

          <h2 className="text-4xl font-bold text-foreground mb-4">Nuestros servicios</h2>
          <p className="text-lg text-muted-foreground">
            Acompañamiento integral en cada etapa del proceso: desde diagnóstico hasta seguimiento del plan de mejora.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card key={service.title} className="rounded-2xl hover:shadow-lg transition-all hover:-translate-y-0.5">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 max-w-4xl mx-auto rounded-2xl border bg-card p-6">
          <p className="text-sm font-semibold">Qué obtienes con nuestro acompañamiento</p>
          <ul className="mt-3 grid md:grid-cols-2 gap-2 text-sm text-muted-foreground list-disc pl-5">
            <li>Diagnóstico con brechas priorizadas y plan de trabajo.</li>
            <li>Matriz de evidencias con trazabilidad y consistencia.</li>
            <li>Indicadores y seguimiento para mejora continua.</li>
            <li>Preparación técnica para evaluación/validación externa.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Services;
