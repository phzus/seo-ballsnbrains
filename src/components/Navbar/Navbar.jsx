import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Twirl as Hamburger } from 'hamburger-react';
import logo from '../../assets/utils/logo-font-light.svg';

const NAV_LINKS = [
  { href: '#ingredients', label: 'Ingredients' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#faq', label: 'FAQ' },
];

const CTA_URL = '#/testosterone-coffee';

export default function Navbar() {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const update = () => {
      document.documentElement.style.setProperty('--navbar-height', `${el.offsetHeight}px`);
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

  // Trava scroll do body quando o drawer está aberto (impede scroll de fundo)
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className={`px-4 py-4 sticky top-0 z-50 border-b transition-colors duration-300 ${scrolled || menuOpen ? 'border-white/10' : 'border-transparent'}`}
        style={
          scrolled || menuOpen
            ? { background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }
            : { background: 'transparent' }
        }
      >
        <div className="max-w-[71.25rem] mx-auto flex items-center justify-between gap-8">
          <img src={logo} alt="Balls & Brains" className="h-12 md:h-14 object-contain" />

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-9">
            {NAV_LINKS.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-white hover:text-bb-gold text-[1rem] font-normal no-underline transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile hamburger — animação Twirl: morpha pra X ao abrir */}
          <div className="md:hidden text-white">
            <Hamburger
              toggled={menuOpen}
              toggle={setMenuOpen}
              size={26}
              color="currentColor"
              label="Open navigation menu"
              rounded
            />
          </div>
        </div>
      </nav>

      {/* Mobile drawer + backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop escuro semi-transparente — fecha o menu ao clicar */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer lateral direita */}
            <motion.aside
              key="drawer"
              className="fixed top-0 right-0 h-full w-72 max-w-[80vw] bg-bb-dark border-l border-white/10 z-40 md:hidden flex flex-col"
              style={{ paddingTop: 'var(--navbar-height, 5rem)' }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-label="Navigation menu"
            >
              <nav className="flex flex-col gap-2 px-6 py-8">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={i}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-white text-[1.125rem] font-medium py-3 border-b border-white/5 hover:text-bb-gold transition-colors"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.3 }}
                  >
                    {link.label}
                  </motion.a>
                ))}

                <motion.a
                  href={CTA_URL}
                  onClick={() => setMenuOpen(false)}
                  className="btn-cta mt-6 text-center"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + NAV_LINKS.length * 0.06, duration: 0.3 }}
                >
                  Try It & Save 44%
                </motion.a>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
