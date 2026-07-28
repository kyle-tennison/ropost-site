import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Nav } from "./components/Nav";
import { PorchGap } from "./components/PorchGap";
import { ScrollProgress } from "./components/ScrollProgress";
import { System } from "./components/System";

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <PorchGap />
        <HowItWorks />
        <System />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
