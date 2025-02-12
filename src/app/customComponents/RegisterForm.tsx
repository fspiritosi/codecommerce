"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form"; // Importa react-hook-form y Controller
import { zodResolver } from "@hookform/resolvers/zod"; // Importa zod resolver
import * as z from "zod"; // Importa Zod
//import { useSupabaseClient } from "@supabase/auth-helpers-react"; // Importa useSupabaseClient
import { useRouter } from "next/navigation"; // Importa useRouter
import { toast } from "sonner"; // Importa toast de Sonner
import { supabase } from "@/lib/supabase";
import { useState } from "react"; // Importa useState

// Define el schema de validación para el formulario de login con Zod
const loginSchema = z.object({
  email: z.string().email({
    message: "Por favor, introduce un email válido.",
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres.",
  }),
});

type LoginSchemaType = z.infer<typeof loginSchema>;

interface LoginFormProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
}

export function RegisterForm({ className, ...props }: LoginFormProps) {
  //const supabase  // Obtén el cliente Supabase
  const router = useRouter(); // Obtén el router de Next.js
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar el loading del botón

  // Inicializa el formulario con react-hook-form y zod
  const { control, handleSubmit } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async ({ email, password }: LoginSchemaType) => {
    setIsSubmitting(true);
    console.log(email, password);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (data) console.log(data, "sesion data");
      if (error) {
        console.error("Error al iniciar sesión:", error);
        // Llama a toast de Sonner para mostrar la notificación de error
        toast.error("Error al iniciar sesión: " + error.message); // Muestra el mensaje de error de Supabase con Sonner
      } else {
        // Llama a toast de Sonner para mostrar la notificación de éxito
        toast.success("Inicio de sesión exitoso. ¡Bienvenido de nuevo!");
        router.push("/dashboard/customer");
      }
    } catch (error) {
      console.error("Error inesperado:", error);
      // Llama a toast de Sonner para mostrar la notificación de error inesperado
      toast.error(
        "Error inesperado. Ocurrió un error inesperado. Por favor, intenta nuevamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Bienvenido a Codecommerce</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        {...field} // Spread field props para react-hook-form
                      />
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Contraseña</Label>
                    {/* <Link
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Olvidaste tu contraseña ?
                    </Link> */}
                  </div>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="password"
                        type="password"
                        required
                        {...field} // Spread field props para react-hook-form
                      />
                    )}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {" "}
                  {/* Deshabilita el botón mientras se envía */}
                  {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
                </Button>
              </div>
              <div className="text-center text-sm">
                ¿Ya tienes una cuenta?{" "}
                <Link href="#" className="underline underline-offset-4">
                  Iniciar sesión
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        Al hacer clic en continuar, aceptas nuestros{" "}
        <Link href="#">Términos de Servicio</Link> y{" "}
        <Link href="#">Política de Privacidad</Link>.
      </div>
    </div>
  );
}
