import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, Phone, Building2, IdCard, Send } from "lucide-react";

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
      // Aquí integrarías tu envío real (email/DB/API)
      await new Promise((r) => setTimeout(r, 500));

      toast.success("Solicitud enviada. Te contactaremos a la brevedad.");
      setFormData({
        nombres: "",
        universidad: "",
        telefono: "",
        correo: "",
        cedulaRuc: "",
        motivo: "",
      });
    } catch (err: any) {
      toast.error(err?.message || "No se pudo enviar la solicitud.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contacto" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Solicita Información</h2>
          <p className="text-lg text-muted-foreground">
            Cuéntanos tu necesidad y te proponemos un plan de trabajo alineado a tus criterios, evidencias y plazos.
          </p>
        </div>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Formulario de contacto</CardTitle>
            <CardDescription>Los campos marcados con * son obligatorios.</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="nombres">Nombres completos *</Label>
                <div className="relative">
                  <Input
                    id="nombres"
                    value={formData.nombres}
                    onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
                    placeholder="Juan Pérez García"
                    required
                    className="pl-10"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <IdCard className="h-4 w-4" />
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="universidad">Nombre de la institución *</Label>
                <div className="relative">
                  <Input
                    id="universidad"
                    value={formData.universidad}
                    onChange={(e) => setFormData({ ...formData, universidad: e.target.value })}
                    placeholder="Universidad / Instituto / Escuela"
                    required
                    className="pl-10"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Building2 className="h-4 w-4" />
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <div className="relative">
                    <Input
                      id="telefono"
                      type="tel"
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      placeholder="0999123456"
                      className="pl-10"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                    </span>
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="correo">Correo electrónico *</Label>
                <div className="relative">
                  <Input
                    id="correo"
                    type="email"
                    value={formData.correo}
                    onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                    placeholder="nombre@correo.com"
                    required
                    className="pl-10"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivo">Motivo de la consulta *</Label>
                <Textarea
                  id="motivo"
                  value={formData.motivo}
                  onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
                  placeholder="Ej.: Diagnóstico inicial, preparación documental, plan de mejora, acompañamiento a visita, etc."
                  rows={4}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Protección de datos: usaremos esta información únicamente para contactarte y atender tu solicitud.
                </p>
              </div>

              <Button type="submit" variant="accent" size="lg" className="w-full" disabled={sending}>
                {sending ? (
                  "Enviando..."
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Enviar solicitud
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactForm;
