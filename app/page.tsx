import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Work from "@/components/Work";
import Services from "@/components/Services";
import Deploy from "@/components/Deploy";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <main>
      <Hero />
      <Work />
      <Marquee />
      <Services />
      <Deploy />
      <Experience />
      <Contact />
      <Footer />
      <BackToTop />
    </main>
  );
}
