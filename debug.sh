#!/bin/bash
# Debug script for Mindful Navigation extension

echo "=== Mindful Navigation Debug Info ==="
echo ""
echo "1. Extension Files:"
ls -lh manifest.json background.js content.js browser-polyfill.js 2>&1
echo ""
echo "2. Manifest JSON Valid:"
cat manifest.json | python3 -m json.tool > /dev/null 2>&1 && echo "✅ Valid JSON" || echo "❌ Invalid JSON"
echo ""
echo "3. Test Server:"
curl -s -o /dev/null -w "Status: %{http_code}\n" http://localhost:8000/test.html
echo ""
echo "4. Browser Polyfill Size:"
wc -l browser-polyfill.js
echo ""
echo "5. Manifest Content:"
cat manifest.json
echo ""
echo "=== Open in Zen Browser ==="
echo "URL: http://localhost:8000/test.html"
echo ""
echo "=== Installation Path ==="
echo "Load this file: $(pwd)/manifest.json"
