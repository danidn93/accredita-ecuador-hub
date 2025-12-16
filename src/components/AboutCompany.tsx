import { BadgeCheck, ShieldCheck, Target, Users } from "lucide-react";

const AboutCompany = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "Experiencia comprobada",
      desc: "Trayectoria en autoevaluación, planes de mejora y auditorías internas, alineada a criterios y marcos aplicables en educación superior.",
    },
    {
      icon: Target,
      title: "Metodología por resultados",
      desc: "Ruta de trabajo clara, indicadores y seguimiento. Traducimos requisitos en acciones medibles y sostenibles.",
    },
    {
      icon: Users,
      title: "Trabajo colaborativo",
      desc: "Co-creación con tu equipo académico y administrativo para fortalecer capacidades internas y sostener la calidad en el tiempo.",
    },
  ];

  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* Columna narrativa */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-4 py-2">
              <BadgeCheck className="h-4 w-4 text-primary" />
              <p className="text-sm font-semibold">Evaluadoras certificadas</p>
              <span className="text-sm text-muted-foreground">• Rigor evaluativo • Evidencia trazable</span>
            </div>

            <h2 className="text-4xl font-bold text-foreground">
              Sobre Educalidad S.A.S.
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Acompañamos a instituciones de educación superior en procesos de calidad, acreditación y mejora continua.
              Nuestro enfoque combina lectura técnica de criterios, consistencia de evidencias y una metodología práctica
              orientada a resultados verificables.
            </p>

            <div className="rounded-2xl border bg-background/70 p-5">
              <p className="text-sm font-semibold text-foreground">Enfoque con credencial evaluativa</p>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                Contamos con <span className="font-medium text-foreground">evaluadoras certificadas</span>, lo que fortalece
                la interpretación de criterios, la coherencia documental y la preparación para procesos de evaluación/validación externa.
              </p>
            </div>
          </div>

          {/* Columna “rail” (sin cards) */}
          <div className="relative">            
            <div className="space-y-8">
              {pillars.map((p) => (
                <div key={p.title} className="flex gap-4">
                  <div className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full border bg-background">
                    <p.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="pt-0.5">
                    <h3 className="text-lg font-semibold text-foreground">{p.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 border-t pt-6 text-sm text-muted-foreground">
              En cada intervención priorizamos: trazabilidad de evidencias, consistencia narrativa y control de riesgos.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCompany;
