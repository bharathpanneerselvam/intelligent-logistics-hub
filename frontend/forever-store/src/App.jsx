import { useState } from "react"
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation
} from "react-router-dom"
import axios from "axios"                     

import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Collection from "./pages/Collection"
import About from "./pages/About"

import LatestCollections from "./components/LatestCollections"
import BestSellers from "./components/BestSellers"
import Policies from "./components/Policies"
import Footer from "./components/Footer"
import CartPage from "./pages/CartPage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import Dashboard from "./admin/pages/Dashboard"
import Forecast from "./admin/pages/Forecast"
import Inspection from "./admin/pages/Inspection"

import Sidebar from "./admin/components/Sidebar"
import AdminNavbar from "./admin/components/Navbar"
import "./styles/global.css"
import "./admin/styles/App.css"
import "./admin/styles/Sidebar.css"
import "./admin/styles/Dashboard.css"
import "./admin/styles/Forecast.css"
import "./admin/styles/Inspection.css"
import OrdersManagement from "./admin/pages/OrdersManagement";

function AdminLayout() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-section">
        <AdminNavbar />
        <div className="page-content">
          <Routes>
            <Route path="/"           element={<Dashboard />} />
            <Route path="/forecast"   element={<Forecast />} />
            <Route path="/inspection" element={<Inspection />} />
            <Route path="/orders" element={<OrdersManagement />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

function AppContent() {

  const navigate = useNavigate()
  const location = useLocation()

  const [cart, setCart] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
 
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token")
    const email = localStorage.getItem("email")
    const role  = localStorage.getItem("role")
    if (token && email && role) {
      return { name: email.split("@")[0], email, role, token }
    }
    return null
  })
 

  function addToCart(product) {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id)
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  function increaseQty(id) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    )
  }

  function decreaseQty(id) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    )
  }
  
  async function handleLogin(credentials) {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email:    credentials.email,
          password: credentials.password,
        }
      )

      const { token, email, role } = response.data
 
      localStorage.setItem("token", token)
      localStorage.setItem("email", email)
      localStorage.setItem("role",  role)
 
      setUser({ name: email.split("@")[0], email, role, token })
 
      navigate(role === "ADMIN" ? "/admin" : "/")

    } catch (err) { 
      const message = err.response?.data || "Login failed. Check backend."
      throw new Error(message)
    }
  }
 
  async function handleSignUp(data) {
    try {
      await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          email:    data.email,
          password: data.password,
          role:     "USER",
        }
      )
 
      navigate("/login")

    } catch (err) {
      const message = err.response?.data || "Sign up failed. Check backend."
      throw new Error(message)
    }
  }
 
  function handleLogout() {
    localStorage.removeItem("token")
    localStorage.removeItem("email")
    localStorage.removeItem("role")
    setUser(null)
    navigate("/")
  }

  const isAdmin = user?.role === "ADMIN"

  const hideShell =
    location.pathname === "/login"  ||
    location.pathname === "/signup" ||
    location.pathname.startsWith("/admin")

  const cartCount = cart.reduce((total, item) => total + item.qty, 0)

  return (
    <div>
 
      {!hideShell && (
        <Navbar
          page={location.pathname}
          setPage={navigate}
          cartCount={cartCount}
          user={user}
          onLogout={handleLogout}
          setSearchQuery={setSearchQuery}
        />
      )}
 
      <Routes>
 
        <Route
          path="/"
          element={
            <>
              <Hero setPage={navigate} />
              <LatestCollections addToCart={addToCart} />
              <BestSellers addToCart={addToCart} />
              <Policies />
            </>
          }
        />
 
        <Route
          path="/collection"
          element={<Collection addToCart={addToCart} searchQuery={searchQuery} />}
        />
 
        <Route path="/about" element={<About />} />
 
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              removeFromCart={removeFromCart}
              increaseQty={increaseQty}
              decreaseQty={decreaseQty}
              setPage={navigate}
              setCart={setCart}
            />
          }
        />
 
        <Route
          path="/login"
          element={<LoginPage onLogin={handleLogin} setPage={navigate} />}
        /> 
        <Route
          path="/signup"
          element={<SignUpPage onSignUp={handleSignUp} setPage={navigate} />}
        />
 
        <Route
          path="/admin/*"
          element={isAdmin ? <AdminLayout /> : <Navigate to="/login" />}
        />

      </Routes>
 
      {!hideShell && <Footer />}

    </div>
  )
}
 
function App() {
  return <AppContent />
}

export default App