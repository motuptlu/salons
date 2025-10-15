// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// AOS init
AOS.init({ duration: 1000, once: false, mirror: true, offset: 100, easing: 'ease-in-out' });

// Mobile Menu
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  const icon = menuToggle.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-times');
});
// Close on link click
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    menuToggle.querySelector('i').className = 'fas fa-bars';
  });
});

// Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) navbar.classList.add('scrolled');
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

// Set min date to today
document.getElementById('date').min = new Date().toISOString().split('T')[0];

// HERO: Auto background slider (2s)
// Paste your imgbb DIRECT links below (start with https://i.ibb.co/... and end with .jpg/.png)
const heroImages = [
  'REPLACE_HERO_1_INTERIOR',
  'REPLACE_HERO_2_WORK',
  'REPLACE_HERO_3_INTERIOR',
  'REPLACE_HERO_4_BRIDAL',
  'REPLACE_HERO_5_BLOW'
];
// Fallback image if any link fails
const heroFallback = 'https://i.imgur.com/1Zb2t5k.jpeg';

const hero = document.querySelector('.hero');
function setHeroBgFrom(url) {
  const img = new Image();
  img.onload = () => {
    hero.style.background = `linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.6)), url('${url}') center/cover no-repeat`;
  };
  img.onerror = () => {
    hero.style.background = `linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.6)), url('${heroFallback}') center/cover no-repeat`;
  };
  img.src = url;
}

// Start slider
let heroIndex = 0;
setHeroBgFrom(heroImages[heroIndex] || heroFallback);
setInterval(() => {
  heroIndex = (heroIndex + 1) % heroImages.length;
  setHeroBgFrom(heroImages[heroIndex] || heroFallback);
}, 2000);
