import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import FadeUp from '../_shared/FadeUp';
import video05 from '../../assets/videos/video-05.mp4';
import video06 from '../../assets/videos/video-06.mp4';
import poster05 from '../../assets/images/poster-video-05.webp';
import poster06 from '../../assets/images/poster-video-06.webp';
import playIcon from '../../assets/icons/play-button.svg';
import starIcon from '../../assets/icons/Star.svg';

const testimonials = [
  {
    name: 'Adam Fa.',
    age: '35 Years',
    title: 'Balls & Brains changing my life...',
    body: '"Love this coffee. Been telling everyone I know about it. Placebo or not, I feel less anxious, less stressed, and more focused than I have in years. And it actually tastes like coffee."',
    media: { type: 'video', src: video05, poster: poster05 },
  },
  {
    name: 'Carl R.',
    age: '38 Years',
    title: 'Finally something that works',
    body: '"My wife noticed before I did. More energy, better sleep, no afternoon crash. The fact that it tastes like real coffee is the cherry on top."',
    media: { type: 'video', src: video06, poster: poster06 },
  },
];

// MediaSlot = bloco quadrado standalone (vídeo ou imagem placeholder)
function MediaSlot({ media }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);

  // iOS Safari fix: <video> aparece preto antes do primeiro play. Truque:
  // muta, dá play() pra iOS aceitar (muted autoplay é permitido), pausa em 0,
  // desmuta. Resultado: primeiro frame visível e áudio funciona ao tocar.
  useEffect(() => {
    if (media.type !== 'video') return;
    const video = ref.current;
    if (!video) return;

    const showFirstFrame = () => {
      if (playing) return;
      video.muted = true;
      const p = video.play();
      if (p !== undefined) {
        p.then(() => {
          video.pause();
          video.currentTime = 0;
          video.muted = false;
        }).catch(() => {
          try { video.currentTime = 0.001; } catch (e) {}
          video.muted = false;
        });
      }
    };

    if (video.readyState >= 2) showFirstFrame();
    else video.addEventListener('loadeddata', showFirstFrame, { once: true });

    return () => video.removeEventListener('loadeddata', showFirstFrame);
  }, [media.type, playing]);

  function togglePlay() {
    if (!ref.current) return;
    if (playing) ref.current.pause();
    else ref.current.play();
    setPlaying(!playing);
  }

  if (media.type === 'image') {
    return (
      <div
        className="hover-lift w-full aspect-square bg-bb-dark rounded-2xl overflow-hidden"
        style={{
          backgroundImage: `url(${media.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    );
  }

  return (
    <div
      className="hover-lift relative w-full aspect-square bg-bb-dark rounded-2xl overflow-hidden cursor-pointer"
      onClick={togglePlay}
      style={
        media.poster
          ? { backgroundImage: `url(${media.poster})`, backgroundSize: 'cover', backgroundPosition: 'center' }
          : undefined
      }
    >
      <video
        ref={ref}
        src={media.src}
        poster={media.poster}
        className="w-full h-full object-cover"
        playsInline
        webkit-playsinline="true"
        preload="auto"
        onEnded={() => setPlaying(false)}
      />
      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-bb-gold flex items-center justify-center shadow-lg">
            <img src={playIcon} alt="Play" className="w-8 h-8 md:w-10 md:h-10 ml-1" />
          </div>
        </div>
      )}
    </div>
  );
}

// TestimonialCard = bloco quadrado standalone com o texto do depoimento
function TestimonialCard({ t }) {
  return (
    <div className="hover-lift w-full md:aspect-square aspect-[6/5] bg-white border border-black/10 rounded-2xl overflow-hidden p-5 md:p-6 flex flex-col gap-2 md:gap-3 justify-center">
      <p className="text-[#666] text-[0.8125rem] md:text-[0.875rem] font-medium">
        {t.name} — {t.age}
      </p>
      <h3 className="text-bb-text-dark text-[1.55rem] md:text-[2rem] font-bold leading-tight">
        {t.title}
      </h3>
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, j) => (
          <img key={j} src={starIcon} alt="★" className="w-4 h-4" />
        ))}
      </div>
      <p className="text-[#424242] text-[0.8125rem] md:text-[0.875rem] leading-[15s0%]">
        {t.body}
      </p>
    </div>
  );
}

export default function SocialProof() {
  // Detecta breakpoint sincronicamente pra evitar flash na primeira render
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(min-width: 768px)').matches;
  });

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const handler = () => setIsDesktop(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Pausa autoplay ao interagir, retoma 3s depois da última interação
  const swiperRef = useRef(null);
  const resumeTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const handleTouchStart = () => {
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  };

  const handleTouchEnd = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      swiperRef.current?.autoplay?.start();
    }, 3000);
  };

  return (
    <section className="bg-bb-cream py-20 md:py-28 overflow-hidden">
      {/* Header — constrained */}
      <FadeUp className="max-w-[71.25rem] mx-auto px-4 text-center mb-12 md:mb-16 flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <img key={i} src={starIcon} alt="★" className="w-5 h-5" />
            ))}
          </div>
          <span
            className="text-bb-text-dark text-[0.75rem] md:text-[0.8125rem] font-bold uppercase tracking-wide bg-bb-gold/30 border border-bb-gold/60 rounded-full px-3 py-1"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            61,028 Reviews
          </span>
        </div>

        <h2 className="text-bb-text-dark text-[1.75rem] md:text-[3rem] font-bold leading-tight">
          Don't Just Take Our Word For It
        </h2>
      </FadeUp>

      {/* Carrossel — desktop: slides ALTERNADOS (media, card, media, card, ...). Mobile: cada slide = media + card empilhados.
          spaceBetween 12px entre slides, loop pra efeito infinito, full-width sem padding lateral.
          key força remount ao trocar breakpoint (evita estado inconsistente do Swiper). */}
      <Swiper
        key={isDesktop ? 'desktop' : 'mobile'}
        modules={[Autoplay]}
        slidesPerView={isDesktop ? 3.5 : 1.25}
        centeredSlides={!isDesktop}
        spaceBetween={12}
        slidesOffsetBefore={isDesktop ? 20 : 0}
        slidesOffsetAfter={isDesktop ? 20 : 0}
        loop
        loopAdditionalSlides={6}
        speed={5000}
        autoplay={{
          delay: 0,
          disableOnInteraction: true,
          pauseOnMouseEnter: false,
          reverseDirection: true,
        }}
        allowTouchMove
        onSwiper={(s) => { swiperRef.current = s; }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="social-marquee py-3!"
      >
        {(() => {
          // Duplica os testimonials 2x — buffer mínimo pro loop do Swiper funcionar
          // nas duas direções, mas com menos <video> no DOM (iOS Safari sofre com muitos).
          const buffered = Array.from({ length: 2 }).flatMap(() => testimonials);
          return isDesktop
            ? buffered.flatMap((t, i) => [
                <SwiperSlide key={`${i}-media`} className="h-auto!">
                  <MediaSlot media={t.media} />
                </SwiperSlide>,
                <SwiperSlide key={`${i}-card`} className="h-auto!">
                  <TestimonialCard t={t} />
                </SwiperSlide>,
              ])
            : buffered.map((t, i) => (
                <SwiperSlide key={i} className="h-auto!">
                  <div className="flex flex-col gap-3">
                    <MediaSlot media={t.media} />
                    <TestimonialCard t={t} />
                  </div>
                </SwiperSlide>
              ));
        })()}
      </Swiper>
    </section>
  );
}
