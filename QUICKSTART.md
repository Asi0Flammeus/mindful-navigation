# 🚀 Quick Start Guide

Get Mindful Navigation running in under 2 minutes!

## Installation Steps

### 1. Load Extension in Firefox

```bash
# Open Firefox Developer Tools
Press Ctrl+Shift+I (or Cmd+Shift+I on Mac)
```

**OR**

1. Open Firefox
2. Type `about:debugging` in the address bar
3. Click "This Firefox" in the left sidebar
4. Click "Load Temporary Add-on"
5. Navigate to the `mindful-navigation` folder
6. Select `manifest.json`

### 2. Verify Installation

You should see:
- ✅ Extension icon (🧘) in your toolbar
- ✅ "Mindful Navigation" in your extensions list
- ✅ No error messages

### 3. Quick Test

1. **Open Settings**
   - Click the extension icon
   - Click "Open Settings"

2. **Add a Test Domain**
   - Type `example.com` in the input field
   - Click "Add Domain"
   - You should see it appear in the list

3. **Test the Flow**
   - Navigate to `http://example.com`
   - You should see the zen overlay appear
   - Wait 30 seconds for buttons to activate
   - Click "Yes, continue"
   - Fill in an intention and select time
   - Click "Start Mindful Session"
   - The overlay should disappear

## Common Test Domains

Add these for realistic testing:
- `youtube.com` - Video platform
- `reddit.com` - Discussion site
- `twitter.com` - Social media

## Testing Checklist

- [ ] Extension loads without errors
- [ ] Settings page opens
- [ ] Can add domains
- [ ] Can remove domains
- [ ] Overlay appears on blocked domains
- [ ] 30-second timer works
- [ ] Can set intention and time
- [ ] Session starts correctly
- [ ] Session ends with reflection
- [ ] Popup shows correct stats

## Troubleshooting

### Extension Won't Load
**Check:**
- `manifest.json` exists in the folder
- No syntax errors in console (F12)
- Firefox version is 78+

### Overlay Doesn't Appear
**Check:**
- Domain is actually in your blocked list
- You navigated to the main domain (not a subdomain)
- Check browser console for errors (F12)

### Timer Doesn't Work
**Check:**
- JavaScript is enabled
- No browser errors in console
- Try reloading the extension

### Changes Not Appearing
**Solution:**
1. Go to `about:debugging`
2. Click "Reload" next to Mindful Navigation
3. Refresh the test page

## Development Workflow

```bash
# Make changes to code
vim background.js

# Reload extension
# about:debugging → Reload

# Test changes
# Visit blocked domain

# Check console for errors
# F12 → Console tab
```

## File Locations

- **Background Logic**: `background.js`
- **UI Overlay**: `content.js` + `styles/overlay.css`
- **Settings**: `options/options.js`
- **Popup**: `popup/popup.js`

## Next Steps

1. ✅ Add your own distracting domains
2. ✅ Test the full flow multiple times
3. ✅ Try different time limits
4. ✅ Experience the reflection prompts
5. ✅ Customize (optional) - edit CSS for your style

## Tips for Best Experience

- **Be Honest**: Write real intentions, not generic ones
- **Start Small**: Use 5-15 minute sessions at first
- **Reflect Genuinely**: The post-session reflection is the key
- **Iterate**: Adjust your blocked domains as you learn your patterns

## Support

Having issues? Check:
1. Browser console (F12) for errors
2. `about:debugging` for extension status
3. GitHub issues for known problems
4. README.md for detailed documentation

---

**Happy Mindful Browsing! 🧘**
