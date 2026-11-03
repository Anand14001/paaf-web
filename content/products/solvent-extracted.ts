import type { Product } from "@/lib/schema";
import { floral, NILAKOTTAI, TAMIL_NADU } from "./_shared";

/* =============================================================
   SOLVENT-EXTRACTED — 14

   One file, two catalogue categories. Every material here is
   solvent extracted, which is what they have in common and what
   this file is named for; `category` then places each one under
   Concretes or Absolutes. Do not rename this file after either
   category — it holds both.
   ============================================================= */

const solventExtracted: Product[] = [
  floral({
    slug: "jasmine-sambac",
    commonName: "Jasmine Sambac",
    tamilName: "மல்லிகை",
    botanicalName: "Jasminum sambac",
    casNumber: ["91770-14-8"],
    category: "concrete",
    availableForms: ["concrete", "absolute"],
    extractionMethod: "solvent-extraction",
    plantPart: "Freshly opened flowers",
    appearance:
      "Concrete: dark orange-brown waxy solid. Absolute: dark orange to reddish-brown viscous liquid.",
    odourProfile:
      "Intensely floral and narcotic. A green, slightly indolic top gives way to a rich, warm, " +
      "fruity-animalic heart with a honeyed facet, settling into a soft tea-like dry-down. " +
      "Fuller and more animalic than grandiflorum.",
    origin: NILAKOTTAI,
    harvestSeason: "March to November, peaking June to August",
    solubility: "Soluble in alcohol and most fixed oils; insoluble in water",
    keyConstituents: ["Linalool", "Benzyl acetate", "Methyl anthranilate", "Indole", "cis-Jasmone"],
    applications: ["fragrance", "cosmetics", "aromatherapy"],
    summary:
      "Our flagship floral. Hand-picked before dawn in the Nilakottai flower belt and extracted within hours of the pluck.",
    description:
      "Jasmine Sambac is the material PAAF was built around. The flowers are picked by hand in the " +
      "hours before sunrise, when the blossom is fully open and its volatile fraction is at its " +
      "richest, and reach our extraction bays the same morning. Delay is the enemy of this material: " +
      "every hour between pluck and charge costs aroma. Fresh blossoms are washed with food-grade " +
      "solvent in stainless-steel extractors at controlled low temperature to yield the concrete, " +
      "which is then alcohol-washed and chilled to separate the waxes and give the absolute. " +
      "Each lot carries a single-batch barcode from the field crate through to the finished drum, " +
      "and is fingerprinted on our in-house GC-MS before release.",
    relatedSlugs: ["jasmine-grandiflorum", "jasmine-auriculatum", "tuberose", "champaca"],
    seo: {
      title: "Jasmine Sambac Concrete & Absolute Manufacturer | PAAF India",
      metaDescription:
        "Jasmine Sambac absolute and concrete (Jasminum sambac, CAS 91770-14-8) from Nilakottai, Tamil Nadu. Dawn-picked, GC-MS certified, batch traceable. Request a quote.",
    },
  }),

  floral({
    slug: "jasmine-grandiflorum",
    commonName: "Jasmine Grandiflorum",
    tamilName: "பிச்சிப்பூ / ஜாதிமல்லி",
    botanicalName: "Jasminum grandiflorum",
    casNumber: ["8022-96-6"],
    category: "concrete",
    availableForms: ["concrete", "absolute"],
    extractionMethod: "solvent-extraction",
    plantPart: "Freshly opened flowers",
    appearance:
      "Concrete: orange-brown waxy solid. Absolute: dark amber to brown viscous liquid.",
    odourProfile:
      "Warm, rich and rounded. A soft fruity-banana top over a honeyed floral heart with a " +
      "distinct hay and tea character, and a gentle indolic depth. Smoother and less animalic " +
      "than sambac, which makes it the easier of the two to build around.",
    origin: NILAKOTTAI,
    harvestSeason: "August to December",
    solubility: "Soluble in alcohol and most fixed oils; insoluble in water",
    keyConstituents: ["Benzyl acetate", "Linalool", "Benzyl benzoate", "Phytol", "Isophytol"],
    applications: ["fragrance", "cosmetics", "aromatherapy"],
    summary:
      "The classic perfumer's jasmine — honeyed, hay-like and rounded, grown in the fields around our facility.",
    description:
      "Jasmine Grandiflorum carries the warm, honeyed signature that a century of fine perfumery " +
      "has been built on. Where Sambac leans animalic, Grandiflorum reads softer and hay-like, and " +
      "it blends far more readily into floral and chypre accords. The flowers open in the evening " +
      "and are gathered at first light; they are weighed, moisture-screened and barcoded at intake, " +
      "then hoisted directly into the extractors without intermediate storage. Solvent extraction at " +
      "controlled low temperature yields the concrete, from which the absolute is recovered by " +
      "alcohol washing and cold filtration. Every batch ships with a Certificate of Analysis.",
    relatedSlugs: ["jasmine-sambac", "jasmine-auriculatum", "indian-rose-centifolia", "tuberose"],
    seo: {
      title: "Jasmine Grandiflorum Absolute & Concrete Supplier | PAAF India",
      metaDescription:
        "Jasmine Grandiflorum absolute and concrete (CAS 8022-96-6) from Tamil Nadu. Solvent extracted, GC-MS certified, fully batch traceable. Request a quote or sample.",
    },
  }),

  floral({
    slug: "jasmine-auriculatum",
    commonName: "Jasmine Auriculatum",
    tamilName: "முல்லை",
    botanicalName: "Jasminum auriculatum",
    casNumber: ["90045-94-6"],
    category: "concrete",
    availableForms: ["concrete", "absolute"],
    extractionMethod: "solvent-extraction",
    plantPart: "Freshly opened flowers",
    appearance: "Concrete: pale to mid orange-brown waxy solid. Absolute: amber viscous liquid.",
    odourProfile:
      "Sweet and green-floral, noticeably lighter and more herbaceous than the other jasmines. " +
      "A delicate hay nuance sits under a fresh, almost dewy top. Useful where a jasmine note is " +
      "wanted without indolic weight.",
    origin: NILAKOTTAI,
    harvestSeason: "June to October",
    solubility: "Soluble in alcohol and most fixed oils; insoluble in water",
    keyConstituents: ["Benzyl acetate", "Linalool", "Methyl linolenate", "Benzyl alcohol"],
    applications: ["fragrance", "cosmetics"],
    summary:
      "The lightest of the three jasmines we extract — green, delicate and free of indolic weight.",
    description:
      "Known locally as Mullai, Jasmine Auriculatum gives a fresher and more transparent reading of " +
      "jasmine than either Sambac or Grandiflorum. Its lower indole content makes it the natural " +
      "choice for compositions where the floral has to stay bright — colognes, fresh florals and " +
      "personal care, where the heavier jasmines would dominate. The flowers are small and the " +
      "yield modest, so availability follows the season closely. Picked at dawn, extracted the same " +
      "day, barcoded by lot and GC-MS certified before dispatch.",
    relatedSlugs: ["jasmine-sambac", "jasmine-grandiflorum", "champaca", "lotus"],
    seo: {
      title: "Jasmine Auriculatum Absolute & Concrete (Mullai) | PAAF India",
      metaDescription:
        "Jasmine Auriculatum absolute and concrete (CAS 90045-94-6) from Nilakottai. Light, green jasmine with low indole. GC-MS certified and batch traceable.",
    },
  }),

  floral({
    slug: "tuberose",
    commonName: "Tuberose",
    tamilName: "சம்பங்கி",
    botanicalName: "Polianthes tuberosa",
    casNumber: ["8024-05-3"],
    category: "concrete",
    availableForms: ["concrete", "absolute"],
    extractionMethod: "solvent-extraction",
    plantPart: "Freshly opened flowers",
    appearance:
      "Concrete: pale orange-brown soft waxy solid. Absolute: dark orange-brown viscous liquid.",
    odourProfile:
      "Heady, creamy and unmistakable. A waxy-green top over a buttery, lactonic heart with a " +
      "coconut facet, carrying a faint rubbery-camphoraceous edge that is the signature of a " +
      "genuine tuberose. Powerful and long-lasting.",
    origin: NILAKOTTAI,
    harvestSeason: "July to November",
    solubility: "Soluble in alcohol and most fixed oils; insoluble in water",
    keyConstituents: ["Methyl benzoate", "Methyl salicylate", "Benzyl benzoate", "Geraniol", "Indole"],
    applications: ["fragrance", "cosmetics"],
    summary:
      "One of the great white florals — creamy, lactonic and powerful. Extracted within hours of the pluck.",
    description:
      "Tuberose is among the most demanding materials in natural perfumery and among the most " +
      "rewarding. The flower continues to produce aroma after picking, which makes handling time " +
      "critical: ours move from field crate to extractor on the same morning, with no intermediate " +
      "warehousing. Low-temperature solvent extraction in food-grade stainless-steel vessels " +
      "preserves the lactonic, creamy character that heat destroys. The concrete is supplied as a " +
      "soft wax; the absolute is recovered by alcohol wash and cold filtration. Both are " +
      "fingerprinted on our in-house GC-MS and released against a batch-specific Certificate of Analysis.",
    relatedSlugs: ["jasmine-sambac", "frangipani", "champaca", "jasmine-grandiflorum"],
    seo: {
      title: "Tuberose Absolute & Concrete Manufacturer | PAAF India",
      metaDescription:
        "Tuberose absolute and concrete (Polianthes tuberosa, CAS 8024-05-3) from Tamil Nadu. Creamy lactonic white floral, GC-MS certified, batch traceable.",
    },
  }),

  floral({
    slug: "champaca",
    commonName: "Champaca",
    tamilName: "செண்பகம் / செண்பகப்பூ",
    botanicalName: "Michelia champaca",
    casNumber: ["94333-99-0"],
    category: "concrete",
    availableForms: ["concrete", "absolute"],
    extractionMethod: "solvent-extraction",
    plantPart: "Freshly opened flowers (yellow and red varieties)",
    appearance: "Concrete: dark brown waxy solid. Absolute: dark brown to greenish viscous liquid.",
    odourProfile:
      "Tea-like and refined. Orange-blossom and ylang facets over a dry woody-spicy undertone, " +
      "with a soft leathery nuance in the dry-down. Less sweet and more composed than most " +
      "tropical white florals.",
    origin: TAMIL_NADU,
    harvestSeason: "June to September",
    solubility: "Soluble in alcohol; partially soluble in fixed oils",
    keyConstituents: ["Linalool", "Methyl benzoate", "β-Ionone", "Phenylethyl alcohol", "Indole"],
    applications: ["fragrance", "cosmetics"],
    summary:
      "A tea-like, dry floral with orange-blossom and ylang facets. Available in yellow and red varieties.",
    description:
      "Champaca occupies a distinctive position between the white florals and the tea notes. Its " +
      "dry, slightly leathery character gives perfumers something the jasmines cannot: a floral " +
      "that reads composed rather than opulent. We extract both the yellow and the red varieties; " +
      "the red tends to the warmer and more spicy of the two, the yellow brighter and more " +
      "tea-like. Specify the variety on enquiry. Flowers are collected at first light and charged " +
      "directly into the extractors, with lot barcoding maintained from the intake bay onward.",
    relatedSlugs: ["jasmine-sambac", "tuberose", "frangipani", "lotus"],
    seo: {
      title: "Champaca Absolute & Concrete Supplier | PAAF India",
      metaDescription:
        "Champaca absolute and concrete (Michelia champaca, CAS 94333-99-0) from Tamil Nadu. Yellow and red varieties, GC-MS certified and batch traceable.",
    },
  }),

  floral({
    slug: "frangipani",
    commonName: "Frangipani",
    tamilName: "பெருங்கள்ளி / அரளிப்பூ",
    botanicalName: "Plumeria alba",
    casNumber: ["94350-02-4"],
    category: "concrete",
    availableForms: ["concrete", "absolute"],
    extractionMethod: "solvent-extraction",
    plantPart: "Freshly opened flowers",
    appearance: "Concrete: pale yellow-brown waxy solid. Absolute: golden amber viscous liquid.",
    odourProfile:
      "Rich, creamy and tropical. Jasmine and gardenia facets over a peachy-fruity heart, with a " +
      "honeyed sweetness and a soft powdery close. Rounder and less sharp than tuberose.",
    origin: TAMIL_NADU,
    harvestSeason: "March to September",
    solubility: "Soluble in alcohol; partially soluble in fixed oils",
    keyConstituents: ["Benzyl salicylate", "Linalool", "Phenylethyl alcohol", "Geraniol", "Nerolidol"],
    applications: ["fragrance", "cosmetics"],
    summary:
      "A creamy tropical floral with gardenia and peach facets — rounder and softer than tuberose.",
    description:
      "Frangipani gives the warm, sun-soaked tropical floral that is difficult to build " +
      "convincingly from synthetics alone. Its peachy-honeyed character sits comfortably in " +
      "suncare, body care and the softer end of fine fragrance. The blossoms are gathered in the " +
      "early morning while the scent is still at its peak and extracted the same day with " +
      "food-grade solvent at controlled low temperature. Yields are modest and the material is " +
      "seasonal, so forward planning helps — talk to us early if you need volume against a " +
      "launch date.",
    relatedSlugs: ["tuberose", "champaca", "jasmine-sambac", "lotus"],
    seo: {
      title: "Frangipani Absolute & Concrete Manufacturer | PAAF India",
      metaDescription:
        "Frangipani absolute and concrete (Plumeria alba, CAS 94350-02-4) from Tamil Nadu. Creamy tropical floral, GC-MS certified, fully batch traceable.",
    },
  }),

  floral({
    slug: "lotus",
    commonName: "Lotus",
    tamilName: "தாமரை",
    botanicalName: "Nelumbo nucifera",
    casNumber: ["85085-51-4"],
    category: "concrete",
    availableForms: ["concrete", "absolute"],
    extractionMethod: "solvent-extraction",
    plantPart: "Freshly opened flowers (pink and white varieties)",
    appearance: "Concrete: olive-brown waxy solid. Absolute: dark green-brown viscous liquid.",
    odourProfile:
      "Delicate and watery-green. A sweet aquatic floral with a powdery heart and a faint spicy " +
      "warmth underneath. Subtle rather than assertive — it gives transparency and lift rather " +
      "than body.",
    origin: TAMIL_NADU,
    harvestSeason: "June to October",
    solubility: "Soluble in alcohol; partially soluble in fixed oils",
    keyConstituents: ["1,4-Dimethoxybenzene", "Linalool", "Palmitic acid", "Cis-jasmone"],
    applications: ["fragrance", "cosmetics"],
    summary:
      "A transparent aquatic floral in pink and white varieties — subtle, powdery and green.",
    description:
      "Lotus is a material of restraint. It does not announce itself the way tuberose or jasmine " +
      "do; what it contributes is a clean, watery transparency that lifts heavier florals and " +
      "gives an accord air. The pink variety is the sweeter and slightly spicier of the two, the " +
      "white cleaner and more green. Both are harvested by hand from standing water in the early " +
      "morning, which makes the pick slow and the yield low — the material is correspondingly " +
      "precious. Specify variety on enquiry. Each lot is GC-MS fingerprinted before release.",
    relatedSlugs: ["jasmine-auriculatum", "champaca", "frangipani", "indian-rose-centifolia"],
    seo: {
      title: "Lotus Absolute & Concrete (Pink / White) Supplier | PAAF India",
      metaDescription:
        "Lotus absolute and concrete (Nelumbo nucifera, CAS 85085-51-4) from Tamil Nadu. Pink and white varieties, hand-harvested, GC-MS certified.",
    },
  }),

  floral({
    slug: "mimosa",
    commonName: "Mimosa",
    tamilName: "மிமோசா",
    botanicalName: "Acacia mearnsii",
    casNumber: ["8031-03-6"],
    category: "absolute",
    availableForms: ["concrete", "absolute"],
    extractionMethod: "solvent-extraction",
    plantPart: "Flowers and flowering twig ends",
    appearance: "Concrete: pale yellow brittle wax. Absolute: pale to mid yellow viscous liquid.",
    odourProfile:
      "Powdery and honeyed. A green cucumber-violet top over a soft floral heart, closing woody " +
      "and faintly almond-like. Gentle and enveloping rather than bright.",
    origin: TAMIL_NADU,
    harvestSeason: "December to March",
    solubility: "Soluble in alcohol; partially soluble in fixed oils",
    keyConstituents: ["Palmitic acid", "Anisaldehyde", "Heptadecane", "Phenylethyl alcohol"],
    applications: ["fragrance", "cosmetics"],
    summary:
      "Powdery, honeyed and softly green — a classic fixative floral for soft and woody accords.",
    description:
      "Mimosa works as much as a texture as a note. Its powdery, slightly waxy character rounds " +
      "the edges of a composition and gives soft-floral and woody accords a velvety finish that " +
      "is hard to reach any other way. The concrete is brittle and high in waxes; the absolute is " +
      "recovered by alcohol wash and cold filtration. Flowering is short and tightly seasonal, so " +
      "production runs in a narrow window each year. Lot-barcoded from intake and released " +
      "against a Certificate of Analysis.",
    relatedSlugs: ["tobacco-flower", "fenugreek", "lotus", "champaca"],
    seo: {
      title: "Mimosa Absolute & Concrete Supplier | PAAF India",
      metaDescription:
        "Mimosa absolute and concrete (Acacia mearnsii, CAS 8031-03-6) from Tamil Nadu. Powdery honeyed floral for soft and woody accords. GC-MS certified.",
    },
  }),

  floral({
    slug: "indian-rose-centifolia",
    commonName: "Indian Rose Centifolia",
    tamilName: "இந்திய ரோஜா",
    botanicalName: "Rosa centifolia",
    casNumber: ["84604-12-6"],
    category: "absolute",
    availableForms: ["concrete", "absolute"],
    extractionMethod: "solvent-extraction",
    plantPart: "Freshly opened petals",
    appearance: "Concrete: orange-red waxy solid. Absolute: deep red-orange viscous liquid.",
    odourProfile:
      "Deep, honeyed and full. A rich rosy heart with clove-spicy warmth and a green-leafy top, " +
      "closing sweet and slightly tea-like. Rounder and more honeyed than the Bourbon type.",
    origin: TAMIL_NADU,
    harvestSeason: "December to March",
    solubility: "Soluble in alcohol; partially soluble in fixed oils",
    keyConstituents: ["Phenylethyl alcohol", "Citronellol", "Geraniol", "Nerol", "Eugenol"],
    applications: ["fragrance", "cosmetics"],
    summary:
      "The deep, honeyed rose — spicy, full-bodied and green at the top. Petals picked at dawn.",
    description:
      "Rosa centifolia is picked petal by petal in the cool hours before the sun is high, because " +
      "warmth drives off the lightest and most valuable fraction of the scent within minutes of " +
      "opening. The flowers reach extraction the same morning. Solvent extraction at low " +
      "temperature yields a deep orange-red concrete, from which the absolute is recovered by " +
      "alcohol wash and chilling to drop out the waxes. The result carries the clove-spicy, " +
      "honeyed depth characteristic of the Indian centifolia harvest. GC-MS fingerprinted per lot.",
    relatedSlugs: ["rose-edward", "jasmine-grandiflorum", "lotus", "champaca"],
    seo: {
      title: "Rose Centifolia Absolute & Concrete | PAAF India",
      metaDescription:
        "Indian Rose Centifolia absolute and concrete (Rosa centifolia, CAS 84604-12-6) from Tamil Nadu. Dawn-picked petals, GC-MS certified, batch traceable.",
    },
  }),

  floral({
    slug: "rose-edward",
    commonName: "Rose Edward",
    tamilName: "எட்வர்ட் ரோஜா",
    botanicalName: "Rosa bourboniana",
    casNumber: ["97660-07-6"],
    category: "absolute",
    availableForms: ["concrete", "absolute"],
    extractionMethod: "solvent-extraction",
    plantPart: "Freshly opened petals",
    appearance: "Concrete: orange-brown waxy solid. Absolute: deep orange-red viscous liquid.",
    odourProfile:
      "Fresh and bright for a rose. A clean rosy heart with a fruity-geranium facet and a light " +
      "green top, less honeyed and less spicy than centifolia. Easier to place in modern, " +
      "transparent compositions.",
    origin: TAMIL_NADU,
    harvestSeason: "November to March",
    solubility: "Soluble in alcohol; partially soluble in fixed oils",
    keyConstituents: ["Citronellol", "Geraniol", "Phenylethyl alcohol", "Nerol", "Farnesol"],
    applications: ["fragrance", "cosmetics"],
    summary:
      "The Edward rose — fresher and more transparent than centifolia, with a fruity-geranium lift.",
    description:
      "Rosa bourboniana, grown widely across southern India as the Edward rose, gives a brighter " +
      "and more immediately recognisable rose than centifolia. Where centifolia is honeyed and " +
      "spicy, Edward reads clean and slightly fruity, which suits the lighter, more transparent " +
      "rose accords that dominate contemporary fine fragrance and personal care. Petals are " +
      "harvested at dawn and extracted the same day. Supplied as concrete or absolute, lot " +
      "barcoded and GC-MS certified before dispatch.",
    relatedSlugs: ["indian-rose-centifolia", "palmarosa", "jasmine-grandiflorum", "lotus"],
    seo: {
      title: "Rose Edward Absolute & Concrete (Rosa bourboniana) | PAAF",
      metaDescription:
        "Rose Edward absolute and concrete (Rosa bourboniana, CAS 97660-07-6) from Tamil Nadu. Fresh, fruity rose. GC-MS certified and batch traceable.",
    },
  }),

  floral({
    slug: "tobacco-flower",
    commonName: "Tobacco Flower",
    tamilName: "புகையிலைப் பூ",
    botanicalName: "Nicotiana tabacum",
    casNumber: ["8037-19-2"],
    category: "absolute",
    availableForms: ["concrete", "absolute"],
    extractionMethod: "solvent-extraction",
    plantPart: "Flowers",
    appearance: "Concrete: dark green-brown waxy solid. Absolute: dark brown viscous liquid.",
    odourProfile:
      "Sweet, hay-like and coumarinic. A honeyed floral top over a dry tobacco-leaf body, with a " +
      "warm balsamic close. Distinct from tobacco leaf absolute — lighter, sweeter and more floral.",
    origin: TAMIL_NADU,
    harvestSeason: "January to April",
    solubility: "Soluble in alcohol; partially soluble in fixed oils",
    keyConstituents: ["Solanone", "Phenylethyl alcohol", "Benzyl alcohol", "Megastigmatrienone"],
    applications: ["fragrance"],
    summary:
      "Sweet, hay-like and coumarinic — the floral side of tobacco, not the cured leaf.",
    description:
      "Tobacco Flower absolute is frequently confused with tobacco leaf, and the two are not " +
      "interchangeable. The flower gives a sweeter, more honeyed and distinctly floral material " +
      "with a hay and coumarin character, where the cured leaf is darker, smokier and far heavier. " +
      "For perfumers building warm ambers, fougères and tobacco accords, the flower provides the " +
      "lift that the leaf alone cannot. Extracted with food-grade solvent at controlled low " +
      "temperature and GC-MS certified per batch.",
    relatedSlugs: ["mimosa", "fenugreek", "davana", "vanilla"],
    seo: {
      title: "Tobacco Flower Absolute & Concrete Supplier | PAAF India",
      metaDescription:
        "Tobacco Flower absolute and concrete (Nicotiana tabacum, CAS 8037-19-2) from Tamil Nadu. Sweet, hay-like, coumarinic. GC-MS certified.",
    },
  }),

  floral({
    slug: "chrysanthemum",
    commonName: "Chrysanthemum",
    tamilName: "சாமந்திப்பூ",
    botanicalName: "Chrysanthemum morifolium",
    casNumber: ["1174331-46-4"],
    category: "absolute",
    availableForms: ["concrete", "absolute"],
    extractionMethod: "solvent-extraction",
    plantPart: "Flower heads",
    appearance: "Concrete: dark green waxy solid. Absolute: dark green-brown viscous liquid.",
    odourProfile:
      "Green and herbaceous with a camphoraceous chamomile facet and a slightly bitter edge. " +
      "More foliage than flower — it brings a fresh, crushed-leaf realism rather than sweetness.",
    origin: TAMIL_NADU,
    harvestSeason: "October to February",
    solubility: "Soluble in alcohol; partially soluble in fixed oils",
    keyConstituents: ["Camphor", "Chrysanthenone", "Borneol", "β-Caryophyllene"],
    applications: ["fragrance", "cosmetics"],
    summary:
      "Green, herbaceous and faintly camphoraceous — a crushed-leaf realism for green accords.",
    description:
      "Chrysanthemum absolute is a green material first and a floral second. Its camphoraceous, " +
      "slightly bitter character gives green and herbal accords a believable foliage note, and it " +
      "works well as a counterweight to the sweetness of the white florals. The flower heads are " +
      "harvested through the cool season and extracted with food-grade solvent at low temperature. " +
      "Note for your regulatory team: the species is listed in some references as " +
      "Dendranthema morifolium — the two names refer to the same plant, and the CAS is confirmed " +
      "on each Certificate of Analysis.",
    relatedSlugs: ["curry-leaf", "mimosa", "lotus", "davana"],
    seo: {
      title: "Chrysanthemum Absolute & Concrete Supplier | PAAF India",
      metaDescription:
        "Chrysanthemum absolute and concrete (Chrysanthemum morifolium, CAS 1174331-46-4) from Tamil Nadu. Green, herbaceous, camphoraceous. GC-MS certified.",
    },
  }),

  floral({
    slug: "fenugreek",
    commonName: "Fenugreek",
    tamilName: "வெந்தயம்",
    botanicalName: "Trigonella foenum-graecum",
    casNumber: ["84625-40-1"],
    category: "absolute",
    availableForms: ["absolute"],
    extractionMethod: "solvent-extraction",
    plantPart: "Seeds",
    appearance: "Dark brown to near-black viscous liquid.",
    odourProfile:
      "Intensely sweet and nutty. Maple and caramel over a spicy, slightly celery-like body, with " +
      "a persistent lovage facet. Extremely powerful — effective at trace levels.",
    origin: TAMIL_NADU,
    harvestSeason: "February to April",
    solubility: "Soluble in alcohol; partially soluble in fixed oils",
    keyConstituents: ["Sotolone", "Neryl acetate", "Camphor", "β-Pinene"],
    applications: ["fragrance", "flavour"],
    summary:
      "A maple-caramel powerhouse with a lovage facet. Used at trace levels in both flavour and fragrance.",
    description:
      "Fenugreek absolute is one of the most concentrated materials we produce, and it is almost " +
      "always used at fractions of a percent. Its sotolone-driven maple and caramel character " +
      "makes it valuable on both sides of the business: in flavour for savoury, sweet and " +
      "caramelised profiles, and in fragrance for warm gourmand and ambery accords where a nutty " +
      "sweetness is wanted without vanilla. Extracted from cleaned, graded seed with food-grade " +
      "solvent. Sample first and dilute heavily — a little goes a very long way.",
    relatedSlugs: ["vanilla", "tobacco-flower", "davana", "mimosa"],
    seo: {
      title: "Fenugreek Absolute Manufacturer & Supplier | PAAF India",
      metaDescription:
        "Fenugreek absolute (Trigonella foenum-graecum, CAS 84625-40-1) from Tamil Nadu. Maple-caramel, sotolone rich, for flavour and fragrance. GC-MS certified.",
    },
  }),

  floral({
    slug: "vanilla",
    commonName: "Vanilla",
    tamilName: "வெண்ணிலா",
    botanicalName: "Vanilla planifolia",
    casNumber: ["8024-06-4"],
    category: "absolute",
    availableForms: ["absolute"],
    extractionMethod: "solvent-extraction",
    plantPart: "Cured beans",
    appearance: "Dark brown viscous liquid.",
    odourProfile:
      "Sweet, balsamic and creamy. A rounded vanillin heart with woody-phenolic depth, a faint " +
      "smoky-leathery nuance from the cure, and a long sweet tail. Far more complex than vanillin alone.",
    origin: "South India",
    harvestSeason: "Cured beans, available year-round subject to crop",
    solubility: "Soluble in alcohol; partially soluble in fixed oils",
    keyConstituents: ["Vanillin", "p-Hydroxybenzaldehyde", "Vanillic acid", "Guaiacol"],
    applications: ["fragrance", "flavour", "cosmetics"],
    summary:
      "Sweet, balsamic and complex — the cured bean, with all the woody-phenolic depth vanillin lacks.",
    description:
      "Vanilla absolute is produced from fully cured beans, and the cure is where the complexity " +
      "comes from: the woody, phenolic and faintly smoky facets that distinguish a true vanilla " +
      "from a vanillin reconstitution develop over months of sweating and drying, not in the " +
      "extraction vessel. We extract with food-grade solvent at controlled temperature to preserve " +
      "that profile intact. Supplied against batch-specific analysis, with vanillin content stated " +
      "on the Certificate of Analysis so your formulation team can work to a known figure.",
    relatedSlugs: ["fenugreek", "tobacco-flower", "nutmeg", "davana"],
    seo: {
      title: "Vanilla Absolute Supplier (Vanilla planifolia) | PAAF India",
      metaDescription:
        "Vanilla absolute (Vanilla planifolia, CAS 8024-06-4) from South India. Cured bean extraction, vanillin content stated per batch. GC-MS certified.",
    },
  }),
];

export default solventExtracted;
