import { useState } from "react"
import "../styles/AuthPage.css"

function SignUpPage({ onSignUp, setPage }) {

  const [form, setForm]       = useState({ name: "", email: "", password: "", confirm: "" })
  const [error, setError]     = useState("")
  const [loading, setLoading] = useState(false)   // ✅ ADD

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError("")
  }
 
  async function handleSubmit(e) {
    e.preventDefault()
 
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError("Please fill in all fields.")
      return
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.")
      return
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.")
      return
    }

    setLoading(true)
    setError("")

    try {
      await onSignUp(form)          
    } catch (err) {
      setError(err.message)         
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">

      <div className="auth-panel">
        <p className="auth-panel-tagline">
          " Join thousands of style-forward shoppers. Your wardrobe upgrade starts here. "
        </p>
      </div>

      <div className="auth-form-wrap">
        <form className="auth-form" onSubmit={handleSubmit} noValidate>

          <h2 className="auth-title">Create account</h2>
          <p className="auth-sub">It's free and only takes a minute</p>

          {error && <p className="auth-error">{error}</p>}

          <div className="form-group">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Jane Doe"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Min. 6 characters"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirm">Confirm password</label>
            <input
              id="confirm"
              type="password"
              name="confirm"
              placeholder="Repeat your password"
              value={form.confirm}
              onChange={handleChange}
            />
          </div>

          {/* ✅ CHANGED: disabled + loading text */}
          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <p className="auth-switch">
            Already have an account?{" "}
            <button type="button" className="link-btn" onClick={() => setPage("/login")}>
              Sign in
            </button>
          </p>

        </form>
      </div>
    </div>
  )
}

export default SignUpPage