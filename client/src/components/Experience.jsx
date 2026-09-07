import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import './Experience.css';

const JOBS = [
  {
    id: 1,
    role: 'Officer, IT Security (Pentest)',
    company: 'Canadia Bank Cambodia',
    period: 'May 2026 — Aug 2026',
    current: false,
    bullets: [
      'Conducted vulnerability assessments across internal systems and banking infrastructure using Tenable Nessus, triaging findings by CVSS severity and tracking remediation to closure',
      'Performed web application penetration tests against internal and customer-facing platforms, uncovering critical vulnerabilities including SQL Injection that posed direct risk to sensitive financial data',
      'Orchestrated email phishing simulation campaigns using GoPhish to measure employee susceptibility, report click-through metrics to management, and drive targeted security awareness training',
      'Executed network infrastructure assessments across segmented VLANs and core banking subnets, uncovering misconfigurations that reduced the network attack surface',
      'Delivered detailed VAPT reports with CVSS-scored findings, proof-of-concept exploits, and actionable remediation roadmaps for stakeholders',
    ],
  },
  {
    id: 2,
    role: 'Offensive Security Intern',
    company: 'Cambodia Ministry of Posts and Telecommunications',
    period: 'May 2025 — Jul 2025',
    current: false,
    bullets: [
      'Penetration-tested 12 government web portals, uncovering 28 critical/high-severity vulnerabilities',
      'Exploited OWASP Top 10 flaws including SQLi, XSS, IDOR, and SSRF across staging and production targets',
      'Delivered structured VAPT reports that reduced client remediation cycle time by 40%',
      'Performed network reconnaissance across /24 subnets using Nmap, Nessus, and Burp Suite',
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Experience() {
  return (
    <section id="experience" className="exp">
      <motion.div
        className="exp__header"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
      >
        <span className="exp__tag">// 02</span>
        <h2 className="exp__title">Experience</h2>
        <div className="exp__line" />
      </motion.div>

      <div className="exp__timeline">
        {JOBS.map((job, i) => (
          <motion.div
            key={job.id}
            className="exp__entry"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.12 }}
          >
            <div className={`exp__dot ${job.current ? 'exp__dot--active' : ''}`} />

            <div className={`exp__card ${job.current ? 'exp__card--current' : ''}`}>
              <div className="exp__card-top">
                <div className="exp__role-wrap">
                  <Briefcase size={14} className="exp__icon" />
                  <h3 className="exp__role">{job.role}</h3>
                </div>
                {job.current && (
                  <span className="exp__badge-current">CURRENT</span>
                )}
              </div>

              <p className="exp__company">{job.company}</p>
              <p className="exp__period">{job.period}</p>

              <ul className="exp__bullets">
                {job.bullets.map((b, j) => (
                  <li key={j} className="exp__bullet">{b}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
