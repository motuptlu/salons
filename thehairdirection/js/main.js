{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 HelveticaNeue;}
{\colortbl;\red255\green255\blue255;\red235\green235\blue237;\red22\green22\blue24;}
{\*\expandedcolortbl;;\cssrgb\c93725\c93725\c94510;\cssrgb\c11373\c11373\c12549;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs24 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 // ==========================================\
// THE HAIR DIRECTION SALON - MAIN JAVASCRIPT\
// Advanced Animations & Interactions\
// ==========================================\
\
// ========== PRELOADER ==========\
window.addEventListener('load', () => \{\
    const preloader = document.querySelector('.preloader');\
    setTimeout(() => \{\
        preloader.classList.add('hidden');\
    \}, 1500);\
\});\
\
// ========== INITIALIZE AOS (Animate On Scroll) ==========\
AOS.init(\{\
    duration: 1000,\
    easing: 'ease-out-cubic',\
    once: true,\
    offset: 100,\
    delay: 100\
\});\
\
// ========== NAVBAR SCROLL EFFECT ==========\
const navbar = document.getElementById('navbar');\
let lastScroll = 0;\
\
window.addEventListener('scroll', () => \{\
    const currentScroll = window.pageYOffset;\
    \
    // Add scrolled class for styling\
    if (currentScroll > 100) \{\
        navbar.classList.add('scrolled');\
    \} else \{\
        navbar.classList.remove('scrolled');\
    \}\
    \
    lastScroll = currentScroll;\
\});\
\
// ========== MOBILE MENU TOGGLE ==========\
const hamburger = document.getElementById('hamburger');\
const navMenu = document.getElementById('navMenu');\
const navLinks = document.querySelectorAll('.nav-link');\
\
hamburger.addEventListener('click', () => \{\
    hamburger.classList.toggle('active');\
    navMenu.classList.toggle('active');\
\});\
\
// Close menu when clicking on nav links\
navLinks.forEach(link => \{\
    link.addEventListener('click', () => \{\
        hamburger.classList.remove('active');\
        navMenu.classList.remove('active');\
    \});\
\});\
\
// ========== SMOOTH SCROLLING FOR ANCHOR LINKS ==========\
document.querySelectorAll('a[href^="#"]').forEach(anchor => \{\
    anchor.addEventListener('click', function (e) \{\
        e.preventDefault();\
        const target = document.querySelector(this.getAttribute('href'));\
        \
        if (target) \{\
            const offsetTop = target.offsetTop - 80;\
            window.scrollTo(\{\
                top: offsetTop,\
                behavior: 'smooth'\
            \});\
        \}\
    \});\
\});\
\
// ========== ACTIVE NAV LINK ON SCROLL ==========\
const sections = document.querySelectorAll('section[id]');\
\
function activateNavLink() \{\
    const scrollY = window.pageYOffset;\
    \
    sections.forEach(section => \{\
        const sectionHeight = section.offsetHeight;\
        const sectionTop = section.offsetTop - 100;\
        const sectionId = section.getAttribute('id');\
        const navLink = document.querySelector(`.nav-link[href="#$\{sectionId\}"]`);\
        \
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) \{\
            navLinks.forEach(link => link.classList.remove('active'));\
            if (navLink) navLink.classList.add('active');\
        \}\
    \});\
\}\
\
window.addEventListener('scroll', activateNavLink);\
\
// ========== HERO SLIDER ==========\
const slides = document.querySelectorAll('.hero-slide');\
let currentSlide = 0;\
\
function nextSlide() \{\
    slides[currentSlide].classList.remove('active');\
    currentSlide = (currentSlide + 1) % slides.length;\
    slides[currentSlide].classList.add('active');\
\}\
\
// Auto-change slides every 2 seconds\
setInterval(nextSlide, 2000);\
\
// ========== HERO TITLE ANIMATION ==========\
const titleLines = document.querySelectorAll('.title-line');\
\
titleLines.forEach((line, index) => \{\
    const text = line.textContent;\
    line.textContent = '';\
    \
    setTimeout(() => \{\
        let charIndex = 0;\
        const typeInterval = setInterval(() => \{\
            if (charIndex < text.length) \{\
                line.textContent += text.charAt(charIndex);\
                charIndex++;\
            \} else \{\
                clearInterval(typeInterval);\
            \}\
        \}, 50);\
    \}, index * 800);\
\});\
\
// ========== WHATSAPP BOOKING FORM ==========\
const bookingForm = document.getElementById('bookingForm');\
\
bookingForm.addEventListener('submit', (e) => \{\
    e.preventDefault();\
    \
    const name = document.getElementById('name').value;\
    const phone = document.getElementById('phone').value;\
    const email = document.getElementById('email').value;\
    const service = document.getElementById('service').value;\
    const date = document.getElementById('date').value;\
    const message = document.getElementById('message').value;\
    \
    // Create WhatsApp message\
    const whatsappMessage = `\
*New Appointment Booking*\
\uc0\u9473 \u9473 \u9473 \u9473 \u9473 \u9473 \u9473 \u9473 \u9473 \u9473 \u9473 \u9473 \u9473 \u9473 \u9473 \u9473 \u9473 \u9473 \u9473 \
\
\uc0\u55357 \u56420  *Name:* $\{name\}\
\uc0\u55357 \u56561  *Phone:* $\{phone\}\
\uc0\u55357 \u56551  *Email:* $\{email\}\
\uc0\u55357 \u56455  *Service:* $\{service\}\
\uc0\u55357 \u56517  *Preferred Date:* $\{date\}\
$\{message ? `\uc0\u55357 \u56541  *Special Requests:* $\{message\}` : ''\}\
\
\uc0\u9473 \u9473 \u9473 \u9473 \u9473 \u9473 \u9473 \u9473 \u9473 \u9473 \u9473 \u9473 \u9473 \u9473 \u9473 \u9473 \u9473 \u9473 \u9473 \
_Sent from The Hair Direction Website_\
    `.trim();\
    \
    // Encode message for URL\
    const encodedMessage = encodeURIComponent(whatsappMessage);\
    const whatsappURL = `https://wa.me/917503135104?text=$\{encodedMessage\}`;\
    \
    // Open WhatsApp\
    window.open(whatsappURL, '_blank');\
    \
    // Reset form\
    bookingForm.reset();\
\});\
\
// ========== GALLERY LIGHTBOX ==========\
const galleryItems = document.querySelectorAll('.gallery-item');\
\
galleryItems.forEach(item => \{\
    item.addEventListener('click', () => \{\
        const img = item.querySelector('img');\
        const imgSrc = img.src;\
        \
        // Create lightbox\
        const lightbox = document.createElement('div');\
        lightbox.className = 'lightbox';\
        lightbox.innerHTML = `\
            <div class="lightbox-content">\
                <span class="lightbox-close">&times;</span>\
                <img src="$\{imgSrc\}" alt="Gallery Image">\
            </div>\
        `;\
        \
        document.body.appendChild(lightbox);\
        document.body.style.overflow = 'hidden';\
        \
        // Add styles dynamically\
        if (!document.getElementById('lightbox-styles')) \{\
            const style = document.createElement('style');\
            style.id = 'lightbox-styles';\
            style.textContent = `\
                .lightbox \{\
                    position: fixed;\
                    top: 0;\
                    left: 0;\
                    width: 100%;\
                    height: 100%;\
                    background: rgba(0,0,0,0.95);\
                    z-index: 10000;\
                    display: flex;\
                    align-items: center;\
                    justify-content: center;\
                    animation: fadeIn 0.3s ease;\
                \}\
                .lightbox-content \{\
                    position: relative;\
                    max-width: 90%;\
                    max-height: 90%;\
                \}\
                .lightbox img \{\
                    max-width: 100%;\
                    max-height: 90vh;\
                    border-radius: 10px;\
                    box-shadow: 0 10px 50px rgba(0,0,0,0.5);\
                \}\
                .lightbox-close \{\
                    position: absolute;\
                    top: -40px;\
                    right: 0;\
                    color: white;\
                    font-size: 40px;\
                    cursor: pointer;\
                    transition: transform 0.3s;\
                \}\
                .lightbox-close:hover \{\
                    transform: rotate(90deg);\
                \}\
                @keyframes fadeIn \{\
                    from \{ opacity: 0; \}\
                    to \{ opacity: 1; \}\
                \}\
            `;\
            document.head.appendChild(style);\
        \}\
        \
        // Close lightbox\
        const closeBtn = lightbox.querySelector('.lightbox-close');\
        closeBtn.addEventListener('click', () => \{\
            lightbox.remove();\
            document.body.style.overflow = 'auto';\
        \});\
        \
        lightbox.addEventListener('click', (e) => \{\
            if (e.target === lightbox) \{\
                lightbox.remove();\
                document.body.style.overflow = 'auto';\
            \}\
        \});\
    \});\
\});\
\
// ========== COUNTER ANIMATION FOR STATS ==========\
function animateCounter(element, target, duration = 2000) \{\
    let current = 0;\
    const increment = target / (duration / 16);\
    \
    const timer = setInterval(() => \{\
        current += increment;\
        if (current >= target) \{\
            element.textContent = target;\
            clearInterval(timer);\
        \} else \{\
            element.textContent = Math.floor(current);\
        \}\
    \}, 16);\
\}\
\
// Trigger counter when section is visible\
const observerOptions = \{\
    threshold: 0.5\
\};\
\
const observer = new IntersectionObserver((entries) => \{\
    entries.forEach(entry => \{\
        if (entry.isIntersecting) \{\
            const badge = entry.target.querySelector('.badge-number');\
            if (badge && !badge.classList.contains('animated')) \{\
                badge.classList.add('animated');\
                animateCounter(badge, 10);\
            \}\
        \}\
    \});\
\}, observerOptions);\
\
const experienceBadge = document.querySelector('.experience-badge');\
if (experienceBadge) \{\
    observer.observe(experienceBadge);\
\}\
\
// ========== PARALLAX EFFECT ==========\
window.addEventListener('scroll', () => \{\
    const scrolled = window.pageYOffset;\
    const parallaxElements = document.querySelectorAll('.hero-slide.active');\
    \
    parallaxElements.forEach(element => \{\
        const speed = 0.5;\
        element.style.transform = `translateY($\{scrolled * speed\}px)`;\
    \});\
\});\
\
// ========== FORM VALIDATION ==========\
const inputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');\
\
inputs.forEach(input => \{\
    input.addEventListener('blur', () => \{\
        if (input.value.trim() === '' && input.hasAttribute('required')) \{\
            input.style.borderColor = '#ff4444';\
        \} else \{\
            input.style.borderColor = '';\
        \}\
    \});\
    \
    input.addEventListener('focus', () => \{\
        input.style.borderColor = '';\
    \});\
