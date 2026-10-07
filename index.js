/* =============================================================
   PORTFOLIO — Vertical Navbar, Theme Toggle, ScrollSpy & AI Chat
   ============================================================= */

(function () {
  'use strict';

  /* -------------------------------------------------------------
     1. THEME TOGGLE (DARK / LIGHT MODE)
     ------------------------------------------------------------- */
  const THEME_KEY = 'portfolio-theme';
  const toggleBtn = document.getElementById('night-mode-toggle');

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (toggleBtn) {
      const label = toggleBtn.querySelector('.theme-label');
      if (label) {
        label.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
      }
      toggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  const storedTheme = localStorage.getItem(THEME_KEY);
  if (storedTheme) {
    applyTheme(storedTheme);
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || getSystemTheme();
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem(THEME_KEY, next);
    });
  }

  /* -------------------------------------------------------------
     2. MOBILE MENU & SIDEBAR DRAWER TOGGLE
     ------------------------------------------------------------- */
  const menuBtn = document.getElementById('mobile-menu-toggle');
  const sidebar = document.getElementById('vertical-sidebar');
  const backdrop = document.getElementById('nav-backdrop');

  function toggleMobileMenu() {
    if (!sidebar) return;
    const isOpen = sidebar.classList.contains('active');
    if (isOpen) {
      sidebar.classList.remove('active');
      if (backdrop) backdrop.classList.remove('active');
      if (menuBtn) {
        menuBtn.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    } else {
      sidebar.classList.add('active');
      if (backdrop) backdrop.classList.add('active');
      if (menuBtn) {
        menuBtn.classList.add('active');
        menuBtn.setAttribute('aria-expanded', 'true');
      }
    }
  }

  if (menuBtn) {
    menuBtn.addEventListener('click', toggleMobileMenu);
  }

  if (backdrop) {
    backdrop.addEventListener('click', toggleMobileMenu);
  }

  // Close mobile sidebar on link click
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1024 && sidebar.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  });

  /* -------------------------------------------------------------
     3. SCROLLSPY — ACTIVE LINK HIGHLIGHTING
     ------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    const scrollY = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop;
      const sectionId = section.getAttribute('id');
      const targetNav = document.querySelector(`.sidebar-link[data-nav="${sectionId}"]`);

      if (targetNav) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          sidebarLinks.forEach(l => l.classList.remove('active'));
          targetNav.classList.add('active');
        }
      }
    });
  }

  /* -------------------------------------------------------------
     4. RETRO CRT SCANLINES TOGGLE (PIXEL ART VIDEO)
     ------------------------------------------------------------- */
  const scanlinesBtn = document.getElementById('toggle-scanlines-btn');
  const scanlinesLayer = document.getElementById('video-scanlines-layer');
  const scanlinesLabel = document.getElementById('scanlines-label-text');

  if (scanlinesBtn && scanlinesLayer) {
    scanlinesBtn.addEventListener('click', () => {
      const isCurrentlyActive = scanlinesLayer.classList.contains('active');
      if (isCurrentlyActive) {
        scanlinesLayer.classList.remove('active');
        scanlinesBtn.setAttribute('aria-pressed', 'false');
        if (scanlinesLabel) scanlinesLabel.textContent = 'SCANLINES: OFF';
      } else {
        scanlinesLayer.classList.add('active');
        scanlinesBtn.setAttribute('aria-pressed', 'true');
        if (scanlinesLabel) scanlinesLabel.textContent = 'SCANLINES: ON';
      }
    });
  }
})();

/* -------------------------------------------------------------
   5. COPY VIDEO URL HELPER
   ------------------------------------------------------------- */
function copyVideoLink(btn) {
  const videoUrl = 'https://www.youtube.com/watch?v=aircAruvnKk';
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(videoUrl).then(() => {
      if (btn) {
        const textSpan = btn.querySelector('.copy-btn-text');
        const icon = btn.querySelector('i');
        if (textSpan) textSpan.textContent = 'Copied to Clipboard!';
        if (icon) icon.className = 'ri-check-line';
        setTimeout(() => {
          if (textSpan) textSpan.textContent = 'Share & Copy URL';
          if (icon) icon.className = 'ri-clipboard-line';
        }, 2200);
      }
    }).catch(() => {
      prompt('Copy the video URL:', videoUrl);
    });
  } else {
    prompt('Copy the video URL:', videoUrl);
  }
}

/* -------------------------------------------------------------
   6. INTERACTIVE AI CHAT DEMO
   ------------------------------------------------------------- */
const chatKnowledge = {
  skills: "Prashanth is skilled in Python, SQL, Machine Learning (Scikit-learn), Data Analysis (Pandas, NumPy, Matplotlib, Seaborn), Deep Learning, NLP, and Git/GitHub.",
  titanic: "In the Titanic Survival Prediction project, Prashanth conducted data cleaning, missing value imputation, and feature engineering to build accurate classification models.",
  internships: "Yes! Prashanth is actively seeking AI, Machine Learning, and Data Analytics internship opportunities and entry-level roles.",
  projects: "Prashanth has built 6 ML projects: House Price Prediction, Student Performance Forecasting, Spam Email Detection (NLP), Iris Flower Classification, Customer Segmentation (K-Means), and Titanic Survival Prediction.",
  video: "Prashanth's featured video highlight explores deep neural network architecture, forward propagation, loss convergence, and backpropagation mechanics. You can watch it directly in the 'Video Spotlight' section!",
  default: "I'm Prashanth's AI Assistant! Feel free to ask about his Machine Learning projects, technical skills in Python/SQL, video highlight, or internship availability."
};

function appendChatMessage(sender, text) {
  const chatMessages = document.getElementById('chat-messages');
  if (!chatMessages) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-message ${sender}`;

  const avatarDiv = document.createElement('div');
  avatarDiv.className = 'msg-avatar';
  avatarDiv.innerHTML = sender === 'bot' ? '<i class="ri-robot-line"></i>' : '<i class="ri-user-3-line"></i>';

  const bubbleDiv = document.createElement('div');
  bubbleDiv.className = 'msg-bubble';
  bubbleDiv.textContent = text;

  msgDiv.appendChild(avatarDiv);
  msgDiv.appendChild(bubbleDiv);
  chatMessages.appendChild(msgDiv);

  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateBotResponse(userInput) {
  const query = userInput.toLowerCase();
  if (query.includes('skill') || query.includes('python') || query.includes('technolog')) {
    return chatKnowledge.skills;
  } else if (query.includes('titanic')) {
    return chatKnowledge.titanic;
  } else if (query.includes('video') || query.includes('highlight') || query.includes('watch') || query.includes('spotlight') || query.includes('demo')) {
    return chatKnowledge.video;
  } else if (query.includes('intern') || query.includes('role') || query.includes('job') || query.includes('hire')) {
    return chatKnowledge.internships;
  } else if (query.includes('project') || query.includes('house') || query.includes('spam')) {
    return chatKnowledge.projects;
  } else {
    return chatKnowledge.default;
  }
}

function handleChatSubmit(event) {
  event.preventDefault();
  const input = document.getElementById('chat-input');
  if (!input || !input.value.trim()) return;

  const userText = input.value.trim();
  appendChatMessage('user', userText);
  input.value = '';

  setTimeout(() => {
    const reply = generateBotResponse(userText);
    appendChatMessage('bot', reply);
  }, 400);
}

function sendQuickPrompt(promptText) {
  const input = document.getElementById('chat-input');
  if (input) {
    input.value = promptText;
    handleChatSubmit(new Event('submit'));
  }
}
