import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ProductCard } from "@/components/product-card";
import menu from "@/assets/data/menu.json";

export function ProductGrid({ category }) {
  const gridRef = useRef(null);

  const categoryData = menu.categories.find(c => c.id === category);
  const items = categoryData?.products ?? [];

  useLayoutEffect(() => {
    if (!gridRef.current || items.length === 0) return;

    const cards = gridRef.current.querySelectorAll(".product-card-container");

    // FULL reset — no memory, no progress
    gsap.killTweensOf(cards);
    gsap.set(cards, {
      clearProps: "all",
      opacity: 0,
      y: 30
    });

    // Click-triggered stagger
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.45,
      ease: "power2.out",
      stagger: {
        each: 0.08,
        from: "start"
      }
    });
  }, [category, items.length]);

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-2 gap-3 sm:gap-4 sm:px-4 lg:grid-cols-4 lg:gap-5 lg:px-2 xl:gap-6 xl:px-4"
    >
      {items.map(product => (
        <ProductCard
          key={`${category}-${product.id}`}
          product={product}
        />
      ))}
    </div>
  );
}
