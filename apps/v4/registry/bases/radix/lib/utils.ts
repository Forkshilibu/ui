import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      color: [
        "c-content",
        "c-content-disabled",
        "c-contrast",
        "c-focus",
        "c-alart",
        "btn-orange-a",
        "btn-orange-b",
        "btn-orange-pressed-a",
        "btn-orange-pressed-b",
        "btn-gray",
        "btn-gray-pressed",
        "btn-gray-disabled",
        "btn-gray-stroke",
        "btn-link",
        "btn-link-pressed",
      ],
      text: ["label-lg", "label-md", "label-sm"],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
