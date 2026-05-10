import { useEffect, useRef, useState } from 'react';
import heroVideoMp4 from '../../assets/videos/hero.mp4';
import heroVideoWebm from '../../assets/videos/hero.webm';
import heroPoster from '../../assets/videos/hero-poster.webp';
import heroMobileMp4 from '../../assets/videos/hero-mobile.mp4';
import heroMobileWebm from '../../assets/videos/hero-mobile.webm';
import heroMobilePoster from '../../assets/videos/hero-mobile-poster.webp';
import checkIcon from '../../assets/icons/check.svg';

const CTA_URL = 'https://ballsnbrains.com/shp/tmc-adv/08/p2-v2/';

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Fallback de autoplay em mobile: se o navegador bloquear o autoplay nativo
  // (Safari iOS exige muted+playsinline mas ainda assim ocasionalmente falha),
  // chamamos .play() programaticamente quando o vídeo estiver pronto.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      const p = video.play();
      if (p && typeof p.catch === 'function') {
        p.catch(() => {
          // Autoplay bloqueado pelo navegador — fica no poster até interação do usuário.
        });
      }
    };

    if (video.readyState >= 2) {
      tryPlay();
    } else {
      video.addEventListener('loadeddata', tryPlay, { once: true });
    }

    return () => video.removeEventListener('loadeddata', tryPlay);
  }, [isMobile]);

  const videoMp4 = isMobile ? heroMobileMp4 : heroVideoMp4;
  const videoWebm = isMobile ? heroMobileWebm : heroVideoWebm;
  const videoPoster = isMobile ? heroMobilePoster : heroPoster;

  return (
    <section
      className="bg-bb-dark w-full relative overflow-hidden px-4 flex"
      style={{
        minHeight: isMobile ? undefined : 'calc(103vh - var(--alert-height, 0px))',
        marginTop: 'calc(-1 * var(--navbar-height, 0px))',
        paddingTop: 'var(--navbar-height, 0px)',
      }}
    >
      <video
        ref={videoRef}
        key={isMobile ? 'mobile' : 'desktop'}
        className={
          isMobile
            ? 'absolute top-22 left-0 w-full h-auto z-0 pointer-events-none'
            : 'absolute top-12 left-1/2 -translate-x-1/2 h-full w-auto min-w-full max-w-none object-cover object-bottom z-0 pointer-events-none'
        }
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={videoPoster}
        disablePictureInPicture
        disableRemotePlayback
        aria-hidden="true"
      >
        <source src={videoWebm} type="video/webm" />
        <source src={videoMp4} type="video/mp4" />
      </video>

      {/* Bottom fade — desktop only, suaviza transição com a próxima section (bg-bb-dark) */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute inset-x-0 bottom-0 h-40 z-5 pointer-events-none bg-linear-to-t from-bb-dark to-transparent"
      />

      <div className="relative z-10 max-w-[71.25rem] mx-auto w-full pt-68 pb-16 md:pt-4 md:pb-14 flex flex-col items-start justify-end md:justify-center gap-5">
        <span className="inline-flex items-center justify-center gap-2 bg-[rgba(32,32,32,0.80)] border border-bb-separator rounded-full px-4 md:px-8 py-1.5 text-white text-[0.8rem] md:text-[0.875rem] font-medium">
          <img src={checkIcon} alt="" className="w-3.5 h-3.5" />
          365-Days Guarantee.
        </span>

        <h1 className="text-white leading-[1.05] max-w-[40rem]">
          <span className="block text-[2.3rem] md:text-[3.125rem] font-bold mt-4">
            Your Entire<br />Testosterone Stack.
          </span>
          <span className="block text-cofee-gradient text-[1.85rem] md:text-[2.5rem] font-regular mt-4">
            One Scoop. One Coffee.
          </span>
        </h1>

        <p
          className="text-[1.02rem] md:text-[1.28rem] leading-[160%] max-w-[27.5rem] mt-1"
          style={{ color: '#C6C6C6' }}
        >
          12 clinical-dose ingredients packed into one daily testosterone mushroom coffee
        </p>

        <div className="mt-4">
          <a
            href={CTA_URL}
            className="btn-cta btn-cta-lg md:text-[1.25rem]"
            style={{ paddingLeft: '5.625rem', paddingRight: '5.625rem' }}
          >
            Try It & Save 44%
          </a>
        </div>
      </div>
    </section>
  );
}
