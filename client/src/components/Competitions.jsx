import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import './Competitions.css';

const COMPETITIONS = [
  {
    id: 1,
    place: '2nd Runner Up',
    placeShort: '3rd',
    name: 'KE Unipreneur National Challenge',
    org: 'KE Unipreneur',
    date: 'December 2024',
    description: 'Competed in a national-level entrepreneurship and innovation challenge, placing in the top 3 out of all participating universities across Cambodia.',
    tags: ['Entrepreneurship', 'Innovation', 'National'],
    color: '#94a3b8',
    colorBg: 'rgba(148,163,184,0.06)',
    colorBorder: 'rgba(148,163,184,0.2)',
  },
  {
    id: 2,
    place: 'Cluster 1 Champion',
    placeShort: '1st',
    name: 'KE Unipreneur Camp Season 2',
    org: 'KE Unipreneur',
    date: 'July 2024',
    description: 'Won the Cluster 1 championship at KE Unipreneur Camp Season 2, demonstrating leadership, strategic thinking, and teamwork in a competitive environment.',
    tags: ['Leadership', 'Team Competition', 'Champion'],
    color: '#fbbf24',
    colorBg: 'rgba(251,191,36,0.08)',
    colorBorder: 'rgba(251,191,36,0.3)',
  },
  {
    id: 3,
    place: '2nd Runner Up',
    placeShort: '3rd',
    name: 'Khmer Enterprise Clean Energy Hackathon',
    org: 'Khmer Enterprise',
    date: 'November 2023',
    description: 'Competed in a national hackathon focused on clean energy innovation and sustainability solutions, placing 2nd Runner Up among university teams from across Cambodia.',
    tags: ['Hackathon', 'Clean Energy', 'Innovation'],
    color: '#4ade80',
    colorBg: 'rgba(74,222,128,0.07)',
    colorBorder: 'rgba(74,222,128,0.3)',
  },
  {
    id: 4,
    place: 'Top 10 Finalist',
    placeShort: 'Top 10',
    name: 'Ideathon Cambodia Season 2',
    org: 'Ideathon Cambodia',
    date: 'September 2023',
    description: 'Qualified as a Top 10 finalist out of nationwide participants in Ideathon Cambodia Season 2, a competitive idea-pitch program challenging students to develop impactful solutions to real-world problems.',
    tags: ['Ideathon', 'Finalist', 'Innovation'],
    color: '#22d3ee',
    colorBg: 'rgba(34,211,238,0.07)',
    colorBorder: 'rgba(34,211,238,0.25)',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Competitions() {
  return (
    <section id="competitions" className="comps">
      <motion.div
        className="comps__header"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
      >
        <span className="comps__tag">// 06</span>
        <h2 className="comps__title">Competitions</h2>
        <div className="comps__line" />
      </motion.div>

      <div className="comps__grid">
        {COMPETITIONS.map((comp, i) => (
          <motion.div
            key={comp.id}
            className="comps__card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.14 }}
            style={{ '--cc': comp.color, '--cc-bg': comp.colorBg, '--cc-border': comp.colorBorder }}
          >
            <div className="comps__card-top">
              <div className="comps__trophy">
                <Trophy size={20} />
              </div>
              <div className="comps__info">
                <h3 className="comps__name">{comp.name}</h3>
                <p className="comps__org">{comp.org}</p>
              </div>
              <span className="comps__place">{comp.place}</span>
            </div>

            <p className="comps__desc">{comp.description}</p>

            <div className="comps__card-bottom">
              <div className="comps__tags">
                {comp.tags.map(t => (
                  <span key={t} className="comps__tag-chip">{t}</span>
                ))}
              </div>
              <span className="comps__date">{comp.date}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
