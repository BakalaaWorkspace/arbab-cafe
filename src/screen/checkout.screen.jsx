import React, { useState } from "react";
import { ShoppingBag, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "@/store/cart.store";
import { CheckoutProductCard } from "@/components/checkout.product.card";
import { OrderSummary } from "@/components/order.summary";

const DELIVERY_CHARGE = 15;
const WHATSAPP_NUMBER = "+918828648504";

const CheckoutScreen = () => {
  const cart = useCartStore((state) => state.cart);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "", // Added notes to state
  });

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal > 0 ? subtotal + DELIVERY_CHARGE : 0;

  const placeOrder = () => {
    if (!form.name || !form.phone || !form.address) return;

    const items = cart
      .map((i, idx) => {
        const size = i.variant?.size ? i.variant.size.toUpperCase() : "—";
        const lineTotal = i.price * i.quantity;

        return `${idx + 1}. ${i.name}
   Size: ${size}
   Qty: ${i.quantity}
   Item Total: ₹${lineTotal}`;
      })
      .join("\n\n");

    // Logic: Only add the notes section if form.notes is not empty
    const notesSection = form.notes.trim()
      ? `\n📝 *Notes*\n${form.notes.trim()}\n`
      : "";

    const message = `
🧾 *NEW ORDER*

👤 *Customer*
Name: ${form.name}
Phone: ${form.phone}

📍 *Address*
${form.address}
${notesSection}
*Order Items*
${items}

----------------------
Subtotal: ₹${subtotal}
Delivery: ₹${DELIVERY_CHARGE}
*TOTAL: ₹${total}*
`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message.trim()
    )}`;

    window.open(url, "_blank");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <ShoppingBag className="text-zinc-500 mb-6" size={40} />
        <h2 className="text-2xl font-serif italic mb-2">
          Your cart is empty
        </h2>
        <Link
          to="/"
          className="px-8 py-4 bg-red-600 rounded-2xl font-bold uppercase text-xs"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-black text-white px-4 pb-12 pt-20">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-serif italic text-center mb-10">
            Checkout
          </h1>

          <div className="space-y-4 mb-10">
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
            onClick={() => setOpen(true)}
            className="mt-8 w-full h-16 rounded-2xl text-2xl bg-red-600 font-black"
          >
            Continue
          </button>
        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-neutral-900 w-full max-w-md rounded-3xl border border-neutral-800 p-8 text-white shadow-2xl relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors text-zinc-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="mb-8">
              <h2 className="text-2xl font-extrabold tracking-tight">Complete Order</h2>
              <p className="text-zinc-400 text-sm mt-1">Please provide your delivery details below.</p>
            </div>

            <div className="space-y-5">
              <div className="group">
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1.5 ml-1">Full Name</label>
                <input
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all placeholder:text-zinc-600"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="group">
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1.5 ml-1">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 9876543210"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all placeholder:text-zinc-600"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>

              <div className="group">
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1.5 ml-1">Delivery Address</label>
                <textarea
                  placeholder="123 Street Name, City"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all placeholder:text-zinc-600 resize-none"
                  rows={2}
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                />
              </div>

              <div className="group">
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1.5 ml-1">Special Instructions</label>
                <textarea
                  placeholder='e.g. "Make it extra spicy!" or "do not ring doorbell"'
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all placeholder:text-zinc-600 italic text-sm"
                  rows={2}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                />
              </div>
            </div>

            <button
              onClick={placeOrder}
              className="mt-8 w-full py-4 rounded-2xl bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-bold text-lg shadow-lg shadow-red-900/20 transition-all flex items-center justify-center gap-2"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutScreen;
