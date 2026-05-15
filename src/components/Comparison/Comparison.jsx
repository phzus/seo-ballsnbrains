import FadeUp from '../_shared/FadeUp';
import checkIcon from '../../assets/icons/check-compartive.svg';
import xIcon from '../../assets/icons/x-compartive.svg';
import vsStamp from '../../assets/icons/vs-stamp.svg';
import bbImg from '../../assets/images/img-ballsnbrains-comparative.webp';
import othersImg from '../../assets/images/img-others-comparative.webp';

const CTA_URL = '/special-offer';

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
        {/* Parent container — relative pra os overlays absolutos (selo + VS).
            Grid 1-col mobile, 2-col desktop. Gap 16px entre filhos. */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Overlay: VS — mobile totalmente centralizado, desktop 180px do topo.
              translate -50% -50% nos dois pra elemento centralizar no anchor (efeito "overhang") */}
          <img
            src={vsStamp}
            alt="VS"
            className="absolute top-1/2 md:top-[230px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[5rem] md:w-[7.5rem] object-contain z-10 pointer-events-none"
          />

          {/* Child 1: Balls & Brains
              Gap interno (imagem ↔ topics): 12px
              Mobile order: topics → imagem
              Desktop order: imagem → topics */}
          <FadeUp className="flex flex-col gap-3">
            <img
              src={bbImg}
              alt="Balls & Brains"
              className="w-full object-contain order-2 md:order-1"
            />
            <div className="flex flex-col gap-2 md:gap-3 order-1 md:order-2">
              {rows.map((row, i) => (
                <div
                  key={i}
                  className="rounded-xl px-4 md:px-5 py-2.5 md:py-3 flex items-center gap-3 md:justify-between text-white text-[0.75rem] md:text-[1.125rem] font-semibold"
                  style={{ background: 'linear-gradient(90deg, #cf9947 0%, #7d5d2c 100%)' }}
                >
                  <span className="order-2 md:order-1">{row.bb}</span>
                  <img src={checkIcon} alt="✓" className="order-1 md:order-2 w-[1.375rem] h-[1.375rem] shrink-0" />
                </div>
              ))}
            </div>
          </FadeUp>

          {/* Child 2: Others
              Gap interno: 12px
              Mobile order: imagem → topics (mesma do desktop) */}
          <FadeUp className="flex flex-col gap-3">
            <img
              src={othersImg}
              alt="Others"
              className="w-full object-contain order-1"
            />
            <div className="flex flex-col gap-2 md:gap-3 order-2">
              {rows.map((row, i) => (
                <div
                  key={i}
                  className="rounded-xl px-4 md:px-5 py-2.5 md:py-3 flex items-center gap-3 bg-[#f0f0f0] text-[#424242] text-[0.75rem] md:text-[1.125rem] font-medium"
                >
                  <img src={xIcon} alt="✗" className="w-[1.375rem] h-[1.375rem] shrink-0" />
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
