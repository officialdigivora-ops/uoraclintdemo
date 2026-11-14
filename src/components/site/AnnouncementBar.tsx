import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ANNOUNCEMENTS } from "@/data/content";

export function AnnouncementBar() {
  const [i, setI] = useState(0);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % ANNOUNCEMENTS.length), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="bg-primary text-primary-foreground relative flex h-10 w-full items-center justify-center overflow-hidden px-3 sm:h-9" role="region" aria-label="Announcements">
      <AnimatePresence mode="wait">
        <motion.p key={i} initial={{ y: reducedMotion ? 0 : 40, opacity: reducedMotion ? 0 : 1 }} animate={{ y: 0, opacity: 1 }} exit={{ y: reducedMotion ? 0 : -40, opacity: reducedMotion ? 0 : 1 }} transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-full max-w-screen-xl min-w-0 text-center font-sans text-xs leading-tight font-semibold tracking-normal uppercase whitespace-normal break-words sm:text-sm">
          {ANNOUNCEMENTS[i]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
