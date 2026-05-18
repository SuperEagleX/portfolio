import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home',          href: '#home'          },
  { label: 'About',         href: '#about'         },
  { label: 'Experience',    href: '#experience'    },
  { label: 'Projects',      href: '#projects'      },
  { label: 'Skills',        href: '#skills'        },
  { label: 'Certifications',href: '#certifications'},
  { label: 'Competitions',  href: '#competitions'  },
  { label: 'Volunteer',     href: '#volunteer'     },
  { label: 'Contact',       href: '#contact'       },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('#home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <a href="#home" className="navbar__logo">
        <span className="navbar__logo-bracket">&lt;</span>
        <span className="navbar__logo-name">Portfolio</span>
        <span className="navbar__logo-bracket"> /&gt;</span>
      </a>

      <ul className="navbar__links">
        {NAV_LINKS.map(({ label, href }) => (
          <li key={href}>
            <a
              href={href}
              className={`navbar__link ${active === href ? 'navbar__link--active' : ''}`}
              onClick={() => setActive(href)}
            >
              {label}
              <span className="navbar__link-underline" />
            </a>
          </li>
        ))}
      </ul>

      <div className="navbar__actions">
        <a
          href="/Savakroth_Leav_Resume_PenTest.pdf"
          download
          className="navbar__cv-btn"
          aria-label="Download CV"
        >
          <Download size={14} />
          <span>CV</span>
        </a>

        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            className="navbar__mobile"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="navbar__mobile-link"
                  onClick={() => { setMenuOpen(false); setActive(href); }}
                >
                  {label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
