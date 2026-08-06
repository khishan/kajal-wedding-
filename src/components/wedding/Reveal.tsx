import { motion } from "motion/react";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 40,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionTitle({
  kicker,
  title,
  subtitle,
  tone = "light",
}: {
  kicker: string;
  title: string;
  subtitle?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div className="mb-14 text-center">
      <Reveal>
        <p
          className={`track-hover text-[0.6rem] tracking-[0.42em] uppercase ${tone === "dark" ? "text-sky/80" : "text-turquoise"}`}
        >
          {kicker}
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2
          className={`font-script mt-3 text-5xl sm:text-6xl ${tone === "dark" ? "text-pearl" : "text-gradient-ocean"}`}
        >
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.2}>
          <p
            className={`font-elegant mx-auto mt-4 max-w-xl text-base font-light italic sm:text-lg ${tone === "dark" ? "text-pearl/70" : "text-muted-foreground"}`}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.3}>
        <div className="mx-auto mt-6 flex items-center justify-center gap-3">
          <span className="h-px w-14 bg-[linear-gradient(90deg,transparent,var(--color-gold))]" />
          <span className="text-gold">✦</span>
          <span className="h-px w-14 bg-[linear-gradient(270deg,transparent,var(--color-gold))]" />
        </div>
      </Reveal>
    </div>
  );
}
