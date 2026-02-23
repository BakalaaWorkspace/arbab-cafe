import { useState } from "react"
import { CategoryNav } from "./category-nav";
import { ProductGrid } from "./product-grid";

export function MenuSection() {
    const [selectedCategory, setSelectedCategory] = useState("639e49fc-0b41-4930-b04b-ee1b29965225")

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