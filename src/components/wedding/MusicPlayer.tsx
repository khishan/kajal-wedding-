import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Music, Pause, Volume2 } from "lucide-react";
import music from "@/assets/music/wedding.mp3";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [playing, setPlaying] = useState(false);
  const [vol, setVol] = useState(0.4);

  useEffect(() => {
    const audio = new Audio(music);
    audio.loop = true;
    audio.volume = vol;

    audioRef.current = audio;

    const startMusic = async () => {
      if (!audioRef.current || playing) return;

      try {
        await audioRef.current.play();
        setPlaying(true);
      } catch (err) {
        console.error(err);
      }
    };

    window.addEventListener("start-music", startMusic);

    return () => {
      audio.pause();
      window.removeEventListener("start-music", startMusic);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  }, [vol]);
  useEffect(() => {
  const startMusic = async () => {
    if (!audioRef.current || !audioRef.current.paused) return;

    try {
      await audioRef.current.play();
      setPlaying(true);
    } catch (err) {
      console.error(err);
    }

    window.removeEventListener("click", startMusic);
    window.removeEventListener("touchstart", startMusic);
  };

  window.addEventListener("click", startMusic);
  window.addEventListener("touchstart", startMusic);

  return () => {
    window.removeEventListener("click", startMusic);
    window.removeEventListener("touchstart", startMusic);
  };
}, [playing]);

const toggle = async () => {
if (!audioRef.current) return;
if (audioRef.current.paused) {
try {
await audioRef.current.play();
setPlaying(true);
} catch (err) {
console.error("Unable to play audio:", err);
}
} else {
audioRef.current.pause();
setPlaying(false);
}
};

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.8 }}
      className="glass fixed bottom-5 left-5 z-50 flex items-center gap-3 rounded-full py-2 pr-4 pl-2"
    >
      <button
        onClick={toggle}
        aria-label={playing ? "Pause Music" : "Play Music"}
        className={`grid h-11 w-11 place-items-center rounded-full bg-[image:var(--gradient-ocean)] text-primary-foreground transition-transform duration-300 hover:scale-110 ${
          playing ? "animate-pulse-glow" : ""
        }`}
      >
        {playing ? <Pause size={17} /> : <Music size={17} />}
      </button>

      <Volume2 size={15} className="text-muted-foreground" />

      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={vol}
        onChange={(e) => setVol(Number(e.target.value))}
        className="h-1 w-20 cursor-pointer appearance-none rounded-full bg-sky accent-turquoise"
      />
    </motion.div>
  );
}