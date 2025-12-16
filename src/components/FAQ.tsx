import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, HelpCircle } from "lucide-react";

type FaqRow = {
  id: string;
  question: string;
  answer: string;
  is_published?: boolean;
  sort_order?: number;
};

const FAQ = () => {
  const [faqs, setFaqs] = useState<FaqRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const loadFaqs = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const { data, error } = await supabase
        .from("faqs")
        .select("id, question, answer, is_published, sort_order")
        .eq("is_published", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });
      if (error) throw error;
      setFaqs(data ?? []);
    } catch (e: any) {
      console.error(e);
      setErrorMsg(e.message || "No se pudieron cargar las preguntas frecuentes.");
      setFaqs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  return (
    <section id="faqs" className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-4 py-2 mb-4">
            <HelpCircle className="h-4 w-4 text-primary" />
            <p className="text-sm font-semibold">Respuestas claras y directas</p>
          </div>

          <h2 className="text-4xl font-bold text-foreground mb-4">Preguntas Frecuentes</h2>
          <p className="text-lg text-muted-foreground">
            Si tu pregunta no está aquí, escríbenos desde la sección de contacto.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-10 text-muted-foreground">
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            Cargando FAQs...
          </div>
        ) : errorMsg ? (
          <p className="text-center text-destructive">{errorMsg}</p>
        ) : faqs.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            Aún no hay preguntas frecuentes publicadas.
          </div>
        ) : (
          <div className="rounded-2xl border bg-background/70">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, idx) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className={`px-6 ${idx !== 0 ? "border-t" : ""}`}
                >
                  <AccordionTrigger className="text-left hover:no-underline py-5">
                    <span className="font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground whitespace-pre-line pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQ;
