import { motion } from 'framer-motion';
import { Target, GraduationCap, Shield, Cpu, Zap, Award, Globe } from 'lucide-react';
import './About.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: 'easeOut' } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: 'easeOut' } },
};

const FOCUS_AREAS = [
  { icon: Shield, label: 'Offensive Security Mastery' },
  { icon: Cpu,    label: 'AI × Cybersecurity Research' },
  { icon: Zap,    label: 'Quantum Computing × Security' },
];

export default function About() {
  return (
    <section id="about" className="about">
      <motion.div
        className="about__header"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
      >
        <span className="about__tag">// 01</span>
        <h2 className="about__title">About</h2>
        <div className="about__line" />
      </motion.div>

      <div className="about__grid">

        {/* ── Overview card ────────────────────────── */}
        <motion.div
          className="about__card"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeLeft}
        >
          <div className="about__card-header">
            <Target size={15} />
            <span>OVERVIEW</span>
          </div>

          <div className="about__card-body">
            <p className="about__card-text">
              A <span className="about__hl">Cybersecurity Professional</span> with a strong
              interest in ethical hacking, penetration testing, vulnerability analysis, and
              network security. Hard-working, energetic, passionate and technical-minded
              individual.
            </p>
            <p className="about__card-text">
              Possess exceptional communication and collaboration skills with ability to
              resolve problems quickly. I aim to contribute to{' '}
              <span className="about__hl">stopping cyber criminals</span> and protecting
              digital assets.
            </p>

            <div className="about__focus">
              <span className="about__focus-label">FOCUS AREAS</span>
              <ul className="about__focus-list">
                {FOCUS_AREAS.map(({ icon: Icon, label }) => (
                  <li key={label}>
                    <Icon size={13} />
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="about__fun-fact">
              <Globe size={13} className="about__fun-fact-icon" />
              <span>
                <span className="about__fun-fact-label">FUN FACT —</span>{' '}
                I can speak <span className="about__hl">Spanish</span> · ¡Hablo español!
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Education card ───────────────────────── */}
        <motion.div
          className="about__card"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeRight}
        >
          <div className="about__card-header">
            <GraduationCap size={15} />
            <span>EDUCATION</span>
          </div>

          <div className="about__card-body about__card-body--edu">

            <div className="about__edu-entry">
              <div className="about__edu-badge">MSc</div>
              <div className="about__edu-info">
                <p className="about__edu-field about__edu-field--sm">
                  Master of <span className="about__hl">Cybersecurity</span> (Advanced)
                </p>
                <p className="about__edu-uni">Torrens University Australia</p>
                <p className="about__edu-period">Sep 2026 — Aug 2028</p>
              </div>
              <span className="about__cert-badge">ENROLLED</span>
            </div>

            <div className="about__cert-divider" />

            <div className="about__edu-entry">
              <div className="about__edu-badge">BSc</div>
              <div className="about__edu-info">
                <p className="about__edu-field">
                  <span className="about__hl">Cybersecurity</span>
                </p>
                <p className="about__edu-uni">American University of Phnom Penh</p>
              </div>
            </div>

            <div className="about__gpa-block">
              <div className="about__gpa-row">
                <span className="about__gpa-label">CUMULATIVE GPA</span>
                <span className="about__gpa-value">
                  3.77 <span className="about__gpa-max">/ 4.00</span>
                </span>
              </div>
              <div className="about__gpa-bar">
                <motion.div
                  className="about__gpa-fill"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(3.77 / 4) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: 'easeOut', delay: 0.35 }}
                />
              </div>
            </div>

            <div className="about__cert-divider" />

            <div className="about__hs-entry">
              <div className="about__hs-left">
                <div className="about__hs-badge">BAC</div>
                <div>
                  <p className="about__cert-name">Final National Bac II Examination</p>
                  <p className="about__cert-org">E2STEM · Preah Yukonthor High School</p>
                </div>
              </div>
              <span className="about__cert-badge about__cert-badge--pass">GRADE A</span>
            </div>

            <div className="about__cert-divider" />

            <div className="about__cert">
              <div className="about__cert-left">
                <Award size={18} className="about__cert-icon" />
                <div>
                  <p className="about__cert-name">
                    IELTS — Band 7.0
                  </p>
                  <p className="about__cert-org">British Council / IDP</p>
                </div>
              </div>
              <span className="about__cert-badge about__cert-badge--pass">COMPLETED</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
