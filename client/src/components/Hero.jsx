import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import TypingText from './TypingText';
import './Hero.css';

const ROLES = [
  'Penetration Tester',
  'Red Teamer',
  'Offensive Security Enthusiast',
  'Bug Hunter',
  'Exploit Developer',
  'Cybersecurity Researcher',
  'Vulnerability Analyst',
  'Network Infiltrator',
];

const stagger = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.15 } } },
  item: {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  },
};

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />

      <motion.div
        className="hero__content"
        variants={stagger.container}
        initial="hidden"
        animate="show"
      >
        <motion.p variants={stagger.item} className="hero__greeting">
          Hello, World! I'm
        </motion.p>

        <motion.h1 variants={stagger.item} className="hero__name">
          <GlitchText text="Savakroth Leav" />
        </motion.h1>

        <motion.div variants={stagger.item} className="hero__position">
          <span className="hero__pos-badge">Officer, IT Security (Pentest)</span>
        </motion.div>

        <motion.div variants={stagger.item} className="hero__role">
          <span className="hero__role-cmd">whoami</span>
          <span className="hero__role-arrow"> -- </span>
          <TypingText words={ROLES} speed={70} pause={2000} />
        </motion.div>

        <motion.p variants={stagger.item} className="hero__bio">
          <span className="hero__bio-comment">{'// '}</span>
          I wouldn't have a job, if people didn't write bad code.
        </motion.p>

      </motion.div>

      <motion.a
        href="#about"
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.a>
    </section>
  );
}

function GlitchText({ text }) {
  return (
    <span className="glitch" data-text={text}>
      {text}
    </span>
  );
}
