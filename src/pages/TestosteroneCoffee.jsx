import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import FadeUp from '../components/_shared/FadeUp';
import bbSymbol from '../assets/utils/bb-symbol.svg';
import footerLogo from '../assets/utils/footer-logo.svg';
import starIcon from '../assets/icons/Star.svg';
import checkGold from '../assets/icons/check-gold.svg';
import pressGq from '../assets/press/gq.svg';
import pressForbes from '../assets/press/forbes.svg';
import pressMens from '../assets/press/mens-health.svg';
import galleryMain from '../assets/products/gallery-01.webp';
import kit2 from '../assets/products/2kits.webp';
import galleryTrust from '../assets/primal/gallery-trust.webp';
import galleryStronger from '../assets/primal/gallery-stronger.webp';
import galleryUgc from '../assets/primal/gallery-ugc.webp';
import galleryActives from '../assets/primal/gallery-actives.webp';
import pack1 from '../assets/primal/pack-1.webp';
import pack3 from '../assets/primal/pack-3.webp';
import pack5 from '../assets/primal/pack-5.webp';
import guaranteeStamp from '../assets/utils/guarantee-stamp.webp';
import suppTongkat from '../assets/primal/supp-tongkat.webp';
import suppShilajit from '../assets/primal/supp-shilajit.webp';
import suppAshwagandha from '../assets/primal/supp-ashwagandha.webp';
import suppCaffeine from '../assets/primal/supp-caffeine.webp';
import suppLionsmane from '../assets/primal/supp-lionsmane.webp';
import suppVitamind from '../assets/primal/supp-vitamind.webp';
import suppZinc from '../assets/primal/supp-zinc.webp';
import suppLtheanine from '../assets/primal/supp-ltheanine.webp';
import suppCordyceps from '../assets/primal/supp-cordyceps.webp';
import suppChaga from '../assets/primal/supp-chaga.webp';

// ⚠️ PENDENTE: links de checkout por bundle (1/3/5 pouches, subscription) ainda não fornecidos.
// Todos apontam pro CTA canônico do projeto até o cliente passar os links corretos. Ver docs/OPEN-QUESTIONS.
const CHECKOUT_URL = 'https://ballsnbrains.com/shp/tmc-adv/08/p2-v2/';

// Popup de upsell (abre ao clicar na sacola do navbar) — idêntico ao backlog.
// ⚠️ Conteúdo herdado do produto antigo (kit, preços, links, "60-Day"); atualizar p/ Primal quando definido.
const CART_POPUP = {
  sub: {
    subtitlePrice: '$69!',
    price: '$69',
    old: '$138',
    perPouch: '$34.50',
    discount: ['50%', 'OFF'],
    cta: 'YES! Get 2 Kits for $69',
    purchaseLink: 'https://links.ballsnbrains.com/go/1-mushroom-coffe-tmc-popup-subscribe-adv7-mkw8bv65/?referrer=Organic',
  },
  one: {
    subtitlePrice: '$89!',
    price: '$89',
    old: '$138',
    perPouch: '$44.50',
    discount: ['36%', 'OFF'],
    cta: 'YES! Get 2 Kits for $89',
    purchaseLink: 'https://links.ballsnbrains.com/go/1-mushroom-coffe-tmc-popup-onetime-adv7-mkw8b3xn',
  },
};

const GALLERY = [galleryMain, galleryTrust, galleryStronger, galleryUgc, galleryActives];

const HERO_BENEFITS = [
  'Supports healthy testosterone',
  'Clean and sustained energy',
  'Sharper focus & mental clarity',
  'Built for male performance',
];

// id = nº de pouches. cartTotal = preço final do bundle.
const BUNDLES = [
  {
    id: 1,
    image: pack1,
    badge: null,
    title: 'Buy 1',
    pouches: '1 Pouch',
    perks: ['Free Shipping', 'Free access to Balls&Brains App'],
    price: '$49',
    per: null,
    regular: '$69',
    total: null,
    note: '28% OFF First Order — Promo Active',
    cartTotal: '$49',
  },
  {
    id: 3,
    image: pack3,
    badge: 'Most Popular',
    title: 'Buy 2, Get 1',
    pouches: '3 Pouches',
    perks: ['Free Shipping', 'You save 43%', 'Free access to Balls&Brains App'],
    price: '$39',
    per: '/ Pouch',
    regular: '$207',
    total: '$117',
    note: null,
    cartTotal: '$117',
  },
  {
    id: 5,
    image: pack5,
    badge: 'Best Value',
    title: 'Buy 3, Get 2 Free',
    pouches: '5 Pouches',
    perks: ['Free Shipping', 'You save 58%', 'Free access to Balls&Brains App'],
    price: '$29',
    per: '/ Pouch',
    regular: '$345',
    total: '$145',
    note: null,
    cartTotal: '$145',
  },
];

const PRESS = [pressMens, pressForbes, pressGq];

const INGREDIENTS = [
  ['Tongkat Ali', '300mg', 'Increased testosterone by 37% and reduced cortisol by 16% in 4 weeks.'],
  ['Shilajit', '100mg', 'Increased total testosterone by 20% in healthy men over 90 days.'],
  ['Zinc Glycinate', '30mg', 'Zinc supplementation nearly doubled serum testosterone in deficient elderly men.'],
  ['Ashwagandha', '300mg', 'Reduced cortisol levels by 27.9% in 60 days.'],
  ['Cholecalciferol (Vitamin D)', '2,000UI', 'Men supplementing Vitamin D saw a 25% increase in total testosterone over 12 months.'],
  ["Lion's Mane", '800mg', 'Significant cognitive improvement in adults with mild cognitive impairment over 16 weeks.'],
  ['Reishi', '100mg', 'Shown to support sleep quality by modulating serotonin pathways.'],
  ['Cordyceps Militaris', '250mg', 'Improved VO2max and increased time to exhaustion by 70 seconds in 3 weeks.'],
  ['L-Theanine', '200mg', 'Combined with caffeine, improved attention accuracy and reduced mental fatigue.'],
  ['Chaga', '100mg', 'Rich in polysaccharides with demonstrated antioxidant and immunomodulatory properties.'],
  ['Caffeine', '100mg', 'Significantly improved attention, processing speed, and accuracy across 13 studies.'],
  ['Organic Arabica Coffee', '1,000mg', 'The base. Smooth flavor profile, low acidity. The ritual stays the same.'],
];

