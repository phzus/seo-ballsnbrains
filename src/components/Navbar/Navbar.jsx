import { useEffect, useState } from 'react';
import logo from '../../assets/utils/logo-font-light.svg';

const CTA_URL = 'https://ballsnbrains.com/shp/tmc-adv/08/p2-v2/';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className="px-6 py-5 sticky top-0 z-50 transition-colors duration-300"
      style={
        scrolled
          ? { background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }
          : { background: 'transparent' }
      }
    >
      <div className="max-w-[1140px] mx-auto flex items-center justify-between gap-8">
        <img src={logo} alt="Balls & Brains" className="h-12 md:h-14 object-contain" />

        <div className="hidden md:flex items-center gap-9">
          {['Ingredients', 'How It Works', 'Reviews', 'FAQ'].map((label, i) => {
            const hrefs = ['#ingredients', '#how-it-works', '#reviews', '#faq'];
            return (
              <a
                key={i}
                href={hrefs[i]}
                className="text-white hover:text-bb-gold text-[16px] font-normal no-underline transition-colors"
              >
                {label}
              </a>
            );
          })}
        </div>

        <a href={CTA_URL} className="btn-cta-gold">
          Try It & Save 44%
        </a>
      </div>
    </nav>
  );
}
