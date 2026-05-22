import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Catalog from './pages/Catalog';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Success from './pages/Success';

function App() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F0FAF7' }}>
      <Header />
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </div>
  );
}

export default App;
