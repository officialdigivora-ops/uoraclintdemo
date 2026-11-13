import { MARQUEE_WORDS } from "@/data/home";

export function CrossMarquee() {
  return (
    <div className="cross-marquee" aria-hidden="true">
      {[0, 1].map((band) => (
        <div key={band} className="cross-marquee-band">
          <div className="cross-marquee-track">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0">
                {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((word, index) => <span key={index} className="cross-marquee-word">{word} <span className="ml-5">✦</span></span>)}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}