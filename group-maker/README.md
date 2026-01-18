# Group Maker - Google Sheets Add-on

Generate balanced random groups in seconds.

**Status:** Coming Soon

## Features (Planned)

- Create random groups of any size
- Balance by criteria (skill level, preferences)
- Save group configurations
- Export to Sheets or Slides
- "Keep apart" and "keep together" rules

## Technical Details

**OAuth Scope:**

- `https://www.googleapis.com/auth/spreadsheets` — Read roster, save groups

**Cloud Project:**

This add-on has its own Google Cloud project (`group-maker`) separate from other Classroom Essentials add-ons.

**Files (to be created):**

- `Code.gs` - Apps Script backend
- `Sidebar.html` - UI
- `appsscript.json` - Manifest

## Development

See [DEPLOYMENT.md](../docs/DEPLOYMENT.md) for setup instructions.

## License

MIT License
