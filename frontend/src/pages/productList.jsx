import { useEffect, useState } from "react";
import ProductCard from "../components/productCard.jsx";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    useEffect(() => {
        fetch(`${BASEURL}/api/products/`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                return response.json();
            })

            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            })
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24">

            {/* Header */}
            <section className="border-b border-gray-200 bg-white">
                <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-10 md:flex-row md:items-center md:justify-between">

                    <div>
                        <h1 className="text-4xl font-bold text-gray-900">
                            Explore Products
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Discover our latest collection.
                        </p>
                    </div>

                    <div className="rounded-xl bg-gray-100 px-5 py-3 text-sm font-medium text-gray-700">
                        {products.length} Products
                    </div>

                </div>
            </section>

            {/* Products */}
            <section className="mx-auto max-w-7xl px-6 py-10">

                {products.length > 0 ? (

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}

                    </div>

                ) : (

                    <div className="flex flex-col items-center justify-center rounded-3xl bg-white py-20 shadow-sm">

                        <div className="text-6xl">📦</div>

                        <h2 className="mt-4 text-2xl font-bold text-gray-900">
                            No Products Found
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Please check back later.
                        </p>

                    </div>

                )}

            </section>

        </div>
    )
}

export default ProductList;