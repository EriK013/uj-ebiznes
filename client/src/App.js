import { createContext, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Products from './components/Products';
import Payments from './components/Payments';
import Cart from './components/Cart';

export const CartContext = createContext();

function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToCart = (product) => {
    setItems([...items, product]);
  };

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="App">
          <h1>Mój Sklep</h1>
          <nav>
            <Link to="/">Produkty</Link> | <Link to="/cart">Koszyk</Link> | <Link to="/payments">Płatności</Link>
          </nav>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payments" element={<Payments />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
