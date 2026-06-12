"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils/cn";

type GsapRevealScopeProps = {
  children: ReactNode;
  className?: string;
  animationKey?: string | number;
  selector?: string;
  delay?: number;
  stagger?: number;
  y?: number;
};

export function GsapRevealScope({
  children,
  className,
  animationKey = "initial",
  selector = "[data-gsap-reveal]",
  delay = 0,
  stagger = 0.08,
  y = 22,
}: GsapRevealScopeProps) {
  const scopeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV === "test") {
      return;
    }

    const scope = scopeRef.current;

    if (!scope) {
      return;
    }

    const shouldReduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (shouldReduceMotion) {
      return;
    }

    const context = gsap.context(() => {
      const revealTargets = gsap.utils.toArray<HTMLElement>(selector);

      if (revealTargets.length === 0) {
        return;
      }

      gsap.fromTo(
        revealTargets,
        {
          autoAlpha: 0,
          filter: "blur(8px)",
          scale: 0.985,
          y,
        },
        {
          autoAlpha: 1,
          clearProps: "transform,filter,opacity,visibility",
          delay,
          duration: 0.55,
          ease: "power3.out",
          filter: "blur(0px)",
          scale: 1,
          stagger,
          y: 0,
        },
      );
    }, scope);

    return () => {
      context.revert();
    };
  }, [animationKey, delay, selector, stagger, y]);

  return (
    <div ref={scopeRef} className={cn(className)}>
      {children}
    </div>
  );
}