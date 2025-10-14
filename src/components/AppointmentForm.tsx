import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const AppointmentForm = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [formData, setFormData] = useState({
    nombres: "",
    universidad: "",
    telefono: "",
    correo: "",
    cedulaRuc: "",
    motivo: ""
  });

  // Horarios de ejemplo - esto vendrá de la base de datos
  const availableTimes = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !selectedTime) {
      toast.error("Por favor selecciona una fecha y hora");
      return;
    }
    
    if (!formData.nombres || !formData.universidad || !formData.correo || !formData.motivo) {
      toast.error("Por favor completa todos los campos requeridos");
      return;
    }
    
    toast.success(`Cita agendada para ${format(date, "PPP", { locale: es })} a las ${selectedTime}`);
    
    // Limpiar formulario
    setDate(undefined);
    setSelectedTime("");
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
    <section id="agenda" className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Agenda tu Consulta
          </h2>
          <p className="text-lg text-muted-foreground">
            Selecciona la fecha y hora que mejor se ajuste a tu disponibilidad
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Selecciona Fecha y Hora</CardTitle>
            <CardDescription>
              Elige un día disponible y el horario de tu preferencia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
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
                    rows={3}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 pt-4 border-t">
                <div>
                  <Label className="mb-2 block">Fecha</Label>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                    className="rounded-md border"
                  />
                </div>

                <div>
                  <Label className="mb-2 block">Horario Disponible</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {availableTimes.map((time) => (
                      <Button
                        key={time}
                        type="button"
                        variant={selectedTime === time ? "default" : "outline"}
                        onClick={() => setSelectedTime(time)}
                        className="w-full"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                  
                  {date && selectedTime && (
                    <div className="mt-6 p-4 bg-muted rounded-lg">
                      <p className="text-sm font-medium">Cita seleccionada:</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {format(date, "PPPP", { locale: es })} a las {selectedTime}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <Button type="submit" variant="accent" size="lg" className="w-full">
                Confirmar Cita
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AppointmentForm;
