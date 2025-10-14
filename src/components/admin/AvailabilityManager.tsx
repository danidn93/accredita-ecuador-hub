import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Trash2, Plus, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type PersistState = "db" | "local";

interface TimeSlot {
  id?: string;       // existe si viene de DB
  time: string;      // "HH:MM"
  state: PersistState;
}

const startOfToday = new Date(new Date().setHours(0, 0, 0, 0));

const AvailabilityManager = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [newTime, setNewTime] = useState("");
  const [loadingList, setLoadingList] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Carga slots del día al seleccionar fecha
  useEffect(() => {
    const fetchSlots = async () => {
      if (!selectedDate) {
        setTimeSlots([]);
        return;
      }
      setLoadingList(true);
      try {
        const dateStr = format(selectedDate, "yyyy-MM-dd");
        const { data, error } = await supabase.rpc("get_slots_by_date", {
          p_date: dateStr,
        });
        if (error) throw error;

        const mapped: TimeSlot[] = (data || []).map((r: any) => ({
          id: r.id,
          time: r.time_local, // 'HH:MM'
          state: "db",
        }));
        setTimeSlots(mapped);
      } catch (e: any) {
        console.error(e);
        toast.error(e.message || "No se pudieron cargar los horarios");
      } finally {
        setLoadingList(false);
      }
    };
    fetchSlots();
  }, [selectedDate]);

  const addTimeSlot = () => {
    if (!selectedDate) {
      toast.error("Por favor selecciona una fecha primero");
      return;
    }
    if (!newTime) {
      toast.error("Por favor ingresa una hora");
      return;
    }
    // Evitar duplicados contra lista actual (db + local)
    if (timeSlots.some((s) => s.time === newTime)) {
      toast.error("Ese horario ya existe");
      return;
    }

    setTimeSlots((prev) => [...prev, { time: newTime, state: "local" }]);
    setNewTime("");
    toast.success(`Horario ${newTime} agregado`);
  };

  const removeTimeSlot = async (slot: TimeSlot) => {
    // Si es nuevo (local, no guardado), solo quítalo del estado
    if (slot.state === "local") {
      setTimeSlots((prev) => prev.filter((s) => !(s.state === "local" && s.time === slot.time)));
      toast.success("Horario eliminado");
      return;
    }

    // Si viene de DB, hacemos soft delete (is_active=false)
    if (!slot.id) return;
    setDeletingId(slot.id);
    try {
      const { error } = await supabase
        .from("availability_slots")
        .update({ is_active: false })
        .eq("id", slot.id);

      if (error) throw error;
      toast.success("Horario eliminado");
      // Refrescar lista del día
      if (selectedDate) {
        const { data, error: err2 } = await supabase.rpc("get_slots_by_date", {
          p_date: format(selectedDate, "yyyy-MM-dd"),
        });
        if (err2) throw err2;
        const mapped: TimeSlot[] = (data || []).map((r: any) => ({
          id: r.id,
          time: r.time_local,
          state: "db",
        }));
        setTimeSlots(mapped);
      } else {
        setTimeSlots((prev) => prev.filter((s) => s.id !== slot.id));
      }
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || "No se pudo eliminar el horario");
    } finally {
      setDeletingId(null);
    }
  };

  const saveAvailability = async () => {
    if (!selectedDate) {
      toast.error("Selecciona una fecha");
      return;
    }
    const timesToSave = timeSlots.filter((s) => s.state === "local").map((s) => s.time);
    if (timesToSave.length === 0) {
      toast.error("No hay horarios nuevos para guardar");
      return;
    }

    setSaving(true);
    try {
      const dateStr = format(selectedDate, "yyyy-MM-dd");
      // No enviamos p_duration (queda en blanco) → usará default de la tabla
      const { data, error } = await supabase.rpc("create_slots", {
        p_date: dateStr,
        p_times: timesToSave,
        // p_tz: "America/Guayaquil" // opcional, ya es default en el RPC
      });
      if (error) throw error;

      toast.success(
        `Disponibilidad guardada para ${format(selectedDate, "PPP", { locale: es })}`
      );

      // Refrescar desde DB para marcar todos como "db"
      const { data: data2, error: err2 } = await supabase.rpc("get_slots_by_date", {
        p_date: dateStr,
      });
      if (err2) throw err2;
      const mapped: TimeSlot[] = (data2 || []).map((r: any) => ({
        id: r.id,
        time: r.time_local,
        state: "db",
      }));
      setTimeSlots(mapped);
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || "Error al guardar la disponibilidad");
    } finally {
      setSaving(false);
    }
  };

  const hasAnythingToSave = useMemo(
    () => timeSlots.some((s) => s.state === "local"),
    [timeSlots]
  );

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label className="mb-2 block">Seleccionar Fecha</Label>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(d) => d < startOfToday}
            locale={es}
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
                {loadingList ? "Cargando horarios..." : (
                  <>Horarios para {format(selectedDate, "PPP", { locale: es })}:</>
                )}
              </p>

              {loadingList ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Cargando...
                </div>
              ) : timeSlots.length === 0 ? (
                <p className="text-sm text-muted-foreground">No hay horarios</p>
              ) : (
                <div className="space-y-2">
                  {timeSlots.map((slot) => (
                    <div key={(slot.id ?? "") + slot.time} className="flex items-center justify-between bg-background p-2 rounded">
                      <span className="text-sm font-medium">
                        {slot.time} {slot.state === "local" && <em className="text-muted-foreground">(nuevo)</em>}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTimeSlot(slot)}
                        disabled={deletingId === slot.id}
                      >
                        {deletingId === slot.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4 text-destructive" />
                        )}
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
        disabled={!selectedDate || !hasAnythingToSave || saving}
      >
        {saving ? "Guardando..." : "Guardar Disponibilidad"}
      </Button>
    </div>
  );
};

export default AvailabilityManager;
