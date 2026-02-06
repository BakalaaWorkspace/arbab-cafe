export const OrderSummary = ({ subtotal, deliveryCharge, total }) => {
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