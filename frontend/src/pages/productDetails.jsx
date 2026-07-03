import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

function ProductDetails() {
    const { id } = useParams();
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        fetch(`${BASEURL}/api/products/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch product details");
                }
                return response.json();
            })
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            })
    }, [id, BASEURL])
    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error:{error}</div>
    }
    if (!product) {
        return <div>No product found</div>
    }

    const handleAddToCart = () => {
        if (!localStorage.getItem('access_token')) {
            window.location.href = '/login';
            return;
        }
        addToCart(product.id);
    }

    return (
        <div className="min-h-screen bg-gray-50 py-24 px-4">
            <div className="mx-auto max-w-7xl rounded-3xl bg-white shadow-xl overflow-hidden">

                <div className="grid gap-10 p-8 md:grid-cols-2">

                    {/* Product Image */}
                    <div className="overflow-hidden rounded-2xl bg-gray-100">
                        <img
                            src={`${product.image}`}
                            alt={product.name}
                            loading="lazy"
                            className="h-full w-full object-cover transition duration-500 hover:scale-105"
                        />
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col justify-center">

                        <span className="mb-3 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                            In Stock
                        </span>

                        <h1 className="text-4xl font-bold text-gray-900">
                            {product.name}
                        </h1>

                        <p className="mt-4 text-3xl font-bold text-indigo-600">
                            ${Number(product.price).toFixed(2)}
                        </p>

                        <p className="mt-6 text-gray-600 leading-relaxed">
                            {product.description ||
                                "Premium quality product with excellent build quality and fast delivery. Perfect for everyday use."}
                        </p>

                        {/* Buttons */}
                        <div className="mt-8 flex flex-wrap gap-4">

                            <button
                                onClick={handleAddToCart}
                                className="rounded-xl bg-black px-8 py-3 font-semibold text-white transition hover:bg-gray-800 active:scale-95"
                            >
                                🛒 Add to Cart
                            </button>

                            <Link
                                to="/"
                                className="rounded-xl border border-gray-300 px-8 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
                            >
                                ← Continue Shopping
                            </Link>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default ProductDetails;