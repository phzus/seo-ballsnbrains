import FadeUp from '../_shared/FadeUp';
import checkIcon from '../../assets/icons/check-compartive.svg';
import xIcon from '../../assets/icons/x-compartive.svg';
import bbImg from '../../assets/images/img-ballsnbrains-comparative.webp';
import othersImg from '../../assets/images/img-others-comparative.webp';

const CTA_URL = 'https://ballsnbrains.com/shp/tmc-adv/08/p2-v2/';

const rows = [
  { bb: 'Works with your morning coffee ritual', others: 'Pills you forget to take by Wednesday' },
  { bb: 'Supports natural T production', others: 'Shuts down or ignores your hormonal axis' },
  { bb: '12 clinical-dose ingredients in one scoop', others: 'Underdosed formulas padded with fillers' },
  { bb: 'Patented extracts (KSM-66®, LJ100®)', others: 'Generic, unbranded, unverified ingredients' },
  { bb: 'No needles, no prescriptions, no side effects.', others: 'Injections, doctor visits, and ongoing dependency' },
];

export default function Comparison() {
  return (
    <section className="bg-bb-dark py-20 md:py-28 px-4">
      <div className="max-w-[71.25rem] mx-auto">
        {/* Parent container — 2 colunas no desktop, stack no mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-8">
          {/* Child 1: Balls & Brains
              Mobile order: topics primeiro, depois imagem
              Desktop order: imagem em cima, topics embaixo */}
          <FadeUp className="flex flex-col gap-4 md:gap-5">
            <img
              src={bbImg}
              alt="Balls & Brains"
              className="w-full max-w-[26rem] mx-auto object-contain order-2 md:order-1"
            />
            <div className="flex flex-col gap-2 md:gap-3 order-1 md:order-2">
              {rows.map((row, i) => (
                <div
                  key={i}
                  className="rounded-full px-5 md:px-6 py-3 md:py-4 flex items-center justify-between gap-3 text-white text-[0.8125rem] md:text-[0.9375rem] font-semibold"
                  style={{ background: 'linear-gradient(90deg, #cf9947 0%, #7d5d2c 100%)' }}
                >
                  <span>{row.bb}</span>
                  <img src={checkIcon} alt="✓" className="w-5 h-5 shrink-0" />
                </div>
              ))}
            </div>
          </FadeUp>

          {/* Child 2: Others
              Mobile order: imagem primeiro, depois topics
              Desktop order: imagem em cima, topics embaixo (igual ao child 1) */}
          <FadeUp className="flex flex-col gap-4 md:gap-5">
            <img
              src={othersImg}
              alt="Others"
              className="w-full max-w-[26rem] mx-auto object-contain order-1"
            />
            <div className="flex flex-col gap-2 md:gap-3 order-2">
              {rows.map((row, i) => (
                <div
                  key={i}
                  className="rounded-full px-5 md:px-6 py-3 md:py-4 flex items-center gap-3 bg-[#f0f0f0] text-[#424242] text-[0.8125rem] md:text-[0.9375rem] font-medium"
                >
                  <img src={xIcon} alt="✗" className="w-5 h-5 shrink-0" />
                  <span>{row.others}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>

        {/* CTA */}
        <div className="mt-12 md:mt-16 flex flex-col items-center gap-3">
          <a href={CTA_URL} className="btn-cta btn-cta-lg">
            Try It & Save 44%
          </a>
          <p className="text-bb-text-muted text-[0.875rem] md:text-[0.9375rem] font-medium">
            ✅ 365-Day Guarantee.
          </p>
        </div>
      </div>
    </section>
  );
}
