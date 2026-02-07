"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

type RevealProps = {
  id: string;
  children: ReactNode;
  className?: string;
  oncePerSession?: boolean;
};

const STORAGE_KEY = "awere_revealed_v1";

function getRevealedSet(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
}

function addToRevealedSet(id: string) {
  if (typeof window === "undefined") return;
  try {
    const set = getRevealedSet();
    set.add(id);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(set)));
  } catch {
    // Ignore storage errors
  }
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getInitialState(id: string, oncePerSession: boolean) {
  if (prefersReducedMotion()) {
    return { revealed: true, shouldAnimate: false };
  }
  if (oncePerSession && getRevealedSet().has(id)) {
    return { revealed: true, shouldAnimate: false };
  }
  return { revealed: false, shouldAnimate: true };
}

export function Reveal({
  id,
  children,
  className = "",
  oncePerSession = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState(() => getInitialState(id, oncePerSession));

  useEffect(() => {
    // If already revealed, no observer needed
    if (state.revealed) return;

    // Set up IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setState({ revealed: true, shouldAnimate: true });
            if (oncePerSession) {
              addToRevealedSet(id);
            }
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [id, oncePerSession, state.revealed]);

  return (
    <div
      ref={ref}
      className={`${className} ${state.shouldAnimate ? "reveal-root" : ""} ${
        state.revealed ? "is-revealed" : ""
      }`}
    >
      {children}
    </div>
  );
}
