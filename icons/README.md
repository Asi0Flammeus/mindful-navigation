# Icons

The extension ships three icon assets:

- `icon.svg` — source vector (zen circle / enso with a compass needle, lavender accent)
- `icon-48.png` — toolbar / extension list (48×48)
- `icon-96.png` — high-DPI toolbar and store listings (96×96)
- `icon-512.png` — store/listing hero asset (512×512)

## Regenerating from the SVG

```bash
rsvg-convert -w 512 -h 512 icon.svg -o icon-512.png
rsvg-convert -w 96  -h 96  icon.svg -o icon-96.png
rsvg-convert -w 48  -h 48  icon.svg -o icon-48.png
```

`rsvg-convert` renders SVG gradients correctly; ImageMagick's legacy SVG renderer does not.

## Design

Single stylized enso (open zen circle) with a compass needle passing through it,
on a transparent background, soft lavender gradient (`#7B68EE` family).
The needle nods to *intentional navigation*; the enso to *presence and pause*.
