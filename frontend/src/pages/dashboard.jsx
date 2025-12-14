import { useEffect, useState } from "react";
import API from "../api/api";
import SweetCard from "../components/SweetCard";
import { isAdmin } from "../utils/auth";

export default function Dashboard() {
  const [sweets, setSweets] = useState([]);

  // Search state (USER + ADMIN)
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Admin form state
  const [form, setForm] = useState({
    id: null,
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const loadSweets = async () => {
    const res = await API.get("/sweets");
    setSweets(res.data);
  };

  useEffect(() => {
    loadSweets();
  }, []);

  // 🔍 SEARCH (USER + ADMIN)
  const searchSweets = async () => {
    const res = await API.get("/sweets/search", {
      params: { name, category, minPrice, maxPrice },
    });
    setSweets(res.data);
  };

  // 🛒 PURCHASE
  const purchaseSweet = async (id) => {
    await API.post(`/sweets/${id}/purchase`);
    loadSweets();
  };

  // ❌ DELETE (ADMIN)
  const deleteSweet = async (id) => {
    await API.delete(`/sweets/${id}`);
    loadSweets();
  };

  // ✏️ ADD / UPDATE (ADMIN)
const saveSweet = async () => {
  const payload = {
    name: form.name,
    category: form.category,
    price: Number(form.price),
    quantity: Number(form.quantity),
  };

  if (form.id) {
    await API.put(`/sweets/${form.id}`, payload);
  } else {
    await API.post("/sweets", payload);
  }

  setForm({
    id: null,
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  loadSweets();
};


  // 📝 START EDIT
  const startEdit = (sweet) => {
    setForm(sweet);
  };

  return (
    <div>
      {/* 🔍 SEARCH VISIBLE TO ALL */}
      <h2>Search Sweets</h2>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <input type="number" placeholder="Min Price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
        <input type="number" placeholder="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />

        <button onClick={searchSweets}>Search</button>
        <button onClick={loadSweets}>Reset</button>
      </div>

      {/* 👑 ADMIN ONLY */}
      {isAdmin() && (
        <>
          <h3>Admin: Add / Edit Sweet</h3>
          <input placeholder="Name" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input placeholder="Category" value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <input type="number" placeholder="Price" value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })} />
          <input type="number" placeholder="Quantity" value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })} />

          <button onClick={saveSweet}>
            {form.id ? "Update Sweet" : "Add Sweet"}
          </button>
        </>
      )}

      <h2>Available Sweets</h2>

      {sweets.length === 0 && <p>No sweets found</p>}

      {sweets.map((s) => (
        <SweetCard
          key={s.id}
          sweet={s}
          onPurchase={purchaseSweet}
          onDelete={deleteSweet}
          onEdit={startEdit}
        />
      ))}
    </div>
  );
}
