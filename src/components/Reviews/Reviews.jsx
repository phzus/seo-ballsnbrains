import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import FadeUp from '../_shared/FadeUp';
import starIcon from '../../assets/icons/Star.svg';

const TABS = ['TASTE', 'BENEFITS', 'CAFFEINE', 'TESTOSTERONE'];

const reviews = {
  TASTE: [
    {
      name: 'Mark R., 34 — Austin, TX',
      title: 'Tastes Like Real Coffee',
      body: "I've tried four different mushroom coffees. They all tasted like someone brewed a boot. This one actually tastes like coffee. Because it IS coffee. My wife tried it and now she steals mine every morning.",
    },
    {
      name: 'Jason T., 41 — Denver, CO',
      title: "Wait, That's It?",
      body: "Not gonna lie — I expected it to taste like dirt. First sip and I literally said 'wait, that's it?' out loud. Smooth, rich, no weird aftertaste. I cancelled my Starbucks order the same week.",
    },
    {
      name: 'David L., 52 — Nashville, TN',
      title: 'Clean, Solid Arabica',
      body: "I'm a black coffee guy. No sugar, no cream, no BS. If this tasted off, I'd know immediately. It doesn't. It's a clean, solid Arabica. The fact that it has all these adaptogens in it and you can't taste them? That's impressive.",
    },
  ],
  // TODO: conteúdo dos tabs BENEFITS, CAFFEINE e TESTOSTERONE deve vir do Lucas/cliente
  BENEFITS: [
    {
      name: 'Chris M., 44 — Chicago, IL',
      title: 'Energy Without the Crash',
      body: 'First thing I noticed was the 2pm crash just stopped. No jitters either. Clean, sustained energy all day. Week three and I\'m not going back to regular coffee.',
    },
    {
      name: 'Tom B., 38 — Seattle, WA',
      title: 'Sleep Actually Improved',
      body: 'Was skeptical about the sleep claim. Around week four I started sleeping deeper, waking up more rested. My HRV numbers in Whoop confirmed it.',
    },
    {
      name: 'Kevin S., 47 — Miami, FL',
      title: 'Focus Is Different',
      body: "Hard to describe but the mental clarity is real. I'm sharper in meetings, less distracted. Wife noticed before I even mentioned what I was taking.",
    },
  ],
  CAFFEINE: [
    {
      name: 'Ryan P., 36 — Boston, MA',
      title: 'Finally Dialed In',
      body: "100mg is the sweet spot. Enough to feel it, not enough to make me anxious. Combined with L-Theanine it's a totally different experience than my old espresso ritual.",
    },
    {
      name: 'Mike D., 40 — Austin, TX',
      title: 'No More Afternoon Jitters',
      body: 'Used to drink 3 cups a day and crash hard by 3pm. Now I have one cup of B&B and I\'m good all day. The caffeine curve is genuinely different.',
    },
    {
      name: 'James L., 33 — Portland, OR',
      title: 'Replaced My Pre-Workout',
      body: "I take this before the gym instead of pre-workout now. The energy is cleaner and I'm not wired at midnight anymore. Genuinely surprised.",
    },
  ],
  TESTOSTERONE: [
    {
      name: 'Daniel F., 45 — Dallas, TX',
      title: 'Bloodwork Confirmed It',
      body: 'Three months in, got bloodwork done. Total T went up 18%. Free T even more. My doctor asked what I changed. Told him I switched my coffee.',
    },
    {
      name: 'Steve H., 52 — Phoenix, AZ',
      title: 'Drive Is Back',
      body: "Hard to quantify but I feel like myself again. More motivated, more present, more on. My wife definitely noticed. That's all I'll say.",
    },
    {
      name: 'Alex W., 39 — New York, NY',
      title: 'Stack in One Cup',
      body: "I was spending $180/mo on separate supps. This replaces all of it at half the price. And because it's in coffee I actually take it every single day.",
    },
  ],
};

function NavButton({ direction, onClick }) {
  const isPrev = direction === 'prev';
  return (
    <button
      type="button"
      aria-label={isPrev ? 'Previous review' : 'Next review'}
      onClick={onClick}
      className="reviews-next-btn shrink-0 w-12 h-12 rounded-full border-2 border-bb-gold text-bb-gold flex items-center justify-center transition-colors duration-200 cursor-pointer hover:text-bb-cream-warm hover:border-transparent"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        style={isPrev ? { transform: 'rotate(180deg)' } : undefined}
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </button>
  );
}

function StarRow() {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <img key={i} src={starIcon} alt="★" className="w-4 h-4" />
      ))}
    </div>
  );
}

export default function Reviews() {
  const [active, setActive] = useState('TASTE');
  const swiperRef = useRef(null);

  return (
    <section id="reviews" className="bg-white py-20 md:py-28 px-4">
      <div className="max-w-[71.25rem] mx-auto">
        {/* Header — centered */}
        <FadeUp className="mb-12 md:mb-16 text-center flex flex-col items-center gap-3">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <img key={i} src={starIcon} alt="★" className="w-5 h-5" />
            ))}
          </div>
          <p
            className="text-bb-text-dark text-[0.75rem] md:text-[0.875rem] font-bold uppercase tracking-[0.18em]"
            style={{ fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}
          >
            Over 60,000 Five Star Reviews
          </p>
          <h2 className="text-bb-text-dark text-[2rem] md:text-[3.25rem] font-bold leading-tight">
            Read Our Reviews
          </h2>
        </FadeUp>

        {/* Review carousel */}
        <Swiper
          key={active}
          modules={[Autoplay, Pagination]}
          pagination={{ el: '.reviews-pagination', clickable: true }}
          loop
          autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{ 768: { slidesPerView: 3, spaceBetween: 24 } }}
          className="reviews-swiper"
          onSwiper={(s) => { swiperRef.current = s; }}
        >
          {reviews[active].map((r, i) => (
            <SwiperSlide key={i} className="h-auto! flex">
              <div className="bg-white rounded-2xl p-6 md:p-8 flex flex-col gap-4 border border-[#e9e2d1] flex-1">
                <StarRow />
                <p className="text-[#666] text-[0.8125rem] md:text-[0.875rem] font-medium">{r.name}</p>
                <h3 className="text-bb-text-dark font-bold text-[1.375rem] md:text-[1.625rem] leading-tight">
                  {r.title}
                </h3>
                <p className="text-[#424242] text-[0.875rem] md:text-[0.9375rem] leading-relaxed flex-1">
                  {r.body}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Controls abaixo: mobile = pagination esq + setas prev/next dir; desktop = só pagination centralizada */}
        <div className="mt-6 mb-10 md:mb-4 flex items-center justify-between gap-4 md:justify-center">
          <div className="reviews-pagination flex items-center gap-2" />
          <div className="flex items-center gap-2 md:hidden">
            <NavButton direction="prev" onClick={() => swiperRef.current?.slidePrev()} />
            <NavButton direction="next" onClick={() => swiperRef.current?.slideNext()} />
          </div>
        </div>

        {/* Tabs at BOTTOM — 11px font, single line */}
        <div className="flex gap-1.5 md:gap-2 justify-center">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`px-3 md:px-5 py-2 md:py-2.5 rounded-full font-bold text-[0.6875rem] tracking-wide whitespace-nowrap transition-all duration-200 border-2 cursor-pointer ${
                active === tab
                  ? 'bg-bb-gold text-white border-bb-gold'
                  : 'bg-transparent text-bb-text-dark border-bb-gold/60 hover:border-bb-gold'
              }`}
              style={{ fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
