import { useEffect, useRef, useState } from "react";

type Print = { id: number; x: number; y: number; rot: number; left: boolean };
type Ripple = { id: number; x: number; y: number };

/** Cursor footprints on sand + click water ripples + rising bubbles + seagulls. */
export function Ambient() {
  const [prints, setPrints] = useState<Print[]>([]);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const last = useRef({ x: 0, y: 0, side: false });
  const id = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: PointerEvent) => {
      const dx = e.clientX - last.current.x;
      const dy = e.clientY - last.current.y;
      if (Math.hypot(dx, dy) < 90) return;
      const rot = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
      last.current = { x: e.clientX, y: e.clientY, side: !last.current.side };
      const p: Print = {
        id: id.current++,
        x: e.clientX,
        y: e.clientY,
        rot,
        left: last.current.side,
      };
      setPrints((prev) => [...prev.slice(-14), p]);
      window.setTimeout(() => setPrints((prev) => prev.filter((q) => q.id !== p.id)), 2400);
    };

    const onClick = (e: PointerEvent) => {
      const r: Ripple = { id: id.current++, x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev.slice(-6), r]);
      window.setTimeout(() => setRipples((prev) => prev.filter((q) => q.id !== r.id)), 1100);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onClick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onClick);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {prints.map((p) => (
        <span
          key={p.id}
          className="absolute h-4 w-2.5 rounded-full bg-navy/25"
          style={{
            left: p.x + (p.left ? -9 : 9),
            top: p.y,
            transform: `translate(-50%,-50%) rotate(${p.rot}deg)`,
            animation: "fade-print 2.4s ease-out forwards",
            filter: "blur(0.4px)",
          }}
        />
      ))}

      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute h-40 w-40 rounded-full border-2 border-turquoise/70"
          style={{
            left: r.x,
            top: r.y,
            marginLeft: -80,
            marginTop: -80,
            animation: "ripple-out 1.1s var(--ease-silk) forwards",
            boxShadow: "var(--shadow-glow)",
          }}
        />
      ))}

      <Bubbles />
      <Seagulls />
    </div>
  );
}

function Bubbles() {
  const bubbles = Array.from({ length: 26 }, (_, i) => ({
    left: (i * 37) % 100,
    size: 4 + ((i * 7) % 16),
    delay: (i * 1.3) % 18,
    dur: 14 + ((i * 3) % 14),
  }));
  return (
    <>
      {bubbles.map((b, i) => (
        <span
          key={i}
          className="absolute bottom-[-8vh] rounded-full border border-white/60 bg-white/20"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            animation: `rise ${b.dur}s linear ${b.delay}s infinite`,
          }}
        />
      ))}
    </>
  );
}

function Seagulls() {
  const gulls = [
    { top: "14%", dur: 26, delay: 2, scale: 1 },
    { top: "22%", dur: 34, delay: 14, scale: 0.72 },
    { top: "9%", dur: 44, delay: 28, scale: 0.55 },
  ];
  return (
    <>
      {gulls.map((g, i) => (
        <div
          key={i}
          className="absolute"
          style={{ top: g.top, animation: `gull ${g.dur}s linear ${g.delay}s infinite` }}
        >
          <div style={{ animation: "flap 0.9s ease-in-out infinite", transform: `scale(${g.scale})` }}>
            <svg width="42" height="16" viewBox="0 0 42 16" fill="none">
              <path
                d="M1 12C8 12 14 1 21 8C28 1 34 12 41 12"
                stroke="currentColor"
                className="text-navy/45"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      ))}
    </>
  );
}
