// Mindful Navigation - Options Page Script

const OptionsPage = {
  blockedDomains: [],

  async init() {
    await this.loadDomains();
    this.setupEventListeners();
    this.renderDomainList();
  },

  async loadDomains() {
    const response = await browser.runtime.sendMessage({
      type: 'GET_BLOCKED_DOMAINS'
    });
    this.blockedDomains = response || [];
  },

  setupEventListeners() {
    // Add domain button
    document.getElementById('add-domain-btn').addEventListener('click', () => {
      this.addDomain();
    });

    // Enter key in input
    document.getElementById('domain-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.addDomain();
      }
    });

    // Suggested domains
    document.querySelectorAll('.suggested-domain').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const domain = e.currentTarget.dataset.domain;
        this.addDomain(domain);
      });
    });
  },

  async addDomain(domain = null) {
    const input = document.getElementById('domain-input');
    const domainToAdd = domain || input.value.trim();

    if (!domainToAdd) {
      this.showToast('Please enter a domain', 'error');
      return;
    }

    // Clean domain (remove protocol, www, trailing slash)
    const cleanDomain = domainToAdd
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/\/$/, '')
      .toLowerCase();

    // Validate domain format
    if (!this.isValidDomain(cleanDomain)) {
      this.showToast('Please enter a valid domain (e.g., example.com)', 'error');
      return;
    }

    // Check if already exists
    if (this.blockedDomains.includes(cleanDomain)) {
      this.showToast('Domain already in your list', 'error');
      return;
    }

    // Add to storage
    await browser.runtime.sendMessage({
      type: 'ADD_BLOCKED_DOMAIN',
      domain: cleanDomain
    });

    this.blockedDomains.push(cleanDomain);
    this.renderDomainList();
    input.value = '';
    this.showToast(`Added ${cleanDomain}`, 'success');

    // Update suggested domain button
    if (domain) {
      const btn = document.querySelector(`[data-domain="${domain}"]`);
      if (btn) {
        btn.classList.add('added');
        btn.textContent = '✓ Added';
      }
    }
  },

  async removeDomain(domain) {
    await browser.runtime.sendMessage({
      type: 'REMOVE_BLOCKED_DOMAIN',
      domain: domain
    });

    this.blockedDomains = this.blockedDomains.filter(d => d !== domain);
    this.renderDomainList();
    this.showToast(`Removed ${domain}`, 'success');

    // Update suggested domain button
    const btn = document.querySelector(`[data-domain="${domain}"]`);
    if (btn) {
      btn.classList.remove('added');
      btn.innerHTML = `<span class="suggested-icon">${btn.querySelector('.suggested-icon')?.textContent || '🌐'}</span><span>${domain}</span>`;
    }
  },

  renderDomainList() {
    const listContainer = document.getElementById('domain-list');

    if (this.blockedDomains.length === 0) {
      listContainer.innerHTML = `
        <div class="empty-state">
          <span class="empty-icon">🌱</span>
          <p>No blocked domains yet</p>
          <p class="empty-hint">Add domains above to start your mindful browsing journey</p>
        </div>
      `;
      return;
    }

    // Sort domains alphabetically
    const sortedDomains = [...this.blockedDomains].sort();

    listContainer.innerHTML = sortedDomains.map(domain => `
      <div class="domain-item">
        <span class="domain-name">
          <span class="domain-icon">🌐</span>
          ${domain}
        </span>
        <button class="remove-btn" data-domain="${domain}">Remove</button>
      </div>
    `).join('');

    // Add remove handlers
    listContainer.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const domain = e.target.dataset.domain;
        this.removeDomain(domain);
      });
    });

    // Update suggested domain buttons
    document.querySelectorAll('.suggested-domain').forEach(btn => {
      const domain = btn.dataset.domain;
      if (this.blockedDomains.includes(domain)) {
        btn.classList.add('added');
        btn.textContent = '✓ Added';
      }
    });
  },

  isValidDomain(domain) {
    // Basic domain validation
    const domainRegex = /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,}$/i;
    return domainRegex.test(domain);
  },

  showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  OptionsPage.init();
});
