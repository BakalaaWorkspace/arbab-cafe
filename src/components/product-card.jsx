import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ShoppingCart, Flame, Star, Leaf, Info } from "lucide-react";
import { cn } from "@/lib/utils";

function getBadgeConfig(badge) {
  const configs = {
    "Best Seller": { icon: Flame, color: "text-orange-500", bg: "bg-orange-950/80", border: "border-orange-500/50" },
    "Cheesiest": { icon: Star, color: "text-yellow-500", bg: "bg-yellow-950/80", border: "border-yellow-500/50" },
    "Veg": { icon: Leaf, color: "text-green-500", bg: "bg-green-950/80", border: "border-green-500/50" },
    "Spicy": { icon: Flame, color: "text-red-500", bg: "bg-red-950/80", border: "border-red-500/50" },
  };
  return configs[badge] || { icon: Info, color: "text-zinc-400", bg: "bg-zinc-900/90", border: "border-zinc-700" };
}

export function ProductCard({ product, index }) {
  const [quantity, setQuantity] = useState(0);
  const badge = product.badge ? getBadgeConfig(product.badge) : null;
  const isVariable = product.hasVariants || false; 

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative flex flex-col bg-zinc-900/40 rounded-[2.5rem] border border-white/5 overflow-hidden transition-all duration-500 hover:border-red-600/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
    >
      {/* Image Container */}
      <div className="relative aspect-[1/1.1] overflow-hidden m-3 rounded-[2rem]">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Stronger Gradient Overlay for visibility on light images */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/40 opacity-70 group-hover:opacity-80 transition-opacity" />

        {/* Floating Badge - Now high contrast with solid-ish background */}
        {badge && (
          <div className={cn(
            "absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md border text-[10px] font-black uppercase tracking-[0.15em] shadow-xl",
            badge.bg, badge.color, badge.border
          )}>
            <badge.icon size={12} className="fill-current" />
            {product.badge}
          </div>
        )}

        {/* Price Tag - Now on a dark "plate" for 100% visibility */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-10">
          <div className="bg-zinc-950/90 border border-white/10 backdrop-blur-md px-4 py-2 rounded-2xl shadow-2xl">
            <p className="text-[9px] text-zinc-500 uppercase font-black tracking-tighter leading-none mb-0.5">
              {isVariable ? "Starting at" : "Price"}
            </p>
            <p className="text-xl font-serif text-white italic leading-none">
              ₹{product.price}{isVariable && "+"}
            </p>
          </div>
          
          {isVariable && (
            <div className="px-3 py-1.5 rounded-xl bg-red-600 text-white text-[9px] font-black uppercase tracking-widest shadow-lg shadow-red-600/20 border border-red-500">
              Select Size
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-6 flex flex-col flex-grow justify-between">
        <div className="mb-4">
          {/* Title - Fixed to White on Hover */}
          <h3 className="text-xl font-serif text-white transition-colors duration-300">
            {product.name}
          </h3>
          <div className="h-0.5 w-8 bg-red-600/60 mt-2 transition-all duration-500 group-hover:w-full group-hover:bg-red-600" />
        </div>

        {/* Action Layer */}
        <div className="relative h-14 overflow-hidden rounded-2xl bg-zinc-800/40 border border-white/5 backdrop-blur-sm">
          <AnimatePresence mode="wait">
            {quantity === 0 ? (
              <motion.button
                key="add"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                onClick={() => setQuantity(1)}
                className="w-full h-full flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-zinc-100 hover:bg-red-600 transition-all duration-300 group/btn"
              >
                <ShoppingCart size={16} className="transition-transform group-hover/btn:-rotate-12" />
                Add to Cart
              </motion.button>
            ) : (
              <motion.div
                key="quantity"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                className="flex items-center justify-between h-full px-3"
              >
                <button
                  onClick={() => setQuantity(q => q - 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-900 border border-white/5 text-red-500 hover:bg-red-600 hover:text-white transition-all shadow-lg"
                >
                  <Minus size={18} />
                </button>
                <span className="text-base font-black text-white tabular-nums tracking-widest">
                  {quantity.toString().padStart(2, '0')}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-900 border border-white/5 text-red-500 hover:bg-red-600 hover:text-white transition-all shadow-lg"
                >
                  <Plus size={18} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}