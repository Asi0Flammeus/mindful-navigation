// Mindful Navigation - Background Script
// Handles domain monitoring, timers, and session management

const MindfulNav = {
  blockedDomains: new Set(),
  activeSessions: new Map(), // domain -> {intention, startTime, duration, timerId}

  async init() {
    console.log('Mindful Navigation: Starting initialization...');

    try {
      // Load blocked domains from storage
      const data = await browser.storage.local.get(['blockedDomains']);
      if (data.blockedDomains) {
        this.blockedDomains = new Set(data.blockedDomains);
      }
      console.log('Mindful Navigation: Loaded blocked domains:', Array.from(this.blockedDomains));

      // CRITICAL: Use webRequest to actually BLOCK navigation
      browser.webRequest.onBeforeRequest.addListener(
        (details) => this.blockNavigation(details),
        { urls: ["<all_urls>"], types: ["main_frame"] },
        ["blocking"]
      );

      // Listen for tab updates (for UI updates)
      browser.webNavigation.onBeforeNavigate.addListener(
        (details) => this.handleNavigation(details)
      );

      // Listen for messages from content script
      browser.runtime.onMessage.addListener(
        (message, sender) => this.handleMessage(message, sender)
      );

      console.log('Mindful Navigation: Initialized successfully');
    } catch (error) {
      console.error('Mindful Navigation: Initialization error:', error);
    }
  },

  blockNavigation(details) {
    // Only handle main frame navigation
    if (details.frameId !== 0) return {};

    // Don't block extension pages or special URLs
    if (details.url.startsWith('moz-extension://') ||
        details.url.startsWith('chrome-extension://') ||
        details.url.startsWith('about:') ||
        details.url.startsWith('chrome:') ||
        details.url.startsWith('edge:') ||
        details.url.startsWith('zen:')) {
      return {};
    }

    const domain = this.extractDomain(details.url);
    if (!domain) return {};

    const isBlocked = this.isBlocked(domain);
    const hasSession = this.hasActiveSession(domain);

    if (isBlocked && !hasSession) {
      console.log(`BLOCKING navigation to ${domain}`);

      // Cancel the request
      const result = { cancel: true };

      // Redirect to blocking page after canceling
      const blockingPageUrl = browser.runtime.getURL('popup/blocking.html') +
        `?domain=${encodeURIComponent(domain)}` +
        `&url=${encodeURIComponent(details.url)}`;

      // Use tabs.update to navigate to blocking page
      browser.tabs.update(details.tabId, { url: blockingPageUrl }).catch(err => {
        console.error('Failed to redirect to blocking page:', err);
      });

      return result;
    }

    // Allow navigation
    return {};
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
    // Check if domain or any parent domain is blocked
    for (const blocked of this.blockedDomains) {
      if (domain === blocked || domain.endsWith('.' + blocked)) {
        return true;
      }
    }
    return false;
  },

  hasActiveSession(domain) {
    return this.activeSessions.has(domain);
  },

  async handleNavigation(details) {
    // This is now only used for logging/monitoring
    // Actual blocking happens in blockNavigation()
    if (details.frameId !== 0) return;

    const domain = this.extractDomain(details.url);
    if (!domain) return;

    const isBlocked = this.isBlocked(domain);
    const hasSession = this.hasActiveSession(domain);

    if (isBlocked && hasSession) {
      console.log(`Active session for ${domain}, allowing access`);
    }
  },

  async handleMessage(message, sender) {
    console.log('Mindful Navigation: Received message:', message.type, message);

    const handlers = {
      'ANSWER_Q1_YES': () => this.handleQ1Yes(message, sender),
      'ANSWER_Q1_NO': () => this.handleQ1No(sender),
      'ANSWER_Q2_SUBMIT': () => this.handleQ2Submit(message, sender),
      'SESSION_EXPIRED': () => this.handleSessionExpired(message, sender),
      'NEED_MORE_TIME': () => this.handleNeedMoreTime(message, sender),
      'FINISH_SESSION': () => this.finishSession(message.domain),
      'GET_BLOCKED_DOMAINS': () => this.getBlockedDomains(),
      'ADD_BLOCKED_DOMAIN': () => this.addBlockedDomain(message.domain),
      'REMOVE_BLOCKED_DOMAIN': () => this.removeBlockedDomain(message.domain),
      'CHECK_SESSION': () => this.checkSession(message.domain)
    };

    const handler = handlers[message.type];
    if (handler) {
      const result = await handler();
      console.log('Mindful Navigation: Handler result:', result);
      return result;
    } else {
      console.warn('Mindful Navigation: No handler for message type:', message.type);
    }
  },

  handleQ1Yes(message, sender) {
    // User answered yes to "do you really want to visit?"
    this.sendToTab(sender.tab.id, {
      type: 'SHOW_QUESTION_2',
      domain: message.domain
    });
  },

  handleQ1No(sender) {
    // User answered no - redirect to homepage
    browser.tabs.update(sender.tab.id, {
      url: 'about:home'
    });
  },

  handleQ2Submit(message, sender) {
    const { domain, intention, duration } = message;

    // Create session
    const session = {
      intention,
      startTime: Date.now(),
      duration: duration * 60 * 1000, // Convert minutes to milliseconds
      tabId: sender.tab.id
    };

    // Set timer to expire session
    const timerId = setTimeout(() => {
      this.expireSession(domain);
    }, session.duration);

    session.timerId = timerId;
    this.activeSessions.set(domain, session);

    // Save to storage for persistence
    this.saveActiveSessions();

    // Allow access
    this.sendToTab(sender.tab.id, {
      type: 'HIDE_OVERLAY',
      message: 'Session started. Browse mindfully.'
    });

    // Show notification
    browser.notifications.create({
      type: 'basic',
      iconUrl: browser.runtime.getURL('icons/icon-48.png'),
      title: 'Mindful Navigation',
      message: `Session started for ${domain} (${duration} minutes)`
    });
  },

  async expireSession(domain) {
    const session = this.activeSessions.get(domain);
    if (!session) return;

    // Find all tabs with this domain
    const tabs = await browser.tabs.query({});
    const matchingTabs = tabs.filter(tab => {
      const tabDomain = this.extractDomain(tab.url);
      return tabDomain === domain;
    });

    // Show reflection question on all matching tabs
    for (const tab of matchingTabs) {
      this.sendToTab(tab.id, {
        type: 'SHOW_REFLECTION',
        domain: domain,
        intention: session.intention
      });
    }

    // Remove session
    this.activeSessions.delete(domain);
    this.saveActiveSessions();
  },

  handleSessionExpired(message, sender) {
    // Session expired and user was shown reflection
    const { domain } = message;
    this.activeSessions.delete(domain);
    this.saveActiveSessions();
  },

  handleNeedMoreTime(message, sender) {
    // User wants more time - restart flow
    this.sendToTab(sender.tab.id, {
      type: 'SHOW_QUESTION_1',
      domain: message.domain
    });
  },

  finishSession(domain) {
    const session = this.activeSessions.get(domain);
    if (session && session.timerId) {
      clearTimeout(session.timerId);
    }
    this.activeSessions.delete(domain);
    this.saveActiveSessions();
  },

  checkSession(domain) {
    return {
      hasSession: this.hasActiveSession(domain),
      session: this.activeSessions.get(domain)
    };
  },

  async saveActiveSessions() {
    // Convert Map to serializable format
    const sessions = {};
    for (const [domain, session] of this.activeSessions) {
      sessions[domain] = {
        intention: session.intention,
        startTime: session.startTime,
        duration: session.duration,
        tabId: session.tabId
        // Don't save timerId - will be recreated on restore
      };
    }

    await browser.storage.local.set({ activeSessions: sessions });
  },

  async getBlockedDomains() {
    return Array.from(this.blockedDomains);
  },

  async addBlockedDomain(domain) {
    this.blockedDomains.add(domain);
    await browser.storage.local.set({
      blockedDomains: Array.from(this.blockedDomains)
    });
    return { success: true };
  },

  async removeBlockedDomain(domain) {
    this.blockedDomains.delete(domain);
    await browser.storage.local.set({
      blockedDomains: Array.from(this.blockedDomains)
    });
    return { success: true };
  },

  sendToTab(tabId, message) {
    browser.tabs.sendMessage(tabId, message).catch(err => {
      console.log('Could not send message to tab:', err);
    });
  }
};

// Initialize on startup
MindfulNav.init();
