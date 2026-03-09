import LogoIcon from '../Navbar/LogoIcon'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <LogoIcon size={18} />
          <span className="footer__name">DataMind</span>
        </div>
        <p className="footer__copy">© {new Date().getFullYear()} DataMind. All rights reserved.</p>
        <div className="footer__links">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#docs">Docs</a>
        </div>
      </div>
    </footer>
  )
}
