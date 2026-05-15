import FadeUp from '../_shared/FadeUp';
import resultDay7 from '../../assets/images/img-results-day7.webp';
import resultDay30 from '../../assets/images/img-results-day30.webp';
import resultDay90 from '../../assets/images/img-results-day90.webp';

const CTA_URL = '/special-offer';

const results = [
  {
    day: 'Day 7',
    img: resultDay7,
    bullets: [
      'L-Theanine smooths your caffeine curve — energy feels cleaner, steadier.',
      'Ashwagandha KSM-66 begins modulating your cortisol baseline.',
      "Lion's Mane starts supporting nerve growth factor (NGF) production.",
      'The afternoon crash starts fading — no more 2pm collapse.',
    ],
  },
  {
    day: 'Day 30',
    img: resultDay30,
    bullets: [
      'Cortisol levels measurably lower — sleep improves, recovery accelerates.',
      'Tongkat Ali LJ100 reaches effective concentration — T-support kicks in.',
      'Cordyceps improves oxygen utilization — workouts feel different.',
      'Focus sharpens. Energy sustains. The fog lifts.',
    ],
  },
  {
    day: 'Day 90',
    img: resultDay90,
    bullets: [
      'Full hormonal optimization — cortisol down, testosterone supported, SHBG managed.',
      'Ashwagandha, Tongkat Ali and Shilajit working in sync at peak levels.',
      'Compounding effects visible in energy, body composition, drive, and bloodwork.',
      "This isn't a spike. This is your new baseline.",
    ],
  },
];

export default function Results() {
  return (
    <section className="bg-bb-dark px-4 py-20 md:py-28">
      <div className="max-w-[71.25rem] mx-auto">
        <FadeUp className="mb-14 md:mb-20 text-center">
          <h2 className="text-white text-[1.75rem] md:text-[3rem] font-bold leading-tight max-w-[15ch] mx-auto">
            Here's What Happens Inside <span className="text-bb-gold">Your Body</span>
          </h2>
          <p className="text-bb-text-dim text-[0.9375rem] md:text-[1.125rem] leading-relaxed mt-4 max-w-[30rem] mx-auto">
            Each ingredient works on its own timeline. Here's what to expect as they build up in your system.
          </p>
        </FadeUp>

        <div className="flex flex-col gap-14 md:gap-20">
          {results.map((r, idx) => {
            const reverse = idx % 2 === 1;
            return (
              <FadeUp
                key={r.day}
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${reverse ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="flex-1 w-full">
                  <img
                    src={r.img}
                    alt={r.day}
                    loading="lazy"
                    className="w-full max-w-[31.25rem] mx-auto rounded-2xl object-cover aspect-[4/3] border border-bb-gold/50"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-5">
                  <h3 className="text-bb-gold text-[2rem] md:text-[2.75rem] font-bold leading-none">
                    {r.day}
                  </h3>
                  <ul className="flex flex-col gap-3 text-bb-text-dim text-[0.875rem] md:text-[1rem] leading-relaxed">
                    {r.bullets.map((b, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-bb-gold mt-[0.4375rem] shrink-0 inline-block w-1.5 h-1.5 rounded-full bg-bb-gold" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            );
          })}
        </div>

        <div className="mt-16 md:mt-20 flex flex-col items-center gap-3">
          <a href={CTA_URL} className="btn-cta btn-cta-lg">
            Try It & Save 44%
          </a>
          <p className="text-bb-text-muted text-[0.875rem] md:text-[0.9375rem] font-medium">
            ✅ 365-Days Guarantee.
          </p>
        </div>
      </div>
    </section>
  );
}