const TIMELINE = [
  {
    week: 'Week 1',
    title: 'Stress & Energy Reset',
    points: [
      'L-Theanine smooths your caffeine curve — energy feels cleaner, steadier.',
      'Ashwagandha begins modulating your cortisol baseline.',
      "Lion's Mane starts supporting nerve growth factor (NGF) production.",
      'The afternoon crash starts fading — no more 2pm collapse.',
    ],
  },
  {
    week: 'Week 4',
    title: 'Hormones Regulate',
    points: [
      'Cortisol levels measurably lower — sleep improves, recovery accelerates.',
      'Tongkat Ali reaches effective concentration — T-support kicks in.',
      'Cordyceps improves oxygen utilization — workouts feel different.',
      'Focus sharpens. Energy sustains. The fog lifts.',
    ],
  },
  {
    week: 'Week 12',
    title: 'Peak Performance & Vitality',
    points: [
      'Full hormonal optimization — cortisol down, testosterone supported, SHBG managed.',
      'Ashwagandha, Tongkat Ali and Shilajit working in sync at peak levels.',
      'Compounding effects visible in energy, body composition, drive, and bloodwork.',
      "This isn't a spike. This is your new baseline.",
    ],
  },
];

const APP_STEPS = [
  "We'll email you a secret link to sign up for the app for free",
  "We'll give you a free hormone assessment to identify your needs",
  'Your assessment will be sent to Jack, our AI coach, who’ll create your personalized hormone optimization challenge',
  'You’ll receive daily challenges from Jack directly in the app',
  'Complete challenges, earn credits, and redeem them for rewards — from discount coupons to all-inclusive trips',
];

// Slots de depoimento — preencher com UGCs reais (foto, nome, headline, texto).
const TESTIMONIALS = [
  { headline: 'Headline', body: 'Testimonial here', name: 'Nome' },
  { headline: 'Headline', body: 'Testimonial here', name: 'Nome' },
  { headline: 'Headline', body: 'Testimonial here', name: 'Nome' },
];

// "Escrever aqui" no doc — copy rascunhada (revisar/substituir).
const REASONS = [
  ['Regulate your cortisol levels', 'Ashwagandha and Reishi calm the stress response and lower cortisol — the hormone that suppresses testosterone when chronically elevated.'],
  ['Encourages natural testosterone production', 'Clinical doses of Tongkat Ali, Shilajit and Zinc support your body’s own testosterone synthesis instead of replacing it.'],
  ['Stimulates energy metabolism', 'Cordyceps and 100mg of caffeine paired with L-Theanine deliver clean, sustained energy without the spike-and-crash.'],
  ['Supports your memory, focus and cognition', "Lion's Mane and L-Theanine sharpen mental clarity and focus, lifting the brain fog that comes with low testosterone."],
];

const SUPPLEMENTS = [
  ['Tongkat Ali', suppTongkat, '$39.99'],
  ['Shilajit', suppShilajit, '$19.99'],
  ['Ashwagandha', suppAshwagandha, '$19.95'],
  ['Caffeine', suppCaffeine, '$25.99'],
  ["Lion's Mane", suppLionsmane, '$34.95'],
  ['Vitamin D3', suppVitamind, '$23.99'],
  ['Zinc Glycinate', suppZinc, '$19.99'],
  ['L-Theanine', suppLtheanine, '$19.95'],
  ['Cordyceps', suppCordyceps, '$34.95'],
  ['Chaga', suppChaga, '$34.95'],
];

const PROBLEMS = ['Low Testosterone', 'Poor Blood Flow', 'High Cortisol', 'Low Energy', 'Cognitive Decline & Brain Fog'];

// Pares de ativos + o que fazem (recriação do antigo image14 composto). Imagens serão geradas pelo Pedro.
const ACTIVES = [
  ['Tongkat Ali · Vitamin D3', 'Increase Your T-Production Naturally'],
  ['Shilajit · Zinc Glycinate', 'Improve Your Blood Flow'],
  ['Ashwagandha · L-Theanine', 'Reduce Your Cortisol Levels'],
  ['Caffeine · Cordyceps', 'Improve Your Energy Levels'],
  ["Lion's Mane · Chaga", 'Improve Your Cognition Function'],
];

const SYMPTOM_GROUPS = [
  ['No morning wood?', 'Low sex drive?', 'Weak erections?'],
  ['Struggling to lose weight?', 'High blood sugar?', 'Growing man boobs?', "Feel like your belly is getting bigger every single day, even when you’re barely eating?"],
  ['Fatigue?', 'Low drive?', 'Do you wake up with barely enough energy to get out of bed?'],
  ['Brain fog?', 'Repeating the same stories over and over?', 'Forgetting words in the middle of a sentence?'],
  ['Muscles getting weaker and weaker?', 'Tired legs?', 'Sudden joint pain?'],
];

const FAQS = [
  ['What is Balls&Brains® Primal Coffee?', 'A men’s performance mushroom coffee: roasted Arabica blended with clinical-dose adaptogens, functional mushrooms and ancestral nutrients to support testosterone, lower cortisol, and deliver clean, sustained energy — all in your daily coffee ritual.'],
  ['Who is Balls&Brains® Primal Coffee for?', 'Men — especially over 40 — who want to support healthy testosterone, energy, focus and drive without injections or choking down a handful of pills every morning.'],
  ['Why not just take regular coffee and separate supplements?', 'Regular coffee spikes cortisol, which suppresses testosterone. Buying clinical doses of Tongkat Ali, Ashwagandha, Shilajit, Lion’s Mane and the rest separately runs about $274/month. Primal Coffee combines them in one cup for a fraction of the cost.'],
  ['When will I see results?', 'Most men notice cleaner energy and less afternoon crash in the first week. Hormonal and cognitive effects build over 4–12 weeks as the ingredients reach effective concentration.'],
  ['How do I prepare it?', 'One scoop in 8–12oz of hot water. Stir or froth, drink black or with your preferred milk. The ritual stays the same.'],
  ['Does it really taste good?', 'Yes — it’s a roasted Arabica base with a smooth flavor profile and low acidity. No earthy or bitter mushroom aftertaste.'],
  ['How much caffeine does it have?', '100mg per serving — about a third of a strong regular coffee — paired with L-Theanine for calm, focused energy without the jitters.'],
  ['Will I go through caffeine withdrawal?', 'Unlikely. At 100mg the caffeine is much lower than most coffee, so the transition is smooth for the vast majority of men.'],
  ['Is this safe? Will it mess with my hormones?', 'Primal Coffee supports your body’s own natural production rather than replacing hormones. It uses clinically studied doses. If you have a medical condition or take medication, check with your physician first.'],
  ['Can I take this if I’m already on TRT?', 'Many men do, but because you’re already managing hormones medically, talk to your prescribing doctor before adding it.'],
  ['Can I use this as a pre-workout?', 'Absolutely — the caffeine, Cordyceps and L-Theanine make it a clean pre-workout for sustained energy and focus.'],
  ['Do I need to cycle off?', 'No cycling required. It’s formulated for daily, long-term use.'],
  ['What’s your refund policy?', '365-day money-back guarantee. If you’re not satisfied, contact support@ballsnbrains.com for a full refund — no questions asked.'],
];

