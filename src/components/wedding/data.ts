export const COUPLE = { bride: "Kajal", groom: "Arul" };

export type WeddingEvent = {
  key: string;
  name: string;
  date: string;
  iso: string;
  time: string;
  venue: string;
  address: string[];
  maps: string;
};

export const EVENTS: WeddingEvent[] = [
  {
    key: "engagement",
    name: "Engagement",
    date: "August 24, 2026",
    iso: "2026-08-24T17:00:00+05:30",
    time: "5:00 PM onwards",
    venue: "NPM Mahal",
    address: ["Near Theni Medical College", "Madurai Road", "Theni – 625531"],
    maps: "https://www.google.com/maps/search/?api=1&query=NPM+Mahal+Madurai+Road+Theni+625531",
  },
  {
    key: "reception",
    name: "Reception",
    date: "September 6, 2026",
    iso: "2026-09-06T18:00:00+05:30",
    time: "6:00 PM onwards",
    venue: "Blue Bay Resort",
    address: [
      "Vadanemelli Village",
      "Before Crocodile Park, SH 49",
      "Mahabalipuram, Tamil Nadu – 603104",
    ],
    maps: "https://www.google.com/maps/search/?api=1&query=Blue+Bay+Resort+Vadanemelli+Mahabalipuram+603104",
  },
  {
    key: "wedding",
    name: "Wedding Ceremony",
    date: "September 7, 2026",
    iso: "2026-09-07T06:00:00+05:30",
    time: "6:00 AM – 7:00 AM",
    venue: "Blue Bay Resort",
    address: [
      "Vadanemelli Village",
      "Before Crocodile Park, SH 49",
      "Mahabalipuram, Tamil Nadu – 603104",
    ],
    maps: "https://www.google.com/maps/search/?api=1&query=Blue+Bay+Resort+Vadanemelli+Mahabalipuram+603104",
  },
];

export const WEDDING_DATE = new Date("2026-09-07T06:00:00+05:30");
