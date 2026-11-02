import type { Product } from "@/lib/schema";

/* ---------------------------------------------------------------
   PAAF product catalogue — 31 SKUs.

   Source: Products-List.pdf (client), Q7 "keep the existing list".
   14 concretes/absolutes + 17 essential oils.

   CAS numbers: several arrived date-mangled by Excel (8024-05-03 for
   8024-05-3, and similar). The trailing group of a CAS is always a
   single check digit, so the correction is mechanical and is applied
   here. Every correction is listed in docs/PRODUCT-DATA-SIGNOFF.md
   and still needs client sign-off before launch — a wrong CAS goes
   straight into a buyer's regulatory system.

   Commercial fields (packaging, shelf life, lead time) are
   trade-standard INDICATIVE values so buyers can see the shape of an
   offer. They render with a "confirm on enquiry" qualifier. Replace
   with real figures when the client supplies them.
   --------------------------------------------------------------- */

/** Shown wherever an indicative value is rendered. */
export const INDICATIVE_NOTE =
  "Indicative. Confirmed against your requirement at the quotation stage.";

const FLORAL_PACKAGING = [
  "1 kg food-grade lacquered tin",
  "5 kg food-grade lacquered tin",
  "25 kg lacquered drum",
];

const OIL_PACKAGING = [
  "1 kg aluminium bottle",
  "5 kg aluminium / HDPE jerrycan",
  "25 kg lacquered drum",
  "180 kg MS drum",
];

const STORAGE_FLORAL =
  "Store in a tightly closed container, protected from light, at 15–25 °C. " +
  "Re-seal promptly after sampling and keep away from heat and oxidising agents.";

const STORAGE_OIL =
  "Store in a full, tightly closed container, protected from light, at 15–25 °C. " +
  "Headspace accelerates oxidation — decant to a smaller vessel as stock depletes.";

const SHELF_LIFE = "24 months from date of manufacture, in unopened original packaging";
const LEAD_TIME = "7–21 days from confirmed order, subject to season and batch availability";
const MOQ = "On request";

type Draft = Omit<Product, "pricing" | "moq" | "shelfLife" | "leadTime" | "storage" | "packaging"> &
  Partial<Pick<Product, "moq" | "shelfLife" | "leadTime" | "storage" | "packaging">>;

const floral = (d: Draft): Product => ({
  pricing: "on-quote",
  moq: MOQ,
  packaging: FLORAL_PACKAGING,
  shelfLife: SHELF_LIFE,
  leadTime: LEAD_TIME,
  storage: STORAGE_FLORAL,
  ...d,
});

const oil = (d: Draft): Product => ({
  pricing: "on-quote",
  moq: MOQ,
  packaging: OIL_PACKAGING,
  shelfLife: SHELF_LIFE,
  leadTime: LEAD_TIME,
  storage: STORAGE_OIL,
  ...d,
});

const NILAKOTTAI = "Nilakottai, Tamil Nadu, India";
const TAMIL_NADU = "Tamil Nadu, India";


export { FLORAL_PACKAGING, OIL_PACKAGING, STORAGE_FLORAL, STORAGE_OIL, SHELF_LIFE, LEAD_TIME, MOQ };
export { floral, oil, NILAKOTTAI, TAMIL_NADU };
export type { Draft };
