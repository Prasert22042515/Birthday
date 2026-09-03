/**
 * Birthday Wishes Mobile App Logic
 * Features: Confetti animations, interactive cake, synthesized audio, customization
 */

(function () {
  'use strict';

  // DOM Elements
  const birthdayNameEl = document.getElementById('birthdayName');
  const birthdayMessageEl = document.getElementById('birthdayMessage');
  const candleFlameEl = document.getElementById('candleFlame');
  const candleSmokeEl = document.getElementById('candleSmoke');
  const candleHintEl = document.getElementById('candleHint');
  const cakeWrapperEl = document.getElementById('cakeWrapper');
  const confettiBtn = document.getElementById('confettiBtn');
  const giftBoxBtn = document.getElementById('giftBoxBtn');
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const customizeToggleBtn = document.getElementById('customizeToggleBtn');
  const customizeModal = document.getElementById('customizeModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const saveCustomizationBtn = document.getElementById('saveCustomizationBtn');
  const resetDefaultsBtn = document.getElementById('resetDefaultsBtn');
  const inputName = document.getElementById('inputName');
  const inputMessage = document.getElementById('inputMessage');
  const inputTitle = document.getElementById('inputTitle');
  const balloonContainer = document.getElementById('balloonContainer');
  const reactionBtns = document.querySelectorAll('.reaction-btn');

  // Default values
  const defaultValues = {
    name: birthdayNameEl.textContent.trim(),
    message: birthdayMessageEl.textContent.trim(),
    title: document.title
  };

  // State
  let candleBlown = false;
  let isPlayingMusic = false;
  let audioCtx = null;

  // Initialize
  initUrlParams();
  loadSavedCustomization();
  spawnBalloons();

  // Trigger welcome confetti on mobile launch after small delay
  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      shootWelcomeConfetti();
    }, 600);
  });

  /* --------------------------------------------------------------------------
     Confetti Animations
     -------------------------------------------------------------------------- */

  function getConfettiInstance() {
    if (typeof confetti === 'function') {
      return confetti;
    }
    return null;
  }

  // Welcome Confetti Explosion
  function shootWelcomeConfetti() {
    const c = getConfettiInstance();
    if (!c) return;

    // School pride burst
    c({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  // Grand Celebration Fireworks & Side Cannons
  function triggerGrandCelebration() {
    const c = getConfettiInstance();
    if (!c) return;

    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
      c(Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio)
      }));
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }

  // Gift Surprise Explosion (Stars & Circles)
  function triggerGiftConfetti() {
    const c = getConfettiInstance();
    if (!c) return;

    // Fireworks from bottom sides
    const end = Date.now() + 1000;
    const colors = ['#ff477e', '#7928ca', '#ffbe0b', '#00f2fe', '#4facfe'];

    (function frame() {
      c({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      c({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }

  // Mini tap confetti for emojis
  function shootEmojiConfetti(e, emoji) {
    const c = getConfettiInstance();
    const rect = e.target.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    if (c) {
      c({
        particleCount: 20,
        spread: 45,
        startVelocity: 25,
        origin: { x: x, y: y },
        shapes: ['circle']
      });
    }

    // Spawn floating emoji element
    spawnFloatingEmoji(emoji, rect.left + rect.width / 2, rect.top);
  }

  function spawnFloatingEmoji(emoji, x, y) {
    const el = document.createElement('div');
    el.textContent = emoji;
    el.style.position = 'fixed';
    el.style.left = `${x - 14}px`;
    el.style.top = `${y - 14}px`;
    el.style.fontSize = '2rem';
    el.style.pointerEvents = 'none';
    el.style.zIndex = '9999';
    el.style.transition = 'transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.9s ease';
    document.body.appendChild(el);

    requestAnimationFrame(() => {
      el.style.transform = `translate(${(Math.random() - 0.5) * 60}px, -90px) scale(1.5)`;
      el.style.opacity = '0';
    });

    setTimeout(() => {
      el.remove();
    }, 950);
  }

  /* --------------------------------------------------------------------------
     Interactive Cake & Candle
     -------------------------------------------------------------------------- */

  cakeWrapperEl.addEventListener('click', () => {
    if (!candleBlown) {
      // Extinguish candle
      candleFlameEl.classList.add('extinguished');
      candleSmokeEl.classList.add('active');
      candleBlown = true;
      candleHintEl.textContent = '🎉 Wish made! Tap to relight 🕯️';
      candleHintEl.style.color = '#7928ca';

      // Confetti & celebratory sound
      triggerGrandCelebration();
      playChime(true);
    } else {
      // Relight
      candleFlameEl.classList.remove('extinguished');
      candleSmokeEl.classList.remove('active');
      candleBlown = false;
      candleHintEl.textContent = 'Tap the candle to make a wish! 🕯️';
      candleHintEl.style.color = 'var(--primary)';
    }
  });

  /* --------------------------------------------------------------------------
     Event Listeners for Buttons
     -------------------------------------------------------------------------- */

  confettiBtn.addEventListener('click', () => {
    triggerGrandCelebration();
    playChime(false);
  });

  giftBoxBtn.addEventListener('click', () => {
    triggerGiftConfetti();
    playChime(true);
  });

  reactionBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const emoji = btn.getAttribute('data-emoji');
      shootEmojiConfetti(e, emoji);
    });
  });

  /* --------------------------------------------------------------------------
     Synthesized Web Audio API (100% Offline Birthday Chime)
     -------------------------------------------------------------------------- */

  function getAudioContext() {
    if (!audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtx = new AudioCtx();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Short celebratory chime / chord
  function playChime(isMajorChord = false) {
    const ctx = getAudioContext();
    if (!ctx) return;

    const notes = isMajorChord ? [523.25, 659.25, 783.99, 1046.50] : [587.33, 739.99, 880.00];
    const now = ctx.currentTime;

    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + index * 0.08);

      gain.gain.setValueAtTime(0.12, now + index * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + index * 0.08);
      osc.stop(now + index * 0.08 + 0.65);
    });
  }

  // Full "Happy Birthday" melody synthesizer
  const birthdayNotes = [
    { f: 261.63, d: 0.3 }, // C4
    { f: 261.63, d: 0.3 }, // C4
    { f: 293.66, d: 0.6 }, // D4
    { f: 261.63, d: 0.6 }, // C4
    { f: 349.23, d: 0.6 }, // F4
    { f: 329.63, d: 1.0 }, // E4

    { f: 261.63, d: 0.3 }, // C4
    { f: 261.63, d: 0.3 }, // C4
    { f: 293.66, d: 0.6 }, // D4
    { f: 261.63, d: 0.6 }, // C4
    { f: 392.00, d: 0.6 }, // G4
    { f: 349.23, d: 1.0 }, // F4

    { f: 261.63, d: 0.3 }, // C4
    { f: 261.63, d: 0.3 }, // C4
    { f: 523.25, d: 0.6 }, // C5
    { f: 440.00, d: 0.6 }, // A4
    { f: 349.23, d: 0.6 }, // F4
    { f: 329.63, d: 0.6 }, // E4
    { f: 293.66, d: 1.0 }, // D4

    { f: 466.16, d: 0.3 }, // Bb4
    { f: 466.16, d: 0.3 }, // Bb4
    { f: 440.00, d: 0.6 }, // A4
    { f: 349.23, d: 0.6 }, // F4
    { f: 392.00, d: 0.6 }, // G4
    { f: 349.23, d: 1.2 }  // F4
  ];

  let melodyTimeouts = [];

  function playBirthdaySong() {
    const ctx = getAudioContext();
    if (!ctx) return;

    stopBirthdaySong();
    isPlayingMusic = true;
    musicToggleBtn.classList.add('active');

    let accumulatedTime = 0.1;
    birthdayNotes.forEach((note) => {
      const tId = setTimeout(() => {
        if (!isPlayingMusic) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(note.f, ctx.currentTime);

        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + note.d * 0.95);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + note.d);
      }, accumulatedTime * 1000);

      melodyTimeouts.push(tId);
      accumulatedTime += note.d * 0.75;
    });

    const finishTid = setTimeout(() => {
      isPlayingMusic = false;
      musicToggleBtn.classList.remove('active');
    }, accumulatedTime * 1000 + 400);
    melodyTimeouts.push(finishTid);
  }

  function stopBirthdaySong() {
    isPlayingMusic = false;
    melodyTimeouts.forEach(clearTimeout);
    melodyTimeouts = [];
    musicToggleBtn.classList.remove('active');
  }

  musicToggleBtn.addEventListener('click', () => {
    if (isPlayingMusic) {
      stopBirthdaySong();
    } else {
      playBirthdaySong();
      triggerGrandCelebration();
    }
  });

  /* --------------------------------------------------------------------------
     Floating Background Balloons
     -------------------------------------------------------------------------- */

  function spawnBalloons() {
    const colors = ['#ff477e', '#ffbe0b', '#7928ca', '#00f2fe', '#48bb78', '#ed64a6'];
    const count = 12;

    for (let i = 0; i < count; i++) {
      const balloon = document.createElement('div');
      balloon.className = 'balloon';
      const color = colors[Math.floor(Math.random() * colors.length)];
      balloon.style.backgroundColor = color;
      balloon.style.left = `${Math.random() * 92}%`;
      balloon.style.animationDuration = `${8 + Math.random() * 8}s`;
      balloon.style.animationDelay = `${Math.random() * 6}s`;
      balloon.style.transform = `scale(${0.6 + Math.random() * 0.7})`;
      balloonContainer.appendChild(balloon);
    }
  }

  /* --------------------------------------------------------------------------
     Customization Modal & URL Parameters
     -------------------------------------------------------------------------- */

  function openCustomizeModal() {
    inputName.value = birthdayNameEl.textContent.trim();
    inputMessage.value = birthdayMessageEl.textContent.trim();
    inputTitle.value = document.title;
    customizeModal.classList.add('active');
    customizeModal.setAttribute('aria-hidden', 'false');
  }

  function closeCustomizeModal() {
    customizeModal.classList.remove('active');
    customizeModal.setAttribute('aria-hidden', 'true');
  }

  customizeToggleBtn.addEventListener('click', openCustomizeModal);
  closeModalBtn.addEventListener('click', closeCustomizeModal);

  customizeModal.addEventListener('click', (e) => {
    if (e.target === customizeModal) {
      closeCustomizeModal();
    }
  });

  saveCustomizationBtn.addEventListener('click', () => {
    const newName = inputName.value.trim() || defaultValues.name;
    const newMsg = inputMessage.value.trim() || defaultValues.message;
    const newTitle = inputTitle.value.trim() || `Happy Birthday ${newName}! 🎉`;

    birthdayNameEl.textContent = newName;
    birthdayMessageEl.textContent = newMsg;
    document.title = newTitle;

    // Save to localStorage
    try {
      localStorage.setItem('birthday_app_data', JSON.stringify({
        name: newName,
        message: newMsg,
        title: newTitle
      }));
    } catch (e) {
      // Local storage might be disabled in private mode
    }

    closeCustomizeModal();
    triggerGrandCelebration();
  });

  resetDefaultsBtn.addEventListener('click', () => {
    birthdayNameEl.textContent = defaultValues.name;
    birthdayMessageEl.textContent = defaultValues.message;
    document.title = defaultValues.title;

    try {
      localStorage.removeItem('birthday_app_data');
    } catch (e) {}

    inputName.value = defaultValues.name;
    inputMessage.value = defaultValues.message;
    inputTitle.value = defaultValues.title;

    closeCustomizeModal();
  });

  function loadSavedCustomization() {
    try {
      const saved = localStorage.getItem('birthday_app_data');
      if (saved) {
        const data = JSON.parse(saved);
        if (data.name) birthdayNameEl.textContent = data.name;
        if (data.message) birthdayMessageEl.textContent = data.message;
        if (data.title) document.title = data.title;
      }
    } catch (e) {}
  }

  function initUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    const msg = params.get('msg') || params.get('message');
    const title = params.get('title');

    if (name) birthdayNameEl.textContent = name;
    if (msg) birthdayMessageEl.textContent = msg;
    if (title) {
      document.title = title;
    } else if (name) {
      document.title = `Happy Birthday ${name}! 🎉`;
    }
  }

})();
