import React from "react";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "@/store/cart.store";
import { Plus, Minus } from "lucide-react"; 

const DELIVERY_CHARGE = 0;


const CheckoutProductCard = ({ item }) => {
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
            
            <span className="text-sm sm:text-base font-bold text-white tabular-nums min-w-[1.5rem] text-center">
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

const OrderSummary = ({ subtotal, deliveryCharge, total }) => {
  return (
    <div className="rounded-3xl bg-zinc-950 border border-white/10 overflow-hidden">
      <div className="px-6 py-4 border-b border-white/5 bg-white/2">
        <h2 className="text-xs sm:text-sm uppercase tracking-[0.3em] text-zinc-400 font-black">
          Order Totals
        </h2>
      </div>

      <div className="p-6 sm:p-8 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-zinc-500 text-xs sm:text-sm font-medium tracking-wide">Subtotal</span>
          <span className="text-white font-bold tabular-nums">₹{subtotal}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-zinc-500 text-xs sm:text-sm font-medium tracking-wide">Delivery Fee</span>
          <span className="text-white font-bold tabular-nums">₹{deliveryCharge}</span>
        </div>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-dashed border-white/10"></div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-red-600 font-black">
            Total Amount
          </span>
          <span className="text-2xl sm:text-4xl font-black text-white tabular-nums tracking-tighter">
            ₹{total}
          </span>
        </div>
      </div>
    </div>
  );
};

const CheckoutScreen = () => {
  const cart = useCartStore((state) => state.cart);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal > 0 ? subtotal + DELIVERY_CHARGE : 0;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-6 ring-1 ring-white/10">
           <ShoppingBag className="text-zinc-500" size={32} />
        </div>
        <h2 className="text-2xl font-serif italic mb-2">Your cart is empty</h2>
        <p className="text-zinc-500 text-sm mb-8">Add some delicious fries to get started!</p>
        <Link 
          to="/" 
          className="px-8 py-4 bg-red-600 rounded-2xl font-bold uppercase text-xs tracking-widest hover:bg-red-700 transition-colors"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 pb-12 pt-20 sm:pt-24 font-sans selection:bg-red-600">
      <div className="max-w-2xl mx-auto">
        
        <div className="mb-10 sm:mb-14 text-center">
          <h1 className="text-4xl sm:text-6xl font-serif italic tracking-tighter inline-block relative">
            Checkout
            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-red-600/30" />
          </h1>
        </div>

        <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
          {cart.map((item) => (
            <CheckoutProductCard key={item.cartItemId} item={item} />
          ))}
        </div>

        <OrderSummary 
          subtotal={subtotal} 
          deliveryCharge={DELIVERY_CHARGE} 
          total={total} 
        />

        <button
          onClick={() => alert("Order Placed!")}
          className="group relative mt-8 sm:mt-10 w-full h-16 sm:h-20 rounded-2xl sm:rounded-3xl overflow-hidden bg-red-600 transition-all duration-300 active:scale-[0.98] shadow-lg shadow-red-900/20"
        >
          <div className="relative flex items-center justify-center gap-3">
            <span className="text-sm sm:text-base font-black uppercase tracking-[0.3em] text-white">
              Place Order
            </span>
            <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default CheckoutScreen;