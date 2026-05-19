import { useState } from "react"
import "../styles/AuthPage.css"

function LoginPage({ onLogin, setPage }) {

  const [form, setForm]       = useState({ email: "", password: "" })
  const [error, setError]     = useState("")
  const [loading, setLoading] = useState(false)    

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError("")
  }
 
  async function handleSubmit(e) {
    e.preventDefault()

    if (!form.email || !form.password) {
      setError("Please fill in all fields.")
      return
    }

    setLoading(true)
    setError("")

    try {
      await onLogin(form)          
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
          " Style is a way to say who you are without having to speak. "
        </p>
      </div>

      <div className="auth-form-wrap">
        <form className="auth-form" onSubmit={handleSubmit} noValidate>

          <h2 className="auth-title">Welcome back</h2>
          <p className="auth-sub">Sign in to your account</p>

          {error && <p className="auth-error">{error}</p>}

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
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-forgot">
            <span>Forgot password?</span>
          </div>
 
          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="auth-switch">
            Don't have an account?{" "}
            <button type="button" className="link-btn" onClick={() => setPage("/signup")}>
              Create one
            </button>
          </p>

        </form>
      </div>
    </div>
  )
}

export default LoginPage