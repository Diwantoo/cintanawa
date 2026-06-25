import { useState, useEffect, useRef } from 'react';

import photo1 from '../assets/WhatsApp Image 2026-06-25 at 07.51.36.jpeg';
import photo2 from '../assets/WhatsApp Image 2026-06-25 at 07.51.36 (1).jpeg';
import photo3 from '../assets/WhatsApp Image 2026-06-25 at 07.51.37.jpeg';
import photo4 from '../assets/WhatsApp Image 2026-06-25 at 07.51.37 (1).jpeg';
import photo5 from '../assets/WhatsApp Image 2026-06-25 at 07.51.38.jpeg';
import photo6 from '../assets/WhatsApp Image 2026-06-25 at 07.51.38 (1).jpeg';
import photo7 from '../assets/WhatsApp Image 2026-06-25 at 07.51.39.jpeg';
import photo8 from '../assets/WhatsApp Image 2026-06-25 at 07.51.40.jpeg';

const PHOTOS = [photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8];

const DEFAULT = {
  name: 'Sayangku ✨',
  song: 'Perfect - Ed Sheeran',
  startDate: '2026-03-13',
  message:
    'kamu tuh beneran yang paling aku mau, bukan lebay.\n\ntiap hari sama kamu rasanya gak pernah bosen,\nbahkan berantem pun aku masih sayang kamu.\n\nsemoga kamu tau, gak ada orang lain yang bisa gantiin kamu.\n\nI love you, serius.',
};

function loadConfig() {
  try {
    const s = localStorage.getItem('cintaNawaConfig');
    return s ? { ...DEFAULT, ...JSON.parse(s) } : { ...DEFAULT };
  } catch { return { ...DEFAULT }; }
}

function saveConfig(cfg) {
  localStorage.setItem('cintaNawaConfig', JSON.stringify(cfg));
}

function useLoveCounter(startDate) {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Date.now() - new Date(startDate).getTime();
      if (diff < 0) return;
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [startDate]);
  return time;
}

function Pad({ n }) {
  return <>{String(n).padStart(2, '0')}</>;
}

function Section({ children, style }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(30px)',
      transition: 'opacity 0.7s ease, transform 0.7s ease',
      ...style
    }}>
      {children}
    </div>
  );
}

const REASONS = [
  { icon: '😊', text: 'senyum kamu yang\naku kangenin tiap hari' },
  { icon: '🤝', text: 'selalu ada\npas aku butuh' },
  { icon: '💬', text: 'ketawa bareng kamu\nitu healing banget' },
  { icon: '🌙', text: 'kamu yang pertama\naku inget pas bangun tidur' },
  { icon: '🌺', text: 'cantik luar dalem,\ngak ada lawannya' },
  { icon: '♾️', text: 'cinta kamu tulus\ngak pernah aku raguin' },
];

const PROMISES = [
  '✨ aku bakal selalu ada, kapanpun kamu butuh',
  '🌟 aku sayang kamu apa adanya, beneran',
  '🌸 tiap hari sama kamu mau aku bikin worth it',
  '💪 kamu bisa sandarin apapun ke aku',
  '♾️ gak ada expiry date buat perasaan aku ke kamu',
];

