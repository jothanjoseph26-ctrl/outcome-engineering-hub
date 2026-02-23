import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface RevealOnScrollProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
}

export function RevealOnScroll({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.5,
  once = true,
  className = ''
}: RevealOnScrollProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-100px' });

  const getVariants = (): Variants => {
    const base = {
      opacity: 0,
      transition: { duration, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }
    };

    const directions: Record<string, Record<string, number>> = {
      up: { y: 40 },
      down: { y: -40 },
      left: { x: 40 },
      right: { x: -40 },
      fade: {},
    };

    const targets: Record<string, Record<string, number>> = {
      up: { y: 0 },
      down: { y: 0 },
      left: { x: 0 },
      right: { x: 0 },
      fade: { opacity: 1 },
    };

    return {
      hidden: { ...base, ...directions[direction] },
      visible: { ...targets[direction], opacity: 1, transition: { duration, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } }
    };
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={getVariants()}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  delayBetween?: number;
}

export function StaggerContainer({ 
  children, 
  className = '',
  delayBetween = 0.1 
}: StaggerContainerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: delayBetween
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ 
  children, 
  className = '',
  direction = 'up' as const
}: { 
  children: ReactNode; 
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
}) {
  const getVariants = (): Variants => {
    const directions: Record<string, Record<string, number>> = {
      up: { y: 30, x: 0 },
      down: { y: -30, x: 0 },
      left: { x: 30, y: 0 },
      right: { x: -30, y: 0 },
      fade: { opacity: 0 },
    };

    return {
      hidden: { opacity: 0, ...directions[direction] },
      visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } }
    };
  };

  return (
    <motion.div variants={getVariants()} className={className}>
      {children}
    </motion.div>
  );
}
