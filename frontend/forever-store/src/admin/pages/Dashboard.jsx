import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Dashboard.css";

const statusStyle = {
  DELIVERED: {
    background: "#e8f5e9",
    color: "#2e7d32",
  },

  PENDING: {
    background: "#fff3e0",
    color: "#e65100",
  },

  SHIPPED: {
    background: "#e3f2fd",
    color: "#1565c0",
  },

  CANCELLED: {
    background: "#fce4ec",
    color: "#c62828",
  },
};

function Dashboard() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {

    try {

      const response = await axios.get(
        "http://localhost:8080/api/orders"
      );

      setOrders(response.data);

    } catch (err) {
      console.log(err);
    }
  }

  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.amount,
    0
  );

  const pendingOrders = orders.filter(
    (order) => order.status === "PENDING"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "DELIVERED"
  ).length;

  const stats = [
    {
      icon: "📦",
      title: "Total Orders",
      value: totalOrders,
    },

    {
      icon: "💰",
      title: "Revenue",
      value: `₹${totalRevenue}`,
    },

    {
      icon: "⏳",
      title: "Pending Orders",
      value: pendingOrders,
    },

    {
      icon: "✅",
      title: "Delivered",
      value: deliveredOrders,
    },
  ];

  return (
    <div className="dashboard-page">

      <h2>Dashboard</h2>

      <p className="page-sub">
        Welcome back. Here is what is happening today.
      </p>

      {/* stat cards */}
      <div className="card-container">

        {stats.map((item, index) => (

          <div className="dashboard-card" key={index}>

            <span className="card-icon">
              {item.icon}
            </span>

            <h3>{item.title}</h3>

            <p>{item.value}</p>

          </div>
        ))}
      </div>

      {/* recent orders */}
      <div className="section-block">

        <div className="section-block-header">

          <h3>Recent Orders</h3>

          <span>
            Showing latest {orders.length} orders
          </span>

        </div>
<div className="orders-table-wrapper">
        <table className="orders-table">

          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product ID</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {orders.map((order) => (

              <tr key={order.id}>

                <td style={{ color: "var(--light)" }}>
                  #{order.id}
                </td>

                <td>{order.customerName}</td>

                <td style={{ color: "var(--light)" }}>
                  {order.productId}
                </td>

                <td>₹{order.amount}</td>

                <td>

                  <span
                    className="status-pill"
                    style={
                      statusStyle[order.status]
                    }
                  >
                    {order.status}
                  </span>

                </td>
              </tr>
            ))}
          </tbody>

        </table>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;