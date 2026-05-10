import { useRef, useState } from 'react';
import video05 from '../../assets/videos/video-05.mp4';
import video06 from '../../assets/videos/video-06.mp4';
import playIcon from '../../assets/icons/play-button.svg';
import starIcon from '../../assets/icons/Star.svg';

function VideoCard({ src }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    if (!ref.current) return;
    if (playing) {
      ref.current.pause();
    } else {
      ref.current.play();
    }
    setPlaying(!playing);
  }

  return (
    <div
      className="relative rounded-2xl overflow-hidden bg-bb-dark cursor-pointer aspect-video md:aspect-square"
      onClick={toggle}
    >
      <video
        ref={ref}
        src={src}
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
    <section className="bg-bb-cream py-20 md:py-28 px-4">
      <div className="max-w-[71.25rem] mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 flex flex-col items-center gap-4">
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

          <h2 className="text-bb-text-dark text-[2.25rem] md:text-[3.25rem] font-bold leading-tight">
            Don't Just Take Our Word For It
          </h2>
        </div>

        {/* Video + testimonial layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-stretch">
          <VideoCard src={video05} />

          <div className="bg-white rounded-2xl p-6 md:p-7 flex flex-col justify-center gap-4 shadow-sm">
            <p className="text-[#666] text-[0.8125rem] md:text-[0.875rem] font-medium">Adam Fa. — 35 Years</p>
            <h3 className="text-bb-text-dark text-[1.375rem] md:text-[1.75rem] font-bold leading-tight">
              Balls & Brains changing my life...
            </h3>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <img key={i} src={starIcon} alt="★" className="w-4 h-4" />
              ))}
            </div>
            <p className="text-[#424242] text-[0.875rem] md:text-[0.9375rem] leading-relaxed">
              "Love this coffee. Been telling everyone I know about it. Placebo or not, I feel less anxious, less stressed, and more focused than I have in years. And it actually tastes like coffee."
            </p>
          </div>

          <VideoCard src={video06} />
        </div>
      </div>
    </section>
  );
}
