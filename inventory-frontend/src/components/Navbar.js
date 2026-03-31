import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// useLocation() tells us what the current URL is
// We use it to highlight the active nav link

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-brand">📦 Mini Inventory</div>
      <div className="navbar-links">
        <Link
          to="/"
          className={location.pathname === '/' ? 'active' : ''}
        >
          Dashboard
        </Link>
        <Link
          to="/products"
          className={location.pathname === '/products' ? 'active' : ''}
        >
          Products
        </Link>
        <Link
          to="/add"
          className={location.pathname === '/add' ? 'active' : ''}
        >
          + Add Product
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
