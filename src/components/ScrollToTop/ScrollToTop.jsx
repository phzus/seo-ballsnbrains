import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Joga a página pro topo a cada troca de rota. Roda em useLayoutEffect (antes dos
// useEffect das páginas) pra que o Lenis de cada página já inicialize em scroll 0,
// evitando parar na mesma altura da página anterior. Reseta o Lenis ativo (quando
// exposto em window.__lenis) como reforço, já que ele controla o scroll.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const toTop = () => {
      window.scrollTo(0, 0);
      window.__lenis?.scrollTo(0, { immediate: true });
    };

    toTop();
    // Garante o topo após o Lenis da nova página montar (effect passivo).
    const raf = requestAnimationFrame(toTop);
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
}
