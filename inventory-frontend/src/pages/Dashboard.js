import React, { useEffect, useState } from 'react';
import api from '../api';

// useEffect  = runs code when the component loads (like a page-load event)
// useState   = stores data that can change (triggers re-render when it changes)

function Dashboard() {
  const [data, setData] = useState(null);     // null = not loaded yet
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // This runs once when the Dashboard page loads
  useEffect(() => {
    api.get('/products/dashboard')
      .then(response => {
        setData(response.data);   // store the API response
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Could not connect to backend. Make sure the backend is running!');
        setLoading(false);
      });
  }, []); // [] means "run only once on mount"

  if (loading) return <div className="loading">⏳ Loading dashboard...</div>;
  if (error) return <div className="error-box">{error}</div>;
  if (!data) return null;

  return (
    <div className="page">
      <h1>Dashboard</h1>

      {/* Summary Cards */}
      <div className="cards">
        <div className="card blue">
          <h3>Total Products</h3>
          <p className="big-number">{data.totalProducts}</p>
        </div>
        <div className="card red">
          <h3>Low Stock Alerts</h3>
          <p className="big-number">{data.lowStockCount}</p>
        </div>
      </div>

      {/* Low Stock Table */}
      {data.lowStockProducts.length > 0 ? (
        <div>
          <h2 className="section-title">⚠️ Low Stock Products (qty ≤ 5)</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price (₹)</th>
              </tr>
            </thead>
            <tbody>
              {data.lowStockProducts.map(product => (
                <tr key={product.id} className="low-stock-row">
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>
                    <span className="badge-red">{product.quantity}</span>
                  </td>
                  <td>₹{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty">✅ No low stock products! Everything looks good.</div>
      )}
    </div>
  );
}

export default Dashboard;
