import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({ eyebrow, lead, em, as = "h2", className, align = "center" }: {
  eyebrow?: string; lead: string; em: string; as?: "h1" | "h2"; className?: string; align?: "center" | "left";
}) {
  const H = as;
  return (
    <Reveal className={cn("mb-6 lg:mb-8", align === "center" && "text-center", className)}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <H className={as === "h1" ? "h1-lux" : "h2-lux"}>
        {lead} <em>{em}</em>
      </H>
    </Reveal>
  );
}
