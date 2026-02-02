import { useState } from "react"
import { CategoryNav } from "./category-nav";
import { ProductGrid } from "./product-grid";

export function MenuSection() {
    const [selectedCategory, setSelectedCategory] = useState("pizza")

    return (
        <section
            id="menu"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* <div className="text-center mb-12">
                <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground tracking-tight text-balance">
                    Our Menu
                </h2>
                <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
                    Crafted with passion, served with love
                </p>
            </div> */}

            <CategoryNav
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />

            <ProductGrid category={selectedCategory} />
        </section>
    );
}