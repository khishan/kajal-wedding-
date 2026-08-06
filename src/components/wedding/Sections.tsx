import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { CalendarDays, Clock, MapPin, Navigation, Shirt, Car, BedDouble, X } from "lucide-react";
import { Reveal, SectionTitle } from "./Reveal";
import { Countdown } from "./Countdown";
import { Waves } from "./Waves";
import { ScratchCard } from "./ScratchCard";
import { EVENTS, WEDDING_DATE } from "./data";
import arch from "@/assets/arch.jpg";
import reception from "@/assets/unnamed.png";
import receptionEvent from "@/assets/reception.jpg";
import couple from "@/assets/couple.jpg";
import rings from "@/assets/rings.jpg";
import shells from "@/assets/shells.jpg";
import aisle from "@/assets/aisle.jpg";
import flowers from "@/assets/flowers.jpg";
import palms from "@/assets/palms.jpg";
import night from "@/assets/night.jpg";

/* ------------------------- Invitation / scratch ------------------------- */

export function Invitation() {
  return (
    <section id="invitation" className="relative overflow-hidden px-5 py-28">
      <div className="aurora pointer-events-none absolute inset-0 opacity-25" />
      <SectionTitle
        kicker="A little magic first"
        title="Brush the sand away"
        subtitle="Run your finger across the shore to uncover our invitation."
      />
      <ScratchCard>
        <div className="relative bg-[image:var(--gradient-dawn)] px-6 py-16 text-center sm:px-14 sm:py-20">
          <img
            src={flowers}
            alt=""
            aria-hidden
            loading="lazy"
            width={1280}
            height={960}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
          />
          <div className="relative">
            <p className="text-[0.6rem] tracking-[0.4em] text-navy/60 uppercase">
              Together with their families
            </p>
            <p className="font-script mt-6 text-5xl text-navy sm:text-7xl">Kajal</p>
            <p className="my-1 text-2xl text-gold">♡</p>
            <p className="font-script text-5xl text-navy sm:text-7xl">Arul Murugan</p>
            <p className="font-elegant mx-auto mt-6 max-w-md text-base text-navy/70 italic">
              request the pleasure of your company as they begin forever, where the ocean
              meets the shore.
            </p>
            <p className="mt-8 text-xs tracking-[0.3em] text-navy uppercase">
              7 · 9 · 2026 &nbsp;·&nbsp; Mahabalipuram
            </p>
          </div>
        </div>
      </ScratchCard>
    </section>
  );
}

/* ------------------------------ Love story ------------------------------ */

const STORY = [
  { year: "2019", title: "First Wave", text: "A chance meeting, a shared laugh, and the tide turned.", img: palms },
  { year: "2021", title: "Falling Deeper", text: "Long walks, longer conversations, and a thousand sunsets.", img: couple },
  { year: "2024", title: "The Question", text: "Barefoot on wet sand, with the sea as the only witness.", img: rings },
  { year: "2026", title: "Forever", text: "Two families, one horizon, and a promise made in blue.", img: arch },
];

