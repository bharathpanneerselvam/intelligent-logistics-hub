import "../styles/Hero.css"
import {assets} from "../assets/assets.js"
function Hero({ setPage }) {
  return (
    <section className="hero">
      {/* left side */}
      <div className="hero-left">
        <div className="hero-tag">
          <span className="tag-line"></span>
          OUR BESTSELLERS
        </div>
        <h1 className="hero-title">Latest Arrivals</h1>
        <button className="hero-cta" onClick={() => setPage("/collection")}>
          SHOP NOW <span className="cta-line"></span>
        </button>
      </div>
      {/* Right side */}
      <div className="hero-right">
        <div className="hero-image-placeholder">
          <img
            src={assets.hero_img}
            alt="Hero"
            className="hero-image"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
