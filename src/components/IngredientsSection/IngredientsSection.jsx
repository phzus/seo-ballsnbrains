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
  'cGMP Certified Facility',
  'Hormone-Free',
  'Third-Party Tested',
  'Vegan',
  'Non-GMO',
  'Made in USA',
  'No Fillers',
];

export default function IngredientsSection() {
  return (
    <section id="ingredients" className="bg-bb-dark py-20 md:py-28 px-6">
      {/* Heading */}
      <div className="max-w-[71.25rem] mx-auto mb-14 md:mb-20 text-center">
        <p className="text-bb-gold text-[0.875rem] md:text-[1.125rem] font-bold leading-tight">
          12 Clinical-Dose
        </p>
        <h2 className="text-white text-[2.25rem] md:text-[3.25rem] font-bold leading-tight mt-1">
          Ingredients in 1 Cup
        </h2>
        <p className="text-bb-text-dim text-[0.9375rem] md:text-[1.125rem] leading-relaxed mt-4 max-w-[40rem] mx-auto">
          Industrial coffee floods your body with cortisol every morning.<br />
          Cortisol suppresses testosterone. We fix that.
        </p>
      </div>

      {/* Ingredients grid */}
      <div className="max-w-[71.25rem] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {ingredients.map((item, i) => (
            <div
              key={i}
              className="relative rounded-2xl overflow-hidden flex flex-col aspect-square border border-bb-gold-dark/30"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(10,9,8,0.15) 0%, rgba(10,9,8,0.55) 50%, rgba(10,9,8,0.96) 100%), url(${item.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Number badge */}
              <div className="absolute top-3 right-3 w-8 h-8 md:w-9 md:h-9 rounded-full bg-bb-gold flex items-center justify-center text-bb-dark text-[0.8125rem] md:text-[0.875rem] font-bold border border-bb-gold-dark/50 shadow-md">
                {i + 1}
              </div>

              {/* Content (bottom) */}
              <div className="mt-auto p-4 md:p-5 flex flex-col gap-2">
                <h3 className="text-bb-gold font-bold text-[1rem] md:text-[1.1875rem] leading-tight">
                  {item.name}
                </h3>
                <p className="text-white/80 text-[0.6875rem] md:text-[0.78125rem] leading-snug">
                  {item.claim}
                </p>
                <span className="self-start mt-1 text-white text-[0.6875rem] md:text-[0.75rem] font-bold tracking-wide bg-bb-dark/70 border border-bb-gold-dark/50 rounded-full px-3 py-1">
                  {item.dose}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits scrolling ticker — full-width, quebra o px-6 da section */}
      <div className="mt-16 -mx-6 overflow-hidden border-t border-b border-bb-separator py-5">
        <div className="flex gap-10 whitespace-nowrap w-max" style={{ animation: 'marquee 30s linear infinite' }}>
          {[...benefits, ...benefits, ...benefits].map((b, i) => (
            <span
              key={i}
              className="text-white font-bold text-[1rem] md:text-[1.125rem] uppercase tracking-wide shrink-0"
              style={{ fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}
            >
              {b} <span className="text-bb-gold mx-3">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
