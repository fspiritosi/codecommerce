import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// lib/utils.ts (Ejemplo de función formatCurrency)
export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("es-ES", {
    // Formato para moneda español (puedes cambiarlo)
    style: "currency",
    currency: "ARS", // Moneda Argentine Peso (puedes cambiarlo)
  }).format(amount);
}
