import "../styles/CartPage.css";

function CartPage({ cart, removeFromCart, increaseQty, decreaseQty, setPage }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

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
              <div key={item._id} className="cart-row">
                <div className="cart-product-info">
                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className="cart-image"
                  />
                  <span className="cart-name">{item.name}</span>
                </div>
                <span className="cart-cell">${item.price}</span>
                <div className="qty-controls">
                  <button onClick={() => decreaseQty(item._id)}>-</button>

                  <span>{item.qty}</span>

                  <button onClick={() => increaseQty(item._id)}>+</button>
                </div>
                <span className="cart-cell">${item.price * item.qty}</span>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item._id)}
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
              <span>${total}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>${total}</span>
            </div>

            <button className="checkout-btn">Proceed to Checkout</button>

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
