"use client";

import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const CloseSessionButton = () => {
  const router = useRouter();
  const onSubmit = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error al cerrar sesión:", error);
      toast.error("Error al cerrar sesión: " + error.message); // Muestra el mensaje de error de Supabase con Sonner
    } else {
      // Llama a toast de Sonner para mostrar la notificación de éxito
      toast.success("Sesion cerrada exitosamente.");
      router.push("/"); // Redirige a la página de inicio
    }
  };

  return <Button onClick={onSubmit}>Cerrar Sesión</Button>;
};
