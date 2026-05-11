import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import sequenceVideo from '../../assets/videos/scroll-sequence.mp4';
import logoBadge from '../../assets/utils/footer-logo.svg';
import FadeUp from '../_shared/FadeUp';

function LogoBadge() {
  return (
    <div className="inline-flex items-center gap-2 bg-bb-gold rounded-lg px-3 py-2 self-start">
      <img src={logoBadge} alt="B&B" className="h-5 w-auto" />
    </div>
  );
}

function TextBlock1() {
  return (
    <>
      <LogoBadge />
      <h2 className="text-white text-[2rem] md:text-[3.25rem] font-bold leading-tight">
        Tastes like <span className="text-bb-gold font-bold">coffee.</span>
      </h2>
      <div className="text-bb-text-dim text-[1rem] md:text-[1.4375rem] leading-relaxed space-y-4 font-medium">
        <p>It tastes like the coffee you already drink.</p>
        <p>The difference is what happens after — no crash at 2pm, no jitters, no reaching for a second cup.</p>
        <p>Just steady, clean energy that carries you through the day.</p>
      </div>
    </>
  );
}

function TextBlock2() {
  return (
    <>
      <LogoBadge />
      <h2 className="text-white text-[2rem] md:text-[3.25rem] font-bold leading-tight">
        Works like a <span className="text-bb-gold font-bold">protocol.</span>
      </h2>
      <div className="text-bb-text-dim text-[1rem] md:text-[1.4375rem] leading-relaxed space-y-4 font-medium">
        <p>The testosterone-support stack most men piece together with 6–8 separate supplements — in one scoop.</p>
        <p>Nothing to add. Nothing to remember. Nothing to swallow.</p>
      </div>
    </>
  );
}

// Práticas de autoplay da Hero — programmatic play fallback + promise catch
function useVideoAutoplay(ref) {
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const tryPlay = () => {
      const p = video.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    };
    if (video.readyState >= 2) tryPlay();
    else video.addEventListener('loadeddata', tryPlay, { once: true });
    return () => video.removeEventListener('loadeddata', tryPlay);
  }, [ref]);
}

export default function HowToMake() {
  const sectionRef = useRef(null);
  const desktopVideoRef = useRef(null);
  const mobileVideoRef = useRef(null);

  const [text1Visible, setText1Visible] = useState(false);
  const [text2Visible, setText2Visible] = useState(false);

  useVideoAutoplay(desktopVideoRef);
  useVideoAutoplay(mobileVideoRef);

  // Trigger por POSIÇÃO de scroll dentro da section (px):
  //   Text 1: visível entre 500-1500px   (janela de 1000px)
  //   Text 2: visível entre 2600-4400px  (janela de 1800px, gap de 1100px)
  // Ambos fitam dentro do sticky range da section (4400px+100vh).
  // Transição de opacidade é TEMPO-baseada (1s).
  useEffect(() => {
    const handleScroll = () => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      const scrollInSection = Math.max(0, -rect.top);
      setText1Visible(scrollInSection >= 500 && scrollInSection < 1500);
      setText2Visible(scrollInSection >= 2600 && scrollInSection < 4400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const videoProps = {
    src: sequenceVideo,
    autoPlay: true,
    loop: true,
    muted: true,
    playsInline: true,
    preload: 'auto',
    disablePictureInPicture: true,
    disableRemotePlayback: true,
    'aria-hidden': true,
  };

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="bg-bb-dark relative md:h-[calc(4400px+100vh)]"
    >
      {/* ============ Mobile (texto → vídeo → texto, alternado) ============ */}
      <div className="md:hidden flex flex-col gap-20">
        <FadeUp className="flex flex-col gap-5 px-4 pt-20">
          <TextBlock1 />
        </FadeUp>

        {/* Vídeo grande, centralizado, extravasa a viewport horizontalmente
            (clipado pelo overflow-hidden do pai → sem scroll lateral na página) */}
        <div className="relative h-[50vh] overflow-hidden">
          <video
            {...videoProps}
            ref={mobileVideoRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-full object-cover"
          />
          {/* Fade vertical sutil → dissolve no bg-bb-dark em cima e embaixo */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, #0a0908 0%, transparent 12%, transparent 88%, #0a0908 100%)',
            }}
          />
        </div>

        <FadeUp className="flex flex-col gap-5 px-4 pb-20">
          <TextBlock2 />
        </FadeUp>
      </div>

      {/* ============ Desktop ============ */}
      <div className="hidden md:block sticky top-0 h-screen overflow-hidden md:mb-60 mb-0">
        <div className="grid grid-cols-2 h-full">
          {/* Esquerda — vídeo, conteúdo levemente puxado pra direita do frame */}
          <div className="relative overflow-hidden h-full">
            <video
              {...videoProps}
              ref={desktopVideoRef}
              className="absolute inset-0 w-full h-full object-cover object-[35%_center]"
            />
            {/* Fade vertical sutil → dissolve no bg-bb-dark em cima e embaixo */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, #0a0908 0%, transparent 12%, transparent 88%, #0a0908 100%)',
              }}
            />
          </div>

          {/* Direita — textos absolutos sobrepostos, opacity + leve slide-up controlados por scroll */}
          <div className="relative">
            <motion.div
              className="absolute inset-0 flex items-center px-12 lg:px-16"
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{
                opacity: text1Visible ? 1 : 0,
                y: text1Visible ? 0 : 20,
                filter: text1Visible ? 'blur(0px)' : 'blur(8px)',
              }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{ pointerEvents: text1Visible ? 'auto' : 'none', zIndex: text1Visible ? 2 : 1 }}
            >
              <div className="flex flex-col gap-5 max-w-[40rem]">
                <TextBlock1 />
              </div>
            </motion.div>

            <motion.div
              className="absolute inset-0 flex items-center px-12 lg:px-16"
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{
                opacity: text2Visible ? 1 : 0,
                y: text2Visible ? 0 : 20,
                filter: text2Visible ? 'blur(0px)' : 'blur(8px)',
              }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{ pointerEvents: text2Visible ? 'auto' : 'none', zIndex: text2Visible ? 2 : 1 }}
            >
              <div className="flex flex-col gap-5 max-w-[40rem]">
                <TextBlock2 />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
