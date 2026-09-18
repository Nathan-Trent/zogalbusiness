"use client";
import { useScrollReveal } from "./useScrollReveal";

export function Reveal({ children, style, id }: { children: React.ReactNode; style?: React.CSSProperties; id?: string }) {
  const { ref, visible } = useScrollReveal<HTMLElement>();
  return (
    <section id={id} ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: "opacity .8s ease, transform .8s ease", ...style }}>
      {children}
    </section>
  );
}
