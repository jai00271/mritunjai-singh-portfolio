/**
 * Mritunjai Pratap Singh (Jai) - Portfolio Main Application Logic
 * Interactive utilities, Skills filter, Metrics Counter, Fast-Track Modal, Copy Handlers
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollProgress();
  initScrollReveal();
  initCardGlow();
  initMetricsCounter();
  initSkillsFilter();
  initRecruiterActions();
  initToast();
});

/* --------------------------------------------------------------------------
   Navigation & Mobile Menu
   -------------------------------------------------------------------------- */
function initNavigation() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      document.body.classList.toggle('menu-open', isOpen);
    });

    // Close mobile menu when any nav link is tapped
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 860) {
          navMenu.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
          document.body.classList.remove('menu-open');
        }
      });
    });

    // Close menu when tapping outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      }
    });
  }

  // Active Link on Scroll (ScrollSpy)
  const sections = document.querySelectorAll('section[id]');
  let ticking = false;

  function updateScrollSpy() {
    let current = '';
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollSpy);
      ticking = true;
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   Scroll Progress Bar & Floating Back-to-Top
   -------------------------------------------------------------------------- */
function initScrollProgress() {
  const progressBar = document.getElementById('scrollProgressBar');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const progressCircle = document.getElementById('scrollProgressCircle');
  const circleLength = 113.1; // 2 * Math.PI * 18

  let ticking = false;

  function updateProgress() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? Math.min(Math.max(scrollY / scrollHeight, 0), 1) : 0;

    if (progressBar) {
      progressBar.style.width = `${progress * 100}%`;
    }

    if (progressCircle) {
      const offset = circleLength - (circleLength * progress);
      progressCircle.style.strokeDashoffset = offset;
    }

    if (backToTopBtn) {
      if (scrollY > 380) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Initial calculation
  updateProgress();
}

/* --------------------------------------------------------------------------
   Smooth Scroll Reveal Transitions (IntersectionObserver)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  // Respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const targets = document.querySelectorAll(
    '.section-header, .fast-track-box, .timeline-item, .case-study-card, .award-card, .digital-twin-wrapper, .edu-card, .contact-card-main, .channel-card, .skills-controls, .skills-grid'
  );

  targets.forEach(target => {
    target.classList.add('reveal-on-scroll');
  });

  // Stagger reveal delays inside card grids
  const gridParents = document.querySelectorAll('.arch-grid, .awards-grid, .contact-channels-grid, .pitch-grid');
  gridParents.forEach(parent => {
    const children = parent.querySelectorAll('.reveal-on-scroll');
    children.forEach((child, index) => {
      child.style.transitionDelay = `${(index % 4) * 0.1}s`;
    });
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  targets.forEach(target => observer.observe(target));
}

/* --------------------------------------------------------------------------
   Interactive Spotlight Glow on Executive Cards (Mousemove)
   -------------------------------------------------------------------------- */
function initCardGlow() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const glowCards = document.querySelectorAll(
    '.hero-card, .experience-card, .case-study-card, .award-card, .fast-track-box, .channel-card, .digital-twin-wrapper'
  );

  glowCards.forEach(card => {
    card.classList.add('card-glow-interactive');
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* --------------------------------------------------------------------------
   Impact Metrics Animated Counter
   -------------------------------------------------------------------------- */
function initMetricsCounter() {
  const metricsSection = document.getElementById('metrics');
  if (!metricsSection) return;

  const counters = document.querySelectorAll('.metric-number');
  let activated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !activated) {
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const duration = 1600; // ms
          const start = 0;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * easeProgress);

            counter.textContent = current;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target;
            }
          }

          requestAnimationFrame(updateCounter);
        });
        activated = true;
      }
    });
  }, { threshold: 0.3 });

  observer.observe(metricsSection);
}

/* --------------------------------------------------------------------------
   Skills Matrix Filtering & Live Search
   -------------------------------------------------------------------------- */
