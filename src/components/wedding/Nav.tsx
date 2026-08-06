import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Menu, X } from "lucide-react";

const links = [
  { id: "story", label: "Our Story" },
  { id: "events", label: "Events" },
  { id: "gallery", label: "Gallery" },
  { id: "venue", label: "Venue" },
  { id: "schedule", label: "Schedule" },
  { id: "rsvp", label: "RSVP" },
  { id: "wishes", label: "Wishes" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      >
        <nav
          className={`flex w-full max-w-5xl items-center justify-between rounded-full px-5 py-3 transition-all duration-700 ${
            solid ? "glass" : "border border-transparent bg-transparent"
          }`}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-script text-2xl text-gradient-ocean"
          >
            K <span className="text-gold">♡</span> A
          </button>

          <ul className="hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  className="group relative text-xs tracking-[0.18em] text-navy/80 uppercase transition-colors hover:text-ocean"
                >
                  {l.label}
                  <svg
                    viewBox="0 0 60 6"
                    className="absolute -bottom-2 left-0 h-1.5 w-full scale-x-0 text-turquoise transition-transform duration-500 group-hover:scale-x-100"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 3C10 -1 20 7 30 3C40 -1 50 7 60 3"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      fill="none"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            className="grid h-10 w-10 place-items-center rounded-full bg-[image:var(--gradient-ocean)] text-primary-foreground md:hidden"
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </nav>
      </motion.header>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass fixed inset-x-4 top-24 z-50 rounded-3xl p-6 md:hidden"
        >
          <ul className="grid gap-4">
            {links.map((l, i) => (
              <motion.li
                key={l.id}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <button
                  onClick={() => go(l.id)}
                  className="font-elegant text-2xl text-navy"
                >
                  {l.label}
                </button>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
      <ScrollWave />
    </>
  );
}

function ScrollWave() {
  const { scrollYProgress } = useScroll();
  const y = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });

  return (
    <div className="pointer-events-none fixed top-1/2 right-3 z-50 hidden h-56 w-6 -translate-y-1/2 md:block">
      <svg viewBox="0 0 24 224" className="h-full w-full text-sky/60" fill="none">
        <path
          d="M12 0C4 20 20 40 12 60C4 80 20 100 12 120C4 140 20 160 12 180C4 200 20 212 12 224"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
      <motion.div
        style={{ scaleY: y, transformOrigin: "top" }}
        className="absolute inset-0"
      >
        <svg viewBox="0 0 24 224" className="h-full w-full text-turquoise" fill="none">
          <path
            d="M12 0C4 20 20 40 12 60C4 80 20 100 12 120C4 140 20 160 12 180C4 200 20 212 12 224"
            stroke="currentColor"
            strokeWidth="2.4"
          />
        </svg>
      </motion.div>
    </div>
  );
}
