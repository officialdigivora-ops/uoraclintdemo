// Edit contact details here — used across the whole site.
export const WHATSAPP_NUMBER = "91XXXXXXXXXX"; // digits only, with country code
export const WHATSAPP_DISPLAY = "+91 XXXXX XXXXX";
export const INSTAGRAM_HANDLE = "uora";
export const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;
export const EMAIL = "hello@uora.in";
export const FREE_SHIPPING_THRESHOLD = 1299;

export const isWhatsAppConfigured = () => /^\d{10,15}$/.test(WHATSAPP_NUMBER);

export const whatsappLink = (text?: string) => {
  if (!isWhatsAppConfigured()) return null;
  return `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
};
