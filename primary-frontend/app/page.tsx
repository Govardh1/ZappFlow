import { AppBar } from "@/components/AppBar";
import { Hero } from "@/components/Hero";
import { HeroVedio } from "@/components/HeroVedio";
import Image from "next/image";

export default function Home() {
  return (
      <main className="pb-48">
      <AppBar/>
      <Hero />
      <HeroVedio/>
      </main>
   
  );
}
