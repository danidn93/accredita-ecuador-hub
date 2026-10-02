import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2, FolderKanban, CalendarDays, Clock3, HelpCircle, LogOut, Menu, X, ArrowUpRight } from "lucide-react";
import AvailabilityManager from "@/components/admin/AvailabilityManager";
import FAQManager from "@/components/admin/FAQManager";
import AppointmentsList from "@/components/admin/AppointmentsList";
import InstitutionsManager from "@/components/admin/InstitutionsManager";
import DocumentRepository from "@/components/admin/DocumentRepository";
import { toast } from "sonner";
import logoDark from "@/assets/logo-educalidad-dark.svg";

const items = [
  { id: "institutions", label: "Instituciones", icon: Building2, description: "Instituciones y unidades con las que trabaja Educalidad." },
  { id: "repository", label: "Repositorio", icon: FolderKanban, description: "Evidencias, documentos, carpetas y subcarpetas por institución." },
  { id: "availability", label: "Disponibilidad", icon: CalendarDays, description: "Horarios disponibles para las citas virtuales." },
  { id: "appointments", label: "Citas", icon: Clock3, description: "Solicitudes y agenda de acompañamiento." },
  { id: "faqs", label: "Preguntas frecuentes", icon: HelpCircle, description: "Contenido de preguntas frecuentes del sitio público." },
];

export default function Admin() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("institutions");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("adminAuth")) navigate("/admin-login");
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("adminAuth");
    toast.success("Sesión cerrada");
    navigate("/admin-login");
  };

  const active = items.find((item) => item.id === tab) ?? items[0];
  const ActiveIcon = active.icon;

  return (
    <div className="min-h-screen bg-[#f5f4ef] text-slate-950">
      {mobileOpen && <button className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Cerrar menú" />}

      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[290px] flex-col bg-slate-950 text-white shadow-2xl transition-transform duration-300 lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex min-h-28 items-center justify-between border-b border-white/10 px-6">
          <img src={logoDark} alt="Educalidad S.A.S." className="h-[82px] w-auto" />
          <button className="text-white/70 hover:text-white lg:hidden" onClick={() => setMobileOpen(false)}><X className="h-5 w-5" /></button>
        </div>
        <div className="px-6 pb-3 pt-7"><p className="text-[10px] font-bold uppercase tracking-[.24em] text-amber-300">Panel administrativo</p><p className="mt-2 text-sm leading-6 text-slate-400">Gestión institucional y documental.</p></div>
        <nav className="flex-1 space-y-1 px-4 py-3">
          {items.map((item, index) => {
            const Icon = item.icon;
            const selected = tab === item.id;
            return <button key={item.id} onClick={() => { setTab(item.id); setMobileOpen(false); }} className={`group flex w-full items-center gap-3 border-l-2 px-4 py-3.5 text-left transition ${selected ? "border-amber-300 bg-white/[.08] text-white" : "border-transparent text-slate-400 hover:bg-white/[.04] hover:text-white"}`}>
              <span className={`text-[10px] tabular-nums ${selected ? "text-amber-300" : "text-slate-600"}`}>0{index + 1}</span><Icon className={`h-5 w-5 ${selected ? "text-amber-300" : ""}`} /><span className="text-sm font-semibold">{item.label}</span>
            </button>;
          })}
        </nav>
        <div className="border-t border-white/10 p-4"><Button onClick={logout} variant="ghost" className="w-full justify-start rounded-none text-slate-400 hover:bg-white/10 hover:text-white"><LogOut className="mr-3 h-4 w-4" />Cerrar sesión</Button></div>
      </aside>

      <div className="lg:pl-[290px]">
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
          <div className="mx-auto flex min-h-20 max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <Button variant="outline" size="icon" className="shrink-0 rounded-none lg:hidden" onClick={() => setMobileOpen(true)}><Menu className="h-5 w-5" /></Button>
              <div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-[.2em] text-amber-600">Administración</p><h1 className="truncate text-xl font-semibold tracking-tight sm:text-2xl">{active.label}</h1></div>
            </div>
            <Button variant="outline" className="hidden rounded-none sm:flex" onClick={() => navigate("/")}>Sitio público <ArrowUpRight className="ml-2 h-4 w-4" /></Button>
          </div>
        </header>

        <main className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8 xl:p-10">
          <section className="mb-7 overflow-hidden border border-slate-200 bg-white shadow-sm">
            <div className="grid md:grid-cols-[auto_1fr]">
              <div className="flex min-h-28 w-full items-center justify-center bg-slate-950 px-8 md:w-36"><ActiveIcon className="h-9 w-9 text-amber-300" /></div>
              <div className="p-6 md:p-7"><p className="text-[10px] font-bold uppercase tracking-[.2em] text-amber-600">Módulo activo</p><h2 className="mt-2 text-2xl font-semibold tracking-tight">{active.label}</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">{active.description}</p></div>
            </div>
          </section>

          {tab === "institutions" && <InstitutionsManager />}
          {tab === "repository" && <DocumentRepository />}
          {tab === "availability" && <AvailabilityManager />}
          {tab === "appointments" && <AppointmentsList />}
          {tab === "faqs" && <FAQManager />}
        </main>
      </div>
    </div>
  );
}
