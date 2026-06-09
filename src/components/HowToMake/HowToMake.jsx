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
  const [pinPx, setPinPx] = useState(2150);
  const thresholdsRef = useRef({ t1Start: 250, t1End: 1000, t2Start: 1400, t2End: 2150 });

  useVisibilityPlayback(videoRef);

  // Distância de pin (px) baseada em janelas IGUAIS por texto + gap.
  // Menor no mobile que no desktop pra encurtar o tempo de scroll travado.
  useEffect(() => {
    const computeThresholds = () => {
      const isMobile = window.innerWidth < 768;
      const t = isMobile
        ? { lead: 150, win: 500, gap: 300 }
        : { lead: 250, win: 750, gap: 400 };
      const t1End = t.lead + t.win;
      const t2Start = t1End + t.gap;
      const t2End = t2Start + t.win;
      thresholdsRef.current = { t1Start: t.lead, t1End, t2Start, t2End };
      setPinPx(t2End);
    };
    const handleScroll = () => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      const s = Math.max(0, -rect.top);
      const { t1Start, t1End, t2Start, t2End } = thresholdsRef.current;
      setText1Visible(s >= t1Start && s < t1End);
      setText2Visible(s >= t2Start && s < t2End);
    };
    const handleResize = () => {
      computeThresholds();
      handleScroll();
    };
    computeThresholds();
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="bg-bb-dark relative"
      style={{ height: `calc(${pinPx}px + 100vh)` }}
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
