import { GraduationCap, TrendingUp, CheckCircle2, LineChart, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AccreditationBenefits = () => {
  const items = [
    {
      icon: GraduationCap,
      title: "Confianza y reconocimiento",
      desc: "Fortalece la credibilidad ante estudiantes, empleadores y organismos. Facilita convenios y movilidad académica.",
    },
    {
      icon: TrendingUp,
      title: "Atracción y retención",
      desc: "Mejora la matrícula, permanencia y empleabilidad al demostrar consistencia, evidencia y resultados.",
    },
    {
      icon: CheckCircle2,
      title: "Procesos y mejora continua",
      desc: "Estandariza procedimientos, consolida ciclos de evaluación y fortalece la cultura institucional de calidad.",
    },
    {
      icon: LineChart,
      title: "Acceso a oportunidades",
      desc: "Aumenta elegibilidad para proyectos, alianzas, fondos y posicionamiento institucional.",
    },
  ];

  const mini = [
    { k: "Reputación", v: "Imagen institucional sólida" },
    { k: "Calidad", v: "Estándares medibles" },
    { k: "Crecimiento", v: "Matrícula y empleabilidad" },
    { k: "Oportunidades", v: "Convenios y alianzas" },
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Badge variant="secondary" className="rounded-full px-4 py-1 text-xs">
              <Sparkles className="h-4 w-4 mr-1" />
              Valor estratégico, no solo cumplimiento
            </Badge>
          </div>

          <h2 className="text-4xl font-bold text-foreground mb-4">
            Bondades de la Acreditación
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Acreditar una carrera o institución no es únicamente cumplir un estándar:
            es consolidar la mejora continua, elevar la reputación y reforzar la confianza pública.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {items.map((it) => (
            <Card key={it.title} className="rounded-2xl hover:shadow-lg transition-all hover:-translate-y-0.5">
              <CardHeader className="pb-2">
                <div className="flex items-start gap-3">
                  <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center mt-0.5">
                    <it.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{it.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      {it.desc}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-2/3 bg-primary/50 rounded-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
          {mini.map((b) => (
            <div key={b.k} className="rounded-xl border bg-secondary/40 py-4 px-3">
              <p className="text-sm font-semibold">{b.k}</p>
              <p className="text-xs text-muted-foreground mt-1">{b.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AccreditationBenefits;
