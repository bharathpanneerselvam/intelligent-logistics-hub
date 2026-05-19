import { useState } from "react"
import { products } from "../assets/assets"
import "../styles/Collection.css"

function Collection({
  addToCart,
  searchQuery
}) {

  const [category, setCategory] = useState("All")

  const [sortType, setSortType] = useState("default")
 
  let filteredProducts = [...products]
 
  if (searchQuery) {

    filteredProducts = filteredProducts.filter((product) =>

      product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())

    )

  }
 
  if (category !== "All") {

    filteredProducts = filteredProducts.filter(
      (item) => item.category === category
    )

  }
 
  if (sortType === "low-high") {

    filteredProducts.sort(
      (a, b) => a.price - b.price
    )

  }

  if (sortType === "high-low") {

    filteredProducts.sort(
      (a, b) => b.price - a.price
    )

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
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >

            <option value="All">
              All
            </option>

            <option value="Men">
              Men
            </option>

            <option value="Women">
              Women
            </option>

            <option value="Kids">
              Kids
            </option>

          </select>

        </div>
 
        <div className="filter-group">

          <label>Sort By Price</label>

          <select
            value={sortType}
            onChange={(e) =>
              setSortType(e.target.value)
            }
          >

            <option value="default">
              Default
            </option>

            <option value="low-high">
              Low to High
            </option>

            <option value="high-low">
              High to Low
            </option>

          </select>

        </div>

      </div>
 
      <div className="collection-grid">

        {filteredProducts.length > 0 ? (

          filteredProducts.map((product) => (

            <div
              key={product._id}
              className="collection-card"
            >
              <div className="collection-image-wrap">

                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="collection-image"
                />

                <button
                  className="collection-cart-btn"
                  onClick={() =>
                    addToCart(product)
                  }
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
                  ${product.price}
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
  )
}

export default Collection