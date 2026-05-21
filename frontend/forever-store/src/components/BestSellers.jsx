import { useEffect, useState } from "react";
import { imageMap } from "../assets/assets";
import "../styles/BestSellers.css";
import "../styles/ProductGrid.css";

function BestSellers({ addToCart }) {

  // PRODUCTS FROM BACKEND
  const [products, setProducts] = useState([]);

  // FETCH PRODUCTS
  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const response = await fetch(
          "http://localhost:8080/api/products"
        );

        const data = await response.json();

        setProducts(data);

      } catch (error) {

        console.log("Error fetching products:", error);

      }

    };

    fetchProducts();

  }, []);

  // FILTER BESTSELLERS
  const items = products
    .filter((item) => item.bestseller)
    .slice(0, 5);

  return (

    <section className="product-section bestsellers-section">

      <div className="section-heading">

        <span className="label">BEST</span>

        <h2>SELLERS</h2>

        <p>
          A must-have in every wardrobe, these high-waisted jeans
          offer the perfect blend of comfort and edge.
        </p>

      </div>

      <div className="product-grid-5">

        {items.map((product) => (

          <div
            key={product.id}
            className="product-card"
          >

            <div className="product-image-wrap">

              <img
                src={imageMap[product.image]}
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
                ₹{product.price}
              </p>

            </div>

          </div>

        ))}

      </div>

    </section>

  );

}

export default BestSellers;