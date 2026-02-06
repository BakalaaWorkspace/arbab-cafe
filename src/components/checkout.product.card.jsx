import { Plus, Minus } from "lucide-react"; 
import { useCartStore } from "@/store/cart.store";

export const CheckoutProductCard = ({ item }) => {
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);

  const handleAdd = () => {
    addItem({ id: item.id, name: item.name, image: item.image }, item.variant);
  };

  const handleRemove = () => {
    removeItem(item.cartItemId);
  };

  return (
    <div className="group relative flex gap-3 sm:gap-6 p-3 sm:p-5 rounded-2xl sm:rounded-3xl bg-zinc-950 border border-white/5 hover:border-white/10 transition-all duration-500">
      <div className="relative w-20 h-20 sm:w-32 sm:h-32 shrink-0 overflow-hidden rounded-xl sm:rounded-2xl bg-zinc-900">
        <img
          src={item.image || "src/assets/images/burger/placeholder.jpg"}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl sm:rounded-2xl" />
      </div>

      <div className="flex flex-col flex-1 py-0.5 sm:py-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm sm:text-2xl font-serif italic text-white leading-tight">
              {item.name}
            </h3>
            {item.variant && (
              <span className="inline-block mt-1 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-red-500 font-black">
                {item.variant.size}
              </span>
            )}
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between">
          <div className="flex items-center gap-3 bg-zinc-900/50 p-1 rounded-xl border border-white/5">
            <button
              onClick={handleRemove}
              className="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg bg-zinc-800 hover:bg-red-600 text-white transition-colors"
            >
              <Minus size={14} />
            </button>
            
            <span className="text-sm sm:text-base font-bold text-white tabular-nums min-w-6 text-center">
              {item.quantity}
            </span>

            <button
              onClick={handleAdd}
              className="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg bg-zinc-800 hover:bg-red-600 text-white transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>
          
          <div className="text-right">
            <p className="hidden sm:block text-[9px] uppercase tracking-widest text-zinc-600 mb-1 font-bold">Total Price</p>
            <span className="text-base sm:text-2xl font-bold text-white tabular-nums tracking-tight">
              ₹{item.price * item.quantity}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};