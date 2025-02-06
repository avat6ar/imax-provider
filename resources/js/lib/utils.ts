import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function asset(path: string) {
  return new URL(path, import.meta.env.VITE_APP_URL).href;
}

export const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  const binary = Buffer.from(buffer).toString("base64");
  return `data:image/jpeg;base64,${binary}`;
};
