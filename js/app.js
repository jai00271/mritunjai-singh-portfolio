/**
 * Mritunjai Pratap Singh (Jai) - Portfolio Main Application Logic
 * Interactive utilities, Skills filter, Metrics Counter, Fast-Track Modal, Copy Handlers
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
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
    mobileToggle.addEventListener('click', () => {
      const isExpanded = navMenu.style.display === 'flex';
      navMenu.style.display = isExpanded ? 'none' : 'flex';
      navMenu.style.flexDirection = 'column';
      navMenu.style.position = 'absolute';
      navMenu.style.top = '72px';
      navMenu.style.left = '0';
      navMenu.style.width = '100%';
      navMenu.style.background = 'var(--bg-glass)';
      navMenu.style.padding = '1.5rem';
      navMenu.style.borderBottom = '1px solid var(--border-subtle)';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
    });
  }

  // Active Link on Scroll (ScrollSpy)
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
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
  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', (e) => {
      e.preventDefault();
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
