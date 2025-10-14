import { GraduationCap, TrendingUp, CheckCircle2, LineChart } from "lucide-react";

const AccreditationBenefits = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Bondades de la Acreditación
          </h2>
          <p className="text-lg text-muted-foreground">
            Acreditar una carrera o universidad no es solo cumplir un estándar; 
            es impulsar la mejora continua y la reputación institucional.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl bg-card border p-6">
            <div className="flex items-start gap-3">
              <GraduationCap className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="text-lg font-semibold">Confianza y Reconocimiento</h3>
                <p className="text-sm text-muted-foreground">
                  Mayor credibilidad ante estudiantes, padres, empleadores y entidades regulatorias. 
                  Facilita movilidad académica y convenios internacionales.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 mt-5">
              <TrendingUp className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="text-lg font-semibold">Atracción y Retención</h3>
                <p className="text-sm text-muted-foreground">
                  Mejora en matrícula, permanencia y empleabilidad gracias a programas robustos 
                  y evidencia de calidad.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-card border p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="text-lg font-semibold">Procesos y Mejora Continua</h3>
                <p className="text-sm text-muted-foreground">
                  Estandariza procedimientos, asegura ciclos de evaluación y fortalece 
                  la cultura institucional.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 mt-5">
              <LineChart className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="text-lg font-semibold">Acceso a Oportunidades</h3>
                <p className="text-sm text-muted-foreground">
                  Elegibilidad para financiamiento, proyectos, rankings y alianzas 
                  estratégicas que potencian el desarrollo académico.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mini-badges de valor */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
          <div className="rounded-lg border bg-secondary/40 py-4">
            <p className="text-sm font-semibold">Reputación</p>
            <p className="text-xs text-muted-foreground">Mejora de imagen institucional</p>
          </div>
          <div className="rounded-lg border bg-secondary/40 py-4">
            <p className="text-sm font-semibold">Calidad</p>
            <p className="text-xs text-muted-foreground">Estándares medibles y sostenibles</p>
          </div>
          <div className="rounded-lg border bg-secondary/40 py-4">
            <p className="text-sm font-semibold">Crecimiento</p>
            <p className="text-xs text-muted-foreground">Más matrícula y empleabilidad</p>
          </div>
          <div className="rounded-lg border bg-secondary/40 py-4">
            <p className="text-sm font-semibold">Oportunidades</p>
            <p className="text-xs text-muted-foreground">Convenios, fondos y rankings</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccreditationBenefits;
