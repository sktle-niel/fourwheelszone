// ── Photography (used full-bleed as parallax backgrounds, rendered monochrome)
export const photos = {
  hero: "/photos/mechanic-ratchet.jpg",
  craft: "/photos/engine-bay.jpg",
  oil: "/photos/oil-pour.jpg",
  rims: "/photos/rims.jpg",
  wheel: "/photos/wheel-graphic.jpg",
}

// ── Core services (numbered, editorial)
export const services = [
  {
    n: "01",
    title: "Brakes",
    desc: "Pads, rotors and calipers inspected and replaced so you stop with confidence.",
    tags: ["Pads", "Rotors", "Calipers"],
  },
  {
    n: "02",
    title: "Oil Change",
    desc: "Fresh engine oil and filters to keep the heart of your car clean and strong.",
    tags: ["Engine oil", "Filters", "Flush"],
  },
  {
    n: "03",
    title: "Tires & Batteries",
    desc: "Fitting, balancing and alignment, plus reliable batteries that start every time.",
    tags: ["Alignment", "Balancing", "Battery"],
  },
  {
    n: "04",
    title: "Suspension",
    desc: "Shocks, struts and steering tuned for a ride that stays smooth and safe.",
    tags: ["Shocks", "Struts", "Steering"],
  },
  {
    n: "05",
    title: "Maintenance",
    desc: "Scheduled PMS and check-ups that keep every vehicle in its best condition.",
    tags: ["PMS", "Check-up", "Tune-up"],
  },
  {
    n: "06",
    title: "Diagnostics",
    desc: "Full computerized scanning to find the root of the problem — fast and precise.",
    tags: ["Scan", "Electrical", "Engine"],
  },
]

// ── Full capability list
export const capabilities = [
  "Brake repair & inspection",
  "Electrical system repairs",
  "Heating & air-conditioning",
  "Engine diagnostic services",
  "Suspension & steering",
  "Transmission repair",
  "Body shop & welding",
  "Lights & fluids",
  "Engine cleaning",
  "Vehicle health checks",
]

// ── Specialized maintenance with intervals
export const maintenance = [
  {
    title: "PMS",
    sub: "Preventive / Periodic Maintenance Service",
    interval: "Every 10,000 km",
  },
  {
    title: "Cooling System Restoration",
    sub: "Keeps the engine from overheating",
    interval: "Every 2 years",
  },
  {
    title: "Turbo System Cleaning",
    sub: "Maintains turbo performance",
    interval: "80,000–100,000 km",
  },
  {
    title: "Under Chassis",
    sub: "Inspection of the vehicle underbody",
    interval: "Upon check-up",
  },
  {
    title: "ATF Dialysis",
    sub: "Automatic Transmission Fluid service",
    interval: "Every 80,000 km",
  },
  {
    title: "Full Diagnostic Scanning",
    sub: "Computerized full-system scan",
    interval: "Upon check-up",
  },
  {
    title: "EGR System Cleaning",
    sub: "Exhaust Gas Recirculation",
    interval: "Every 50,000 km",
  },
]

export const stats = [
  { value: "07", label: "Years serving Palawan" },
  { value: "20", label: "Services offered" },
  { value: "2K", label: "Vehicles repaired" },
]

export const site = {
  name: "Four Wheels Zone",
  tagline: "Alagang Casa",
  slogan: "Repair · Service · Trusted",
  facebook: "https://www.facebook.com/profile.php?id=61590429990361",
  branchName: "Palawan — Tagburos",
  address:
    "Purok Silangan, Zone 2, Barangay Tagburos, Puerto Princesa City, Palawan",
  phones: [
    { label: "Globe", number: "0916 277 6321", href: "tel:09162776321" },
    { label: "Smart", number: "0969 241 2152", href: "tel:09692412152" },
  ],
  mapEmbed:
    "https://www.google.com/maps?q=Tagburos,+Puerto+Princesa+City,+Palawan&output=embed",
  mapLink:
    "https://www.google.com/maps/search/?api=1&query=Tagburos+Puerto+Princesa+City+Palawan",
}

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Maintenance", href: "#maintenance" },
  { label: "Workshop", href: "#workshop" },
  { label: "Visit", href: "#visit" },
]
