// app/components/ProductForm.tsx
"use client";

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
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Importa componentes Select de Shadcn UI

// Define el schema de validación para el producto
const productSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre del producto debe tener al menos 2 caracteres.",
  }),
  description: z.string().min(10, {
    message: "La descripción debe tener al menos 10 caracteres.",
  }),
  price: z.coerce.number().positive({
    // z.coerce.number() para convertir string a número
    message: "El precio debe ser un número positivo.",
  }),
  stock: z.coerce.number().int().min(0, {
    message: "El stock debe ser un número entero no negativo.",
  }),
  category_id: z.string().uuid({
    // Valida que sea un UUID válido (de categoría)
    message: "Debes seleccionar una categoría.",
  }),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  onProductCreated?: () => void; // Callback opcional al crear producto
}

export function ProductForm({ onProductCreated }: ProductFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]); // Estado para las categorías
  const [loadingCategories, setLoadingCategories] = useState(true); // Estado de carga de categorías

  // Define la interfaz Category para tipar las categorías
  interface Category {
    id: string;
    name: string;
  }

  // Hook para cargar las categorías al montar el componente
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const { data, error } = await supabase
          .from("categories")
          .select("id, name")
          .order("name");

        if (error) {
          console.error("Error fetching categories:", error);
          toast("Error al cargar categorías", {
            description:
              "No se pudieron cargar las categorías. Inténtalo de nuevo.",
          });
        } else if (data) {
          setCategories(data as Category[]); // Castea data a Category[]
        }
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      category_id: "",
    },
  });

  async function onSubmit(values: ProductFormValues) {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("products").insert([
        {
          name: values.name,
          description: values.description,
          price: values.price,
          stock: values.stock,
          category_id: values.category_id,
        },
      ]);

      if (error) {
        console.error("Error al crear el producto:", error);
        toast("Error al crear producto", {
          description:
            "Hubo un problema al guardar el producto. Inténtalo de nuevo.",
        });
      } else {
        toast("Producto creado", {
          description: "El producto se ha creado correctamente.",
        });
        form.reset();
        if (onProductCreated) {
          onProductCreated();
        }
      }
    } catch (error) {
      console.error("Error inesperado:", error);
      toast("Error inesperado", {
        description:
          "Ocurrió un error inesperado. Por favor, contacta al administrador.",
      });
    } finally {
      setIsSubmitting(false);
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
              <FormLabel>Nombre del Producto</FormLabel>
              <FormControl>
                <Input placeholder="Nombre del producto" {...field} />
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
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descripción del producto"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Precio</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Precio del producto"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Stock disponible"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoría</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {loadingCategories ? (
                    <SelectItem disabled value="loading">
                      Cargando categorías...
                    </SelectItem>
                  ) : (
                    categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creando..." : "Crear Producto"}
        </Button>
      </form>
    </Form>
  );
}
