import { useEffect, useState } from "react";
import { motion } from "motion/react";

const parts = ["Days", "Hours", "Minutes", "Seconds"] as const;

function diff(target: Date) {
  const ms = Math.max(0, target.getTime() - Date.now());
  return [
    Math.floor(ms / 86400000),
    Math.floor(ms / 3600000) % 24,
    Math.floor(ms / 60000) % 60,
    Math.floor(ms / 1000) % 60,
  ];
}

export function Countdown({ target, compact = false }: { target: Date; compact?: boolean }) {
  const [vals, setVals] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    setVals(diff(target));
    const t = window.setInterval(() => setVals(diff(target)), 1000);
    return () => window.clearInterval(t);
  }, [target]);


  return (
    <div className={`grid grid-cols-4 ${compact ? "gap-2 sm:gap-3" : "gap-3 sm:gap-5"}`}>
      {vals.map((v, i) => (
        <motion.div
          key={parts[i]}
          initial={{ opacity: 0, y: 26, rotateX: -40 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, type: "spring", stiffness: 90, damping: 14 }}
          className="glass card-tilt relative overflow-hidden rounded-2xl px-1 py-4 text-center sm:py-6"
        >
          {/* ocean inside the numbers */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 opacity-70">
            <motion.div
              className="h-full w-[200%] bg-gradient-to-t from-turquoise/45 to-transparent"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
              style={{
                maskImage:
                  "radial-gradient(120% 60% at 50% 100%, black 40%, transparent 75%)",
              }}
            />
          </div>
          <div
            className={`font-elegant relative tabular-nums ${compact ? "text-2xl sm:text-4xl" : "text-3xl sm:text-5xl"} font-light text-navy`}
          >
            {String(v).padStart(2, "0")}
          </div>
          <div
            className={`relative mt-1 tracking-[0.2em] text-muted-foreground uppercase ${compact ? "text-[0.5rem]" : "text-[0.65rem] tracking-[0.3em]"}`}
          >
            {parts[i]}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
