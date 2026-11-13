import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { FAQS } from "@/data/faqs";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="max-w-3xl mx-auto border-t border-line">
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
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
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
