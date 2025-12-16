import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { BadgeCheck, Clock, Shield, Send } from "lucide-react";

const ContactForm = () => {
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    nombres: "",
    universidad: "",
    telefono: "",
    correo: "",
    cedulaRuc: "",
    motivo: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nombres || !formData.universidad || !formData.correo || !formData.motivo) {
      toast.error("Por favor completa los campos requeridos.");
      return;
    }

    setSending(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      toast.success("Solicitud enviada. Te contactaremos a la brevedad.");
      setFormData({ nombres: "", universidad: "", telefono: "", correo: "", cedulaRuc: "", motivo: "" });
    } catch (err: any) {
      toast.error(err?.message || "No se pudo enviar la solicitud.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contacto" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Solicita Información</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Cuéntanos tu necesidad y te propondremos un plan de trabajo alineado a criterios, evidencias y plazos.
          </p>
        </div>

        {/* Borde sutil, sin “card” clásico */}
        <div className="p-[1px] rounded-3xl bg-gradient-to-r from-primary/25 via-border to-primary/25">
          <div className="rounded-3xl bg-background">
            <div className="grid lg:grid-cols-5 gap-0">
              {/* Columna de contexto */}
              <div className="lg:col-span-2 p-8 border-b lg:border-b-0 lg:border-r bg-secondary/20 rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none">
                <div className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-4 py-2">
                  <BadgeCheck className="h-4 w-4 text-primary" />
                  <p className="text-sm font-semibold">Evaluadoras certificadas</p>
                </div>

                <h3 className="text-2xl font-semibold mt-6">Atención técnica y clara</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  Analizamos tu contexto, el estado de evidencias y la ruta de mejora. La certificación de nuestras evaluadoras
                  aporta rigor en criterios, consistencia documental y preparación para evaluación externa.
                </p>

                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-primary mt-0.5" />
                    <p className="text-muted-foreground">
                      Tiempo de respuesta estimado: <span className="font-medium text-foreground">24–48 horas laborables</span>.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-primary mt-0.5" />
                    <p className="text-muted-foreground">
                      Tratamiento de datos: uso exclusivo para contacto y gestión de tu solicitud.
                    </p>
                  </div>
                </div>
              </div>

              {/* Formulario */}
              <div className="lg:col-span-3 p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombres">Nombres completos *</Label>
                      <Input
                        id="nombres"
                        value={formData.nombres}
                        onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
                        placeholder="Juan Pérez García"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="universidad">Institución *</Label>
                      <Input
                        id="universidad"
                        value={formData.universidad}
                        onChange={(e) => setFormData({ ...formData, universidad: e.target.value })}
                        placeholder="Universidad / Instituto / Escuela"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="correo">Correo electrónico *</Label>
                      <Input
                        id="correo"
                        type="email"
                        value={formData.correo}
                        onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                        placeholder="nombre@correo.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="telefono">Teléfono</Label>
                      <Input
                        id="telefono"
                        type="tel"
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        placeholder="0999123456"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cedulaRuc">Cédula o RUC</Label>
                    <Input
                      id="cedulaRuc"
                      value={formData.cedulaRuc}
                      onChange={(e) => setFormData({ ...formData, cedulaRuc: e.target.value })}
                      placeholder="1234567890"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="motivo">Motivo de la consulta *</Label>
                    <Textarea
                      id="motivo"
                      value={formData.motivo}
                      onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
                      placeholder="Ej.: diagnóstico, matriz de evidencias, plan de mejora, preparación para evaluación externa..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" variant="accent" size="lg" className="w-full" disabled={sending}>
                    {sending ? "Enviando..." : (<><Send className="h-4 w-4 mr-2" />Enviar solicitud</>)}
                  </Button>

                  <p className="text-xs text-muted-foreground">
                    * Campos obligatorios. Al enviar, aceptas el uso de tus datos únicamente para atender esta solicitud.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
