import { motion } from 'framer-motion';
import { Shield, ExternalLink } from 'lucide-react';
import './Projects.css';

const PROJECTS = [
  {
    id: 1,
    size: 'featured',
    icon: Shield,
    accent: 'blue',
    status: 'Complete',
    title: 'PhishNet — Security Awareness Training Platform',
    description:
      'Final-year capstone: a web platform for running controlled phishing simulations against employees, tracking engagement metrics (opens, clicks, credential captures), and delivering 8 security training modules with automated employee risk scoring. Integrated GoPhish with custom SMTP/Gmail for campaign delivery.',
    tags: ['Python', 'Flask', 'SQLite', 'GoPhish', 'HTML/JS', 'Security Awareness'],
    github: 'https://github.com/SuperEagleX/Final-Year-Project',
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

const STATUS_COLOR = { Active: '#4ade80', Ongoing: '#22d3ee', Complete: '#a78bfa' };

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

              <h3 className="proj__name">{p.title}</h3>
              <p className="proj__desc">{p.description}</p>

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
