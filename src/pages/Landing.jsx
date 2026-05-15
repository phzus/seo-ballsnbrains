import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar/Navbar';
import HeroSection from '../components/HeroSection/HeroSection';
import IngredientsSection from '../components/IngredientsSection/IngredientsSection';
import HowToMake from '../components/HowToMake/HowToMake';
import SocialProof from '../components/SocialProof/SocialProof';
import Results from '../components/Results/Results';
import Comparison from '../components/Comparison/Comparison';
import Reviews from '../components/Reviews/Reviews';
import Guarantee from '../components/Guarantee/Guarantee';
import FAQ from '../components/FAQ/FAQ';
import Footer from '../components/Footer/Footer';

gsap.registerPlugin(ScrollTrigger);

function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerFn = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
    };
  }, []);
}

export default function Landing() {
  useSmoothScroll();

  return (
    <div>
      <Navbar />
      <HeroSection />
      <IngredientsSection />
      <HowToMake />
      <SocialProof />
      <Results />
      <Comparison />
      <Reviews />
      <Guarantee />
      <FAQ />
      <Footer />
    </div>
  );
}
