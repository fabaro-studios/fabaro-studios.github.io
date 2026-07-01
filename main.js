const palettes = ['default', 'deep', 'soft', 'ocean'];
let currentIndex = 0;

const toggle = document.getElementById('themeToggle');
toggle.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % palettes.length;
  const theme = palettes[currentIndex];
  if (theme === 'default') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
