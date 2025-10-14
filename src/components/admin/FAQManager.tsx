import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Pencil, Trash2, Plus } from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const FAQManager = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: "1",
      question: "¿Cuánto tiempo toma el proceso de acreditación?",
      answer: "El proceso de acreditación generalmente toma entre 12 a 18 meses."
    }
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentFaq, setCurrentFaq] = useState<FAQ>({
    id: "",
    question: "",
    answer: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentFaq.question || !currentFaq.answer) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    if (isEditing) {
      setFaqs(faqs.map(faq => faq.id === currentFaq.id ? currentFaq : faq));
      toast.success("FAQ actualizada exitosamente");
    } else {
      const newFaq = { ...currentFaq, id: Date.now().toString() };
      setFaqs([...faqs, newFaq]);
      toast.success("FAQ creada exitosamente");
    }

    setCurrentFaq({ id: "", question: "", answer: "" });
    setIsEditing(false);
  };

  const handleEdit = (faq: FAQ) => {
    setCurrentFaq(faq);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    setFaqs(faqs.filter(faq => faq.id !== id));
    toast.success("FAQ eliminada");
  };

  const handleCancel = () => {
    setCurrentFaq({ id: "", question: "", answer: "" });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">
          {isEditing ? "Editar FAQ" : "Nueva FAQ"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="question">Pregunta</Label>
            <Input
              id="question"
              value={currentFaq.question}
              onChange={(e) => setCurrentFaq({ ...currentFaq, question: e.target.value })}
              placeholder="¿Cuál es tu pregunta?"
              required
            />
          </div>

          <div>
            <Label htmlFor="answer">Respuesta</Label>
            <Textarea
              id="answer"
              value={currentFaq.answer}
              onChange={(e) => setCurrentFaq({ ...currentFaq, answer: e.target.value })}
              placeholder="Escribe la respuesta..."
              rows={4}
              required
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" variant="accent">
              {isEditing ? "Actualizar" : "Crear"} FAQ
            </Button>
            {isEditing && (
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">FAQs Existentes</h3>
        {faqs.length === 0 ? (
          <p className="text-muted-foreground">No hay FAQs creadas aún</p>
        ) : (
          faqs.map((faq) => (
            <Card key={faq.id} className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-semibold mb-2">{faq.question}</h4>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(faq)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(faq.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default FAQManager;