export default function LoveLetter({ visible }) {
  const [cfg, setCfg] = useState(loadConfig);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(cfg);
  const time = useLoveCounter(cfg.startDate);

  const dateLabel = new Date(cfg.startDate).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  const msgLines = cfg.message.split('\n').map((l, i) => (
    <span key={i}>{l}<br /></span>
  ));

  if (!visible) return null;

  const s = {
    card: {
      background: 'linear-gradient(135deg, rgba(255,77,109,0.08), rgba(199,125,255,0.08))',
      border: '1px solid rgba(255,133,161,0.18)',
      borderRadius: 24,
      backdropFilter: 'blur(12px)',
    },
    sectionTitle: {
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: 'clamp(1.4rem, 4vw, 1.8rem)',
      textAlign: 'center',
      marginBottom: 28,
      background: 'linear-gradient(135deg, #ff85a1, #c77dff)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
  };

  return (
    <div style={{
      maxWidth: 720,
      margin: '0 auto',
      padding: '0 20px 80px',
      position: 'relative',
      zIndex: 2,
      animation: 'revealLetter 0.8s ease both',
    }}>
      <style>{`
        @keyframes revealLetter { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:translateY(0); } }
        @keyframes roseFloat { 0%,100% { transform:translateY(0) rotate(-5deg); } 50% { transform:translateY(-14px) rotate(5deg); } }
        @keyframes heartBounce { 0%,100% { transform:translateY(0) scale(1); } 50% { transform:translateY(-8px) scale(1.2); } }
        @keyframes bigBeat { 0%,100%{transform:scale(1);} 14%{transform:scale(1.2);} 28%{transform:scale(1);} 42%{transform:scale(1.15);} 70%{transform:scale(1);} }
        @keyframes spinVinyl { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
        @keyframes shimmer { 0%,100%{opacity:.5;transform:scale(1);} 50%{opacity:1;transform:scale(1.1);} }
      `}</style>

      {/* ── Header ── */}
      <header style={{ textAlign: 'center', padding: '70px 20px 40px' }}>
        <div style={{ fontSize: '4rem', display: 'block', marginBottom: 18, animation: 'roseFloat 3s ease-in-out infinite' }}>🌹</div>
        <h1 style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: 'clamp(3.5rem, 10vw, 6rem)',
          fontWeight: 700,
          background: 'linear-gradient(135deg, #ff85a1, #c77dff, #ff4d6d)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1.1,
          marginBottom: 14,
          letterSpacing: '-1px',
          filter: 'drop-shadow(0 0 20px rgba(255,77,109,0.4))',
        }}>I Love You</h1>
        <p style={{ fontFamily: "'Lora', serif", fontSize: '1.3rem', color: 'var(--text-soft)', marginBottom: 6 }}>jujur aja,</p>
        <p style={{
          fontFamily: "'Lora', serif",
          fontStyle: 'italic',
          fontSize: '1.6rem',
          color: 'var(--gold)',
          textShadow: '0 0 20px rgba(255,215,0,0.6)',
          marginBottom: 18,
        }}>{cfg.name}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, fontSize: '1.3rem' }}>
          {['💕','💗','💖','💗','💕'].map((h, i) => (
            <span key={i} style={{ animation: `heartBounce 1.5s ease-in-out ${i * 0.15}s infinite` }}>{h}</span>
          ))}
        </div>
      </header>

      {/* ── Message ── */}
      <Section>
        <div style={{ ...s.card, padding: '40px 36px', position: 'relative', boxShadow: 'var(--glow-pink), inset 0 1px 0 rgba(255,255,255,0.08)', margin: '0 0 48px' }}>
          <span style={{ fontFamily: "'Lora', serif", fontSize: '5rem', color: '#ff4d6d', opacity: 0.35, position: 'absolute', top: 12, left: 16, lineHeight: 0.5 }}>"</span>
          <p style={{ fontFamily: "'Lora', serif", fontSize: '1.25rem', fontStyle: 'italic', lineHeight: 1.9, textAlign: 'center', position: 'relative', zIndex: 1, padding: '10px 24px', color: 'var(--text-white)' }}>
            {msgLines}
          </p>
          <span style={{ fontFamily: "'Lora', serif", fontSize: '5rem', color: '#ff4d6d', opacity: 0.35, position: 'absolute', bottom: -16, right: 16, lineHeight: 0.5, transform: 'rotate(180deg)' }}>"</span>
        </div>
      </Section>

      {/* ── Reasons ── */}
      <Section style={{ marginBottom: 48 }}>
        <h2 style={s.sectionTitle}>Kenapa Aku Sayang Kamu 🫶</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14 }}>
          {REASONS.map((r, i) => (
            <ReasonCard key={i} icon={r.icon} text={r.text} delay={i * 0.08} />
          ))}
        </div>
      </Section>

      {/* ── Counter ── */}
      <Section style={{ marginBottom: 48, textAlign: 'center' }}>
        <h2 style={s.sectionTitle}>Udah Bareng Lo Selama Ini ⏳</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 14 }}>
          {[
            { label: 'Hari', val: time.d },
            { label: 'Jam', val: time.h },
            { label: 'Menit', val: time.m },
            { label: 'Detik', val: time.s },
          ].map((item) => (
            <div key={item.label} style={{ ...s.card, padding: '20px 10px', textAlign: 'center' }}>
              <span style={{
                display: 'block',
                fontFamily: "'Lora', serif",
                fontSize: 'clamp(1.8rem, 5vw, 2.6rem)',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #ff85a1, #c77dff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1.1,
              }}><Pad n={item.val} /></span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-soft)', textTransform: 'uppercase', letterSpacing: 1, marginTop: 4, display: 'block' }}>{item.label}</span>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: "'Lora', serif", fontSize: '1.1rem', color: 'var(--text-soft)' }}>
          Sejak <strong style={{ color: 'var(--pink-mid)' }}>{dateLabel}</strong>
        </p>
      </Section>

      {/* ── Song ── */}
      <Section style={{ marginBottom: 48 }}>
        <h2 style={s.sectionTitle}>Lagu Kita 🎵</h2>
        <div style={{
          position: 'relative',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: 'var(--glow-purple), var(--glow-pink)',
          border: '1px solid rgba(199,125,255,0.3)',
        }}>
          <iframe
            src="https://www.youtube.com/embed/cNGjD0VG4R8?autoplay=1&loop=1&playlist=cNGjD0VG4R8&rel=0&modestbranding=1&color=white"
            title="Lagu Kita"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            style={{
              width: '100%',
              height: '360px',
              border: 'none',
              display: 'block',
            }}
          />
        </div>
        <p style={{
          textAlign: 'center',
          marginTop: 14,
          fontFamily: "'Great Vibes', cursive",
          fontSize: '1.5rem',
          color: 'var(--text-soft)',
        }}>
          {cfg.song} 🎶
        </p>
      </Section>

      {/* ── Photo Gallery ── */}
      <Section style={{ marginBottom: 48 }}>
        <h2 style={s.sectionTitle}>Kenangan Kita 📸</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 14,
        }}>
          {PHOTOS.map((src, i) => (
            <PhotoCard key={i} src={src} index={i} />
          ))}
        </div>
      </Section>

      {/* ── Promises ── */}
      <Section style={{ marginBottom: 48 }}>
        <div style={{ ...s.card, padding: '40px', textAlign: 'center', boxShadow: 'var(--glow-pink)', position: 'relative', overflow: 'hidden' }}>
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: 14, animation: 'bigBeat 1.2s ease-in-out infinite' }}>💍</span>
          <h3 style={{
            fontFamily: "'Lora', serif", fontSize: '1.6rem', marginBottom: 24,
            background: 'linear-gradient(135deg, #ff85a1, #c77dff)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>Janji Aku ke Kamu 🤞</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 360, margin: '0 auto', textAlign: 'left' }}>
            {PROMISES.map((p, i) => (
              <PromiseItem key={i} text={p} />
            ))}
          </ul>
        </div>
      </Section>

      {/* ── Final ── */}
      <Section style={{ textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ fontSize: '5rem', display: 'block', marginBottom: 18, animation: 'bigBeat 1.2s ease-in-out infinite', filter: 'drop-shadow(0 0 30px rgba(255,77,109,0.8))' }}>❤️</div>
        <h2 style={{
          fontFamily: "'Lora', serif",
          fontSize: 'clamp(2.8rem, 8vw, 4.5rem)',
          background: 'linear-gradient(135deg, #ff85a1, #ffd700, #c77dff)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          marginBottom: 12,
        }}>Aku Cinta Kamu 🫶</h2>
        <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: '2.2rem', color: 'var(--text-soft)', marginBottom: 20 }}>sekarang, besok, dan selamanya 💕</p>
        <p style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '1rem', color: 'var(--pink-mid)' }}>— dan ini serius, bukan lebay 😌</p>
      </Section>

      <footer style={{ textAlign: 'center', padding: '16px', color: 'rgba(255,133,161,0.4)', fontSize: '0.82rem' }}>
        Made with 💖 just for you
      </footer>

      {/* ── Settings FAB ── */}
      <button
        onClick={() => { setForm(cfg); setModal(true); }}
        title="Personalisasi"
        style={{
          position: 'fixed', bottom: 24, right: 24,
          width: 52, height: 52, borderRadius: '50%',
          background: 'linear-gradient(135deg, #ff4d6d, #c77dff)',
          border: 'none', cursor: 'pointer', fontSize: '1.3rem',
          boxShadow: '0 4px 20px rgba(255,77,109,0.5)', zIndex: 100,
          transition: 'transform 0.3s, box-shadow 0.3s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = ''; }}
      >⚙️</button>

      {/* ── Config Modal ── */}
      {modal && (
        <div onClick={() => setModal(false)} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.72)',
          backdropFilter: 'blur(8px)', zIndex: 200,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: 'linear-gradient(135deg, #1a0010, #0d0008)',
            border: '1px solid var(--pink-mid)',
            borderRadius: 24, padding: 36,
            width: 'min(480px, 90vw)', maxHeight: '90vh', overflowY: 'auto',
            boxShadow: 'var(--glow-pink), var(--glow-purple)',
          }}>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem',
              marginBottom: 24, textAlign: 'center',
              background: 'linear-gradient(135deg, #ff85a1, #c77dff)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>💕 Personalisasi</h3>

            {[
              { label: 'Nama Pacarmu', key: 'name', placeholder: 'Nama sayangmu...' },
              { label: 'Lagu Favorit Kalian', key: 'song', placeholder: 'Judul - Artis' },
            ].map(({ label, key, placeholder }) => (
              <label key={key} style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16, fontSize: '0.85rem', color: 'var(--text-soft)' }}>
                {label}
                <input
                  value={form[key]}
                  onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                  placeholder={placeholder}
                  style={inputStyle}
                />
              </label>
            ))}

            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16, fontSize: '0.85rem', color: 'var(--text-soft)' }}>
              Tanggal Mulai Pacaran
              <input type="date" value={form.startDate} onChange={(e) => setForm((p) => ({ ...p, startDate: e.target.value }))} style={inputStyle} />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20, fontSize: '0.85rem', color: 'var(--text-soft)' }}>
              Pesan Cinta
              <textarea
                value={form.message}
                onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                placeholder="Tulis pesan cintamu..."
                rows={4}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </label>

            <button onClick={() => { const c = { ...DEFAULT, ...form }; saveConfig(c); setCfg(c); setModal(false); }} style={{
              width: '100%', padding: '12px',
              background: 'linear-gradient(135deg, #ff4d6d, #c77dff)',
              border: 'none', borderRadius: 12, color: '#fff',
              fontSize: '1rem', cursor: 'pointer', marginBottom: 10,
              fontFamily: 'Inter, sans-serif', fontWeight: 500,
            }}>💾 Simpan</button>
            <button onClick={() => setModal(false)} style={{
              width: '100%', padding: '10px',
              background: 'transparent', border: '1px solid rgba(255,133,161,0.3)',
              borderRadius: 12, color: 'var(--text-soft)',
              fontSize: '0.9rem', cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
            }}>✖ Tutup</button>
          </div>
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,133,161,0.3)',
  borderRadius: 12, padding: '10px 14px',
  color: 'var(--text-white)',
  fontFamily: 'Inter, sans-serif', fontSize: '0.9rem',
  outline: 'none', width: '100%',
};

