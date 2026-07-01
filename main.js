const palettes = ['default', 'deep', 'soft', 'ocean'];
let currentIndex = 0;

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomPalette() {
  const dark = Math.random() > 0.5;
  const h = rand(0, 360);
  const sat = rand(15, 55);
  const accentSat = rand(60, 100);
  const accentL = rand(38, 52);
  const ah = (h + 180 + rand(-20, 20)) % 360;

  if (dark) {
    const bgL = rand(8, 16);
    const bgAltL = bgL + rand(3, 7);
    return {
      '--bg':              `hsl(${h}, ${sat}%, ${bgL}%)`,
      '--bg-alt':          `hsl(${h}, ${sat + 5}%, ${bgAltL}%)`,
      '--text':            `hsl(${h}, ${sat - 5}%, ${rand(85, 93)}%)`,
      '--text-muted':      `hsl(${h}, ${sat - 10}%, ${rand(55, 70)}%)`,
      '--accent':          `hsl(${ah}, ${accentSat}%, ${accentL + 10}%)`,
      '--accent-hover':    `hsl(${ah}, ${accentSat}%, ${accentL + 16}%)`,
      '--card':            `hsl(${h}, ${sat}%, ${bgL + rand(4, 8)}%)`,
      '--card-shadow':     `hsla(0, 0%, 0%, 0.3)`,
      '--border':          `hsl(${h}, ${sat}%, ${bgAltL + 4}%)`,
    };
  }

  const bgL = rand(92, 98);
  const bgAltL = bgL - rand(3, 7);
  const cardL = bgL < 95 ? 100 : bgL - 1;
  return {
    '--bg':              `hsl(${h}, ${sat}%, ${bgL}%)`,
    '--bg-alt':          `hsl(${h}, ${sat + 5}%, ${bgAltL}%)`,
    '--text':            `hsl(${h}, ${sat - 5}%, ${rand(8, 18)}%)`,
    '--text-muted':      `hsl(${h}, ${sat - 10}%, ${rand(48, 62)}%)`,
    '--accent':          `hsl(${ah}, ${accentSat}%, ${accentL}%)`,
    '--accent-hover':    `hsl(${ah}, ${accentSat}%, ${accentL - 8}%)`,
    '--card':            `hsl(${h}, ${sat}%, ${cardL}%)`,
    '--card-shadow':     `hsla(${h}, ${sat}%, 0%, 0.06)`,
    '--border':          `hsl(${h}, ${sat}%, ${bgAltL - 3}%)`,
  };
}

function applyPalette(name) {
  const root = document.documentElement;
  const styleId = 'random-theme';
  const existing = document.getElementById(styleId);
  if (existing) existing.remove();

  if (name === 'default') {
    root.removeAttribute('data-theme');
  } else {
    root.setAttribute('data-theme', name);
  }
}

function applyRandomPalette() {
  const root = document.documentElement;
  const styleId = 'random-theme';
  const existing = document.getElementById(styleId);
  if (existing) existing.remove();

  root.removeAttribute('data-theme');
  const vars = generateRandomPalette();
  const css = `:root{${Object.entries(vars).map(([k, v]) => `${k}:${v}`).join(';')}}`;
  const el = document.createElement('style');
  el.id = styleId;
  el.textContent = css;
  document.head.appendChild(el);
}

const toggle = document.getElementById('themeToggle');
toggle.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % palettes.length;
  applyPalette(palettes[currentIndex]);
});

const randomToggle = document.getElementById('randomToggle');
randomToggle.addEventListener('click', applyRandomPalette);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
