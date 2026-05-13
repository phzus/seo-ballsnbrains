import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

// Direction-aware: item entra de baixo quando o scroll desce (estava abaixo do viewport)
// e entra de cima quando o scroll sobe (estava acima do viewport).
// Usa IntersectionObserver pra detectar onde o elemento está em relação ao viewport
// no momento em que sai/entra — assim sabemos de qual lado ele veio.
export default function FadeUp({
  children,
  className,
  delay = 0,
  duration = 0.7,
  as = 'div',
  amount = 0.2,
  ...rest
}) {
  const MotionTag = motion[as] || motion.div;
  const ref = useRef(null);
  const controls = useAnimation();
  const hiddenYRef = useRef(24);
  const [initialY, setInitialY] = useState(24);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start({
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
          });
        } else {
          // Detecta se saiu por cima ou por baixo do viewport.
          // Se bottom < 0 → o elemento está acima da tela (scroll passou dele indo pra baixo, agora user subiu)
          //   então quando reentrar deve vir de cima → hiddenY negativo
          // Senão → elemento está abaixo da tela → quando reentrar vem de baixo → hiddenY positivo
          const rect = entry.boundingClientRect;
          const nextHidden = rect.top < 0 ? -24 : 24;
          hiddenYRef.current = nextHidden;
          setInitialY(nextHidden);
          controls.start({
            opacity: 0,
            y: nextHidden,
            filter: 'blur(20px)',
            transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
          });
        }
      },
      { threshold: amount, rootMargin: '-40px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [controls, duration, delay, amount]);

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: initialY, filter: 'blur(20px)' }}
      animate={controls}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
