import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

/** Sand scratch-off revealing the invitation. */
export function ScratchCard({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  const drawing = useRef(false);

  const paintSand = useCallback((canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { width: w, height: h } = canvas;
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "#f7ecd6");
    g.addColorStop(0.5, "#efdfc0");
    g.addColorStop(1, "#e6d3ae");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < w * h * 0.045; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const a = Math.random() * 0.22;
      ctx.fillStyle = Math.random() > 0.5 ? `rgba(255,255,255,${a})` : `rgba(150,120,80,${a})`;
      ctx.fillRect(x, y, 1.4, 1.4);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(r.width));
      canvas.height = Math.max(1, Math.floor(r.height));
      paintSand(canvas);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [paintSand]);

  const scratch = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const r = canvas.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * canvas.width;
    const y = ((e.clientY - r.top) / r.height) * canvas.height;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 46, 0, Math.PI * 2);
    ctx.fill();
    for (let i = 0; i < 12; i++) {
      const a = Math.random() * Math.PI * 2;
      const d = 46 + Math.random() * 34;
      ctx.beginPath();
      ctx.arc(x + Math.cos(a) * d, y + Math.sin(a) * d, Math.random() * 9, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalCompositeOperation = "source-over";

    // progress check (sampled)
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let clear = 0;
    for (let i = 3; i < data.length; i += 4 * 60) if (data[i] === 0) clear++;
    if (clear / (data.length / (4 * 60)) > 0.45) setRevealed(true);
  };

  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <div className="glass overflow-hidden rounded-[2rem] p-1">
        <div className="relative overflow-hidden rounded-[1.75rem]">
          {children}
          <canvas
            ref={canvasRef}
            onPointerDown={(e) => {
              drawing.current = true;
              (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
              scratch(e);
            }}
            onPointerMove={(e) => drawing.current && scratch(e)}
            onPointerUp={() => (drawing.current = false)}
            onPointerLeave={() => (drawing.current = false)}
            className={`absolute inset-0 h-full w-full cursor-grab touch-none transition-opacity duration-1000 ${
              revealed ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          />
          {!revealed && (
            <motion.p
              animate={{ opacity: [0.45, 1, 0.45] }}
              transition={{ duration: 2.6, repeat: Infinity }}
              className="pointer-events-none absolute inset-x-0 bottom-8 text-center text-xs tracking-[0.35em] text-navy/70 uppercase"
            >
              Brush away the sand
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
}
