import "../styles/Footer.css"

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">FOREVER<span>.</span></div>
          <p className="footer-tagline">
            Your go-to destination for timeless fashion that blends style, comfort, and quality.
          </p>
        </div>

        <div className="footer-col">
          <h4>COMPANY</h4>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>GET IN TOUCH</h4>
          <ul>
            <li>+91 9025364494</li>
            <li>bharathpanneerselvam.it@gmail.com</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Forever. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
