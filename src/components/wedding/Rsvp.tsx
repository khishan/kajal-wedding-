import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { Heart, Send, Sparkles } from "lucide-react";
import { Reveal, SectionTitle } from "./Reveal";

const field =
  "w-full rounded-2xl border border-border bg-card/70 px-5 py-3.5 text-sm text-navy outline-none transition-all duration-300 placeholder:text-muted-foreground focus:border-turquoise focus:shadow-[var(--shadow-glow)]";

export function Rsvp() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", guests: "1", attending: "yes", note: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSent(true);
    const shoot = (x: number) =>
      confetti({
        particleCount: 70,
        spread: 75,
        origin: { x, y: 0.6 },
        colors: ["#0077FF", "#00CFC8", "#9EE7FF", "#FFD166", "#FFFFFF"],
        scalar: 0.9,
      });
    shoot(0.2);
    window.setTimeout(() => shoot(0.8), 220);
    window.setTimeout(() => shoot(0.5), 440);
  };

  return (
    <section id="rsvp" className="relative overflow-hidden px-5 py-28">
      <div className="aurora pointer-events-none absolute inset-0 opacity-30" />
      <SectionTitle
        kicker="RSVP"
        title="Will you join us?"
        subtitle="Kindly respond before 15 August 2026 so we can save your place by the sea."
      />

      <div className="relative mx-auto max-w-xl">
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 110, damping: 14 }}
              className="glass relative overflow-hidden rounded-[2rem] p-12 text-center"
            >
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute text-xl"
                  style={{ left: `${(i * 13 + 6) % 92}%`, bottom: -30 }}
                  animate={{ y: [-10, -320], opacity: [0, 1, 0], rotate: [0, 220] }}
                  transition={{ duration: 6 + (i % 4), repeat: Infinity, delay: i * 0.5 }}
                >
                  {i % 2 ? "🌸" : "🤍"}
                </motion.span>
              ))}
              <Sparkles className="mx-auto text-gold" />
              <p className="font-script mt-4 text-5xl text-gradient-ocean">Thank you!</p>
              <p className="font-elegant mt-3 text-navy/80 italic">
                Your seat by the shore is saved, {form.name.split(" ")[0]}.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-8 text-[0.65rem] tracking-[0.3em] text-turquoise uppercase"
              >
                Send another response
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={submit}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass grid gap-4 rounded-[2rem] p-8"
            >
              <input
                className={field}
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <select
                  className={field}
                  value={form.attending}
                  onChange={(e) => setForm({ ...form, attending: e.target.value })}
                >
                  <option value="yes">Joyfully accepts</option>
                  <option value="no">Regretfully declines</option>
                </select>
                <select
                  className={field}
                  value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: e.target.value })}
                >
                  {["1", "2", "3", "4", "5+"].map((g) => (
                    <option key={g} value={g}>
                      {g} {g === "1" ? "guest" : "guests"}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                className={`${field} min-h-28 resize-none`}
                placeholder="A message for Kajal & Arul (optional)"
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="lens-flare mt-2 flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[image:var(--gradient-ocean)] px-8 py-4 text-[0.68rem] tracking-[0.3em] text-primary-foreground uppercase shadow-[var(--shadow-glow)]"
              >
                <Send size={14} /> Send RSVP
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

type Wish = { id: number; name: string; text: string };

const SEED: Wish[] = [
  { id: 1, name: "Meera", text: "May your love be as endless as the ocean. So happy for you both!" },
  { id: 2, name: "Ganesh", text: "Kajal & Arul — a sunrise wedding suits you perfectly. Blessings!" },
  { id: 3, name: "Divya", text: "Counting the days until we dance on that sand with you two." },
];

export function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>(SEED);
  const [draft, setDraft] = useState({ name: "", text: "" });

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.name.trim() || !draft.text.trim()) return;
    setWishes((w) => [{ id: Date.now(), ...draft }, ...w]);
    setDraft({ name: "", text: "" });
  };

  return (
    <section
      id="wishes"
      className="relative overflow-hidden bg-[image:var(--gradient-dawn)] px-5 py-28"
    >
      <SectionTitle kicker="Guest Book" title="Wishes on the shore" />

      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <form onSubmit={add} className="glass grid gap-4 rounded-[2rem] p-7">
            <input
              className={field}
              placeholder="Your name"
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            />
            <textarea
              className={`${field} min-h-32 resize-none`}
              placeholder="Leave a handwritten note…"
              value={draft.text}
              onChange={(e) => setDraft({ ...draft, text: e.target.value })}
            />
            <button className="flex items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-gold)] px-7 py-3.5 text-[0.65rem] tracking-[0.3em] text-navy uppercase transition-transform duration-300 hover:scale-[1.03]">
              <Heart size={14} /> Add your wish
            </button>
          </form>
        </Reveal>

        <div className="grid gap-4">
          <AnimatePresence initial={false}>
            {wishes.slice(0, 5).map((w) => (
              <motion.div
                key={w.id}
                layout
                initial={{ opacity: 0, x: 40, rotate: 2 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                exit={{ opacity: 0 }}
                className="glass card-tilt relative overflow-hidden rounded-3xl p-6"
              >
                <motion.span
                  className="absolute top-4 right-5 text-gold"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  ♡
                </motion.span>
                <p className="font-elegant text-lg text-navy/85 italic">“{w.text}”</p>
                <p className="font-script mt-3 text-3xl text-gradient-ocean">{w.name}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
