import { Contact } from "./components/Contact";
import { Figure } from "./components/Figure";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Nav } from "./components/Nav";
import { PorchGap } from "./components/PorchGap";
import { ScrollProgress } from "./components/ScrollProgress";

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <PorchGap />
        <HowItWorks />
        <div className="bleed">
          <Figure
            name="dock"
            ratio={1.578}
            sizes="100vw"
            alt="Inside the truck: the carrier robot docked on a rail alongside shelves of packages, with the loading arm overhead and the street visible through the open side."
            caption="Rendered CAD model — hardware in development"
          />
        </div>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
