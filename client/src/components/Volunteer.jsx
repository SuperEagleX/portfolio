import { motion } from 'framer-motion';
import { Shield, Flag, Heart, Star, Leaf, Briefcase, Gamepad2 } from 'lucide-react';
import './Volunteer.css';

const VOLUNTEER = [
  {
    id: 1,
    icon: Shield,
    role: 'Hacking Club Co-Lead',
    org: 'AUPP',
    period: 'Sep 2025 — Dec 2025',
    description: 'Co-led AUPP\'s cybersecurity club, organising CTF competitions, penetration testing workshops, and security awareness sessions. Helped grow the technical community on campus and fostered an ethical hacking culture among students.',
    tags: ['CTF', 'Cybersecurity', 'Leadership', 'Workshop'],
    accent: '#22d3ee',
    size: 'featured',
  },
  {
    id: 2,
    icon: Flag,
    role: 'Transportation Organiser',
    org: '32nd SEA Games — Cambodia',
    period: 'May 2023',
    description: 'Coordinated athlete and official transport logistics across venues in Phnom Penh for Cambodia\'s historic first hosting of the SEA Games, serving 12,000+ athletes from 11 nations across 37 sports.',
    tags: ['Logistics', 'International Event', 'Operations'],
    accent: '#fbbf24',
    size: 'md',
  },
  {
    id: 3,
    icon: Heart,
    role: 'Local Officer',
    org: '12th ASEAN Para Games — Cambodia',
    period: 'Jun 2023',
    description: 'Provided on-ground coordination and operational support for ~2,000 para athletes and officials at the Morodok Techo Sports Complex — Cambodia\'s first hosting of the ASEAN Para Games.',
    tags: ['Para Sports', 'Operations', 'Coordination'],
    accent: '#4ade80',
    size: 'md',
  },
  {
    id: 4,
    icon: Star,
    role: 'Young Leader Program Participant',
    org: 'JCI Phnom Penh',
    period: 'Jan 2024 — Aug 2024',
    description: 'Completed JCI Phnom Penh\'s Young Leader Program, a leadership and community impact initiative for young professionals. Contributed to Business Dialogue & Matching Expo ASPAC 2024 (400+ participants across 30+ Asia-Pacific industries), Cambodia Kids Academy 2024, and provided graphic design support across multiple JCI projects.',
    tags: ['Leadership', 'ASPAC 2024', 'Community', 'Graphic Design'],
    accent: '#a78bfa',
    size: 'featured',
  },
  {
    id: 5,
    icon: Leaf,
    role: 'People Experience Team',
    org: 'Phnom Penh Saat Project',
    period: '2025',
    description: 'Joined the People Experience team for Phnom Penh\'s annual urban beautification campaign, driving community engagement and participant experience in citywide waste reduction and environmental awareness programmes.',
    tags: ['Community', 'Environment', 'Engagement'],
    accent: '#34d399',
    size: 'md',
  },
  {
    id: 6,
    icon: Briefcase,
    role: 'Operation Team Lead',
    org: 'Cambo Job Career Fair',
    period: 'Sep 2023',
    description: 'Led the operations team at one of Cambodia\'s prominent career expos, overseeing floor logistics, team coordination, and real-time problem-solving to ensure smooth event execution for employers and job seekers.',
    tags: ['Operations', 'Team Lead', 'Event Management'],
    accent: '#60a5fa',
    size: 'md',
  },
  {
    id: 7,
    icon: Gamepad2,
    role: 'Game & Entertainment Team Lead',
    org: 'Frogsale Market Fair',
    period: 'Dec 2023',
    description: 'Led the Game & Entertainment team at Frogsale Market Fair, designing and managing interactive games and entertainment activities to elevate the visitor experience at this popular Phnom Penh pop-up market event.',
    tags: ['Entertainment', 'Team Lead', 'Event Planning'],
    accent: '#fb923c',
    size: 'md',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Volunteer() {
  return (
    <section id="volunteer" className="vol">
      <motion.div
        className="vol__header"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
      >
        <span className="vol__tag">// 07</span>
        <h2 className="vol__title">Volunteer</h2>
        <div className="vol__line" />
      </motion.div>

      <div className="vol__bento">
        {VOLUNTEER.map((v, i) => {
          const Icon = v.icon;
          return (
            <motion.div
              key={v.id}
              className={`vol__card vol__card--${v.size}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.08 }}
              style={{ '--vc': v.accent }}
            >
              <div className="vol__card-top">
                <div className="vol__icon-wrap">
                  <Icon size={18} />
                </div>
                <div className="vol__meta">
                  <h3 className="vol__role">{v.role}</h3>
                  <p className="vol__org-period">
                    <span className="vol__org">{v.org}</span>
                    <span className="vol__sep">·</span>
                    <span className="vol__period">{v.period}</span>
                  </p>
                </div>
              </div>
              <p className="vol__desc">{v.description}</p>
              <div className="vol__tags">
                {v.tags.map(t => (
                  <span key={t} className="vol__tag-chip">{t}</span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
