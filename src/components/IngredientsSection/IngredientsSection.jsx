import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import FadeUp from '../_shared/FadeUp';
import benefit01 from '../../assets/icons/benefit-01.svg';
import benefit02 from '../../assets/icons/benefit-02.svg';
import benefit03 from '../../assets/icons/benefit-03.svg';
import benefit04 from '../../assets/icons/benefit-04.svg';
import benefit05 from '../../assets/icons/benefit-05.svg';
import benefit06 from '../../assets/icons/benefit-06.svg';
import benefit07 from '../../assets/icons/benefit-07.svg';
import card01 from '../../assets/ingredients/img-card-01-Tongkat Ali LJ100®.webp';
import card02 from '../../assets/ingredients/img-card-02-Shilajit.webp';
import card03 from '../../assets/ingredients/img-card-03-Zinc Glycinate.webp';
import card04 from '../../assets/ingredients/img-card-04-Ashwagandha KSM-66®.webp';
import card05 from '../../assets/ingredients/img-card-05-Cholecalciferol (Vitamin D).webp';
import card06 from "../../assets/ingredients/img-card-06-Lion's Mane.webp";
import card07 from '../../assets/ingredients/img-card-07-Reishi.webp';
import card08 from '../../assets/ingredients/img-card-08-Cordyceps Militaris.webp';
import card09 from '../../assets/ingredients/img-card-09-L-Theanine.webp';
import card10 from '../../assets/ingredients/img-card-10-Chaga.webp';
import card11 from '../../assets/ingredients/img-card-11-Caffeine.webp';
import card12 from '../../assets/ingredients/img-card-12-Organic Arabica Coffee.webp';

const ingredients = [
  { img: card01, name: 'Tongkat Ali LJ100®', dose: '300 mg', claim: 'Increased testosterone by 37% and reduced cortisol by 16% in 4 weeks.' },
  { img: card02, name: 'Shilajit', dose: '250 mg', claim: 'Increased total testosterone by 20% in healthy men over 90 days.' },
  { img: card03, name: 'Zinc Glycinate', dose: '15 mg', claim: 'Zinc supplementation nearly doubled serum testosterone in deficient elderly men.' },
  { img: card04, name: 'Ashwagandha KSM-66®', dose: '300 mg', claim: 'Reduced cortisol levels by 27.9% in 60 days.' },
  { img: card05, name: 'Cholecalciferol (Vitamin D)', dose: '2,000 IU', claim: 'Men supplementing Vitamin D saw a 25% increase in total testosterone over 12 months.' },
  { img: card06, name: "Lion's Mane", dose: '1,000 mg', claim: 'Significant cognitive improvement in adults with mild cognitive impairment over 16 weeks.' },
  { img: card07, name: 'Reishi', dose: '500 mg', claim: 'Shown to support sleep quality by modulating serotonin pathways.' },
  { img: card08, name: 'Cordyceps Militaris', dose: '1,000 mg', claim: 'Improved VO2max and increased time to exhaustion by 70 seconds in 3 weeks.' },
  { img: card09, name: 'L-Theanine', dose: '100 mg', claim: 'Combined with caffeine, improved attention accuracy and reduced mental fatigue.' },
  { img: card10, name: 'Chaga', dose: '500 mg', claim: 'Rich in polysaccharides with demonstrated antioxidant and immunomodulatory properties.' },
  { img: card11, name: 'Caffeine', dose: '100 mg', claim: 'Significantly improved attention, processing speed, and accuracy across 13 studies.' },
  { img: card12, name: 'Organic Arabica Coffee', dose: '50 mg', claim: 'The base. Smooth flavor profile, low acidity. The ritual stays the same.' },
];

const benefits = [
  { icon: benefit01, label: 'cGMP Certified Facility' },
  { icon: benefit02, label: 'Hormone-Free' },
  { icon: benefit03, label: 'Third-Party Tested' },
  { icon: benefit04, label: 'Vegan' },
  { icon: benefit05, label: 'Non-GMO' },
  { icon: benefit06, label: 'Made in USA' },
  { icon: benefit07, label: 'No Fillers' },
];

export default function IngredientsSection() {
  return (
    <section id="ingredients" className="bg-bb-dark py-20 md:py-28 px-4 md:px-20">
      {/* Heading */}
      <FadeUp className="mb-14 md:mb-20 text-center">
        <h2 className="text-[2rem] md:text-[3.25rem] font-bold leading-tight">
          <span className="text-cofee-gradient">12 Clinical-Dose</span>
          <br />
          <span className="text-white">Ingredients in 1 Cup</span>
        </h2>
        <p className="text-bb-text-dim text-[0.9375rem] md:text-[1.125rem] leading-relaxed mt-4 max-w-[32rem] mx-auto">
          Industrial coffee floods your body with cortisol every morning.
          Cortisol suppresses testosterone. We fix that.
        </p>
      </FadeUp>

      {/* Ingredients grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
          {ingredients.map((item, i) => (
            <FadeUp
              key={i}
              delay={(i % 4) * 0.05}
              className={`relative rounded-lg overflow-hidden flex flex-col items-center justify-center text-center md:aspect-square aspect-auto border border-[#2d2d2d] px-2 ${i === 9 || i === 10 ? 'md:px-6' : 'md:px-12'} py-4 md:py-6`}
              style={{
                backgroundImage: `url(${item.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Number badge */}
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-bb-cream-warm flex items-center justify-center text-bb-dark text-[0.875rem] md:text-[1.4rem] font-normal">
                {i + 1}
              </div>

              {/* Title */}
              <h3 className="text-bb-cream-warm font-bold text-[1.125rem] md:text-[1.8rem] leading-tight mt-3 md:mt-4">
                {item.name}
              </h3>

              {/* Description */}
              <p className="text-white/85 text-[0.725rem] md:text-[1.1rem] leading-snug mt-2 md:mt-3">
                {item.claim}
              </p>

              {/* Dose */}
              <span className="mt-3 md:mt-4 text-bb-text-dark text-[0.875rem] md:text-[1rem] font-medium bg-white rounded-full px-6 md:px-6 py-1 md:py-1.5">
                {item.dose}
              </span>
            </FadeUp>
          ))}
        </div>

      {/* Benefits carousel — full-width mobile (quebra px-4), 85% no desktop, fade lateral */}
      <div
        className="mt-16 -mx-4 md:mx-auto md:w-[85%] benefits-marquee"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <Swiper
          modules={[Autoplay, FreeMode]}
          slidesPerView="auto"
          spaceBetween={32}
          loop
          freeMode={{ enabled: true, momentum: false }}
          speed={4500}
          autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: false }}
          allowTouchMove={false}
        >
          {benefits.map((b, i) => (
            <SwiperSlide key={i} className="w-auto! flex items-center">
              <div className="flex items-center gap-x-8">
                <img src={b.icon} alt={b.label} className="h-6 w-auto" />
                <span aria-hidden="true" className="w-[2px] h-6 bg-white/30" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
