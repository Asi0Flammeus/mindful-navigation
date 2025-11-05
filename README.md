# 🧘 Mindful Navigation

A beautiful Firefox extension that helps you practice intentional browsing by prompting you to reflect before visiting distracting websites.

![Version](https://img.shields.io/badge/version-1.0.0-purple)
![License](https://img.shields.io/badge/license-MIT-blue)
![Firefox](https://img.shields.io/badge/firefox-compatible-orange)
![Chrome](https://img.shields.io/badge/chrome-compatible-green)
![Zen Browser](https://img.shields.io/badge/zen_browser-compatible-blue)

## ✨ Features

- **🤔 Reflection Pause**: 30-second timer to consider if you really want to visit a website
- **🎯 Intention Setting**: Write down your specific purpose before accessing blocked sites
- **⏱️ Time-Boxed Sessions**: Set session limits (5, 15, 30, or 60 minutes)
- **💭 Post-Session Reflection**: Review whether you followed your intention
- **🎨 Beautiful Zen UI**: Calming, distraction-free interface with smooth animations
- **⚙️ Easy Configuration**: Simple domain management with suggested sites

## 🎬 How It Works

1. **Reflection Pause** (30 seconds)
   - When you visit a blocked domain, a zen overlay appears
   - You see a 30-second timer asking "Do you really want to visit this website?"
   - Buttons activate only after the reflection period

2. **Set Your Intention**
   - If you choose to proceed, describe your specific purpose
   - Select a time limit: 5, 15, 30, or 60 minutes
   - The timer starts and you can browse mindfully

3. **Mindful Session**
   - Browse the site while your session is active
   - The extension remembers your stated intention
   - You can focus on your goal without interruption

4. **Reflection Check**
   - When time expires, you're asked to reflect
   - Did you follow your initial intention?
   - Option to set a new intention or end the session

## 🚀 Installation

### Browser Support

Works on:
- ✅ **Zen Browser** (Firefox-based, Gecko engine) - RECOMMENDED
- ✅ **Firefox** (native support)
- ✅ **Chrome** / Edge / Brave / Opera (Chromium-based)
- ❌ Safari (not yet supported)

### From Source (Development)

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mindful-navigation.git
   cd mindful-navigation
   ```

2. **Load in Your Browser**

   **Zen Browser / Firefox:**
   - Press `Ctrl+Shift+A` to open Add-ons Manager
   - Click gear icon (⚙️) → "Debug Add-ons"
   - Click "Load Temporary Add-on"
   - Select the `manifest.json` file from the extension directory

   **Chrome / Edge / Brave / Opera (Chromium-based):**
   - Navigate to `chrome://extensions/` (or `edge://extensions/`, etc.)
   - Enable "Developer mode" (top-right toggle)
   - Click "Load unpacked"
   - Select the `mindful-navigation` folder

   📖 **Detailed Guide:** See [INSTALL.md](INSTALL.md) for browser-specific instructions

### From Extension Stores (Coming Soon)
   - **Firefox Add-ons**: Search for "Mindful Navigation"
   - **Chrome Web Store**: Search for "Mindful Navigation"

## 📖 Usage

### Configure Blocked Domains

1. Click the extension icon in your toolbar
2. Click "Open Settings" or right-click → "Options"
3. Add domains you want to monitor:
   - Type the domain (e.g., `youtube.com`)
   - Or click suggested domains like YouTube, Twitter, Reddit, etc.
4. Domains are saved automatically

### Visit a Blocked Site

1. Navigate to a blocked domain
2. **Question 1**: Reflect for 30 seconds, then choose Yes or No
3. **Question 2**: Write your intention and select time limit
4. Browse mindfully during your session
5. **Reflection**: Review your intention when time expires

### Quick Actions

**Popup Interface** (Click extension icon):
- View number of blocked domains
- See active sessions
- Check current tab status
- Quick-add current domain

## 🎨 Suggested Domains

Pre-configured suggestions for common time-sink sites:
- 📺 YouTube
- 🐦 Twitter / X
- 📘 Facebook
- 📷 Instagram
- 🤖 Reddit
- 🎵 TikTok
- 🎬 Netflix

## 🏗️ Project Structure

```
mindful-navigation/
├── manifest.json           # Extension configuration
├── background.js          # Domain monitoring & timer logic
├── content.js            # Overlay UI injection
├── popup/               # Toolbar popup
│   ├── popup.html
│   ├── popup.css
│   └── popup.js
├── options/            # Settings page
│   ├── options.html
│   ├── options.css
│   └── options.js
├── styles/            # Shared styles
│   └── overlay.css
└── icons/            # Extension icons
    ├── icon-48.png
    └── icon-96.png
```

## 🔧 Technical Details

### Permissions Required
- `storage` - Save blocked domains and session data
- `tabs` - Monitor tab navigation
- `webNavigation` - Intercept navigation to blocked domains
- `notifications` - Show session start/end notifications
- `<all_urls>` - Inject overlay on any blocked domain

### Browser Compatibility
- **Zen Browser** (Gecko engine, native `browser` API) - RECOMMENDED
- **Firefox** 78+ (Gecko engine, native `browser` API)
- **Chrome/Chromium** 88+ (Blink engine, polyfilled `chrome` API)
- **Edge, Brave, Opera** (Chromium-based, Blink engine)
- Manifest V2 with automatic API detection via browser-polyfill.js

### Storage
- **Local Storage**: Blocked domains, active sessions
- **Session Persistence**: Survives browser restart
- **No External Servers**: All data stays local

## 🛠️ Development

### Prerequisites
- Firefox Developer Edition (recommended)
- Basic knowledge of JavaScript, HTML, CSS

### Setup Development Environment

```bash
# Clone repository
git clone https://github.com/yourusername/mindful-navigation.git
cd mindful-navigation

# No build step required - pure vanilla JS!

# Load in Firefox
# about:debugging → Load Temporary Add-on → manifest.json
```

### Key Files to Edit

- **Domain Logic**: `background.js`
- **UI Components**: `content.js`, `styles/overlay.css`
- **Settings Page**: `options/options.js`
- **Popup**: `popup/popup.js`

### Testing

1. Add a test domain (e.g., `example.com`)
2. Navigate to `http://example.com`
3. Verify overlay appears with 30-second timer
4. Test full flow: reflection → intention → session → reflection

## 🎯 Philosophy

Mindful Navigation is built on the principle that **awareness precedes change**. By creating a brief pause before accessing potentially distracting sites, you:

- ✅ Become aware of your browsing habits
- ✅ Set clear intentions for your time online
- ✅ Practice self-regulation without harsh blocking
- ✅ Build healthier relationships with technology

This extension doesn't *block* sites—it creates **space for conscious choice**.

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Report Bugs**: Open an issue with details
2. **Suggest Features**: Share your ideas for improvements
3. **Submit PRs**: Fix bugs or add features
4. **Improve Docs**: Help make the README clearer

### Development Guidelines
- Keep code simple and readable
- Follow existing code style
- Test thoroughly before submitting
- Update README for new features

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details

## 💜 Acknowledgments

- Inspired by digital wellbeing and mindfulness practices
- Design influenced by Zen aesthetics and calm technology principles
- Built with love for a healthier internet

## 🔗 Links

- **Repository**: [GitHub](https://github.com/yourusername/mindful-navigation)
- **Issues**: [Bug Reports](https://github.com/yourusername/mindful-navigation/issues)
- **Firefox Add-ons**: Coming soon!

## 📧 Contact

Questions? Suggestions? Reach out:
- Open an issue on GitHub
- Email: your-email@example.com

---

**Made with 💜 for mindful browsing**

*Practice intentional navigation, one reflection at a time.*
