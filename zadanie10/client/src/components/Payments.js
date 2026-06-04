import { useContext } from 'react';
import { CartContext } from '../App';

const API = window.__API_URL__ || process.env.REACT_APP_API_URL || 'http://localhost:8080';

function Payments() {
  const { total } = useContext(CartContext);

  const handlePayment = () => {
    fetch(`${API}/payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: total, status: 'pending' })
    })
    .then(() => alert("Płatność wysłana do serwera!"));
  };

  return (
    <div style={{ marginTop: '20px', borderTop: '1px solid #ccc' }}>
      <h2>Płatność</h2>
      <p>Do zapłaty: {total} PLN</p>
      <button onClick={handlePayment}>Zapłać teraz</button>
    </div>
  );
}

export default Payments;
