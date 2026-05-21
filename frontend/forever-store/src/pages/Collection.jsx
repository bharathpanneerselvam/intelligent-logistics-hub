import { useEffect, useState } from "react";
import "../styles/Collection.css";
import { imageMap } from "../assets/assets";

function Collection({ addToCart, searchQuery }) {

  // PRODUCTS FROM BACKEND
  const [products, setProducts] = useState([]);

  const [category, setCategory] = useState("All");

  const [sortType, setSortType] = useState("default");

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

  let filteredProducts = [...products];

  // SEARCH FILTER
  if (searchQuery) {

    filteredProducts = filteredProducts.filter((product) =>
      product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );

  }

  // CATEGORY FILTER
  if (category !== "All") {

    filteredProducts = filteredProducts.filter(
      (item) => item.category === category
    );

  }

  // SORT LOW TO HIGH
  if (sortType === "low-high") {

    filteredProducts.sort(
      (a, b) => a.price - b.price
    );

  }

  // SORT HIGH TO LOW
  if (sortType === "high-low") {

    filteredProducts.sort(
      (a, b) => b.price - a.price
    );

  }

  return (

    <section className="collection">

      <div className="collection-header">

        <h1>All Collections</h1>

        {searchQuery && (

          <div>

            <p>
              Search results for:
              <span> "{searchQuery}" </span>
            </p>

          </div>

        )}

      </div>

      <div className="collection-filters">

        <div className="filter-group">

          <label>Category</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >

            <option value="All">All</option>

            <option value="Men">Men</option>

            <option value="Women">Women</option>

            <option value="Kids">Kids</option>

          </select>

        </div>

        <div className="filter-group">

          <label>Sort By Price</label>

          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >

            <option value="default">Default</option>

            <option value="low-high">Low to High</option>

            <option value="high-low">High to Low</option>

          </select>

        </div>

      </div>

      <div className="collection-grid">

        {filteredProducts.length > 0 ? (

          filteredProducts.map((product) => (

            <div
              key={product.id}
              className="collection-card"
            >

              <div className="collection-image-wrap">

                <img
                  src={imageMap[product.image]}
                  alt={product.name}
                  className="collection-image"
                />

                <button
                  className="collection-cart-btn"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>

              </div>

              <div className="collection-info">

                <p className="collection-name">
                  {product.name}
                </p>

                <p className="collection-category">
                  {product.category}
                </p>

                <p className="collection-price">
                  ₹{product.price}
                </p>

              </div>

            </div>

          ))

        ) : (

          <div className="no-products">

            <h2>No Products Found</h2>

            <p>
              Try searching with another keyword.
            </p>

          </div>

        )}

      </div>

    </section>

  );

}

export default Collection;