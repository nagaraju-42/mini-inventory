import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

// useParams  = reads URL parameters like /edit/5 → { id: "5" }
// useNavigate = lets us go to another page programmatically

function AddProduct() {
  const { id } = useParams();         // if URL is /edit/5, id = "5"
  const isEditMode = Boolean(id);     // true if editing, false if adding
  const navigate = useNavigate();

  // Form state — stores what the user types
  const [form, setForm] = useState({
    name: '',
    category: '',
    quantity: '',
    price: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // If we're in Edit mode, load the existing product data into the form
  useEffect(() => {
    if (isEditMode) {
      api.get(`/products/${id}`)
        .then(response => {
          const p = response.data;
          setForm({
            name: p.name,
            category: p.category || '',
            quantity: p.quantity,
            price: p.price,
          });
        })
        .catch(() => setError('Product not found.'));
    }
  }, [id, isEditMode]);

  // Called every time the user types in any input field
  // e.target.name  = which field (name/category/quantity/price)
  // e.target.value = what the user typed
  const handleChange = (e) => {
    setForm({
      ...form,               // keep all other fields
      [e.target.name]: e.target.value  // update only the changed field
    });
  };

  // Called when the form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();  // prevent page reload (default browser behavior)

    // Basic validation
    if (!form.name || !form.quantity || !form.price) {
      setError('Name, Quantity, and Price are required.');
      return;
    }
    if (form.quantity < 0 || form.price < 0) {
      setError('Quantity and Price cannot be negative.');
      return;
    }

    setLoading(true);
    setError('');

    // Build the object to send to backend
    const productData = {
      name: form.name,
      category: form.category,
      quantity: parseInt(form.quantity),    // convert string → number
      price: parseFloat(form.price),        // convert string → decimal
    };

    // If editing → PUT request, if adding → POST request
    const request = isEditMode
      ? api.put(`/products/${id}`, productData)
      : api.post('/products', productData);

    request
      .then(() => navigate('/products'))   // go to products list after success
      .catch(() => {
        setError('Something went wrong. Please try again.');
        setLoading(false);
      });
  };

  return (
    <div className="page">
      <div className="form-container">
        <h1>{isEditMode ? '✏️ Edit Product' : '➕ Add New Product'}</h1>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleSubmit} className="form">

          {/* Product Name */}
          <div className="form-group">
            <label>Product Name *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Samsung TV 43 inch"
            />
          </div>

          {/* Category */}
          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="e.g. Electronics, Clothing..."
            />
          </div>

          {/* Quantity and Price side by side */}
          <div className="form-row">
            <div className="form-group">
              <label>Quantity *</label>
              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                placeholder="e.g. 50"
                min="0"
              />
            </div>
            <div className="form-group">
              <label>Price (₹) *</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="e.g. 999.99"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate('/products')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : isEditMode ? 'Update Product' : 'Add Product'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AddProduct;
