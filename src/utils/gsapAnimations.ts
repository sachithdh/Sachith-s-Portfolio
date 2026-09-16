import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Fade in from bottom animation
export const useFadeInUp = (delay: number = 0) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      { 
        opacity: 0, 
        y: 60 
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [delay]);

  return ref;
};

// Fade in from left animation
export const useFadeInLeft = (delay: number = 0) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      { 
        opacity: 0, 
        x: -60 
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [delay]);

  return ref;
};

// Fade in from right animation
export const useFadeInRight = (delay: number = 0) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      { 
        opacity: 0, 
        x: 60 
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [delay]);

  return ref;
};

// Scale up animation
export const useScaleIn = (delay: number = 0) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      { 
        opacity: 0, 
        scale: 0.8 
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [delay]);

  return ref;
};

// Stagger children animation
export const useStaggerChildren = (delay: number = 0, stagger: number = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const children = ref.current.children;

    gsap.fromTo(
      children,
      { 
        opacity: 0, 
        y: 30 
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [delay, stagger]);

  return ref;
};

// Parallax effect
export const useParallax = (speed: number = 0.5) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      yPercent: -50 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, [speed]);

  return ref;
};

// Text reveal animation (for hero titles)
export const animateTextReveal = (element: HTMLElement) => {
  const chars = element.querySelectorAll('.char');
  
  gsap.fromTo(
    chars,
    { 
      opacity: 0,
      y: 100,
      rotateX: -90,
    },
    {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 1,
      stagger: 0.05,
      ease: 'power4.out',
    }
  );
};

// Smooth scroll to section
export const smoothScrollTo = (target: string) => {
  gsap.to(window, {
    duration: 1,
    scrollTo: target,
    ease: 'power3.inOut',
  });
};

// Reveal animation on scroll
export const revealOnScroll = (elements: string | Element, options = {}) => {
  return gsap.from(elements, {
    scrollTrigger: {
      trigger: elements,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out',
    ...options,
  });
};

export const useExitAnimation = (direction: 'left' | 'right' = 'left') => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const children = ref.current.children;
    const xDirection = direction === 'left' ? -300 : 300;

    gsap.to(children, {
      scrollTrigger: {
        trigger: ref.current,
        start: 'bottom center',
        end: 'bottom top',
        scrub: 1,
        markers: false,
      },
      x: xDirection,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power2.in',
    });
  }, [direction]);

  return ref;
};
