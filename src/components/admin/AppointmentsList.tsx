import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type AppointmentRow = {
  id: string;
  status: "pending" | "confirmed" | "cancelled" | "rejected";
  date_local: string;   // "2025-10-21"
  time_local: string;   // "14:00"
  client_info: string;  // "Juan Pérez - Universidad"
  nombres: string;
  universidad: string;
  correo: string | null;
  telefono: string | null;
  motivo: string;
};

const AppointmentsList = () => {
  const [rows, setRows] = useState<AppointmentRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [actingId, setActingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed" | "cancelled">("all");

  const getStatusBadge = (status: AppointmentRow["status"]) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">Confirmada</Badge>;
      case "pending":
        return <Badge variant="secondary">Pendiente</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelada</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rechazada</Badge>;
      default:
        return <Badge>Desconocido</Badge>;
    }
  };

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      let query = supabase.from("appointments_admin").select("*");
      // Nota: en vistas, Supabase no permite .eq sobre columnas calculadas en todos los casos.
      // Si quieres filtrar por status, mejor hazlo en front:
      const { data, error } = await query;
      if (error) throw error;

      let list = (data ?? []) as AppointmentRow[];

      if (filter !== "all") {
        list = list.filter((r) => r.status === filter);
      }

      setRows(list);
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || "No se pudieron cargar las citas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const updateStatus = async (id: string, next: "confirmed" | "cancelled") => {
    setActingId(id);
    try {
      const { error } = await supabase.rpc("set_appointment_status", {
        p_appointment_id: id,
        p_status: next,
        p_reason: null,
      });
      if (error) throw error;

      toast.success(next === "confirmed" ? "Cita confirmada" : "Cita cancelada");
      await fetchAppointments();
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || "No se pudo actualizar el estado");
    } finally {
      setActingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Filtros rápidos */}
      <div className="flex items-center gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
        >
          Todas
        </Button>
        <Button
          variant={filter === "pending" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("pending")}
        >
          Pendientes
        </Button>
        <Button
          variant={filter === "confirmed" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("confirmed")}
        >
          Confirmadas
        </Button>
        <Button
          variant={filter === "cancelled" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("cancelled")}
        >
          Canceladas
        </Button>
        <div className="ml-auto text-sm text-muted-foreground">
          {loading ? (
            <span className="inline-flex items-center gap-1">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Cargando...
            </span>
          ) : (
            `${rows.length} resultado(s)`
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12 text-muted-foreground">
          <Loader2 className="h-5 w-5 mr-2 animate-spin" /> Cargando citas...
        </div>
      ) : rows.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">No hay citas</p>
      ) : (
        rows.map((appointment) => (
          <Card key={appointment.id} className="p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">
                    {appointment.date_local} - {appointment.time_local}
                  </span>
                  {getStatusBadge(appointment.status)}
                </div>
                <p className="text-sm text-muted-foreground">
                  {appointment.client_info}
                </p>
                <p className="text-xs text-muted-foreground">
                  {appointment.correo || "Sin correo"} • {appointment.telefono || "Sin teléfono"}
                </p>
                <p className="text-xs text-muted-foreground">Motivo: {appointment.motivo}</p>
              </div>

              {appointment.status === "pending" && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateStatus(appointment.id, "confirmed")}
                    disabled={actingId === appointment.id}
                  >
                    {actingId === appointment.id ? (
                      <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                    ) : (
                      <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                    )}
                    Confirmar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateStatus(appointment.id, "cancelled")}
                    disabled={actingId === appointment.id}
                  >
                    {actingId === appointment.id ? (
                      <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                    ) : (
                      <XCircle className="h-4 w-4 mr-1 text-destructive" />
                    )}
                    Cancelar
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default AppointmentsList;
