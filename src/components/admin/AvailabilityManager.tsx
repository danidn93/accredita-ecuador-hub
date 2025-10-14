import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Trash2, Plus } from "lucide-react";

interface TimeSlot {
  id: string;
  time: string;
}

const AvailabilityManager = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [newTime, setNewTime] = useState("");

  const addTimeSlot = () => {
    if (!selectedDate) {
      toast.error("Por favor selecciona una fecha primero");
      return;
    }
    if (!newTime) {
      toast.error("Por favor ingresa una hora");
      return;
    }

    const newSlot: TimeSlot = {
      id: Date.now().toString(),
      time: newTime
    };

    setTimeSlots([...timeSlots, newSlot]);
    setNewTime("");
    toast.success(`Horario ${newTime} agregado`);
  };

  const removeTimeSlot = (id: string) => {
    setTimeSlots(timeSlots.filter(slot => slot.id !== id));
    toast.success("Horario eliminado");
  };

  const saveAvailability = () => {
    if (!selectedDate || timeSlots.length === 0) {
      toast.error("Selecciona una fecha y agrega al menos un horario");
      return;
    }
    
    toast.success(`Disponibilidad guardada para ${format(selectedDate, "PPP", { locale: es })}`);
    // Aquí se guardará en la base de datos
    setTimeSlots([]);
    setSelectedDate(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label className="mb-2 block">Seleccionar Fecha</Label>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => date < new Date()}
            className="rounded-md border"
          />
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="time">Agregar Horario</Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="time"
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                placeholder="HH:MM"
              />
              <Button onClick={addTimeSlot} variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {selectedDate && (
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm font-medium mb-3">
                Horarios para {format(selectedDate, "PPP", { locale: es })}:
              </p>
              {timeSlots.length === 0 ? (
                <p className="text-sm text-muted-foreground">No hay horarios agregados</p>
              ) : (
                <div className="space-y-2">
                  {timeSlots.map((slot) => (
                    <div key={slot.id} className="flex items-center justify-between bg-background p-2 rounded">
                      <span className="text-sm font-medium">{slot.time}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTimeSlot(slot.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Button 
        onClick={saveAvailability} 
        variant="accent" 
        size="lg" 
        className="w-full"
        disabled={!selectedDate || timeSlots.length === 0}
      >
        Guardar Disponibilidad
      </Button>
    </div>
  );
};

export default AvailabilityManager;
