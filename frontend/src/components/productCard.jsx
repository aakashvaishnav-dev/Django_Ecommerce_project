import { Link } from "react-router-dom";
function ProductCard({ product }) {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    return (
        <Link to={`/product/${product.id}`} className="group block">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                {/* Product Image */}
                <div className="overflow-hidden">
                    <img
                        src={`${BASEURL}${product.image}`}
                        alt={product.name}
                        loading="lazy"
                        className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </div>

                {/* Product Details */}
                <div className="space-y-2 p-5">
                    <h2 className="line-clamp-2 text-lg font-semibold text-gray-900">
                        {product.name}
                    </h2>

                    <p className="text-2xl font-bold text-indigo-600">
                        ${Number(product.price).toFixed(2)}
                    </p>

                    <button
                        className="mt-3 w-full rounded-lg bg-black py-2.5 font-medium text-white transition hover:bg-gray-800"
                    >
                        View Product
                    </button>
                </div>

            </div>
        </Link>
    )
}

export default ProductCard;