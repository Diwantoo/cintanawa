/* ============================================
   script.js - Cinta Nawa Interactive Logic
   ============================================ */

// ---- Default Config ----
const DEFAULT_CONFIG = {
  name: 'Sayangku ✨',
  song: 'Perfect - Ed Sheeran',
  startDate: '2024-01-01',
  message:
    'Dari semua hal indah di dunia ini,\nkamu adalah yang paling berharga bagiku. 🌸\n\nSetiap hari bersamamu terasa seperti mimpi\nyang tak ingin aku akhiri. Terima kasih\nsudah hadir dan mewarnai hidupku. 💫',
};

// ---- Load Config from LocalStorage ----
function loadConfig() {
  try {
    const saved = localStorage.getItem('cintaNawaConfig');
    return saved ? { ...DEFAULT_CONFIG, ...JSON.parse(saved) } : { ...DEFAULT_CONFIG };
  } catch {
    return { ...DEFAULT_CONFIG };
  }
}

function saveConfig(config) {
  localStorage.setItem('cintaNawaConfig', JSON.stringify(config));
}

// ---- Apply Config to DOM ----
function applyConfig(config) {
  const nameEl = document.getElementById('loverName');
  const songEl = document.getElementById('songTitle');
  const msgEl = document.getElementById('messageText');

  if (nameEl) nameEl.textContent = config.name;
  if (songEl) songEl.textContent = config.song;
  if (msgEl) {
    msgEl.innerHTML = config.message
      .split('\n')
      .map((l) => (l.trim() === '' ? '<br/>' : l))
      .join('<br/>');
  }
}

// ---- Love Counter ----
function updateCounter(startDate) {
  const start = new Date(startDate);
  const now = new Date();
  const diff = now - start;

  if (diff < 0) return;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  animateNumber('daysCount', days);
  animateNumber('hoursCount', hours);
  animateNumber('minutesCount', minutes);

  const secEl = document.getElementById('secondsCount');
  if (secEl) secEl.textContent = String(seconds).padStart(2, '0');

  // Format display date
  const dateEl = document.getElementById('startDateDisplay');
  if (dateEl) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    dateEl.textContent = start.toLocaleDateString('id-ID', options);
  }
}

let animatedNumbers = new Set();
function animateNumber(id, target) {
  if (animatedNumbers.has(id)) {
    const el = document.getElementById(id);
    if (el) el.textContent = target;
    return;
  }
  animatedNumbers.add(id);

  const el = document.getElementById(id);
  if (!el) return;

  let current = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if (current >= target) clearInterval(timer);
  }, 20);
}

// ---- Floating Hearts Background ----
const HEART_EMOJIS = ['❤️', '💕', '💗', '💖', '💝', '💓', '🌹', '✨', '💫'];

function createFloatingHeart() {
  const bg = document.getElementById('heartsBg');
  if (!bg) return;

  const heart = document.createElement('div');
  heart.className = 'floating-heart';
  heart.textContent = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];

  const size = 0.8 + Math.random() * 1.4;
  const left = Math.random() * 100;
  const duration = 8 + Math.random() * 8;
  const delay = Math.random() * 5;

  heart.style.cssText = `
    left: ${left}%;
    font-size: ${size}rem;
    animation-duration: ${duration}s;
    animation-delay: ${delay}s;
  `;

  bg.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, (duration + delay) * 1000 + 500);
}

// ---- Particle Canvas ----
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const PARTICLE_COUNT = 60;

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.6 + 0.1;
      this.color = Math.random() > 0.5 ? '#ff4d6d' : '#c77dff';
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.save();
          ctx.globalAlpha = (1 - dist / 120) * 0.15;
          ctx.strokeStyle = '#ff4d6d';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    drawConnections();
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ---- Envelope Click ----
function initEnvelope() {
  const envelope = document.getElementById('envelope');
  const envelopeWrapper = document.getElementById('envelopeWrapper');
  const loveLetter = document.getElementById('loveLetter');

  if (!envelope) return;

  envelope.addEventListener('click', () => {
    envelope.classList.add('open');

    setTimeout(() => {
      envelopeWrapper.classList.add('hidden');

      setTimeout(() => {
        envelopeWrapper.style.display = 'none';
        loveLetter.classList.add('visible');

        // Start counters and hearts after reveal
        const config = loadConfig();
        startCounterLoop(config.startDate);
        startHeartsLoop();
      }, 400);
    }, 600);
  });
}

let counterInterval = null;
function startCounterLoop(startDate) {
  updateCounter(startDate);
  if (counterInterval) clearInterval(counterInterval);
  counterInterval = setInterval(() => updateCounter(startDate), 1000);
}

let heartsInterval = null;
function startHeartsLoop() {
  // Create initial burst
  for (let i = 0; i < 8; i++) {
    setTimeout(createFloatingHeart, i * 300);
  }
  if (heartsInterval) clearInterval(heartsInterval);
  heartsInterval = setInterval(createFloatingHeart, 1500);
}

// ---- Settings FAB & Modal ----
function initSettings() {
  const fab = document.getElementById('settingsFab');
  const modal = document.getElementById('configModal');
  const saveBtn = document.getElementById('saveBtn');
  const closeBtn = document.getElementById('closeBtn');

  const nameInput = document.getElementById('nameInput');
  const songInput = document.getElementById('songInput');
  const dateInput = document.getElementById('dateInput');
  const msgInput = document.getElementById('msgInput');

  if (!fab || !modal) return;

  function openModal() {
    const config = loadConfig();
    if (nameInput) nameInput.value = config.name;
    if (songInput) songInput.value = config.song;
    if (dateInput) dateInput.value = config.startDate;
    if (msgInput) msgInput.value = config.message;
    modal.classList.add('active');
  }

  function closeModal() {
    modal.classList.remove('active');
  }

  fab.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  saveBtn.addEventListener('click', () => {
    const config = {
      name: nameInput.value.trim() || DEFAULT_CONFIG.name,
      song: songInput.value.trim() || DEFAULT_CONFIG.song,
      startDate: dateInput.value || DEFAULT_CONFIG.startDate,
      message: msgInput.value.trim() || DEFAULT_CONFIG.message,
    };

    saveConfig(config);
    applyConfig(config);
    startCounterLoop(config.startDate);
    closeModal();

    // Pulse the heart
    const heart = document.getElementById('bigHeart');
    if (heart) {
      heart.style.transform = 'scale(1.5)';
      setTimeout(() => (heart.style.transform = ''), 300);
    }
  });
}

// ---- Intersection Observer for fade-in ----
function initObserver() {
  const targets = document.querySelectorAll(
    '.message-card, .reason-card, .counter-section, .song-card, .promise-card, .final-section'
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(el);
  });
}

// ---- Mouse sparkle effect ----
function initMouseSparkle() {
  document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.92) {
      const sparkle = document.createElement('div');
      sparkle.textContent = ['✨', '💕', '🌸'][Math.floor(Math.random() * 3)];
      sparkle.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        pointer-events: none;
        font-size: ${0.6 + Math.random() * 0.6}rem;
        z-index: 9999;
        animation: sparkleAnim 0.8s ease forwards;
        transform: translate(-50%, -50%);
      `;
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 800);
    }
  });

  const style = document.createElement('style');
  style.textContent = `
    @keyframes sparkleAnim {
      0% { opacity: 1; transform: translate(-50%, -50%) scale(0.5); }
      100% { opacity: 0; transform: translate(-50%, -150%) scale(1.5); }
    }
  `;
  document.head.appendChild(style);
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  const config = loadConfig();
  applyConfig(config);
  initParticles();
  initEnvelope();
  initSettings();
  initMouseSparkle();

  // Observe after a tick so elements exist
  setTimeout(initObserver, 100);

  // Pre-create some floating hearts in background (subtle)
  for (let i = 0; i < 5; i++) {
    setTimeout(createFloatingHeart, i * 2000);
  }
});
