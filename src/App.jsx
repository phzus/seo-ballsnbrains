import { Suspense, lazy, useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Above-the-fold — carregados no bundle inicial (sem lazy) pra não atrasar FCP
import AlertBanner from './components/AlertBanner/AlertBanner';
import Navbar from './components/Navbar/Navbar';
import HeroSection from './components/HeroSection/HeroSection';

// Below-the-fold — code split via React.lazy. Cada chunk só baixa quando o usuário
// scrolla (ou imediatamente em background — depende do navegador).
const IngredientsSection = lazy(() => import('./components/IngredientsSection/IngredientsSection'));
const HowToMake = lazy(() => import('./components/HowToMake/HowToMake'));
const SocialProof = lazy(() => import('./components/SocialProof/SocialProof'));
const Results = lazy(() => import('./components/Results/Results'));
const Comparison = lazy(() => import('./components/Comparison/Comparison'));
const Reviews = lazy(() => import('./components/Reviews/Reviews'));
const Guarantee = lazy(() => import('./components/Guarantee/Guarantee'));
const FAQ = lazy(() => import('./components/FAQ/FAQ'));
const Footer = lazy(() => import('./components/Footer/Footer'));

gsap.registerPlugin(ScrollTrigger);

// Smooth scroll global via Lenis, sincronizado com GSAP ScrollTrigger
function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Lenis dispara o evento "scroll" — ScrollTrigger se atualiza junto
    lenis.on('scroll', ScrollTrigger.update);

    // gsap.ticker pilota o requestAnimationFrame do Lenis (em vez de RAF próprio)
    // Garante sincronia perfeita entre Lenis e timelines do GSAP
    const tickerFn = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
    };
  }, []);
}

export default function App() {
  useSmoothScroll();

  return (
    <div>
      <AlertBanner />
      <Navbar />
      <HeroSection />
      {/* Suspense com fallback null — componentes abaixo da fold não precisam
          mostrar nada enquanto o chunk não chega (o usuário ainda nem rolou pra cá). */}
      <Suspense fallback={null}>
        <IngredientsSection />
        <HowToMake />
        <SocialProof />
        <Results />
        <Comparison />
        <Reviews />
        <Guarantee />
        <FAQ />
        <Footer />
      </Suspense>
    </div>
  );
}
