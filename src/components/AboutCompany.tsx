import { ArrowUpRight, BadgeCheck, FileCheck2, Target, Users } from "lucide-react";

const AboutCompany = () => {
  const pillars = [
    { icon: FileCheck2, n:"01", title:"Lectura técnica", desc:"Interpretamos criterios, estándares, indicadores y requerimientos para convertirlos en una ruta de trabajo comprensible y ejecutable." },
    { icon: Target, n:"02", title:"Gestión por resultados", desc:"Vinculamos actividades, responsables, plazos, evidencias e indicadores para sostener el proceso con trazabilidad." },
    { icon: Users, n:"03", title:"Capacidad institucional", desc:"Trabajamos junto al equipo académico y administrativo para fortalecer capacidades que permanezcan después del acompañamiento." },
  ];
  return <section id="nosotros" className="relative overflow-hidden bg-[#f6f3ec] px-4 py-24 md:py-32">
    <div className="absolute right-0 top-0 h-full w-1/3 bg-[linear-gradient(135deg,transparent_0%,rgba(15,23,42,.035)_100%)]" />
    <div className="container relative mx-auto max-w-7xl">
      <div className="grid gap-16 lg:grid-cols-[.9fr_1.1fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs font-bold uppercase tracking-[.28em] text-amber-700">Sobre Educalidad S.A.S.</p>
          <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-.035em] text-slate-950 md:text-6xl">La acreditación se construye con método, evidencia y decisiones oportunas.</h2>
          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">Acompañamos a instituciones de educación superior en procesos de calidad, autoevaluación, acreditación y mejora continua. Combinamos criterio técnico, organización documental y herramientas de gestión para convertir requerimientos complejos en acciones concretas.</p>
          <div className="mt-9 inline-flex items-center gap-3 border-b border-slate-900 pb-2 text-sm font-semibold text-slate-900"><BadgeCheck className="h-5 w-5 text-amber-700"/> Equipo con experiencia evaluativa <ArrowUpRight className="h-4 w-4"/></div>
        </div>
        <div className="border-t border-slate-300">
          {pillars.map((p)=><div key={p.title} className="group grid gap-4 border-b border-slate-300 py-8 sm:grid-cols-[70px_1fr_44px] sm:items-start md:py-10">
            <span className="text-sm font-semibold text-amber-700">{p.n}</span>
            <div><div className="flex items-center gap-3"><p.icon className="h-5 w-5 text-slate-900"/><h3 className="text-2xl font-semibold tracking-tight text-slate-950">{p.title}</h3></div><p className="mt-3 max-w-2xl leading-7 text-slate-600">{p.desc}</p></div>
            <ArrowUpRight className="hidden h-5 w-5 text-slate-400 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-amber-700 sm:block"/>
          </div>)}
          <div className="mt-10 bg-slate-950 p-8 text-white md:p-10"><p className="text-xs font-bold uppercase tracking-[.22em] text-amber-300">Principio de trabajo</p><p className="mt-4 text-2xl font-medium leading-9">Cada evidencia debe responder a un requerimiento, cada actividad debe tener un propósito y cada avance debe poder verificarse.</p></div>
        </div>
      </div>
    </div>
  </section>;
};
export default AboutCompany;
