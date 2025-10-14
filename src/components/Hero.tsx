import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-secondary via-background to-background">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
            Acreditación de Carreras Universitarias en Ecuador
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Asesoramiento experto para que tu universidad alcance los más altos estándares de calidad educativa
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              variant="accent" 
              size="lg"
              onClick={() => document.getElementById('agenda')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Agendar Consulta
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Conocer Servicios
            </Button>
          </div>

          <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              "Experiencia comprobada",
              "Acompañamiento personalizado",
              "Resultados garantizados"
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 justify-center text-primary">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
