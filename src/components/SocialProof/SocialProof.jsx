import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import FadeUp from '../_shared/FadeUp';
import video05 from '../../assets/videos/video-05.mp4';
import video06 from '../../assets/videos/video-06.mp4';
import placeholderImg from '../../assets/images/img-results-day30.webp';
import playIcon from '../../assets/icons/play-button.svg';
import starIcon from '../../assets/icons/Star.svg';

const testimonials = [
  {
    name: 'Adam Fa.',
    age: '35 Years',
    title: 'Balls & Brains changing my life...',
    body: '"Love this coffee. Been telling everyone I know about it. Placebo or not, I feel less anxious, less stressed, and more focused than I have in years. And it actually tastes like coffee."',
    media: { type: 'video', src: video05 },
  },
  {
    // TODO: substituir copy quando vier do cliente; vídeo deste slot ainda não chegou (placeholder image)
    name: 'Brian L.',
    age: '42 Years',
    title: "Best supplement I've ever taken",
    body: '"Tried every adaptogen on the market. Most are garbage. This one actually does what it claims. Cortisol down, T up, focus locked in. It\'s become my morning ritual."',
    media: { type: 'image', src: placeholderImg },
  },
  {
    name: 'Carl R.',
    age: '38 Years',
    title: 'Finally something that works',
    body: '"My wife noticed before I did. More energy, better sleep, no afternoon crash. The fact that it tastes like real coffee is the cherry on top."',
    media: { type: 'video', src: video06 },
  },
];

function MediaSlot({ media }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);

  function togglePlay() {
    if (!ref.current) return;
    if (playing) ref.current.pause();
    else ref.current.play();
    setPlaying(!playing);
  }

  if (media.type === 'image') {
    return (
      <div
        className="w-full aspect-square md:w-[50%] md:shrink-0 bg-bb-dark"
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
      className="relative w-full aspect-square md:w-[50%] md:shrink-0 bg-bb-dark cursor-pointer"
      onClick={togglePlay}
    >
      <video
        ref={ref}
        src={media.src}
        className="w-full h-full object-cover"
        playsInline
        preload="metadata"
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

export default function SocialProof() {
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
            style={{ fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}
          >
            61,028 Reviews
          </span>
        </div>

        <h2 className="text-bb-text-dark text-[2rem] md:text-[3.25rem] font-bold leading-tight">
          Don't Just Take Our Word For It
        </h2>
      </FadeUp>

      {/* Swiper full-width — 1.1 mobile (com peek), 2.5 desktop, slides centralizados */}
      <Swiper
        slidesPerView={1.1}
        centeredSlides
        spaceBetween={32}
        loop
        breakpoints={{ 768: { slidesPerView: 2.5, spaceBetween: 32 } }}
      >
        {testimonials.map((t, i) => (
          <SwiperSlide key={i} className="h-auto!">
            <div className="bg-white rounded-2xl overflow-hidden flex flex-col md:flex-row gap-5">
              <MediaSlot media={t.media} />
              <div className="w-full md:w-[50%] aspect-square p-6 md:p-10 flex flex-col gap-3 md:gap-4 justify-center">
                <p className="text-[#666] text-[0.8125rem] md:text-[0.875rem] font-medium">
                  {t.name} — {t.age}
                </p>
                <h3 className="text-bb-text-dark text-[1.375rem] md:text-[1.75rem] font-bold leading-tight">
                  {t.title}
                </h3>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <img key={j} src={starIcon} alt="★" className="w-4 h-4" />
                  ))}
                </div>
                <p className="text-[#424242] text-[0.875rem] md:text-[0.9375rem] leading-relaxed">
                  {t.body}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
