/**
 * Browser API Polyfill
 * Ensures compatibility between Firefox (browser) and Chrome/Chromium (chrome) APIs
 */

// Create browser API if it doesn't exist (for Chromium-based browsers)
if (typeof browser === 'undefined') {
  if (typeof chrome !== 'undefined') {
    // Wrap chrome API to match browser API's promise-based pattern
    window.browser = {
      storage: {
        local: {
          get: (keys) => new Promise((resolve, reject) => {
            chrome.storage.local.get(keys, (result) => {
              if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
              } else {
                resolve(result);
              }
            });
          }),
          set: (items) => new Promise((resolve, reject) => {
            chrome.storage.local.set(items, () => {
              if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
              } else {
                resolve();
              }
            });
          }),
          clear: () => new Promise((resolve, reject) => {
            chrome.storage.local.clear(() => {
              if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
              } else {
                resolve();
              }
            });
          })
        }
      },
      runtime: {
        sendMessage: (...args) => new Promise((resolve, reject) => {
          chrome.runtime.sendMessage(...args, (response) => {
            if (chrome.runtime.lastError) {
              reject(chrome.runtime.lastError);
            } else {
              resolve(response);
            }
          });
        }),
        onMessage: chrome.runtime.onMessage,
        getURL: chrome.runtime.getURL,
        openOptionsPage: () => new Promise((resolve, reject) => {
          chrome.runtime.openOptionsPage(() => {
            if (chrome.runtime.lastError) {
              reject(chrome.runtime.lastError);
            } else {
              resolve();
            }
          });
        })
      },
      tabs: {
        query: (queryInfo) => new Promise((resolve, reject) => {
          chrome.tabs.query(queryInfo, (tabs) => {
            if (chrome.runtime.lastError) {
              reject(chrome.runtime.lastError);
            } else {
              resolve(tabs);
            }
          });
        }),
        get: (tabId) => new Promise((resolve, reject) => {
          chrome.tabs.get(tabId, (tab) => {
            if (chrome.runtime.lastError) {
              reject(chrome.runtime.lastError);
            } else {
              resolve(tab);
            }
          });
        }),
        update: (tabId, updateProperties) => new Promise((resolve, reject) => {
          chrome.tabs.update(tabId, updateProperties, (tab) => {
            if (chrome.runtime.lastError) {
              reject(chrome.runtime.lastError);
            } else {
              resolve(tab);
            }
          });
        }),
        sendMessage: (tabId, message) => new Promise((resolve, reject) => {
          chrome.tabs.sendMessage(tabId, message, (response) => {
            if (chrome.runtime.lastError) {
              reject(chrome.runtime.lastError);
            } else {
              resolve(response);
            }
          });
        })
      },
      webNavigation: chrome.webNavigation,
      notifications: {
        create: (notificationId, options) => new Promise((resolve, reject) => {
          chrome.notifications.create(notificationId, options, (id) => {
            if (chrome.runtime.lastError) {
              reject(chrome.runtime.lastError);
            } else {
              resolve(id);
            }
          });
        })
      },
      management: chrome.management ? {
        getSelf: () => new Promise((resolve, reject) => {
          chrome.management.getSelf((info) => {
            if (chrome.runtime.lastError) {
              reject(chrome.runtime.lastError);
            } else {
              resolve(info);
            }
          });
        })
      } : undefined
    };

    console.log('Browser API polyfill loaded for Chromium-based browser');
  } else {
    console.error('Neither browser nor chrome API available!');
  }
}
