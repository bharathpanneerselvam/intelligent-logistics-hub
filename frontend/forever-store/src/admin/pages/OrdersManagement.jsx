import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/OrdersManagement.css";
function OrdersManagement() {

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

  async function updateStatus(id, status) {

    try {

      await axios.put(
        `http://localhost:8080/api/orders/${id}/status?value=${status}`
      );

      fetchOrders();

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="dashboard-container">

      <h2>Orders Management</h2>

      <table className="forecast-table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Product ID</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {orders.map((order) => (

            <tr key={order.id}>

              <td>{order.id}</td>

              <td>{order.customerName}</td>

              <td>{order.productId}</td>

              <td>${order.amount}</td>

              <td>{order.status}</td>

              <td>

                <button
                  onClick={() =>
                    updateStatus(order.id, "SHIPPED")
                  }
                >
                  Ship
                </button>

                <button
                  onClick={() =>
                    updateStatus(order.id, "DELIVERED")
                  }
                >
                  Deliver
                </button>

              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default OrdersManagement;