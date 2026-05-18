import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shield, Smartphone, Code, Server, Network, ChevronLeft, ChevronRight } from 'lucide-react';
import './Skills.css';

const CATEGORIES = [
  {
    id: 1,
    icon: Terminal,
    accent: 'cyan',
    label: 'Offensive Tooling',
    skills: ['Burp Suite', 'Metasploit', 'Nmap', 'SQLmap', 'Gobuster', 'Nikto', 'Hydra', 'WPScan', 'Dirb', 'ffuf'],
  },
  {
    id: 2,
    icon: Shield,
    accent: 'red',
    label: 'Post-Exploitation & AD',
    skills: ['BloodHound', 'Mimikatz', 'Responder', 'Impacket', 'CrackMapExec', 'Evil-WinRM', 'Rubeus', 'PowerSploit'],
  },
  {
    id: 3,
    icon: Smartphone,
    accent: 'purple',
    label: 'Mobile Pentesting',
    skills: ['MobSF', 'Frida', 'JADX', 'APKTool', 'Objection', 'drozer', 'ADB', 'Burp Suite (Mobile)'],
  },
  {
    id: 4,
    icon: Code,
    accent: 'green',
    label: 'Programming & Scripting',
    skills: ['Python', 'Bash', 'PowerShell', 'C', 'JavaScript', 'SQL'],
  },
  {
    id: 5,
    icon: Server,
    accent: 'blue',
    label: 'OS & Infrastructure',
    skills: ['Kali Linux', 'Parrot OS', 'Ubuntu Server', 'Windows Server', 'Active Directory', 'VMware', 'VirtualBox'],
  },
  {
    id: 6,
    icon: Network,
    accent: 'yellow',
    label: 'Frameworks & Standards',
    skills: ['OWASP Top 10', 'OWASP MSTG', 'MITRE ATT&CK', 'PTES', 'NIST 800-115', 'CVSS', 'CVE Research'],
  },
];

const ACCENT_MAP = {
  cyan:   { color: '#22d3ee', bg: 'rgba(34,211,238,0.07)',  border: 'rgba(34,211,238,0.2)'  },
  red:    { color: '#f87171', bg: 'rgba(248,113,113,0.07)', border: 'rgba(248,113,113,0.2)' },
  purple: { color: '#a78bfa', bg: 'rgba(167,139,250,0.07)', border: 'rgba(167,139,250,0.2)' },
  green:  { color: '#4ade80', bg: 'rgba(74,222,128,0.07)',  border: 'rgba(74,222,128,0.2)'  },
  blue:   { color: '#60a5fa', bg: 'rgba(96,165,250,0.07)',  border: 'rgba(96,165,250,0.2)'  },
  yellow: { color: '#fbbf24', bg: 'rgba(251,191,36,0.07)',  border: 'rgba(251,191,36,0.2)'  },
};

const PER_PAGE = 3;
const TOTAL_PAGES = Math.ceil(CATEGORIES.length / PER_PAGE);

const slideVariants = {
  enter: (d) => ({ x: d > 0 ? '60%' : '-60%', opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.38, ease: 'easeOut' } },
  exit:  (d) => ({ x: d > 0 ? '-60%' : '60%', opacity: 0, transition: { duration: 0.28, ease: 'easeIn' } }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Skills() {
  const [page, setPage] = useState(0);
  const [dir, setDir]   = useState(1);

  function goNext() {
    setDir(1);
    setPage(p => (p + 1) % TOTAL_PAGES);
  }

  function goPrev() {
    setDir(-1);
    setPage(p => (p - 1 + TOTAL_PAGES) % TOTAL_PAGES);
  }

  const visible = CATEGORIES.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  return (
    <section id="skills" className="skills">
      <motion.div
        className="skills__header"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
      >
        <span className="skills__tag">// 04</span>
        <h2 className="skills__title">Skills</h2>
        <div className="skills__line" />
      </motion.div>

      <div className="skills__carousel-wrap">
        {/* Prev arrow */}
        <button
          className="skills__arrow skills__arrow--prev"
          onClick={goPrev}
          aria-label="Previous"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Sliding pages */}
        <div className="skills__carousel">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={page}
              className="skills__page"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={dir}
            >
              {visible.map((cat) => {
                const ac = ACCENT_MAP[cat.accent];
                const Icon = cat.icon;
                return (
                  <div
                    key={cat.id}
                    className="skills__card"
                    style={{ '--ac': ac.color, '--ac-bg': ac.bg, '--ac-border': ac.border }}
                  >
                    <div className="skills__card-header">
                      <div className="skills__icon-wrap">
                        <Icon size={16} />
                      </div>
                      <span className="skills__cat-label">{cat.label}</span>
                    </div>
                    <div className="skills__chips">
                      {cat.skills.map(s => (
                        <span key={s} className="skills__chip">{s}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next arrow */}
        <button
          className="skills__arrow skills__arrow--next"
          onClick={goNext}
          aria-label="Next"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dots */}
      <div className="skills__dots">
        {Array.from({ length: TOTAL_PAGES }, (_, i) => (
          <button
            key={i}
            className={`skills__dot ${i === page ? 'skills__dot--active' : ''}`}
            onClick={() => { setDir(i > page ? 1 : -1); setPage(i); }}
            aria-label={`Page ${i + 1}`}
          />
        ))}
      </div>

    </section>
  );
}
