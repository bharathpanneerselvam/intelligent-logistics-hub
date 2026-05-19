import "../styles/Dashboard.css";
 
const stats = [
  { icon: "📦", title: "Total Orders",     value: "1,250" },
  { icon: "💰", title: "Revenue",          value: "$24,500" },
  { icon: "🚨", title: "Damaged Packages", value: "18" },
  { icon: "📈", title: "Forecasted Sales", value: "$12,300" },
];

const recentOrders = [
  { id: "#ORD-001", customer: "Alice Johnson", product: "Cotton Top",     amount: "$100", status: "Delivered" },
  { id: "#ORD-002", customer: "Bob Smith",     product: "Pure T-Shirt",   amount: "$200", status: "Pending"   },
  { id: "#ORD-003", customer: "Carol White",   product: "Floral Top",     amount: "$150", status: "Shipped"   },
  { id: "#ORD-004", customer: "Dan Brown",     product: "Polo Shirt",     amount: "$180", status: "Pending"   },
];
 
const statusStyle = {
  Delivered: { background: "#e8f5e9", color: "#2e7d32" },
  Pending:   { background: "#fff3e0", color: "#e65100" },
  Shipped:   { background: "#e3f2fd", color: "#1565c0" },
  Cancelled: { background: "#fce4ec", color: "#c62828" },
};

function Dashboard() {
  return (
    <div className="dashboard-page">

      <h2>Dashboard</h2>
      <p className="page-sub">Welcome back. Here is what is happening today.</p>

      {/* stat cards */}
      <div className="card-container">
        {stats.map((item, index) => (
          <div className="dashboard-card" key={index}>
            <span className="card-icon">{item.icon}</span>
            <h3>{item.title}</h3>
            <p>{item.value}</p>
          </div>
        ))}
      </div>
 
      <div className="section-block">
        <div className="section-block-header">
          <h3>Recent Orders</h3>
          <span>Showing last 4 orders</span>
        </div>

        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id}>
                <td style={{ color: "var(--light)" }}>{order.id}</td>
                <td>{order.customer}</td>
                <td style={{ color: "var(--light)" }}>{order.product}</td>
                <td>{order.amount}</td>
                <td>
                  <span
                    className="status-pill"
                    style={statusStyle[order.status]}
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
  );
}

export default Dashboard;
