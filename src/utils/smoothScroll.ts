import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

// Height of the fixed top nav (keep in sync with --nav-h in TopNavBar.css)
const NAV_HEIGHT = 48;

// Inertia-based smooth scrolling, driven by GSAP's ticker so ScrollTrigger
// animations stay perfectly in sync with the scroll position.
export const useSmoothScroll = () => {
  useEffect(() => {
    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis?.destroy();
      lenis = null;
    };
  }, []);
};

// Smoothly scroll to a selector or element, falling back to native scrolling
export const scrollToTarget = (target: string | HTMLElement) => {
  if (lenis) {
    // Land each section's header bar just under the fixed nav
    lenis.scrollTo(target, { duration: 1.4, offset: -NAV_HEIGHT });
    return;
  }
  const el =
    typeof target === "string" ? document.querySelector(target) : target;
  el?.scrollIntoView({ behavior: "smooth" });
};

// Pause page scrolling (e.g. while a modal is open)
export const setScrollLocked = (locked: boolean) => {
  if (locked) lenis?.stop();
  else lenis?.start();
};
