function Payments() {
  const handlePayment = () => {
    fetch('http://localhost:8080/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 100, status: 'pending' })
    })
    .then(() => alert("Płatność wysłana do serwera!"));
  };

  return (
    <div style={{ marginTop: '20px', borderTop: '1px solid #ccc' }}>
      <h2>Płatność</h2>
      <button onClick={handlePayment}>Zapłać teraz</button>
    </div>
  );
}

export default Payments;