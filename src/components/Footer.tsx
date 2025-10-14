import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <img src={logo} alt="Educalidad S.A.S." className="h-16 w-auto mb-4 brightness-0 invert" />
            <p className="text-sm opacity-90">
              Expertos en acreditación de carreras universitarias en Ecuador
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contacto</h3>
            <div className="space-y-2 text-sm opacity-90">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>infoeducalidadsas@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+593 99 123 4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Milagro, Ecuador</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Enlaces</h3>
            <div className="space-y-2 text-sm opacity-90">
              <a href="#servicios" className="block hover:opacity-100 transition-opacity">
                Servicios
              </a>
              <a href="#agenda" className="block hover:opacity-100 transition-opacity">
                Agendar Cita
              </a>
              <a href="#contacto" className="block hover:opacity-100 transition-opacity">
                Contacto
              </a>
              <a href="#faqs" className="block hover:opacity-100 transition-opacity">
                Preguntas Frecuentes
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-75">
          <p>&copy; {new Date().getFullYear()} Educalidad S.A.S. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
