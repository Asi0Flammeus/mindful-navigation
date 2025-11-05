// Mindful Navigation - Content Script
// Handles overlay UI injection and user interactions

const MindfulOverlay = {
  overlay: null,
  currentState: null,
  reflectionTimer: null,

  init() {
    // Listen for messages from background
    browser.runtime.onMessage.addListener((message) => {
      this.handleMessage(message);
    });
  },

  handleMessage(message) {
    const handlers = {
      'SHOW_QUESTION_1': () => this.showQuestion1(message),
      'SHOW_QUESTION_2': () => this.showQuestion2(message),
      'SHOW_REFLECTION': () => this.showReflection(message),
      'HIDE_OVERLAY': () => this.hideOverlay(message)
    };

    const handler = handlers[message.type];
    if (handler) {
      handler();
    }
  },

  createOverlay() {
    if (this.overlay) {
      this.overlay.remove();
    }

    this.overlay = document.createElement('div');
    this.overlay.id = 'mindful-nav-overlay';
    this.overlay.className = 'mindful-overlay';
    document.documentElement.appendChild(this.overlay);

    return this.overlay;
  },

  showQuestion1(data) {
    const overlay = this.createOverlay();
    let timeLeft = 30;

    overlay.innerHTML = `
      <div class="mindful-card">
        <div class="mindful-icon">🧘</div>
        <h2 class="mindful-title">Mindful Navigation</h2>
        <p class="mindful-domain">You're about to visit: <strong>${data.domain}</strong></p>

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
      </div>
    `;

    // Animate timer
    const timerText = overlay.querySelector('.timer-text');
    const timerProgress = overlay.querySelector('.timer-progress');
    const buttons = overlay.querySelector('.mindful-buttons');
    const hint = overlay.querySelector('.mindful-hint');
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
    overlay.querySelector('#answer-yes').addEventListener('click', () => {
      clearInterval(timer);
      browser.runtime.sendMessage({
        type: 'ANSWER_Q1_YES',
        domain: data.domain
      });
    });

    overlay.querySelector('#answer-no').addEventListener('click', () => {
      clearInterval(timer);
      browser.runtime.sendMessage({
        type: 'ANSWER_Q1_NO'
      });
    });
  },

  showQuestion2(data) {
    const overlay = this.createOverlay();

    overlay.innerHTML = `
      <div class="mindful-card">
        <div class="mindful-icon">🎯</div>
        <h2 class="mindful-title">Set Your Intention</h2>
        <p class="mindful-domain">Visiting: <strong>${data.domain}</strong></p>

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
      </div>
    `;

    const intentionInput = overlay.querySelector('#intention-input');
    const startButton = overlay.querySelector('#start-session');
    const timerOptions = overlay.querySelectorAll('.timer-option');
    let selectedDuration = 30;

    // Enable button when intention is typed
    intentionInput.addEventListener('input', () => {
      startButton.disabled = intentionInput.value.trim().length < 5;
    });

    // Timer option selection
    timerOptions.forEach(option => {
      option.addEventListener('click', () => {
        timerOptions.forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');
        selectedDuration = parseInt(option.dataset.duration);
      });
    });

    // Start session
    startButton.addEventListener('click', () => {
      const intention = intentionInput.value.trim();
      if (intention.length >= 5) {
        browser.runtime.sendMessage({
          type: 'ANSWER_Q2_SUBMIT',
          domain: data.domain,
          intention: intention,
          duration: selectedDuration
        });
      }
    });

    // Focus input
    setTimeout(() => intentionInput.focus(), 100);
  },

  showReflection(data) {
    const overlay = this.createOverlay();

    overlay.innerHTML = `
      <div class="mindful-card">
        <div class="mindful-icon">✨</div>
        <h2 class="mindful-title">Session Complete</h2>
        <p class="mindful-domain">Domain: <strong>${data.domain}</strong></p>

        <div class="mindful-question">
          <h3>Time for reflection</h3>
          <p class="mindful-subtitle">Your original intention was:</p>
          <div class="intention-reminder">
            "${data.intention}"
          </div>
        </div>

        <div class="reflection-question">
          <h3>Did you follow your initial intention?</h3>
          <div class="mindful-buttons">
            <button class="btn btn-success" id="reflection-yes">Yes, I stayed focused</button>
            <button class="btn btn-warning" id="reflection-partial">Partially</button>
            <button class="btn btn-secondary" id="reflection-no">No, I got distracted</button>
          </div>
        </div>

        <div class="more-time-section">
          <h3>Do you need more time?</h3>
          <div class="mindful-buttons">
            <button class="btn btn-primary" id="need-more-time">Yes, set new intention</button>
            <button class="btn btn-secondary" id="finish-session">No, finish session</button>
          </div>
        </div>
      </div>
    `;

    // Reflection handlers
    overlay.querySelectorAll('#reflection-yes, #reflection-partial, #reflection-no').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.style.background = '#10b981';
        btn.style.borderColor = '#10b981';
        btn.innerHTML = '✓ ' + btn.textContent;
      });
    });

    overlay.querySelector('#need-more-time').addEventListener('click', () => {
      browser.runtime.sendMessage({
        type: 'NEED_MORE_TIME',
        domain: data.domain
      });
    });

    overlay.querySelector('#finish-session').addEventListener('click', () => {
      browser.runtime.sendMessage({
        type: 'FINISH_SESSION',
        domain: data.domain
      });
      this.hideOverlay({ message: 'Session completed. Browse mindfully!' });
      setTimeout(() => {
        window.location.href = 'about:home';
      }, 2000);
    });
  },

  hideOverlay(data) {
    if (this.overlay) {
      // Show success message briefly
      if (data && data.message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'mindful-toast';
        successDiv.textContent = data.message;
        document.documentElement.appendChild(successDiv);

        setTimeout(() => {
          successDiv.style.opacity = '0';
          setTimeout(() => successDiv.remove(), 300);
        }, 2000);
      }

      this.overlay.style.opacity = '0';
      setTimeout(() => {
        if (this.overlay) {
          this.overlay.remove();
          this.overlay = null;
        }
      }, 300);
    }
  }
};

// Initialize
MindfulOverlay.init();
