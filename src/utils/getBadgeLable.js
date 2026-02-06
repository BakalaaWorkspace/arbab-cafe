import { Flame, Info, Drumstick, Sandwich, LeafyGreen } from "lucide-react";

export function getBadgeConfig(badge) {
  const configs = {
    "best seller": { icon: Flame, color: "text-orange-400" },
    "cheesy": { icon: Sandwich, color: "text-yellow-400" },
    "veg": { icon: LeafyGreen, color: "text-green-400" },
    "non-veg": { icon: Drumstick, color: "text-red-400" },
    "spicy": { icon: Flame, color: "text-red-500" },
  };
  return configs[badge] || { icon: Info, color: "text-zinc-400" };
}