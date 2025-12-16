import { GraduationCap, TrendingUp, CheckCircle2, LineChart, BadgeCheck } from "lucide-react";

const AccreditationBenefits = () => {
  const benefits = [
    {
      icon: GraduationCap,
      title: "Confianza y reconocimiento",
      desc: "Incrementa credibilidad ante estudiantes, empleadores y organismos; facilita convenios, movilidad y posicionamiento institucional.",
    },
    {
      icon: TrendingUp,
      title: "Atracción y retención",
      desc: "Mejora matrícula, permanencia y empleabilidad al demostrar resultados y robustez del programa con evidencia consistente.",
    },
    {
      icon: CheckCircle2,
      title: "Procesos y mejora continua",
      desc: "Estandariza procedimientos, consolida ciclos de evaluación y fortalece la cultura institucional de calidad.",
    },
    {
      icon: LineChart,
      title: "Acceso a oportunidades",
      desc: "Aumenta elegibilidad para proyectos, alianzas, financiamiento y participación en iniciativas estratégicas.",
    },
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border bg-secondary/30 px-4 py-2 mb-4">
            <BadgeCheck className="h-4 w-4 text-primary" />
            <p className="text-sm font-semibold">Acompañamiento con evaluadoras certificadas</p>
          </div>

          <h2 className="text-4xl font-bold text-foreground mb-4">
            Bondades de la Acreditación
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Acreditar no es únicamente cumplir un estándar: es consolidar mejora continua, reputación y confianza pública,
            con evidencias claras y procesos sostenibles.
          </p>
        </div>

        <div className="rounded-2xl border overflow-hidden">
          {benefits.map((b, idx) => (
            <div
              key={b.title}
              className={`px-6 py-6 bg-background ${idx !== 0 ? "border-t" : ""}`}
            >
              <div className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <b.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-foreground">{b.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Impact strip */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { k: "Reputación", v: "Imagen institucional sólida" },
            { k: "Calidad", v: "Estándares medibles" },
            { k: "Crecimiento", v: "Matrícula y empleabilidad" },
            { k: "Oportunidades", v: "Convenios y alianzas" },
          ].map((x) => (
            <div key={x.k} className="border rounded-2xl px-5 py-4 bg-secondary/20">
              <p className="text-sm font-semibold">{x.k}</p>
              <p className="text-xs text-muted-foreground mt-1">{x.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AccreditationBenefits;
