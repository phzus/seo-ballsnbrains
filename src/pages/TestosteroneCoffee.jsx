import { useState } from 'react';
import bbSymbol from '../assets/utils/bb-symbol.svg';
import starIcon from '../assets/icons/Star.svg';
import checkGold from '../assets/icons/check-gold.svg';
import kit1 from '../assets/products/1kit.webp';
import kit2 from '../assets/products/2kits.webp';
import kit3 from '../assets/products/3kits.webp';
import gallery01 from '../assets/products/gallery-01.png';
import gallery02 from '../assets/products/gallery-02.png';
import gallery03 from '../assets/products/gallery-03.png';
import gallery04 from '../assets/products/gallery-04.png';
import gallery05 from '../assets/products/gallery-05.png';
import bonusManhood from '../assets/bonuses/manhood.png';
import bonusBoost from '../assets/bonuses/boost.png';
import bonusBed from '../assets/bonuses/bed.png';
import bonusEnergy from '../assets/bonuses/energy.png';
import pressGq from '../assets/press/gq.svg';
import pressForbes from '../assets/press/forbes.svg';
import pressMens from '../assets/press/mens-health.svg';
import num1 from '../assets/numbers/num-1.svg';
import num2 from '../assets/numbers/num-2.svg';
import num3 from '../assets/numbers/num-3.svg';
import num4 from '../assets/numbers/num-4.svg';
import num5 from '../assets/numbers/num-5.svg';
import num6 from '../assets/numbers/num-6.svg';
import num7 from '../assets/numbers/num-7.svg';
import pct1 from '../assets/stats/pct-1.svg';
import pct2 from '../assets/stats/pct-2.svg';
import pct3 from '../assets/stats/pct-3.svg';
import pct4 from '../assets/stats/pct-4.svg';
import pct5 from '../assets/stats/pct-5.svg';
import imgOptimize from '../assets/sections/optimize.png';
import imgCleanEnergy from '../assets/sections/clean-energy.png';
import imgSeesaw from '../assets/sections/seesaw.png';
import imgBlockConversion from '../assets/sections/block-conversion.png';
import imgCognitive from '../assets/sections/cognitive.png';
import imgFounderCover from '../assets/sections/founder-cover.png';
import imgCheaper from '../assets/sections/cheaper.png';
import playVideo from '../assets/icons/play-video.svg';

const GALLERY = [gallery01, gallery02, gallery03, gallery04, gallery05];
const PRESS = [pressGq, pressForbes, pressMens];
const NUMBERS = [num1, num2, num3, num4, num5, num6, num7];

const LEVEL2_CORTISOL = [
  ['Ashwagandha KSM-66 (300mg)', 'Reduces cortisol by 27.9% in 60 days (clinically proven)'],
  ['Reishi Mushroom (500mg)', 'Calms HPA axis, improves sleep quality, lowers chronic stress'],
];
const LEVEL2_TESTO = [
  ['Tongkat Ali LJ100 (300mg)', 'Increases total testosterone 15–37% and FREE testosterone up to 46% in 8 weeks'],
  ['Fadogia Agrestis (600mg)', 'Enhances luteinizing hormone production, makes testes more sensitive to testosterone signals'],
  ['Zinc (15mg) + Vitamin D3 (2000 IU) + Shilajit (250mg)', 'Essential cofactors for testosterone synthesis'],
];
const LEVEL3_INHIBITORS = [
  ['DIM (from cruciferous vegetables)', 'Directly blocks aromatase enzyme'],
  ['Chaga Mushroom (500mg)', 'Powerful antioxidant with additional aromatase inhibition'],
  ['Cordyceps Militaris (1000mg)', 'Supports testosterone while preventing conversion'],
];
const BONUS_STACK = [
  ["Lion's Mane (1000mg)", 'Stimulates Nerve Growth Factor (NGF), improves memory and focus'],
  ['Cordyceps (1000mg)', 'Increases cellular ATP production, boosts mental and physical energy'],
  ['L-Theanine (100mg)', 'Creates calm, focused alertness'],
];
const FOUNDER_POINTS = [
  'Why your morning coffee is destroying your testosterone',
  'The "Hormonal Seesaw" mechanism doctors never mention',
  'How I increased my testosterone 91% in 8 weeks without TRT',
];
const HEALTH_ISSUES = [
  ['Low Testosterone', "Balls & Brains uses clinical doses of Tongkat Ali LJ100 and Fadogia Agrestis to reactivate your HPG axis and amplify testosterone production by 15–46%. Ashwagandha KSM-66 removes the cortisol brake that's been suppressing your natural production."],
  ['Low Energy & Afternoon Crashes', 'By replacing high-cortisol coffee with clean energy from MCT Oil, L-Theanine, and 100mg caffeine, you get sustained 6–8 hour energy without the spike-and-crash cycle. Cordyceps enhances cellular ATP production for real mitochondrial energy.'],
  ['Brain Fog & Poor Focus', "Lion's Mane stimulates Nerve Growth Factor to improve memory and cognitive function. L-Theanine creates calm, focused alertness. The combination eliminates brain fog and sharpens mental performance all day."],
  ['Low Libido & Sexual Performance', 'When testosterone rises and estrogen normalizes, sex drive returns naturally. 89% of users report improved libido within 4–6 weeks. Morning wood returns as a visible sign of hormonal optimization.'],
  ['Dad Bod & Stubborn Belly Fat', 'High cortisol causes belly fat storage and testosterone-to-estrogen conversion creates "soft" body composition. By lowering cortisol and raising testosterone, your body naturally burns fat and builds lean muscle more easily.'],
  ['Man Boobs (Gynecomastia)', 'Excess estrogen from testosterone conversion causes breast tissue growth in men. DIM and Chaga block the aromatase enzyme responsible, while raising testosterone reverses the feminizing effects.'],
  ['Stress & Irritability', "Ashwagandha and Reishi calm your stress response and lower cortisol by up to 27.9%. You'll feel calmer, more in control, and emotionally stable, even during high-pressure situations."],
];
const PRICE_COMPARE = [
  ['Tongkat Ali supplement', '(clinical dose): $40–60/month'],
  ['Ashwagandha KSM-66:', '$30–40/month'],
  ['Fadogia Agrestis:', '$35–45/month'],
  ["Mushroom complex (Lion's Mane, Cordyceps, Reishi, Chaga):", '$40–50/month'],
  ['Pre-workout or energy supplement:', '$40–50/month'],
  ['Premium coffee:', '$15–20/month'],
];
const RESULTS_STATS = [
  [pct1, 'of users reported noticeable energy improvement within the first week (no 2pm crash).'],
  [pct2, 'of users experienced improved mental clarity and focus within 14 days.'],
  [pct3, 'of users reported return of morning wood and improved libido within 4 weeks.'],
  [pct4, 'of users who retested blood work showed measurable testosterone increases after 8 weeks (average increase: 32%).'],
  [pct5, 'of users reported visible body composition changes (leaner waist, more muscle definition) within 8–10 weeks.'],
];

