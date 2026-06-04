import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../App';

const API = window.__API_URL__ || process.env.REACT_APP_API_URL || 'http://localhost:8080';

function Products() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`${API}/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Błąd pobierania:", err));
  }, []);

  return (
    <div>
      <h2>Nasze Produkty</h2>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.name} - {p.price} PLN
            <button onClick={() => addToCart(p)}>Dodaj do koszyka</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
