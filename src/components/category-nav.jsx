import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import menu from "@/assets/data/menu.json";

export function CategoryNav({ selectedCategory, onSelectCategory }) {
  const categories = menu.categories;
  const scrollRef = useRef(null);
  
  // Logic for "Hold and Move" (Drag to scroll)
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-2">
        
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif text-white"
          >
            Browse our <span className="text-zinc-500 font-light">Menu</span>
          </motion.h2>
          <div className="h-1 rounded-2xl w-64 bg-red-600/30" />
        </div>

        <div className="relative flex justify-center">
          <div 
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={cn(
              "relative flex items-center p-1.5 bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-4xl overflow-x-auto no-scrollbar max-w-full select-none",
              isDragging ? "cursor-grabbing" : "cursor-grab"
            )}
          >
            {categories.map((category) => {
              const isSelected = selectedCategory === category.id;
              
              return (
                <button
                  key={category.id}
                  onClick={() => onSelectCategory(category.id)}
                  // pointer-events-none prevents the button from intercepting the drag
                  className={cn(
                    "relative flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest transition-colors duration-300 whitespace-nowrap z-10",
                    isSelected ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                  )}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute inset-0 bg-red-600 rounded-full -z-10 shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  <span className="relative pointer-events-none">
                    {category.name}
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