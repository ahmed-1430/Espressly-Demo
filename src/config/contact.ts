export const enquiryTypes = [
  { value: "general", label: "A general question" },
  { value: "wholesale", label: "Wholesale & café supply" },
  { value: "events", label: "Private event or catering" },
  { value: "workshops", label: "Workshop booking" },
  { value: "press", label: "Press & collaborations" },
] as const;

export type EnquiryType = (typeof enquiryTypes)[number]["value"];

export const contactCopy = {
  hero: {
    eyebrow: "Contact",
    headline: "Come and find us, or just say hello",
    body:
      "The roastery doubles as the café, so the best way to reach us is usually to walk in. If you need something specific, the form below lands with the right person.",
  },
  visit: {
    kicker: "The roastery",
    title: "Two minutes from the harbour footbridge",
    body:
      "The roastery doubles as the café, on the lane side of the old quay. Step-free entrance, covered bike racks, and the drum is visible through the glass — come at 09:00 on a roast day if you want to watch it work.",
    directions: [
      { label: "On foot", value: "8 minutes from the harbour footbridge" },
      { label: "Bus", value: "22 and 41 stop on Quay Street, 60 m away" },
      { label: "Bikes", value: "Covered racks at the lane entrance" },
      { label: "Access", value: "Step-free throughout, accessible WC" },
    ],
    /** Placeholder map: an illustrated plan, not a third-party embed. */
    mapNote:
      "Map preview — swap in your preferred embed provider in config/contact.ts.",
  },
  hoursTitle: "Opening hours",
  hoursNote: "Kitchen closes 30 minutes before the bar on weekdays.",
} as const;