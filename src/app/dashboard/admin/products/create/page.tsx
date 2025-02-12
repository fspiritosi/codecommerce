// app/admin/products/create/page.tsx
import { ProductForm } from "@/app/customComponents/ProductForm";

export default function CreateProductPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Crear Nuevo Producto</h1>
      <ProductForm />
    </div>
  );
}
