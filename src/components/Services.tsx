import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, FileCheck, Users, TrendingUp } from "lucide-react";

const services = [
  {
    icon: GraduationCap,
    title: "Evaluación Inicial",
    description: "Diagnóstico completo del estado actual de tu programa académico y requerimientos para la acreditación."
  },
  {
    icon: FileCheck,
    title: "Preparación de Documentación",
    description: "Asesoría en la elaboración y organización de toda la documentación necesaria para el proceso."
  },
  {
    icon: Users,
    title: "Capacitación al Personal",
    description: "Formación especializada para tu equipo docente y administrativo en estándares de calidad."
  },
  {
    icon: TrendingUp,
    title: "Seguimiento Continuo",
    description: "Acompañamiento permanente durante todo el proceso hasta lograr la acreditación exitosa."
  }
];

const Services = () => {
  return (
    <section id="servicios" className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-lg text-muted-foreground">
            Ofrecemos un acompañamiento integral en cada etapa del proceso de acreditación
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
