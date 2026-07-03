import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { clearTokens, getAccessToken } from '../utils/auth.js';

function Navbar() {
    const { cartItems } = useCart();
    const navigate = useNavigate();

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const isLoggedIn = !!getAccessToken();

    const handleLogout = () => {
        clearTokens();
        navigate('/login');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-lg shadow-sm">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                {/* Logo */}
                <Link
                    to="/"
                    className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-gray-900 transition hover:scale-105"
                >
                    <span className="text-3xl">🛍️</span>
                    <span>NoviCart</span>
                </Link>

                {/* Navigation */}
                <div className="flex items-center gap-6">

                    {!isLoggedIn ? (
                        <>
                            <Link
                                to="/login"
                                className="rounded-lg px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-100 hover:text-black"
                            >
                                Login
                            </Link>

                            <Link
                                to="/signup"
                                className="rounded-lg bg-black px-5 py-2 font-medium text-white transition hover:bg-gray-800"
                            >
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="rounded-lg border border-red-500 px-4 py-2 font-medium text-red-500 transition hover:bg-red-500 hover:text-white"
                        >
                            Logout
                        </button>
                    )}

                    {/* Cart */}
                    <Link
                        to="/cart"
                        className="relative flex items-center gap-2 rounded-lg px-3 py-2 font-medium text-gray-700 transition hover:bg-gray-100 hover:text-black"
                    >
                        <span className="text-xl">🛒</span>

                        <span>Cart</span>

                        {cartCount > 0 && (
                            <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white shadow-md">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                </div>
            </div>
        </nav>
    )
}

export default Navbar;