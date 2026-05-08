import checkIcon from '../../assets/icons/check-compartive.svg';
import xIcon from '../../assets/icons/x-compartive.svg';
import vsStamp from '../../assets/icons/vs-stamp.svg';
import bbImg from '../../assets/images/img-ballsnbrains-comparative.webp';
import othersImg from '../../assets/images/img-others-comparative.webp';
import guaranteeStamp from '../../assets/utils/guarantee-stamp.webp';

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
    <section className="bg-bb-cream py-20 md:py-28 px-6">
      <div className="max-w-[1140px] mx-auto">
        {/* Top: products + guarantee stamp */}
        <div className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-8 mb-10 md:mb-12">
          {/* Guarantee stamp top-left */}
          <img
            src={guaranteeStamp}
            alt="100% Satisfaction Guarantee"
            className="absolute top-0 left-0 w-20 md:w-28 object-contain z-10"
          />

          <div className="flex justify-center">
            <img src={bbImg} alt="Balls & Brains" className="w-full max-w-[280px] md:max-w-[320px] object-contain" />
          </div>

          <img src={vsStamp} alt="VS" className="w-14 md:w-20 shrink-0" />

          <div className="flex justify-center bg-white/40 rounded-2xl p-4 md:p-6 border border-[#e6e6e6]">
            <img src={othersImg} alt="Others" className="w-full max-w-[280px] md:max-w-[320px] object-contain" />
          </div>
        </div>

        {/* Comparison rows */}
        <div className="flex flex-col gap-2 md:gap-3">
          {rows.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-4 md:gap-8"
            >
              {/* BB side — gold gradient pill */}
              <div
                className="rounded-full px-5 md:px-6 py-3 md:py-4 flex items-center justify-between gap-3 text-white text-[13px] md:text-[15px] font-semibold"
                style={{ background: 'linear-gradient(90deg, #cf9947 0%, #7d5d2c 100%)' }}
              >
                <span>{row.bb}</span>
                <img src={checkIcon} alt="✓" className="w-5 h-5 shrink-0" />
              </div>

              {/* Spacer for VS column */}
              <div className="w-14 md:w-20" />

              {/* Others side — grey pill */}
              <div className="rounded-full px-5 md:px-6 py-3 md:py-4 flex items-center justify-between gap-3 bg-[#f0f0f0] text-[#424242] text-[13px] md:text-[15px] font-medium">
                <span>{row.others}</span>
                <img src={xIcon} alt="✗" className="w-5 h-5 shrink-0" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 md:mt-16 flex flex-col items-center gap-3">
          <a href={CTA_URL} className="btn-cta btn-cta-lg">
            Try It & Save 44%
          </a>
          <p className="text-bb-text-dark/70 text-[14px] md:text-[15px] font-medium">
            ✅ 365-Day Guarantee.
          </p>
        </div>
      </div>
    </section>
  );
}
