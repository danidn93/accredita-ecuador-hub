import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Estas FAQs vendrán de la base de datos en el futuro
const faqs = [
  {
    id: "1",
    question: "¿Cuánto tiempo toma el proceso de acreditación?",
    answer: "El proceso de acreditación generalmente toma entre 12 a 18 meses, dependiendo del estado actual de tu programa y la complejidad de los requisitos. Nuestro equipo trabaja para optimizar este tiempo manteniendo la calidad del proceso."
  },
  {
    id: "2",
    question: "¿Qué documentación necesito para iniciar?",
    answer: "Para iniciar el proceso necesitarás: documentos institucionales, plan de estudios, perfiles de docentes, información de infraestructura y equipamiento, resultados de evaluaciones previas, entre otros. Te proporcionamos una lista detallada en la primera consulta."
  },
  {
    id: "3",
    question: "¿Ofrecen garantía de acreditación?",
    answer: "Nuestra experiencia y metodología nos permiten ofrecer un acompañamiento que maximiza las posibilidades de éxito. Trabajamos con estándares probados y un equipo experto que ha participado en múltiples procesos exitosos."
  },
  {
    id: "4",
    question: "¿Cuál es el costo del servicio?",
    answer: "El costo varía según las necesidades específicas de cada institución y el alcance del servicio requerido. Ofrecemos diferentes paquetes que se ajustan a diversos presupuestos. Agenda una consulta para recibir una cotización personalizada."
  },
  {
    id: "5",
    question: "¿Realizan capacitaciones al personal?",
    answer: "Sí, incluimos capacitación al personal docente y administrativo como parte integral de nuestros servicios. Esto asegura que tu equipo comprenda y pueda mantener los estándares de calidad requeridos."
  }
];

const FAQ = () => {
  return (
    <section id="faqs" className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-lg text-muted-foreground">
            Encuentra respuestas a las dudas más comunes sobre nuestros servicios
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq) => (
            <AccordionItem 
              key={faq.id} 
              value={faq.id}
              className="bg-card border rounded-lg px-6"
            >
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
