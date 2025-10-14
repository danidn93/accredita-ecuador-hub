import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const startOfToday = new Date(new Date().setHours(0, 0, 0, 0));

type AvailableSlot = { id: string; time: string };

const AppointmentForm = () => {
  const [date, setDate] = useState<Date | undefined>();
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [loadingTimes, setLoadingTimes] = useState(false);

  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedSlotId, setSelectedSlotId] = useState<string>("");

  // Modal
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form del modal
  const [formData, setFormData] = useState({
    nombres: "",
    universidad: "",
    telefono: "",
    correo: "",
    cedulaRuc: "",
    motivo: "",
  });

  // Cargar HORARIOS DISPONIBLES cuando cambia la fecha
  useEffect(() => {
    const fetchTimes = async () => {
      setSelectedTime("");
      setSelectedSlotId("");
      setAvailableSlots([]);

      if (!date) return;

      setLoadingTimes(true);
      try {
        const dateStr = format(date, "yyyy-MM-dd");
        const { data, error } = await supabase.rpc("get_available_slots_by_date", {
          p_date: dateStr,
        });
        if (error) throw error;

        const mapped: AvailableSlot[] = (data ?? []).map((r: any) => ({
          id: r.id as string,
          time: r.time_local as string,
        }));

        setAvailableSlots(mapped);
      } catch (e: any) {
        console.error(e);
        toast.error(e.message || "No se pudieron cargar los horarios");
      } finally {
        setLoadingTimes(false);
      }
    };

    fetchTimes();
  }, [date]);

  const resetAll = () => {
    setDate(undefined);
    setAvailableSlots([]);
    setSelectedTime("");
    setSelectedSlotId("");
    setFormData({
      nombres: "",
      universidad: "",
      telefono: "",
      correo: "",
      cedulaRuc: "",
      motivo: "",
    });
  };

  // Abrir modal (valida que haya fecha y hora)
  const handleOpenModal = () => {
    if (!date || !selectedTime || !selectedSlotId) {
      toast.error("Por favor selecciona una fecha y hora");
      return;
    }
    setOpen(true);
  };

  // Enviar (crear cita)
  const handleSubmitModal = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nombres || !formData.universidad || !formData.correo || !formData.motivo) {
      toast.error("Por favor completa todos los campos requeridos");
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase.rpc("book_appointment", {
        p_slot_id: selectedSlotId,
        p_nombres: formData.nombres,
        p_universidad: formData.universidad,
        p_telefono: formData.telefono || null,
        p_correo: formData.correo,
        p_cedula_ruc: formData.cedulaRuc || null,
        p_motivo: formData.motivo,
      });

      if (error) {
        // Si otro usuario tomó el slot a la vez
        if (error.code === "23505") {
          toast.error("Ese horario acaba de ocuparse. Por favor elige otro.");
        } else {
          throw error;
        }
        return;
      }

      toast.success(
        `Cita solicitada para ${format(date!, "PPP", { locale: es })} a las ${selectedTime}`
      );
      setOpen(false);
      // Refresca horarios disponibles del día (el slot ya no debe aparecer)
      const dateStr = format(date!, "yyyy-MM-dd");
      const { data: refreshed, error: err2 } = await supabase.rpc("get_available_slots_by_date", {
        p_date: dateStr,
      });
      if (!err2) {
        const mapped: AvailableSlot[] = (refreshed ?? []).map((r: any) => ({
          id: r.id as string,
          time: r.time_local as string,
        }));
        setAvailableSlots(mapped);
      }
      // Limpia selección del time/slot
      setSelectedTime("");
      setSelectedSlotId("");
      // Si quieres, también resetea todo el form:
      // resetAll();
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || "No se pudo crear la cita");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section id="agenda" className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Agenda tu Consulta</h2>
          <p className="text-lg text-muted-foreground">
            Selecciona la fecha y hora que mejor se ajuste a tu disponibilidad
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Selecciona Fecha y Hora</CardTitle>
            <CardDescription>Elige un día disponible y el horario de tu preferencia</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="mb-2 block">Fecha</Label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  locale={es}
                  formatters={{
                    formatCaption: (month) => cap(format(month, "LLLL yyyy", { locale: es })),
                  }}
                  disabled={(d) => d < startOfToday || d.getDay() === 0 || d.getDay() === 6}
                  className="rounded-md border"
                  classNames={{ day_today: "rounded-md" }}
                />
              </div>

              <div>
                <Label className="mb-2 block">Horario Disponible</Label>

                {loadingTimes ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Cargando horarios...
                  </div>
                ) : availableSlots.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No hay horarios para este día.</p>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {availableSlots.map((slot) => (
                      <Button
                        key={slot.id}
                        type="button"
                        variant={selectedSlotId === slot.id ? "default" : "outline"}
                        onClick={() => {
                          setSelectedSlotId(slot.id);
                          setSelectedTime(slot.time);
                        }}
                        className="w-full"
                      >
                        {slot.time}
                      </Button>
                    ))}
                  </div>
                )}

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

            <Button
              onClick={handleOpenModal}
              variant="accent"
              size="lg"
              className="w-full mt-8"
              disabled={!date || !selectedSlotId}
            >
              Confirmar Cita
            </Button>

            {/* Modal */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent className="sm:max-w-3xl max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Datos para confirmar tu cita</DialogTitle>
                  <DialogDescription>
                    Completa la información y revisa el resumen de tu cita.
                  </DialogDescription>
                </DialogHeader>

                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-sm font-medium">Resumen</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {date ? `${format(date, "PPPP", { locale: es })} a las ${selectedTime}` : "—"}
                  </p>
                </div>

                <form onSubmit={handleSubmitModal} className="space-y-6 mt-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="nombres">Nombres Completos *</Label>
                      <Input
                        id="nombres"
                        value={formData.nombres}
                        onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
                        placeholder="Juan Pérez García"
                        required
                        autoFocus
                      />
                    </div>

                    <div>
                      <Label htmlFor="universidad">Nombre de la Universidad *</Label>
                      <Input
                        id="universidad"
                        value={formData.universidad}
                        onChange={(e) => setFormData({ ...formData, universidad: e.target.value })}
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
                          onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                          placeholder="0999123456"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cedulaRuc">Cédula o RUC</Label>
                        <Input
                          id="cedulaRuc"
                          value={formData.cedulaRuc}
                          onChange={(e) => setFormData({ ...formData, cedulaRuc: e.target.value })}
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
                        onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                        placeholder="ejemplo@correo.com"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="motivo">Motivo de la Consulta *</Label>
                      <Textarea
                        id="motivo"
                        value={formData.motivo}
                        onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
                        placeholder="Describe el motivo de tu consulta..."
                        rows={3}
                        required
                      />
                    </div>
                  </div>

                  <DialogFooter className="gap-2">
                    <DialogClose asChild>
                      <Button type="button" variant="outline">Volver</Button>
                    </DialogClose>
                    <Button type="submit" variant="accent" disabled={saving}>
                      {saving ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Guardando...</> : "Confirmar y Enviar"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AppointmentForm;
