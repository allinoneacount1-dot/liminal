import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SITE_CONFIG = {
  name: "LIMINAL",
  tagline: "Cross the Threshold",
  description: "Power Hidden in Silence. The intelligence layer of Web3.",
  url: "https://liminal.io",
} as const;

export const NAV_ITEMS = [
  { label: "INTELLIGENCE", href: "#intelligence" },
  { label: "INFRASTRUCTURE", href: "#infrastructure" },
  { label: "SECURITY", href: "#security" },
  { label: "WEALTH", href: "#wealth" },
  { label: "RESOURCES", href: "#resources" },
  { label: "ACCESS", href: "#access" },
] as const;

export const COLORS = {
  void: "#050505",
  deep: "#0a0a0f",
  surface: "#111118",
  border: "#1a1a24",
  muted: "#6b6b80",
  text: "#e4e4ef",
  cyan: "#00D4FF",
  violet: "#7B2FFF",
  accent: "#FF3366",
} as const;
