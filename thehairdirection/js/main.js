// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// AOS init
AOS.init({
  duration: 1000,
  once: false,
  mirror: true,
  offset: 100,
  easing: 'ease-in-out'
});

// Mobile Menu
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  const icon = menuToggle.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-times');
});

// Close menu on link click
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

// Scroll to top visibility
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) scrollTopBtn.classList.add('visible');
  else scrollTopBtn.classList.remove('visible');
});
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e){
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Booking Form → WhatsApp automation
document.getElementById('bookingForm').addEventListener('submit', (e) => {
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
    alert('Please fill all required fields.');
    return;
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

// Refresh AOS on scroll (keeps animations alive)
window.addEventListener('scroll', () => AOS.refresh());

// HERO: auto background slider (2s)
const hero = document.querySelector('.hero');
const heroImages = [
  'https://unsplash.com/photos/_C-S7LqxHPw/download?force=true&w=1920',
  'https://unsplash.com/photos/ZY45fhFPYqM/download?force=true&w=1920',
  'https://unsplash.com/photos/To-l8M2NCso/download?force=true&w=1920',
  'https://unsplash.com/photos/PnDr2j28gXA/download?force=true&w=1920',
  'https://unsplash.com/photos/LGXN4OSQSa4/download?force=true&w=1920'
];

let heroIndex = 0;
function setHeroBg(idx){
  hero.style.background = `linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.6)), url('${heroImages[idx]}') center/cover no-repeat`;
}
setHeroBg(heroIndex);
setInterval(() => {
  heroIndex = (heroIndex + 1) % heroImages.length;
  setHeroBg(heroIndex);
}, 2000);
