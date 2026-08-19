import { useEffect, useRef } from "react";
import gsap from "gsap";

type RevealOptions = {
  /** Only run when active is true (e.g. current snap scene) */
  active?: boolean;
  y?: number;
  x?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  /** Child selector for stagger reveals */
  children?: string;
};

/**
 * Reusable enter reveal. Pass `active` from the snap scene index.
 * Customize defaults via CSS vars --dur-reveal / --ease-cinematic or options.
 */
export function useReveal<T extends HTMLElement>(options: RevealOptions = {}) {
  const ref = useRef<T | null>(null);
  const {
    active = true,
    y = 28,
    x = 0,
    opacity = 0,
    duration = 0.7,
    delay = 0,
    stagger = 0.08,
    ease = "power3.out",
    children,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el || !active) return;

    const targets = children ? el.querySelectorAll(children) : el;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { y, x, opacity, autoAlpha: opacity },
        {
          y: 0,
          x: 0,
          opacity: 1,
          autoAlpha: 1,
          duration,
          delay,
          stagger: children ? stagger : 0,
          ease,
          clearProps: "transform",
        },
      );
    }, el);

    return () => ctx.revert();
  }, [active, y, x, opacity, duration, delay, stagger, ease, children]);

  return ref;
}

export function staggerChildren(
  container: HTMLElement | null,
  selector = "[data-reveal]",
  options: gsap.TweenVars = {},
) {
  if (!container) return;
  const items = container.querySelectorAll(selector);
  return gsap.fromTo(
    items,
    { y: 24, autoAlpha: 0 },
    {
      y: 0,
      autoAlpha: 1,
      duration: 0.65,
      stagger: 0.07,
      ease: "power3.out",
      ...options,
    },
  );
}
