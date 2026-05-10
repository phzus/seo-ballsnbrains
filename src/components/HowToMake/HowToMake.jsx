import benefit1 from '../../assets/images/img-benefit-1.webp';
import benefit2 from '../../assets/images/img-benefit-2.webp';
import resultDay7 from '../../assets/images/img-results-day7.webp';
import resultDay30 from '../../assets/images/img-results-day30.webp';
import resultDay90 from '../../assets/images/img-results-day90.webp';
import logoBadge from '../../assets/utils/footer-logo.svg';

const CTA_URL = 'https://ballsnbrains.com/shp/tmc-adv/08/p2-v2/';

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

function LogoBadge() {
  return (
    <div className="inline-flex items-center gap-2 bg-bb-gold rounded-lg px-3 py-2 mb-4 self-start">
      <img src={logoBadge} alt="B&B" className="h-5 w-auto" />
    </div>
  );
}

export default function HowToMake() {
  return (
    <div id="how-it-works" className="bg-bb-dark">
      {/* Sub-section 1 — Tastes like coffee */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-[71.25rem] mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <div className="flex-1 order-2 md:order-1">
            <img
              src={benefit1}
              alt="Tastes like coffee"
              loading="lazy"
              className="w-full max-w-[30rem] mx-auto md:mx-0 rounded-2xl object-cover"
            />
          </div>
          <div className="flex-1 order-1 md:order-2 flex flex-col gap-5">
            <LogoBadge />
            <h2 className="text-white text-[2.25rem] md:text-[3.25rem] font-bold leading-tight">
              Tastes like <span className="text-bb-gold font-bold">coffee.</span>
            </h2>
            <div className="text-bb-text-dim text-[1rem] md:text-[1.4375rem] leading-relaxed space-y-4 font-medium">
              <p>It tastes like the coffee you already drink.</p>
              <p>The difference is what happens after — no crash at 2pm, no jitters, no reaching for a second cup.</p>
              <p>Just steady, clean energy that carries you through the day.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-bb-separator" />

      {/* Sub-section 2 — Works like a protocol */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-[71.25rem] mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <div className="flex-1 flex flex-col gap-5">
            <LogoBadge />
            <h2 className="text-white text-[2.25rem] md:text-[3.25rem] font-bold leading-tight">
              Works like a <span className="text-bb-gold font-bold">protocol.</span>
            </h2>
            <div className="text-bb-text-dim text-[1rem] md:text-[1.4375rem] leading-relaxed space-y-4 font-medium">
              <p>The testosterone-support stack most men piece together with 6–8 separate supplements — in one scoop.</p>
              <p>Nothing to add. Nothing to remember. Nothing to swallow.</p>
            </div>
          </div>
          <div className="flex-1">
            <img
              src={benefit2}
              alt="Works like a protocol"
              loading="lazy"
              className="w-full max-w-[30rem] mx-auto md:mx-0 rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* Results — Here's What Happens Inside Your Body */}
      <section className="border-t border-bb-separator px-6 py-20 md:py-28">
        <div className="max-w-[71.25rem] mx-auto">
          <div className="mb-14 md:mb-20 text-center">
            <h2 className="text-white text-[2.25rem] md:text-[3.25rem] font-bold leading-tight">
              Here's What Happens<br />
              Inside <span className="text-bb-gold">Your Body</span>
            </h2>
            <p className="text-bb-text-dim text-[0.9375rem] md:text-[1.125rem] leading-relaxed mt-4 max-w-[37.5rem] mx-auto">
              Each ingredient works on its own timeline. Here's what to expect as they build up in your system.
            </p>
          </div>

          <div className="flex flex-col gap-14 md:gap-20">
            {results.map((r, idx) => {
              const reverse = idx % 2 === 1;
              return (
                <div
                  key={r.day}
                  className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${reverse ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="flex-1 w-full">
                    <img
                      src={r.img}
                      alt={r.day}
                      loading="lazy"
                      className="w-full max-w-[31.25rem] mx-auto rounded-2xl object-cover aspect-[4/3] border border-bb-gold-dark/40"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-5">
                    <h3 className="text-bb-gold text-[2.25rem] md:text-[3rem] font-bold leading-none">
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
                </div>
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
    </div>
  );
}
