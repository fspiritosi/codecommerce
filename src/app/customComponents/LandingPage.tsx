// app/LandingPage.tsx
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="container mx-auto py-20 text-center">
      <h1 className="text-4xl font-bold mb-8">
        Bienvenido a Nuestra Tienda Online
      </h1>
      <p className="text-lg text-gray-600 mb-10">
        Descubre productos increíbles y ofertas exclusivas.
      </p>
      <div className="space-x-4">
        <Link
          href="/login"
          className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Iniciar Sesión
        </Link>
        <Link
          href="/register"
          className="inline-block bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
        >
          Registrarse
        </Link>
      </div>
    </div>
  );
}
