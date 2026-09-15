// =================================================================
// NOVA PULSE MAX — script.js
// Simple, beginner-friendly JavaScript. No frameworks.
// =================================================================

// ---- 1. Sticky navbar background on scroll ----
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---- 2. Mobile hamburger menu ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
  const isOpen = navLinks.classList.contains('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu when a link is tapped
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', false);
  });
});

// ---- 3. Scroll-reveal animations (fade up / left / right / scale) ----
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target); // animate once only
    }
  });
}, { threshold: 0.15 });

revealEls.forEach((el) => revealObserver.observe(el));

// ---- 4. Animated stat counters ----
const statNumbers = document.querySelectorAll('.stat-number');

function animateCount(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 1400; // milliseconds
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const currentValue = Math.floor(progress * target);
    el.textContent = currentValue + suffix;

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = target + suffix; // make sure it lands exactly on target
    }
  }

  requestAnimationFrame(tick);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach((el) => statsObserver.observe(el));

// ---- 5. Colorway swatches swap the showcase product photo ----
const swatches = document.querySelectorAll('#swatches .swatch');
const showcaseShoe = document.getElementById('showcaseShoe');

// Map each colorway to a real product photo of that colorway
const colorwayMap = {
  black: {
    src: 'https://images.pexels.com/photos/8079829/pexels-photo-8079829.jpeg?auto=compress&cs=tinysrgb&w=1260',
    alt: 'NOVA Pulse Max, Midnight Black colorway'
  },
  white: {
    src: 'https://images.pexels.com/photos/34003822/pexels-photo-34003822.jpeg?auto=compress&cs=tinysrgb&w=1260',
    alt: 'NOVA Pulse Max, Pure White colorway'
  },
  coral: {
    src: 'https://images.pexels.com/photos/1449844/pexels-photo-1449844.jpeg?auto=compress&cs=tinysrgb&w=1260',
    alt: 'NOVA Pulse Max, Electric Coral colorway'
  },
  blue: {
    src: 'https://images.pexels.com/photos/13450843/pexels-photo-13450843.jpeg?auto=compress&cs=tinysrgb&w=1260',
    alt: 'NOVA Pulse Max, Ocean Blue colorway'
  }
};

swatches.forEach((swatch) => {
  swatch.addEventListener('click', () => {
    // Update pressed state for accessibility + the ring highlight
    swatches.forEach((s) => s.setAttribute('aria-pressed', 'false'));
    swatch.setAttribute('aria-pressed', 'true');

    // Fade the photo out, swap the image, then fade back in
    const colorKey = swatch.getAttribute('data-color');
    const photo = colorwayMap[colorKey];
    if (!photo) return;

    showcaseShoe.classList.add('swapping');
    setTimeout(() => {
      showcaseShoe.src = photo.src;
      showcaseShoe.alt = photo.alt;
      showcaseShoe.classList.remove('swapping');
    }, 200);
  });
});

// ---- 6. Size selection buttons ----
const sizeButtons = document.querySelectorAll('#sizes .size-btn');

sizeButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    sizeButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ---- 7. Add to Cart button feedback ----
const addToCartBtn = document.getElementById('addToCartBtn');
const cartMsg = document.getElementById('cartMsg');

addToCartBtn.addEventListener('click', () => {
  const activeSize = document.querySelector('#sizes .size-btn.active');
  const size = activeSize ? activeSize.textContent : '9';
  cartMsg.textContent = `Added to cart — size ${size}.`;

  // Clear the message after a few seconds
  clearTimeout(addToCartBtn._msgTimeout);
  addToCartBtn._msgTimeout = setTimeout(() => {
    cartMsg.textContent = '';
  }, 3000);
});

// ---- 8. Newsletter form (no real backend, just a friendly message) ----
const newsletterForm = document.getElementById('newsletterForm');
const newsletterMsg = document.getElementById('newsletterMsg');

newsletterForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const emailInput = newsletterForm.querySelector('input[type="email"]');
  newsletterMsg.textContent = `Thanks — you're on the list, ${emailInput.value}.`;
  newsletterForm.reset();

  clearTimeout(newsletterForm._msgTimeout);
  newsletterForm._msgTimeout = setTimeout(() => {
    newsletterMsg.textContent = '';
  }, 4000);
});

// ---- 9. Footer year ----
document.getElementById('year').textContent = new Date().getFullYear();
