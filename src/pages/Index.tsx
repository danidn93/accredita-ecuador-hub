
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import AppointmentForm from "@/components/AppointmentForm";
import AboutCompany from "@/components/AboutCompany";
import Team from "@/components/Team";
import AccreditationProcess from "@/components/AccreditationProcess";
import AccreditationBenefits from "@/components/AccreditationBenefits";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Presentación principal */}
        <Hero />

        {/* Los cuatro servicios de Educalidad */}
        <Services />

        {/* Agendamiento de cita virtual */}
        <AppointmentForm />

        {/* Presentación institucional */}
        <AboutCompany />

        {/* Profesionales / evaluadoras */}
        <Team />

        {/* Metodología y proceso de acompañamiento */}
        <AccreditationProcess />

        {/* Beneficios de los procesos de acreditación */}
        <AccreditationBenefits />

        {/* Formulario y canales de contacto */}
        <ContactForm />

        {/* Preguntas frecuentes */}
        <FAQ />
      </main>

      <Footer />
    </div>
  );
};

export default Index;