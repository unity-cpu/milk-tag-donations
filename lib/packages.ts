export const PACKAGES = {
  basic: {
    id: "basic",
    name: "Basic Package",
    price: 500, // $5.00 in cents
    description: "Donator Stick + 5 cosmetics of your choice",
    features: [
      "Donator Stick",
      "5 Cosmetics of your choice",
    ],
  },
  plus: {
    id: "plus",
    name: "Plus Package",
    price: 1000, // $10.00 in cents
    description: "Donator Stick + I add you back + 10 cosmetics of your choice",
    features: [
      "Donator Stick",
      "I add you back ;)",
      "10 Cosmetics of your choice",
    ],
  },
  full: {
    id: "full",
    name: "Full Package",
    price: 2000, // $20.00 in cents
    description: "Every cosmetic in the game + I add you back",
    features: [
      "Every cosmetic in the game",
      "I add you back ;)",
    ],
  },
} as const;

export type PackageId = keyof typeof PACKAGES;
