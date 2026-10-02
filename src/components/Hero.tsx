import { Button } from "@/components/ui/button";
import { ArrowRight, BadgeCheck, Building2, GraduationCap, ShieldCheck } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => (
  <section className="relative min-h-[760px] overflow-hidden bg-slate-950 pt-28 text-white md:pt-32">
    <div className="absolute inset-0">
      <img src={heroBg} alt="" className="h-full w-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/95 to-slate-900/45" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_30%,rgba(201,162,74,.18),transparent_28%)]" />
    </div>
    <div className="absolute left-[7%] top-36 hidden h-44 w-px bg-gradient-to-b from-amber-300/0 via-amber-300/60 to-amber-300/0 xl:block" />

    <div className="container relative mx-auto max-w-7xl px-4 pb-20 pt-12 md:pb-28 md:pt-20">
      <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_.85fr]">
        <div className="max-w-4xl">
          <div className="mb-7 inline-flex items-center gap-3 border border-white/15 bg-white/[.06] px-4 py-2 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-amber-300" />
            <span className="text-xs font-semibold uppercase tracking-[.22em] text-slate-200">Calidad · Autoevaluación · Acreditación</span>
          </div>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-.04em] md:text-7xl">
            Soluciones para la <span className="text-amber-300">calidad</span> y la acreditación universitaria
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
            Asesoría especializada y soluciones tecnológicas para instituciones de educación superior, carreras y programas de posgrado. Acompañamos procesos de autoevaluación, mejora continua y acreditación nacional ante el CACES o internacional con agencias acreditadoras.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="h-13 rounded-none bg-amber-300 px-7 font-semibold text-slate-950 hover:bg-amber-200" onClick={() => document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })}>
              Explorar soluciones <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="h-13 rounded-none border-white/25 bg-white/5 px-7 text-white hover:bg-white/10 hover:text-white" onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}>
              Conversemos sobre su proceso
            </Button>
          </div>
          <div className="mt-12 grid max-w-3xl grid-cols-1 border-y border-white/10 sm:grid-cols-3">
            {[ [Building2,"Instituciones","Acompañamiento institucional"], [GraduationCap,"Carreras y posgrados","Procesos específicos"], [ShieldCheck,"CACES e internacional","Modelos aplicables"] ].map(([Icon,title,text]: any, i) => (
              <div key={title} className={`flex gap-3 py-5 sm:px-5 ${i ? "sm:border-l sm:border-white/10" : ""}`}>
                <Icon className="mt-1 h-5 w-5 shrink-0 text-amber-300" />
                <div><p className="text-sm font-semibold">{title}</p><p className="mt-1 text-xs leading-5 text-slate-400">{text}</p></div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="absolute -left-8 -top-8 h-32 w-32 border-l border-t border-amber-300/50" />
          <div className="relative ml-auto max-w-md border border-white/15 bg-white/[.07] p-8 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-3 border-b border-white/10 pb-6">
              <div className="flex h-12 w-12 items-center justify-center bg-amber-300 text-slate-950"><BadgeCheck className="h-6 w-6" /></div>
              <div><p className="text-xs uppercase tracking-[.18em] text-slate-400">Enfoque Educalidad</p><p className="mt-1 font-semibold">Rigor técnico y evidencia verificable</p></div>
            </div>
            <div className="space-y-6 py-7">
              {["Interpretación técnica del modelo de evaluación","Trazabilidad y consistencia de evidencias","Coordinación de responsables y entregables","Preparación para evaluación externa"].map((x,i)=><div key={x} className="flex gap-4"><span className="text-sm font-semibold tabular-nums text-amber-300">0{i+1}</span><p className="text-sm leading-6 text-slate-200">{x}</p></div>)}
            </div>
            <p className="border-t border-white/10 pt-5 text-xs leading-5 text-slate-400">Cada intervención se ajusta al modelo, alcance, etapa y necesidades reales de la institución.</p>
          </div>
          <div className="absolute -bottom-7 -right-7 h-32 w-32 border-b border-r border-amber-300/50" />
        </div>
      </div>
    </div>
  </section>
);
export default Hero;
