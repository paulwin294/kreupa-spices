/** Single place for business details so Phase 2-4 features reuse the same config. */
export const site = {
  name: "KREUPA SPICES",
  tagline: "Single-origin Indian spices, straight from the estate",
  whatsapp: "919876543210",
  phoneDisplay: "+91 98765 43210",
  email: "hello@kreupaspices.com",
  exportEmail: "export@kreupaspices.com",
  address: "Kochi, Kerala, India",
  freeShippingOver: 999,
};

export function whatsappLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}