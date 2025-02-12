// app/components/ProductCard.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Importa el componente Button de Shadcn UI
import { formatCurrency } from "@/lib/utils"; // Asumiendo que tienes una función para formatear moneda en utils
import Image from "next/image"; // Importa el componente Image de Next.js

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  // Por ahora, asumiendo que tenemos una URL de imagen principal en el producto directamente
  // En el futuro, usaremos la tabla product_images
  image_url?: string | null;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      {product.image_url && (
        <Image
          src={product.image_url}
          alt={product.name}
          className="aspect-video object-cover w-full rounded-md" // Clases para mantener la relación de aspecto y ajustar la imagen
        />
      )}
      <CardContent>
        <CardDescription>{product.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">
        <span>{formatCurrency(product.price)}</span>
        <Button>Ver Detalles</Button>{" "}
        {/* Un botón para ver la página de detalles del producto */}
      </CardFooter>
    </Card>
  );
}
