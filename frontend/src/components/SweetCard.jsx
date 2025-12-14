import { getUserRole } from "../utils/auth";

export default function SweetCard({ sweet, onPurchase, onDelete, onEdit }) {
  const role = getUserRole();

  return (
    <div className="sweet-card">
      <h3>{sweet.name}</h3>
      <p>Category: {sweet.category}</p>
      <p>Price: ₹{sweet.price}</p>
      <p>Stock: {sweet.quantity}</p>

      {/* USER ONLY */}
      {role === "user" && (
        sweet.quantity === 0 ? (
          <button disabled>Out of Stock</button>
        ) : (
          <button onClick={() => onPurchase(sweet.id)}>Purchase</button>
        )
      )}

      {/* ADMIN ONLY */}
      {role === "admin" && (
        <div style={{ marginTop: "10px" }}>
          <button onClick={() => onEdit(sweet)}>Edit</button>
          <button onClick={() => onDelete(sweet.id)}>Delete</button>
        </div>
      )}
    </div>
  );
}
