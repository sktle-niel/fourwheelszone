// ── Photography (full-bleed parallax backgrounds, warm near-monochrome)
export const photos = {
  hero: "/photos/mechanic-ratchet.jpg",
  craft: "/photos/engine-bay.jpg",
  oil: "/photos/oil-pour.jpg",
  rims: "/photos/rims.jpg",
  wheel: "/photos/wheel-graphic.jpg",
}

// ── Vehicles we service — real photos, kept in full colour.
// Source + license for each file: public/cars/CREDITS.txt
export const cars = [
  { make: "Toyota", model: "Vios", type: "Sedan", img: "/cars/vios.jpg" },
  { make: "Toyota", model: "Hilux", type: "Pickup", img: "/cars/hilux.jpg" },
  { make: "Toyota", model: "Fortuner", type: "SUV", img: "/cars/fortuner.jpg" },
  { make: "Mitsubishi", model: "Montero Sport", type: "SUV", img: "/cars/montero.jpg" },
  { make: "Ford", model: "Ranger", type: "Pickup", img: "/cars/ranger.jpg" },
  { make: "Toyota", model: "Innova", type: "MPV", img: "/cars/innova.jpg" },
]

// Reviews are loaded live from the API (see src/lib/reviewsApi.js) — no seed
// data lives in the frontend anymore.

// ── Core services (numbered, editorial)
export const services = [
  {
    n: "01",
    title: "Brakes",
    desc: "Pads, rotors and calipers inspected and replaced so you stop with confidence.",
    tags: ["Pads", "Rotors", "Calipers"],
    img: "/photos/rims.jpg",
  },
  {
    n: "02",
    title: "Oil Change",
    desc: "Fresh engine oil and filters to keep the heart of your car clean and strong.",
    tags: ["Engine oil", "Filters", "Flush"],
    img: "/photos/oil-pour.jpg",
  },
  {
    n: "03",
    title: "Tires & Batteries",
    desc: "Fitting, balancing and alignment, plus reliable batteries that start every time.",
    tags: ["Alignment", "Balancing", "Battery"],
    img: "/photos/wheel-graphic.jpg",
  },
  {
    n: "04",
    title: "Suspension",
    desc: "Shocks, struts and steering tuned for a ride that stays smooth and safe.",
    tags: ["Shocks", "Struts", "Steering"],
    img: "/photos/engine-bay.jpg",
  },
  {
    n: "05",
    title: "Maintenance",
    desc: "Scheduled PMS and check-ups that keep every vehicle in its best condition.",
    tags: ["PMS", "Check-up", "Tune-up"],
    img: "/photos/mechanic-ratchet.jpg",
  },
  {
    n: "06",
    title: "Diagnostics",
    desc: "Full computerized scanning to find the root of the problem, fast and precise.",
    tags: ["Scan", "Electrical", "Engine"],
    img: "/photos/engine-bay.jpg",
  },
]

// ── Full capability list, grouped into clusters
export const capabilities = [
  {
    group: "Engine & Drivetrain",
    items: [
      "Engine diagnostic services",
      "Engine cleaning",
      "Transmission repair",
      "Suspension & steering",
    ],
  },
  {
    group: "Electrical & Climate",
    items: [
      "Electrical system repairs",
      "Heating & air-conditioning",
      "Lights & fluids",
    ],
  },
  {
    group: "Safety & Body",
    items: [
      "Brake repair & inspection",
      "Body shop & welding",
      "Vehicle health checks",
    ],
  },
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
    interval: "80,000-100,000 km",
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

export const site = {
  name: "Four Wheels Zone",
  tagline: "Alagang Casa",
  slogan: "Repair · Service · Trusted",
  facebook: "https://www.facebook.com/profile.php?id=61590429990361",
  branchName: "Tagburos, Palawan",
  address:
    "Purok Silangan, Zone 2, Barangay Tagburos, Puerto Princesa City, Palawan",
  email: "marklouie_are_ph@yahoo.com",
  phones: [
    { label: "Globe", number: "0936 951 0201", href: "tel:09369510201" },
  ],
  mapEmbed:
    "https://www.google.com/maps?q=Tagburos,+Puerto+Princesa+City,+Palawan&output=embed",
  mapLink:
    "https://www.google.com/maps/search/?api=1&query=Tagburos+Puerto+Princesa+City+Palawan",
}

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Vehicles", href: "#vehicles" },
  { label: "Maintenance", href: "#maintenance" },
  { label: "Visit", href: "#visit" },
]
