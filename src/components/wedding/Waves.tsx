import { motion } from "motion/react";

/** Layered animated ocean waves, parallax capable. */
export function Waves({
  className = "",
  flip = false,
  tone = "ocean",
}: {
  className?: string;
  flip?: boolean;
  tone?: "ocean" | "night" | "sand";
}) {
  const colors =
    tone === "night"
      ? ["text-navy/70", "text-ocean/40", "text-turquoise/25"]
      : tone === "sand"
        ? ["text-sand/90", "text-sand/60", "text-gold/25"]
        : ["text-ocean/35", "text-turquoise/30", "text-sky/40"];

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 h-40 overflow-hidden ${className}`}
      style={{ transform: flip ? "scaleY(-1)" : undefined }}
      aria-hidden
    >
      {colors.map((c, i) => (
        <motion.svg
          key={i}
          className={`absolute inset-x-0 bottom-0 w-[220%] ${c}`}
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          style={{ height: 160 - i * 18 }}
          animate={{ x: i % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
          transition={{ duration: 22 + i * 9, repeat: Infinity, ease: "linear" }}
        >
          <path
            fill="currentColor"
            d="M0 80C120 40 240 120 360 100C480 80 600 20 720 40C840 60 960 140 1080 130C1200 120 1320 60 1440 60V160H0V80Z"
          />
          <path
            fill="currentColor"
            transform="translate(1440,0)"
            d="M0 80C120 40 240 120 360 100C480 80 600 20 720 40C840 60 960 140 1080 130C1200 120 1320 60 1440 60V160H0V80Z"
          />
        </motion.svg>
      ))}
    </div>
  );
}
