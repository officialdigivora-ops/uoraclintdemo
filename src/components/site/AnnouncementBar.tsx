import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ANNOUNCEMENTS } from "@/data/content";

export function AnnouncementBar() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % ANNOUNCEMENTS.length), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="bg-gold-gradient text-primary-foreground flex min-h-14 w-full items-center justify-center px-3 py-2 sm:min-h-12" role="region" aria-label="Announcements">
      <AnimatePresence mode="wait">
        <motion.p key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
          className="w-full min-w-0 text-center font-display text-xl leading-tight font-semibold tracking-normal whitespace-normal break-words md:text-2xl">
          {ANNOUNCEMENTS[i]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
