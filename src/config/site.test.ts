import { describe, expect, it } from "vitest";
import { isWhatsAppConfigured, whatsappLink } from "./site";

describe("WhatsApp contact configuration", () => {
  it("recognizes the archive's placeholder number as unconfigured", () => {
    expect(isWhatsAppConfigured()).toBe(false);
  });

  it("does not produce customer-facing links while the number is a placeholder", () => {
    expect(whatsappLink("Hi UORA")).toBeNull();
  });
});