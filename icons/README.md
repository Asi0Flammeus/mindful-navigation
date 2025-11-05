# Icon Generation

The extension requires PNG icons in the following sizes:
- 48x48 pixels (`icon-48.png`)
- 96x96 pixels (`icon-96.png`)

## Quick Generation Options

### Option 1: Using ImageMagick (Recommended)
```bash
# Install ImageMagick if needed
# Ubuntu/Debian: sudo apt-get install imagemagick
# macOS: brew install imagemagick

# Generate icons
convert -background none icon.svg -resize 48x48 icon-48.png
convert -background none icon.svg -resize 96x96 icon-96.png
```

### Option 2: Using Inkscape
```bash
# Install Inkscape if needed
# Ubuntu/Debian: sudo apt-get install inkscape
# macOS: brew install inkscape

# Generate icons
inkscape icon.svg --export-filename=icon-48.png --export-width=48 --export-height=48
inkscape icon.svg --export-filename=icon-96.png --export-width=96 --export-height=96
```

### Option 3: Using Node.js (sharp)
```bash
npm install sharp-cli -g
sharp -i icon.svg -o icon-48.png resize 48 48
sharp -i icon.svg -o icon-96.png resize 96 96
```

### Option 4: Online Tools
- Visit https://cloudconvert.com/svg-to-png
- Upload `icon.svg`
- Set dimensions to 48x48 and 96x96
- Download the converted PNG files

### Option 5: Temporary Placeholder
For testing purposes, you can use simple emoji-based icons:
```bash
# This script creates basic placeholder icons
node generate-placeholder-icons.js
```

## Icon Design

The icon features:
- 🧘 Meditation figure in white
- Purple gradient background (#667eea to #764ba2)
- Zen circle (Enso) pattern
- Minimalist, calm aesthetic

The design reflects the extension's purpose: mindful, intentional browsing.
