import { useEffect, useRef } from 'react';

export default function AlertBanner() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      document.documentElement.style.setProperty('--alert-height', `${el.offsetHeight}px`);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="w-full flex items-center justify-center text-center px-4 py-2.5"
      style={{ background: 'linear-gradient(90deg, #cf9947 0%, #7d5d2c 100%)' }}
    >
      <p
        className="text-[#0a0908] text-[0.745rem] md:text-[0.875rem] font-bold leading-none"
        style={{ fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}
      >
        MOTHER'S DAY SALE 🌷 35% OFF STARTER KIT + 5 FREE GIFTS + FREE U.S. SHIPPING
      </p>
    </div>
  );
}
