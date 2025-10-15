// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
navToggle?.addEventListener('click', () => {
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Swiper hero - 2s autoplay with fade
const heroSwiper = new Swiper('.hero .swiper', {
  loop: true,
  effect: 'fade',
  speed: 800,
  autoplay: { delay: 2000, disableOnInteraction: false },
  allowTouchMove: true
});

// GSAP animations
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReduced) {
  gsap.registerPlugin(ScrollTrigger);

  // Hero entrance
  gsap.fromTo('.hero .display', {y:24, opacity:0}, {y:0, opacity:1, duration:1, ease:'power3.out', delay:0.1});
  gsap.fromTo('.hero .sub', {y:18, opacity:0}, {y:0, opacity:1, duration:1, ease:'power3.out', delay:0.2});
  gsap.fromTo('.hero .cta', {y:18, opacity:0}, {y:0, opacity:1, duration:1, ease:'power3.out', delay:0.3});
  gsap.fromTo('.hero .hero-badges', {y:18, opacity:0}, {y:0, opacity:1, duration:1, ease:'power3.out', delay:0.4});

  // Reveal on scroll
  document.querySelectorAll('[data-animate]').forEach(el => {
    const dir = el.getAttribute('data-animate') || 'up';
    const delay = parseFloat(el.getAttribute('data-delay') || 0);
    const from = {opacity:0};
    if (dir === 'left') from.x = -60;
    if (dir === 'right') from.x = 60;
    if (dir === 'up') from.y = 40;
    if (dir === 'down') from.y = -40;
    if (dir === 'scale') { from.scale = 0.94; from.y = 20; }

    gsap.from(el, {
      ...from,
      duration: 1,
      ease: 'power3.out',
      delay,
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  // Parallax subtle on service images
  document.querySelectorAll('.service-card .media img').forEach(img => {
    gsap.to(img, {
      scale: 1.07,
      scrollTrigger: {
        trigger: img,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
}

// WhatsApp Booking automation
const form = document.getElementById('bookingForm');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const service = document.getElementById('service').value.trim();
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const note = document.getElementById('note').value.trim();

  if (!name || !service || !date || !time) return alert('Please fill all required fields.');

  const msg = `Hi THD! I want to book an appointment.%0A%0A` +
              `Name: ${encodeURIComponent(name)}%0A` +
              `Service: ${encodeURIComponent(service)}%0A` +
              `Date: ${encodeURIComponent(date)}%0A` +
              `Time: ${encodeURIComponent(time)}%0A` +
              (note ? `Notes: ${encodeURIComponent(note)}%0A` : '') +
              `%0AShared from website.`;

  const wa = `https://wa.me/917503135104?text=${msg}`;
  window.open(wa, '_blank', 'noopener');
});

// Active section highlighting (optional)
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    if (entry.isIntersecting) {
      document.querySelectorAll('.nav a').forEach(a => a.classList.remove('active'));
      const link = document.querySelector(`.nav a[href="#${id}"]`);
      link?.classList.add('active');
    }
  });
},{threshold: .5});

document.querySelectorAll('section[id]').forEach(sec => observer.observe(sec));
