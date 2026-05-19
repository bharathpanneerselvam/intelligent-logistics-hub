import { useState } from "react";
import "../styles/Navbar.css";
import Search from "./Search";

function Navbar({ page, setPage, cartCount, user, onLogout, setSearchQuery }) {
  const links = [
    { name: "Home", path: "/" },
    { name: "Collection", path: "/collection" },
    { name: "About", path: "/about" },
  ];

  const [dropOpen, setDropOpen] = useState(false);

  return (
    <nav className="navbar">

      
      <div className="navbar-logo" onClick={() => setPage("/")}>
        FOREVER<span>.</span>
      </div>

    
      <ul className="navbar-links">
        {links.map((link) => (
          <li
            key={link.name}
            className={page === link.path ? "active" : ""}
            onClick={() => setPage(link.path)}
          >
            {link.name}
          </li>
        ))}
      </ul>

       
      <div className="navbar-icons">
        {/* SEARCH COMPONENT */}
        <Search setPage={setPage} setSearchQuery={setSearchQuery} />

        
        <div
          className="account-wrap"
          onMouseEnter={() => setDropOpen(true)}
          onMouseLeave={() => setDropOpen(false)}
        >
          <button className="icon-btn" aria-label="Account">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>

          <div
            className={
              dropOpen ? "account-dropdown active" : "account-dropdown"
            }
          >
            {user ? (
              <>
                <div className="drop-greeting">Hi, {user.name}</div>

                {user.role === "admin" && (
                  <button
                    onClick={() => {
                      setPage("admin");
                      setDropOpen(false);
                    }}
                  >
                    Admin Panel
                  </button>
                )}

                <button
                  onClick={() => {
                    onLogout();
                    setDropOpen(false);
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setPage("/login");
                    setDropOpen(false);
                  }}
                >
                  Login
                </button>

                <button
                  onClick={() => {
                    setPage("signup");
                    setDropOpen(false);
                  }}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
 
        <button
          className="icon-btn cart-btn"
          onClick={() => setPage("/cart")}
          aria-label="Cart"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>

          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
