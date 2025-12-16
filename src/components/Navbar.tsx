import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BadgeCheck, Menu } from "lucide-react";
import logo from "@/assets/logo.png";

const navItems = [
  { href: "#servicios", label: "Servicios" },
  { href: "#contacto", label: "Contacto" },
  { href: "#faqs", label: "FAQs" },
  { href: "#proceso", label: "Proceso" },
];

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo + Badge (juntos) */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Educalidad S.A.S."
              className="h-12 md:h-14 w-auto"
              width={256}
              height={256}
              decoding="async"
              loading="eager"
            />
          </Link>

          {/* Cerca del logo (visible desde md) */}
          <div className="hidden md:flex items-center">
            <Badge variant="outline" className="rounded-full px-3 py-1 text-xs">
              <BadgeCheck className="h-4 w-4 mr-1 text-primary" />
              Evaluadoras certificadas
            </Badge>
          </div>
        </div>

        {/* Links desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((it) => (
            <a
              key={it.href}
              href={it.href}
              className="text-foreground hover:text-primary transition-colors"
            >
              {it.label}
            </a>
          ))}

          <Button
            variant="accent"
            onClick={() =>
              document.getElementById("agenda")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Agendar consulta
          </Button>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Abrir menú">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-80">
              <div className="mt-4 space-y-3">
                <Badge variant="outline" className="rounded-full px-4 py-1 text-xs w-fit">
                  <BadgeCheck className="h-4 w-4 mr-1 text-primary" />
                  Evaluadoras certificadas
                </Badge>

                <p className="text-sm text-muted-foreground">
                  Acompañamiento con rigor evaluativo y trazabilidad de evidencias.
                </p>

                <div className="pt-2 space-y-3">
                  {navItems.map((it) => (
                    <a key={it.href} href={it.href} className="block text-base font-medium">
                      {it.label}
                    </a>
                  ))}
                </div>

                <Button
                  className="w-full mt-4"
                  variant="accent"
                  onClick={() =>
                    document.getElementById("agenda")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Agendar consulta
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
