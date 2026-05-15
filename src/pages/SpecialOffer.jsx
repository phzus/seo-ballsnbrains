import { useState } from 'react';
import { Link } from 'react-router-dom';
import primalPouch from '../assets/products/primal-coffee-pouch.png';
import starIcon from '../assets/icons/Star.svg';

const CTA_LINK = 'https://ballsnbrains.com/shp/tmc-adv/08/p2-v2/';

const gallery = [primalPouch, primalPouch, primalPouch, primalPouch];

const benefits = [
  'Lifetime 43% discount locked in',
  'Delivered every 90 days — never run out',
  '3 months of energy, focus & drive',
  'FREE U.S. shipping on this upgrade',
  'Pause or cancel anytime',
  '365-day money-back guarantee',
];

function CheckGold({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M5 12l5 5L20 7"
        stroke="#cf9947"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SpecialOffer() {
  const [activeImg, setActiveImg] = useState(0);

  return (
    <div className="min-h-screen bg-bb-dark text-white">
      <div
        className="w-full flex items-center justify-center text-center px-4 py-2.5"
        style={{ background: 'linear-gradient(90deg, #cf9947 0%, #7d5d2c 100%)' }}
      >
        <p
          className="text-bb-dark text-[0.875rem] font-bold leading-none tracking-[0.2em] uppercase"
          style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}
        >
          Limited-Time Offer
        </p>
      </div>

      <main className="px-4 md:px-8 py-4 md:py-14">
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-start">
          <div className="flex gap-2 md:gap-4">
            <div className="flex flex-col gap-2 md:gap-3 w-14 md:w-[5.5rem] flex-shrink-0">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImg(i)}
                  className={`aspect-square rounded-md md:rounded-lg overflow-hidden border-2 transition-colors ${
                    activeImg === i
                      ? 'border-bb-gold-mid'
                      : 'border-bb-separator hover:border-white/40'
                  }`}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover bg-[#14100c]" />
                </button>
              ))}
            </div>

            <div className="flex-1 aspect-square rounded-xl overflow-hidden bg-[#14100c] border border-bb-separator">
              <img
                src={gallery[activeImg]}
                alt="Balls & Brains Primal Coffee"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div>
            <h1 className="text-[1.5rem] md:text-[2.725rem] font-bold leading-[1.1] mb-5 md:mb-8">
              Lock in your <span className="text-cofee-gradient">Balls&Brains</span> Lifetime
              Discount Now!
            </h1>

            <div
              className="rounded-2xl border border-bb-gold-mid overflow-hidden backdrop-blur-xl"
              style={{ background: 'rgba(255, 255, 255, 0.03)' }}
            >
              <div className="grid grid-cols-2 border-b border-bb-gold-mid/30">
                <div className="px-3 md:px-4 py-3 md:py-4 text-center">
                  <p className="text-white/55 text-[0.875rem] uppercase tracking-widest font-medium mb-1">
                    You Ordered
                  </p>
                  <p className="text-white text-[1rem] md:text-[1.25rem] font-bold">
                    1-Month Supply
                  </p>
                </div>
                <div
                  className="px-3 md:px-4 py-3 md:py-4 text-center border-l border-bb-gold-mid/30"
                  style={{ background: 'rgba(207, 153, 71, 0.05)' }}
                >
                  <p className="text-bb-gold-mid text-[0.875rem] uppercase tracking-widest font-medium mb-1">
                    Get 2 More Months &amp;
                  </p>
                  <p className="text-bb-green-light text-[1rem] md:text-[1.25rem] font-bold">
                    Save $89
                  </p>
                </div>
              </div>

              <div className="p-5 md:p-7">
                <div className="flex items-center gap-4 md:gap-6 mb-8">
                  <ul className="flex-1 space-y-1 md:space-y-1.5">
                    {benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <CheckGold className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span className="text-white text-[1rem] leading-snug">{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="text-right shrink-0">
                    <p className="text-white/55 text-[0.8125rem] uppercase tracking-widest font-bold mb-1.5 leading-tight">
                      3-Month Supply
                      <br />
                      Delivered every 90 days
                    </p>
                    <p className="flex items-baseline justify-end gap-2">
                      <span className="line-through text-[#e54848] text-[1.25rem] font-medium">
                        $147
                      </span>
                      <span
                        className="text-[2.5rem] md:text-[5.5rem] font-black leading-none bg-clip-text text-transparent"
                        style={{
                          backgroundImage:
                            'radial-gradient(143.34% 70.77% at 37.69% -10.12%, #FED9A5 0%, #D09439 100%)',
                        }}
                      >
                        $58
                      </span>
                    </p>
                  </div>
                </div>

                <a href={CTA_LINK} className="btn-cta btn-cta-lg w-full block text-[2.5rem] md:text-[1.5rem] py-6 font-black leading-none text-center">
                  Update My Order Now
                </a>

                <p className="text-center text-white/60 text-[0.875rem] mt-4 font-medium">
                  365 Day Money-Back Guarantee &nbsp;·&nbsp; Pause or Cancel Anytime
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-white/55 text-[0.875rem] mt-8 max-w-[720px] mx-auto">
          An additional <span className="line-through">$147</span>{' '}
          <span className="text-white font-bold">$58</span> will be charged if you upgrade to a
          3-month supply today. You save $89. Delivered every 90 days.
        </p>

        <div className="max-w-[720px] mx-auto mt-12 md:mt-16 p-5 md:p-7 rounded-xl border border-bb-separator bg-[#14100c]">
          <div className="flex items-center gap-1 mb-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <img key={i} src={starIcon} alt="" className="w-4 h-4 md:w-5 md:h-5" />
            ))}
          </div>
          <p className="text-white/85 text-[1rem] md:text-[1.125rem] leading-relaxed mb-3">
            “Locking in the 3-month supply was the best decision. I've been on Balls&Brains for 6
            months now — energy is steady, focus is sharper, and I've never had to scramble for a
            refill.”
          </p>
          <p className="font-bold text-white text-[1rem]">— Frank William</p>
        </div>

        <div className="text-center mt-10 md:mt-14">
          <Link
            to="/"
            className="text-[#a04545] hover:text-[#ff6b6b] underline text-[0.875rem] font-bold transition-colors"
          >
            No thanks, I'd rather lose the lifetime discount.
          </Link>
        </div>
      </main>
    </div>
  );
}
