import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, LockKeyhole, ShieldCheck, UserRound } from "lucide-react";
import { toast } from "sonner";
import logoDark from "@/assets/logo-educalidad-dark.svg";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      localStorage.setItem("adminAuth", "true");
      toast.success("Bienvenido al panel administrativo");
      navigate("/admin");
      return;
    }
    toast.error("Credenciales incorrectas");
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(251,191,36,.10),transparent_30%),radial-gradient(circle_at_85%_80%,rgba(255,255,255,.06),transparent_28%)]" />
      <div className="absolute left-[8%] top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-amber-300/20 to-transparent lg:block" />
      <div className="relative grid w-full max-w-5xl overflow-hidden border border-white/10 bg-white/[.04] shadow-2xl backdrop-blur-xl lg:grid-cols-[1fr_.85fr]">
        <section className="hidden min-h-[610px] flex-col justify-between border-r border-white/10 p-12 lg:flex">
          <div><img src={logoDark} alt="Educalidad S.A.S." className="h-28 w-auto" /></div>
          <div className="max-w-md"><p className="text-xs font-bold uppercase tracking-[.22em] text-amber-300">Gestión Educalidad</p><h1 className="mt-5 text-5xl font-semibold leading-[1.05] tracking-[-.04em]">Calidad organizada. Evidencia trazable.</h1><p className="mt-6 text-base leading-7 text-slate-400">Administre instituciones, repositorios documentales, citas, disponibilidad y contenidos desde un entorno unificado.</p></div>
          <div className="flex items-center gap-3 text-xs text-slate-500"><ShieldCheck className="h-4 w-4 text-amber-300" />Acceso administrativo</div>
        </section>

        <section className="bg-white p-6 text-slate-950 sm:p-10 lg:p-12">
          <img src={logoDark} alt="Educalidad S.A.S." className="mx-auto mb-8 h-24 w-auto rounded bg-slate-950 p-3 lg:hidden" />
          <p className="text-xs font-bold uppercase tracking-[.2em] text-amber-600">Área privada</p><h2 className="mt-3 text-3xl font-semibold tracking-tight">Acceso administrativo</h2><p className="mt-3 text-sm leading-6 text-slate-500">Ingrese sus credenciales para continuar al panel de gestión.</p>
          <form onSubmit={submit} className="mt-9 space-y-6">
            <div className="space-y-2"><Label htmlFor="username">Usuario</Label><div className="relative"><UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><Input id="username" value={username} onChange={(e)=>setUsername(e.target.value)} className="h-12 rounded-none pl-10" autoComplete="username" required /></div></div>
            <div className="space-y-2"><Label htmlFor="password">Contraseña</Label><div className="relative"><LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><Input id="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="h-12 rounded-none pl-10" autoComplete="current-password" required /></div></div>
            <Button type="submit" className="h-12 w-full rounded-none bg-slate-950 font-semibold text-white hover:bg-slate-800">Ingresar al panel</Button>
          </form>
          <button onClick={()=>navigate("/")} className="mt-7 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-950"><ArrowLeft className="h-4 w-4" />Volver al sitio público</button>
        </section>
      </div>
    </main>
  );
}
