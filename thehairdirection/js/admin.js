// ADMIN CREDENTIALS (Hardcoded - For production use Firebase Authentication)
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

// HERO SECTION HANDLERS
const heroForm = document.getElementById('heroForm');
const heroImageUpload = document.getElementById('heroImageUpload');
const heroImagesInput = document.getElementById('heroImagesInput');
const heroImagesPreview = document.getElementById('heroImagesPreview');

heroImageUpload.addEventListener('click', () => heroImagesInput.click());

let heroImages = [];
heroImagesInput.addEventListener('change', (e) => {
  const files = Array.from(e.target.files).slice(0, 6); // Max 6 images
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
  displayHeroPreview(heroImages);
};

heroForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    eyebrow: document.getElementById('heroEyebrowInput').value,
    title: document.getElementById('heroTitleInput').value,
    subtitle: document.getElementById('heroSubtitleInput').value
  };
  
  // Save to Firebase
  await db.ref('hero').set(data);
  
  // Upload images if any
  if (heroImages.length > 0) {
    const imageUrls = [];
    for (let i = 0; i < heroImages.length; i++) {
      const url = await uploadImage(heroImages[i], `hero/image${i}`);
      imageUrls.push(url);
    }
    await db.ref('hero/images').set(imageUrls);
  }
  
  showSuccess('heroSuccess');
});

// ABOUT SECTION HANDLERS
const aboutForm = document.getElementById('aboutForm');
const aboutImageUpload = document.getElementById('aboutImageUpload');
const aboutImageInput = document.getElementById('aboutImageInput');
const aboutImagePreview = document.getElementById('aboutImagePreview');

aboutImageUpload.addEventListener('click', () => aboutImageInput.click());

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
  const data = {
    title: document.getElementById('aboutTitleInput').value,
    desc1: document.getElementById('aboutDesc1Input').value,
    desc2: document.getElementById('aboutDesc2Input').value
  };
  
  await db.ref('about').set(data);
  
  if (aboutImageInput.files[0]) {
    const url = await uploadImage(aboutImageInput.files[0], 'about/image');
    await db.ref('about/image').set(url);
  }
  
  showSuccess('aboutSuccess');
});

// SERVICES HANDLERS
const servicesForm = document.getElementById('servicesForm');
const servicesContainer = document.getElementById('servicesContainer');
const addServiceBtn = document.getElementById('addServiceBtn');

let services = [];

addServiceBtn.addEventListener('click', () => {
  const index = services.length;
  services.push({ icon: '✂️', title: '', description: '', image: null });
  renderServices();
});

function renderServices() {
  servicesContainer.innerHTML = services.map((service, index) => `
    <div style="background:rgba(255,255,255,.05); padding:20px; border-radius:12px; margin-bottom:15px; border:1px solid rgba(168,216,234,.2)">
      <h4 style="color:#A8D8EA; margin-bottom:15px">Service ${index + 1}</h4>
      <div class="form-row">
        <input type="text" class="input-field" placeholder="Icon (emoji)" value="${service.icon}" onchange="updateService(${index}, 'icon', this.value)">
        <input type="text" class="input-field" placeholder="Service Title" value="${service.title}" onchange="updateService(${index}, 'title', this.value)">
      </div>
      <textarea class="input-field" placeholder="Service Description" onchange="updateService(${index}, 'description', this.value)">${service.description}</textarea>
      <input type="file" accept="image/*" onchange="updateServiceImage(${index}, this.files[0])" style="margin-top:10px; color:#fff">
      <button type="button" onclick="removeService(${index})" style="background:rgba(255,0,0,.3); color:#fff; border:none; padding:8px 16px; border-radius:20px; cursor:pointer; margin-top:10px">Remove Service</button>
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
  const servicesData = [];
  
  for (let i = 0; i < services.length; i++) {
    const service = services[i];
    let imageUrl = service.imageUrl || '';
    
    if (service.image) {
      imageUrl = await uploadImage(service.image, `services/service${i}`);
    }
    
    servicesData.push({
      icon: service.icon,
      title: service.title,
      description: service.description,
      image: imageUrl
    });
  }
  
  await db.ref('services').set(servicesData);
  showSuccess('servicesSuccess');
});

// GALLERY HANDLERS
const galleryForm = document.getElementById('galleryForm');
const galleryImageUpload = document.getElementById('galleryImageUpload');
const galleryImagesInput = document.getElementById('galleryImagesInput');
const galleryImagesPreview = document.getElementById('galleryImagesPreview');

galleryImageUpload.addEventListener('click', () => galleryImagesInput.click());

let galleryImages = [];
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
  displayGalleryPreview(galleryImages);
};

galleryForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  if (galleryImages.length > 0) {
    const imageUrls = [];
    for (let i = 0; i < galleryImages.length; i++) {
      const url = await uploadImage(galleryImages[i], `gallery/image${Date.now()}_${i}`);
      imageUrls.push(url);
    }
    await db.ref('gallery/images').set(imageUrls);
  }
  
  showSuccess('gallerySuccess');
});

// CONTACT HANDLERS
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

// HELPER FUNCTIONS
async function uploadImage(file, path) {
  const storageRef = storage.ref(`${path}_${Date.now()}`);
  await storageRef.put(file);
  return await storageRef.getDownloadURL();
}

function showSuccess(elementId) {
  const el = document.getElementById(elementId);
  el.style.display = 'block';
  setTimeout(() => {
    el.style.display = 'none';
  }, 3000);
}

// LOAD EXISTING DATA
async function loadAllData() {
  try {
    // Load Hero
    const heroData = await db.ref('hero').once('value');
    if (heroData.exists()) {
      const data = heroData.val();
      document.getElementById('heroEyebrowInput').value = data.eyebrow || '';
      document.getElementById('heroTitleInput').value = data.title || '';
      document.getElementById('heroSubtitleInput').value = data.subtitle || '';
    }
    
    // Load About
    const aboutData = await db.ref('about').once('value');
    if (aboutData.exists()) {
      const data = aboutData.val();
      document.getElementById('aboutTitleInput').value = data.title || '';
      document.getElementById('aboutDesc1Input').value = data.desc1 || '';
      document.getElementById('aboutDesc2Input').value = data.desc2 || '';
    }
    
    // Load Services
    const servicesData = await db.ref('services').once('value');
    if (servicesData.exists()) {
      services = servicesData.val();
      services.forEach(s => { s.imageUrl = s.image; s.image = null; });
      renderServices();
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
