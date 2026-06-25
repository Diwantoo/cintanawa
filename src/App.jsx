import { useState, useEffect } from 'react';
import ParticleCanvas from './components/ParticleCanvas';
import FloatingHearts from './components/FloatingHearts';
import EnvelopeIntro from './components/EnvelopeIntro';
import LoveLetter from './components/LoveLetter';
import './index.css';

export default function App() {
  const [opened, setOpened] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  // Mouse sparkle effect
  useEffect(() => {
    const handler = (e) => {
      if (Math.random() > 0.92) {
        const el = document.createElement('div');
        el.className = 'sparkle';
        el.textContent = ['✨', '💕', '🌸'][Math.floor(Math.random() * 3)];
        el.style.left = `${e.clientX}px`;
        el.style.top = `${e.clientY}px`;
        el.style.fontSize = `${0.6 + Math.random() * 0.6}rem`;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 800);
      }
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  const handleOpen = () => {
    setOpened(true);
    // brief pause after envelope close animation
    setTimeout(() => setShowLetter(true), 200);
  };

  return (
    <>
      <ParticleCanvas />
      <FloatingHearts active={opened} />

      {/* Envelope intro — unmounted after open */}
      {!opened && <EnvelopeIntro onOpen={handleOpen} />}

      {/* Love letter content */}
      <LoveLetter visible={showLetter} />
    </>
  );
}
