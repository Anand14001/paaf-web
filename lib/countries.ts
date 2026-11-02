/* Country list for the enquiry form. Q6: country affects shipping,
   compliance and pricing, so it is a required field and a select
   rather than free text — misspelled countries are useless to sales.

   Ordered with PAAF's principal export markets first, then the full
   list alphabetically. */

export const PRIORITY_COUNTRIES = [
  "India",
  "United States",
  "France",
  "United Kingdom",
  "Germany",
  "Switzerland",
  "United Arab Emirates",
  "Japan",
  "Singapore",
  "China",
] as const;

export const COUNTRIES: string[] = [
  "Afghanistan", "Albania", "Algeria", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Bahrain", "Bangladesh", "Belarus", "Belgium", "Bolivia", "Bosnia and Herzegovina",
  "Brazil", "Bulgaria", "Cambodia", "Cameroon", "Canada", "Chile", "China", "Colombia",
  "Costa Rica", "Croatia", "Cyprus", "Czechia", "Denmark", "Dominican Republic", "Ecuador",
  "Egypt", "Estonia", "Ethiopia", "Finland", "France", "Georgia", "Germany", "Ghana", "Greece",
  "Guatemala", "Hong Kong SAR", "Hungary", "Iceland", "India", "Indonesia", "Iraq", "Ireland",
  "Israel", "Italy", "Ivory Coast", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Latvia",
  "Lebanon", "Lithuania", "Luxembourg", "Madagascar", "Malaysia", "Maldives", "Malta", "Mauritius",
  "Mexico", "Moldova", "Mongolia", "Morocco", "Myanmar", "Nepal", "Netherlands", "New Zealand",
  "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Panama", "Peru", "Philippines",
  "Poland", "Portugal", "Qatar", "Romania", "Russia", "Saudi Arabia", "Senegal", "Serbia",
  "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka",
  "Sweden", "Switzerland", "Taiwan", "Tanzania", "Thailand", "Tunisia", "Türkiye", "Uganda",
  "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
  "Vietnam", "Zimbabwe",
];

/** Priority markets first, then everything else, de-duplicated. */
export const COUNTRY_OPTIONS: { group: string; options: string[] }[] = [
  { group: "Frequent markets", options: [...PRIORITY_COUNTRIES] },
  {
    group: "All countries",
    options: COUNTRIES.filter(
      (c) => !(PRIORITY_COUNTRIES as readonly string[]).includes(c),
    ),
  },
];
