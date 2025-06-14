import HeroSection from "../components/hero";
import AboutSection from "../components/about";

export default function Home() {
  return (
    <div className="mt-8 md:-mt-4"> {/* Apply -mt-8 on mobile, reset on md+ */}
      <HeroSection />
      <AboutSection />
    </div>
  );
}
