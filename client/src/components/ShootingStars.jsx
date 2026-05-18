import { useMemo } from 'react';
import './ShootingStars.css';

const COLORS = ['#ff3333', '#ff6600', '#ffd700', '#ff4d00', '#ff9900', '#ff2200'];

function rand(min, max) { return min + Math.random() * (max - min); }

export default function ShootingStars() {
  const stars = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      top: rand(0, 75),
      left: rand(0, 90),
      delay: rand(0, 20),
      duration: rand(2.5, 5.5),
      color: COLORS[i % COLORS.length],
      tail: rand(80, 200),
      opacity: rand(0.6, 1),
    }))
  , []);

  return (
    <div className="shooting-stars" aria-hidden="true">
      {stars.map(s => (
        <div
          key={s.id}
          className="shooting-star"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            '--delay': `${s.delay}s`,
            '--dur': `${s.duration}s`,
            '--color': s.color,
            '--tail': `${s.tail}px`,
            '--peak-opacity': s.opacity,
          }}
        />
      ))}
    </div>
  );
}
