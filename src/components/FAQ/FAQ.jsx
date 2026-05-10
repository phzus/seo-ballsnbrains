import { useState } from 'react';

const faqs = [
  {
    q: 'What is Balls and Brains?',
    a: 'Balls and Brains is the first testosterone-optimizing mushroom coffee specifically designed for men over 30. It combines premium Colombian coffee (100mg caffeine) with clinical doses of 11 functional ingredients — including Tongkat Ali, Ashwagandha, Lion\'s Mane, and adaptogens — to naturally support testosterone while providing sustained energy for 6–8 hours. It replaces both your morning coffee AND your supplement stack with one delicious ritual.',
  },
  {
    q: 'Who is Balls & Brains for?',
    a: 'Men over 30 who want to support natural testosterone levels, eliminate the afternoon energy crash, and replace a fragmented supplement routine with one daily habit.',
  },
  {
    q: 'How is this different from RYZE or MUD\\WTR?',
    a: 'RYZE and MUD\\WTR are mushroom wellness blends. Balls & Brains is specifically formulated for testosterone support with clinical doses of Tongkat Ali LJ100®, Ashwagandha KSM-66®, Shilajit, and Zinc — at the amounts used in human studies. It also has real caffeine (100mg) so you don\'t have to give up your coffee.',
  },
  {
    q: 'When will I see results?',
    a: 'Most users notice cleaner energy and reduced afternoon crash within the first week. Testosterone-support effects (better sleep, improved drive and focus) typically build over 30–90 days as ingredients reach effective concentration.',
  },
  {
    q: 'How do I prepare it?',
    a: 'One scoop in 8–12oz of hot water. Stir or froth. Drink black or with your preferred milk. That\'s it.',
  },
  {
    q: 'Does it really taste good?',
    a: 'Yes. The base is smooth Colombian Arabica. It tastes like good black coffee — no earthy or bitter aftertaste from the mushrooms. That\'s by design.',
  },
  {
    q: 'How much caffeine does it have?',
    a: '100mg per serving — roughly equivalent to one standard cup of coffee. Combined with 100mg of L-Theanine, the energy is smoother and more sustained than regular coffee.',
  },
  {
    q: 'Will I go through caffeine withdrawal?',
    a: "If you're replacing a higher-caffeine habit, you may feel mild effects for a day or two. Most users report the L-Theanine makes the transition much smoother than quitting coffee cold turkey.",
  },
  {
    q: 'Is this safe? Will it mess with my hormones?',
    a: 'Balls & Brains supports your body\'s natural testosterone production — it doesn\'t suppress it. The ingredients are adaptogens and minerals that work with your hormonal axis, not against it. No synthetic hormones, no SARMs, no prohormones.',
  },
  {
    q: "Can I take this if I'm already on TRT?",
    a: 'Consult your prescribing physician. The ingredients are generally safe alongside TRT but your doctor should know what you\'re supplementing.',
  },
  {
    q: 'Can I use this as a pre-workout?',
    a: 'Many users do. The Cordyceps Militaris improves oxygen utilization and the clean caffeine + L-Theanine stack provides steady energy without the crash or jitters of most pre-workouts.',
  },
  {
    q: 'Do I need to cycle off?',
    a: 'No cycling required. The ingredients are food-based and adaptogenic. Daily use is safe and produces compounding benefits over time.',
  },
  {
    q: "What's your refund policy?",
    a: '365-day money-back guarantee. If you\'re not satisfied for any reason, contact support@ballsnbrains.com and we\'ll refund every penny. No questions asked.',
  },
];

function Item({ q, a, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="flex flex-col">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 md:px-6 py-5 text-left bg-[#14100c] border border-bb-separator rounded-2xl cursor-pointer hover:border-bb-gold-dark/60 transition-colors"
      >
        <span className="text-white font-medium text-[0.875rem] md:text-[1rem] leading-snug">{q}</span>
        <span className="text-bb-gold text-[1.125rem] leading-none shrink-0">
          {open ? '→' : '↓'}
        </span>
      </button>
      {open && (
        <p className="text-bb-text-dim text-[0.8125rem] md:text-[0.9375rem] leading-relaxed px-5 md:px-6 pt-4 pb-2">{a}</p>
      )}
    </div>
  );
}

export default function FAQ() {
  const mid = Math.ceil(faqs.length / 2);
  const left = faqs.slice(0, mid);
  const right = faqs.slice(mid);

  return (
    <section id="faq" className="bg-bb-dark border-t border-bb-separator py-20 md:py-28 px-6">
      <div className="max-w-[71.25rem] mx-auto">
        <h2 className="text-white/15 text-[2.25rem] md:text-[3.25rem] font-bold leading-tight mb-12 md:mb-16 text-center">
          Frequently Asked Questions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <div className="flex flex-col gap-3 md:gap-4">
            {left.map((f, i) => <Item key={i} {...f} defaultOpen={i === 0} />)}
          </div>
          <div className="flex flex-col gap-3 md:gap-4">
            {right.map((f, i) => <Item key={i} {...f} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
