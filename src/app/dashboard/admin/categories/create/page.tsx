// app/admin/categories/create/page.tsx
import { CategoryForm } from "@/app/customComponents/CategoryForm";

export default function CreateCategoryPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Crear Nueva Categoría</h1>
      <CategoryForm />
    </div>
  );
}
