import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import './index.css';

// BrowserRouter  = enables URL-based navigation (like a real website)
// Routes         = the container for all route definitions
// Route          = maps a URL path to a component/page
//
// URL /          → shows Dashboard page
// URL /products  → shows Products page
// URL /add       → shows AddProduct page (add mode)
// URL /edit/5    → shows AddProduct page (edit mode, id=5)

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/edit/:id" element={<AddProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
