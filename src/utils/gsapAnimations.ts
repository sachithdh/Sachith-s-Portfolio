import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

// Shared motion language: long, soft "expo" ease-outs that play once
export const EASE_OUT = 'expo.out';
export const REVEAL_START = 'top 85%';

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Runs GSAP setup code scoped to the returned ref. Selector strings inside
 * `setup` only match descendants of the ref, and every tween, ScrollTrigger
 * and SplitText created is reverted on unmount. Skipped for reduced motion.
 */
export const useGsap = <T extends HTMLElement = HTMLDivElement>(
  setup: (el: T) => void,
) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => setup(el), el);
    return () => ctx.revert();
    // setup is intentionally run once per mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
};

// Masked line-by-line reveal, the signature heading animation
export const revealLines = (
  target: gsap.DOMTarget,
  trigger: gsap.DOMTarget,
  vars: gsap.TweenVars = {},
) =>
  SplitText.create(target, {
    type: 'lines',
    mask: 'lines',
    autoSplit: true,
    onSplit: (self) =>
      gsap.from(self.lines, {
        yPercent: 110,
        duration: 1.2,
        stagger: 0.12,
        ease: EASE_OUT,
        scrollTrigger: { trigger, start: REVEAL_START, once: true },
        ...vars,
      }),
  });

// Soft fade-up of a paragraph, one line at a time
export const fadeLines = (
  target: gsap.DOMTarget,
  trigger: gsap.DOMTarget,
  vars: gsap.TweenVars = {},
) =>
  SplitText.create(target, {
    type: 'lines',
    autoSplit: true,
    onSplit: (self) =>
      gsap.from(self.lines, {
        opacity: 0,
        y: 24,
        duration: 1,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger, start: REVEAL_START, once: true },
        ...vars,
      }),
  });

// Heading line reveal as a standalone hook
export const useTextReveal = <T extends HTMLElement = HTMLHeadingElement>(
  delay: number = 0,
) => useGsap<T>((el) => revealLines(el, el, { delay }));

const useFromOnScroll = (from: gsap.TweenVars, delay: number) =>
  useGsap((el) => {
    gsap.from(el, {
      ...from,
      duration: 1.1,
      delay,
      ease: EASE_OUT,
      scrollTrigger: { trigger: el, start: REVEAL_START, once: true },
    });
  });

// Fade in from bottom animation
export const useFadeInUp = (delay: number = 0) =>
  useFromOnScroll({ opacity: 0, y: 60 }, delay);

// Fade in from left animation
export const useFadeInLeft = (delay: number = 0) =>
  useFromOnScroll({ opacity: 0, x: -60 }, delay);

// Fade in from right animation
export const useFadeInRight = (delay: number = 0) =>
  useFromOnScroll({ opacity: 0, x: 60 }, delay);

// Scale up animation
export const useScaleIn = (delay: number = 0) =>
  useFromOnScroll({ opacity: 0, scale: 0.9 }, delay);

// Stagger children animation
export const useStaggerChildren = (delay: number = 0, stagger: number = 0.1) =>
  useGsap((el) => {
    gsap.from(el.children, {
      opacity: 0,
      y: 40,
      duration: 1,
      delay,
      stagger,
      ease: EASE_OUT,
      scrollTrigger: { trigger: el, start: REVEAL_START, once: true },
    });
  });

// Parallax effect
export const useParallax = (speed: number = 0.5) =>
  useGsap((el) => {
    gsap.to(el, {
      yPercent: -50 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });

// Children drift sideways and fade as the element scrolls out of view
export const useExitAnimation = (direction: 'left' | 'right' = 'left') =>
  useGsap((el) => {
    gsap.fromTo(
      el.children,
      { x: 0, opacity: 1 },
      {
        x: direction === 'left' ? -300 : 300,
        opacity: 0,
        stagger: 0.1,
        ease: 'power2.in',
        immediateRender: false,
        scrollTrigger: {
          trigger: el,
          start: 'bottom center',
          end: 'bottom top',
          scrub: 1,
        },
      },
    );
  });

// Pauses CSS transitions on targets until their tween completes, so
// `transition: all` rules don't smear the GSAP motion. Spread the result
// into the tween's vars.
export const pauseTransitions = (targets: gsap.TweenTarget) => {
  gsap.set(targets, { transition: 'none' });
  return { clearProps: 'transition' };
};
