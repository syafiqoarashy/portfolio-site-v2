import Hero from '@/components/Hero';
import HelloSection from "@/components/Hello";
import WorksSection from "@/components/Works";
import VideoCarousel from "@/components/VideoCarousel";
import AboutSection from "@/components/About";
import ContactSection from "@/components/Contact";

export default function Home() {
  return (
      <main>
        <Hero />
          <HelloSection />
          <WorksSection />
          <VideoCarousel />
          <AboutSection />
          <ContactSection />
      </main>
  );
}