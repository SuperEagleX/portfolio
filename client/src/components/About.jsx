import { motion } from 'framer-motion';
import { Target, BookOpen, Shield, Cpu, Zap, Award, Globe } from 'lucide-react';
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

        {/* ── Mission card ─────────────────────────── */}
        <motion.div
          className="about__card"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeLeft}
        >
          <div className="about__card-header">
            <Target size={15} />
            <span>MISSION OBJECTIVE</span>
          </div>

          <div className="about__card-body">
            <p className="about__card-text">
              Aspiring to become a world-class expert in{' '}
              <span className="about__hl">offensive security</span> — mastering advanced
              penetration testing, exploit development, and red team operations to think
              like the adversary and break what others build.
            </p>
            <p className="about__card-text">
              Simultaneously driving research at the convergence of{' '}
              <span className="about__hl">artificial intelligence</span> and{' '}
              <span className="about__hl">quantum computing</span> with cybersecurity —
              exploring how these emerging forces redefine the threat landscape and the
              future of defense.
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
            <BookOpen size={15} />
            <span>EDUCATION & CERTIFICATIONS</span>
          </div>

          <div className="about__card-body about__card-body--edu">
            <div className="about__edu-badge">BSc</div>

            <div className="about__edu-info">
              <p className="about__edu-field">
                <span className="about__hl">Cybersecurity</span>
              </p>
              <p className="about__edu-uni">American University of Phnom Penh</p>
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
                    Certified Penetration Testing Specialist
                  </p>
                  <p className="about__cert-org">HackTheBox · CPTS</p>
                </div>
              </div>
              <span className="about__cert-badge">IN PROGRESS</span>
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
