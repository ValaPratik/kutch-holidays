// Set minimum date for travel date input
const dateInput = document.getElementById('dateInput');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}

// Redirect enquiry form to WhatsApp
const enquiryForm = document.getElementById('enquiryForm');
if (enquiryForm) {
  enquiryForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.querySelector('input[name="name"]').value;
    const phone = document.querySelector('input[name="phone"]').value;
    const pkg = document.getElementById('packageSelect').value;
    const sharing = document.getElementById('sharingFormSelect').selectedOptions[0].text;
    const date = document.querySelector('input[name="date"]').value;
    const travellers = document.getElementById('travellersInput').value;
    const message = document.querySelector('textarea[name="message"]').value;

    const waText = `New Enquiry from Website:
Name: ${name}
Phone: ${phone}
Package: ${pkg}
Sharing: ${sharing}
Date: ${date}
Travellers: ${travellers}
Special Request: ${message}`;

    window.open(`https://wa.me/918866806434?text=${encodeURIComponent(waText)}`, '_blank');
  });
}

// ===== Kutch Holidays — site behaviour =====

// Mobile hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open'))
  );
}

// Hero Automatic Background Image Slider
let slideIndex = 0;
const slides = document.querySelectorAll('.hero-slider .slide');
const dots = document.querySelectorAll('.slider-dots .dot');

function showSlides() {
  if (!slides.length) return;
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));

  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].classList.add('active');
  dots[slideIndex].classList.add('active');
}

function currentSlide(n) {
  if (!slides.length) return;
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));

  slideIndex = n;
  slides[slideIndex].classList.add('active');
  dots[slideIndex].classList.add('active');
}

if (slides.length > 0) {
  setInterval(showSlides, 4000);
}

// ===== Rate Check Popup Modal logic =====
let currentRates = { double: '₹9,999', triple: '₹9,500', four: '₹9,000' };
let currentPkgName = '2N/3D Explore The White Rann';
let activePriceElId = 'price-2n';
let activeLabelElId = 'label-2n';

function openRateModal(pkgName, doubleRate, tripleRate, fourRate, priceElId, labelElId) {
  currentPkgName = pkgName;
  currentRates = { double: doubleRate, triple: tripleRate, four: fourRate };
  activePriceElId = priceElId;
  activeLabelElId = labelElId;

  document.getElementById('modalPkgTitle').innerText = pkgName;

  // Set dropdown based on currently selected sharing type name on the card
  const currentLabel = document.getElementById(labelElId).innerText.toLowerCase();
  let selVal = 'double';
  if (currentLabel.includes('triple')) selVal = 'triple';
  else if (currentLabel.includes('four')) selVal = 'four';

  document.getElementById('sharingSelect').value = selVal;
  updateSharingRate();

  document.getElementById('rateModal').classList.add('open');
}

function closeRateModal() {
  document.getElementById('rateModal').classList.remove('open');
}

function updateSharingRate() {
  const sel = document.getElementById('sharingSelect').value;
  document.getElementById('modalPriceVal').innerText = currentRates[sel];
}

function applyCustomPackageInquiry() {
  const sharingType = document.getElementById('sharingSelect').value;
  const sharingText = document.getElementById('sharingSelect').selectedOptions[0].text;
  const priceText = document.getElementById('modalPriceVal').innerText;

  // 1. Update Card Display (only show name)
  const priceEl = document.getElementById(activePriceElId);
  const labelEl = document.getElementById(activeLabelElId);

  if (labelEl) labelEl.innerText = sharingText;
  if (priceEl) priceEl.innerHTML = `${priceText}<span class="pp">/pp</span>`;

  // 2. Automatically set form values
  const pkgSelect = document.getElementById('packageSelect');
  if (pkgSelect) {
    for (const opt of pkgSelect.options) {
      if (opt.text.startsWith(currentPkgName.split(' —')[0])) {
        pkgSelect.value = opt.value || opt.text;
        break;
      }
    }
  }

  const travellersInput = document.getElementById('travellersInput');
  if (travellersInput) {
    if (sharingType === 'double') travellersInput.value = 2;
    else if (sharingType === 'triple') travellersInput.value = 3;
    else if (sharingType === 'four') travellersInput.value = 4;
  }

  // 3. Pre-fill message
  const msgBox = document.querySelector('textarea[name="message"]');
  if (msgBox) {
    msgBox.value = `Custom Inquiry: ${currentPkgName} (${sharingText} at ${priceText} per person). Please confirm availability.`;
  }

  closeRateModal();

  // 4. Scroll to enquiry form
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
}

window.addEventListener('click', function(e) {
  const modal = document.getElementById('rateModal');
  if (e.target === modal) closeRateModal();
});

// Prefill form for regular "Send Enquiry" buttons
function prefillForm(packageLabel) {
  const sel = document.getElementById('packageSelect');
  if (!sel) return;
  for (const opt of sel.options) {
    if (opt.text.startsWith(packageLabel.split(' —')[0])) {
      sel.value = opt.value || opt.text;
      break;
    }
  }
}