\});\
\
// ========== LAZY LOADING IMAGES ==========\
if ('IntersectionObserver' in window) \{\
    const imageObserver = new IntersectionObserver((entries, observer) => \{\
        entries.forEach(entry => \{\
            if (entry.isIntersecting) \{\
                const img = entry.target;\
                img.src = img.dataset.src || img.src;\
                img.classList.add('loaded');\
                observer.unobserve(img);\
            \}\
        \});\
    \});\
    \
    const images = document.querySelectorAll('img');\
    images.forEach(img => imageObserver.observe(img));\
\}\
\
// ========== SMOOTH REVEAL ON SCROLL ==========\
const revealElements = document.querySelectorAll('.service-card, .gallery-item, .testimonial-card');\
\
const revealObserver = new IntersectionObserver((entries) => \{\
    entries.forEach(entry => \{\
        if (entry.isIntersecting) \{\
            entry.target.style.opacity = '1';\
            entry.target.style.transform = 'translateY(0)';\
        \}\
    \});\
\}, \{ threshold: 0.1 \});\
\
revealElements.forEach(element => \{\
    element.style.opacity = '0';\
    element.style.transform = 'translateY(30px)';\
    element.style.transition = 'all 0.6s ease-out';\
    revealObserver.observe(element);\
\});\
\
// ========== CURSOR EFFECT (Desktop Only) ==========\
if (window.innerWidth > 768) \{\
    const cursor = document.createElement('div');\
    cursor.className = 'custom-cursor';\
    cursor.style.cssText = `\
        position: fixed;\
        width: 20px;\
        height: 20px;\
        border: 2px solid #C9A961;\
        border-radius: 50%;\
        pointer-events: none;\
        z-index: 9999;\
        transition: transform 0.2s, background 0.2s;\
        display: none;\
    `;\
    document.body.appendChild(cursor);\
    \
    document.addEventListener('mousemove', (e) => \{\
        cursor.style.display = 'block';\
        cursor.style.left = e.clientX - 10 + 'px';\
        cursor.style.top = e.clientY - 10 + 'px';\
    \});\
    \
    const clickables = document.querySelectorAll('a, button, .service-card, .gallery-item');\
    clickables.forEach(el => \{\
        el.addEventListener('mouseenter', () => \{\
            cursor.style.transform = 'scale(1.5)';\
            cursor.style.background = 'rgba(201,169,97,0.2)';\
        \});\
        el.addEventListener('mouseleave', () => \{\
            cursor.style.transform = 'scale(1)';\
            cursor.style.background = 'transparent';\
        \});\
    \});\
\}\
\
// ========== PERFORMANCE: Debounce Scroll Events ==========\
function debounce(func, wait = 20, immediate = true) \{\
    let timeout;\
    return function() \{\
        const context = this, args = arguments;\
        const later = function() \{\
            timeout = null;\
            if (!immediate) func.apply(context, args);\
        \};\
        const callNow = immediate && !timeout;\
        clearTimeout(timeout);\
        timeout = setTimeout(later, wait);\
        if (callNow) func.apply(context, args);\
    \};\
\}\
\
window.addEventListener('scroll', debounce(activateNavLink));\
\
// ========== CONSOLE GREETING ==========\
console.log('%c\uc0\u55356 \u57256  The Hair Direction Salon', 'color: #C9A961; font-size: 24px; font-weight: bold;');\
console.log('%cWebsite crafted with excellence \uc0\u10024 ', 'color: #666; font-size: 14px;');\
console.log('%c10+ Years of Beauty Excellence', 'color: #C9A961; font-size: 12px;');\
\
// ========== SERVICE WORKER FOR PWA (Optional) ==========\
if ('serviceWorker' in navigator) \{\
    window.addEventListener('load', () => \{\
        // Uncomment when you create service-worker.js\
        // navigator.serviceWorker.register('/service-worker.js')\
        //     .then(reg => console.log('Service Worker registered'))\
        //     .catch(err => console.log('Service Worker registration failed'));\
    \});\
\}}