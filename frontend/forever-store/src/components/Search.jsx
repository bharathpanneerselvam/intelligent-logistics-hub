import { useState } from "react"
import { products } from "../assets/assets"
import "../styles/Search.css"

function Search({ setPage, setSearchQuery }) {

  const [searchOpen, setSearchOpen] = useState(false)

  const [searchText, setSearchText] = useState("")

  
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  )

  
  function handleSearch(e) {

    if (e.key === "Enter") {

      setSearchQuery(searchText)

      setPage("/collection")

      setSearchOpen(false)

    }

  }

  
  function openCollection(productName) {

    setSearchQuery(productName)

    setPage("collection")

    setSearchOpen(false)

  }

  return (
    <div className="search-container">
      
      <button
        className="icon-btn"
        onClick={() => setSearchOpen(prev => !prev)}
      >

        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>

      </button>


      {searchOpen && (

        <div className="search-dropdown">

          <input
            type="text"
            placeholder="Search products..."
            value={searchText}
            onChange={(e) =>
              setSearchText(e.target.value)
            }
            onKeyDown={handleSearch}
            autoFocus
          />


          {searchText && (

            <div className="search-results">

              {filteredProducts.length > 0 ? (

                filteredProducts
                  .slice(0, 6)
                  .map(product => (

                    <div
                      key={product._id}
                      className="search-item"
                      onClick={() =>
                        openCollection(product.name)
                      }
                    >

                      <img
                        src={product.image[0]}
                        alt={product.name}
                      />

                      <div>

                        <p className="search-name">
                          {product.name}
                        </p>

                        <p className="search-price">
                          ${product.price}
                        </p>

                      </div>

                    </div>

                  ))

              ) : (

                <p className="no-results">
                  No products found
                </p>

              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Search