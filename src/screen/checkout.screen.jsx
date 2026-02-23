import React, { useState } from "react";
import { ShoppingBag, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "@/store/cart.store";
import { CheckoutProductCard } from "@/components/checkout.product.card";
import { OrderSummary } from "@/components/order.summary";
import { supabase } from "@/lib/supabase";
import { useFormik } from "formik";
import * as Yup from "yup";

const DELIVERY_CHARGE = 15;
const WHATSAPP_NUMBER = "+918828648504";

const indianPhoneRegex = /^(?:\+91|91)?[6-9]\d{9}$/;

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, "Name too short")
    .required("Full name is required"),

  phone: Yup.string()
    .matches(indianPhoneRegex, "Enter valid Indian mobile number")
    .required("Phone number is required"),

  address: Yup.string()
    .trim()
    .min(5, "Address too short")
    .required("Delivery address is required"),

  notes: Yup.string(),
});

const CheckoutScreen = () => {
  const cart = useCartStore((state) => state.cart);
  const [open, setOpen] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.commissionPrice * item.quantity,
    0
  );

  const total = subtotal > 0 ? subtotal + DELIVERY_CHARGE : 0;

  const originalSubtotal = cart.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0
  );

  const originalTotal =
    originalSubtotal > 0
      ? originalSubtotal + DELIVERY_CHARGE
      : 0;

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      address: "",
      notes: "",
    },
    validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const { data: order, error: orderError } = await supabase
          .from("orders")
          .insert({
            customer_name: values.name,
            customer_phone: values.phone,
            customer_address: values.address,
            notes: values.notes,
            subtotal,
            delivery_charge: DELIVERY_CHARGE,
            total,
          })
          .select()
          .single();

        if (orderError) throw orderError;

        const orderItemsPayload = cart.map((item) => ({
          order_id: order.id,
          product_id: item.id,
          product_name: item.name,
          variant: item.variant?.size || null,
          quantity: item.quantity,
          original_price: item.originalPrice,
          commission_price: item.commissionPrice,
          line_total: item.commissionPrice * item.quantity,
        }));

        const { error: itemsError } = await supabase
          .from("order_items")
          .insert(orderItemsPayload);

        if (itemsError) throw itemsError;

        const itemsText = cart
          .map((i, idx) => {
            const size = i.variant?.size
              ? i.variant.size.toUpperCase()
              : "—";

            const lineTotal = i.originalPrice * i.quantity;

            return `${idx + 1}. ${i.name}
Size: ${size}
Qty: ${i.quantity}
Item Total: ₹${lineTotal}`;
          })
          .join("\n\n");

        const notesSection = values.notes.trim()
          ? `\n📝 *Notes*\n${values.notes.trim()}\n`
          : "";

        const message = `
🧾 *NEW ORDER*

👤 *Customer*
Name: ${values.name}
Phone: ${values.phone}


📍 *Address*
${values.address}
${notesSection}

*Order Items*
${itemsText}

----------------------
Subtotal: ₹${originalSubtotal}
Delivery: ₹${DELIVERY_CHARGE}
*TOTAL: ₹${originalTotal}*
`;

        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          message.trim()
        )}`;

        window.open(url, "_blank");

        setOpen(false);
      } catch (err) {
        console.error(err);
      } finally {
        setSubmitting(false);
      }
    },
  });

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

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-neutral-900 w-full max-w-lg rounded-3xl border border-neutral-800 p-8 text-white shadow-2xl relative">

            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="mb-8">
              <h2 className="text-3xl font-extrabold tracking-tight">
                Delivery Details
              </h2>
              <p className="text-zinc-400 text-sm mt-1">
                Fill carefully. Incorrect info delays order.
              </p>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-6">

              {["name","phone","address"].map((field) => (
                <div key={field}>
                  <label className="block text-xs uppercase text-zinc-500 mb-2">
                    {field === "name" && "Full Name"}
                    {field === "phone" && "Phone Number"}

                    {field === "address" && "Delivery Address"}
                  </label>

                  {field !== "address" ? (
                    <input
                      name={field}
                      inputMode={field === "phone" ? "numeric" : undefined}
                      maxLength={field === "phone" ? 10 : undefined}
                      onChange={(e) => {
                        if (field === "phone") {
                          const numeric = e.target.value.replace(/\D/g, "");
                          formik.setFieldValue("phone", numeric);
                        } else {
                          formik.handleChange(e);
                        }
                      }}
                      value={formik.values[field]}
                      className={`w-full px-4 py-3 rounded-xl bg-zinc-800 border ${
                        formik.touched[field] && formik.errors[field]
                          ? "border-red-600"
                          : "border-zinc-700"
                      } focus:ring-1 focus:ring-red-600 outline-none transition-all`}
                    />
                  ) : (
                    <textarea
                      name="address"
                      rows={3}
                      onChange={formik.handleChange}
                      value={formik.values.address}
                      className={`w-full px-4 py-3 rounded-xl bg-zinc-800 border ${
                        formik.touched.address && formik.errors.address
                          ? "border-red-600"
                          : "border-zinc-700"
                      } focus:ring-1 focus:ring-red-600 outline-none transition-all resize-none`}
                    />
                  )}

                  {formik.touched[field] && formik.errors[field] && (
                    <p className="text-red-500 text-xs mt-2">
                      {formik.errors[field]}
                    </p>
                  )}
                </div>
              ))}

              <div>
                <label className="block text-xs uppercase text-zinc-500 mb-2">
                  Special Instructions
                </label>
                <textarea
                  name="notes"
                  rows={2}
                  onChange={formik.handleChange}
                  value={formik.values.notes}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 focus:ring-1 focus:ring-red-600 outline-none resize-none text-sm italic"
                />
              </div>

              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full py-4 rounded-2xl bg-red-600 hover:bg-red-700 active:scale-[0.98] font-bold text-lg transition-all"
              >
                {formik.isSubmitting ? "Processing..." : "Place Order"}
              </button>

            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutScreen;