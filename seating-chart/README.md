# Seating Chart Generator - Google Sheets/Slides Add-on

Visual seating charts with drag-and-drop.

**Status:** Coming Soon

## Features (Planned)

- Visual classroom layout editor
- Drag-and-drop student placement
- Multiple room templates
- Export to Slides for display
- Save and load configurations
- Randomize seating option

## Technical Details

**OAuth Scopes:**

- `https://www.googleapis.com/auth/spreadsheets` — Store roster and configurations
- `https://www.googleapis.com/auth/presentations` — Export charts to Slides

**Cloud Project:**

This add-on has its own Google Cloud project (`seating-chart`) separate from other Classroom Essentials add-ons.

**Files (to be created):**

- `Code.gs` - Apps Script backend
- `Sidebar.html` - UI
- `appsscript.json` - Manifest

## Development

See [DEPLOYMENT.md](../docs/DEPLOYMENT.md) for setup instructions.

## License

MIT License
