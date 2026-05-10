import benefit1 from '../../assets/images/img-benefit-1.webp';
import benefit2 from '../../assets/images/img-benefit-2.webp';
import logoBadge from '../../assets/utils/footer-logo.svg';

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
      <section className="px-4 py-20 md:py-10">
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

      {/* Sub-section 2 — Works like a protocol */}
      <section className="px-4 py-20 md:py-28">
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

    </div>
  );
}
