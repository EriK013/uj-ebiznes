import { useState, useEffect } from 'react';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Błąd pobierania:", err));
  }, []);

  return (
    <div>
      <h2>Nasze Produkty</h2>
      <ul>
        {products.map(p => (
          <li key={p.id}>{p.name} - {p.price} PLN</li>
        ))}
      </ul>
    </div>
  );
}

export default Products;