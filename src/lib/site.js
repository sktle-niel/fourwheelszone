import {
  Disc3,
  Droplets,
  CircleGauge,
  Wrench,
  CalendarCheck,
  Stethoscope,
  BatteryCharging,
  Zap,
  Snowflake,
  Cog,
  Car,
  Gauge,
  Fuel,
  Sparkles,
  ShieldCheck,
  Hammer,
} from "lucide-react"

// Pangunahing serbisyo (mula sa banner)
export const coreServices = [
  {
    icon: Disc3,
    title: "Brakes",
    desc: "Brake pad, rotor, at caliper service para sigurado ang preno mo sa kalsada.",
  },
  {
    icon: Droplets,
    title: "Oil Change",
    desc: "Fresh engine oil at filter replacement para malinis at malakas ang makina.",
  },
  {
    icon: CircleGauge,
    title: "Tires & Batteries",
    desc: "Tire fitting, balancing, alignment, at bagong baterya na panalo.",
  },
  {
    icon: Cog,
    title: "Suspension",
    desc: "Shocks, struts, at steering repair para smooth at ligtas ang biyahe.",
  },
  {
    icon: CalendarCheck,
    title: "Maintenance",
    desc: "Regular na PMS at check-up para laging nasa best condition ang sasakyan.",
  },
  {
    icon: Stethoscope,
    title: "Car Diagnostic",
    desc: "Full computerized scanning para mahanap agad ang ugat ng problema.",
  },
]

// Buong listahan ng auto repair services
export const repairList = [
  "Oil Change",
  "Brake Repair & Inspection",
  "Tire Services",
  "Battery Services",
  "Electrical System Repairs",
  "Heating & Air Conditioning (A/C)",
  "Engine Diagnostic Services",
  "Suspension & Steering Repairs",
  "Transmission Repair",
  "Body Shop & Welding",
  "Lights & Fluids",
  "Engine Cleaning",
]

// Specialized / affordable services na may interval
export const specializedServices = [
  {
    icon: ShieldCheck,
    title: "PMS",
    subtitle: "Preventive / Periodic Maintenance Service",
    interval: "Every 10,000 km run",
  },
  {
    icon: Snowflake,
    title: "Cooling System Restoration",
    subtitle: "Para hindi mag-overheat ang makina",
    interval: "Every 2 years (5 years kung brand new)",
  },
  {
    icon: Gauge,
    title: "Turbo System Cleaning",
    subtitle: "Panatilihin ang lakas ng turbo",
    interval: "Every 80,000 – 100,000 km & up",
  },
  {
    icon: Car,
    title: "Under Chassis",
    subtitle: "Inspeksyon ng ilalim ng sasakyan",
    interval: "Upon check-up",
  },
  {
    icon: Droplets,
    title: "ATF Dialysis",
    subtitle: "Automatic Transmission Fluid",
    interval: "Every 80,000 km run",
  },
  {
    icon: Stethoscope,
    title: "Full System Diagnostic Scanning",
    subtitle: "Computerized na pag-scan ng buong sistema",
    interval: "Upon check-up",
  },
  {
    icon: Fuel,
    title: "EGR System Cleaning",
    subtitle: "Exhaust Gas Recirculation",
    interval: "Every 50,000 km run",
  },
]

export const capabilities = [
  { icon: Stethoscope, label: "Vehicle Health Checks" },
  { icon: CalendarCheck, label: "Servicing & MOT" },
  { icon: CircleGauge, label: "Tires & Wheels" },
  { icon: Cog, label: "Diagnostics" },
  { icon: Hammer, label: "Body Shop" },
  { icon: Zap, label: "Welding" },
  { icon: Snowflake, label: "Air-con Service" },
  { icon: BatteryCharging, label: "Battery & Electrical" },
  { icon: Sparkles, label: "Engine Clean" },
  { icon: Wrench, label: "General Repairs" },
]

export const whyChooseUs = [
  {
    icon: ShieldCheck,
    title: "Alagang Casa",
    desc: "Tratuhin namin ang sasakyan mo na parang sa amin — maingat at maaasahan.",
  },
  {
    icon: Wrench,
    title: "Skilled Mechanics",
    desc: "Sanay at de-kalidad na mga mekaniko para sa lahat ng klaseng sasakyan.",
  },
  {
    icon: Stethoscope,
    title: "Modern Diagnostics",
    desc: "Computerized scanning tools para tama agad ang diagnosis at solusyon.",
  },
  {
    icon: Sparkles,
    title: "Affordable & Trusted",
    desc: "Sulit na presyo, transparent na serbisyo. Repair · Service · Trusted.",
  },
]

export const stats = [
  { value: 7, suffix: "+", label: "Years Serving Palawan" },
  { value: 20, suffix: "+", label: "Services Offered" },
  { value: 2000, suffix: "+", label: "Vehicles Repaired" },
]

export const site = {
  name: "Four Wheels Zone",
  tagline: "Alagang Casa",
  slogan: "Repair · Service · Trusted",
  facebook: "https://www.facebook.com/profile.php?id=61590429990361",
  branchName: "Palawan Branch — Tagburos",
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
  { label: "Specials", href: "#specials" },
  { label: "Why Us", href: "#why" },
  { label: "Location", href: "#location" },
  { label: "Book Now", href: "#book" },
]
