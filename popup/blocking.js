// Mindful Navigation - Blocking Page
// Shows mindfulness questions when user tries to visit blocked domain

const BlockingPage = {
  domain: '',
  originalUrl: '',
  selectedDuration: 30,

  init() {
    // Get domain and URL from query parameters
    const params = new URLSearchParams(window.location.search);
    this.domain = params.get('domain') || 'unknown';
    this.originalUrl = params.get('url') || 'about:blank';

    // Display domain name
    document.getElementById('domain-name').textContent = this.domain;

    // Show Question 1
    this.showQuestion1();
  },

  showQuestion1() {
    let timeLeft = 30;
    const content = document.getElementById('content');

    content.innerHTML = `
      <div class="mindful-question">
        <h3>Do you really want to visit this website?</h3>
        <p class="mindful-subtitle">Take a moment to reflect...</p>
      </div>

      <div class="mindful-timer">
        <svg class="timer-circle" viewBox="0 0 120 120">
          <circle class="timer-bg" cx="60" cy="60" r="54"></circle>
          <circle class="timer-progress" cx="60" cy="60" r="54"></circle>
        </svg>
        <div class="timer-text">${timeLeft}s</div>
      </div>

      <div class="mindful-buttons" style="opacity: 0.3; pointer-events: none;">
        <button class="btn btn-secondary" id="answer-no">No, go back</button>
        <button class="btn btn-primary" id="answer-yes">Yes, continue</button>
      </div>

      <p class="mindful-hint">Buttons will activate after reflection time</p>
    `;

    // Animate timer
    const timerText = content.querySelector('.timer-text');
    const timerProgress = content.querySelector('.timer-progress');
    const buttons = content.querySelector('.mindful-buttons');
    const hint = content.querySelector('.mindful-hint');
    const circumference = 2 * Math.PI * 54;

    timerProgress.style.strokeDasharray = circumference;
    timerProgress.style.strokeDashoffset = 0;

    const timer = setInterval(() => {
      timeLeft--;
      timerText.textContent = `${timeLeft}s`;

      const offset = circumference * (timeLeft / 30);
      timerProgress.style.strokeDashoffset = offset;

      if (timeLeft <= 0) {
        clearInterval(timer);
        buttons.style.opacity = '1';
        buttons.style.pointerEvents = 'auto';
        hint.textContent = 'Now choose mindfully...';
        hint.style.color = '#10b981';
      }
    }, 1000);

    // Button handlers
    setTimeout(() => {
      content.querySelector('#answer-yes').addEventListener('click', () => {
        clearInterval(timer);
        this.showQuestion2();
      });

      content.querySelector('#answer-no').addEventListener('click', () => {
        clearInterval(timer);
        window.location.href = 'about:home';
      });
    }, 100);
  },

  showQuestion2() {
    const content = document.getElementById('content');

    content.innerHTML = `
      <div class="mindful-icon">🎯</div>

      <div class="mindful-question">
        <h3>What is precisely your intention?</h3>
        <p class="mindful-subtitle">Be specific about what you want to accomplish</p>
      </div>

      <div class="mindful-form">
        <textarea
          id="intention-input"
          class="intention-input"
          placeholder="Example: Read the documentation for React Hooks..."
          rows="4"
        ></textarea>

        <div class="timer-select">
          <label class="timer-label">How much time do you need?</label>
          <div class="timer-options">
            <button class="timer-option" data-duration="5">5 min</button>
            <button class="timer-option" data-duration="15">15 min</button>
            <button class="timer-option selected" data-duration="30">30 min</button>
            <button class="timer-option" data-duration="60">60 min</button>
          </div>
        </div>

        <button class="btn btn-primary btn-large" id="start-session" disabled>
          Start Mindful Session
        </button>
      </div>
    `;

    const intentionInput = content.querySelector('#intention-input');
    const startButton = content.querySelector('#start-session');
    const timerOptions = content.querySelectorAll('.timer-option');

    // Enable button when intention is typed
    intentionInput.addEventListener('input', () => {
      startButton.disabled = intentionInput.value.trim().length < 5;
    });

    // Timer option selection
    timerOptions.forEach(option => {
      option.addEventListener('click', () => {
        timerOptions.forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');
        this.selectedDuration = parseInt(option.dataset.duration);
      });
    });

    // Start session
    startButton.addEventListener('click', () => {
      const intention = intentionInput.value.trim();
      if (intention.length >= 5) {
        this.startSession(intention, this.selectedDuration);
      }
    });

    // Focus input
    setTimeout(() => intentionInput.focus(), 100);
  },

  async startSession(intention, duration) {
    try {
      // Send message to background script to create session
      await browser.runtime.sendMessage({
        type: 'ANSWER_Q2_SUBMIT',
        domain: this.domain,
        intention: intention,
        duration: duration
      });

      // Show success message
      const content = document.getElementById('content');
      content.innerHTML = `
        <div class="mindful-icon">✨</div>
        <div class="mindful-question">
          <h3>Session Started!</h3>
          <p class="mindful-subtitle">Browse mindfully for the next ${duration} minutes.</p>
          <p style="margin-top: 20px; color: #6b7280;">Redirecting to ${this.domain}...</p>
        </div>
      `;

      // Redirect to original URL after short delay
      setTimeout(() => {
        window.location.href = this.originalUrl;
      }, 1500);

    } catch (error) {
      console.error('Failed to start session:', error);
      alert('Error starting session. Please try again.');
    }
  }
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
  BlockingPage.init();
});
