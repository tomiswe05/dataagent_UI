import { useState } from 'react'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import LogoIcon from './LogoIcon'
import './Navbar.css'

const NAV_LINKS = ['Features', 'Pricing', 'Docs']

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <nav className="navbar">
        {/* Logo */}
        <div className="navbar__brand">
          <LogoIcon size={24} />
          <span className="navbar__name">DataMind</span>
        </div>

        {/* Desktop center links */}
        <ul className="navbar__links">
          {NAV_LINKS.map(link => (
            <li key={link}>
              <a href={`#${link.toLowerCase()}`} className="navbar__link">
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop right actions */}
        <div className="navbar__actions">
          <button className="navbar__theme-btn" onClick={toggle} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="navbar__login">Log in</button>
          <button className="navbar__try">Try Free</button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="mobile-menu">
          {/* Header */}
          <div className="mobile-menu__header">
            <div className="navbar__brand">
              <LogoIcon size={22} />
              <span className="navbar__name navbar__name--large">DataMind</span>
            </div>
            <button
              className="mobile-menu__close"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <div className="mobile-menu__divider" />

          {/* Nav links */}
          <ul className="mobile-menu__links">
            {NAV_LINKS.map(link => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="mobile-menu__link"
                  onClick={() => setMenuOpen(false)}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <div className="mobile-menu__divider" />

          {/* Footer actions */}
          <div className="mobile-menu__footer">
            <button className="mobile-menu__theme-btn" onClick={toggle} aria-label="Toggle theme">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="navbar__login">Log in</button>
            <button className="navbar__try">Try Free</button>
          </div>
        </div>
      )}
    </>
  )
}
