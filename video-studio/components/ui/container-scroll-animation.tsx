"use client";

import {useEffect, useRef, useState, type ReactNode} from 'react';
import {motion, useReducedMotion, useScroll, useTransform} from 'motion/react';
import '../../styles/motion.css';

/** Structural donor: user-supplied 21st.dev / Aceternity ContainerScroll.
 * Keep scroll → perspective / rotateX / scale / header translation.
 * Visual tokens: ../../styles/motion.css, sourced from root MOTION.md.
 * Real copy and media are required from the caller; no stock demo assets.
 */
export function ContainerScroll({titleComponent, children}: {
  titleComponent: ReactNode;
  children: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const {scrollYProgress} = useScroll({target: containerRef});
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  // Geometric engineering ranges retained from the donor, not animation durations.
  // Timing is controlled by scroll position, never an independent timer.
  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], isMobile ? [0.7, 0.9] : [1.05, 1]);
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section ref={containerRef} className="motion-scroll">
      <div className="motion-scroll__perspective">
        <motion.header className="motion-scroll__title"
          style={{translateY: reduceMotion ? 0 : translate}}>
          {titleComponent}
        </motion.header>
        <motion.div className="motion-scroll__card" style={{
          rotateX: reduceMotion ? 0 : rotate,
          scale: reduceMotion ? 1 : scale,
        }}>
          <div className="motion-scroll__content">{children}</div>
        </motion.div>
      </div>
    </section>
  );
}
