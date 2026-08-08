import { MessageCircle } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink(`Hello ${site.name}, I would like to enquire about your spices.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Enquire on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-leaf px-4 py-3 text-sm font-semibold text-leaf-foreground shadow-lift transition-transform hover:scale-105"
    >
      <MessageCircle className="size-5" />
      <span className="hidden sm:inline">WhatsApp enquiry</span>
    </a>
  );
}