export function LoveStory() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0.1, 0.9], ["2%", "-52%"]);

  return (
    <section id="story" className="relative overflow-hidden bg-[image:var(--gradient-dawn)] py-28">
      <SectionTitle kicker="Our Love Story" title="Written by the sea" />
      <div ref={ref} className="relative">
        <motion.div style={{ x }} className="flex gap-6 px-6 sm:gap-10">
          {STORY.map((s, i) => (
            <motion.article
              key={s.year}
              whileHover={{ y: -14, rotateZ: i % 2 ? 1.2 : -1.2 }}
              transition={{ type: "spring", stiffness: 140, damping: 14 }}
              className="glass zoom-media w-[74vw] shrink-0 overflow-hidden rounded-[2rem] sm:w-[400px]"
            >
              <div className="zoom-media h-56 overflow-hidden sm:h-64">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-7">
                <p className="text-[0.6rem] tracking-[0.4em] text-turquoise uppercase">{s.year}</p>
                <h3 className="font-elegant mt-2 text-3xl text-navy">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
      <Waves className="bottom-0" tone="sand" />
    </section>
  );
}

/* -------------------------------- Events -------------------------------- */

const EVENT_MEDIA = {
engagement: flowers,
reception: receptionEvent,
wedding: arch,
};

export function Events() {
  return (
    <section id="events" className="relative overflow-hidden px-5 py-28">
      <SectionTitle
        kicker="The Celebrations"
        title="Three days of blue"
        subtitle="Every moment planned by the water's edge."
      />
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
        {EVENTS.map((e, i) => (
          <Reveal key={e.key} delay={i * 0.12}>
            <article className="glass card-tilt group flex h-full flex-col overflow-hidden rounded-[2rem]">
              <div className="zoom-media relative h-48 overflow-hidden">
                <img
                  src={EVENT_MEDIA[e.key]}
                  alt={e.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,color-mix(in_oklab,var(--navy)_60%,transparent))]" />
                <h3 className="font-script absolute bottom-3 left-6 text-4xl text-pearl">{e.name}</h3>
              </div>
              <div className="flex flex-1 flex-col gap-4 p-7">
                <Row icon={<CalendarDays size={16} />} text={e.date} />
                <Row icon={<Clock size={16} />} text={e.time} />
                <div className="flex gap-3">
                  <span className="mt-0.5 text-turquoise transition-transform duration-300 group-hover:scale-125">
                    <MapPin size={16} />
                  </span>
                  <div className="text-sm leading-relaxed text-muted-foreground">
                    <p className="font-medium text-navy">{e.venue}</p>
                    {e.address.map((a) => (
                      <p key={a}>{a}</p>
                    ))}
                  </div>
                </div>
                <div className="mt-auto pt-4">
                  <Countdown target={new Date(e.iso)} compact />
                  <a
                    href={e.maps}
                    target="_blank"
                    rel="noreferrer"
                    className="lens-flare mt-5 flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[image:var(--gradient-ocean)] px-6 py-3 text-[0.65rem] tracking-[0.25em] text-primary-foreground uppercase transition-transform duration-300 hover:scale-[1.03]"
                  >
                    <Navigation size={14} /> Open in Maps
                  </a>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Row({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-navy">
      <span className="text-turquoise transition-transform duration-300 hover:rotate-12">{icon}</span>
      {text}
    </div>
  );
}

/* ------------------------------- Countdown ------------------------------ */

export function BigCountdown() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section ref={ref} className="relative overflow-hidden py-32">
      <motion.img
        style={{ y }}
        src={aisle}
        alt="Candle lit beach aisle at dusk"
        loading="lazy"
        width={1280}
        height={960}
        className="absolute inset-0 h-[125%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-[color-mix(in_oklab,var(--navy)_55%,transparent)] backdrop-blur-[2px]" />
      <div className="relative mx-auto max-w-3xl px-5">
        <SectionTitle
          kicker="Counting the tides"
          title="Until we say I do"
          tone="dark"
          subtitle="September 7, 2026 · Sunrise by the Bay of Bengal"
        />
        <Countdown target={WEDDING_DATE} />
      </div>
      <Waves className="bottom-0" tone="night" />
    </section>
  );
}

/* -------------------------------- Gallery ------------------------------- */

const GALLERY = [
  { src: arch, alt: "Floral wedding arch on the beach", span: "row-span-2" },
  { src: shells, alt: "Pearls and sea shells on white sand", span: "" },
  { src: couple, alt: "Couple silhouette at sunset", span: "" },
  { src: reception, alt: "Luxury beachfront reception at night", span: "row-span-2" },
  { src: rings, alt: "Golden wedding rings on a shell", span: "" },
  { src: flowers, alt: "Blue and white flowers on silk", span: "" },
  { src: aisle, alt: "Beach aisle lined with candles", span: "row-span-2" },
  { src: night, alt: "Starry night over the ocean", span: "" },
];

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="gallery" className="relative overflow-hidden bg-[image:var(--gradient-dawn)] px-5 py-28">
      <SectionTitle kicker="Wedding Gallery" title="Moments in blue" />
      <div className="mx-auto grid max-w-6xl auto-rows-[180px] grid-cols-2 gap-4 md:grid-cols-4">
        {GALLERY.map((g, i) => (
          <motion.button
            key={i}
            onClick={() => setActive(i)}
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: (i % 4) * 0.08, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8 }}
            className={`zoom-media sparkle group relative overflow-hidden rounded-3xl ${g.span}`}
          >
            <img src={g.src} alt={g.alt} loading="lazy" className="h-full w-full object-cover" />
            <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,color-mix(in_oklab,var(--ocean)_55%,transparent))] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </motion.button>
        ))}
      </div>

      {active !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[60] grid place-items-center bg-[color-mix(in_oklab,var(--navy)_82%,transparent)] p-6 backdrop-blur-xl"
        >
          <motion.img
            initial={{ scale: 0.85, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
            src={GALLERY[active]!.src}
            alt={GALLERY[active]!.alt}
            className="max-h-[82vh] w-auto rounded-3xl shadow-[var(--shadow-float)]"
          />
          <button
            aria-label="Close"
            className="glass absolute top-6 right-6 grid h-11 w-11 place-items-center rounded-full text-pearl"
          >
            <X size={18} />
          </button>
        </motion.div>
      )}
      <Waves className="bottom-0" tone="sand" />
    </section>
  );
}

/* --------------------------------- Venue -------------------------------- */

