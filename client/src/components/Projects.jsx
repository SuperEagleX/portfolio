import { motion } from 'framer-motion';
import { ShieldCheck, MailWarning, Radar, ExternalLink } from 'lucide-react';
import './Projects.css';

const PROJECTS = [
  {
    id: 1,
    size: 'full',
    icon: ShieldCheck,
    accent: 'blue',
    status: 'Deployed',
    title: 'Tenable Nessus Compliment Automation Toolkit',
    period: 'Jun 2026 — Aug 2026',
    bullets: [
      'Engineered an automated security assessment web application integrating with the Tenable Nessus API to streamline vulnerability workflows and daily team operations',
      'Built automated, production-ready report generation for executive sign-offs in different formats',
      'Implemented a revalidation scanning engine alongside customizable baseline hardening and configuration checking to enhance scan accuracy',
      'Successfully deployed the platform across the organization, accelerating vulnerability triage and cross-departmental remediation',
    ],
    tags: ['Tenable Nessus API', 'Automation', 'Baseline Hardening', 'Report Generation', 'Vulnerability Management'],
  },
  {
    id: 2,
    size: 'md',
    icon: MailWarning,
    accent: 'red',
    status: 'Complete',
    title: 'Phishing Security Assessment Web Tool',
    period: 'Aug 2025 — Dec 2025',
    bullets: [
      'Designed and developed a phishing simulation tool to emulate real-world phishing campaigns for security awareness testing',
      'Created and deployed 20+ simulated phishing emails (credential harvesting, malicious links, attachment-based lures) targeting test users',
      'Tracked and analyzed user interactions, achieving open, click, and credential submission metrics to identify high-risk behaviors',
    ],
    tags: ['Phishing Simulation', 'Security Awareness', 'Email Campaigns', 'Engagement Metrics'],
    github: 'https://github.com/SuperEagleX/Final-Year-Project',
  },
  {
    id: 3,
    size: 'md',
    icon: Radar,
    accent: 'green',
    status: 'Complete',
    title: 'Network Intrusion Detection System Web Tool',
    period: 'Sep 2024 — Nov 2024',
    bullets: [
      'Led a team of 5 members in developing a Python-based Network Intrusion Detection System (NIDS) designed for home networks and small businesses',
      'Captured and analyzed real-time network traffic using Scapy, detecting anomalies in TCP, UDP, and ICMP packets with an accuracy of 85–90%',
      'Implemented machine learning-based intrusion detection, processing over 10,000+ data packets for threat classification',
    ],
    tags: ['Python', 'Scapy', 'Machine Learning', 'Anomaly Detection', 'Team Lead'],
  },
];

const ACCENT_MAP = {
  cyan:   { color: '#22d3ee', bg: 'rgba(34,211,238,0.07)',  border: 'rgba(34,211,238,0.2)'  },
  green:  { color: '#4ade80', bg: 'rgba(74,222,128,0.07)',  border: 'rgba(74,222,128,0.2)'  },
  purple: { color: '#a78bfa', bg: 'rgba(167,139,250,0.07)', border: 'rgba(167,139,250,0.2)' },
  red:    { color: '#f87171', bg: 'rgba(248,113,113,0.07)', border: 'rgba(248,113,113,0.2)' },
  yellow: { color: '#fbbf24', bg: 'rgba(251,191,36,0.07)',  border: 'rgba(251,191,36,0.2)'  },
  blue:   { color: '#60a5fa', bg: 'rgba(96,165,250,0.07)',  border: 'rgba(96,165,250,0.2)'  },
};

const STATUS_COLOR = { Active: '#4ade80', Ongoing: '#22d3ee', Complete: '#a78bfa', Deployed: '#4ade80' };

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Projects() {
  return (
    <section id="projects" className="proj">
      <motion.div
        className="proj__header"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
      >
        <span className="proj__tag">// 03</span>
        <h2 className="proj__title">Projects</h2>
        <div className="proj__line" />
      </motion.div>

      <div className="proj__bento">
        {PROJECTS.map((p, i) => {
          const ac = ACCENT_MAP[p.accent];
          const Icon = p.icon;
          return (
            <motion.div
              key={p.id}
              className={`proj__card proj__card--${p.size}`}
              style={{ '--ac': ac.color, '--ac-bg': ac.bg, '--ac-border': ac.border }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className="proj__card-top">
                <div className="proj__icon-wrap">
                  <Icon size={18} />
                </div>
                <span
                  className="proj__status"
                  style={{ color: STATUS_COLOR[p.status] }}
                >
                  ● {p.status}
                </span>
              </div>

              <div className="proj__title-block">
                <h3 className="proj__name">{p.title}</h3>
                <p className="proj__period">{p.period}</p>
              </div>

              <ul className="proj__bullets">
                {p.bullets.map((b, j) => (
                  <li key={j} className="proj__bullet">{b}</li>
                ))}
              </ul>

              <div className="proj__footer">
                <div className="proj__tags">
                  {p.tags.map(t => (
                    <span key={t} className="proj__tag-pill">{t}</span>
                  ))}
                </div>
                {p.github && (
                  <a
                    href={p.github}
                    className="proj__link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View on GitHub"
                  >
                    <ExternalLink size={15} />
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