// Tabela comparativa: cada linha = [label, BALLS&BRAINS, Regular Coffee, Other Mushroom Coffee, Testosterone Pills]
// status do cell: 'ok' (verde), 'no' (vermelho), 'warn' (amarelo), 'na' (cinza)
const COMPARE_ROWS = [
  ['Optimizes Testosterone', ['ok', 'Yes (15–46% increase)'], ['no', 'No (suppresses it)'], ['no', 'No'], ['warn', 'Sometimes (if taken separately)']],
  ['Lowers Cortisol', ['ok', 'Yes (up to 27.9%)'], ['no', 'No (spikes it 20–30%)'], ['warn', 'Minimal'], ['warn', 'Only if Ashwagandha included']],
  ['Sustained Energy (6–8 hrs)', ['ok', 'Yes'], ['no', 'No (2–3 hr crash)'], ['warn', 'Gentler but not optimized'], ['no', 'No energy benefit']],
  ['Clinical Doses', ['ok', 'Yes'], ['na', 'N/A'], ['no', 'Often underdosed'], ['warn', 'Varies by brand']],
  ['Tastes Great', ['ok', 'Premium coffee taste'], ['ok', 'Yes'], ['no', 'Often earthy/bitter'], ['warn', 'Pills (no taste)']],
  ['365-Day Guarantee', ['ok', 'Yes'], ['na', 'N/A'], ['warn', 'Varies'], ['warn', 'Varies']],
  ['Replaces Multiple Products', ['ok', 'Yes (coffee + 5–10 supplements)'], ['no', 'No'], ['warn', 'Replaces coffee only'], ['no', 'No (still need coffee)']],
];

const CHECKOUT = {
  sub: [
    'https://links.ballsnbrains.com/go/1-mushroom-coffe-tmc-subscribe-adv8-mlk3sruu/?referrer=Organic',
    'https://links.ballsnbrains.com/go/2-mushroom-coffe-tmc-subscribe-adv8-mlk3t4rf/?referrer=Organic',
    'https://links.ballsnbrains.com/go/3-mushroom-coffe-tmc-subscribe-adv8-mlk3tm4w/?referrer=Organic',
  ],
  one: [
    'https://links.ballsnbrains.com/go/1-mushroom-coffe-tmc-onetime-adv8-mlk3rio9/?referrer=Organic',
    'https://links.ballsnbrains.com/go/2-mushroom-coffe-tmc-onetime-adv8-mlk3rwr5/?referrer=Organic',
    'https://links.ballsnbrains.com/go/3-mushroom-coffe-tmc-onetime-adv8-mlk3sac9/?referrer=Organic',
  ],
};

const PLANS = [
  {
    name: '1 Pouch',
    image: kit1,
    sub: { save: 'Save 29%', old: '$69.00', price: '$49.00', perUnit: null, totalLabel: null, cartTotal: '$49.00' },
    one: { save: 'Save 0%', old: null, price: '$69.00', perUnit: null, totalLabel: null, cartTotal: '$69.00' },
  },
  {
    name: '2 Pouches',
    image: kit2,
    sub: { save: 'Save 31%', old: '$138.00', price: '$44.00', perUnit: '/ Pouch', totalLabel: 'Total: $88.00', cartTotal: '$88.00' },
    one: { save: 'Save 7%', old: '$138.00', price: '$64.00', perUnit: '/ Pouch', totalLabel: 'Total: $128.00', cartTotal: '$128.00' },
  },
  {
    name: '3 Pouches',
    image: kit3,
    sub: { save: 'Save 34%', old: '$207.00', price: '$39.00', perUnit: '/ Pouch', totalLabel: 'Total: $117.00', cartTotal: '$117.00' },
    one: { save: 'Save 15%', old: '$207.00', price: '$59.00', perUnit: '/ Pouch', totalLabel: 'Total: $177.00', cartTotal: '$177.00' },
  },
];

const PRODUCT_BENEFITS = [
  'Raises testosterone 15–46% naturally',
  'Sustained 6–8 hour energy (no crash)',
  'Blocks testosterone-to-estrogen conversion',
  'Tastes like premium coffee',
];

const BONUSES = [
  { img: bonusManhood, name: 'Manhood' },
  { img: bonusBoost, name: 'Testosterone Boost' },
  { img: bonusBed, name: 'Longer Time in Bed' },
  { img: bonusEnergy, name: 'Energy' },
];

