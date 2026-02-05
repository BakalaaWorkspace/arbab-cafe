import { useState } from "react"
import { CategoryNav } from "./category-nav";
import { ProductGrid } from "./product-grid";

export function MenuSection() {
    const [selectedCategory, setSelectedCategory] = useState("959f8159-d256-4ead-a213-a840c8880399")

    return (
        <section
            id="menu"
            className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-24 py-12">
            <CategoryNav
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />
            <ProductGrid category={selectedCategory} />
        </section>
    );
}