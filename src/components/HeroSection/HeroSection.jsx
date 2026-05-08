import heroVideoMp4 from '../../assets/videos/hero.mp4';
import heroVideoWebm from '../../assets/videos/hero.webm';
import heroPoster from '../../assets/videos/hero-poster.webp';
import checkIcon from '../../assets/icons/check.svg';

const CTA_URL = 'https://ballsnbrains.com/shp/tmc-adv/08/p2-v2/';

export default function HeroSection() {
  return (
    <section className="bg-bb-dark w-full relative overflow-hidden px-6 min-h-[calc(100vh-40px)] -mt-[88px] md:-mt-[96px] pt-[88px] md:pt-[96px] flex">
      <video
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={heroPoster}
        aria-hidden="true"
      >
        <source src={heroVideoWebm} type="video/webm" />
        <source src={heroVideoMp4} type="video/mp4" />
      </video>

      <div className="relative z-10 max-w-[1140px] mx-auto w-full py-10 md:py-14 flex flex-col items-start justify-center gap-5">
        <span className="inline-flex items-center gap-2 bg-bb-dark/80 border border-bb-separator rounded-full px-4 py-1.5 text-white text-[13px] md:text-[14px] font-medium">
          <img src={checkIcon} alt="" className="w-3.5 h-3.5" />
          365-Days Guarantee.
        </span>

        <h1 className="text-white leading-[1.05] max-w-[640px]">
          <span className="block text-[34px] md:text-[40px] font-bold">
            Your Entire<br />Testosterone Stack.
          </span>
          <span className="block text-bb-gold text-[26px] md:text-[30px] font-medium italic mt-2">
            One Scoop. One Coffee.
          </span>
        </h1>

        <p
          className="text-[16px] leading-relaxed max-w-[420px] mt-1"
          style={{ color: '#C6C6C6' }}
        >
          12 clinical-dose ingredients packed into one daily testosterone mushroom coffee
        </p>

        <div className="mt-3">
          <a href={CTA_URL} className="btn-cta btn-cta-lg">
            Try It & Save 44%
          </a>
        </div>
      </div>
    </section>
  );
}
