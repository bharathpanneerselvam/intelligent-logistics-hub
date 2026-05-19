import "../styles/Policies.css"

const policies = [
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
        <polyline points="21 3 21 9 15 9"/>
      </svg>
    ),
    title: "Easy Exchange Policy",
    desc: "We offer hassle free exchange policy",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="m9 12 2 2 4-4"/>
      </svg>
    ),
    title: "7 Days Return Policy",
    desc: "We provide 7 days free return policy",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
      </svg>
    ),
    title: "Best Customer Support",
    desc: "We provide 24/7 customer support",
  },
]

function Policies() {
  return (
    <section className="policies">
      {policies.map((p, i) => (
        <div key={i} className="policy-item">
          <div className="policy-icon">{p.icon}</div>
          <p className="policy-title">{p.title}</p>
          <p className="policy-desc">{p.desc}</p>
        </div>
      ))}
    </section>
  )
}

export default Policies
