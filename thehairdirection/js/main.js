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

// HERO: Auto background slider (2s) — imgbb direct links
const heroImages = [
  // Interior/ambience
  'https://i.ibb.co/0RQXHHwQ/premium-photo-1664048712492-9d395c204e37-ixid-M3wx-Mj-A3f-DB8-MXxhb-Gx8f-Hx8f-Hx8f-Hwx-Nz-Yw-NTU1-Mz.jpg',
  // Haircut moment
  'https://i.ibb.co/C5YDRSLB/photo-1695527081848-1e46c06e6458-ixid-M3wx-Mj-A3f-DB8-MXxhb-Gx8f-Hx8f-Hx8f-Hwx-Nz-Yw-NTU1-Mzk1f-A-ix.jpg',
  // Blow dry
  'https://i.ibb.co/9H458Czv/photo-1599351431408-433ef72fe40b-ixid-M3wx-Mj-A3f-DB8-MXxhb-Gx8f-Hx8f-Hx8f-Hwx-Nz-Yw-NTU1-Mzk2f-A-ix.jpg',
  // Bridal
  'https://i.ibb.co/fV6vBXS6/photo-1549236177-f9b0031756eb-ixid-M3wx-Mj-A3f-DB8-MXxhb-Gx8f-Hx8f-Hx8f-Hwx-Nz-Yw-NTU1-Mzk1f-A-ixlib.jpg',
  // Stylist at work / portrait
  'https://i.ibb.co/WW4BTgzf/premium-photo-1676677522880-639b99b1f27b-ixid-M3wx-Mj-A3f-DB8-MXxhb-Gx8f-Hx8f-Hx8f-Hwx-Nz-Yw-NTU1-Mz.jpg'
];
const heroFallback = 'https://i.ibb.co/0RQXHHwQ/premium-photo-1664048712492-9d395c204e37-ixid-M3wx-Mj-A3f-DB8-MXxhb-Gx8f-Hx8f-Hx8f-Hwx-Nz-Yw-NTU1-Mz.jpg';
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

let heroIndex = 0;
setHeroBgFrom(heroImages[heroIndex] || heroFallback);
setInterval(() => {
  heroIndex = (heroIndex + 1) % heroImages.length;
  setHeroBgFrom(heroImages[heroIndex] || heroFallback);
}, 2000);
