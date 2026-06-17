import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import ProductList from "./pages/productList";
import ProductDetails from "./pages/productDetails";
import Navbar from "./components/Navbar";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import PrivateRouter from './components/PrivateRouter';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<ProductList/>} />
        <Route path="/product/:id" element={<ProductDetails/>} />
        <Route path="/cart" element={<CartPage/>} />
        <Route element={<PrivateRouter />}>
          <Route path="/checkout" element={<CheckoutPage/>} />
        </Route>
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/sigup' element={<Navigate to="/signup" replace />} />
        <Route path='*' element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
      
  );
}

export default App;