import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Pencil, Trash2, Loader2, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type FAQ = {
  id: string;
  question: string;
  answer: string;
  is_published?: boolean;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
};

const FAQManager = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loadingList, setLoadingList] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [currentFaq, setCurrentFaq] = useState<FAQ>({
    id: "",
    question: "",
    answer: "",
  });

  const loadFaqs = async () => {
    setLoadingList(true);
    try {
      // Si solo quieres publicadas: .eq('is_published', true)
      const { data, error } = await supabase
        .from("faqs")
        .select("id, question, answer, is_published, sort_order, created_at, updated_at")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });

      if (error) throw error;
      setFaqs(data || []);
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || "No se pudieron cargar las FAQs");
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentFaq.question.trim() || !currentFaq.answer.trim()) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    setSaving(true);
    try {
      if (isEditing) {
        const { error } = await supabase
          .from("faqs")
          .update({
            question: currentFaq.question,
            answer: currentFaq.answer,
            updated_at: new Date().toISOString(),
          })
          .eq("id", currentFaq.id);

        if (error) throw error;
        toast.success("FAQ actualizada exitosamente");
      } else {
        const { error } = await supabase.from("faqs").insert({
          question: currentFaq.question,
          answer: currentFaq.answer,
          // opcionales:
          is_published: true,
          sort_order: 100,
        });

        if (error) throw error;
        toast.success("FAQ creada exitosamente");
      }

      setCurrentFaq({ id: "", question: "", answer: "" });
      setIsEditing(false);
      await loadFaqs();
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || "No se pudo guardar la FAQ");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (faq: FAQ) => {
    setCurrentFaq({
      id: faq.id,
      question: faq.question,
      answer: faq.answer,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    const ok = window.confirm("¿Eliminar esta FAQ definitivamente?");
    if (!ok) return;

    setDeletingId(id);
    try {
      // Si prefieres "soft delete", reemplaza por update { is_published: false }
      const { error } = await supabase.from("faqs").delete().eq("id", id);
      if (error) throw error;

      toast.success("FAQ eliminada");
      setFaqs((prev) => prev.filter((f) => f.id !== id));
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || "No se pudo eliminar la FAQ");
    } finally {
      setDeletingId(null);
    }
  };

  const handleCancel = () => {
    setCurrentFaq({ id: "", question: "", answer: "" });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            {isEditing ? "Editar FAQ" : "Nueva FAQ"}
          </h3>
          {!isEditing && (
            <Button
              variant="outline"
              onClick={() => setCurrentFaq({ id: "", question: "", answer: "" })}
            >
              <Plus className="h-4 w-4 mr-1" />
              Nueva
            </Button>
          )}
        </div>

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
            <Button type="submit" variant="accent" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Guardando...
                </>
              ) : isEditing ? (
                "Actualizar FAQ"
              ) : (
                "Crear FAQ"
              )}
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
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">FAQs Existentes</h3>
          <div className="text-sm text-muted-foreground">
            {loadingList ? (
              <span className="inline-flex items-center gap-1">
                <Loader2 className="h-4 w-4 animate-spin" />
                Cargando...
              </span>
            ) : (
              `${faqs.length} resultado(s)`
            )}
          </div>
        </div>

        {loadingList ? (
          <Card className="p-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Cargando FAQs...
            </span>
          </Card>
        ) : faqs.length === 0 ? (
          <p className="text-muted-foreground">No hay FAQs creadas aún</p>
        ) : (
          faqs.map((faq) => (
            <Card key={faq.id} className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-semibold mb-2">{faq.question}</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {faq.answer}
                  </p>
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
                    disabled={deletingId === faq.id}
                  >
                    {deletingId === faq.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4 text-destructive" />
                    )}
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