function initSkillsFilter() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const searchInput = document.getElementById('skillsSearch');
  const skillCards = document.querySelectorAll('.skill-card');

  let activeCategory = 'all';
  let searchQuery = '';

  function applyFilter() {
    skillCards.forEach(card => {
      const category = card.getAttribute('data-category');
      const text = card.textContent.toLowerCase();

      const matchesCategory = (activeCategory === 'all' || category === activeCategory);
      const matchesSearch = text.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        card.style.opacity = '1';
      } else {
        card.style.display = 'none';
        card.style.opacity = '0';
      }
    });
  }

  // Category Tab Click
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.getAttribute('data-filter');
      applyFilter();
    });
  });

  // Search Input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      applyFilter();
    });
  }
}

/* --------------------------------------------------------------------------
   Recruiter Fast-Track & Quick Actions
   -------------------------------------------------------------------------- */
function initRecruiterActions() {
  const toggleFastTrackBtn = document.getElementById('toggleFastTrack');
  const fastTrackSection = document.getElementById('fastTrackSection');
  const copyPacketBtn = document.getElementById('copyPacketBtn');
  const printResumeBtn = document.getElementById('printResumeBtn');

  // Toggle Fast Track View
  if (toggleFastTrackBtn && fastTrackSection) {
    toggleFastTrackBtn.addEventListener('click', () => {
      const isVisible = fastTrackSection.style.display !== 'none';
      fastTrackSection.style.display = isVisible ? 'none' : 'block';
      if (!isVisible) {
        fastTrackSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // Print / Save as PDF
  const mobilePrintBtn = document.getElementById('mobilePrintBtn');
  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.print();
    });
  }
  if (mobilePrintBtn) {
    mobilePrintBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const navMenu = document.getElementById('navMenu');
      const mobileToggle = document.getElementById('mobileToggle');
      if (navMenu) navMenu.classList.remove('active');
      if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
      window.print();
    });
  }

  // One-Click Recruiter Packet Copy
  if (copyPacketBtn) {
    copyPacketBtn.addEventListener('click', () => {
      const packetText = `
MRITUNJAI PRATAP SINGH (JAI)
Technical Manager & Principal Backend / Distributed Systems Engineer
-----------------------------------------------------------------
📍 Location: Mahadevpura, Bengaluru, India
📧 Email: jai00271@gmail.com
📱 Phone: +91 8970995611
🔗 LinkedIn: https://www.linkedin.com/in/mpsinghdonet8yexp/
💻 GitHub: https://github.com/jai00271

KEY CAREER HIGHLIGHTS:
• 14+ Years in Enterprise Backend Engineering & Tech Leadership (.NET Core, C#, Microservices, Cloud)
• Technical Manager at Koch Global Services: Led 5 engineers, 95% on-time delivery, 15% velocity boost
• Scale at Dell (DAIS): Secured 90M+ user accounts across 70+ apps via SAML/OAuth & dynamic feature flags
• Scale at Koch (i360): Architected 50+ microservices pipeline with RabbitMQ handling 35M+ voter records
• Distributed Caching: Reduced API response latency by 60% with Redis caching architecture
• Automation: Reduced manual accounting entry by 80% via REST APIs (Koch Automation Award 2021)
• Certifications: Certified Machine Learning Engineer (IISc), HackerRank Gold Medalist Problem Solving
• Education: B.Tech Computer Science, SVCE Bangalore (70%)

TARGET ROLES:
• Technical Manager | Engineering Manager | Lead Backend Architect | Principal Distributed Systems Engineer
      `.trim();

      navigator.clipboard.writeText(packetText).then(() => {
        showToast('✓ Recruiter Packet copied to clipboard!');
      }).catch(() => {
        showToast('Press Ctrl+C to copy recruiter info');
      });
    });
  }
}

/* --------------------------------------------------------------------------
   Toast Notifications
   -------------------------------------------------------------------------- */
let toastTimeout = null;

function initToast() {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
}

window.showToast = function(message) {
  const toast = document.getElementById('toastNotice');
  if (!toast) return;

  toast.innerHTML = message;
  toast.classList.add('show');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
};

window.copyToClipboard = function(text, label) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`✓ Copied ${label} to clipboard!`);
  }).catch(() => {
    showToast(`Failed to copy: ${text}`);
  });
};
