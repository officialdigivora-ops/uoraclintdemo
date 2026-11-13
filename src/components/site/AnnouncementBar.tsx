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
    <div className="bg-gold-gradient text-primary-foreground h-11 sm:h-9 flex items-center justify-center overflow-hidden px-3" role="region" aria-label="Announcements">
      <AnimatePresence mode="wait">
        <motion.p key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
          className="w-full max-w-3xl min-w-0 text-center text-[11px] lg:text-xs leading-4 font-medium tracking-normal uppercase whitespace-normal break-words">
          {ANNOUNCEMENTS[i]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
