/* ---------------------------------------------------------------
   The Six-Stage Extraction Protocol — client copy from Q3, edited
   for the web but not embellished. One array drives both the
   homepage strip and the /process page, so the two can never drift.

   Note on the "99.8%" figure from the questionnaire: it is carried
   here as a description of the closed-loop system rather than as a
   headline percentage, because the brief criticises a competitor
   for an unsubstantiated 99.8% claim (Q20). Restore the number the
   moment the client supplies its basis of measurement.
   --------------------------------------------------------------- */

export type ProcessStage = {
  number: string;
  title: string;
  badge: string;
  meta: string;
  body: string;
  detail?: string[];
};

export const processStages: ProcessStage[] = [
  {
    number: "01",
    title: "Harvest & direct botanical intake",
    badge: "Field to facility",
    meta: "Own farms · Trusted growers",
    body:
      "Fresh botanicals from our own farms and from growers we work with directly are brought " +
      "straight to our intake bays. The flower belt around Nilakottai means the journey from " +
      "field to facility is measured in minutes, not days — which is the whole reason the " +
      "aroma survives it.",
    detail: [
      "Blossoms hand-picked before sunrise, when the volatile fraction is at its peak",
      "Delivered to intake the same morning, with no intermediate holding",
      "Grower and field recorded against the incoming crate",
    ],
  },
  {
    number: "02",
    title: "Botanical intake & verification",
    badge: "Batch verified",
    meta: "Weigh · Grade · Barcode",
    body:
      "Every crate is weighed, moisture-screened and graded, then assigned a single-batch " +
      "barcode. That barcode is what makes field-to-extract traceability real rather than " +
      "rhetorical: it follows the material through every subsequent stage and onto the " +
      "Certificate of Analysis.",
    detail: [
      "Gross and net weight recorded per crate",
      "Moisture screening before acceptance",
      "Single-batch barcode assigned at the bay",
      "Grade and condition logged against the grower record",
    ],
  },
  {
    number: "03",
    title: "Direct hoist transfer",
    badge: "Bloom to vessel",
    meta: "Immediate charging",
    body:
      "Botanicals move by dedicated automated hoist directly into the extraction vessels. There " +
      "is no intermediate warehousing and no cross-handling. For delicate florals this single " +
      "decision does more for final quality than any amount of downstream processing.",
    detail: [
      "Integrated conveyor line from the loading bay to the extractors",
      "Zero intermediate storage between intake and charge",
      "No cross-handling between batches",
    ],
  },
  {
    number: "04",
    title: "Segment-tailored extraction & distillation",
    badge: "2 dedicated routes",
    meta: "Solvent · Steam",
    body:
      "Extraction method is chosen by botanical chemistry, not by convenience. Delicate florals " +
      "and heat-stable aromatic crops need fundamentally different treatment, so they run on " +
      "separate dedicated routes.",
    detail: [
      "FLORAL SEGMENT — Solvent extraction. Food-grade stainless-steel extractors wash fresh flowers (Jasmine Sambac, Jasmine Grandiflorum, Tuberose) with pure solvent at controlled low temperature to yield aromatic concrete.",
      "ESSENTIAL OILS SEGMENT — Steam distillation. Fresh aromatic crops (Lemongrass, Palmarosa, Citronella) undergo direct low-pressure steam distillation. Gentle vapour lifts the volatile fraction without thermal scorch, followed by cooling and Florentine flask gravity separation.",
    ],
  },
  {
    number: "05",
    title: "Closed-loop condensation & resource recovery",
    badge: "Closed loop",
    meta: "Sealed circuits · Zero hazardous discharge",
    body:
      "All solvent vapour and cooling loops circulate through hermetically sealed refrigeration " +
      "circuits. Process media is condensed, recovered and recycled on site, with no hazardous " +
      "effluent discharge. It is better for the surrounding farmland, and it is the only way " +
      "the economics of solvent extraction work at our scale.",
    detail: [
      "Hermetically sealed refrigeration circuits",
      "Process media condensed, recovered and recycled on site",
      "PLC-controlled solvent recovery line",
      "No hazardous effluent discharge",
    ],
  },
  {
    number: "06",
    title: "GC-MS analytical certification & release",
    badge: "Lab certified",
    meta: "Certificate of Analysis",
    body:
      "Every production batch is fingerprinted on our in-house Shimadzu AOC-20i Plus GC-MS suite " +
      "before dispatch. Nothing ships on assumption. The analysis verifies the constituent " +
      "profile and confirms natural authenticity, and the resulting Certificate of Analysis " +
      "travels with the batch.",
    detail: [
      "In-house Shimadzu AOC-20i Plus GC-MS",
      "Constituent profile verified against the reference fingerprint",
      "Optical rotation and refractive index measured",
      "Certificate of Analysis issued per batch, barcode-linked to the intake record",
    ],
  },
];

/* -- Infrastructure (Q3) ---------------------------------------- */

export const infrastructure = [
  {
    title: "SS-316 vacuum distillation & solvent extraction units",
    body: "Food-grade stainless-steel vacuum vessels for floral concretes and essential oils.",
  },
  {
    title: "Dedicated food-grade extractors",
    body: "Separate extractor trains for the floral and essential-oil segments, so routes never cross.",
  },
  {
    title: "PLC solvent recovery line",
    body: "Programmable-logic-controlled recovery, keeping the solvent circuit sealed and measurable.",
  },
  {
    title: "Automated hoist line",
    body: "Integrated conveyor from the loading bay to the extractors, for effortless material transfer.",
  },
  {
    title: "Shimadzu AOC-20i Plus GC-MS",
    body: "In-house analytical suite. Every batch is fingerprinted here before it is released.",
  },
  {
    title: "Florentine separation",
    body: "Gravity separation of distillate following cooling, on the steam distillation route.",
  },
] as const;