const INGREDIENTS = [
  ['Tongkat Ali LJ100®', '300 mg'],
  ['Shilajit', '250 mg'],
  ['Zinc Glycinate', '15 mg'],
  ['Ashwagandha KSM-66®', '300 mg'],
  ['Cholecalciferol (Vitamin D)', '2,000 IU'],
  ["Lion's Mane", '1,000 mg'],
  ['Reishi', '500 mg'],
  ['Cordyceps Militaris', '1,000 mg'],
  ['L-Theanine', '100 mg'],
  ['Chaga', '500 mg'],
  ['Caffeine', '100 mg'],
  ['Organic Arabica Coffee', '50 mg'],
];

const FAQS = [
  {
    q: 'What is Balls and Brains?',
    a: "Balls and Brains is the first testosterone-optimizing mushroom coffee designed for men over 30. It combines premium Colombian coffee (100mg caffeine) with clinical doses of 11 functional ingredients — including Tongkat Ali, Ashwagandha, and Lion's Mane — to naturally support testosterone while providing sustained energy for 6–8 hours.",
  },
  {
    q: 'When will I see results?',
    a: 'Most users notice cleaner energy and reduced afternoon crash within the first week. Testosterone-support effects typically build over 30–90 days as ingredients reach effective concentration.',
  },
  {
    q: 'How do I prepare it?',
    a: 'One scoop in 8–12oz of hot water. Stir or froth. Drink black or with your preferred milk. That’s it.',
  },
  {
    q: "What's your refund policy?",
    a: '365-day money-back guarantee. If you’re not satisfied for any reason, contact support@ballsnbrains.com and we’ll refund every penny. No questions asked.',
  },
];

function StarRating() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <img key={i} src={starIcon} alt="" aria-hidden="true" className="w-4 h-4" />
        ))}
      </div>
      <span className="text-white/55 text-[0.8125rem]">
        <span className="text-white font-semibold">Rated 4.8/5</span> (1,847 Reviews)
      </span>
    </div>
  );
}

function CartIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

const TRUST = [
  {
    title: 'Money-Back Guarantee',
    sub: '365-day, no questions asked',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Secure Checkout',
    sub: '256-bit SSL encrypted',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: 'Fast Shipping',
    sub: 'Delivered in 3–5 days',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
        <path d="M14 9h4l4 4v4a1 1 0 0 1-1 1h-1" />
        <circle cx="7.5" cy="18.5" r="1.5" />
        <circle cx="17.5" cy="18.5" r="1.5" />
      </svg>
    ),
  },
];

function Accordion({ label, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-bb-separator rounded-xl overflow-hidden" style={{ background: open ? '#14100c' : 'transparent' }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
      >
        <span className="text-white font-medium text-[0.9375rem]">{label}</span>
        <svg
          viewBox="0 0 24 24"
          className={`w-4 h-4 text-bb-gold shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && <div className="px-5 pb-5 text-bb-text-dim text-[0.875rem] leading-relaxed">{children}</div>}
    </div>
  );
}

const STATUS_COLOR = { ok: 'text-bb-green-light', no: 'text-[#e35d5d]', warn: 'text-[#e0b84a]', na: 'text-white/40' };

function StatusIcon({ status }) {
  if (status === 'ok') {
    return (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12l5 5L20 7" />
      </svg>
    );
  }
  if (status === 'no') {
    return (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 6l12 12M18 6 6 18" />
      </svg>
    );
  }
  if (status === 'warn') {
    return (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    );
  }
  return null;
}

function CompareCell({ cell }) {
  const [status, text] = cell;
  return (
    <span className={`inline-flex items-start justify-center gap-1.5 text-[0.875rem] leading-snug text-center ${STATUS_COLOR[status]}`}>
      <StatusIcon status={status} />
      <span className="whitespace-nowrap">{text}</span>
    </span>
  );
}

export default function TestosteroneCoffee() {
  const [mode, setMode] = useState('sub');
  const [qty, setQty] = useState(2);
  const [activeImg, setActiveImg] = useState(0);

  const plan = PLANS[qty];
  const offer = plan[mode];
  const checkoutUrl = CHECKOUT[mode][qty];

  return (
    <div className="min-h-screen w-full bg-bb-dark text-white overflow-x-hidden">
      {/* Top announcement bar */}
      <div
        className="w-full text-center py-2.5 px-4"
        style={{
          background: 'radial-gradient(143.34% 70.77% at 37.69% -10.12%, #FED9A5 0%, #D09439 100%)',
          borderBottom: '1px solid #8A6A1E',
        }}
      >
        <p className="text-bb-text-dark text-[0.75rem] font-bold tracking-[0.2em] uppercase">
          ★ Limited Time Offer — 34% Off ★
        </p>
      </div>

      {/* Navbar */}
      <nav className="px-4 border-b border-bb-separator">
        <div className="max-w-[71.25rem] mx-auto flex items-center justify-between py-3.5">
          <a href="#/" aria-label="Balls & Brains home">
            <img src={bbSymbol} alt="Balls & Brains" className="h-8 w-auto object-contain" />
          </a>
          <span className="text-bb-gold/80 text-[0.8125rem] font-medium tracking-[0.3em] uppercase">
            Testosterone Coffee
          </span>
          <div className="flex items-center text-white/80">
            <CartIcon className="w-5 h-5" />
          </div>
        </div>
      </nav>

      <main className="px-4 py-6 md:py-12">
        <div className="max-w-[71.25rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-start">
          {/* LEFT — gallery + benefits */}
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-square rounded-2xl overflow-hidden bg-black border border-bb-separator">
              <img src={GALLERY[activeImg]} alt="Balls & Brains Testosterone Coffee" className="w-full h-full object-contain" />
            </div>

            <div className="grid grid-cols-5 gap-2.5">
              {GALLERY.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImg(i)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 bg-black transition-colors ${
                    activeImg === i ? 'border-bb-gold-mid' : 'border-bb-separator hover:border-white/40'
                  }`}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>

            <ul className="rounded-2xl border border-bb-separator bg-[#14100c] p-5 space-y-3">
              {PRODUCT_BENEFITS.map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <img src={checkGold} alt="" aria-hidden="true" className="shrink-0 w-5 h-5" />
                  <span className="text-white/90 text-[0.875rem]">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — buy box */}
          <div className="min-w-0">
            <StarRating />

            <h1 className="text-[1.5rem] md:text-[1.75rem] font-bold! leading-tight tracking-tight my-4">
              Balls &amp; Brains™ Testosterone&nbsp;Coffee
            </h1>

            <div className="flex items-center gap-2.5 flex-wrap mb-4">
              <span className="text-[1.5rem] font-bold text-bb-green-light">
                {offer.price}
                {offer.perUnit && <span className="text-white/55 text-[1rem] font-medium"> {offer.perUnit}</span>}
              </span>
              {offer.old && <span className="text-white/40 text-[0.9375rem] line-through">{offer.old}</span>}
              <span className="bg-[#008236] text-white text-[0.6875rem] font-bold px-2.5 py-0.5 rounded uppercase tracking-wide">
                {offer.save}
              </span>
            </div>

            <p className="text-white/65 text-[0.9375rem] leading-relaxed mb-3">
              Naturally <strong className="text-white font-semibold">optimize testosterone</strong> in weeks, and eliminate brain fog, dead libido, low energy, and dad bod — all with your morning coffee ritual.
            </p>

            {/* Mode tabs */}
            <div className="grid grid-cols-2 border-b border-bb-separator mb-4">
              {[
                { key: 'sub', label: 'Subscribe & Save' },
                { key: 'one', label: 'One-Time Purchase' },
              ].map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setMode(t.key)}
                  className={`py-2.5 text-[0.8125rem] font-semibold transition-all ${
                    mode === t.key
                      ? 'text-white font-bold shadow-[inset_0_-2px_0_var(--color-bb-gold-mid)]'
                      : 'text-white/45 hover:text-white/70'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <p className="text-white/65 text-[0.875rem] mb-5">
              Bundle &amp; Save:{' '}
              <strong className="text-white">{mode === 'sub' ? 'Monthly Subscription' : 'One-Time Purchase'}</strong>
            </p>

            {/* Bundle cards */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {PLANS.map((p, i) => {
                const o = p[mode];
                const active = qty === i;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setQty(i)}
                    className={`relative text-center rounded-xl border-2 p-2.5 pt-5 transition-colors ${
                      active ? 'border-bb-gold-mid bg-[#261F16]' : 'border-bb-separator bg-[#181818] hover:border-white/30'
                    }`}
                  >
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-bb-gold-mid text-bb-text-dark text-[0.625rem] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                      {o.save}
                    </span>
                    <img src={p.image} alt="" className="w-10 h-10 mx-auto object-contain mb-2" />
                    <p className="text-white text-[0.8125rem] font-bold leading-tight">{p.name}</p>
                    {o.old && <p className="text-white/35 text-[0.6875rem] line-through">{o.old}</p>}
                    <p className="text-white text-[0.8125rem] font-bold mt-0.5">
                      {o.price}
                      {o.perUnit && <span className="text-white/55 font-normal"> {o.perUnit}</span>}
                    </p>
                    {o.totalLabel && <p className="text-white/45 text-[0.625rem] mt-0.5">{o.totalLabel}</p>}
                  </button>
                );
              })}
            </div>

            {/* ADD TO CART */}
            <a
              href={checkoutUrl}
              className="flex items-center justify-center gap-2.5 w-full h-14 bg-[#008236] hover:brightness-110 text-white text-[0.875rem] font-extrabold tracking-widest uppercase rounded-lg transition-all no-underline mb-4"
            >
              <CartIcon className="w-4 h-4" />
              Add to Cart — {offer.cartTotal}
            </a>

            <div className="flex items-center gap-2 text-white/65 text-[0.875rem] mb-5">
              <span className="w-2.5 h-2.5 rounded-full bg-bb-green shrink-0" />
              In stock — 121,847+ Optimized Men
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 rounded-xl border border-bb-gold-dark/40 bg-[#14100c] overflow-hidden mb-6">
              {TRUST.map((t, i) => (
                <div key={t.title} className={`p-3.5 text-center ${i > 0 ? 'border-l border-bb-separator' : ''}`}>
                  <span className="block w-6 h-6 mx-auto mb-1.5 text-bb-gold-mid">{t.icon}</span>
                  <p className="text-white text-[0.6875rem] font-bold leading-tight">{t.title}</p>
                  <p className="text-white/45 text-[0.625rem] leading-tight mt-0.5">{t.sub}</p>
                </div>
              ))}
            </div>

            {/* Bonuses */}
            <p className="text-white/75 text-[0.875rem] mb-3">
              <strong className="text-white">Exclusive Offer!</strong> Order today for free bonuses:
            </p>
            <div className="grid grid-cols-4 gap-2 mb-6">
              {BONUSES.map((b) => (
                <div key={b.name} className="text-center">
                  <div className="w-12 h-12 mx-auto mb-1.5 overflow-hidden">
                    <img src={b.img} alt={b.name} className="w-full h-full object-contain" />
                  </div>
                  <p className="text-white/70 text-[0.625rem] leading-tight">{b.name}</p>
                </div>
              ))}
            </div>

            {/* Accordions */}
            <div className="space-y-2.5">
              <Accordion label="Shipping Details" defaultOpen>
                <p>
                  Free shipping on orders over $75. Standard delivery 3–5 business days. Express
                  available at checkout. Ships from our US facility.
                </p>
              </Accordion>

              <Accordion label="Ingredients">
                <p className="mb-3">12 clinical-dose ingredients in every cup, on a base of smooth organic Colombian Arabica:</p>
                <ul className="space-y-1.5">
                  {INGREDIENTS.map(([name, dose]) => (
                    <li key={name} className="flex items-center justify-between gap-4 border-b border-bb-separator/60 pb-1.5">
                      <span className="text-white/85">{name}</span>
                      <span className="text-bb-gold-mid font-medium whitespace-nowrap">{dose}</span>
                    </li>
                  ))}
                </ul>
              </Accordion>

              <Accordion label="Frequently Asked Questions">
                <div className="space-y-4">
                  {FAQS.map((f) => (
                    <div key={f.q}>
                      <p className="text-white font-semibold mb-1">{f.q}</p>
                      <p>{f.a}</p>
                    </div>
                  ))}
                </div>
              </Accordion>
            </div>
          </div>
        </div>
      </main>

      {/* Press strip — marquee */}
      <div className="bg-white overflow-hidden">
        <div className="flex w-max items-center py-4" style={{ animation: 'marquee 30s linear infinite' }}>
          {[0, 1, 2].map((copy) => (
            <div key={copy} className="flex items-center shrink-0">
              {Array.from({ length: 4 }).flatMap((_, rep) =>
                PRESS.map((logo, i) => (
                  <img key={`${copy}-${rep}-${i}`} src={logo} alt="" aria-hidden="true" className="h-[1.125rem] w-auto mx-7 shrink-0" />
                )),
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Optimize Testosterone Naturally */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-[71.25rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <h2 className="text-[2rem] md:text-[2.75rem] font-bold! leading-[1.1] tracking-tight">
              <span className="text-white">Optimize</span>
              <br />
              <span className="text-gold-gradient">Testosterone Naturally</span>
            </h2>
            <span className="block w-16 h-0.5 mt-4 mb-7 rounded-full" style={{ background: 'linear-gradient(90deg, #CF9947 0%, #7D5D2C 100%)' }} />

            <div className="space-y-4 text-white/60 text-[0.9375rem] leading-relaxed">
              <p>
                Modern years of stress, poor sleep, and high-cortisol coffee habits have disrupted your body’s{' '}
                <strong className="text-white font-semibold">natural hormone production system</strong>. When cortisol stays elevated 24/7, it suppresses the HPG axis (the brain-to-testicles signal) and blocks your body’s ability to produce testosterone.
              </p>
              <p>
                Even worse: the testosterone you DO produce gets converted into estrogen by the aromatase enzyme, leading to{' '}
                <strong className="text-white font-semibold">belly fat, man boobs, low libido, and brain fog.</strong>
              </p>
              <p>
                Drinking Balls &amp; Brains Testosterone Coffee each morning rebalances the Hormonal Seesaw—lowering cortisol by up to 27.9% while amplifying testosterone production by 15–46%—using the combined power of clinical-dose Tongkat Ali, Ashwagandha, Fadogia, and functional mushrooms.
              </p>
              <p>
                This stops the testosterone-to-estrogen conversion and restores your natural masculine hormone levels, leaving you with{' '}
                <span className="text-bb-gold font-semibold">sustained energy, sharp focus, lean muscle, and high sex drive.</span> Forever.
              </p>
            </div>

            <div className="flex items-center gap-3 mt-7 rounded-xl border border-bb-separator bg-[#14100c] px-4 py-3.5">
              <img src={checkGold} alt="" aria-hidden="true" className="shrink-0 w-5 h-5" />
              <p className="text-white/70 text-[0.875rem]">
                <span className="text-bb-gold font-bold">89%</span> of users reported{' '}
                <span className="text-bb-gold">measurable testosterone increases</span> within 8 weeks
              </p>
            </div>
          </div>

          <img src={imgOptimize} alt="Man training in the gym" className="w-full h-auto rounded-2xl" />
        </div>
      </section>

      {/* LEVEL 1 — Clean Energy Without Cortisol Spike (seção clara) */}
      <section className="bg-bb-light text-bb-text-dark px-4 py-16 md:py-24">
        <div className="max-w-[71.25rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <p className="text-bb-gold-mid text-[0.75rem] font-bold tracking-[0.3em] uppercase mb-3">Level 1</p>
            <h2 className="text-[2rem] md:text-[2.75rem] font-bold! leading-[1.1] tracking-tight">
              <span className="text-bb-text-dark">Clean Energy Without</span>
              <br />
              <span className="text-gold-gradient">Cortisol Spike</span>
            </h2>
            <span className="block w-16 h-0.5 mt-4 mb-7 rounded-full" style={{ background: 'linear-gradient(90deg, #CF9947 0%, #7D5D2C 100%)' }} />

            <div className="space-y-4 text-bb-text-dark/70 text-[0.9375rem] leading-relaxed">
              <p>
                <strong className="text-bb-text-dark font-semibold">The Problem:</strong> Regular coffee contains 200–300mg of caffeine that spikes cortisol by 20–30% within minutes. This cortisol surge directly{' '}
                <strong className="text-bb-text-dark font-semibold">suppresses your HPG axis</strong>—the system that tells your body to make testosterone.
              </p>
              <p>
                <strong className="text-bb-text-dark font-semibold">The Solution:</strong> Balls &amp; Brains uses just 100mg of caffeine (1/3 of regular coffee) combined with L-Theanine (100mg) and MCT Oil Powder (2000mg).
              </p>
              <p>
                This creates smooth, sustained energy for 6–8 hours with{' '}
                <span className="text-bb-gold-mid font-semibold">zero cortisol spike</span>. You get alertness and mental clarity without triggering the stress response that destroys testosterone.
              </p>
              <p>
                <strong className="text-bb-text-dark font-semibold">Clinical Backing:</strong> A study in the American Journal of Clinical Nutrition showed this exact combination provides{' '}
                <span className="text-bb-gold-mid font-semibold">sustained cognitive performance</span> without raising cortisol levels.
              </p>
            </div>
          </div>

          <img src={imgCleanEnergy} alt="Stressed brain versus calm brain with product" className="w-full h-auto rounded-2xl" />
        </div>
      </section>

      {/* LEVEL 2 — Rebalance The Hormonal Seesaw (escuro, imagem à esquerda) */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-[71.25rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <img src={imgSeesaw} alt="Hormonal seesaw — cortisol versus testosterone" className="w-full h-auto rounded-2xl" />

          <div>
            <p className="text-bb-gold-mid text-[0.75rem] font-bold tracking-[0.3em] uppercase mb-3">Level 2</p>
            <h2 className="text-[2rem] md:text-[2.75rem] font-bold! leading-[1.1] tracking-tight">
              <span className="text-gold-gradient">Rebalance</span> <span className="text-white">The Hormonal Seesaw</span>
            </h2>
            <span className="block w-16 h-0.5 mt-4 mb-7 rounded-full" style={{ background: 'linear-gradient(90deg, #CF9947 0%, #7D5D2C 100%)' }} />

            <div className="space-y-4 text-white/60 text-[0.9375rem] leading-relaxed">
              <p><strong className="text-white font-semibold">The Problem:</strong> Your hormones exist on a biological seesaw. When cortisol goes up, testosterone MUST come down. Chronic stress and coffee keep cortisol elevated 24/7, crushing testosterone into the dirt.</p>
              <p><strong className="text-white font-semibold">The Solution:</strong> Balls &amp; Brains Testosterone Coffee attacks both sides of the seesaw simultaneously:</p>
            </div>

            <p className="text-white font-bold text-[0.9375rem] mt-5 mb-2.5">Cortisol Reduction:</p>
            <ul className="space-y-2.5">
              {LEVEL2_CORTISOL.map(([name, desc]) => (
                <li key={name} className="flex gap-2.5">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-bb-gold-mid shrink-0" />
                  <span className="text-white/60 text-[0.9375rem] leading-relaxed"><strong className="text-white font-semibold">{name}</strong> — {desc}</span>
                </li>
              ))}
            </ul>

            <p className="text-white font-bold text-[0.9375rem] mt-5 mb-2.5">Testosterone Amplification:</p>
            <ul className="space-y-2.5">
              {LEVEL2_TESTO.map(([name, desc]) => (
                <li key={name} className="flex gap-2.5">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-bb-gold-mid shrink-0" />
                  <span className="text-white/60 text-[0.9375rem] leading-relaxed"><strong className="text-white font-semibold">{name}</strong> — {desc}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 border-l-4 border-bb-gold-mid rounded-r-lg bg-[#14100c] px-5 py-4">
              <p className="text-bb-gold text-[0.9375rem] leading-relaxed">
                <strong className="font-bold">The Result:</strong> Cortisol DOWN, Testosterone UP — the seesaw rebalances for the first time in years.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LEVEL 3 — Block Testosterone-to-Estrogen Conversion (claro, texto à esquerda) */}
      <section className="bg-bb-light text-bb-text-dark px-4 py-16 md:py-24">
        <div className="max-w-[71.25rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <p className="text-bb-gold-mid text-[0.75rem] font-bold tracking-[0.3em] uppercase mb-3">Level 3</p>
            <h2 className="text-[2rem] md:text-[2.75rem] font-bold! leading-[1.1] tracking-tight">
              <span className="text-bb-text-dark">Block </span>
              <span className="text-gold-gradient">Testosterone-to-Estrogen Conversion</span>
            </h2>
            <span className="block w-16 h-0.5 mt-4 mb-7 rounded-full" style={{ background: 'linear-gradient(90deg, #CF9947 0%, #7D5D2C 100%)' }} />

            <div className="space-y-4 text-bb-text-dark/70 text-[0.9375rem] leading-relaxed">
              <p><strong className="text-bb-text-dark font-semibold">The Problem:</strong> When testosterone is low, an enzyme called <strong className="text-bb-text-dark font-semibold">aromatase</strong> activates and converts your remaining testosterone into estrogen. This causes man boobs, belly fat, mood swings, and further testosterone suppression.</p>
              <p><strong className="text-bb-text-dark font-semibold">The Solution:</strong> Balls &amp; Brains Testosterone Coffee includes natural aromatase inhibitors:</p>
            </div>

            <ul className="space-y-2.5 mt-4">
              {LEVEL3_INHIBITORS.map(([name, desc]) => (
                <li key={name} className="flex gap-2.5">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-bb-gold-mid shrink-0" />
                  <span className="text-bb-text-dark/70 text-[0.9375rem] leading-relaxed"><strong className="text-bb-text-dark font-semibold">{name}</strong> — {desc}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 border-l-4 border-bb-gold-mid rounded-r-lg bg-[#1a140b] px-5 py-4">
              <p className="text-bb-gold text-[0.9375rem] italic leading-relaxed">
                The Result: You KEEP the testosterone your body produces instead of watching it convert into the female hormone.
              </p>
            </div>
          </div>

          <img src={imgBlockConversion} alt="Shield blocking testosterone-to-estrogen conversion" className="w-full h-auto rounded-2xl" />
        </div>
      </section>

      {/* BONUS — Cognitive Enhancement Stack (claro, imagem à esquerda) */}
      <section className="bg-bb-light text-bb-text-dark px-4 py-16 md:py-24">
        <div className="max-w-[71.25rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <img src={imgCognitive} alt="Cognitive enhancement — mushrooms, coffee and neurons" className="w-full h-auto rounded-2xl" />

          <div>
            <p className="text-bb-gold-mid text-[0.75rem] font-bold tracking-[0.3em] uppercase mb-3">Bonus</p>
            <h2 className="text-[2rem] md:text-[2.75rem] font-bold! leading-[1.1] tracking-tight text-gold-gradient">
              Cognitive Enhancement Stack
            </h2>
            <span className="block w-16 h-0.5 mt-4 mb-7 rounded-full" style={{ background: 'linear-gradient(90deg, #CF9947 0%, #7D5D2C 100%)' }} />

            <p className="text-bb-text-dark/70 text-[0.9375rem] leading-relaxed mb-5">
              While optimizing your hormones, Balls &amp; Brains also enhances brain performance:
            </p>

            <ul className="space-y-2.5">
              {BONUS_STACK.map(([name, desc]) => (
                <li key={name} className="flex gap-2.5">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-bb-gold-mid shrink-0" />
                  <span className="text-bb-text-dark/70 text-[0.9375rem] leading-relaxed"><strong className="text-bb-text-dark font-semibold">{name}</strong> — {desc}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 border-l-4 border-bb-gold-mid rounded-r-lg bg-[#1a140b] px-5 py-4">
              <p className="text-bb-gold text-[0.9375rem] italic leading-relaxed">
                The Result: Razor-sharp mental clarity, sustained focus, and cognitive performance that lasts all day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder video — Tired of Reading? (escuro, texto à esquerda) */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-[71.25rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <h2 className="text-[2rem] md:text-[2.75rem] font-bold! leading-[1.1] tracking-tight">
              <span className="text-gold-gradient">Tired of Reading?</span> <span className="text-white">Here&apos;s a Message From Our Founder</span>
            </h2>
            <span className="block w-16 h-0.5 mt-4 mb-7 rounded-full" style={{ background: 'linear-gradient(90deg, #CF9947 0%, #7D5D2C 100%)' }} />

            <div className="space-y-4 text-white/60 text-[0.9375rem] leading-relaxed">
              <p>I&apos;m Dr. Michael Bennett, MD, specialist in Sports Medicine &amp; Men&apos;s Hormonal Health at Mass General Hospital</p>
              <p>and I&apos;m the founder of <strong className="text-bb-gold font-semibold">Balls &amp; Brains.</strong></p>
              <p>{'Three years ago, I was staring at my testosterone results: 360 ng/dL. Other doctors said it was "normal for my age." But I felt like absolute shit.'}</p>
              <p>I spent 18 months researching the connection between cortisol, coffee, and testosterone. What I discovered changed everything.</p>
              <p>In this video, I&apos;ll explain:</p>
            </div>

            <ul className="space-y-2 my-4">
              {FOUNDER_POINTS.map((pt) => (
                <li key={pt} className="flex items-start gap-2.5">
                  <img src={starIcon} alt="" aria-hidden="true" className="w-3.5 h-3.5 mt-1 shrink-0" />
                  <span className="text-white/60 text-[0.9375rem]">{pt}</span>
                </li>
              ))}
            </ul>

            <p className="text-white/60 text-[0.9375rem]">Watch to find out more.</p>
          </div>

          {/* Capa do vídeo do founder (vídeo em si pendente). Play personalizado sobre a capa. */}
          <div className="relative w-full rounded-2xl overflow-hidden">
            <img src={imgFounderCover} alt="Dr. Michael Bennett — message from our founder" className="w-full h-auto" />
            <button type="button" aria-label="Play founder video" className="absolute inset-0 flex items-center justify-center group cursor-pointer">
              <img src={playVideo} alt="" className="w-20 h-20 transition-transform duration-300 group-hover:scale-110" />
            </button>
          </div>
        </div>
      </section>

      {/* Beneficial Against Multiple Health Issues (full-width, 60px das bordas) */}
      <section className="px-4 md:px-[3.75rem] py-16 md:py-24">
        <div>
          <h2 className="text-[1.875rem] md:text-[3rem] font-bold! leading-tight tracking-tight text-center">
            <span className="text-white">Beneficial Against Multiple </span>
            <span className="text-gold-gradient">Health Issues</span>
          </h2>
          <p className="text-white/55 text-[0.9375rem] md:text-[1.0625rem] leading-relaxed text-center max-w-[44rem] mx-auto mt-5 mb-12 md:mb-16">
            With the help of functional medicine doctors and hormone specialists, we developed Balls &amp; Brains to target the most common issues men face from declining testosterone:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {HEALTH_ISSUES.map(([title, body], i) => (
              <div key={title} className="flex items-start gap-4 rounded-2xl border border-bb-separator bg-[#121212] p-5 md:p-6">
                <img src={NUMBERS[i]} alt="" aria-hidden="true" className="w-12 h-12 shrink-0" />
                <div>
                  <h3 className="text-white font-bold! text-[1.0625rem] leading-tight mb-2">{title}</h3>
                  <p className="text-bb-gold/80 text-[0.875rem] leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 25 Times Cheaper Than Separate Supplements (escuro, texto à esquerda) */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-[71.25rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <h2 className="text-[2rem] md:text-[2.75rem] font-bold! leading-[1.1] tracking-tight">
              <span className="text-gold-gradient">25 Times Cheaper</span> <span className="text-white">Than Separate Supplements</span>
            </h2>
            <span className="block w-16 h-0.5 mt-4 mb-7 rounded-full" style={{ background: 'linear-gradient(90deg, #CF9947 0%, #7D5D2C 100%)' }} />

            <p className="text-white/60 text-[0.9375rem] leading-relaxed">
              Balls &amp; Brains combines testosterone optimization, cognitive enhancement, stress reduction, and clean energy in one product. Conventionally...
            </p>

            <ul className="space-y-2.5 my-5">
              {PRICE_COMPARE.map(([label, val]) => (
                <li key={label} className="flex gap-2.5">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-bb-gold-mid shrink-0" />
                  <span className="text-[0.9375rem] leading-relaxed">
                    <strong className="text-white font-semibold">{label}</strong> <span className="text-bb-gold/80">{val}</span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="border-t border-bb-separator pt-4 mb-5">
              <p className="text-white font-bold text-[0.9375rem]">Total separate cost: $200–265/month</p>
            </div>

            <div className="space-y-4 text-white/60 text-[0.9375rem] leading-relaxed">
              <p>
                At the supplement-recommended standard of clinical doses, buying these separately would cost about{' '}
                <strong className="text-white font-semibold">$2,400–3,180 per year</strong>, which is{' '}
                <span className="text-bb-gold font-semibold">up to 25 times more expensive than Balls &amp; Brains subscription price</span> ($39/month).
              </p>
              <p>Plus you&apos;d be choking down 10+ pills every morning instead of enjoying one delicious cup of coffee.</p>
              <p>{'Our sale ends soon, so click "add to cart" to get your Balls & Brains Testosterone Coffee before inventory runs out.'}</p>
            </div>
          </div>

          <img src={imgCheaper} alt="Balls & Brains coffee preparation" className="w-full h-auto rounded-2xl" />
        </div>
      </section>

      {/* Real Results, Real People (claro, stats à direita) */}
      <section className="bg-bb-light text-bb-text-dark px-4 py-16 md:py-24">
        <div className="max-w-[71.25rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <h2 className="text-[2.625rem] md:text-[3.625rem] font-bold! leading-[1.05] tracking-tight">
              <span className="text-bb-text-dark">Real </span>
              <span className="text-gold-gradient">Results,</span>
              <br />
              <span className="text-bb-text-dark">Real People</span>
            </h2>
            <span className="block w-16 h-0.5 mt-5 mb-7 rounded-full" style={{ background: 'linear-gradient(90deg, #CF9947 0%, #7D5D2C 100%)' }} />
            <p className="text-bb-text-dark/70 text-[0.9375rem] md:text-[1rem] leading-relaxed max-w-[28rem]">
              We conducted a pilot study where{' '}
              <span className="text-bb-gold-mid font-medium">287 men aged 35–60 with confirmed low testosterone</span>{' '}
              (under 450 ng/dL.) used Balls &amp; Brains for 8–12 weeks. Here are the results:
            </p>
          </div>

          <div className="space-y-6">
            {RESULTS_STATS.map(([icon, text]) => (
              <div key={text} className="flex items-center gap-4">
                <img src={icon} alt="" aria-hidden="true" className="w-16 h-16 shrink-0" />
                <p className="text-bb-text-dark/70 text-[0.9375rem] leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Balls & Brains Better? (escuro, tabela comparativa full-width) */}
      <section className="px-4 md:px-[3.75rem] py-16 md:py-24">
        <div>
          <h2 className="text-[1.875rem] md:text-[2.75rem] font-bold! leading-tight tracking-tight text-center mb-10 md:mb-14">
            <span className="text-white">What Makes </span>
            <span className="text-gold-gradient">Balls &amp; Brains</span>
            <span className="text-white"> Better?</span>
          </h2>

          <div className="overflow-x-auto">
            <div className="grid grid-cols-[minmax(9rem,1.1fr)_minmax(max-content,0.7fr)_minmax(max-content,1fr)_minmax(max-content,1.05fr)_minmax(max-content,1.05fr)]">
              {/* Header */}
              <div />
              <div className="rounded-t-2xl border-t border-x border-bb-gold-mid bg-bb-gold-mid/[0.06] px-4 pt-6 pb-5 flex flex-col items-center text-center">
                <img src={bbSymbol} alt="" aria-hidden="true" className="h-7 w-auto mb-2" />
                <span className="text-white font-bold tracking-wide text-[0.95rem]">BALLS &amp; BRAINS</span>
              </div>
              <div className="px-4 py-5 flex items-end justify-center text-center"><span className="text-white/80 font-bold text-[0.95rem] whitespace-nowrap">Regular Coffee</span></div>
              <div className="px-4 py-5 flex items-end justify-center text-center"><span className="text-white/80 font-bold text-[0.95rem] whitespace-nowrap">Other Mushroom Coffee</span></div>
              <div className="px-4 py-5 flex items-end justify-center text-center"><span className="text-white/80 font-bold text-[0.95rem] whitespace-nowrap">Testosterone Pills</span></div>

              {/* Rows */}
              {COMPARE_ROWS.map((row, ri) => {
                const last = ri === COMPARE_ROWS.length - 1;
                const [label, bb, ...rest] = row;
                return (
                  <div key={label} className="contents">
                    <div className="border-b border-bb-separator py-5 pr-4 flex items-center">
                      <span className="text-white/55 font-bold uppercase tracking-[0.08em] text-[0.6875rem] leading-tight">{label}</span>
                    </div>
                    <div className={`border-x border-bb-gold-mid bg-bb-gold-mid/[0.06] px-4 py-5 flex items-center justify-center ${last ? 'border-b rounded-b-2xl' : ''}`}>
                      <CompareCell cell={bb} />
                    </div>
                    {rest.map((c, ci) => (
                      <div key={ci} className="border-b border-bb-separator px-4 py-5 flex items-center justify-center">
                        <CompareCell cell={c} />
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
