import { Button } from "@/components/ui/button";
import { BadgeCheck, Dot } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section
      className="pt-32 pb-20 px-4 relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.86)), url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-4 py-2">
            <BadgeCheck className="h-4 w-4 text-primary" />
            <p className="text-sm font-semibold">Evaluadoras certificadas</p>
            <span className="text-sm text-muted-foreground">• criterios • evidencias • mejora continua</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
            Acreditación y calidad para carreras universitarias
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Diagnóstico, gestión de evidencias, planes de mejora y preparación para evaluación externa,
            con una ruta clara y soporte continuo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
            <Button
              variant="accent"
              size="lg"
              onClick={() => document.getElementById("agenda")?.scrollIntoView({ behavior: "smooth" })}
            >
              Agendar consulta
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })}
            >
              Ver servicios
            </Button>
          </div>

          {/* Bullets elegantes (sin tarjetas) */}
          <div className="pt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {[
              "Rigor evaluativo",
              "Evidencias consistentes",
              "Indicadores y seguimiento",
              "Preparación para evaluación externa",
            ].map((t) => (
              <div key={t} className="inline-flex items-center">
                <Dot className="h-8 w-8 text-primary" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
