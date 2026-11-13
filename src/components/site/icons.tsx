import { siInstagram, siFacebook, siWhatsapp } from "simple-icons";

type BrandIconProps = { className?: string; strokeWidth?: number };

export function InstagramIcon({ className = "size-5" }: BrandIconProps) {
  return <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true"><path d={siInstagram.path} /></svg>;
}

export function FacebookIcon({ className = "size-5" }: BrandIconProps) {
  return <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true"><path d={siFacebook.path} /></svg>;
}

export function SocialWhatsAppIcon({ className = "size-5" }: BrandIconProps) {
  return <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true"><path d={siWhatsapp.path} /></svg>;
}

// Compatibility export for existing WhatsApp controls.
export const WhatsAppIcon = SocialWhatsAppIcon;
