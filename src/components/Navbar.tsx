import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          {/* Ajusta h-12 → h-14 en md y h-16 en lg */}
          <img
            src={logo}
            alt="Educalidad S.A.S."
            className="h-12 md:h-14 lg:h-16 w-auto"
            width={256}   // pon aquí el ancho real del archivo
            height={256}  // y la altura real para evitar CLS
            decoding="async"
            loading="eager"
          />
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <a href="#servicios" className="text-foreground hover:text-primary transition-colors">Servicios</a>
          <a href="#agenda" className="text-foreground hover:text-primary transition-colors">Agendar Cita</a>
          <a href="#contacto" className="text-foreground hover:text-primary transition-colors">Contacto</a>
          <a href="#faqs" className="text-foreground hover:text-primary transition-colors">FAQs</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
