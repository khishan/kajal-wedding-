import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { Nav } from "@/components/wedding/Nav";
import { Hero } from "@/components/wedding/Hero";
import { Ambient } from "@/components/wedding/Ambient";
import { MusicPlayer } from "@/components/wedding/MusicPlayer";
import {
  Invitation,
  LoveStory,
  Events,
  BigCountdown,
  Gallery,
  Venue,
  Schedule,
  DressCode,
} from "@/components/wedding/Sections";
import { Rsvp, Wishes } from "@/components/wedding/Rsvp";
import { Footer, FloatingShells } from "@/components/wedding/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kajal & Arul — Beach Wedding Invitation | 7 Sept 2026" },
      {
        name: "description",
        content:
          "Kajal & Arul invite you to their beach wedding at Blue Bay Resort, Mahabalipuram — engagement, reception and sunrise ceremony details, RSVP and guest wishes.",
      },
      { property: "og:title", content: "Kajal ♡ Arul — Beach Wedding Invitation" },
      {
        property: "og:description",
        content:
          "Join us where the ocean meets the shore. Reception 6 Sept, Wedding 7 Sept 2026 at Blue Bay Resort, Mahabalipuram.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/** Morning → sunset → night backdrop driven by scroll. */
function DayNight() {
  const { scrollYProgress } = useScroll();
  const bg = useTransform(
    scrollYProgress,
    [0, 0.35, 0.7, 1],
    [
      "linear-gradient(180deg, oklch(0.96 0.04 220), oklch(0.97 0.02 200))",
      "linear-gradient(180deg, oklch(0.93 0.06 90), oklch(0.9 0.08 60))",
      "linear-gradient(180deg, oklch(0.72 0.12 40), oklch(0.5 0.12 280))",
      "linear-gradient(180deg, oklch(0.24 0.08 258), oklch(0.16 0.06 260))",
    ],
  );
  return <motion.div aria-hidden className="fixed inset-0 -z-50" style={{ backgroundImage: bg }} />;
}

function Index() {
  return (
    <main className="relative">
      <DayNight />
      <Ambient />
      <FloatingShells />
      <Nav />
      <MusicPlayer />

      <Hero />
      <Invitation />
      <LoveStory />
      <Events />
      <BigCountdown />
      <Gallery />
      <Venue />
      <Schedule />
      <DressCode />
      <Rsvp />
      <Wishes />
      <Footer />
    </main>
  );
}
