/* ============================================================
   ASIF IBNE KAMAL — PORTFOLIO JAVASCRIPT
   Advanced Animations & Interactions
============================================================ */

// ─── CUSTOM CURSOR ───────────────────────────────────────────
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .skill-tag, .about-card, .edu-card, .cert-card, .timeline-card, .info-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hovered');
    cursorFollower.classList.add('hovered');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hovered');
    cursorFollower.classList.remove('hovered');
  });
});

// ─── PARTICLE SYSTEM ─────────────────────────────────────────
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
const PARTICLE_COUNT = 70;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.radius = Math.random() * 1.5 + 0.3;
    this.alpha = Math.random() * 0.5 + 0.1;
    this.color = `rgba(56, 189, 248, ${this.alpha})`;
    this.life = 0;
    this.maxLife = Math.random() * 500 + 200;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life++;
    if (this.life > this.maxLife || this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
  }
  draw() {
    const opacity = Math.sin((this.life / this.maxLife) * Math.PI) * this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(56, 189, 248, ${opacity})`;
    ctx.fill();
  }
}

for (let i = 0; i < PARTICLE_COUNT; i++) {
  const p = new Particle();
  p.life = Math.random() * p.maxLife;
  particles.push(p);
}

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const opacity = (1 - dist / 120) * 0.12;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawConnections();
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ─── NAVBAR ──────────────────────────────────────────────────
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
});

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('open');
});

navLinkItems.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
  });
});

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      if (scrollPos >= top && scrollPos < top + height) {
        navLinkItems.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

// ─── TYPING ANIMATION ─────────────────────────────────────────
const roles = [
  'Business Development Professional',
  'International Client Communicator',
  'Data Analytics Enthusiast',
  'Sales Executive',
  'Web Designer'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typingText');

function typeRole() {
  const currentRole = roles[roleIndex];
  if (isDeleting) {
    typingEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }
  if (!isDeleting && charIndex === currentRole.length) {
    setTimeout(() => { isDeleting = true; }, 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }
  const speed = isDeleting ? 40 : 70;
  setTimeout(typeRole, speed);
}

setTimeout(typeRole, 1000);

// ─── SCROLL REVEAL ────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 0);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// ─── COUNTER ANIMATION ───────────────────────────────────────
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num[data-count]');
      nums.forEach(num => {
        const target = parseInt(num.getAttribute('data-count'));
        let count = 0;
        const step = target / 40;
        const interval = setInterval(() => {
          count = Math.min(count + step, target);
          num.textContent = Math.round(count);
          if (count >= target) clearInterval(interval);
        }, 40);
      });
      counterObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) counterObserver.observe(heroStats);

// ─── PROGRESS BARS ───────────────────────────────────────────
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.prof-bar-fill');
      fills.forEach(fill => {
        const w = fill.getAttribute('data-width');
        setTimeout(() => {
          fill.style.width = w + '%';
        }, 200);
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const profSection = document.querySelector('.proficiency');
if (profSection) barObserver.observe(profSection);

// ─── CONTACT FORM — PURE NATIVE FORMSUBMIT ───────────────────
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', () => {
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
      submitBtn.querySelector('span').textContent = 'Sending...';
    }
  });
}

function showToast(msg) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = msg;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 50);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// ─── PARALLAX HERO GLOW ──────────────────────────────────────
document.addEventListener('mousemove', (e) => {
  const glow1 = document.querySelector('.glow-1');
  const glow2 = document.querySelector('.glow-2');
  if (!glow1 || !glow2) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  glow1.style.transform = `translate(${x}px, ${y}px)`;
  glow2.style.transform = `translate(${-x}px, ${-y}px)`;
});

// ─── NAV TOGGLE ANIMATION ────────────────────────────────────
navToggle.addEventListener('click', () => {
  const spans = navToggle.querySelectorAll('span');
  if (navToggle.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// ─── SKILL TAGS STAGGER ──────────────────────────────────────
const skillTagObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const tags = entry.target.querySelectorAll('.skill-tag');
      tags.forEach((tag, i) => {
        tag.style.opacity = '0';
        tag.style.transform = 'scale(0.8) translateY(10px)';
        setTimeout(() => {
          tag.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          tag.style.opacity = '1';
          tag.style.transform = 'scale(1) translateY(0)';
        }, i * 60);
      });
      skillTagObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-category').forEach(cat => {
  skillTagObserver.observe(cat);
});

// ─── GRID HOVER TILT ─────────────────────────────────────────
document.querySelectorAll('.edu-card, .cert-card, .about-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -5;
    const rotateY = ((x - cx) / cx) * 5;
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ─── PAGE LOAD FADE ───────────────────────────────────────────
document.body.style.opacity = '0';
window.addEventListener('DOMContentLoaded', () => {
  document.body.style.transition = 'opacity 0.5s ease';
  document.body.style.opacity = '1';
});

// ─── SMOOTH SCROLL ────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


// ─── CASE STUDY METRIC HOVER GLOW ────────────────────────────
document.querySelectorAll('.cs-metric').forEach(metric => {
  metric.addEventListener('mouseenter', () => {
    cursor.classList.add('hovered');
    cursorFollower.classList.add('hovered');
  });
  metric.addEventListener('mouseleave', () => {
    cursor.classList.remove('hovered');
    cursorFollower.classList.remove('hovered');
  });
});

// ─── HOBBY CARD TILT ─────────────────────────────────────────
document.querySelectorAll('.hobby-card, .scout-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -4;
    const rotateY = ((x - cx) / cx) * 4;
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ─── CS CARD ANIMATE IN ──────────────────────────────────────
const csObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      csObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.cs-card').forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(50px)';
  card.style.transition = `opacity 0.8s ease ${i * 0.15}s, transform 0.8s ease ${i * 0.15}s`;
  csObserver.observe(card);
});
