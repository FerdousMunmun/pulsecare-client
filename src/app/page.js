import ContactUsSection from "@/components/ContactUsSection";
import FeaturedSection from "@/components/FeaturedSection";
import HeroSection from "@/components/HeroSection";



export default function Home() {
  return (
    <div className="">
      <HeroSection/>
      <div className="mt-24">
<FeaturedSection/>
      </div>
      <ContactUsSection/>
      
      
    </div>
  );
}
