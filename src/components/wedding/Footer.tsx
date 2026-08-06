import { motion } from "motion/react";
import { Waves } from "./Waves";
import night from "@/assets/night.jpg";

export function Footer() {
  return (
    <footer className="relative overflow-hidden pt-40 pb-16">
      <img
        src={night}
        alt="Moonlit ocean at night"
        loading="lazy"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[image:var(--gradient-night)] opacity-70" />

      {Array.from({ length: 40 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${(i * 53) % 100}%`,
            top: `${(i * 31) % 60}%`,
            width: 1 + (i % 3),
            height: 1 + (i % 3),
          }}
          animate={{ opacity: [0.15, 1, 0.15] }}
          transition={{ duration: 2 + (i % 5), repeat: Infinity, delay: i * 0.12 }}
        />
      ))}

      <div className="relative z-10 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-[0.6rem] tracking-[0.42em] text-sky/80 uppercase"
        >
          With love and gratitude
        </motion.p>
        <p className="font-script mt-4 text-6xl text-pearl sm:text-7xl">Thank You</p>
        <p className="font-elegant mx-auto mt-4 max-w-md text-pearl/70 italic">
          For being part of our story. See you where the waves meet the sand.
        </p>
        <p className="font-script mt-10 text-4xl text-gold">
          Kajal <span className="animate-heart inline-block">♡</span> Arul Murugan
        </p>
        <p className="mt-10 text-[0.6rem] tracking-[0.3em] text-pearl/50 uppercase">
          Designed By Kajal's Brother Khishan
        </p>
      </div>

      <Waves className="top-0" tone="night" />
    </footer>
  );
}

/** Slow floating sea shells that rotate on hover. */
export function FloatingShells() {
  const shells = [
    { left: "6%", top: "22%", size: 34, delay: 0 },
    { left: "88%", top: "38%", size: 26, delay: 1.5 },
    { left: "12%", top: "70%", size: 22, delay: 3 },
    { left: "78%", top: "82%", size: 30, delay: 2.2 },
  ];
  return (
    <div className="pointer-events-none fixed inset-0 z-30 hidden lg:block">
      {shells.map((s, i) => (
        <motion.div
          key={i}
          className="pointer-events-auto absolute"
          style={{ left: s.left, top: s.top }}
          animate={{ y: [0, -26, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 9 + i, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
          whileHover={{ rotate: 360, scale: 1.35 }}
        >
          <svg width={s.size} height={s.size} viewBox="0 0 40 40" className="text-shell drop-shadow-[0_4px_14px_rgba(0,51,102,0.25)]">
            <path
              d="M20 4C11 4 4 12 4 22c0 8 7 14 16 14s16-6 16-14C36 12 29 4 20 4Z"
              fill="currentColor"
              opacity="0.85"
            />
            <path
              d="M20 36V4M20 36 8 12M20 36 32 12M20 36 14 8M20 36l6-28"
              stroke="color-mix(in oklab, var(--color-gold) 70%, transparent)"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
