import { whatsappLink } from "@/config/site";
import { WhatsAppIcon } from "./icons";

export function WhatsAppFloat() {
  const link = whatsappLink("Hi UORA! I have a question.");
  if (!link) return null;
  return (
    <a href={link} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full border border-gold bg-elevated text-gold glow-gold hover:bg-gold hover:text-primary-foreground transition-colors">
      <WhatsAppIcon className="size-6" />
    </a>
  );
}
