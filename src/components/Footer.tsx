import { Mail, Phone, MapPin, BadgeCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground pt-10 pb-12 px-4">
      <div className="container mx-auto">
        {/* Franja de certificación */}
        <div className="mb-10 rounded-2xl border border-primary-foreground/20 bg-primary-foreground/5 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="h-11 w-11 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                <BadgeCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold">
                  Equipo con evaluadoras certificadas
                </p>
                <p className="text-sm opacity-90 leading-relaxed">
                  Fortalecemos la lectura de criterios, la consistencia de evidencias y la preparación
                  para procesos de evaluación externa.
                </p>
              </div>
            </div>

            <Badge className="w-fit rounded-full px-4 py-1 text-xs bg-primary-foreground text-primary">
              Certificación • Evaluación y calidad
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <img
              src={logo}
              alt="Educalidad S.A.S."
              className="h-16 w-auto mb-4 brightness-0 invert"
              decoding="async"
              loading="lazy"
            />
            <p className="text-sm opacity-90 leading-relaxed">
              Asesoría especializada en aseguramiento de la calidad y acreditación en educación superior,
              con enfoque técnico y orientado a resultados.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contacto</h3>
            <div className="space-y-3 text-sm opacity-90">
              <a className="flex items-center gap-2 hover:opacity-100 transition-opacity" href="mailto:infoeducalidadsas@gmail.com">
                <Mail className="h-4 w-4" />
                <span>infoeducalidadsas@gmail.com</span>
              </a>
              <a className="flex items-center gap-2 hover:opacity-100 transition-opacity" href="tel:+593991234567">
                <Phone className="h-4 w-4" />
                <span>+593 99 123 4567</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Milagro, Ecuador</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Enlaces</h3>
            <div className="space-y-3 text-sm opacity-90">
              <a href="#servicios" className="block hover:opacity-100 transition-opacity">Servicios</a>
              <a href="#agenda" className="block hover:opacity-100 transition-opacity">Agendar consulta</a>
              <a href="#contacto" className="block hover:opacity-100 transition-opacity">Contacto</a>
              <a href="#faqs" className="block hover:opacity-100 transition-opacity">Preguntas frecuentes</a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-80">
          <p>&copy; {new Date().getFullYear()} Educalidad S.A.S. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
