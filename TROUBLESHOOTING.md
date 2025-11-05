# 🔧 Troubleshooting Guide

## Issue: Popup Shows as Tiny White Rectangle

This is the most common issue when loading the extension. Here's how to fix it:

### Step 1: Reload the Extension

1. Go to `about:debugging#/runtime/this-firefox`
2. Find "Mindful Navigation"
3. Click **Reload** button
4. Try clicking the extension icon again

### Step 2: Check Browser Console for Errors

1. Click the extension icon (even if it shows a white rectangle)
2. Right-click on the popup → **Inspect**
3. Look at the **Console** tab for errors
4. Look for messages starting with "Mindful Navigation:"

**Expected console output:**
```
Mindful Navigation: Starting initialization...
Mindful Navigation: Loaded blocked domains: []
Mindful Navigation: Initialized successfully
Popup initializing...
Current tab: {id: ..., url: ...}
Blocked domains response: []
Popup initialized successfully
```

### Step 3: Check Background Script

1. Go to `about:debugging#/runtime/this-firefox`
2. Find "Mindful Navigation"
3. Click **Inspect** (next to the extension)
4. Check the Console tab

**Expected output:**
```
Mindful Navigation: Starting initialization...
Mindful Navigation: Loaded blocked domains: []
Mindful Navigation: Initialized successfully
```

### Step 4: Clear Extension Storage (Nuclear Option)

If the popup still doesn't work:

1. Open Browser Console: `Ctrl+Shift+J` (or `Cmd+Shift+J` on Mac)
2. Run this command:
   ```javascript
   browser.storage.local.clear()
   ```
3. Reload the extension
4. Try clicking the icon again

### Step 5: Verify File Paths

Make sure all files exist:

```bash
cd mindful-navigation
ls -la popup/
# Should show: popup.html, popup.css, popup.js

ls -la icons/
# Should show: icon-48.png, icon-96.png
```

## Issue: Extension Icon Not Appearing

### Solution 1: Reload Firefox
Sometimes Firefox needs a restart after loading a temporary extension.

### Solution 2: Check Manifest
Verify `manifest.json` has correct paths:
```json
"browser_action": {
  "default_popup": "popup/popup.html",
  "default_icon": {
    "48": "icons/icon-48.png",
    "96": "icons/icon-96.png"
  }
}
```

## Issue: Overlay Not Appearing on Blocked Sites

### Checklist:
1. **Is the domain actually blocked?**
   - Click extension icon
   - Click "Open Settings"
   - Verify domain is in the list

2. **Are you on the exact domain?**
   - If you blocked `youtube.com`, it will also work on `www.youtube.com`
   - But NOT on `music.youtube.com` (subdomain)

3. **Check content script injection:**
   - Visit blocked domain
   - Press F12 → Console
   - Look for any errors
   - Check if `content.js` is loaded in Debugger tab

4. **Try a simple test domain:**
   - Add `example.com` to blocked list
   - Visit `http://example.com`
   - Overlay should appear

## Issue: Timer Not Working

### Debug Steps:
1. Open the overlay
2. Press F12 → Console
3. Watch for countdown logs
4. Check for JavaScript errors

### Common Causes:
- Browser tab is not focused (timers slow down)
- JavaScript errors preventing execution
- Browser performance mode enabled

## Issue: Sessions Not Persisting

### Check Storage:
1. Browser Console: `Ctrl+Shift+J`
2. Run:
   ```javascript
   browser.storage.local.get().then(console.log)
   ```
3. Should see: `blockedDomains`, `activeSessions`

### Verify Background Script:
1. `about:debugging` → Inspect background
2. Console should show session creation
3. Check for timer expiration messages

## Issue: Options Page Not Opening

### Solution:
1. Go to `about:addons`
2. Find "Mindful Navigation"
3. Click on it
4. Click "Options" or "Preferences"

**OR** manually navigate to:
```
moz-extension://<extension-id>/options/options.html
```

## Common Error Messages

### "browser is not defined"
- **Cause**: Using Chrome instead of Firefox
- **Fix**: This extension is Firefox-only

### "Cannot read property 'id' of undefined"
- **Cause**: Tab object is null/undefined
- **Fix**: Extension needs tabs permission (already in manifest)

### "StorageArea.get() error"
- **Cause**: Storage permission issue
- **Fix**: Reload extension, verify manifest has `"storage"` permission

## Debugging Tips

### Enable Verbose Logging
The extension now has detailed console logging. Check:

**Popup Console:**
- Initialization messages
- Data loading status
- UI update logs

**Background Console:**
- Message handling
- Domain blocking events
- Session management

### Test Minimal Setup
1. Remove all blocked domains
2. Add just `example.com`
3. Visit `http://example.com`
4. Verify overlay appears
5. Complete full flow

### Test Each Component Separately

**Test Popup:**
```javascript
// In browser console
browser.runtime.sendMessage({type: 'GET_BLOCKED_DOMAINS'})
  .then(console.log)
```

**Test Background Script:**
```javascript
// In background console (about:debugging → Inspect)
MindfulNav.blockedDomains
MindfulNav.activeSessions
```

**Test Storage:**
```javascript
// In browser console
browser.storage.local.get(['blockedDomains'])
  .then(console.log)
```

## Still Having Issues?

### Collect Debug Info

1. **Browser Version:**
   - `about:support` → "Firefox Version"

2. **Extension Version:**
   - Check `manifest.json` → `"version"`

3. **Console Errors:**
   - Copy all red errors from:
     - Popup console (right-click popup → Inspect)
     - Background console (about:debugging → Inspect)
     - Page console (F12 on blocked site)

4. **Steps to Reproduce:**
   - What did you do?
   - What did you expect?
   - What actually happened?

### Create GitHub Issue

If nothing works, create an issue with:
- Debug info from above
- Screenshots
- Console error messages

## Quick Fixes Checklist

- [ ] Extension reloaded (`about:debugging` → Reload)
- [ ] Firefox restarted
- [ ] Console checked for errors
- [ ] Storage cleared and reloaded
- [ ] Test domain added (`example.com`)
- [ ] Test domain visited
- [ ] Popup inspected (right-click → Inspect)
- [ ] Background inspected (`about:debugging`)
- [ ] File paths verified
- [ ] Permissions checked in manifest

---

**Most issues are solved by:**
1. Reloading the extension
2. Checking console for specific errors
3. Testing with `example.com` first

**Need more help?** Check the logs, they're verbose now!
