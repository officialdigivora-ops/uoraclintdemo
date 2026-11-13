import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp, Play, Volume2, VolumeX, X } from "lucide-react";
import { REELS } from "@/data/reels";
import { getProduct, formatINR } from "@/data/products";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";

export function Reels() {
  const [idx, setIdx] = useState<number | null>(null);
  return (
    <>
      <div className="flex gap-3 lg:gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 pb-2">
        {REELS.map((r, i) => (
          <button key={r.id} onClick={() => setIdx(i)} className="group relative shrink-0 w-[200px] lg:w-[260px] aspect-[9/16] overflow-hidden border border-line snap-start text-left hover:glow-gold transition-shadow" aria-label={`Play reel: ${r.caption}`}>
            <img src={r.poster} alt={r.caption} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 overlay-fade" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full border border-gold bg-background/40 backdrop-blur text-gold"><Play className="size-5 fill-current ml-0.5" /></span>
            <span className="absolute bottom-4 left-4 right-4">
              <span className="block font-display text-xl">{r.caption}</span>
              <span className="eyebrow">Shop this look</span>
            </span>
          </button>
        ))}
      </div>
      <AnimatePresence>{idx !== null && <ReelModal idx={idx} setIdx={setIdx} />}</AnimatePresence>
    </>
  );
}

function ReelModal({ idx, setIdx }: { idx: number; setIdx: (i: number | null) => void }) {
  const [muted, setMuted] = useState(true);
  const startY = useRef(0);
  const { add } = useCart();
  const reel = REELS[idx]!;
  const product = getProduct(reel.productSlug);
  const next = () => setIdx((idx + 1) % REELS.length);
  const prev = () => setIdx((idx - 1 + REELS.length) % REELS.length);

  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setIdx(null); if (e.key === "ArrowDown") next(); if (e.key === "ArrowUp") prev(); };
    window.addEventListener("keydown", k); document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  });

  return (
    <motion.div className="fixed inset-0 z-50 bg-background flex items-center justify-center" role="dialog" aria-modal aria-label="Reel"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onTouchStart={(e) => (startY.current = e.touches[0]!.clientY)}
      onTouchEnd={(e) => { const d = e.changedTouches[0]!.clientY - startY.current; if (d < -60) next(); if (d > 60) prev(); }}>
      <div className="relative h-full w-full max-w-[480px] lg:h-[92vh] lg:aspect-[9/16] lg:w-auto overflow-hidden lg:border lg:border-line">
        {reel.video ? (
          <video key={reel.id} src={reel.video} poster={reel.poster} autoPlay loop playsInline muted={muted} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <img key={reel.id} src={reel.poster} alt={reel.caption} className="absolute inset-0 h-full w-full object-cover animate-kenburns" />
        )}
        <div className="absolute inset-0 overlay-fade" />
        <div className="absolute top-4 right-4 flex gap-2">
          <button onClick={() => setMuted(!muted)} aria-label={muted ? "Unmute" : "Mute"} className="h-11 w-11 flex items-center justify-center rounded-full bg-background/60 border border-line">{muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}</button>
          <button onClick={() => setIdx(null)} aria-label="Close" className="h-11 w-11 flex items-center justify-center rounded-full bg-background/60 border border-line"><X className="size-5" /></button>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          <button onClick={prev} aria-label="Previous reel" className="h-11 w-11 flex items-center justify-center rounded-full bg-background/60 border border-line"><ChevronUp className="size-5" /></button>
          <button onClick={next} aria-label="Next reel" className="h-11 w-11 flex items-center justify-center rounded-full bg-background/60 border border-line"><ChevronDown className="size-5" /></button>
        </div>
        {product && (
          <div className="absolute bottom-0 inset-x-0 p-5">
            <p className="font-display text-2xl">{product.name}</p>
            <p className="text-gold mb-4">{formatINR(product.price)}</p>
            <Button className="w-full" onClick={() => add(product)}>Shop this look</Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
