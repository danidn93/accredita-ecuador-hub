import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, HelpCircle, Clock } from "lucide-react";
import AvailabilityManager from "@/components/admin/AvailabilityManager";
import FAQManager from "@/components/admin/FAQManager";
import AppointmentsList from "@/components/admin/AppointmentsList";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("availability");

  return (
    <div className="min-h-screen bg-secondary/20">
      <div className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver al inicio
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-foreground">Panel Administrativo</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-3">
            <TabsTrigger value="availability" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Disponibilidad
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Citas
            </TabsTrigger>
            <TabsTrigger value="faqs" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              FAQs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="availability" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Disponibilidad</CardTitle>
                <CardDescription>
                  Administra los horarios disponibles para las citas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AvailabilityManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Solicitudes de Citas</CardTitle>
                <CardDescription>
                  Revisa y gestiona las citas solicitadas por los clientes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AppointmentsList />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faqs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de FAQs</CardTitle>
                <CardDescription>
                  Crea, edita y elimina las preguntas frecuentes que se mostrarán en la landing page
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FAQManager />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
