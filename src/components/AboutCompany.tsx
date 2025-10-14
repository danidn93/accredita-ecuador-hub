import { ShieldCheck, Target, Users } from "lucide-react";

const AboutCompany = () => {
  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Sobre Educalidad S.A.S.
          </h2>
          <p className="text-lg text-muted-foreground">
            Acompañamos a instituciones de educación superior en procesos de calidad y acreditación,
            combinando experiencia técnica, datos y una metodología práctica orientada a resultados.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-card border p-6">
            <ShieldCheck className="h-8 w-8 mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">Experiencia Comprobada</h3>
            <p className="text-sm text-muted-foreground">
              Equipo con trayectoria en autoevaluación, planes de mejora y auditorías internas, 
              alineado a marcos normativos nacionales e internacionales.
            </p>
          </div>

          <div className="rounded-xl bg-card border p-6">
            <Target className="h-8 w-8 mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">Metodología por Resultados</h3>
            <p className="text-sm text-muted-foreground">
              Roadmaps claros, indicadores clave y soporte continuo. Convertimos requisitos en
              acciones concretas y medibles.
            </p>
          </div>

          <div className="rounded-xl bg-card border p-6">
            <Users className="h-8 w-8 mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">Trabajo Colaborativo</h3>
            <p className="text-sm text-muted-foreground">
              Co-creamos con tu equipo académico y administrativo, fortaleciendo capacidades 
              internas para mantener la calidad en el tiempo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCompany;
