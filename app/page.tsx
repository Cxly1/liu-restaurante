import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { StickyDishes } from "@/components/sticky-dishes";
import { VelocityMarquee } from "@/components/velocity-marquee";
import { WokStory } from "@/components/wok-story";
import { MenuPan } from "@/components/menu-pan";
import { Testimonials } from "@/components/testimonials";
import { Faq } from "@/components/faq";
import { ReserveFooter } from "@/components/reserve-footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StickyDishes />
        <VelocityMarquee />
        <WokStory />
        <MenuPan />
        <Testimonials />
        <Faq />
        <ReserveFooter />
      </main>
    </>
  );
}
