"use client";

import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui";
import { whatsappLink } from "@/lib/site";

/* Q6 and brief #1: WhatsApp alongside the form, on every page.
   Hidden on the enquiry routes themselves, where the form is the
   primary action and a floating alternative only competes with it. */

const HIDE_ON = ["/request-quote", "/request-sample", "/thank-you"];

export default function WhatsAppFloat() {
  const pathname = usePathname();
  if (HIDE_ON.some((p) => pathname.startsWith(p))) return null;

  return (
    <a
      href={whatsappLink("Hello PAAF, I have an enquiry about your natural aromatic ingredients.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message PAAF on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-forest-700 text-white shadow-lg transition-all duration-300 hover:w-auto hover:bg-forest-900 hover:px-5 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-gold-600 sm:bottom-7 sm:right-7"
    >
      <Icon name="whatsapp" size={26} filled className="shrink-0" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-[0.9375rem] font-semibold transition-all duration-300 group-hover:ml-2.5 group-hover:max-w-[10rem]">
        Chat with us
      </span>
    </a>
  );
}
