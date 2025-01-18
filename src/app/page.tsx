'use client'

import Main from "@/ui/home/Main";
import Features from "@/ui/home/Features";
import FeaturesOne from "@/ui/home/FeatureOne";
import { ParallaxProvider } from "react-scroll-parallax";

export default function Page() {
  return (
    <ParallaxProvider>
    <main>
      <section className="relative">
        <Main />
      </section>
      <section className="py-32 relative overflow-hidden">
      <Features />
      </section>
      <section className="min-h-screen relative overflow-hidden flex items-center">
        <FeaturesOne />
      </section>
      <section>

      </section>
      <footer>

      </footer>
    </main>
    </ParallaxProvider>
  );
}
