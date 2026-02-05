import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Flame, Info, X, Drumstick, Sandwich, LeafyGreen } from "lucide-react";
import { capitalizeWords } from "@/utils/capitaliseWords";

// 1. Import the placeholder image from your assets folder
// Note: Ensure the file extension (.png, .jpg, etc.) matches your actual file
import burgerPlaceholder from "@/assets/images/burger/placeholder.jpg"; 

function getBadgeConfig(badge) {
  const configs = {
    "best seller": { icon: Flame, color: "text-orange-400" },
    "cheesy": { icon: Sandwich, color: "text-yellow-400" },
    "veg": { icon: LeafyGreen, color: "text-green-400" },
    "non-veg": { icon: Drumstick, color: "text-red-400" },
    "spicy": { icon: Flame, color: "text-red-500" },
  };
  return configs[badge] || { icon: Info, color: "text-zinc-400" };
}

export function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(0);
  const [showVariants, setShowVariants] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);

  const badge = product.badge ? getBadgeConfig(product.badge) : null;
  const hasVariants = product.variants && product.variants.length > 0;

  const displayPrice = hasVariants
    ? (selectedVariant ? selectedVariant.price : Math.min(...product.variants.map(v => v.price)))
    : product.price;

  const handleActionClick = () => {
    if (hasVariants && !selectedVariant) {
      setShowVariants(true);
    } else {
      setQuantity(1);
    }
  };

  return (
    <div className="product-card-container group relative flex flex-col bg-zinc-950 rounded-2xl lg:rounded-4xl border border-white/10 overflow-hidden transition-all duration-700 hover:border-white/20 h-full">

      {/* Image Section */}
      <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden">
        <img
          // 2. Use the imported placeholder if product.image is null or undefined
          src={product.image || burgerPlaceholder}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
        
        {/* ... rest of your code remains the same ... */}
        {badge && (
          <div className="absolute top-3 left-3 sm:top-6 sm:left-6 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
            <badge.icon size={11} className={badge.color} />
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white/90">
              {product.badge}
            </span>
          </div>
        )}

        {/* Price */}
        <div className="absolute bottom-3 left-3 right-3 z-10">
          <div className="flex flex-col">
            {hasVariants && !selectedVariant && (
              <span className="text-[9px] sm:text-[10px] text-zinc-400 uppercase tracking-[0.2em] font-black">
                Starting from
              </span>
            )}
            {selectedVariant && (
              <span className="text-[9px] sm:text-[10px] text-red-500 uppercase tracking-[0.2em] font-black">
                {selectedVariant.size}
              </span>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-3xl font-serif italic text-white">
                ₹{displayPrice}
              </span>
              {hasVariants && !selectedVariant && (
                <span className="text-zinc-400 text-xs sm:text-sm font-serif">+</span>
              )}
            </div>
          </div>
        </div>

        {/* Variants Overlay */}
        <AnimatePresence>
          {showVariants && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-zinc-950/95 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-center z-20"
            >
              <button
                onClick={() => setShowVariants(false)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-zinc-500 hover:text-white"
              >
                <X size={20} />
              </button>

              <p className="text-zinc-500 text-[9px] sm:text-[10px] uppercase tracking-[0.3em] font-black mb-4 sm:mb-6 text-center">
                Select your size
              </p>

              <div className="space-y-2 sm:space-y-3">
                {product.variants.map(v => (
                  <button
                    key={v.size}
                    onClick={() => {
                      setSelectedVariant(v);
                      setShowVariants(false);
                      setQuantity(1);
                    }}
                    className="w-full flex justify-between items-center p-4 sm:p-5 rounded-2xl border border-white/5 hover:border-red-900 hover:bg-red-900/10"
                  >
                    <span className="text-white font-serif italic text-lg sm:text-xl">
                      {v.size}
                    </span>
                    <span className="text-zinc-400 font-bold tracking-wider">
                      ₹{v.price}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content Section */}
      <div className="p-3 sm:p-4 pt-2 flex flex-col grow">
        <h3 className="text-sm sm:text-2xl font-serif text-white leading-snug mb-3">
          {capitalizeWords(product.name)}
        </h3>

        <div className="mt-auto">
          <AnimatePresence mode="wait">
            {quantity === 0 ? (
              <motion.button
                key="add"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                onClick={handleActionClick}
                className="w-full h-11 sm:h-16 rounded-xl sm:rounded-2xl bg-red-900 text-white font-bold uppercase text-sm sm:text-md flex items-center justify-center hover:bg-red-950"
              >
                {hasVariants ? "Choose" : "Add"}
              </motion.button>
            ) : (
              <motion.div
                key="quantity"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-between h-12 sm:h-16 px-2 lg:px-3 rounded-xl sm:rounded-2xl bg-zinc-900/50 border border-white/5"
              >
                <button
                  onClick={() => {
                    if (quantity === 1) setSelectedVariant(null);
                    setQuantity(q => Math.max(0, q - 1));
                  }}
                  className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg sm:rounded-xl bg-zinc-800 hover:bg-red-900"
                >
                  <Minus size={16} />
                </button>

                <span className="text-lg sm:text-xl font-serif tabular-nums">
                  {quantity}
                </span>

                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg sm:rounded-xl bg-zinc-800 hover:bg-red-900"
                >
                  <Plus size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}