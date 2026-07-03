import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../utils/auth";
import { useCart } from "../context/CartContext";

function CheckoutPage() {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    const navigate = useNavigate();
    const { clearCart } = useCart();

    const [form, setForm] = useState({
        name: "",
        address: "",
        phone: "",
        payment_method: "COD",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "phone") {
            // allow digits only and limit to 10 characters
            const digits = value.replace(/[^0-9]/g, "").slice(0, 10);
            setForm({ ...form, phone: digits });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        // client-side validation: phone must be exactly 10 digits
        if (!/^[0-9]{10}$/.test(form.phone)) {
            setMessage("Phone number must be exactly 10 digits.");
            setLoading(false);
            return;
        }
        try {
            const res = await authFetch(`${BASEURL}/api/orders/create/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });
            const data = await res.json();

            if (res.ok) {
                setMessage("Order placed successfully");
                clearCart();
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            } else {
                setMessage(data.error || "Failed to place order. Please try again.");
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-24 px-4">
            <div className="mx-auto max-w-lg">

                <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">

                    <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">
                        Checkout
                    </h1>

                    <p className="mb-8 text-center text-gray-500">
                        Complete your order by filling in your details.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Full Name */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                required
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            />
                        </div>

                        {/* Address */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Delivery Address
                            </label>

                            <textarea
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                rows={4}
                                required
                                placeholder="Enter your complete address..."
                                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Phone Number
                            </label>

                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="9876543210"
                                required
                                maxLength={10}
                                inputMode="numeric"
                                pattern="[0-9]{10}"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            />
                        </div>

                        {/* Payment */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Payment Method
                            </label>

                            <select
                                name="payment_method"
                                value={form.payment_method}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            >
                                <option value="COD">
                                    Cash on Delivery
                                </option>

                                <option value="CreditCard">
                                    Online Payment
                                </option>
                            </select>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full items-center justify-center rounded-xl bg-black py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? (
                                <>
                                    <svg
                                        className="mr-2 h-5 w-5 animate-spin"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            className="opacity-25"
                                        />

                                        <path
                                            fill="currentColor"
                                            className="opacity-75"
                                            d="M4 12a8 8 0 018-8v8z"
                                        />
                                    </svg>

                                    Processing...
                                </>
                            ) : (
                                "Place Order"
                            )}
                        </button>

                        {message && (
                            <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-center text-sm font-medium text-green-700">
                                ✅ {message}
                            </div>
                        )}

                    </form>

                </div>

            </div>
        </div>
    )
}

export default CheckoutPage;