const TRUST_PILLARS = [
  ['microscope', 'Science-Backed Ingredients †'],
  ['shield', 'Third-Party Tested'],
  ['flask', 'Clean Formula'],
  ['globe', 'GMP-Certified Facilities'],
];

// Ordem row-wise (grid de 2 colunas) pra bater com a diagramação da imagem.
const TRUST_CHECKS = [
  'Gluten-Free',
  'No Added Sugar',
  'No Artificial Additives',
  'No Artificial Flavors',
  'Allergen-Free',
  'Easy Daily Ritual',
];

function CartIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function TrustIcon({ name, className = 'w-11 h-11' }) {
  const common = {
    className,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'url(#bbGold)',
    strokeWidth: 1.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };
  if (name === 'microscope') {
    return (
      <svg {...common}>
        <path d="M6 18h8" /><path d="M3 22h18" /><path d="M14 22a7 7 0 1 0 0-14h-1" /><path d="M9 14h2" />
        <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" /><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
      </svg>
    );
  }
  if (name === 'shield') {
    return (
      <svg {...common}>
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }
  if (name === 'flask') {
    return (
      <svg {...common}>
        <path d="M10 2v7.31" /><path d="M14 9.3V2" /><path d="M8.5 2h7" /><path d="M14 9.3a6.5 6.5 0 1 1-4 0" /><path d="M5.52 16h12.96" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" />
    </svg>
  );
}

function CheckCircle({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="url(#bbGold)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function Stars({ className = 'w-4 h-4' }) {
  return (
    <div className="inline-flex items-center gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <img key={i} src={starIcon} alt="" aria-hidden="true" className={className} />
      ))}
    </div>
  );
}

// Placeholder visível e consistente pra conteúdo que o cliente ainda vai fornecer.
function Pending({ label, className = '' }) {
  return (
    <div className={`flex items-center justify-center rounded-xl border border-dashed border-bb-gold-mid/40 bg-bb-gold-mid/[0.04] text-bb-gold-mid/70 text-[0.75rem] italic px-4 py-6 text-center ${className}`}>
      {label}
    </div>
  );
}

function ActiveCard({ names, benefit }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-bb-gold-dark/40 bg-[#100d09] p-3">
      <div className="w-16 h-16 shrink-0 rounded-lg border border-dashed border-bb-gold-mid/40 bg-bb-gold-mid/[0.04] grid place-items-center text-bb-gold-mid/60 text-[0.5rem] tracking-wide">IMG</div>
      <div className="min-w-0">
        <p className="text-bb-gold-mid text-[0.75rem] font-semibold">{names}</p>
        <p className="text-white font-bold text-[0.9375rem] leading-tight">{benefit}</p>
      </div>
    </div>
  );
}

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

function FaqItem({ q, a, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-bb-separator rounded-xl overflow-hidden bg-white/[0.02]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 md:px-6 py-4 text-left cursor-pointer"
      >
        <span className="text-white font-semibold text-[0.9375rem] md:text-[1rem]">{q}</span>
        <span className="text-bb-gold-mid text-2xl leading-none shrink-0 w-5 text-center">{open ? '–' : '+'}</span>
      </button>
      {open && <p className="text-white/55 text-[0.875rem] md:text-[0.9375rem] leading-relaxed px-5 md:px-6 pb-5">{a}</p>}
    </div>
  );
}

