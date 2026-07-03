import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function CartPage() {
    const { cartItems, total, removeFromCart, updateQuantity } = useCart();
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    console.log("Cart Items:", cartItems);

    return (
        <div className="min-h-screen bg-gray-50 pt-24 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">

                <h1 className="mb-8 text-center text-4xl font-bold text-gray-900">
                    🛒 Shopping Cart
                </h1>

                {cartItems.length === 0 ? (
                    <div className="rounded-2xl bg-white py-20 text-center shadow-sm">
                        <div className="text-6xl">🛍️</div>

                        <h2 className="mt-4 text-2xl font-semibold text-gray-900">
                            Your cart is empty
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Looks like you haven't added anything yet.
                        </p>

                        <Link
                            to="/"
                            className="mt-6 inline-block rounded-lg bg-black px-6 py-3 text-white transition hover:bg-gray-800"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-8 lg:grid-cols-3">

                        {/* Cart Items */}
                        <div className="space-y-4 lg:col-span-2">

                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-lg"
                                >
                                    <div className="flex items-center gap-5">

                                        {item.product_image && (
                                            <img
                                                src={`${BASEURL}${item.product_image}`}
                                                alt={item.product_name}
                                                className="h-24 w-24 rounded-xl object-cover"
                                            />
                                        )}

                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-900">
                                                {item.product_name}
                                            </h2>

                                            <p className="mt-1 text-indigo-600 font-bold">
                                                ${Number(item.product_price).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6">

                                        {/* Quantity */}
                                        <div className="flex items-center rounded-lg border">

                                            <button
                                                onClick={() =>
                                                    updateQuantity(item.id, item.quantity - 1)
                                                }
                                                className="px-4 py-2 transition hover:bg-gray-100"
                                            >
                                                −
                                            </button>

                                            <span className="w-10 text-center font-semibold">
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() =>
                                                    updateQuantity(item.id, item.quantity + 1)
                                                }
                                                className="px-4 py-2 transition hover:bg-gray-100"
                                            >
                                                +
                                            </button>

                                        </div>

                                        {/* Remove */}
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="font-medium text-red-500 transition hover:text-red-700"
                                        >
                                            Remove
                                        </button>

                                    </div>
                                </div>
                            ))}

                        </div>

                        {/* Order Summary */}
                        <div className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">

                            <h2 className="mb-6 text-2xl font-bold">
                                Order Summary
                            </h2>

                            <div className="mb-4 flex justify-between text-gray-600">
                                <span>Items</span>
                                <span>{cartItems.length}</span>
                            </div>

                            <div className="mb-6 flex justify-between border-b pb-4 text-xl font-bold">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>

                            <Link
                                to="/checkout"
                                className="block w-full rounded-xl bg-black py-3 text-center font-semibold text-white transition hover:bg-gray-800"
                            >
                                Proceed to Checkout →
                            </Link>

                        </div>

                    </div>
                )}
            </div>
        </div>
    )
}

export default CartPage;