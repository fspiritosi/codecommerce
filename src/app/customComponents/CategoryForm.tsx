// app/components/CategoryForm.tsx
"use client"; // Marca como componente de cliente para la interactividad

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
//import { useToast } from "@/hooks/use-toast"; // Importa hook para notificaciones Toast
//import { ToastAction } from "@/components/ui/toast"; // Importa componente ToastAction
import { toast } from "sonner";
// Define el schema de validación con Zod
const categorySchema = z.object({
  name: z.string().min(2, {
    message: "El nombre de la categoría debe tener al menos 2 caracteres.",
  }),
  description: z.string().optional(), // La descripción es opcional
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface CategoryFormProps {
  onCategoryCreated?: () => void; // Prop opcional para ejecutar algo después de crear la categoría
}

export function CategoryForm({ onCategoryCreated }: CategoryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar el envío del formulario
  //   const toast = useToast(); // Hook para mostrar notificaciones toast

  // Inicializa el formulario con react-hook-form y zod para la validación
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(values: CategoryFormValues) {
    setIsSubmitting(true); // Deshabilita el botón al empezar el envío
    try {
      const { data, error } = await supabase
        .from("categories")
        .insert([{ name: values.name, description: values.description }]);
      console.log(data, error);

      if (error) {
        console.error("Error al crear la categoría:", error);
        toast("Error al crear categoría", {
          description:
            "Hubo un problema al guardar la categoría. Inténtalo de nuevo.",
          //variant: "destructive", // Estilo de error
        });
      } else {
        toast("Categoría creada", {
          description: "La categoría se ha creado correctamente.",
        });
        form.reset(); // Limpia el formulario
        if (onCategoryCreated) {
          onCategoryCreated(); // Ejecuta la función de callback si se proporciona
        }
      }
    } catch (error) {
      console.error("Error inesperado:", error);
      toast("Error inesperado", {
        description:
          "Ocurrió un error inesperado. Por favor, contacta al administrador.",
        //variant: "destructive",
      });
    } finally {
      setIsSubmitting(false); // Habilita el botón nuevamente
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de la Categoría</FormLabel>
              <FormControl>
                <Input placeholder="Nombre de la categoría" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción (Opcional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descripción de la categoría"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creando..." : "Crear Categoría"}
        </Button>
      </form>
    </Form>
  );
}
