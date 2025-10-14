import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock } from "lucide-react";

// Datos de ejemplo - vendrán de la base de datos
const appointments = [
  {
    id: "1",
    date: "2025-10-20",
    time: "10:00",
    status: "pending",
    clientInfo: "Juan Pérez - Universidad Central"
  },
  {
    id: "2",
    date: "2025-10-21",
    time: "14:00",
    status: "confirmed",
    clientInfo: "María González - ESPOL"
  },
  {
    id: "3",
    date: "2025-10-22",
    time: "11:00",
    status: "pending",
    clientInfo: "Carlos Ruiz - PUCE"
  }
];

const AppointmentsList = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">Confirmada</Badge>;
      case "pending":
        return <Badge variant="secondary">Pendiente</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelada</Badge>;
      default:
        return <Badge>Desconocido</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {appointments.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">
          No hay citas solicitadas
        </p>
      ) : (
        appointments.map((appointment) => (
          <Card key={appointment.id} className="p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">
                    {appointment.date} - {appointment.time}
                  </span>
                  {getStatusBadge(appointment.status)}
                </div>
                <p className="text-sm text-muted-foreground">
                  {appointment.clientInfo}
                </p>
              </div>
              
              {appointment.status === "pending" && (
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                    Confirmar
                  </Button>
                  <Button size="sm" variant="outline">
                    <XCircle className="h-4 w-4 mr-1 text-destructive" />
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
