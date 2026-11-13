export interface Faq { q: string; a: string; link?: { to: string; label: string } }
export const FAQS: Faq[] = [
  { q: "Does gold plated jewellery tarnish?", a: "UORA pieces are finished with a protective anti-tarnish layer over a steel base. With basic care, they keep their golden tone for a long time." },
  { q: "Can I wear it in water?", a: "Yes — our pieces are water resistant, so handwashing and the odd splash are fine. We still suggest taking them off for long swims to keep the shine longer." },
  { q: "Is it safe for sensitive skin?", a: "Our jewellery is designed to be skin friendly and hypoallergenic. If you have a known metal allergy, try a piece for a short time first." },
  { q: "How do I care for it?", a: "Wipe with a soft cloth after wearing and store it in the UORA pouch. Keep it away from perfume and harsh chemicals.", link: { to: "/care-guide", label: "Read the care guide →" } },
  { q: "Do you offer free shipping across India?", a: "Yes, shipping is free on orders of ₹1299 and above anywhere in India. A small flat fee applies to smaller orders." },
];