function BundleSelector({ order, selected, onSelect }) {
  const cards = order.map((id) => BUNDLES.find((b) => b.id === id));
  return (
    <div className="space-y-3">
      {cards.map((b) => {
        const active = selected === b.id;
        return (
          <button
            key={b.id}
            type="button"
            onClick={() => onSelect(b.id)}
            className={`relative block w-full text-left rounded-xl border-2 transition-colors cursor-pointer ${
              active ? 'border-bb-gold-mid bg-[#1c1710]' : 'border-bb-separator bg-[#141414] hover:border-white/30'
            }`}
          >
            {b.badge && (
              <span
                className={`block w-full text-center text-[0.6875rem] font-bold uppercase tracking-[0.18em] py-1 rounded-t-[0.6rem] ${
                  b.badge === 'Best Value' ? 'bg-bb-gold-mid text-bb-text-dark' : 'bg-bb-green-dark text-white'
                }`}
              >
                {b.badge}
              </span>
            )}
            <div className="flex items-center gap-3 p-3">
              <span className={`shrink-0 w-4 h-4 rounded-full border-2 grid place-items-center ${active ? 'border-bb-gold-mid' : 'border-white/30'}`}>
                {active && <span className="w-2 h-2 rounded-full bg-bb-gold-mid" />}
              </span>
              <img src={b.image} alt={b.pouches} width={64} height={64} loading="lazy" decoding="async" className="w-14 h-14 object-contain shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-white font-bold text-[0.9375rem] leading-tight">{b.title}</p>
                <p className="text-white/55 text-[0.8125rem]">{b.pouches}</p>
                <ul className="mt-1 space-y-0.5">
                  {b.perks.map((p) => (
                    <li key={p} className="flex items-center gap-1.5 text-white/70 text-[0.6875rem]">
                      <img src={checkGold} alt="" aria-hidden="true" className="w-3 h-3 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-right shrink-0">
                <p className="text-bb-green-light font-bold text-[1.125rem] leading-none">
                  {b.price}
                  {b.per && <span className="text-white/55 text-[0.75rem] font-medium"> {b.per}</span>}
                </p>
                {b.total ? (
                  <p className="text-[0.75rem] mt-1">
                    <span className="text-white/40 line-through">{b.regular}</span>{' '}
                    <span className="text-white font-semibold">{b.total}</span>
                  </p>
                ) : (
                  <p className="text-white/40 text-[0.75rem] line-through mt-1">{b.regular}</p>
                )}
                {b.note && <p className="text-bb-gold-mid text-[0.625rem] leading-tight mt-1 max-w-[7rem]">{b.note}</p>}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function AddToCartBlock({ showDelivery = false }) {
  return (
    <div>
      {showDelivery && (
        <p className="text-white/65 text-[0.8125rem] text-center mb-2">🕐 Order now for delivery by: <span className="text-white font-semibold">MM/DD</span></p>
      )}
      <a
        href={CHECKOUT_URL}
        className="flex flex-col items-center justify-center w-full py-3.5 bg-[#008236] hover:brightness-110 text-white rounded-lg transition-all no-underline"
      >
        <span className="flex items-center gap-2.5 text-[1.0625rem] font-extrabold tracking-wide uppercase">
          <CartIcon className="w-5 h-5" /> Add to Cart
        </span>
        <span className="text-white/80 text-[0.6875rem] font-medium mt-0.5">365 Day Money-Back Guarantee</span>
      </a>
      <p className="text-white/55 text-[0.8125rem] text-center mt-2.5">🔄 Refills Ship Every 4 Weeks | ✅ Pause or Cancel Anytime</p>
    </div>
  );
}

function CartUpsellPopup({ mode, fallbackUrl, onClose }) {
  const cfg = CART_POPUP[mode] ?? CART_POPUP.one;
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-5 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm bg-[#0f0f0f] rounded-2xl overflow-hidden border border-[#c49b43]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-[3px] w-full" style={{ background: 'linear-gradient(90deg, transparent, #c49b43, transparent)' }} />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-[#c49b43]/10 border border-[#c49b43]/30 flex items-center justify-center text-[#c49b43] hover:bg-[#c49b43]/20 transition-colors cursor-pointer"
        >
          <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        <div className="bg-[#1a1400] border-b border-[#c49b43]/30 px-6 pt-5 pb-4 text-center">
          <span className="inline-flex items-center gap-1.5 bg-[#c49b43]/10 border border-[#c49b43]/35 text-[#c49b43] text-[9px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-full mb-2.5">
            ⚡ Flash Offer
          </span>
          <p className="text-2xl font-black text-white tracking-wide mb-1">WAIT! DON&apos;T MISS OUT</p>
          <p className="text-sm text-white/60">
            Upgrade to <span className="text-[#c49b43] font-black">2 Kits</span> and pay only{' '}
            <span className="text-[#c49b43] font-black">{cfg.subtitlePrice}</span>
          </p>
        </div>

        <div className="px-6 pt-5 pb-4">
          <div className="flex items-center gap-4 mb-5">
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-xl bg-[#c49b43]/[0.07] border border-[#c49b43]/20 overflow-hidden">
                <img src={kit2} alt="" aria-hidden="true" className="w-full h-full object-contain" />
              </div>
              <div className="absolute -top-2 -right-2 bg-[#c49b43] text-[#0f0f0f] text-[8px] font-black w-8 h-8 rounded-full flex flex-col items-center justify-center leading-tight">
                <span>{cfg.discount[0]}</span>
                <span>{cfg.discount[1]}</span>
              </div>
            </div>
            <div>
              <p className="text-[9px] font-bold tracking-widest uppercase text-[#c49b43]/65 mb-1.5">2 Pouches · 60-Day Supply</p>
              <div className="flex items-end gap-2 mb-1">
                <span className="text-[38px] font-black text-[#c49b43] leading-none">{cfg.price}</span>
                <span className="text-white/40 line-through mb-1.5">{cfg.old}</span>
              </div>
              <p className="text-white/70 text-sm font-semibold">{cfg.perPouch} per pouch</p>
            </div>
          </div>

          <ul className="space-y-2 mb-4">
            {['Double your results — 2x the support', '60-Day Money Back Guarantee', 'Free Shipping included'].map((b) => (
              <li key={b} className="flex items-center gap-2.5 text-white/85 text-sm">
                <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 text-[#c49b43]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12l5 5L20 7" />
                </svg>
                {b}
              </li>
            ))}
          </ul>
          <p className="text-[10px] text-white/25 italic text-center">*For best results, consistent daily use for 60+ days is recommended.</p>
        </div>

        <div className="px-6 pb-6 space-y-2">
          <a
            href={cfg.purchaseLink}
            className="flex items-center justify-center gap-2 w-full py-4 bg-[#c49b43] hover:bg-[#d4aa52] text-[#0f0f0f] font-black text-sm rounded-xl transition-all hover:-translate-y-0.5 active:scale-[0.98] no-underline"
          >
            <CartIcon className="w-4 h-4" />
            {cfg.cta}
          </a>
          <a
            href={fallbackUrl}
            className="block w-full py-2 text-white/30 hover:text-white/55 font-medium text-xs text-center underline underline-offset-2 no-underline"
          >
            No thanks, I only want 1 kit at full price
          </a>
        </div>
      </div>
    </div>
  );
}

function SectionHeading({ light, children, className = '' }) {
  return (
    <FadeUp as="h2" className={`text-[1.75rem] md:text-[2.5rem] font-bold! leading-[1.1] tracking-tight ${light ? 'text-bb-text-dark' : 'text-white'} ${className}`}>
      {children}
    </FadeUp>
  );
}

function CtaBand() {
  return (
    <section className="px-4 py-10 md:py-12 text-center">
      <a href="#bundles" className="btn-cta btn-cta-lg inline-block">Try Risk-Free Today</a>
      <p className="text-white/55 text-[0.8125rem] mt-4">🛡️ 365 Day Money-Back Guarantee | ✅ Pause or Cancel Anytime</p>
    </section>
  );
}

export default function TestosteroneCoffee() {
  const [selected, setSelected] = useState(3);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = popupOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [popupOpen]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  const [activeImg, setActiveImg] = useState(0);

  return (
    <div className="min-h-screen w-full bg-bb-dark text-white overflow-x-hidden">
      {/* Announcement bar */}
      <div
        className="w-full text-center py-2.5 px-4"
        style={{
          background: 'radial-gradient(143.34% 70.77% at 37.69% -10.12%, #FED9A5 0%, #D09439 100%)',
          borderBottom: '1px solid #8A6A1E',
        }}
      >
        <p className="text-bb-text-dark text-[0.75rem] font-bold tracking-[0.18em] uppercase">
          SHOP NOW AND GET UP TO ⚡ 58% OFF TODAY ⚡
        </p>
      </div>

      {/* Navbar — idêntico ao backlog (logo + label + sacola que abre o popup de upsell) */}
      <nav className="px-4 border-b border-bb-separator">
        <div className="max-w-[71.25rem] mx-auto flex items-center justify-between py-3.5">
          <a href="#/" aria-label="Balls & Brains home">
            <img src={bbSymbol} alt="Balls & Brains" className="h-8 w-auto object-contain" />
          </a>
          <span className="text-bb-gold/80 text-[0.8125rem] font-medium tracking-[0.3em] uppercase">
            Primal Coffee
          </span>
          <button
            type="button"
            onClick={() => setPopupOpen(true)}
            aria-label="Cart"
            className="flex items-center text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <CartIcon className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* HERO / Buy box */}
      <main className="px-4 py-6 md:py-12">
        <div className="max-w-[71.25rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 md:items-start">
          {/* Gallery */}
          <div className="order-1 md:col-start-1 md:row-start-1 flex flex-col gap-4">
            <div className="w-full aspect-square rounded-2xl overflow-hidden bg-black border border-bb-separator">
              <img src={GALLERY[activeImg]} alt="Balls & Brains Primal Coffee" width={600} height={600} fetchpriority="high" decoding="async" className="w-full h-full object-contain" />
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
                  <img src={img} alt="" width={140} height={140} loading="lazy" decoding="async" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Buy box */}
          <div className="order-2 md:col-start-2 md:row-start-1 md:row-span-2 min-w-0">
            <div className="flex items-center gap-2">
              <Stars />
              <span className="text-white/60 text-[0.8125rem]">Rated <span className="text-white font-semibold">4.8/5</span> by 62,128 happy customers</span>
            </div>

            <h1 className="text-[1.5rem] md:text-[2rem] font-bold! leading-tight tracking-tight mt-3 mb-3">
              Balls&amp;Brains<sup className="text-[0.6em] align-super">®</sup> Primal Coffee
            </h1>

            <p className="text-white/65 text-[0.9375rem] leading-relaxed mb-4">
              Roasted arabica coffee with mushrooms, adaptogens, and ancestral nutrients to support testosterone, stress, energy and male performance.
            </p>

            <ul className="space-y-2 mb-6">
              {HERO_BENEFITS.map((b) => (
                <li key={b} className="flex items-center gap-2.5">
                  <img src={checkGold} alt="" aria-hidden="true" className="w-5 h-5 shrink-0" />
                  <span className="text-white/90 text-[0.9375rem]">{b}</span>
                </li>
              ))}
            </ul>

            <p id="bundles" className="text-white font-bold text-[1.0625rem] mb-3 scroll-mt-24">Choose Your Bundle 👇</p>
            <BundleSelector order={[1, 3, 5]} selected={selected} onSelect={setSelected} />

            <div className="mt-5">
              <AddToCartBlock showDelivery />
            </div>
          </div>

          {/* Accordions + UGC (desce abaixo da galeria no desktop, depois do buy box no mobile) */}
          <div className="order-3 md:col-start-1 md:row-start-2 flex flex-col gap-6 md:mt-2">
            <div className="space-y-2.5">
              <Accordion label="Nutrition Facts">
                <p>Painel completo de informações nutricionais — conteúdo a definir com o cliente.</p>
              </Accordion>
              <Accordion label="Why you need Balls&Brains® Primal Coffee?" defaultOpen>
                <p>Rascunho: industrial coffee floods your body with cortisol every morning, and cortisol suppresses testosterone. Primal Coffee reverses that cycle with clinical-dose adaptogens and functional mushrooms in your daily ritual.</p>
              </Accordion>
              <Accordion label="Product Details">
                <p>Rascunho: 12 clinical-dose ingredients on a roasted Arabica base. Net wt. 6.5 oz (184g). One scoop daily.</p>
              </Accordion>
              <Accordion label="Benefits">
                <p>Rascunho: supports healthy testosterone, clean sustained energy, sharper focus and male performance.</p>
              </Accordion>
              <Accordion label="Recommended Use">
                <p>Rascunho: one scoop in 8–12oz of hot water each morning. Stir or froth and enjoy.</p>
              </Accordion>
              <Accordion label="Guarantee">
                <p>Rascunho: 365-day money-back guarantee. Pause or cancel anytime.</p>
              </Accordion>
            </div>
          </div>
        </div>
      </main>

      {/* What Our Customers Are Saying — full-width no desktop, carrossel com peek no mobile */}
      <section className="py-14 md:py-20">
        <div className="px-4 md:px-[3.75rem] mb-8 md:mb-10">
          <SectionHeading className="text-center">
            What Our <span className="text-gold-gradient">Customers</span> Are Saying
          </SectionHeading>
        </div>
        <div className="flex gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none scroll-smooth px-4 md:px-[3.75rem] pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {['UGC 1', 'UGC 2', 'UGC 3'].map((u) => (
            <div
              key={u}
              className="snap-center shrink-0 w-[78%] sm:w-[48%] md:w-auto md:flex-1 aspect-[9/16] rounded-2xl border border-dashed border-bb-gold-mid/40 bg-bb-gold-mid/[0.04] grid place-items-center text-bb-gold-mid/70 text-[0.875rem] italic">
              {u}
            </div>
          ))}
        </div>
      </section>

      {/* Why Trust Balls & Brains */}
      <section className="px-4 py-16 md:py-24">
        {/* Gradiente dourado dos ícones (referenciado via stroke="url(#bbGold)") */}
        <svg width="0" height="0" className="absolute w-0 h-0" aria-hidden="true">
          <defs>
            <linearGradient id="bbGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FED9A5" />
              <stop offset="100%" stopColor="#D09439" />
            </linearGradient>
          </defs>
        </svg>
        <div className="max-w-[60rem] mx-auto">
          <SectionHeading className="text-center">
            Why Trust <span className="text-gold-gradient">Balls&amp;Brains</span>
          </SectionHeading>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-10 md:mt-14">
            {TRUST_PILLARS.map(([icon, label], i) => (
              <FadeUp key={label} delay={(i % 4) * 0.06} className="rounded-2xl border border-bb-gold-dark/50 bg-[#100d09] p-5 md:p-7 flex flex-col items-center text-center gap-4">
                <TrustIcon name={icon} className="w-11 h-11 md:w-14 md:h-14" />
                <p className="text-white font-semibold text-[0.75rem] md:text-[0.9375rem] uppercase tracking-wide leading-tight">{label}</p>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.1} className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 mt-10 md:mt-12 max-w-[52rem] mx-auto">
            {TRUST_CHECKS.map((c) => (
              <div key={c} className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 shrink-0" />
                <span className="text-white text-[0.9375rem] md:text-[1.0625rem]">{c}</span>
              </div>
            ))}
          </FadeUp>
        </div>
      </section>

      {/* As seen in — press marquee */}
      <div className="bg-white overflow-hidden">
        <p className="text-center text-bb-text-dark/60 text-[0.6875rem] font-bold tracking-[0.3em] uppercase pt-4">As Seen In</p>
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

      {/* 12 Clinical-Dose Ingredients */}
      <section className="px-4 md:px-[3.75rem] py-16 md:py-24">
        <div className="max-w-[75rem] mx-auto">
          <SectionHeading className="text-center">
            12 <span className="text-gold-gradient">Clinical-Dose Ingredients</span> in 1 Cup
          </SectionHeading>
          <FadeUp as="p" delay={0.1} className="text-white/55 text-[0.9375rem] md:text-[1.0625rem] leading-relaxed text-center max-w-[42rem] mx-auto mt-5 mb-10 md:mb-14">
            Industrial coffee floods your body with cortisol every morning. Cortisol suppresses testosterone. We engineered a coffee that reverses this cycle.
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-bb-separator border border-bb-separator rounded-2xl overflow-hidden">
            {INGREDIENTS.map(([name, dose, claim], i) => (
              <FadeUp key={name} delay={(i % 3) * 0.06} className="bg-bb-dark p-5">
                <div className="flex items-baseline justify-between gap-3 mb-1.5">
                  <h3 className="text-white font-bold! text-[1.0625rem] leading-tight">{name}</h3>
                  <span className="text-bb-gold-mid font-bold text-[0.875rem] whitespace-nowrap">{dose}</span>
                </div>
                <p className="text-white/50 text-[0.8125rem] leading-relaxed">{claim}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Here's What Happens Inside Your Body — tabela (3 colunas: semana dourada / título branco / tópicos pretos) */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-[71.25rem] mx-auto">
          <SectionHeading className="text-center">
            Here&apos;s What Happens <span className="text-gold-gradient">Inside Your Body</span>
          </SectionHeading>
          <FadeUp as="p" delay={0.1} className="text-white/55 text-[0.9375rem] md:text-[1.0625rem] leading-relaxed text-center max-w-[42rem] mx-auto mt-5 mb-10 md:mb-14">
            Each ingredient works on its own timeline. Here&apos;s what to expect as they build up in your system.
          </FadeUp>

          <div className="max-w-[60rem] mx-auto overflow-x-auto">
            <div className="grid grid-cols-3 gap-px bg-bb-separator border border-bb-separator rounded-2xl overflow-hidden min-w-[600px]">
              {/* Linha 1 — semanas: fundo dourado em degradê, letra preta (~20px) */}
              {TIMELINE.map((col) => (
                <div key={col.week} className="py-3 px-3 text-center" style={{ background: 'linear-gradient(90deg, #FED9A5 0%, #D09439 100%)' }}>
                  <span className="text-bb-text-dark font-bold text-[1.25rem]">{col.week}</span>
                </div>
              ))}
              {/* Linha 2 — títulos: fundo branco, letra preta (16px) */}
              {TIMELINE.map((col) => (
                <div key={`${col.week}-title`} className="bg-white px-3 py-4 flex items-center justify-center text-center">
                  <span className="text-bb-text-dark font-bold text-[1rem] leading-tight">{col.title}</span>
                </div>
              ))}
              {/* Linha 3 — tópicos: fundo preto, check dourado, texto branco (16px) */}
              {TIMELINE.map((col) => (
                <div key={`${col.week}-body`} className="bg-black p-4 md:p-5">
                  <ul className="space-y-3.5">
                    {col.points.map((p) => (
                      <li key={p} className="flex gap-2.5">
                        <img src={checkGold} alt="" aria-hidden="true" className="w-4 h-4 mt-0.5 shrink-0" />
                        <span className="text-white text-[1rem] leading-snug">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 md:mt-16 text-center">
            <a href="#bundles" className="btn-cta btn-cta-lg inline-block">Try Risk-Free Today</a>
            <p className="text-white/55 text-[0.8125rem] mt-4">🛡️ 365 Day Money-Back Guarantee | ✅ Pause or Cancel Anytime</p>
          </div>
        </div>
      </section>

      {/* Balls & Brains App */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-[60rem] mx-auto rounded-3xl border border-bb-gold-dark/40 bg-[#100d09] p-8 md:p-12">
          <SectionHeading className="text-center">
            Subscribe today and receive free access to <span className="text-gold-gradient">Balls&amp;Brains® App</span>
          </SectionHeading>
          <FadeUp as="p" delay={0.1} className="text-white/60 text-[0.9375rem] md:text-[1.0625rem] leading-relaxed text-center max-w-[40rem] mx-auto mt-5 mb-10">
            The Balls&amp;Brains® app brings together everything you need to optimize your protocol — and get results even faster.
          </FadeUp>
          <ol className="space-y-4 max-w-[44rem] mx-auto">
            {APP_STEPS.map((step, i) => (
              <FadeUp key={i} as="li" delay={i * 0.06} className="flex items-start gap-4">
                <span className="shrink-0 w-8 h-8 rounded-full bg-bb-gold-mid/15 text-bb-gold-mid font-bold flex items-center justify-center">{i + 1}</span>
                <span className="text-white/75 text-[0.9375rem] leading-relaxed pt-1">{step}</span>
              </FadeUp>
            ))}
          </ol>
        </div>
      </section>

      {/* Real Stories, Real Results */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-[71.25rem] mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <Stars className="w-5 h-5" />
            <SectionHeading className="mt-3">
              Real Stories, <span className="text-gold-gradient">Real Results</span>
            </SectionHeading>
            <p className="text-white/60 text-[0.9375rem] md:text-[1.0625rem] mt-4">
              See what our customers are saying about Balls&amp;Brains® Primal Coffee
            </p>
          </div>

          <div className="mb-10">
            <Pending label="Slideshow c/ UGCs segurando o nosso produto" className="py-16" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <FadeUp key={i} delay={i * 0.08} className="rounded-2xl border border-bb-text-dark/10 bg-white p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-bb-text-dark font-bold text-[0.875rem]">4.9</span>
                  <Stars className="w-3.5 h-3.5" />
                </div>
                <p className="text-bb-text-dark font-bold! text-[1.0625rem] mb-2">&ldquo;{t.headline}&rdquo;</p>
                <p className="text-bb-text-dark/65 text-[0.875rem] leading-relaxed mb-5">{t.body}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-bb-text-dark/10">
                  <span className="w-10 h-10 rounded-full bg-bb-text-dark/10 grid place-items-center text-bb-text-dark/40 text-[0.625rem]">FOTO</span>
                  <div>
                    <p className="text-bb-text-dark font-semibold text-[0.875rem]">{t.name}</p>
                    <p className="text-bb-text-dark/45 text-[0.75rem]">Verified Customer</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Reasons Why Men Over 40 Choose Primal Coffee */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-[71.25rem] mx-auto">
          <SectionHeading className="text-center">
            4 Reasons Why Men Over 40 <span className="text-gold-gradient">Choose Primal Coffee</span>
          </SectionHeading>
          <FadeUp as="p" delay={0.1} className="text-white/55 text-[0.9375rem] md:text-[1.0625rem] leading-relaxed text-center max-w-[44rem] mx-auto mt-5 mb-10 md:mb-14">
            The only men&apos;s performance coffee built to target stress, hormones, energy, memory and blood flow.
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {REASONS.map(([title, body], i) => (
              <FadeUp key={title} delay={(i % 2) * 0.08} className="rounded-2xl border border-bb-gold-dark/40 bg-[#100d09] p-6">
                <h3 className="text-bb-gold font-bold! text-[1.125rem] leading-tight mb-2">{title}</h3>
                <p className="text-white/60 text-[0.875rem] leading-relaxed">{body}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Why Buy 10 Supplements — fundo claro (fotos dos suplementos têm fundo branco) */}
      <section className="bg-bb-light text-bb-text-dark px-4 md:px-[3.75rem] py-16 md:py-24">
        <div className="max-w-[75rem] mx-auto">
          <SectionHeading light className="text-center">
            Why Buy 10 Supplements When <span className="text-gold-gradient">One Coffee Has It Covered?</span>
          </SectionHeading>
          <FadeUp as="p" delay={0.1} className="text-bb-text-dark/65 text-[0.9375rem] md:text-[1.0625rem] leading-relaxed text-center max-w-[44rem] mx-auto mt-5 mb-10">
            Balls&amp;Brains® Primal Coffee gives you the key active ingredients for male performance in one daily ritual — without the cost of buying them separately.
          </FadeUp>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {PROBLEMS.map((p) => (
              <span key={p} className="inline-flex items-center gap-1.5 rounded-full border border-[#e35d5d]/40 bg-[#e35d5d]/10 text-[#c0392b] text-[0.6875rem] font-semibold px-3 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e35d5d]" /> {p}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {SUPPLEMENTS.map(([name, img, cost]) => (
              <div key={name} className="rounded-xl border border-bb-text-dark/10 bg-white p-3 text-center flex flex-col items-center">
                <div className="h-24 flex items-center justify-center mb-2">
                  <img src={img} alt={name} loading="lazy" decoding="async" className="max-h-24 w-auto object-contain" />
                </div>
                <p className="text-bb-text-dark text-[0.8125rem] font-semibold leading-tight">{name}</p>
                <p className="text-bb-text-dark/40 text-[0.625rem] uppercase tracking-wide mt-1.5">Monthly Cost</p>
                <p className="text-[#c0392b] font-bold text-[0.9375rem]">{cost}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl bg-[#fbe9e9] border border-[#e35d5d]/30 px-5 py-4 text-center">
            <p className="text-bb-text-dark font-bold text-[1.0625rem] md:text-[1.25rem]">
              Total Cost Without Primal Coffee: <span className="text-[#c0392b]">$274.70/month</span>
            </p>
          </div>
        </div>
      </section>

      {/* All The Actives In One Cup — recriada do zero (imagem do produto + 1 imagem por card de ativo) */}
      <section className="px-4 md:px-[3.75rem] py-16 md:py-24">
        <div className="max-w-[71.25rem] mx-auto">
          <SectionHeading className="text-center">
            All The Actives Your Body Needs <span className="text-gold-gradient">In Just One Cup</span>
          </SectionHeading>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 md:items-center mt-10 md:mt-14">
            <div className="flex flex-col gap-4 order-2 md:order-1">
              {ACTIVES.slice(0, 2).map(([names, benefit]) => (
                <ActiveCard key={names} names={names} benefit={benefit} />
              ))}
            </div>
            <div className="order-1 md:order-2">
              <Pending label="Imagem do produto (Primal Coffee)" className="aspect-square" />
            </div>
            <div className="flex flex-col gap-4 order-3">
              {ACTIVES.slice(2).map(([names, benefit]) => (
                <ActiveCard key={names} names={names} benefit={benefit} />
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-white font-bold text-[1.125rem] md:text-[1.5rem]">
              Total Cost With Primal Coffee: <span className="text-bb-green-light">$29/month</span>
            </p>
            <p className="text-white/40 text-[0.75rem] italic mt-3 max-w-[40rem] mx-auto">
              * The regular price of one pouch is $69. But today, when you buy 3 pouches, 2 are completely free.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />

      {/* Testosterone declines after 40 */}
      <section className="px-4 md:px-[3.75rem] py-16 md:py-20">
        <div className="max-w-[71.25rem] mx-auto rounded-3xl overflow-hidden border border-[#3a2c18]">
          <div className="bg-[#241a0e] px-6 py-6 text-center">
            <SectionHeading className="!text-[1.5rem] md:!text-[2rem]">
              Your Testosterone Production Starts to Decline <span className="text-gold-gradient">After 40!</span>
            </SectionHeading>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10 items-center">
            <FadeUp delay={0.1}>
              <div className="space-y-4 text-white/65 text-[0.9375rem] leading-relaxed">
                <p>After 40, the <strong className="text-white font-semibold">male body reduces testosterone production by 3%</strong> — year after year.</p>
                <p>That means that by 50, your body is producing <strong className="text-white font-semibold">30% less testosterone</strong> than it once did.</p>
                <p>Why is that bad? <strong className="text-white font-semibold">Because testosterone is the main male hormone.</strong></p>
                <p>It controls your emotional, sexual, metabolic, cardiovascular, and even brain health.</p>
                <p>In practice, taking that away from you is like taking the fuel out of a car.</p>
              </div>
            </FadeUp>
            <Pending label="Inserir gráfico (declínio de testosterona após os 40)" className="min-h-[16rem] h-full" />
          </div>
        </div>
      </section>

      {/* Most male problems caused by low T */}
      <section className="px-4 md:px-[3.75rem] pb-16 md:pb-24">
        <div className="max-w-[71.25rem] mx-auto rounded-3xl overflow-hidden border border-[#3a2c18]">
          <div className="bg-[#241a0e] px-6 py-6 text-center">
            <p className="text-white/70 text-[0.9375rem] mb-2">Now here&apos;s what almost nobody knows… 👇</p>
            <SectionHeading className="!text-[1.375rem] md:!text-[1.875rem]">
              Most Male Problems After 40 Are <span className="text-gold-gradient">Directly Caused by Low Testosterone</span>
            </SectionHeading>
          </div>
          <div className="divide-y divide-[#2d2d2d]">
            {SYMPTOM_GROUPS.map((symptoms, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 md:p-8 items-center">
                <div>
                  <ul className="space-y-2 mb-3">
                    {symptoms.map((s) => (
                      <li key={s} className="flex items-start gap-2.5 text-white/75 text-[0.9375rem]">
                        <span className="text-bb-gold-mid mt-0.5 shrink-0">➜</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="flex items-center gap-2 text-white font-bold text-[0.9375rem]">
                    <span className="text-bb-green-light">✓</span> Low Testosterone
                  </p>
                </div>
                <Pending label="Estudo científico" className="min-h-[8rem] h-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2 Options */}
      <section className="px-4 md:px-[3.75rem] pb-16 md:pb-24">
        <div className="max-w-[71.25rem] mx-auto">
          <div className="bg-black border border-bb-separator rounded-t-2xl px-6 py-5 text-center">
            <SectionHeading className="!text-[1.5rem] md:!text-[2rem]">There Are Only 2 Options to Fix This 👇</SectionHeading>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="border-x border-b border-bb-separator">
              <div className="bg-[#7a1f1f] px-6 py-4 text-center">
                <p className="text-white/80 text-[0.8125rem] font-semibold">Option #1:</p>
                <p className="text-white font-bold text-[1.125rem]">TRT Injections 💉</p>
              </div>
              <div className="p-6">
                <p className="text-[#e98a8a] font-bold text-[0.875rem] uppercase tracking-wide mb-3">Desvantagens</p>
                <Pending label="Lista de desvantagens — preencher" className="min-h-[8rem]" />
              </div>
            </div>
            <div className="border-x border-b border-bb-separator md:border-l-0">
              <div className="bg-bb-green-dark px-6 py-4 text-center">
                <p className="text-white/80 text-[0.8125rem] font-semibold">Option #2:</p>
                <p className="text-white font-bold text-[1.125rem]">Balls&amp;Brains® Primal Coffee ☕</p>
              </div>
              <div className="p-6">
                <p className="text-bb-green-light font-bold text-[0.875rem] uppercase tracking-wide mb-3">Vantagens</p>
                <Pending label="Lista de vantagens — preencher" className="min-h-[8rem]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* #1 Expert-Recommended */}
      <section className="px-4 md:px-[3.75rem] pb-16 md:pb-24">
        <div className="max-w-[71.25rem] mx-auto">
          <div className="bg-black border border-bb-separator rounded-t-2xl px-6 py-6 text-center">
            <SectionHeading className="!text-[1.5rem] md:!text-[2rem]">
              Balls&amp;Brains® Primal Coffee <span className="text-gold-gradient">Is The #1 Expert-Recommended Option</span>
            </SectionHeading>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 border-x border-b border-bb-separator">
            {[0, 1, 2].map((i) => (
              <div key={i} className={`p-6 ${i > 0 ? 'border-t md:border-t-0 md:border-l border-bb-separator' : ''}`}>
                <Pending label="[ Especialista c/ Produto ]" className="aspect-[4/3] mb-4" />
                <p className="text-white font-bold text-[0.9375rem]">Nome do Especialista</p>
                <p className="text-bb-gold-mid text-[0.8125rem] mb-3">Especialidade</p>
                <p className="text-white/55 text-[0.875rem] italic">&ldquo;Escrever aqui&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />

      {/* 365-Day Risk-Free Trial — padrão do componente Guarantee da home (selo on-brand + texto) */}
      <section className="bg-[#14100C] px-4 py-14 md:py-20">
        <div className="max-w-[71.25rem] mx-auto">
          <FadeUp className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14">
            <img
              src={guaranteeStamp}
              alt="365-Day Money-Back Guarantee"
              width={176}
              height={176}
              loading="lazy"
              decoding="async"
              className="w-32 md:w-44 object-contain shrink-0"
            />
            <div className="flex flex-col gap-3 text-center md:text-left max-w-[40rem]">
              <h2 className="text-[1.75rem] md:text-[3rem] font-bold! leading-tight tracking-tight">
                <span className="text-white">365-Day </span>
                <span className="text-gold-gradient">Risk-Free Trial</span>
              </h2>
              <p className="text-bb-text-dim text-[0.9375rem] md:text-[1.0625rem] leading-relaxed">
                If you&apos;re not completely satisfied in your first 30 days, simply return your order for a full refund — no questions asked.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Today Only — bundle selector #2 */}
      <section className="px-4 pb-16 md:pb-24">
        <div className="max-w-[34rem] mx-auto">
          <div className="text-center mb-6">
            <p className="text-bb-gold-mid text-[0.8125rem] font-bold tracking-[0.2em] uppercase">Today Only (MM/DD)</p>
            <SectionHeading className="!text-[1.5rem] md:!text-[2rem] mt-2">
              Buy 3 Pouches, <span className="text-gold-gradient">Get 2 Free</span>
            </SectionHeading>
            <p className="text-white font-bold text-[1.0625rem] mt-5">Choose Your Bundle 👇</p>
          </div>
          <BundleSelector order={[5, 3, 1]} selected={selected} onSelect={setSelected} />
          <div className="mt-5">
            <AddToCartBlock />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-16 md:py-24 border-t border-bb-separator">
        <div className="max-w-[48rem] mx-auto">
          <SectionHeading className="text-center mb-10 md:mb-14">
            Frequently Asked <span className="text-gold-gradient">Questions</span>
          </SectionHeading>
          <div className="space-y-3">
            {FAQS.map(([q, a], i) => (
              <FadeUp key={q} delay={Math.min(i, 4) * 0.04}>
                <FaqItem q={`${i + 1}) ${q}`} a={a} defaultOpen={i === 0} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bb-dark border-t border-white/10 px-4 py-12 md:py-16 text-center">
        <div className="max-w-[60rem] mx-auto flex flex-col items-center gap-5">
          <img src={footerLogo} alt="Balls & Brains" className="h-9 md:h-11 object-contain" />
          <p className="text-white text-[0.9375rem] md:text-[1.0625rem]">
            Still have questions? Email us at{' '}
            <a href="mailto:support@ballsnbrains.com" className="text-bb-gold-mid hover:underline">support@ballsnbrains.com</a>
          </p>
          <p className="text-white/40 text-[0.8125rem]">© 2026 Balls and Brains.</p>
          <p className="text-white/25 text-[0.625rem] md:text-[0.75rem] leading-relaxed">
            All rights reserved. Not evaluated by FDA. Not intended to diagnose, treat, cure, or prevent disease. Consult physician. We recommend baseline testosterone testing. This site is not part of the Facebook website or Meta Inc. Additionally, this site is NOT endorsed by Facebook in any way. FACEBOOK is a registered trademark of FACEBOOK, Inc.
          </p>
        </div>
      </footer>

      {popupOpen && (
        <CartUpsellPopup mode="sub" fallbackUrl={CHECKOUT_URL} onClose={() => setPopupOpen(false)} />
      )}
    </div>
  );
}
