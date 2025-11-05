# 🌐 Installation Guide for Mindful Navigation

## 🎯 For Zen Browser (RECOMMENDED)

**IMPORTANT:** Zen Browser is **Firefox-based** (Gecko engine), NOT Chromium-based!

### Architecture
- **Engine:** Gecko (Mozilla Firefox)
- **API:** `browser` WebExtension API
- **Extensions:** Compatible with Firefox Add-ons

### Installation Steps

1. **Open Zen Browser Extensions Manager**
   - Click the **Extensions button** (jigsaw icon) in top bar
   - OR press `Ctrl+Shift+A`
   - OR Menu → "Add-ons and themes"

2. **Load Temporary Extension**
   - Click the **gear icon** (⚙️) in top-right
   - Select **"Debug Add-ons"**
   - Click **"Load Temporary Add-on..."**
   - Navigate to: `/home/asi0/asi0-repos/mindful-navigation/`
   - Select: `manifest.json`
   - Click **Open**

3. **Verify Installation**
   - ✅ Extension appears in extensions list
   - ✅ Extension icon (🧘) visible in toolbar
   - ✅ No error messages

4. **Pin to Toolbar (Optional)**
   - Right-click extension icon
   - Select "Pin to toolbar"

### Testing in Zen

1. **Open test page:**
   ```
   http://localhost:8000/test.html
   ```

2. **Expected behavior:**
   - Test 1: ✅ "API Type: Firefox (browser API)"
   - All tests should pass with `browser` API detected

---

## 🦊 For Firefox

**Same steps as Zen Browser** - they use identical extension systems:

1. Navigate to: `about:debugging#/runtime/this-firefox`
2. Click **"Load Temporary Add-on"**
3. Select `manifest.json` from extension folder
4. Extension persists until Firefox closes

---

## 🌍 For Chromium-based Browsers

**Note:** Zen is **NOT** in this category. Only use these steps for Chrome, Edge, Brave, etc.

### Step 1: Enable Developer Mode

1. Open browser extensions page:
   - **Chrome:** `chrome://extensions/`
   - **Edge:** `edge://extensions/`
   - **Brave:** `brave://extensions/`

2. Toggle **"Developer mode"** ON (top-right)

### Step 2: Load Extension

1. Click **"Load unpacked"**
2. Select the `mindful-navigation` folder
3. Extension should appear in list

---

## 🔧 Browser Compatibility

| Browser | Engine | API | Supported |
|---------|--------|-----|-----------|
| **Zen Browser** | Gecko | `browser` | ✅ Yes |
| **Firefox** | Gecko | `browser` | ✅ Yes |
| Chrome | Blink | `chrome` | ✅ Yes |
| Edge | Blink | `chrome` | ✅ Yes |
| Brave | Blink | `chrome` | ✅ Yes |
| Safari | WebKit | - | ❌ No |

---

## 🧪 Testing Your Installation

### Quick Test (All Browsers)

1. **Start local test server** (if not running):
   ```bash
   cd /home/asi0/asi0-repos/mindful-navigation
   python3 -m http.server 8000
   ```

2. **Open test page** in your browser:
   ```
   http://localhost:8000/test.html
   ```

3. **Run Test 1: Extension Detection**
   - Click "Run Test" button
   - Should show: ✅ PASSED with your browser's API type

4. **Run Tests 2-5**
   - Test storage, messaging, and domain management
   - All should pass ✅

### Full Manual Test

1. **Open extension settings:**
   - Click extension icon → "Open Settings"

2. **Add test domain:**
   - Enter: `example.com`
   - Click "Add Domain"

3. **Test the overlay:**
   - Visit: `http://example.com`
   - Should see: 30-second mindfulness timer
   - Answer questions to start session

---

## 🐛 Troubleshooting

### Extension Won't Load in Zen/Firefox

**Check Console:**
1. Open Browser Console: `Ctrl+Shift+J`
2. Look for errors starting with "Mindful Navigation"
3. Check for manifest errors

**Common Issues:**
- ❌ Selected wrong file (must be `manifest.json`)
- ❌ Folder permissions issue
- ❌ Manifest syntax error

**Solution:**
```bash
# Verify manifest is valid JSON
cat manifest.json | python3 -m json.tool
```

### Test Page Shows "No API Available"

**Cause:** Extension not loaded in browser

**Solution:**
1. Verify extension is installed (check extensions page)
2. Make sure you're viewing test.html in the SAME browser where extension is loaded
3. For Zen/Firefox: Open as `http://localhost:8000/test.html` (NOT `file://`)

### Extension Loads but Doesn't Work

**Debug Steps:**

1. **Check Background Script:**
   - Zen: Extensions page → Inspect background
   - Look for initialization errors

2. **Check Content Script:**
   - Visit any webpage
   - Press F12 → Console tab
   - Look for content script errors

3. **Clear Storage and Reload:**
   ```javascript
   // In browser console:
   browser.storage.local.clear()
   // Then reload extension
   ```

---

## 🔄 Updating the Extension

### During Development

**Zen/Firefox:**
1. Go to extensions page (`Ctrl+Shift+A`)
2. Click **Reload** next to extension
3. Changes apply immediately

**Chromium:**
1. Go to extensions page
2. Click **Reload** icon on extension card
3. Changes apply immediately

---

## 📝 Important Notes

### Temporary Extensions (Zen/Firefox)

- **Removed when browser closes**
- Must reload each development session
- For permanent install: Package and sign for AMO (addons.mozilla.org)

### Unpacked Extensions (Chromium)

- **Persist between sessions**
- Yellow warning badge (normal for dev extensions)
- For production: Publish to Chrome Web Store

### Zen Browser Limitations

- ❌ Firefox themes NOT supported (Zen uses custom theming)
- ✅ All Firefox extensions work
- ✅ Full WebExtension API support
- ✅ Same security model as Firefox

---

## 🚀 Quick Start After Installation

1. ✅ Click extension icon
2. ✅ Click "Open Settings"
3. ✅ Add your distracting domains (reddit.com, twitter.com, etc.)
4. ✅ Visit those sites to experience mindful browsing!

---

## 🆘 Still Having Issues?

1. Check `TROUBLESHOOTING.md` for detailed debugging
2. Run all tests in `test.html` and note which fail
3. Check browser console for specific error messages
4. Open issue on GitHub with:
   - Browser name and version (e.g., "Zen Browser 1.14.11b")
   - Console error messages
   - Which tests pass/fail

---

**Zen Browser:** Firefox-based (Gecko engine) | Uses `browser` API | Full Firefox extension compatibility

**Happy Mindful Browsing! 🧘**
