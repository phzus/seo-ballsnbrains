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

// Placeholder reservando altura aproximada da section pra evitar CLS quando o chunk lazy chega
const Placeholder = ({ minHeight }) => (
  <div aria-hidden="true" style={{ minHeight }} />
);

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
      {/* Suspense por componente, cada um com placeholder de altura aproximada
          pra que o slot da section já fique reservado no DOM e a chegada do chunk
          não cause layout shift (CLS). */}
      <Suspense fallback={<Placeholder minHeight="1600px" />}>
        <IngredientsSection />
      </Suspense>
      <Suspense fallback={<Placeholder minHeight="5200px" />}>
        <HowToMake />
      </Suspense>
      <Suspense fallback={<Placeholder minHeight="800px" />}>
        <SocialProof />
      </Suspense>
      <Suspense fallback={<Placeholder minHeight="1900px" />}>
        <Results />
      </Suspense>
      <Suspense fallback={<Placeholder minHeight="1000px" />}>
        <Comparison />
      </Suspense>
      <Suspense fallback={<Placeholder minHeight="700px" />}>
        <Reviews />
      </Suspense>
      <Suspense fallback={<Placeholder minHeight="400px" />}>
        <Guarantee />
      </Suspense>
      <Suspense fallback={<Placeholder minHeight="1500px" />}>
        <FAQ />
      </Suspense>
      <Suspense fallback={<Placeholder minHeight="200px" />}>
        <Footer />
      </Suspense>
    </div>
  );
}
