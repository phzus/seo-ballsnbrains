import { motion } from 'framer-motion';

/**
 * Wrapper de entrada padrão do projeto.
 *
 * Anima quando o elemento entra no viewport:
 *   opacity 0  → 1
 *   blur 20px  → 0
 *   y +24px    → 0
 *
 * Dispara cada vez que o elemento entra/sai do viewport (once: false).
 * Ao sair: volta ao estado inicial. Ao reentrar: anima de novo.
 *
 * Props:
 *   - delay:     atraso em segundos (útil pra encadear elementos)
 *   - duration:  duração em segundos (default 0.7)
 *   - as:        tag a renderizar (default 'div')
 *   - amount:    fração do elemento visível pra disparar (0..1, default 0.2)
 */
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
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 24, filter: 'blur(20px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: false, amount, margin: '-40px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
