/* script.js — Portfolio Interactions */

// ---- Loader ----
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hidden'), 800);
});

// ---- Custom Cursor ----
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.transform = `translate(${followerX - 18}px, ${followerY - 18}px)`;
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .expertise-card, .skill-category, .tech-badge').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform += ' scale(1.8)';
    follower.style.width = '54px';
    follower.style.height = '54px';
    follower.style.borderColor = 'rgba(255,140,0,0.75)';
  });
  el.addEventListener('mouseleave', () => {
    follower.style.width = '36px';
    follower.style.height = '36px';
    follower.style.borderColor = 'rgba(255,140,0,0.5)';
  });
});

// ---- Nav Scroll ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
});

// ---- Hamburger / Mobile Menu ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ---- Theme Toggle ----
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === 'dark' ? 'fa fa-sun' : 'fa fa-moon';
}

// ---- Scroll To Top ----
const scrollTopBtn = document.getElementById('scrollTop');
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---- Smooth Active Nav Links ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observerNav = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${id}`) {
          link.style.color = 'var(--accent)';
        }
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => observerNav.observe(s));

// ---- Scroll Reveal (fade-up) ----
const fadeEls = document.querySelectorAll('.section-header, .about-grid, .skills-grid, .tech-badges, .timeline, .projects-grid, .education-card, .contact-grid, .footer-inner');

fadeEls.forEach(el => {
  el.classList.add('fade-up');
});

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => fadeObserver.observe(el));

// ---- Skill Bar Animation ----
const skillBars = document.querySelectorAll('.skill-bar-fill');

const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const width = target.getAttribute('data-width');
      target.style.width = width + '%';
      skillObserver.unobserve(target);
    }
  });
}, { threshold: 0.3 });

skillBars.forEach(bar => skillObserver.observe(bar));

// ---- Expertise Cards Stagger ----
const expertiseCards = document.querySelectorAll('.expertise-card');

const expertiseObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.getAttribute('data-delay') || '0');
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      expertiseObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

expertiseCards.forEach(card => expertiseObserver.observe(card));

// ---- Counter animation for hero stats ----
function animateCounter(el, target, suffix) {
  let start = 0;
  const duration = 1500;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const value = Math.floor(progress * target);
    el.textContent = (suffix === 'K' ? value : value) + (suffix || '');
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target + (suffix || '');
  };
  requestAnimationFrame(step);
}

// Run counters when hero is visible (on load)
setTimeout(() => {
  const statNums = document.querySelectorAll('.stat-num');
  // Not doing full counter — numbers already formatted via HTML
}, 1000);

// ---- Glassmorphism hover on project card ----
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const glow = card.querySelector('.project-card-glow');
    if (glow) {
      glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,140,0,0.09), rgba(255,69,0,0.04), transparent 60%)`;
    }
  });
});

// ---- Typing effect for hero role ----
const heroRole = document.querySelector('.hero-role');
if (heroRole) {
  const roles = [
    'QA Automation & Manual Test Engineer',
    'Python | Selenium | Playwright | PyTest',
    'CI/CD | Telecom BSS/CRM Domain',
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const prefix = '<';
  const suffix = '/>';

  function typeRole() {
    const current = roles[roleIndex];
    if (!isDeleting) {
      charIndex++;
      heroRole.innerHTML = `<span class="mono">&lt;</span> ${current.slice(0, charIndex)} <span class="mono">/&gt;</span>`;
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(typeRole, 2000);
        return;
      }
    } else {
      charIndex--;
      heroRole.innerHTML = `<span class="mono">&lt;</span> ${current.slice(0, charIndex)} <span class="mono">/&gt;</span>`;
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    const speed = isDeleting ? 40 : 70;
    setTimeout(typeRole, speed);
  }

  // Start typing after loader
  setTimeout(typeRole, 1200);
}

// ---- Smooth scroll for all anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- Metric bars animate on scroll ----
const metricProgressBars = document.querySelectorAll('.metric-progress');
const metricObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Already set via inline style, but trigger a reflow
      const el = entry.target;
      const width = el.style.width;
      el.style.width = '0';
      setTimeout(() => { el.style.width = width; el.style.transition = 'width 1.4s cubic-bezier(0.4,0,0.2,1)'; }, 100);
      metricObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

metricProgressBars.forEach(bar => metricObserver.observe(bar));

// ---- Section transition enhancement ----
document.querySelectorAll('.section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(16px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.05 });

document.querySelectorAll('.section').forEach(section => sectionObserver.observe(section));

// ---- Hero section always visible ----
const heroSection = document.querySelector('.hero');
if (heroSection) {
  heroSection.style.opacity = '1';
  heroSection.style.transform = 'none';
}
