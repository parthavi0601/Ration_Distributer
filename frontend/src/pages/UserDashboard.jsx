import React, { useEffect, useState } from "react";
import "./UserDashboard.css"; // 1. Import your CSS file

const UserDashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [orders, setOrders] = useState([]);
  const [quotaLeft, setQuotaLeft] = useState(null);
  const [selectedItem, setSelectedItem] = useState("");
  const [qty, setQty] = useState(1);
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");

  // Load user ID (after login)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setUserId(user.id);
  }, []);

  // Fetch inventory + orders + quota
  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const invRes = await fetch("http://localhost:5000/inventory");
        const invData = await invRes.json();
        setInventory(invData);

        const ordRes = await fetch(`http://localhost:5000/orders/user/${userId}`);
        const ordData = await ordRes.json();
        setOrders(ordData);

        const quotaRes = await fetch(`http://localhost:5000/orders/quota/${userId}`);
        const quotaData = await quotaRes.json();
        setQuotaLeft(quotaData.remaining);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [userId]);

  const placeOrder = async (e) => {
    e.preventDefault();
    if (!selectedItem || qty <= 0) {
      alert("Please select an item and enter valid quantity");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/orders/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, itemId: selectedItem, qty }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage(data.message || "✅ Order placed successfully!");
      } else {
        setMessage(data.message || "❌ Error placing order.");
      }
    } catch (err) {
      console.error("Error placing order", err);
      setMessage("❌ Server error.");
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>User Dashboard - Mumbai Ration Center</h1>
        <p className="welcome-message">Welcome, Ration Card Holder **#{userId}**</p>
      </header>

      {/* Quota Info */}
      {quotaLeft !== null && (
        <section className="quota-card">
          <p className="quota-text">
            📊 **Remaining Monthly Quota:** **{quotaLeft}** kg
          </p>
        </section>
      )}

      {/* Inventory Section */}
      <section className="dashboard-section inventory-section">
        <h2 className="section-title">📦 Available Rations</h2>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity (kg/units)</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Place Order */}
      <section className="dashboard-section order-form-section">
        <h2 className="section-title">🛒 Place an Order</h2>
        <form onSubmit={placeOrder} className="order-form">
          <div className="form-group">
            <label htmlFor="item-select">Select Item:</label>
            <select
              id="item-select"
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value)}
            >
              <option value="">-- Choose an item --</option>
              {inventory.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="quantity-input">Quantity:</label>
            <input
              id="quantity-input"
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(parseInt(e.target.value))}
            />
          </div>
          <button type="submit" className="submit-button">
            Place Order
          </button>
        </form>
        {message && <p className="message-text">{message}</p>}
      </section>

      {/* User Orders */}
      <section className="dashboard-section my-orders-section">
        <h2 className="section-title">🧾 My Orders</h2>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.item_name}</td>
                <td>{order.qty}</td>
                <td>{new Date(order.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default UserDashboard;