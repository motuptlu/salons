// Year
document.getElementById('year').textContent = new Date().getFullYear();

// AOS init
AOS.init({ duration: 800, once: false, mirror: true, offset: 100, easing: 'ease-out' });

// Mobile menu
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
menuToggle.addEventListener('click', () => {
  const open = navMenu.classList.toggle('active');
  menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
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

// Navbar scroll style
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

// Set min date to today
document.getElementById('date').min = new Date().toISOString().split('T')[0];

// HERO Pro: Swiper fade slider (smooth + premium)
window.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (window.Swiper) {
    new Swiper('.hero-swiper', {
      loop: true,
      effect: 'fade',
      speed: 1100,
      autoplay: reduceMotion ? false : { delay: 3800, disableOnInteraction: false },
      allowTouchMove: true,
      grabCursor: true,
      keyboard: { enabled: true },
      pagination: { el: '.hero-pagination', clickable: true },
      navigation: { nextEl: '.hero-next', prevEl: '.hero-prev' }
    });
  }
});
