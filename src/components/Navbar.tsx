import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ArrowUpRight, Menu } from "lucide-react";
import logoLight from "@/assets/logo-educalidad.svg";
import logoDark from "@/assets/logo-educalidad-dark.svg";

const nav = [
  ["#servicios", "Servicios"],
  ["#nosotros", "Nosotros"],
  ["#equipo", "Equipo"],
  ["#proceso", "Proceso"],
  ["#contacto", "Contacto"],
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-slate-200 bg-white/95 text-slate-950 shadow-sm backdrop-blur-xl" : "bg-slate-950/70 text-white backdrop-blur-md"}`}>
      <div className="container mx-auto flex h-[82px] max-w-7xl items-center justify-between px-4 sm:h-[90px] sm:px-6 lg:h-[96px]">
        <a href="#" className="flex h-full items-center" aria-label="Educalidad S.A.S. - Inicio">
          <img
            src={scrolled ? logoLight : logoDark}
            alt="Educalidad S.A.S."
            className="h-[64px] w-auto object-contain sm:h-[72px] lg:h-[78px]"
          />
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {nav.map(([href, label]) => (
            <a key={href} href={href} className="text-sm font-medium transition-colors hover:text-amber-500">
              {label}
            </a>
          ))}
          <Button
            className={`h-11 rounded-none px-5 font-semibold ${scrolled ? "bg-slate-950 text-white hover:bg-slate-800" : "bg-amber-300 text-slate-950 hover:bg-amber-200"}`}
            onClick={() => document.getElementById("agenda")?.scrollIntoView({ behavior: "smooth" })}
          >
            Agendar cita <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className={`lg:hidden ${!scrolled ? "border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white" : ""}`} aria-label="Abrir menú">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[86vw] max-w-sm border-l-white/10 bg-slate-950 text-white">
            <div className="mt-8 border-b border-white/10 pb-7">
              <img src={logoDark} alt="Educalidad S.A.S." className="h-20 w-auto" />
            </div>
            <div className="mt-5 space-y-1">
              {nav.map(([href, label], index) => (
                <a key={href} href={href} className="flex items-center justify-between border-b border-white/10 py-5 text-xl">
                  <span>{label}</span><span className="text-xs text-amber-300">0{index + 1}</span>
                </a>
              ))}
              <Button className="mt-8 h-12 w-full rounded-none bg-amber-300 text-slate-950 hover:bg-amber-200" onClick={() => document.getElementById("agenda")?.scrollIntoView({ behavior: "smooth" })}>
                Agendar cita
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
