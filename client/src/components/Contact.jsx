import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import './Contact.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

function LinkedinIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const INFO_ITEMS = [
  { icon: Mail,    label: 'Email',        value: 'savakroth17@gmail.com', href: 'mailto:savakroth17@gmail.com' },
  { icon: LinkedinIcon, label: 'LinkedIn',    value: 'savakroth-leav',        href: 'https://www.linkedin.com/in/savakroth-leav/' },
  { icon: MapPin,  label: 'Location',     value: 'Phnom Penh, Cambodia',  href: null },
  { icon: Clock,   label: 'Response',     value: 'Within 24 hours',       href: null },
];

export default function Contact() {
  const [form, setForm]       = useState({ name: '', email: '', message: '' });
  const [status, setStatus]   = useState('idle'); // idle | loading | success | error
  const [errMsg, setErrMsg]   = useState('');

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setErrMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrMsg(err.message);
    }
  }

  return (
    <section id="contact" className="contact">
      <motion.div
        className="contact__header"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
      >
        <span className="contact__tag">// 08</span>
        <h2 className="contact__title">Contact</h2>
        <div className="contact__line" />
      </motion.div>

      <div className="contact__grid">

        {/* ── Info column ───────────────────── */}
        <motion.div
          className="contact__info"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h3 className="contact__info-heading">Let's Connect</h3>
          <p className="contact__info-sub">
            Have a security concern, collaboration idea, or just want to talk offensive security?
            Drop a message and I'll get back to you.
          </p>

          <ul className="contact__info-list">
            {INFO_ITEMS.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="contact__info-item">
                <div className="contact__info-icon">
                  <Icon size={16} />
                </div>
                <div>
                  <span className="contact__info-label">{label}</span>
                  {href
                    ? <a
                        href={href}
                        className="contact__info-value contact__info-value--link"
                        target={href.startsWith('mailto') ? undefined : '_blank'}
                        rel="noopener noreferrer"
                      >{value}</a>
                    : <span className="contact__info-value">{value}</span>
                  }
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* ── Form column ───────────────────── */}
        <motion.div
          className="contact__form-wrap"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {status === 'success' ? (
            <div className="contact__success">
              <CheckCircle size={40} className="contact__success-icon" />
              <h4>Message Sent!</h4>
              <p>I'll get back to you within 24 hours.</p>
              <button className="contact__reset" onClick={() => setStatus('idle')}>
                Send another
              </button>
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="contact__row">
                <div className="contact__field">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    required
                    disabled={status === 'loading'}
                  />
                </div>
                <div className="contact__field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    disabled={status === 'loading'}
                  />
                </div>
              </div>

              <div className="contact__field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Tell me about your project or security concern..."
                  value={form.message}
                  onChange={handleChange}
                  required
                  disabled={status === 'loading'}
                />
              </div>

              {status === 'error' && (
                <div className="contact__error">
                  <AlertCircle size={15} />
                  {errMsg}
                </div>
              )}

              <motion.button
                type="submit"
                className="contact__submit"
                disabled={status === 'loading'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {status === 'loading' ? (
                  <span className="contact__spinner" />
                ) : (
                  <><Send size={16} /> Send Message</>
                )}
              </motion.button>
            </form>
          )}
        </motion.div>

      </div>
    </section>
  );
}
