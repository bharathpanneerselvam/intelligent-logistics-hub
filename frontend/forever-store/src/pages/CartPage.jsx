import axios from "axios";
import { useState } from "react";
import "../styles/CartPage.css";
import { imageMap } from "../assets/assets";
function CartPage({
  cart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  setPage,
  setCart,
}) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  return (
    <div className="cart-page">
      <div className="cart-header">
        <h2>Your Cart</h2>
        <button className="back-btn" onClick={() => setPage("/")}>
          ← Continue Shopping
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty.</p>
          <button className="shop-btn" onClick={() => setPage("/")}>
            Shop Now
          </button>
        </div>
      ) : (
        <div className="cart-content">
          {/* cart items */}
          <div className="cart-items">
            <div className="cart-table-header">
              <span>Product</span>
              <span>Price</span>
              <span>Qty</span>
              <span>Total</span>
              <span></span>
            </div>

            {cart.map((item) => (
              <div key={item.id} className="cart-row">
                <div className="cart-product-info">
                  <img
                    src={imageMap[item.image]}
                    alt={item.name}
                    className="cart-image"
                  />
                  <span className="cart-name">{item.name}</span>
                </div>
                <span className="cart-cell">₹{item.price}</span>
                <div className="qty-controls">
                  <button onClick={() => decreaseQty(item.id)}>-</button>

                  <span>{item.qty}</span>

                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>
                <span className="cart-cell">₹{item.price * item.qty}</span>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Remove item"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              className="checkout-btn"
              onClick={async () => {
                try {
                  const customerName = localStorage.getItem("email");

                  for (const item of cart) {
                    await axios.post("http://localhost:8080/api/orders", {
                      customerName,
                      productId: item.id,
                      amount: item.price * item.qty,
                    });
                  }

                  setOrderPlaced(true);

                  setCart([]);

                  setTimeout(() => {
                    window.location.reload();
                  }, 2000);
                } catch (err) {
                  console.log(err);
                  console.log(err.response?.data);
                  console.log(err.message);
                  alert("Failed to place order");
                }
              }}
            >
              Proceed to Payout
            </button>

            {orderPlaced && (
              <p className="order-success">✅ Order placed successfully!</p>
            )}

            {/* promo code */}
            <div className="promo-wrap">
              <input
                type="text"
                placeholder="Promo code"
                className="promo-input"
              />
              <button className="promo-btn">Apply</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
