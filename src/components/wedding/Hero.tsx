import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Waves } from "./Waves";
import hero from "@/assets/hero-beach.jpg";
import palms from "@/assets/palms.jpg";

export function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-45%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      setPointer({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section ref={ref} className="relative h-[100svh] w-full overflow-hidden">
      <motion.div style={{ y: yImg }} className="absolute inset-0 -z-20">
        <motion.img
          src={hero}
          alt="Aerial view of a luxury tropical beach at golden sunset"
          width={1920}
          height={1088}
          className="h-[115%] w-full object-cover"
          animate={{ scale: [1.06, 1.14, 1.06] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          style={{ x: pointer.x * -14, y: pointer.y * -10 }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--navy)_45%,transparent),transparent_35%,color-mix(in_oklab,var(--navy)_55%,transparent))]" />
      </motion.div>

      {/* aurora light rays */}
      <div className="aurora pointer-events-none absolute inset-0 -z-10 opacity-40 mix-blend-screen" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-1/3 left-1/4 -z-10 h-[120vh] w-[35vw] rotate-12 bg-[linear-gradient(90deg,transparent,color-mix(in_oklab,white_38%,transparent),transparent)] blur-2xl"
        animate={{ opacity: [0.25, 0.6, 0.25], x: [-40, 40, -40] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* swaying palm frames, feathered into the scene */}
      <img
        src={palms}
        alt=""
        aria-hidden
        width={1024}
        height={1024}
        className="animate-sway pointer-events-none absolute -top-24 -left-24 -z-10 w-[46vw] max-w-[540px] origin-top opacity-70 mix-blend-multiply"
        style={{
          maskImage:
            "radial-gradient(70% 70% at 20% 25%, black 35%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(70% 70% at 20% 25%, black 35%, transparent 72%)",
        }}
      />
      <img
        src={palms}
        alt=""
        aria-hidden
        width={1024}
        height={1024}
        className="animate-sway pointer-events-none absolute -top-32 -right-28 -z-10 w-[42vw] max-w-[500px] origin-top scale-x-[-1] opacity-60 mix-blend-multiply"
        style={{
          animationDelay: "1.4s",
          maskImage:
            "radial-gradient(70% 70% at 25% 25%, black 35%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(70% 70% at 25% 25%, black 35%, transparent 72%)",
        }}
      />


      {/* slow particles */}
      {Array.from({ length: 22 }).map((_, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute rounded-full bg-white/70"
          style={{
            left: `${(i * 41) % 100}%`,
            top: `${(i * 27) % 100}%`,
            width: 2 + (i % 4),
            height: 2 + (i % 4),
          }}
          animate={{ y: [0, -40, 0], opacity: [0, 0.9, 0] }}
          transition={{ duration: 9 + (i % 7), repeat: Infinity, delay: i * 0.4 }}
        />
      ))}

      <motion.div
        style={{ y: yText, opacity: fade }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.05em" }}
          animate={{ opacity: 1, letterSpacing: "0.42em" }}
          transition={{ duration: 1.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-[0.62rem] text-pearl/90 uppercase sm:text-xs"
        >
          Together with their families
        </motion.p>

        <div className="mt-6 flex flex-col items-center gap-1 sm:mt-8">
          <Name text="Kajal" delay={0.6} />
          <motion.span
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, type: "spring", stiffness: 120, damping: 10 }}
            className="animate-heart text-3xl text-gold drop-shadow-[0_0_18px_rgba(255,209,102,0.7)] sm:text-4xl"
          >
            ♡
          </motion.span>
          <Name text="Arul Murugan" delay={1.35} />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 1.9, duration: 1.2 }}
          className="font-elegant mt-8 max-w-md text-lg font-light text-pearl/90 italic sm:text-xl"
        >
          We invite you to celebrate our love.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.9, ease: [0.22, 1.4, 0.36, 1] }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          onClick={() =>
            document.getElementById("invitation")?.scrollIntoView({ behavior: "smooth" })
          }
          className="lens-flare group relative mt-10 overflow-hidden rounded-full bg-[image:var(--gradient-gold)] px-9 py-4 text-xs font-medium tracking-[0.28em] text-navy uppercase shadow-[var(--shadow-gold)]"
        >
          Open Invitation
        </motion.button>

        <motion.div
          animate={{ y: [0, 12, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.6, repeat: Infinity }}
          className="absolute bottom-28 text-pearl/80"
        >
          <ChevronDown size={22} />
        </motion.div>
      </motion.div>

      <Waves className="bottom-0 z-10" />
    </section>
  );
}

function Name({ text, delay }: { text: string; delay: number }) {
  return (
    <span className="flex">
      {text.split("").map((c, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 60, rotateX: -80, filter: "blur(14px)" }}
          animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
          transition={{ delay: delay + i * 0.08, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-script text-6xl leading-[1.05] text-pearl drop-shadow-[0_6px_30px_rgba(0,51,102,0.55)] sm:text-8xl"
        >
          {c}
        </motion.span>
      ))}
    </span>
  );
}
