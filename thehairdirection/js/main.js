// Initialize AOS with repeat animation on every scroll
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
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll to top
const scrollTop = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTop.classList.add('visible');
    } else {
        scrollTop.classList.remove('visible');
    }
});

scrollTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Booking Form
document.getElementById('bookingForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        notes: document.getElementById('notes').value
    };
    const msg = `Hello The Hair Direction!\n\n✨ NEW BOOKING ✨\n\n👤 Name: ${data.name}\n📧 Email: ${data.email}\n📱 Phone: ${data.phone}\n✂️ Service: ${data.service}\n📅 Date: ${data.date}\n⏰ Time: ${data.time}\n📝 Notes: ${data.notes || 'None'}\n\nThank you!`;
    window.open(`https://wa.me/917503135104?text=${encodeURIComponent(msg)}`, '_blank');
});

// Set min date
document.getElementById('date').min = new Date().toISOString().split('T')[0];

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Refresh AOS on scroll
window.addEventListener('scroll', () => {
    AOS.refresh();
});
