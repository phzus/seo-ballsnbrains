import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import loopVideo from '../../assets/videos/how-to-make-loop.mp4';

// Badge de texto — pill escuro com borda sutil, texto branco uppercase
function TextBadge({ children }) {
  return (
    <span className="inline-flex items-center self-start rounded-full bg-[rgba(32,32,32,0.80)] border border-bb-separator px-5 py-2.5 text-white text-[0.75rem] md:text-[0.875rem] font-medium uppercase tracking-wide">
      {children}
    </span>
  );
}

function TextBlock1() {
  return (
    <>
      <TextBadge>Ready in 30 seconds</TextBadge>
      <h2 className="text-white text-[1.75rem] md:text-[3rem] font-bold leading-tight">
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
      <TextBadge>Increase your testosterone</TextBadge>
      <h2 className="text-white text-[1.75rem] md:text-[3rem] font-bold leading-tight">
        Works like a <span className="text-bb-gold font-bold">protocol.</span>
      </h2>
      <div className="text-bb-text-dim text-[1rem] md:text-[1.4375rem] leading-relaxed space-y-4 font-medium">
        <p>The testosterone-support stack most men piece together with 6–8 separate supplements — in one scoop.</p>
        <p>Nothing to add. Nothing to remember. Nothing to swallow.</p>
      </div>
    </>
  );
}

// Play/pause baseado em visibilidade — vídeo só roda quando está na tela.
// Economiza bateria e CPU. Funciona pareado com loop pra ter background contínuo.
function useVisibilityPlayback(videoRef) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [videoRef]);
}

export default function HowToMake() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  const [text1Visible, setText1Visible] = useState(false);
  const [text2Visible, setText2Visible] = useState(false);

  useVisibilityPlayback(videoRef);

  // Trigger por POSIÇÃO de scroll dentro da section (px):
  //   Text 1: visível entre 500-1500px   (janela de 1000px)
  //   Text 2: visível entre 2600-4400px  (janela de 1800px, gap de 1100px)
  // Mesmos triggers em mobile e desktop — só o layout muda.
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

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="bg-bb-dark relative h-[calc(4400px+100vh)]"
    >
      {/* Sticky pin — conteúdo fica fixo enquanto a section rola */}
      <div className="sticky top-14 md:-top-0 h-screen overflow-hidden">
        {/* Layout: vídeo em CIMA no mobile, à ESQUERDA no desktop. Textos do outro lado. */}
        <div className="flex flex-col md:flex-row h-full">
          {/* Vídeo loop — autoplay quando visível, pausa quando sai da tela */}
          <div className="relative overflow-hidden flex-1">
            <video
              ref={videoRef}
              src={loopVideo}
              muted
              loop
              playsInline
              webkit-playsinline="true"
              preload="auto"
              autoPlay
              disablePictureInPicture
              disableRemotePlayback
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover md:object-[35%_center]"
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

          {/* Texto container — textos absolutos sobrepostos, controlados por scroll */}
          <div className="relative flex-1">
            <motion.div
              className="absolute inset-0 flex items-start md:items-center px-4 md:px-12 lg:px-16"
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{
                opacity: text1Visible ? 1 : 0,
                y: text1Visible ? 0 : 20,
                filter: text1Visible ? 'blur(0px)' : 'blur(8px)',
              }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{ pointerEvents: text1Visible ? 'auto' : 'none', zIndex: text1Visible ? 2 : 1 }}
            >
              <div className="flex flex-col gap-5 md:gap-5 max-w-[40rem]">
                <TextBlock1 />
              </div>
            </motion.div>

            <motion.div
              className="absolute inset-0 flex items-start md:items-center px-4 md:px-12 lg:px-16"
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{
                opacity: text2Visible ? 1 : 0,
                y: text2Visible ? 0 : 20,
                filter: text2Visible ? 'blur(0px)' : 'blur(8px)',
              }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{ pointerEvents: text2Visible ? 'auto' : 'none', zIndex: text2Visible ? 2 : 1 }}
            >
              <div className="flex flex-col gap-5 md:gap-5 max-w-[40rem]">
                <TextBlock2 />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
