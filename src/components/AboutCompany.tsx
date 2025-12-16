import { ShieldCheck, Target, Users, BadgeCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const AboutCompany = () => {
  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge variant="secondary" className="rounded-full px-4 py-1 text-xs">
              Aseguramiento de la calidad • Educación Superior
            </Badge>
            <Badge variant="outline" className="rounded-full px-4 py-1 text-xs">
              <BadgeCheck className="h-4 w-4 mr-1" />
              Certificados como evaluadores
            </Badge>
          </div>

          <h2 className="text-4xl font-bold text-foreground mb-4">
            Sobre Educalidad S.A.S.
          </h2>

          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Acompañamos a instituciones de educación superior en procesos de autoevaluación,
            acreditación y mejora continua. Combinamos experiencia técnica, análisis de evidencias
            y una metodología práctica orientada a resultados verificables.
          </p>

          <div className="mt-6 max-w-3xl mx-auto rounded-xl border bg-card p-5 text-left">
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-semibold">
                  Enfoque con rigor evaluativo
                </p>
                <p className="text-sm text-muted-foreground">
                  Contamos con personal <span className="font-medium text-foreground">certificado como evaluador</span>,
                  lo que fortalece la lectura de criterios, la consistencia de evidencias y la preparación
                  para visitas/validaciones externas.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="group rounded-2xl bg-card border p-6 transition-all hover:shadow-lg hover:-translate-y-0.5">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Experiencia comprobada</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Trayectoria en autoevaluación, planes de mejora y auditorías internas, alineados a marcos
              normativos y criterios de evaluación aplicables en educación superior.
            </p>
          </div>

          <div className="group rounded-2xl bg-card border p-6 transition-all hover:shadow-lg hover:-translate-y-0.5">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Metodología por resultados</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Roadmap claro, indicadores clave y soporte continuo. Convertimos requisitos en
              acciones concretas, medibles y sostenibles en el tiempo.
            </p>
          </div>

          <div className="group rounded-2xl bg-card border p-6 transition-all hover:shadow-lg hover:-translate-y-0.5">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Trabajo colaborativo</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Co-creamos con tu equipo académico y administrativo, fortaleciendo capacidades internas
              para sostener la cultura de calidad y la mejora continua.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCompany;