export function Venue() {
  return (
    <section id="venue" className="relative px-5 py-28">
      <SectionTitle
        kicker="The Venue"
        title="Blue Bay Resort"
        subtitle="Vadanemelli Village, before Crocodile Park, SH 49, Mahabalipuram."
      />
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <div className="glass card-tilt zoom-media overflow-hidden rounded-[2rem]">
            <img
              src={reception}
              alt="Blue Bay Resort beachfront at night"
              loading="lazy"
              className="h-72 w-full object-cover sm:h-96"
            />
            <div className="flex flex-wrap items-center justify-between gap-4 p-7">
              <div>
                <p className="font-elegant text-2xl text-navy">Blue Bay Resort</p>
                <p className="text-sm text-muted-foreground">Mahabalipuram, Tamil Nadu – 603104</p>
              </div>
              <a
                href={EVENTS[1]!.maps}
                target="_blank"
                rel="noreferrer"
                className="lens-flare overflow-hidden rounded-full bg-[image:var(--gradient-gold)] px-7 py-3 text-[0.65rem] tracking-[0.25em] text-navy uppercase transition-transform duration-300 hover:scale-105"
              >
                Google Maps
              </a>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-6">
          {[
            {
              icon: <MapPin size={18} />,
              title: "Nearby landmarks",
              text: "5 minutes from Crocodile Park, 20 minutes from Shore Temple, right on ECR.",
            },
            {
              icon: <Car size={18} />,
              title: "Parking",
              text: "Complimentary valet and open beachside parking for all guests.",
            },
            {
              icon: <BedDouble size={18} />,
              title: "Accommodation",
              text: "Sea-facing rooms held at the resort — mention Kajal & Arul when booking.",
            },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 0.12}>
              <div className="glass card-tilt flex gap-4 rounded-3xl p-6">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-ocean)] text-primary-foreground">
                  {c.icon}
                </span>
                <div>
                  <p className="font-elegant text-xl text-navy">{c.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{c.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Schedule ------------------------------ */

const SCHEDULE = [
  { time: "Aug 24 · 5:00 PM", title: "Engagement", text: "NPM Mahal, Theni — rings, blessings and sweets." },
  { time: "Sep 6 · 6:00 PM", title: "Reception", text: "Blue Bay Resort — cocktails, dinner and dancing under the stars." },
  { time: "Sep 7 · 5:30 AM", title: "Guests Gather", text: "Coffee and garlands on the sand as the sky turns gold." },
  { time: "Sep 7 · 6:00 AM", title: "Wedding Ceremony", text: "Vows exchanged at sunrise beneath the floral arch." },
  { time: "Sep 7 · 7:00 AM", title: "Sunrise Breakfast", text: "A South Indian feast with the sound of waves." },
];

export function Schedule() {
  return (
    <section id="schedule" className="relative overflow-hidden bg-[image:var(--gradient-dawn)] px-5 py-28">
      <SectionTitle kicker="Schedule" title="How the days unfold" />
      <div className="relative mx-auto max-w-3xl">
        <span className="absolute top-0 left-4 h-full w-px bg-[linear-gradient(180deg,transparent,var(--color-turquoise),transparent)] sm:left-1/2" />
        {SCHEDULE.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08}>
            <div
              className={`relative mb-8 pl-14 sm:w-1/2 sm:pl-0 ${i % 2 ? "sm:ml-auto sm:pl-12" : "sm:pr-12 sm:text-right"}`}
            >
              <span
                className={`absolute top-6 left-2 h-4 w-4 animate-pulse-glow rounded-full bg-[image:var(--gradient-gold)] sm:left-auto ${i % 2 ? "sm:-left-2" : "sm:-right-2"}`}
              />
              <div className="glass card-tilt rounded-3xl p-6">
                <p className="text-[0.6rem] tracking-[0.32em] text-turquoise uppercase">{s.time}</p>
                <p className="font-elegant mt-2 text-2xl text-navy">{s.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------- Dress code ----------------------------- */

const OUTFITS = [
  { label: "Ocean Blue", swatch: "var(--ocean)", note: "Silk sarees, linen shirts" },
  { label: "Pearl White", swatch: "var(--pearl)", note: "Ivory, cream, off-white" },
  { label: "Sky Pastel", swatch: "var(--sky)", note: "Powder blue, mint, blush" },
  { label: "Golden Sand", swatch: "var(--sand)", note: "Beige, champagne, gold" },
];

export function DressCode() {
  return (
    <section className="relative px-5 py-28">
      <SectionTitle
        kicker="Dress Code"
        title="Beach elegant"
        subtitle="Flowing fabrics, bare feet welcome. Please avoid heels on the sand."
      />
      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-5 sm:grid-cols-4">
        {OUTFITS.map((o, i) => (
          <Reveal key={o.label} delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -12, rotateY: 8 }}
              transition={{ type: "spring", stiffness: 160, damping: 12 }}
              className="glass sparkle rounded-3xl p-6 text-center"
            >
              <span
                className="animate-float-soft mx-auto block h-16 w-16 rounded-full shadow-[var(--shadow-glow)]"
                style={{ background: o.swatch, animationDelay: `${i * 0.4}s` }}
              />
              <p className="font-elegant mt-4 text-lg text-navy">{o.label}</p>
              <p className="mt-1 text-[0.7rem] text-muted-foreground">{o.note}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.3}>
        <p className="mt-10 flex items-center justify-center gap-2 text-xs tracking-[0.28em] text-turquoise uppercase">
          <Shirt size={14} /> Linen · Chiffon · Silk
        </p>
      </Reveal>
    </section>
  );
}
