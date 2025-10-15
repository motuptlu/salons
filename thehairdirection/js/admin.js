// ADMIN CREDENTIALS
const ADMIN_USER = 'thehairdirection6000';
const ADMIN_PASS = 'thehairdirection6000';

// DOM Elements
const loginPage = document.getElementById('loginPage');
const adminDashboard = document.getElementById('adminDashboard');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');

// Check if already logged in
if (localStorage.getItem('adminLoggedIn') === 'true') {
  showDashboard();
}

// Login Handler
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const user = document.getElementById('adminUser').value;
  const pass = document.getElementById('adminPass').value;
  
  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    localStorage.setItem('adminLoggedIn', 'true');
    showDashboard();
    loadAllData();
  } else {
    loginError.textContent = '❌ Invalid credentials. Please try again.';
    loginError.style.display = 'block';
    setTimeout(() => {
      loginError.style.display = 'none';
    }, 3000);
  }
});

// Logout Handler
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('adminLoggedIn');
  location.reload();
});

function showDashboard() {
  loginPage.style.display = 'none';
  adminDashboard.style.display = 'block';
}

// TAB SWITCHING
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// ========== IMAGE UPLOAD TO IMGBB (Free Hosting) ==========
async function uploadToImgBB(file) {
  const formData = new FormData();
  formData.append('image', file);
  
  try {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${window.IMGBB_API_KEY}`, {
      method: 'POST',
      body: formData
    });
    
    const data = await response.json();
    if (data.success) {
      return data.data.url; // Direct image URL
    } else {
      throw new Error('Upload failed');
    }
  } catch (error) {
    console.error('ImgBB upload error:', error);
    alert('Image upload failed. Please check your ImgBB API key.');
    return null;
  }
}

// ========== HERO SECTION ==========
const heroForm = document.getElementById('heroForm');
const heroImageUpload = document.getElementById('heroImageUpload');
const heroImagesInput = document.getElementById('heroImagesInput');
const heroImagesPreview = document.getElementById('heroImagesPreview');
const heroLoading = document.getElementById('heroLoading');

heroImageUpload.addEventListener('click', () => heroImagesInput.click());

let heroImages = [];
let heroImageUrls = [];

heroImagesInput.addEventListener('change', (e) => {
  const files = Array.from(e.target.files).slice(0, 6);
  heroImages = files;
  displayHeroPreview(files);
});

function displayHeroPreview(files) {
  heroImagesPreview.innerHTML = '';
  files.forEach((file, index) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const div = document.createElement('div');
      div.className = 'preview-item';
      div.innerHTML = `
        <img src="${e.target.result}" alt="Hero ${index + 1}">
        <button type="button" onclick="removeHeroImage(${index})">×</button>
      `;
      heroImagesPreview.appendChild(div);
    };
    reader.readAsDataURL(file);
  });
}

window.removeHeroImage = (index) => {
  heroImages.splice(index, 1);
  heroImageUrls.splice(index, 1);
  displayHeroPreview(heroImages);
};

heroForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  heroLoading.style.display = 'block';
  
  const data = {
    eyebrow: document.getElementById('heroEyebrowInput').value,
    title: document.getElementById('heroTitleInput').value,
    subtitle: document.getElementById('heroSubtitleInput').value
  };
  
  // Upload images to ImgBB
  if (heroImages.length > 0) {
    const imageUrls = [];
    for (let i = 0; i < heroImages.length; i++) {
      const url = await uploadToImgBB(heroImages[i]);
      if (url) imageUrls.push(url);
    }
    data.images = imageUrls;
    heroImageUrls = imageUrls;
  } else if (heroImageUrls.length > 0) {
    data.images = heroImageUrls;
  }
  
  // Save to Firebase Database
  await db.ref('hero').set(data);
  
  heroLoading.style.display = 'none';
  showSuccess('heroSuccess');
  heroImages = [];
});

// ========== ABOUT SECTION ==========
const aboutForm = document.getElementById('aboutForm');
const aboutImageUpload = document.getElementById('aboutImageUpload');
const aboutImageInput = document.getElementById('aboutImageInput');
const aboutImagePreview = document.getElementById('aboutImagePreview');
const aboutLoading = document.getElementById('aboutLoading');

aboutImageUpload.addEventListener('click', () => aboutImageInput.click());

let aboutImageUrl = '';

aboutImageInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      aboutImagePreview.innerHTML = `
        <div class="preview-item">
          <img src="${e.target.result}" alt="About">
        </div>
      `;
    };
    reader.readAsDataURL(file);
  }
});

aboutForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  aboutLoading.style.display = 'block';
  
  const data = {
    title: document.getElementById('aboutTitleInput').value,
    desc1: document.getElementById('aboutDesc1Input').value,
    desc2: document.getElementById('aboutDesc2Input').value
  };
  
  if (aboutImageInput.files[0]) {
    const url = await uploadToImgBB(aboutImageInput.files[0]);
    if (url) {
      data.image = url;
      aboutImageUrl = url;
    }
  } else if (aboutImageUrl) {
    data.image = aboutImageUrl;
  }
  
  await db.ref('about').set(data);
  
  aboutLoading.style.display = 'none';
  showSuccess('aboutSuccess');
});

// ========== SERVICES SECTION ==========
const servicesForm = document.getElementById('servicesForm');
const servicesContainer = document.getElementById('servicesContainer');
const addServiceBtn = document.getElementById('addServiceBtn');
const serviceCountSpan = document.getElementById('serviceCount');
const servicesLoading = document.getElementById('servicesLoading');

let services = [];

addServiceBtn.addEventListener('click', () => {
  services.push({ 
    icon: '✂️', 
    title: '', 
    description: '', 
    image: null,
    imageUrl: ''
  });
  renderServices();
});

function renderServices() {
  serviceCountSpan.textContent = services.length;
  servicesContainer.innerHTML = services.map((service, index) => `
    <div class="service-item">
      <h4>Service ${index + 1}</h4>
      <div class="form-row">
        <div class="form-group">
          <label>Icon (emoji)</label>
          <input type="text" class="input-field" value="${service.icon}" onchange="updateService(${index}, 'icon', this.value)">
        </div>
        <div class="form-group">
          <label>Service Title</label>
          <input type="text" class="input-field" placeholder="e.g., Haircut & Styling" value="${service.title}" onchange="updateService(${index}, 'title', this.value)">
        </div>
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea class="input-field" placeholder="Brief description..." onchange="updateService(${index}, 'description', this.value)">${service.description}</textarea>
      </div>
      <div class="form-group">
        <label>Service Image</label>
        <input type="file" accept="image/*" onchange="updateServiceImage(${index}, this.files[0])" style="color:#fff; padding:10px; background:rgba(255,255,255,.1); border-radius:8px; border:1px solid rgba(168,216,234,.3); width:100%">
        ${service.imageUrl ? `<img src="${service.imageUrl}" style="width:100px; height:100px; object-fit:cover; border-radius:8px; margin-top:10px">` : ''}
      </div>
      <button type="button" class="btn-remove" onclick="removeService(${index})">🗑️ Remove Service</button>
    </div>
  `).join('');
}

window.updateService = (index, field, value) => {
  services[index][field] = value;
};

window.updateServiceImage = (index, file) => {
  services[index].image = file;
};

window.removeService = (index) => {
  services.splice(index, 1);
  renderServices();
};

servicesForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  servicesLoading.style.display = 'block';
  
  const servicesData = [];
  
  for (let i = 0; i < services.length; i++) {
    const service = services[i];
    let imageUrl = service.imageUrl || '';
    
    if (service.image) {
      const url = await uploadToImgBB(service.image);
      if (url) {
        imageUrl = url;
        services[i].imageUrl = url;
        services[i].image = null;
      }
    }
    
    servicesData.push({
      icon: service.icon,
      title: service.title,
      description: service.description,
      image: imageUrl
    });
  }
  
  await db.ref('services').set(servicesData);
  
  servicesLoading.style.display = 'none';
  showSuccess('servicesSuccess');
  renderServices();
});

// ========== GALLERY SECTION ==========
const galleryForm = document.getElementById('galleryForm');
const galleryImageUpload = document.getElementById('galleryImageUpload');
const galleryImagesInput = document.getElementById('galleryImagesInput');
const galleryImagesPreview = document.getElementById('galleryImagesPreview');
const galleryCountSpan = document.getElementById('galleryCount');
const galleryLoading = document.getElementById('galleryLoading');

galleryImageUpload.addEventListener('click', () => galleryImagesInput.click());

let galleryImages = [];
let galleryImageUrls = [];

galleryImagesInput.addEventListener('change', (e) => {
  const files = Array.from(e.target.files);
  galleryImages = files;
  displayGalleryPreview(files);
});

function displayGalleryPreview(files) {
  galleryImagesPreview.innerHTML = '';
  files.forEach((file, index) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const div = document.createElement('div');
      div.className = 'preview-item';
      div.innerHTML = `
        <img src="${e.target.result}" alt="Gallery ${index + 1}">
        <button type="button" onclick="removeGalleryImage(${index})">×</button>
      `;
      galleryImagesPreview.appendChild(div);
    };
    reader.readAsDataURL(file);
  });
}

window.removeGalleryImage = (index) => {
  galleryImages.splice(index, 1);
  galleryImageUrls.splice(index, 1);
  displayGalleryPreview(galleryImages);
};

galleryForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  galleryLoading.style.display = 'block';
  
  if (galleryImages.length > 0) {
    const imageUrls = [];
    for (let i = 0; i < galleryImages.length; i++) {
      const url = await uploadToImgBB(galleryImages[i]);
      if (url) imageUrls.push(url);
    }
    galleryImageUrls = [...galleryImageUrls, ...imageUrls];
    await db.ref('gallery/images').set(galleryImageUrls);
  }
  
  galleryLoading.style.display = 'none';
  showSuccess('gallerySuccess');
  galleryImages = [];
  galleryImagesInput.value = '';
  galleryImagesPreview.innerHTML = '';
});

// ========== CONTACT SECTION ==========
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const data = {
    phone: document.getElementById('contactPhone').value,
    whatsapp: document.getElementById('contactWhatsApp').value,
    email: document.getElementById('contactEmail').value,
    address: document.getElementById('contactAddress').value,
    instagram: document.getElementById('contactInstagram').value,
    facebook: document.getElementById('contactFacebook').value
  };
  
  await db.ref('contact').set(data);
  showSuccess('contactSuccess');
});

// ========== HELPER FUNCTIONS ==========
function showSuccess(elementId) {
  const el = document.getElementById(elementId);
  el.style.display = 'block';
  setTimeout(() => {
    el.style.display = 'none';
  }, 3000);
}

// ========== LOAD EXISTING DATA ==========
async function loadAllData() {
  try {
    // Load Hero
    const heroData = await db.ref('hero').once('value');
    if (heroData.exists()) {
      const data = heroData.val();
      document.getElementById('heroEyebrowInput').value = data.eyebrow || '';
      document.getElementById('heroTitleInput').value = data.title || '';
      document.getElementById('heroSubtitleInput').value = data.subtitle || '';
      if (data.images) heroImageUrls = data.images;
    }
    
    // Load About
    const aboutData = await db.ref('about').once('value');
    if (aboutData.exists()) {
      const data = aboutData.val();
      document.getElementById('aboutTitleInput').value = data.title || '';
      document.getElementById('aboutDesc1Input').value = data.desc1 || '';
      document.getElementById('aboutDesc2Input').value = data.desc2 || '';
      if (data.image) {
        aboutImageUrl = data.image;
        aboutImagePreview.innerHTML = `<div class="preview-item"><img src="${data.image}" alt="About"></div>`;
      }
    }
    
    // Load Services
    const servicesData = await db.ref('services').once('value');
    if (servicesData.exists()) {
      services = servicesData.val().map(s => ({
        icon: s.icon,
        title: s.title,
        description: s.description,
        image: null,
        imageUrl: s.image
      }));
      renderServices();
    }
    
    // Load Gallery
    const galleryData = await db.ref('gallery/images').once('value');
    if (galleryData.exists()) {
      galleryImageUrls = galleryData.val() || [];
      galleryCountSpan.textContent = galleryImageUrls.length;
    }
    
    // Load Contact
    const contactData = await db.ref('contact').once('value');
    if (contactData.exists()) {
      const data = contactData.val();
      document.getElementById('contactPhone').value = data.phone || '';
      document.getElementById('contactWhatsApp').value = data.whatsapp || '';
      document.getElementById('contactEmail').value = data.email || '';
      document.getElementById('contactAddress').value = data.address || '';
      document.getElementById('contactInstagram').value = data.instagram || '';
      document.getElementById('contactFacebook').value = data.facebook || '';
    }
  } catch (error) {
    console.error('Error loading data:', error);
  }
}
