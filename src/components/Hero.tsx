import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, BadgeCheck } from "lucide-react";
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
          <div className="flex justify-center gap-2 flex-wrap">
            <Badge variant="secondary" className="rounded-full px-4 py-1 text-xs">
              Ecuador • Educación Superior
            </Badge>
            <Badge variant="outline" className="rounded-full px-4 py-1 text-xs">
              <BadgeCheck className="h-4 w-4 mr-1" />
              Certificados como evaluadores
            </Badge>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
            Acreditación y calidad para carreras universitarias
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Te acompañamos en diagnóstico, evidencias, planes de mejora y preparación para evaluación externa,
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

          <div className="pt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              "Rigor técnico y enfoque evaluativo",
              "Acompañamiento práctico y documentado",
              "Resultados medibles y sostenibles",
            ].map((item) => (
              <div key={item} className="rounded-2xl border bg-card/70 backdrop-blur p-4 flex items-center justify-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="font-medium text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
