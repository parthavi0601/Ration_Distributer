import React, { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const invRes = await fetch("http://localhost:5000/admin/inventory");
        const invData = await invRes.json();
        setInventory(invData);

        const ordRes = await fetch("http://localhost:5000/orders");
        const ordData = await ordRes.json();
        setOrders(ordData);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">Admin Dashboard - Mumbai Distribution Center</h1>

      {/* Inventory Section */}
      <section className="dashboard-section">
        <h2 className="section-title">📦 Current Inventory</h2>
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

      {/* Orders Section */}
      <section className="dashboard-section">
        <h2 className="section-title">🧾 User Orders</h2>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th className="order-id-cell">Order ID</th>
              <th className="user-id-cell">User ID</th>
              <th className="item-cell">Item</th>
              <th className="name-cell">Name</th>
              <th className="quantity-cell">Quantity</th>
              <th className="qr-code-cell">QR Code</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.user_id}</td>
                <td>{order.item_id}</td>
                <td>{order.item_name}</td>
                <td>{order.qty}</td>
                <td className="qr-code-cell">
                  <QRCodeSVG
                    value={JSON.stringify({
                      orderId: order.id,
                      userId: order.user_id,
                      item: order.item_name,
                      quantity: order.qty,
                    })}
                    size={64}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminDashboard;