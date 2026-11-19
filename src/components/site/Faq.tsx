import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { FAQS } from "@/data/faqs";

// Each question gets this many pixels of page scroll before the next one opens.
const SCROLL_STEP = 140;

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const root = useRef<HTMLDivElement>(null);
  const lastAuto = useRef(0);

  useEffect(() => {
    const element = root.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      // The list's top edge is unaffected by which answer is open, so this never feeds back on itself.
      const top = element.getBoundingClientRect().top;
      const index = Math.min(FAQS.length - 1, Math.max(0, Math.floor((window.innerHeight * 0.6 - top) / SCROLL_STEP)));
      if (index !== lastAuto.current) { lastAuto.current = index; setOpen(index); }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", schedule, { passive: true });
    schedule();
    return () => { window.removeEventListener("scroll", schedule); if (frame) cancelAnimationFrame(frame); };
  }, []);

  return (
    <div ref={root} className="max-w-3xl mx-auto border-t border-line">
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="border-b border-line">
            <button className="w-full flex items-center justify-between gap-4 py-5 text-left min-h-11" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)}>
              <span className="font-display text-xl lg:text-2xl">{f.q}</span>
              <span className="text-gold shrink-0">{isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}</span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: "easeOut" }} className="overflow-hidden">
                  <p className="pb-5 text-muted-foreground">{f.a} {f.link && <Link to={f.link.to as "/care-guide"} className="text-gold hover:underline">{f.link.label}</Link>}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
