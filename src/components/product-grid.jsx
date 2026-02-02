import { ProductCard } from "@/components/product-card"

const products = {
  pizza: [
    { id: 1, name: "Margherita Classic", description: "Fresh mozzarella, tomato sauce, basil", price: 249, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=400&fit=crop", badge: "Best Seller" },
    { id: 2, name: "Pepperoni Supreme", description: "Double pepperoni, mozzarella, oregano", price: 329, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=400&fit=crop" },
    { id: 3, name: "BBQ Chicken", description: "Grilled chicken, BBQ sauce, red onions", price: 349, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop" },
    { id: 4, name: "Veggie Delight", description: "Bell peppers, mushrooms, olives, corn", price: 279, image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&h=400&fit=crop", badge: "Veg" },
    { id: 5, name: "Meat Lovers", description: "Pepperoni, sausage, bacon, ham", price: 399, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop" },
    { id: 6, name: "Four Cheese", description: "Mozzarella, cheddar, parmesan, gouda", price: 349, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=400&fit=crop" },
  ],
  burger: [
    { id: 7, name: "Classic Beef Burger", description: "Angus beef patty, lettuce, tomato, cheese", price: 199, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop", badge: "Popular" },
    { id: 8, name: "Double Smash", description: "Two smashed patties, American cheese, pickles", price: 279, image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=400&fit=crop" },
    { id: 9, name: "Chicken Zinger", description: "Crispy fried chicken, spicy mayo, coleslaw", price: 229, image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=400&fit=crop" },
    { id: 10, name: "Veggie Stack", description: "Grilled vegetable patty, avocado, sprouts", price: 189, image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&h=400&fit=crop", badge: "Veg" },
    { id: 11, name: "BBQ Bacon Burger", description: "Beef patty, crispy bacon, BBQ sauce", price: 299, image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=400&fit=crop" },
    { id: 12, name: "Mushroom Swiss", description: "Sautéed mushrooms, Swiss cheese, garlic aioli", price: 259, image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=400&fit=crop" },
  ],
  pasta: [
    { id: 13, name: "Spaghetti Carbonara", description: "Creamy egg sauce, pancetta, parmesan", price: 279, image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=400&fit=crop", badge: "Chef's Pick" },
    { id: 14, name: "Penne Arrabbiata", description: "Spicy tomato sauce, garlic, chili flakes", price: 229, image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=400&fit=crop" },
    { id: 15, name: "Fettuccine Alfredo", description: "Creamy white sauce, parmesan, herbs", price: 259, image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400&h=400&fit=crop" },
    { id: 16, name: "Lasagna Classic", description: "Layers of pasta, meat sauce, béchamel", price: 329, image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&h=400&fit=crop" },
    { id: 17, name: "Pesto Pasta", description: "Fresh basil pesto, pine nuts, parmesan", price: 249, image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=400&fit=crop", badge: "Veg" },
    { id: 18, name: "Seafood Linguine", description: "Shrimp, calamari, mussels, white wine", price: 399, image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=400&fit=crop" },
  ],
  sandwich: [
    { id: 19, name: "Club Sandwich", description: "Triple decker, chicken, bacon, egg", price: 199, image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=400&fit=crop" },
    { id: 20, name: "Grilled Cheese", description: "Three cheese blend, sourdough bread", price: 149, image: "https://images.unsplash.com/photo-1528736235302-52922df5c122?w=400&h=400&fit=crop", badge: "Comfort" },
    { id: 21, name: "Chicken Panini", description: "Grilled chicken, pesto, mozzarella", price: 229, image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&h=400&fit=crop" },
    { id: 22, name: "BLT Classic", description: "Crispy bacon, lettuce, tomato, mayo", price: 179, image: "https://images.unsplash.com/photo-1619096252214-ef06c45683e3?w=400&h=400&fit=crop" },
  ],
  beverages: [
    { id: 23, name: "Iced Latte", description: "Espresso, cold milk, ice", price: 149, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop" },
    { id: 24, name: "Fresh Lemonade", description: "Freshly squeezed lemons, mint", price: 99, image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=400&fit=crop", badge: "Refreshing" },
    { id: 25, name: "Mango Smoothie", description: "Fresh mango, yogurt, honey", price: 129, image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=400&fit=crop" },
    { id: 26, name: "Hot Chocolate", description: "Rich cocoa, steamed milk, whipped cream", price: 119, image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400&h=400&fit=crop" },
  ],
  desserts: [
    { id: 27, name: "Tiramisu", description: "Classic Italian coffee-flavored dessert", price: 199, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=400&fit=crop", badge: "Must Try" },
    { id: 28, name: "Chocolate Lava Cake", description: "Warm cake with molten chocolate center", price: 179, image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=400&fit=crop" },
    { id: 29, name: "New York Cheesecake", description: "Creamy cheesecake, berry compote", price: 189, image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=400&fit=crop" },
    { id: 30, name: "Gelato Trio", description: "Three scoops of artisan gelato", price: 149, image: "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=400&h=400&fit=crop" },
  ],
}

export function ProductGrid({ category }) {
  const items = products[category] || []

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  )
}