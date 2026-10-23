import TopBar from "@/components/TopBar";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import CardsSection from "@/components/CardsSection";
import NewsSection from "@/components/NewsSection";
import StatsBand from "@/components/StatsBand";
import MissionSection from "@/components/MissionSection";
import EventsSection from "@/components/EventsSection";
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <>
      <TopBar />
      <NavBar />
      <Hero />
      <CardsSection />
      <NewsSection />
      <StatsBand />
      <MissionSection />
      <EventsSection />
      <Footer />
    </>
  );
}
