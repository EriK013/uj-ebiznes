import { useContext } from 'react';
import { CartContext } from '../App';

function Cart() {
  const { items, total } = useContext(CartContext);

  if (items.length === 0) {
    return (
      <div>
        <h2>Koszyk</h2>
        <p>Koszyk jest pusty.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Koszyk</h2>
      <ul>
        {items.map((item, i) => (
          <li key={i}>{item.name} - {item.price} PLN</li>
        ))}
      </ul>
      <p>Razem: {total} PLN</p>
    </div>
  );
}

export default Cart;
