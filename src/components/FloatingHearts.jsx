import { useEffect, useState } from 'react';

const HEARTS = ['❤️', '💕', '💗', '💖', '💝', '💓', '🌹', '✨', '💫', '🌸'];

function Heart({ id, style }) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '-60px',
        fontSize: style.size,
        left: style.left,
        animation: `floatUp ${style.duration}s linear ${style.delay}s both`,
        opacity: 0,
        userSelect: 'none',
        pointerEvents: 'none',
      }}
    >
      {style.emoji}
    </div>
  );
}

export default function FloatingHearts({ active = false }) {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    if (!active) return;

    let id = 0;
    const create = () => {
      const newHeart = {
        id: id++,
        emoji: HEARTS[Math.floor(Math.random() * HEARTS.length)],
        size: `${0.8 + Math.random() * 1.4}rem`,
        left: `${Math.random() * 100}%`,
        duration: 8 + Math.random() * 8,
        delay: Math.random() * 2,
      };
      setHearts((prev) => [...prev.slice(-25), newHeart]);
    };

    // burst on start
    for (let i = 0; i < 6; i++) setTimeout(create, i * 300);
    const interval = setInterval(create, 1600);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      {hearts.map((h) => (
        <Heart key={h.id} id={h.id} style={h} />
      ))}
    </div>
  );
}
