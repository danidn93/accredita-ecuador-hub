import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import AppointmentForm from "@/components/AppointmentForm";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <AppointmentForm />
      <ContactForm />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