function ReasonCard({ icon, text, delay }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      background: 'linear-gradient(135deg, rgba(255,77,109,0.08), rgba(199,125,255,0.08))',
      border: '1px solid rgba(255,133,161,0.15)',
      borderRadius: 20, padding: '22px 16px',
      textAlign: 'center', backdropFilter: 'blur(8px)',
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
      cursor: 'default',
    }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px) scale(1.03)';
        e.currentTarget.style.borderColor = '#ff85a1';
        e.currentTarget.style.boxShadow = 'var(--glow-pink)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = '';
        e.currentTarget.style.borderColor = 'rgba(255,133,161,0.15)';
        e.currentTarget.style.boxShadow = '';
      }}
    >
      <div style={{ fontSize: '2.2rem', marginBottom: 10 }}>{icon}</div>
      <p style={{ fontSize: '0.84rem', color: 'var(--text-soft)', lineHeight: 1.5 }}>
        {text.split('\n').map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}
      </p>
    </div>
  );
}

function PhotoCard({ src, index }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Random slight rotation for polaroid feel
  const rotate = [-2.5, 1.8, -1.2, 2.1, -1.8, 2.8, -2.2, 1.5][index % 8];

  return (
    <>
      <div
        ref={ref}
        onClick={() => setLightbox(true)}
        style={{
          background: 'rgba(255,255,255,0.95)',
          borderRadius: 4,
          padding: '10px 10px 30px',
          cursor: 'pointer',
          opacity: vis ? 1 : 0,
          transform: vis ? `rotate(${rotate}deg)` : 'translateY(30px) scale(0.9)',
          transition: `opacity 0.6s ease ${index * 0.07}s, transform 0.6s ease ${index * 0.07}s`,
          boxShadow: '0 4px 20px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.1)',
          aspectRatio: '1',
          overflow: 'hidden',
          position: 'relative',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'rotate(0deg) scale(1.06)';
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(255,77,109,0.5), 0 1px 0 rgba(255,255,255,0.1)';
          e.currentTarget.style.zIndex = '10';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = `rotate(${rotate}deg) scale(1)`;
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.1)';
          e.currentTarget.style.zIndex = '1';
        }}
      >
        <img
          src={src}
          alt={`Kenangan ${index + 1}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            borderRadius: 2,
          }}
        />
        <div style={{
          position: 'absolute',
          bottom: 4,
          left: 0, right: 0,
          textAlign: 'center',
          fontSize: '1rem',
        }}>💕</div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(false)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.92)',
            backdropFilter: 'blur(10px)',
            zIndex: 999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'zoom-out',
            padding: 20,
          }}
        >
          <img
            src={src}
            alt={`Kenangan ${index + 1}`}
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              objectFit: 'contain',
              borderRadius: 12,
              boxShadow: '0 0 60px rgba(255,77,109,0.4)',
              animation: 'revealLetter 0.3s ease both',
            }}
          />
          <button
            onClick={() => setLightbox(false)}
            style={{
              position: 'fixed', top: 20, right: 24,
              background: 'rgba(255,77,109,0.8)',
              border: 'none', borderRadius: '50%',
              width: 40, height: 40,
              color: '#fff', fontSize: '1.1rem',
              cursor: 'pointer',
            }}
          >✕</button>
        </div>
      )}
    </>
  );
}

function PromiseItem({ text }) {
  return (
    <li style={{
      fontSize: '0.95rem', color: 'var(--text-soft)',
      padding: '11px 18px',
      background: 'rgba(255,255,255,0.04)',
      borderRadius: 12, border: '1px solid rgba(255,133,161,0.1)',
      transition: 'all 0.3s ease', cursor: 'default',
    }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(255,77,109,0.1)';
        e.currentTarget.style.borderColor = '#ff85a1';
        e.currentTarget.style.color = 'var(--text-white)';
        e.currentTarget.style.transform = 'translateX(6px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
        e.currentTarget.style.borderColor = 'rgba(255,133,161,0.1)';
        e.currentTarget.style.color = 'var(--text-soft)';
        e.currentTarget.style.transform = '';
      }}
    >
      {text}
    </li>
  );
}
