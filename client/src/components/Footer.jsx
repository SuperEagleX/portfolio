import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail } from 'lucide-react';
import './Footer.css';

const QUOTES = [
  { text: 'The quieter you become, the more you are able to hear.', author: 'Kali Linux' },
  { text: 'Security is not a product, but a process.', author: 'Bruce Schneier' },
  { text: 'It takes 20 years to build a reputation and a few minutes of cyber-incident to ruin it.', author: 'Stéphane Nappo' },
  { text: 'If you know the enemy and know yourself, you need not fear the result of a hundred battles.', author: 'Sun Tzu' },
  { text: 'The only truly secure system is one that is powered off, cast in a block of concrete and sealed in a lead-lined room.', author: 'Gene Spafford' },
  { text: 'Offense is the soul of defense.', author: 'Napoleon Bonaparte' },
];

function LinkedinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const SOCIALS = [
  { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/savakroth-leav/', label: 'LinkedIn' },
  { icon: Mail,         href: 'mailto:savakroth17@gmail.com',                label: 'Email'    },
];

export default function Footer() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    const t = setInterval(() => {
      setDir(1);
      setIdx(i => (i + 1) % QUOTES.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className="footer__inner">

        {/* Brand */}
        <div className="footer__brand">
          <a href="#home" className="footer__logo">
            <span className="footer__logo-bracket">&lt;</span>
            Portfolio
            <span className="footer__logo-bracket"> /&gt;</span>
          </a>
          <p className="footer__tagline">
            Breaking things professionally<br />so others don't have to.
          </p>
          <div className="footer__socials">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                className="footer__social-link"
                aria-label={label}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
          <p className="footer__availability">
            <span className="footer__avail-dot" />
            Open to opportunities
          </p>
        </div>

        {/* Rotating quotes */}
        <div className="footer__quotes-block">
          <p className="footer__quotes-label">// thoughts</p>
          <div className="footer__quotes-wrap">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.blockquote
                key={idx}
                className="footer__quote"
                custom={dir}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }}
                exit={{ opacity: 0, y: -16, transition: { duration: 0.3, ease: 'easeIn' } }}
              >
                <span className="footer__quote-mark">"</span>
                {QUOTES[idx].text}
                <span className="footer__quote-mark">"</span>
                <footer className="footer__quote-author">— {QUOTES[idx].author}</footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>
          <div className="footer__quote-dots">
            {QUOTES.map((_, i) => (
              <button
                key={i}
                className={`footer__quote-dot ${i === idx ? 'footer__quote-dot--active' : ''}`}
                onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); }}
                aria-label={`Quote ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>

      <div className="footer__bottom">
        <p className="footer__copy">© 2026 Savakroth Leav. All rights reserved.</p>
        <p className="footer__built">
          Built with <span className="footer__hl">React</span> + <span className="footer__hl">Vite</span>
        </p>
      </div>
    </motion.footer>
  );
}
