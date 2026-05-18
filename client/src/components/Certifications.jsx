import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import './Certifications.css';

const CERTS = [
  {
    id: 1,
    acronym: 'CPTS',
    name: 'Certified Penetration Testing Specialist',
    issuer: 'HackTheBox',
    period: '2025 — Present',
    status: 'IN PROGRESS',
    active: true,
    domains: ['Web App Pentesting', 'Network Pentesting', 'Active Directory', 'Privilege Escalation', 'Post-Exploitation', 'Report Writing'],
  },
  {
    id: 4,
    acronym: 'BSCP',
    name: 'Burp Suite Certified Practitioner',
    issuer: 'PortSwigger',
    period: 'Planned',
    status: 'PLANNED',
    active: false,
    domains: ['Web Vulnerabilities', 'Burp Suite Advanced', 'Business Logic Flaws', 'Access Control', 'SSRF', 'XSS'],
  },
  {
    id: 2,
    acronym: 'CBBH',
    name: 'Certified Bug Bounty Hunter',
    issuer: 'HackTheBox',
    period: 'Planned',
    status: 'PLANNED',
    active: false,
    domains: ['Web Exploitation', 'Bug Bounty Methodology', 'OWASP Top 10', 'Recon'],
  },
  {
    id: 3,
    acronym: 'OSCP',
    name: 'Offensive Security Certified Professional',
    issuer: 'Offensive Security',
    period: 'Planned',
    status: 'PLANNED',
    active: false,
    domains: ['Exploit Development', 'Buffer Overflow', 'AD Attacks', 'Reporting'],
  },
];

const STATUS_STYLE = {
  'IN PROGRESS': { color: '#fbbf24', bg: 'rgba(251,191,36,0.08)',  border: 'rgba(251,191,36,0.3)'  },
  'PLANNED':     { color: '#94a3b8', bg: 'rgba(148,163,184,0.06)', border: 'rgba(148,163,184,0.2)' },
  'COMPLETED':   { color: '#4ade80', bg: 'rgba(74,222,128,0.08)',  border: 'rgba(74,222,128,0.3)'  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Certifications() {
  return (
    <section id="certifications" className="certs">
      <motion.div
        className="certs__header"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
      >
        <span className="certs__tag">// 05</span>
        <h2 className="certs__title">Certifications</h2>
        <div className="certs__line" />
      </motion.div>

      <div className="certs__timeline">
        {CERTS.map((cert, i) => {
          const st = STATUS_STYLE[cert.status] ?? STATUS_STYLE['PLANNED'];
          return (
            <motion.div
              key={cert.id}
              className="certs__entry"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.12 }}
            >
              <div className={`certs__dot ${cert.active ? 'certs__dot--active' : ''}`} />

              <div className={`certs__card ${cert.active ? 'certs__card--active' : ''}`}>
                <div className="certs__card-top">
                  <div className="certs__left">
                    <div className="certs__badge">
                      <Award size={13} />
                      <span>{cert.acronym}</span>
                    </div>
                    <div className="certs__info">
                      <h3 className="certs__name">{cert.name}</h3>
                      <p className="certs__issuer">{cert.issuer}</p>
                    </div>
                  </div>
                  <div className="certs__right">
                    <span
                      className="certs__status"
                      style={{ color: st.color, background: st.bg, borderColor: st.border }}
                    >
                      {cert.status}
                    </span>
                    <p className="certs__period">{cert.period}</p>
                  </div>
                </div>

                <div className="certs__domains">
                  {cert.domains.map(d => (
                    <span key={d} className="certs__domain">{d}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
