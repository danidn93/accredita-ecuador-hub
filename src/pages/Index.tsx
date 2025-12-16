import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import AppointmentForm from "@/components/AppointmentForm";
import AboutCompany from "@/components/AboutCompany";            // ← nuevo
import AccreditationBenefits from "@/components/AccreditationBenefits";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import AccreditationProcess from "@/components/AccreditationProcess";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <AppointmentForm />
      <AboutCompany />
      <AccreditationProcess/>
      <AccreditationBenefits />
      <ContactForm />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
