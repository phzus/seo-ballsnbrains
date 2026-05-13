import FadeUp from '../_shared/FadeUp';
import guaranteeStamp from '../../assets/utils/guarantee-stamp.webp';

export default function Guarantee() {
  return (
    <section className="bg-[#14100C] py-14 md:py-20 px-4">
      <div className="max-w-[71.25rem] mx-auto">
        <FadeUp className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14">
          <div className="shrink-0">
            <img
              src={guaranteeStamp}
              alt="365-Day Money-Back Guarantee"
              className="w-32 md:w-44 object-contain"
              loading="lazy"
            />
          </div>

          <div className="flex flex-col gap-3 text-center md:text-left max-w-[40rem]">
            <h2 className="text-white text-[2rem] md:text-[3.25rem] font-bold leading-tight">
              Money-Back Guarantee
            </h2>
            <p className="text-bb-text-dim text-[0.875rem] md:text-[1rem] leading-relaxed">
              If you don't feel the difference in your energy, your focus,
              and your drive — we don't want your money. Try it for a full
              year. If it doesn't work, every penny comes back.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
