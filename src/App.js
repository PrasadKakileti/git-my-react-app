// src/App.js
import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Landingpage from "./Pages/LandingPage";
import Navbar  from "./components/Navbar";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
// import { Route, Router, Routes } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useEffect, useState } from "react";






const PRODUCTS = [
  { id: 1, name: "Classic Leather Jacket", price: 129, img: "https://images.unsplash.com/photo-1520975912680-39c6b9b7d2d6?auto=format&fit=crop&w=800&q=60", tag: "Trending" },
  { id: 2, name: "Minimal Sneakers", price: 89, img: "https://images.unsplash.com/photo-1526178612583-0e3910a6a7b6?auto=format&fit=crop&w=800&q=60", tag: "New" },
  { id: 3, name: "Everyday Backpack", price: 59, img: "https://images.unsplash.com/photo-1515548211585-7a6ec9d6f1b7?auto=format&fit=crop&w=800&q=60", tag: "Popular" },
  { id: 4, name: "Classic Sunglasses", price: 39, img: "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=60", tag: "Sale" },
  { id: 5, name: "Comfort Tee", price: 25, img: "https://images.unsplash.com/photo-1520975912680-39c6b9b7d2d6?auto=format&fit=crop&w=800&q=60", tag: "Basics" },
  { id: 6, name: "Smartphone", price: 199, img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=60", tag: "Tech" }
];

function App() {
  
 
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(PRODUCTS);
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem("app_cart");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("app_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    setFiltered(PRODUCTS.filter(p => p.name.toLowerCase().includes(q)));
  }, [query]);

  function addToCart(product) {
    setCart(prev => {
      const found = prev.find(i => i.id === product.id);
      if (found) return prev.map(i => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...product, qty: 1 }];
    });
  }

  function changeQty(id, delta) {
    setCart(prev => {
      return prev
        .map(i => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter(i => i.qty > 0);
    });
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(i => i.id !== id));
  }

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.qty * i.price, 0);

  return (
    <div className="App" style={{ fontFamily: "Inter, system-ui, Arial", background: "#f6f7fb", minHeight: "100vh", paddingBottom: 40 }}>
      {/* NAV */}
       <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        {/* <Route path="/cart" element={<Cart />} /> */}
      </Routes>
    </BrowserRouter>


      <div style={{ maxWidth: 1100, margin: "0 auto", padding: 16 }}>
        <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <img src={logo} alt="logo" style={{ width: 40, height: 40 }} />
            <div style={{ fontWeight: 700, fontSize: 20 }}>ShopMate</div>
            <div style={{ display: "none", gap: 12, marginLeft: 16 }} className="nav-links">
              <div>Men</div><div>Women</div><div>Accessories</div><div>Sale</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search products..."
              style={{ padding: "8px 12px", borderRadius: 10, border: "1px solid #e6e9ef", width: 260 }}
            />
            <button onClick={() => document.getElementById("cart-panel")?.scrollIntoView({ behavior: "smooth" })} style={{ position: "relative", padding: "8px 12px", borderRadius: 10, border: "1px solid #e6e9ef", background: "#fff" }}>
              Cart
              {cartCount > 0 && <span style={{ position: "absolute", right: -8, top: -6, background: "#ef4444", color: "#fff", borderRadius: 999, padding: "2px 6px", fontSize: 12 }}>{cartCount}</span>}
            </button>
          </div>
        </nav>

        {/* HERO */}
        <header style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginTop: 16 }}>
          <div style={{ background: "#fff", padding: 20, borderRadius: 12, boxShadow: "0 6px 18px rgba(16,24,40,0.06)" }}>
            <h2 style={{ margin: 0, fontSize: 28 }}>Discover styles that fit your life</h2>
            <p style={{ marginTop: 12, color: "#6b7280" }}>Handpicked collection of clothes, accessories and tech — made for everyday life.</p>
            <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
              <button style={{ padding: "10px 14px", borderRadius: 10, background: "#111827", color: "#fff", border: 0 }}>Shop Men</button>
              <button style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #e6e9ef", background: "transparent" }}>Shop Women</button>
            </div>
          </div>
          <div style={{ borderRadius: 12, overflow: "hidden" }}>
            <img src="https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1200&q=60" alt="hero" style={{ width: "100%", height: 240, objectFit: "cover", borderRadius: 12 }} />
          </div>
        </header>

        {/* PRODUCTS */}
        <main style={{ marginTop: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ margin: 0 }}>Recommended for you</h3>
            <div style={{ color: "#6b7280" }}>{filtered.length} items</div>
          </div>

          <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
            {filtered.map(p => (
              <div key={p.id} style={{ background: "#fff", borderRadius: 12, padding: 12, boxShadow: "0 6px 12px rgba(16,24,40,0.04)", display: "flex", flexDirection: "column" }}>
                <div style={{ position: "relative" }}>
                  <img src={p.img} alt={p.name} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 8 }} />
                  <div style={{ position: "absolute", left: 10, top: 10, background: "rgba(255,255,255,0.95)", padding: "6px 8px", borderRadius: 8, fontSize: 12 }}>{p.tag}</div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                  <div style={{ fontWeight: 600 }}>{p.name}</div>
                  <div style={{ fontWeight: 700 }}>${p.price}</div>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                  <button onClick={() => addToCart(p)} style={{ padding: "8px 10px", borderRadius: 8, border: 0, background: "#111827", color: "#fff" }}>Add</button>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* CART PANEL */}
        <aside id="cart-panel" style={{ marginTop: 20, background: "#fff", padding: 14, borderRadius: 12, boxShadow: "0 6px 12px rgba(16,24,40,0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h4 style={{ margin: 0 }}>Cart</h4>
            <div style={{ color: "#6b7280" }}>{cart.length} products</div>
          </div>

          <div style={{ marginTop: 10 }}>
            {cart.length === 0 ? (
              <div style={{ padding: 12, color: "#6b7280" }}>Your cart is empty — add something you love.</div>
            ) : (
              cart.map(item => (
                <div key={item.id} style={{ display: "flex", gap: 12, alignItems: "center", padding: "8px 0", borderBottom: "1px solid #f1f1f3" }}>
                  <img src={item.img} alt={item.name} style={{ width: 56, height: 56, objectFit: "cover", borderRadius: 8 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>{item.name}</div>
                    <div style={{ color: "#6b7280", fontSize: 13 }}>Qty: {item.qty} • ${item.price} each</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 700 }}>${item.qty * item.price}</div>
                    <div style={{ marginTop: 8, display: "flex", gap: 8, justifyContent: "flex-end" }}>
                      <button onClick={() => changeQty(item.id, -1)} style={{ padding: 6, borderRadius: 6 }}>-</button>
                      <button onClick={() => changeQty(item.id, +1)} style={{ padding: 6, borderRadius: 6 }}>+</button>
                      <button onClick={() => removeFromCart(item.id)} style={{ padding: 6, borderRadius: 6, color: "#ef4444", background: "transparent", border: 0 }}>Remove</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12, borderTop: "1px solid #f1f1f3", paddingTop: 12 }}>
            <div style={{ color: "#6b7280" }}>Total</div>
            <div style={{ fontWeight: 700 }}>${cartTotal}</div>
          </div>
        </aside>

        {/* FOOTER */}
        <footer style={{ marginTop: 26, color: "#6b7280", fontSize: 13 }}>
          © {new Date().getFullYear()} ShopMate • Built with React
        </footer>
      </div>
    </div>
  );
}

export default App;
