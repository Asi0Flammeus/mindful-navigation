# 🎯 Zen Browser Installation Guide

**Your Version:** Zen Browser 1.14.11b

## ✅ Confirmed Facts About Zen Browser

| Aspect | Reality |
|--------|---------|
| **Architecture** | Firefox-based |
| **Engine** | Gecko (Mozilla) |
| **API** | `browser` WebExtension API |
| **Extensions** | Compatible with Firefox Add-ons |
| **NOT** | Chromium-based (this was incorrect in previous docs) |

---

## 🚀 Installation Steps for Zen Browser

### Step 1: Open Extensions Manager

Choose ONE of these methods:

**Method A: Keyboard Shortcut** (Fastest)
```
Press: Ctrl + Shift + A
```

**Method B: Extension Button**
1. Click the **Extensions button** (jigsaw icon) in top bar
2. Click "Manage extensions"

**Method C: Menu**
1. Open main menu (hamburger icon)
2. Click "Add-ons and themes"

### Step 2: Enable Debug Mode

1. You should see the **Add-ons Manager** page
2. Look for a **gear icon** (⚙️) in the top-right
3. Click it → Select **"Debug Add-ons"**

### Step 3: Load Temporary Add-on

1. Click **"Load Temporary Add-on..."** button
2. Navigate to: `/home/asi0/asi0-repos/mindful-navigation/`
3. Select file: `manifest.json`
4. Click **"Open"**

### Step 4: Verify Installation

You should see:
- ✅ "Mindful Navigation" appears in extensions list
- ✅ Extension icon (🧘) visible in toolbar
- ✅ Status: "Enabled"
- ✅ No error messages

---

## 🧪 Test Your Installation

### Quick Test

1. **Open test page:**
   ```
   http://localhost:8000/test.html
   ```

2. **Click "Run Test" on Test 1**

3. **Expected Result:**
   ```
   ✅ PASSED

   API Type: Firefox (browser API)

   Extension APIs detected and ready to use.
   ```

### Run All Tests

Click through Tests 2-5:
- **Test 2:** Storage Access ✅
- **Test 3:** Background Communication ✅
- **Test 4:** Add/Remove Domains ✅
- **Test 5:** Manual Navigation Test ✅

---

## 🎯 Real-World Test

1. **Add a test domain:**
   - Click extension icon
   - Click "Open Settings"
   - Add: `example.com`
   - Click "Save"

2. **Visit the domain:**
   - Navigate to: `http://example.com`

3. **Expected Behavior:**
   - ✨ Zen overlay appears over the page
   - ⏱️ 30-second reflection timer shows
   - 🔘 Buttons are disabled during timer
   - ✅ After 30s, you can click "Yes, continue" or "No, go back"

---

## 🔧 Troubleshooting

### Extension Won't Load

**Problem:** Can't find "Load Temporary Add-on" button

**Solution:**
1. Press `Ctrl+Shift+A`
2. Click gear icon (⚙️) → "Debug Add-ons"
3. You should now see the button

---

**Problem:** Error loading manifest.json

**Solution:**
```bash
# Verify manifest is valid
cd /home/asi0/asi0-repos/mindful-navigation
cat manifest.json | python3 -m json.tool
```

---

**Problem:** Extension loads but shows errors

**Solution:**
1. Open Browser Console: `Ctrl+Shift+J`
2. Look for errors mentioning "Mindful Navigation"
3. Check if browser-polyfill.js exists:
   ```bash
   ls -la /home/asi0/asi0-repos/mindful-navigation/browser-polyfill.js
   ```

---

### Test Page Shows "API Not Available"

**Cause:** Extension not loaded OR wrong browser

**Solution:**
1. Verify extension is in Extensions Manager (`Ctrl+Shift+A`)
2. Make sure you opened test page in Zen Browser (not another browser)
3. Reload the page: `Ctrl+R`

---

### Content Script Not Injecting

**Problem:** Visit blocked domain but no overlay appears

**Debug Steps:**

1. **Check domain is blocked:**
   - Click extension icon
   - Verify `example.com` is in the list

2. **Check console for errors:**
   - Press `F12` while on example.com
   - Look in Console tab for errors

3. **Reload extension:**
   - Go to Extensions Manager (`Ctrl+Shift+A`)
   - Click "Debug Add-ons"
   - Find Mindful Navigation
   - Click "Reload"

---

## 📊 Browser Console Commands

Useful debugging commands in Browser Console (`Ctrl+Shift+J`):

```javascript
// Check blocked domains
browser.storage.local.get('blockedDomains').then(console.log)

// Check active sessions
browser.storage.local.get('activeSessions').then(console.log)

// Clear all data (reset extension)
browser.storage.local.clear()

// Test message to background script
browser.runtime.sendMessage({type: 'GET_BLOCKED_DOMAINS'}).then(console.log)
```

---

## 🎯 Important Notes for Zen Browser

### Temporary Extensions

⚠️ **Temporary extensions are removed when Zen Browser closes**

This means:
- You'll need to reload the extension each time you start Zen
- Your settings (blocked domains) persist in storage
- But the extension code itself must be reloaded

### Permanent Installation Options

**Option A: Install from Firefox Add-ons** (When published)
- Survives browser restarts
- Automatic updates

**Option B: Pack and self-sign** (Advanced)
```bash
# Package the extension
web-ext build

# Sign it for personal use
# (Requires Firefox Add-ons account)
```

### Zen-Specific Features

- ✅ Full Firefox WebExtension support
- ✅ All extension features work identically to Firefox
- ✅ `browser` API native support (no polyfill needed)
- ❌ Firefox themes NOT supported (Zen uses custom theming)

---

## ✅ Verification Checklist

After installation, verify:

- [ ] Extension appears in Extensions Manager
- [ ] Extension icon visible in toolbar
- [ ] Test page shows "Firefox (browser API)"
- [ ] Can add/remove domains in settings
- [ ] Overlay appears when visiting blocked domain
- [ ] 30-second timer works correctly
- [ ] Can set intention and start session
- [ ] Session expires and shows reflection

---

## 🚀 Next Steps

Once installed successfully:

1. **Configure your domains:**
   - reddit.com
   - twitter.com
   - facebook.com
   - youtube.com
   - (any sites you want to use mindfully)

2. **Test with each domain**

3. **Experience mindful browsing!**

---

## 🆘 Still Not Working?

If you've tried everything above:

1. **Check versions:**
   ```bash
   # Your Zen version
   zen-browser --version  # or check About Zen

   # Should be: 1.14.11b or higher
   ```

2. **Check files exist:**
   ```bash
   cd /home/asi0/asi0-repos/mindful-navigation
   ls -la manifest.json background.js content.js browser-polyfill.js
   ```

3. **Test with regular Firefox:**
   - Install extension in Firefox
   - If it works there but not Zen: might be Zen-specific issue
   - If it doesn't work in Firefox either: extension code issue

4. **Collect debug info:**
   - Browser Console output (`Ctrl+Shift+J`)
   - Extension Console output (from Debug Add-ons page)
   - Test page results (screenshot)
   - Open GitHub issue with this info

---

**Zen Browser 1.14.11b:** Firefox-based (Gecko) | `browser` API | Full WebExtension support

**Installation:** `Ctrl+Shift+A` → Debug Add-ons → Load Temporary Add-on → Select manifest.json

**Test Server:** http://localhost:8000/test.html

**Happy Mindful Browsing! 🧘**
