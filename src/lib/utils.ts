import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Quita emojis de un texto para mostrarlo ("Home Office 🏠" → "Home Office"); los datos se quedan igual. */
export const sinEmoji = (s: string) => s.replace(/\s*[\p{Extended_Pictographic}\u{FE0F}]/gu, "").trim();
