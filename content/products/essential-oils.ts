import type { Product } from "@/lib/schema";
import { oil, TAMIL_NADU } from "./_shared";

/* =============================================================
   ESSENTIAL OILS — 17
   Steam distilled. Route 2 of the Six-Stage Protocol.
   ============================================================= */

const essentialOils: Product[] = [
  oil({
    slug: "vetiver",
    commonName: "Vetiver",
    tamilName: "வெட்டிவேர்",
    botanicalName: "Vetiveria zizanioides",
    casNumber: ["8016-96-4"],
    category: "essential-oil",
    availableForms: ["oil"],
    extractionMethod: "steam-distillation",
    plantPart: "Washed, dried roots",
    appearance: "Amber to dark brown viscous liquid.",
    odourProfile:
      "Deep, earthy and woody. A smoky-rooty body with a sweet balsamic undertone and a leathery, " +
      "almost grapefruit-peel facet in the dry-down. Exceptionally tenacious — one of the great " +
      "natural fixatives.",
    origin: TAMIL_NADU,
    harvestSeason: "Roots lifted December to March, after 12–18 months in ground",
    solubility: "Soluble in alcohol; miscible with most fixed oils; insoluble in water",
    keyConstituents: ["Khusimol", "Vetiselinenol", "α-Vetivone", "β-Vetivone", "Isovalencenol"],
    applications: ["fragrance", "cosmetics", "aromatherapy"],
    summary:
      "Deep, smoky and earthy — among the most tenacious natural fixatives in perfumery.",
    description:
      "Vetiver is a root material, and everything about its quality is decided underground. The " +
      "grass is left in ground for twelve to eighteen months so the root network develops the " +
      "sesquiterpene profile that gives the oil its depth; lifted early, it yields a thin and " +
      "green oil. Roots are washed, dried and chopped, then steam distilled slowly at low " +
      "pressure over an extended cycle — vetiver cannot be hurried, and a short distillation " +
      "leaves the heaviest and most valuable fractions behind. The oil improves with age. " +
      "Supplied with full GC-MS analysis per batch.",
    relatedSlugs: ["cypriol-nagarmotha", "valerian", "nutmeg", "davana"],
    seo: {
      title: "Vetiver Essential Oil Manufacturer & Supplier | PAAF India",
      metaDescription:
        "Vetiver oil (Vetiveria zizanioides, CAS 8016-96-4) steam distilled in Tamil Nadu. Deep, smoky, earthy fixative. GC-MS certified, fully batch traceable.",
    },
  }),

  oil({
    slug: "cypriol-nagarmotha",
    commonName: "Cypriol / Nagarmotha",
    tamilName: "கோரைக்கிழங்கு",
    botanicalName: "Cyperus scariosus",
    casNumber: ["91771-62-9"],
    category: "essential-oil",
    availableForms: ["oil"],
    extractionMethod: "steam-distillation",
    plantPart: "Dried rhizomes",
    appearance: "Dark brown to near-black viscous liquid.",
    odourProfile:
      "Dry, smoky and woody. A leathery, slightly tarry body over an earthy base, with a warm " +
      "spicy nuance. Reads as a natural bridge between vetiver and oud, and is widely used as a " +
      "sustainable alternative to both.",
    origin: TAMIL_NADU,
    harvestSeason: "Rhizomes lifted November to February",
    solubility: "Soluble in alcohol; miscible with most fixed oils",
    keyConstituents: ["Cyperene", "Cyperotundone", "α-Cyperone", "Rotundone", "Patchoulenone"],
    applications: ["fragrance", "cosmetics"],
    summary:
      "Dry, smoky and leathery — the natural bridge between vetiver and oud, and a sustainable alternative to both.",
    description:
      "Cypriol, known across India as Nagarmotha, has become one of the most strategically useful " +
      "woody materials available to perfumers. Its dry, smoky-leathery profile delivers much of " +
      "what oud contributes to an accord at a fraction of the cost and without the sourcing " +
      "pressure on wild agarwood. It is equally effective extending vetiver in woody bases. The " +
      "rhizomes are cleaned, dried and steam distilled at low pressure. Rotundone, the pepper " +
      "molecule, is present in trace amounts and accounts for the faint spicy lift. " +
      "GC-MS certified per batch.",
    relatedSlugs: ["vetiver", "valerian", "black-pepper", "nutmeg"],
    seo: {
      title: "Cypriol / Nagarmotha Oil Supplier (Cyperus scariosus) | PAAF",
      metaDescription:
        "Cypriol / Nagarmotha oil (Cyperus scariosus, CAS 91771-62-9) from Tamil Nadu. Dry, smoky, leathery woody note. GC-MS certified and batch traceable.",
    },
  }),

  oil({
    slug: "nutmeg",
    commonName: "Nutmeg",
    tamilName: "ஜாதிக்காய்",
    botanicalName: "Myristica fragrans",
    casNumber: ["8008-45-5"],
    category: "essential-oil",
    availableForms: ["oil"],
    extractionMethod: "steam-distillation",
    plantPart: "Dried kernels",
    appearance: "Colourless to pale yellow mobile liquid.",
    odourProfile:
      "Warm and spicy with a fresh terpenic-pine top. A sweet, slightly woody aromatic body and " +
      "a soft balsamic close. Rounder and less sharp than clove or cinnamon.",
    origin: "South India",
    harvestSeason: "Kernels available year-round; main crop July to September",
    solubility: "Soluble in alcohol; miscible with most fixed oils",
    keyConstituents: ["Sabinene", "α-Pinene", "β-Pinene", "Myristicin", "Terpinen-4-ol"],
    applications: ["fragrance", "flavour", "cosmetics"],
    summary:
      "Warm, sweet and spicy with a fresh terpenic lift — a workhorse in both flavour and fragrance.",
    description:
      "Nutmeg oil earns its place in both halves of the industry. In flavour it carries savoury, " +
      "bakery and beverage profiles; in fragrance it provides the warm spicy lift at the top of " +
      "fougères, orientals and masculine accords. Kernels are graded and comminuted immediately " +
      "before charging, since the oil content falls quickly once the kernel is broken. Low-pressure " +
      "steam distillation preserves the fresh terpenic top that harsher conditions flatten. " +
      "Myristicin content is reported on the Certificate of Analysis for your regulatory file.",
    relatedSlugs: ["black-pepper", "cardamom", "ginger", "cypriol-nagarmotha"],
    seo: {
      title: "Nutmeg Essential Oil Manufacturer & Supplier | PAAF India",
      metaDescription:
        "Nutmeg oil (Myristica fragrans, CAS 8008-45-5) steam distilled in South India. Warm spicy profile for flavour and fragrance. GC-MS certified.",
    },
  }),

  oil({
    slug: "black-pepper",
    commonName: "Black Pepper",
    tamilName: "மிளகு",
    botanicalName: "Piper nigrum",
    casNumber: ["8006-82-4"],
    category: "essential-oil",
    availableForms: ["oil"],
    extractionMethod: "steam-distillation",
    plantPart: "Dried unripe berries",
    appearance: "Pale greenish-yellow to colourless mobile liquid.",
    odourProfile:
      "Fresh, dry and sharply spicy. A bright terpenic top over a warm woody body, with the " +
      "characteristic peppery bite but none of the pungency of the ground spice — piperine is " +
      "non-volatile and does not carry into the oil.",
    origin: "South India",
    harvestSeason: "December to March",
    solubility: "Soluble in alcohol; miscible with most fixed oils",
    keyConstituents: ["β-Caryophyllene", "Limonene", "Sabinene", "α-Pinene", "δ-3-Carene"],
    applications: ["fragrance", "flavour", "cosmetics"],
    summary:
      "Fresh, dry and spicy — bright terpenic lift over a warm woody body, without the burn.",
    description:
      "Black pepper oil provides sparkle. A small percentage at the top of a composition gives " +
      "lift and a dry spicy edge that reads immediately as pepper, and in flavour it carries " +
      "savoury and meat profiles cleanly. Worth knowing: the heat of ground pepper comes from " +
      "piperine, which is non-volatile and does not distil over — the oil smells of pepper but " +
      "does not taste hot. Berries are harvested unripe, dried and comminuted before low-pressure " +
      "steam distillation. GC-MS certified per batch.",
    relatedSlugs: ["cardamom", "nutmeg", "ginger", "cypriol-nagarmotha"],
    seo: {
      title: "Black Pepper Essential Oil Supplier (Piper nigrum) | PAAF",
      metaDescription:
        "Black pepper oil (Piper nigrum, CAS 8006-82-4) steam distilled in South India. Fresh, dry, spicy top note. GC-MS certified and batch traceable.",
    },
  }),

  oil({
    slug: "cardamom",
    commonName: "Cardamom",
    tamilName: "ஏலக்காய்",
    botanicalName: "Elettaria cardamomum",
    casNumber: ["8000-66-6"],
    category: "essential-oil",
    availableForms: ["oil"],
    extractionMethod: "steam-distillation",
    plantPart: "Dried ripe seeds",
    appearance: "Colourless to pale yellow mobile liquid.",
    odourProfile:
      "Warm, sweet and spicy with a pronounced cineolic-camphoraceous top. A balsamic, faintly " +
      "fruity body and a clean aromatic close. Diffusive and immediately recognisable.",
    origin: "Western Ghats, South India",
    harvestSeason: "August to February",
    solubility: "Soluble in alcohol; miscible with most fixed oils",
    keyConstituents: ["1,8-Cineole", "α-Terpinyl acetate", "Linalool", "Limonene", "Sabinene"],
    applications: ["fragrance", "flavour", "cosmetics", "aromatherapy"],
    summary:
      "Warm, sweet and cineolic — one of the most diffusive spice oils, equally at home in flavour and fine fragrance.",
    description:
      "Cardamom is among the few spice oils that works as a genuine top note in fine fragrance " +
      "while remaining a staple of the flavour bench. The balance between 1,8-cineole and " +
      "α-terpinyl acetate decides the character: cineole-forward lots read fresher and more " +
      "camphoraceous, acetate-forward lots sweeter and fruitier. We report both on the Certificate " +
      "of Analysis so you can specify to your accord. Seeds are decorticated immediately before " +
      "charging — cardamom loses oil rapidly once the pod is opened — and steam distilled at low pressure.",
    relatedSlugs: ["black-pepper", "nutmeg", "ginger", "eucalyptus-globulus"],
    seo: {
      title: "Cardamom Essential Oil Manufacturer & Supplier | PAAF India",
      metaDescription:
        "Cardamom oil (Elettaria cardamomum, CAS 8000-66-6) steam distilled in South India. Cineole and terpinyl acetate reported per batch. GC-MS certified.",
    },
  }),

  oil({
    slug: "lemongrass",
    commonName: "Lemongrass",
    tamilName: "எலுமிச்சைப்புல்",
    botanicalName: "Cymbopogon flexuosus",
    casNumber: ["8007-02-1"],
    category: "essential-oil",
    availableForms: ["oil"],
    extractionMethod: "steam-distillation",
    plantPart: "Fresh aerial parts",
    appearance: "Yellow to amber mobile liquid.",
    odourProfile:
      "Powerfully fresh and lemony with a green, grassy body. The citral content drives a sharp, " +
      "clean citrus character with a slightly earthy undertone. Strong and diffusive.",
    origin: TAMIL_NADU,
    harvestSeason: "Three to four cuts per year, year-round availability",
    solubility: "Soluble in alcohol; miscible with most fixed oils",
    keyConstituents: ["Geranial", "Neral", "Geraniol", "Geranyl acetate", "Limonene"],
    applications: ["fragrance", "flavour", "cosmetics", "aromatherapy"],
    summary:
      "Sharp, fresh and grassy-lemony. High citral, high impact, and one of our steadiest year-round lines.",
    description:
      "Lemongrass is a volume material and a reliable one. Three to four cuts a year from the same " +
      "planting give steady availability, which matters when a buyer needs continuity rather than " +
      "a seasonal allocation. Total citral — geranial plus neral — is the specification that " +
      "matters and is stated on every Certificate of Analysis. The crop is cut fresh and charged " +
      "into the still the same day; citral degrades in stored grass. Low-pressure steam " +
      "distillation with Florentine flask separation keeps the top fresh and free of still notes.",
    relatedSlugs: ["citronella-java", "palmarosa", "eucalyptus-citriodora", "ginger-grass"],
    seo: {
      title: "Lemongrass Essential Oil Manufacturer | PAAF India",
      metaDescription:
        "Lemongrass oil (Cymbopogon flexuosus, CAS 8007-02-1) steam distilled in Tamil Nadu. Total citral stated per batch. GC-MS certified, year-round supply.",
    },
  }),

  oil({
    slug: "palmarosa",
    commonName: "Palmarosa",
    tamilName: "ரோஷா புல் / பாமரோசா",
    botanicalName: "Cymbopogon martinii",
    casNumber: ["8014-19-5"],
    category: "essential-oil",
    availableForms: ["oil"],
    extractionMethod: "steam-distillation",
    plantPart: "Fresh or partially dried aerial parts",
    appearance: "Pale yellow to yellow mobile liquid.",
    odourProfile:
      "Sweet, rosy and floral over a green grassy base. The high geraniol content gives a clean " +
      "rose-geranium character with a slightly dry, hay-like close. Soft and well-rounded.",
    origin: TAMIL_NADU,
    harvestSeason: "Two to three cuts per year, principally October to February",
    solubility: "Soluble in alcohol; miscible with most fixed oils",
    keyConstituents: ["Geraniol", "Geranyl acetate", "Linalool", "β-Caryophyllene", "Nerol"],
    applications: ["fragrance", "flavour", "cosmetics", "aromatherapy"],
    summary:
      "Sweet rosy-geranium over grassy green — the economical natural rose note, high in geraniol.",
    description:
      "Palmarosa is the natural rose note that works at volume. Its geraniol content, typically " +
      "well above seventy per cent, gives a clean rosy character that extends rose accords in " +
      "soap, personal care and household fragrance where a true rose absolute is not viable on " +
      "cost. It is also a feedstock for natural geraniol isolation. The grass is harvested at " +
      "full flower, when geraniol is at its peak, and steam distilled at low pressure. Geraniol " +
      "assay is stated on every Certificate of Analysis.",
    relatedSlugs: ["ginger-grass", "lemongrass", "rose-edward", "citronella-java"],
    seo: {
      title: "Palmarosa Essential Oil Supplier (Cymbopogon martinii) | PAAF",
      metaDescription:
        "Palmarosa oil (CAS 8014-19-5) steam distilled in Tamil Nadu. High geraniol rosy note for fragrance and personal care. Geraniol assay stated per batch.",
    },
  }),

  oil({
    slug: "ginger-grass",
    commonName: "Ginger Grass",
    tamilName: "இஞ்சிப்புல்",
    botanicalName: "Cymbopogon martinii var. sofia",
    casNumber: ["8023-92-5"],
    category: "essential-oil",
    availableForms: ["oil"],
    extractionMethod: "steam-distillation",
    plantPart: "Fresh aerial parts",
    appearance: "Pale yellow to olive-yellow mobile liquid.",
    odourProfile:
      "Earthy and herbaceous with a rosy undertone. Rougher and less sweet than palmarosa, with " +
      "a camphoraceous-phenolic edge and a dry woody close. Useful where palmarosa would read " +
      "too polished.",
    origin: TAMIL_NADU,
    harvestSeason: "Two cuts per year, October to February",
    solubility: "Soluble in alcohol; miscible with most fixed oils",
    keyConstituents: ["Perillyl alcohol", "Limonene", "Geraniol", "Carvone", "Dihydrocuminyl alcohol"],
    applications: ["fragrance", "cosmetics"],
    summary:
      "The rougher sibling of palmarosa — earthy, herbaceous and camphoraceous with a rosy base.",
    description:
      "Ginger grass is the sofia variety of the same species that gives palmarosa, and the two " +
      "are routinely confused in trade. They are not interchangeable. Where palmarosa is sweet " +
      "and rosy, ginger grass is earthy, herbaceous and distinctly camphoraceous, with a " +
      "perillyl-alcohol profile rather than a geraniol-dominant one. It finds use in functional " +
      "fragrance and household products where a rustic herbal-rosy note is wanted at low cost. " +
      "Steam distilled at low pressure and GC-MS certified so the variety is never in question.",
    relatedSlugs: ["palmarosa", "lemongrass", "citronella-ceylon", "curry-leaf"],
    seo: {
      title: "Ginger Grass Oil Supplier (Cymbopogon martinii var. sofia) | PAAF",
      metaDescription:
        "Ginger grass oil (CAS 8023-92-5) steam distilled in Tamil Nadu. Earthy, herbaceous, camphoraceous-rosy. GC-MS certified against variety.",
    },
  }),

  oil({
    slug: "citronella-java",
    commonName: "Citronella Java",
    tamilName: "ஜாவா சிட்ரோனெல்லா",
    botanicalName: "Cymbopogon winterianus",
    casNumber: ["91771-61-8"],
    category: "essential-oil",
    availableForms: ["oil"],
    extractionMethod: "steam-distillation",
    plantPart: "Fresh aerial parts",
    appearance: "Pale yellow to yellow mobile liquid.",
    odourProfile:
      "Fresh, sweet and lemony with a clean grassy body and a rosy-geranium undertone. Brighter " +
      "and sweeter than the Ceylon type, with higher citronellal driving the character.",
    origin: TAMIL_NADU,
    harvestSeason: "Three cuts per year, year-round availability",
    solubility: "Soluble in alcohol; miscible with most fixed oils",
    keyConstituents: ["Citronellal", "Geraniol", "Citronellol", "Geranyl acetate", "Limonene"],
    applications: ["fragrance", "cosmetics", "aromatherapy"],
    summary:
      "The brighter, sweeter citronella. High citronellal, and the feedstock for natural citronellal and hydroxycitronellal.",
    description:
      "Java citronella is the commercially dominant of the two types and the one most buyers mean " +
      "when they specify citronella without qualification. Its higher citronellal and geraniol " +
      "content make it both a finished fragrance material for soap, candles and household " +
      "products and an important feedstock for natural isolates. Total aldehyde content is the " +
      "governing specification and is stated on each Certificate of Analysis. Cut fresh and " +
      "distilled the same day at low pressure, with Florentine flask gravity separation.",
    relatedSlugs: ["citronella-ceylon", "lemongrass", "eucalyptus-citriodora", "palmarosa"],
    seo: {
      title: "Citronella Java Oil Manufacturer (C. winterianus) | PAAF India",
      metaDescription:
        "Citronella Java oil (Cymbopogon winterianus, CAS 91771-61-8) from Tamil Nadu. High citronellal, total aldehyde stated per batch. GC-MS certified.",
    },
  }),

  oil({
    slug: "citronella-ceylon",
    commonName: "Citronella Ceylon",
    tamilName: "சிலோன் சிட்ரோனெல்லா",
    botanicalName: "Cymbopogon nardus",
    casNumber: ["8000-29-1"],
    category: "essential-oil",
    availableForms: ["oil"],
    extractionMethod: "steam-distillation",
    plantPart: "Fresh aerial parts",
    appearance: "Pale yellow to brownish-yellow mobile liquid.",
    odourProfile:
      "Lemony but noticeably drier and woodier than the Java type, with a camphoraceous-herbal " +
      "edge and a warm resinous close. Lower in citronellal, higher in the woody fraction.",
    origin: TAMIL_NADU,
    harvestSeason: "Two to three cuts per year",
    solubility: "Soluble in alcohol; miscible with most fixed oils",
    keyConstituents: ["Geraniol", "Citronellal", "Limonene", "Methyl isoeugenol", "Borneol"],
    applications: ["fragrance", "cosmetics"],
    summary:
      "The drier, woodier citronella — lower citronellal, warmer resinous base than the Java type.",
    description:
      "Ceylon citronella is a distinct commercial type, not a grade of Java, and the difference " +
      "shows in both profile and price. Lower citronellal and a higher proportion of woody and " +
      "resinous constituents give a drier, warmer oil that suits functional fragrance where a " +
      "softer, less sharp citronella is wanted. Because the two types are frequently " +
      "substituted in trade, we GC-MS fingerprint every batch and state the type explicitly on " +
      "the Certificate of Analysis.",
    relatedSlugs: ["citronella-java", "lemongrass", "ginger-grass", "eucalyptus-citriodora"],
    seo: {
      title: "Citronella Ceylon Oil Supplier (Cymbopogon nardus) | PAAF",
      metaDescription:
        "Citronella Ceylon oil (Cymbopogon nardus, CAS 8000-29-1) from Tamil Nadu. Dry, woody citronella type, GC-MS verified against Java. Request a quote.",
    },
  }),

  oil({
    slug: "eucalyptus-globulus",
    commonName: "Eucalyptus Globulus",
    tamilName: "யூகலிப்டஸ் / தைலமரம்",
    botanicalName: "Eucalyptus globulus",
    casNumber: ["8000-48-4"],
    category: "essential-oil",
    availableForms: ["oil"],
    extractionMethod: "steam-distillation",
    plantPart: "Fresh leaves and terminal branchlets",
    appearance: "Colourless to pale yellow mobile liquid.",
    odourProfile:
      "Strongly camphoraceous and cineolic. A sharp, penetrating fresh top with a clean woody-herbal " +
      "body. Unmistakable and highly diffusive.",
    origin: "Nilgiris, Tamil Nadu, India",
    harvestSeason: "Year-round",
    solubility: "Soluble in alcohol; miscible with most fixed oils",
    keyConstituents: ["1,8-Cineole", "α-Pinene", "Limonene", "p-Cymene", "Globulol"],
    applications: ["fragrance", "cosmetics", "aromatherapy"],
    summary:
      "The classic cineolic eucalyptus — sharp, penetrating and highly diffusive. Cineole assay stated per batch.",
    description:
      "Eucalyptus Globulus is specified almost entirely on one number: 1,8-cineole content. We " +
      "rectify to the assay you require and state it on every Certificate of Analysis. The " +
      "material is a staple of household and personal care fragrance, and a volume line we hold " +
      "year-round from the Nilgiris. Leaves are distilled fresh at low pressure. A regulatory " +
      "note for your file: this CAS is shared across several Eucalyptus species, so always " +
      "specify the botanical name as well as the number when raising a purchase order.",
    relatedSlugs: ["eucalyptus-citriodora", "cardamom", "curry-leaf", "lemongrass"],
    seo: {
      title: "Eucalyptus Globulus Oil Manufacturer | PAAF India",
      metaDescription:
        "Eucalyptus Globulus oil (CAS 8000-48-4) steam distilled in the Nilgiris. 1,8-cineole assay stated per batch, rectified to specification. GC-MS certified.",
    },
  }),

  oil({
    slug: "eucalyptus-citriodora",
    commonName: "Eucalyptus Citriodora",
    tamilName: "எலுமிச்சை யூகலிப்டஸ்",
    botanicalName: "Eucalyptus citriodora",
    casNumber: ["85203-56-1"],
    category: "essential-oil",
    availableForms: ["oil"],
    extractionMethod: "steam-distillation",
    plantPart: "Fresh leaves",
    appearance: "Colourless to pale yellow mobile liquid.",
    odourProfile:
      "Fresh and strongly lemony with a sweet rosy-citronellal character. Much softer and sweeter " +
      "than globulus, with almost none of its camphoraceous bite. Clean and bright throughout.",
    origin: TAMIL_NADU,
    harvestSeason: "Year-round",
    solubility: "Soluble in alcohol; miscible with most fixed oils",
    keyConstituents: ["Citronellal", "Citronellol", "Isopulegol", "Citronellyl acetate"],
    applications: ["fragrance", "cosmetics", "aromatherapy"],
    summary:
      "Lemon eucalyptus — sweet, rosy-citronellal and bright, with none of the camphor of globulus.",
    description:
      "Despite the shared genus, Eucalyptus Citriodora has almost nothing in common with Globulus " +
      "on the nose. Where Globulus is cineolic and sharp, Citriodora is citronellal-driven, sweet " +
      "and lemony — far closer in character to citronella than to eucalyptus. It serves both as a " +
      "fragrance material for fresh and citrus accords and as a feedstock for natural citronellal " +
      "isolation. Note the distinct CAS: specifying 8000-48-4 will bring you the wrong material. " +
      "Steam distilled at low pressure, GC-MS certified per batch.",
    relatedSlugs: ["eucalyptus-globulus", "citronella-java", "lemongrass", "palmarosa"],
    seo: {
      title: "Eucalyptus Citriodora Oil Supplier (Lemon Eucalyptus) | PAAF",
      metaDescription:
        "Eucalyptus Citriodora oil (CAS 85203-56-1) from Tamil Nadu. Sweet lemony citronellal profile, distinct from globulus. GC-MS certified per batch.",
    },
  }),

  oil({
    slug: "davana",
    commonName: "Davana",
    tamilName: "தவனம் / மரிக்கொழுந்து",
    botanicalName: "Artemisia pallens",
    casNumber: ["8016-03-3"],
    category: "essential-oil",
    availableForms: ["oil"],
    extractionMethod: "steam-distillation",
    plantPart: "Fresh flowering herb",
    appearance: "Dark greenish-brown to amber viscous liquid.",
    odourProfile:
      "Rich, fruity and balsamic. A distinctive dried-fruit and rum character over a warm woody " +
      "base, with a tea-like nuance. Famously shifts with skin chemistry, reading differently on " +
      "different wearers.",
    origin: TAMIL_NADU,
    harvestSeason: "January to March",
    solubility: "Soluble in alcohol; miscible with most fixed oils",
    keyConstituents: ["Davanone", "Davana ether", "Linalool", "Bicyclogermacrene", "Nerol"],
    applications: ["fragrance", "flavour", "cosmetics"],
    summary:
      "Rich, fruity and balsamic with a rum and dried-fruit character — a true Tamil Nadu speciality.",
    description:
      "Davana is grown commercially almost nowhere outside southern India, and Tamil Nadu is its " +
      "heartland. The oil's fruity, rum-like character has no close synthetic equivalent, which " +
      "makes it genuinely difficult to substitute once a formula is built around it. In flavour " +
      "it carries fruit and beverage profiles; in fragrance it gives warmth and a dried-fruit " +
      "facet to orientals and gourmands. Davanone content is the governing specification and is " +
      "stated on every Certificate of Analysis. The crop is tightly seasonal — plan ahead for volume.",
    relatedSlugs: ["vanilla", "tobacco-flower", "vetiver", "nutmeg"],
    seo: {
      title: "Davana Essential Oil Manufacturer (Artemisia pallens) | PAAF",
      metaDescription:
        "Davana oil (Artemisia pallens, CAS 8016-03-3) steam distilled in Tamil Nadu. Fruity, rum-like, balsamic. Davanone stated per batch. GC-MS certified.",
    },
  }),

  oil({
    slug: "curry-leaf",
    commonName: "Curry Leaf",
    tamilName: "கறிவேப்பிலை",
    botanicalName: "Murraya koenigii",
    casNumber: ["876068-15-4"],
    category: "essential-oil",
    availableForms: ["oil"],
    extractionMethod: "steam-distillation",
    plantPart: "Fresh leaves",
    appearance: "Pale yellow to greenish-yellow mobile liquid.",
    odourProfile:
      "Fresh, green and intensely herbaceous. A spicy-peppery body with a warm, slightly citrus " +
      "top and a dry woody close. Immediately recognisable to anyone who has cooked with the leaf.",
    origin: TAMIL_NADU,
    harvestSeason: "Year-round",
    solubility: "Soluble in alcohol; miscible with most fixed oils",
    keyConstituents: ["β-Caryophyllene", "α-Pinene", "Sabinene", "β-Phellandrene", "Limonene"],
    applications: ["flavour", "fragrance"],
    summary:
      "Fresh, green and intensely herbaceous — the authentic curry leaf note for savoury flavour work.",
    description:
      "Curry leaf oil is a flavour material first. It delivers the authentic herbaceous-spicy " +
      "signature of the fresh leaf in a stable, standardised, dosable form, which matters for " +
      "savoury seasonings, snack coatings and ready meals where fresh leaf is impractical. In " +
      "fragrance it has a narrower but real use in green and culinary accords. Leaves are " +
      "stripped and distilled fresh, since the volatile profile degrades within hours of " +
      "picking. GC-MS certified per batch.",
    relatedSlugs: ["chrysanthemum", "black-pepper", "ginger", "ginger-grass"],
    seo: {
      title: "Curry Leaf Essential Oil Supplier (Murraya koenigii) | PAAF",
      metaDescription:
        "Curry leaf oil (Murraya koenigii, CAS 876068-15-4) steam distilled in Tamil Nadu. Fresh, green, herbaceous for savoury flavour. GC-MS certified.",
    },
  }),

  oil({
    slug: "kewda",
    commonName: "Kewda",
    tamilName: "தாழம்பூ",
    botanicalName: "Pandanus odoratissimus",
    casNumber: ["91770-47-7"],
    category: "essential-oil",
    availableForms: ["oil"],
    extractionMethod: "steam-distillation",
    plantPart: "Male flower spikes",
    appearance: "Pale yellow mobile liquid.",
    odourProfile:
      "Sweet, honeyed and floral with a strong hyacinth-rosy character and a green, slightly " +
      "phenolic edge. Powerful and penetrating — a small dose carries a long way.",
    origin: "Coastal South India",
    harvestSeason: "July to October, peaking with the monsoon",
    solubility: "Soluble in alcohol; partially soluble in fixed oils",
    keyConstituents: ["2-Phenylethyl methyl ether", "Terpinen-4-ol", "α-Terpineol", "2-Phenylethyl alcohol"],
    applications: ["fragrance", "flavour"],
    summary:
      "Sweet, honeyed and hyacinth-like — a powerful floral used across Indian fine fragrance and confectionery.",
    description:
      "Kewda is distilled from the male flower spikes of the screw pine, gathered during the " +
      "monsoon when the plant flowers. Its dominant constituent, 2-phenylethyl methyl ether, " +
      "gives a honeyed hyacinth character found in almost no other natural material. In India it " +
      "is a traditional fixture of both perfumery and confectionery; internationally it is " +
      "increasingly used where an unusual, powerful floral is wanted. Flowering is short and " +
      "weather-dependent, so supply is genuinely seasonal. GC-MS certified per batch.",
    relatedSlugs: ["champaca", "frangipani", "davana", "jasmine-sambac"],
    seo: {
      title: "Kewda Oil Supplier (Pandanus odoratissimus) | PAAF India",
      metaDescription:
        "Kewda oil (Pandanus odoratissimus, CAS 91770-47-7) steam distilled in South India. Honeyed hyacinth floral for fragrance and flavour. GC-MS certified.",
    },
  }),

  oil({
    slug: "ginger",
    commonName: "Ginger",
    tamilName: "இஞ்சி",
    botanicalName: "Zingiber officinale",
    casNumber: ["8007-08-7"],
    category: "essential-oil",
    availableForms: ["oil"],
    extractionMethod: "steam-distillation",
    plantPart: "Dried rhizomes",
    appearance: "Pale yellow to amber mobile liquid.",
    odourProfile:
      "Warm, fresh and spicy. A bright lemony-terpenic top over a woody-peppery body with a dry " +
      "aromatic close. Clean and lifted — the pungency of fresh root does not carry into the oil.",
    origin: TAMIL_NADU,
    harvestSeason: "Rhizomes lifted December to February",
    solubility: "Soluble in alcohol; miscible with most fixed oils",
    keyConstituents: ["Zingiberene", "β-Sesquiphellandrene", "ar-Curcumene", "Camphene", "β-Bisabolene"],
    applications: ["fragrance", "flavour", "cosmetics", "aromatherapy"],
    summary:
      "Warm, fresh and spicy with a lemony-terpenic lift — the aroma of ginger without the heat.",
    description:
      "Ginger oil gives the aroma of the rhizome without its pungency: gingerols and shogaols, " +
      "which carry the heat, are non-volatile and remain in the spent root. What distils over is " +
      "a warm, fresh, woody-spicy oil with a bright lemony top, driven by zingiberene. It works " +
      "across beverage and confectionery flavour and brings warmth to the top of spicy fragrance " +
      "accords. Rhizomes are dried, comminuted and steam distilled at low pressure. " +
      "GC-MS certified per batch.",
    relatedSlugs: ["black-pepper", "cardamom", "nutmeg", "curry-leaf"],
    seo: {
      title: "Ginger Essential Oil Manufacturer (Zingiber officinale) | PAAF",
      metaDescription:
        "Ginger oil (Zingiber officinale, CAS 8007-08-7) steam distilled in Tamil Nadu. Warm, fresh, spicy for flavour and fragrance. GC-MS certified.",
    },
  }),

  oil({
    slug: "valerian",
    commonName: "Valerian",
    tamilName: "வலேரியன்",
    botanicalName: "Valeriana officinalis",
    casNumber: ["8008-88-6"],
    category: "essential-oil",
    availableForms: ["oil"],
    extractionMethod: "steam-distillation",
    plantPart: "Dried roots and rhizomes",
    appearance: "Olive-green to brown viscous liquid.",
    odourProfile:
      "Warm, woody and balsamic with a pronounced musty-earthy character and an animalic " +
      "undertone. Challenging neat, but at low dosage it gives depth and a natural animalic " +
      "warmth that is difficult to achieve otherwise.",
    origin: "Northern India",
    harvestSeason: "Roots lifted October to December",
    solubility: "Soluble in alcohol; miscible with most fixed oils",
    keyConstituents: ["Bornyl acetate", "Valerenic acid", "Camphene", "α-Pinene", "Valeranone"],
    applications: ["fragrance"],
    summary:
      "Warm, woody and musty-animalic. Difficult neat, valuable at trace — a natural source of animalic depth.",
    description:
      "Valerian is not an easy material and it is not meant to be used generously. Neat, it is " +
      "musty and frankly animalic. At fractions of a percent in a composition it does something " +
      "few naturals can: it gives woody and chypre accords an earthy, living depth and a warmth " +
      "that reads as natural rather than constructed. Perfumers who use it tend to keep using it. " +
      "Roots are washed, dried and steam distilled at low pressure. We recommend requesting a " +
      "sample and working at high dilution before committing to a quantity.",
    relatedSlugs: ["vetiver", "cypriol-nagarmotha", "davana", "nutmeg"],
    seo: {
      title: "Valerian Essential Oil Supplier (Valeriana officinalis) | PAAF",
      metaDescription:
        "Valerian root oil (Valeriana officinalis, CAS 8008-88-6). Warm, woody, musty-animalic depth for fine fragrance. GC-MS certified and batch traceable.",
    },
  }),
];

export default essentialOils;
