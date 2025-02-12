// app/components/CategoryCard.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Importa componentes de Shadcn UI

interface Category {
  id: string;
  name: string;
  description: string | null;
}

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{category.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          {category.description || "Sin descripción"}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
