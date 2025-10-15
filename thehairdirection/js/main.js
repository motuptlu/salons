// Year
document.getElementById('year').textContent = new Date().getFullYear();

// AOS
AOS.init({ duration: 800, once: false, mirror: true, offset: 120, easing: 'ease-out' });

// Mobile menu
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
menuToggle.addEventListener('click', () => {
  const open = navMenu.classList.toggle('active');
  menuToggle.setAttribute('aria-expanded', open);
  const icon = menuToggle.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-times');
});
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.querySelector('i').className = 'fas fa-bars';
  });
});

// Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// Scroll to top
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) scrollTopBtn.classList.add('visible');
  else scrollTopBtn.classList.remove('visible');
});
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// Booking → WhatsApp
document.getElementById('bookingForm').addEventListener('submit', e => {
  e.preventDefault();
  const data = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    service: document.getElementById('service').value.trim(),
    date: document.getElementById('date').value,
    time: document.getElementById('time').value,
    notes: document.getElementById('notes').value.trim()
  };
  if (!data.name || !data.email || !data.phone || !data.service || !data.date || !data.time) {
    return alert('Please fill all required fields.');
  }
  const msg = `Hi The Hair Direction Salon!%0A%0A✨ NEW BOOKING ✨%0A%0A` +
              `👤 Name: ${encodeURIComponent(data.name)}%0A` +
              `📧 Email: ${encodeURIComponent(data.email)}%0A` +
              `📱 WhatsApp: ${encodeURIComponent(data.phone)}%0A` +
              `✂️ Service: ${encodeURIComponent(data.service)}%0A` +
              `📅 Date: ${encodeURIComponent(data.date)}%0A` +
              `⏰ Time: ${encodeURIComponent(data.time)}%0A` +
              `📝 Notes: ${encodeURIComponent(data.notes || 'None')}`;
  window.open(`https://wa.me/917503135104?text=${msg}`, '_blank');
});

// Min date
document.getElementById('date').min = new Date().toISOString().split('T')[0];

// Hero Swiper
window.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (window.Swiper) {
    new Swiper('.hero-swiper', {
      loop: true,
      effect: 'fade',
      speed: 1200,
      autoplay: reduceMotion ? false : { delay: 4200, disableOnInteraction: false },
      allowTouchMove: true,
      grabCursor: true,
      keyboard: { enabled: true },
      pagination: { el: '.hero-pagination', clickable: true },
      navigation: { nextEl: '.hero-next', prevEl: '.hero-prev' }
    });
  }

  // GSAP TEXT ANIMATION (Letter-by-letter reveal on scroll)
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    
    document.querySelectorAll('.split-text[data-split]').forEach(el => {
      const text = el.textContent;
      el.innerHTML = text.split('').map(char => 
        char === ' ' ? '<span class="char">&nbsp;</span>' : `<span class="char">${char}</span>`
      ).join('');
      
      gsap.to(el.querySelectorAll('.char'), {
        opacity: 1,
        y: 0,
        stagger: 0.025,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }
});

// SPARKLE PARTICLES (Canvas - Crystal Luxury Effect)
const canvas = document.getElementById('sparkleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 60;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random() * 0.5 + 0.2;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
    if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
  }
  draw() {
    ctx.fillStyle = `rgba(168, 216, 234, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity * 0.6})`;
    ctx.beginPath();
    ctx.arc(this.x + 1, this.y - 1, this.size * 0.5, 0, Math.PI * 2);
    ctx.fill();
  }
}

for (let i = 0; i < particleCount; i++) particles.push(new Particle());

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
