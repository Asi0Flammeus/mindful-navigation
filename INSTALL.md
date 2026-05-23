# Installation guide

Mindful Navigation is a WebExtension (Manifest V2). Until a signed store
release is published, it loads as a temporary / unpacked extension. The steps
differ slightly per browser engine.

> **TL;DR**
> - Firefox / Zen → `about:debugging` → *Load Temporary Add-on* → pick `manifest.json`
> - Chrome / Edge / Brave → `chrome://extensions` → enable Developer mode → *Load unpacked* → pick the folder

## 1. Get the source

```bash
git clone https://github.com/Asi0Flammeus/mindful-navigation.git
cd mindful-navigation
```

No build step is required.

## 2. Load the extension

### Firefox

1. Open `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on…**.
3. Select the `manifest.json` file in the repo root.

The extension stays loaded until you close Firefox.

### Zen Browser

Zen is Firefox-based (Gecko engine, same WebExtension API), so the steps are
identical to Firefox:

1. Press `Ctrl+Shift+A` to open the Add-ons Manager.
2. Click the gear icon (⚙) → **Debug Add-ons**.
3. Click **Load Temporary Add-on…** and select `manifest.json`.

### Chrome / Edge / Brave / Opera / Arc

1. Open the extensions page:
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
   - Brave: `brave://extensions/`
2. Toggle **Developer mode** on (top-right).
3. Click **Load unpacked** and select the `mindful-navigation` folder.

Unpacked extensions persist between browser restarts. You'll see a yellow
"Developer mode extensions" warning — that's normal for unsigned local builds.

## 3. Verify the install

You should see:

- The extension listed in the extensions page with no error badge.
- The Mindful Navigation icon in the toolbar (pin it if your browser hides
  extension icons by default).

Click the icon → **Open Settings** → add a test domain such as `example.com` →
visit `http://example.com`. You should see the reflection overlay with a
30-second countdown.

## Updating during development

After editing source files:

- **Firefox / Zen** — `about:debugging` → click **Reload** next to the
  extension entry.
- **Chrome family** — `chrome://extensions` → click the circular **Reload**
  icon on the extension card.

Then refresh the test page.

## Troubleshooting

**Extension won't load (manifest error).**
Validate the manifest:
```bash
python3 -m json.tool < manifest.json > /dev/null && echo OK
```
If that prints `OK`, re-check that you pointed the loader at `manifest.json`,
not at the parent folder (Firefox) or vice versa (Chrome wants the folder).

**Overlay never appears on a blocked domain.**
- Confirm the domain is in the configured list (extension Settings).
- Use the base domain (`reddit.com`, not `old.reddit.com/r/...`); subdomains
  match the parent.
- Open the browser console (`F12` → Console) and look for errors prefixed with
  `Mindful Navigation`.

**Buttons never activate after the countdown.**
- Make sure JavaScript is enabled for extension pages.
- Reload the extension from the extensions page.

**Session doesn't end / domain stays unblocked.**
Clear extension storage and reload:
```js
// Run in the extension background console
browser.storage.local.clear(); // or chrome.storage.local.clear()
```

**Chrome reports "Manifest version 2 is deprecated".**
Acknowledged — MV2 still works in current Chrome stable, and a MV3 migration
is on the roadmap. Firefox / Zen continue to support MV2 long-term.

## Permanent install (not yet available)

A signed AMO build (Firefox) and a Chrome Web Store listing are planned for an
upcoming release. Until then, the unpacked / temporary install above is the
supported path.
