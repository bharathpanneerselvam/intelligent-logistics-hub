import { products } from "../assets/assets"
import "../styles/ProductGrid.css"

function LatestCollections({ addToCart }) {
 
  const items = products.slice(0, 4)

  return (
    <section className="product-section">

      <div className="section-heading">
        <span className="label">LATEST</span>

        <h2>COLLECTIONS</h2>

        <p>
          Explore our curated selection of must-have styles,
          from chic dresses to versatile outerwear.
        </p>
      </div>

      <div className="product-grid">

        {items.map((product) => (

          <div key={product._id} className="product-card">

            <div className="product-image-wrap">

              <img
                src={product.image[0]}
                alt={product.name}
                className="product-image"
              />

              <button
                className="add-to-cart-btn"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>

            </div>

            <div className="product-info">

              <p className="product-name">
                {product.name}
              </p>

              <p className="product-price">
                ${product.price}
              </p>

            </div>

          </div>

        ))}

      </div>

    </section>
  )
}

export default LatestCollections