import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, X } from "lucide-react";
import { capitalizeWords } from "@/utils/capitaliseWords";
import { getCategoryPlaceholder } from "@/utils/placeholders";
import { getBadgeConfig } from "@/utils/getBadgeLable.js";
import { useCartStore } from "@/store/cart.store";

export function ProductCard({ product, categoryName }) {
  const { addItem, removeItem, getItemQuantity } = useCartStore();
  const [showVariants, setShowVariants] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const placeholder = getCategoryPlaceholder(categoryName);

  const hasVariants = product.variants && product.variants.length > 0;
  const quantity = getItemQuantity(product.id, selectedVariant?.size);

  const badge = product.badge ? getBadgeConfig(product.badge) : null;

  const displayPrice = hasVariants
    ? (selectedVariant ? selectedVariant.price : Math.min(...product.variants.map(v => v.price)))
    : product.price;

  const handleActionClick = () => {
    if (hasVariants && !selectedVariant) {
      setShowVariants(true);
    } else {
      addItem(product, selectedVariant);
    }
  };

  const handleDecrement = () => {
    const cartItemId = selectedVariant ? `${product.id}-${selectedVariant.size}` : product.id;
    removeItem(cartItemId);
    if (quantity === 1) setSelectedVariant(null);
  };

  return (
    <div className="product-card-container group relative flex flex-col bg-zinc-950 rounded-2xl lg:rounded-4xl border border-white/10 overflow-hidden transition-all duration-700 hover:border-white/20 h-full">

      <div className="relative aspect-4/3 sm:aspect-square overflow-hidden">
        <img
          src={product.image ? product.image : placeholder}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

        {badge && (
          <div className="absolute top-3 left-3 sm:top-6 sm:left-6 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
            <badge.icon size={11} className={badge.color} />
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white/90">
              {product.badge}
            </span>
          </div>
        )}

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
      </div>

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
                className="w-full h-11 sm:h-16 rounded-xl sm:rounded-2xl bg-red-600 text-white font-bold uppercase text-xs sm:text-sm flex items-center justify-center hover:bg-red-700"
              >
                {hasVariants ? "Choose" : "Add"}
              </motion.button>
            ) : (
              <motion.div
                key="quantity"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-between h-11 sm:h-16 px-2 lg:px-3 rounded-xl sm:rounded-2xl bg-zinc-900/50 border border-white/5"
              >
                <button
                  onClick={handleDecrement}
                  className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg sm:rounded-xl bg-zinc-800 hover:bg-red-600 text-white"
                >
                  <Minus size={14} />
                </button>
                <span className="text-sm sm:text-xl font-serif tabular-nums text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => addItem(product, selectedVariant)}
                  className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg sm:rounded-xl bg-zinc-800 hover:bg-red-600 text-white"
                >
                  <Plus size={14} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {showVariants && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}

            className="absolute inset-0 bg-zinc-950/98 backdrop-blur-2xl p-4 sm:p-6 flex flex-col z-30"
          >
            <div className="flex justify-between items-center mb-4 sm:mb-8">
              <p className="text-zinc-500 text-[9px] sm:text-[10px] uppercase tracking-[0.3em] font-black">
                Select Size
              </p>
              <button
                onClick={() => setShowVariants(false)}
                className="p-2 -mr-2 text-zinc-500 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>


            <div className="space-y-2 overflow-y-auto flex-1 pr-1 custom-scrollbar">
              {product.variants.map(v => (
                <button
                  key={v.size}
                  onClick={() => {
                    setSelectedVariant(v);
                    setShowVariants(false);
                    addItem(product, v);
                  }}
                  className="w-full flex justify-between items-center p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-white/5 bg-white/2 hover:border-red-600/50 hover:bg-red-900/10 transition-all group/btn"
                >
                  <span className="text-white font-serif italic text-base sm:text-xl group-hover/btn:text-red-500">
                    {v.size}
                  </span>
                  <span className="text-zinc-400 font-bold tracking-wider text-xs sm:text-sm">
                    ₹{v.price}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}