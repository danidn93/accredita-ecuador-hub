import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombres: "",
    universidad: "",
    telefono: "",
    correo: "",
    cedulaRuc: "",
    motivo: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.nombres || !formData.universidad || !formData.correo || !formData.motivo) {
      toast.error("Por favor completa los campos requeridos");
      return;
    }

    toast.success("Solicitud enviada exitosamente. Nos pondremos en contacto pronto.");
    setFormData({
      nombres: "",
      universidad: "",
      telefono: "",
      correo: "",
      cedulaRuc: "",
      motivo: ""
    });
  };

  return (
    <section id="contacto" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Solicita Información
          </h2>
          <p className="text-lg text-muted-foreground">
            Completa el formulario y nuestro equipo te contactará a la brevedad
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Formulario de Contacto</CardTitle>
            <CardDescription>
              Todos los campos marcados con * son obligatorios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="nombres">Nombres Completos *</Label>
                <Input
                  id="nombres"
                  value={formData.nombres}
                  onChange={(e) => setFormData({...formData, nombres: e.target.value})}
                  placeholder="Juan Pérez García"
                  required
                />
              </div>

              <div>
                <Label htmlFor="universidad">Nombre de la Universidad *</Label>
                <Input
                  id="universidad"
                  value={formData.universidad}
                  onChange={(e) => setFormData({...formData, universidad: e.target.value})}
                  placeholder="Universidad Central del Ecuador"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                    placeholder="0999123456"
                  />
                </div>

                <div>
                  <Label htmlFor="cedulaRuc">Cédula o RUC</Label>
                  <Input
                    id="cedulaRuc"
                    value={formData.cedulaRuc}
                    onChange={(e) => setFormData({...formData, cedulaRuc: e.target.value})}
                    placeholder="1234567890"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="correo">Correo Electrónico *</Label>
                <Input
                  id="correo"
                  type="email"
                  value={formData.correo}
                  onChange={(e) => setFormData({...formData, correo: e.target.value})}
                  placeholder="ejemplo@correo.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="motivo">Motivo de la Consulta *</Label>
                <Textarea
                  id="motivo"
                  value={formData.motivo}
                  onChange={(e) => setFormData({...formData, motivo: e.target.value})}
                  placeholder="Describe el motivo de tu consulta..."
                  rows={5}
                  required
                />
              </div>

              <Button type="submit" variant="accent" size="lg" className="w-full">
                Enviar Solicitud
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactForm;
