import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
   <section className="relative min-h-[90vh] lg:min-h-screen overflow-hidden bg-zinc-950 flex items-center px-4 sm:px-6 sm:pt-28 lg:pt-0">

      {/* Background Polish */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-red-900/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-360 w-full py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="flex-[1.2] text-center lg:text-left space-y-6 sm:space-y-8">
          
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[2.8rem] sm:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] text-white font-serif leading-[1.1] lg:leading-[0.95] tracking-tight"
            >
              <span className="block md:whitespace-nowrap">Where every <span className="text-zinc-500 italic font-light">bite</span></span>
              <span className="block md:whitespace-nowrap">
                tells a <span className="relative inline-block">
                  story
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 20" fill="none">
                   <path d="M5 15Q150 5 295 15" stroke="#dc2626" strokeWidth="4" strokeLinecap="round"/>
                </svg>
                </span>
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-[0.8rem] sm:text-lg lg:text-xl text-zinc-400 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed"
            >
              Experience a symphony of flavors where traditional heritage meets 
              modern culinary innovation. Prepared daily with hand-picked ingredients.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <Button
                onClick={scrollToMenu}
                className="w-full sm:w-auto h-14 sm:h-16 px-10 rounded-full bg-red-600 text-white hover:bg-red-700 hover:scale-105 transition-all duration-300 group shadow-[0_0_20px_rgba(220,38,38,0.3)]"
              >
                <span className="flex items-center font-bold uppercase tracking-widest text-xs sm:text-sm">
                  Explore Menu
                  <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-2" />
                </span>
              </Button>
            </motion.div>
          </div>

          {/* Right Content - Soft & Organic Composition */}

<div className="hidden md:landscape:block lg:block flex-1 relative w-full mt-12 lg:mt-0 px-4 sm:px-0">

            <div className="relative max-w-125 mx-auto lg:ml-auto lg:mr-0">
              
              {/* Main Image with Soft Corners */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="relative z-10 aspect-4/5 overflow-hidden rounded-4xl sm:rounded-[3rem] border border-white/10 shadow-2xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&fit=crop"
                  alt="Signature Dish"
                  className="h-full w-full object-cover"
                />
                {/* Subtle Overlay for depth */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
              </motion.div>

              {/* Floating Element 2 - Secondary Image */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute -bottom-8 -left-8 sm:-left-16 z-20 w-32 sm:w-48 aspect-square overflow-hidden rounded-3xl sm:rounded-[2.5rem] border-8 border-zinc-950 shadow-2xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&fit=crop"
                  alt="Pasta"
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}