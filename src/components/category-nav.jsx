import React, { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", name: "All Dishes" }, // Added an 'All' for better UX
  { id: "pizza", name: "Pizza" },
  { id: "burger", name: "Burgers" },
  { id: "sandwich", name: "Sandwiches" },
  { id: "pasta", name: "Pasta" },
  { id: "desserts", name: "Desserts" },
];

export function CategoryNav({ selectedCategory, onSelectCategory }) {
  return (
    <section className="py-12 sm:py-20 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Section Header - Bridging the Hero Design */}
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-red-600 font-bold uppercase tracking-[0.3em] text-[10px]"
          >
            Selection
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif text-white"
          >
            Browse our <span className="italic text-zinc-500 font-light">Menu</span>
          </motion.h2>
          <div className="h-[1px] w-20 bg-red-600/30 mt-4" />
        </div>

        {/* Category Navigation */}
        <div className="relative flex justify-center">
          <div className="relative flex items-center p-1.5 bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-[2rem] overflow-x-auto no-scrollbar max-w-full">
            {categories.map((category) => {
              const isSelected = selectedCategory === category.id;
              
              return (
                <button
                  key={category.id}
                  onClick={() => onSelectCategory(category.id)}
                  className={cn(
                    "relative flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest transition-colors duration-300 whitespace-nowrap z-10",
                    isSelected ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                  )}
                >
                  {/* The Sliding Background Effect */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute inset-0 bg-red-600 rounded-full -z-10 shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  <span className="relative">
                    {category.name}
                    {/* Tiny dot for visual interest if selected */}
                    {isSelected && (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -right-2 top-0 w-1 h-1 bg-white rounded-full"
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}