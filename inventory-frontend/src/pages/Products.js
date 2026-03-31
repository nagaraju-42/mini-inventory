import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

// useNavigate = lets us programmatically go to another URL
// (like navigate('/edit/5') when edit button is clicked)

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch all products from backend
  const fetchProducts = () => {
    api.get('/products')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  // Load products when page first opens
  useEffect(() => {
    fetchProducts();
  }, []);

  // Called when Delete button is clicked
  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      api.delete(`/products/${id}`)
        .then(() => fetchProducts()) // reload list after delete
        .catch(err => console.error(err));
    }
  };

  if (loading) return <div className="loading">⏳ Loading products...</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h1>All Products</h1>
        <button className="btn-primary" onClick={() => navigate('/add')}>
          + Add Product
        </button>
      </div>

      {products.length === 0 ? (
        <div className="empty">
          No products yet.{' '}
          <span
            className="link"
            onClick={() => navigate('/add')}
          >
            Add your first product →
          </span>
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price (₹)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr
                key={product.id}
                className={product.quantity <= 5 ? 'low-stock-row' : ''}
              >
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category || '—'}</td>
                <td>
                  {product.quantity <= 5 ? (
                    <span className="badge-red">{product.quantity}</span>
                  ) : (
                    product.quantity
                  )}
                </td>
                <td>₹{product.price}</td>
                <td>
                  <button
                    className="btn-edit"
                    onClick={() => navigate(`/edit/${product.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(product.id, product.name)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Products;
