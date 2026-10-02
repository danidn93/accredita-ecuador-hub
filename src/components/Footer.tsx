import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import logoDark from "@/assets/logo-educalidad-dark.svg";

const Footer = () => (
  <footer className="relative overflow-hidden bg-slate-950 px-4 pb-10 pt-20 text-white">
    <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-amber-300/5 blur-3xl" />
    <div className="container relative mx-auto max-w-7xl">
      <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.2fr_.8fr_.8fr]">
        <div>
          <img src={logoDark} alt="Educalidad S.A.S." className="h-28 w-auto object-contain sm:h-32" />
          <p className="mt-6 max-w-md text-sm leading-7 text-slate-400">
            Asesoría especializada y soluciones tecnológicas para procesos de calidad, autoevaluación, mejora continua y acreditación en educación superior.
          </p>
          <p className="mt-7 text-xs font-bold uppercase tracking-[.2em] text-amber-300">Calidad que se demuestra con evidencia</p>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[.2em] text-slate-400">Navegación</h3>
          <div className="mt-5 space-y-4 text-sm">
            {[["#servicios","Servicios"],["#equipo","Nuestro equipo"],["#proceso","Proceso"],["#agenda","Agendar cita"],["#contacto","Contacto"]].map(([href,label]) => (
              <a key={href} href={href} className="flex items-center gap-2 transition-colors hover:text-amber-300">{label}<ArrowUpRight className="h-3 w-3" /></a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[.2em] text-slate-400">Contacto</h3>
          <div className="mt-5 space-y-4 text-sm text-slate-300">
            <a href="mailto:infoeducalidadsas@gmail.com" className="flex gap-3 transition-colors hover:text-amber-300"><Mail className="h-4 w-4 shrink-0"/>infoeducalidadsas@gmail.com</a>
            <a href="tel:+593991234567" className="flex gap-3 transition-colors hover:text-amber-300"><Phone className="h-4 w-4 shrink-0"/>+593 99 123 4567</a>
            <p className="flex gap-3"><MapPin className="h-4 w-4 shrink-0"/>Ecuador</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 pt-8 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Educalidad S.A.S. Todos los derechos reservados.</p>
        <p>Asesoría · Tecnología · Acreditación</p>
      </div>
    </div>
  </footer>
);

export default Footer;
