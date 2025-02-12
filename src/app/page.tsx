// app/page.tsx
import LandingPage from "./customComponents/LandingPage";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <LandingPage />
      <Toaster />
    </div>
  );
}
