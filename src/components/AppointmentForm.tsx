import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const AppointmentForm = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");

  // Horarios de ejemplo - esto vendrá de la base de datos
  const availableTimes = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !selectedTime) {
      toast.error("Por favor selecciona una fecha y hora");
      return;
    }
    toast.success(`Cita agendada para ${format(date, "PPP", { locale: es })} a las ${selectedTime}`);
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
              <div className="grid md:grid-cols-2 gap-6">
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
