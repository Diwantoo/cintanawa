import { useState } from 'react';
import styles from './EnvelopeIntro.module.css';

export default function EnvelopeIntro({ onOpen }) {
  const [phase, setPhase] = useState('idle'); // idle | opening | done

  const handleClick = () => {
    if (phase !== 'idle') return;
    setPhase('opening');
    setTimeout(() => {
      setPhase('done');
      onOpen();
    }, 900);
  };

  if (phase === 'done') return null;

  return (
    <div className={`${styles.wrapper} ${phase === 'opening' ? styles.fading : ''}`}>
      {/* Ambient glow orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <div className={styles.hint}>Untuk yang tersayang 💌</div>

      <div
        className={`${styles.envelope} ${phase === 'opening' ? styles.open : ''}`}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      >
        {/* Back flap (bottom piece) */}
        <div className={styles.backFlap} />

        {/* Side triangles */}
        <div className={styles.leftFlap} />
        <div className={styles.rightFlap} />

        {/* Top flap (opens on click) */}
        <div className={styles.topFlap} />

        {/* Envelope front body */}
        <div className={styles.front}>
          <div className={styles.seal}>
            <span>💕</span>
          </div>
        </div>

        {/* Card slides up out of envelope */}
        <div className={styles.card}>
          <span className={styles.cardText}>I Love You</span>
          <span className={styles.cardSub}>Buka suratmu ❤️</span>
        </div>
      </div>

      <p className={styles.tapHint}>Ketuk amplop untuk membuka</p>
    </div>
  );
}
