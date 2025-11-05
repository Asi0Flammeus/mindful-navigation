// Mindful Navigation - Popup Script

const Popup = {
  currentTab: null,
  blockedDomains: [],

  async init() {
    try {
      console.log('Popup initializing...');
      await this.loadData();
      this.setupEventListeners();
      await this.updateUI();
      console.log('Popup initialized successfully');
    } catch (error) {
      console.error('Popup initialization error:', error);
      // Show error state
      document.body.innerHTML = `
        <div style="padding: 20px; color: white; text-align: center;">
          <h3>⚠️ Error</h3>
          <p style="font-size: 12px;">Failed to load popup</p>
          <p style="font-size: 10px; opacity: 0.8;">${error.message}</p>
        </div>
      `;
    }
  },

  async loadData() {
    try {
      // Get current tab
      const tabs = await browser.tabs.query({ active: true, currentWindow: true });
      this.currentTab = tabs[0];
      console.log('Current tab:', this.currentTab);

      // Get blocked domains
      const response = await browser.runtime.sendMessage({
        type: 'GET_BLOCKED_DOMAINS'
      });
      console.log('Blocked domains response:', response);
      this.blockedDomains = response || [];
    } catch (error) {
      console.error('Error loading data:', error);
      this.blockedDomains = [];
    }
  },

  setupEventListeners() {
    // Open settings
    document.getElementById('open-settings').addEventListener('click', () => {
      browser.runtime.openOptionsPage();
      window.close();
    });

    // Add current domain
    document.getElementById('add-current-domain').addEventListener('click', () => {
      this.addCurrentDomain();
    });
  },

  async updateUI() {
    // Update stats
    document.getElementById('blocked-count').textContent = this.blockedDomains.length;

    // Get active sessions count from storage
    const data = await browser.storage.local.get(['activeSessions']);
    const activeSessions = data.activeSessions || {};
    const sessionCount = Object.keys(activeSessions).length;
    document.getElementById('active-sessions').textContent = sessionCount;

    // Update current tab info
    if (this.currentTab && this.currentTab.url) {
      const domain = this.extractDomain(this.currentTab.url);

      if (domain) {
        document.getElementById('current-tab-section').style.display = 'block';
        document.getElementById('tab-domain').textContent = domain;

        const isBlocked = this.isBlocked(domain);
        const hasSession = activeSessions[domain];

        const statusElement = document.getElementById('tab-status');
        const addButton = document.getElementById('add-current-domain');

        if (hasSession) {
          statusElement.className = 'tab-status session';
          statusElement.innerHTML = `
            <span class="status-dot"></span>
            <span class="status-text">Active session</span>
          `;
          addButton.style.display = 'none';
        } else if (isBlocked) {
          statusElement.className = 'tab-status monitored';
          statusElement.innerHTML = `
            <span class="status-dot"></span>
            <span class="status-text">Monitored</span>
          `;
          addButton.style.display = 'none';
        } else {
          statusElement.className = 'tab-status';
          statusElement.innerHTML = `
            <span class="status-dot"></span>
            <span class="status-text">Not monitored</span>
          `;
          addButton.style.display = 'flex';
        }
      }
    }
  },

  extractDomain(url) {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname;
    } catch (e) {
      return null;
    }
  },

  isBlocked(domain) {
    for (const blocked of this.blockedDomains) {
      if (domain === blocked || domain.endsWith('.' + blocked)) {
        return true;
      }
    }
    return false;
  },

  async addCurrentDomain() {
    if (!this.currentTab || !this.currentTab.url) return;

    const domain = this.extractDomain(this.currentTab.url);
    if (!domain) return;

    // Clean domain
    const cleanDomain = domain.replace(/^www\./, '');

    await browser.runtime.sendMessage({
      type: 'ADD_BLOCKED_DOMAIN',
      domain: cleanDomain
    });

    // Reload data and update UI
    await this.loadData();
    this.updateUI();

    // Show feedback
    const addButton = document.getElementById('add-current-domain');
    addButton.textContent = '✓ Added!';
    addButton.style.background = '#10b981';
    setTimeout(() => {
      addButton.textContent = '+ Add to Blocked List';
      addButton.style.background = '';
    }, 2000);
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  Popup.init();
});
