# Discussion Tracker - Google Sheets Add-on

Track student participation in class discussions.

**Status:** Coming Soon

## Features (Planned)

- Load class roster
- One-click tracking when student speaks
- Participation count per student
- Visual equity indicator (who hasn't spoken)
- Session history
- Export participation data
- Discussion quality notes (optional)

## Technical Details

**OAuth Scope:**

- `https://www.googleapis.com/auth/spreadsheets` — Read roster, save participation

**Cloud Project:**

This add-on has its own Google Cloud project (`discussion-tracker`) separate from other Classroom Essentials add-ons.

**Files (to be created):**

- `Code.gs` - Apps Script backend
- `Sidebar.html` - UI
- `appsscript.json` - Manifest

## Development

See [DEPLOYMENT.md](../docs/DEPLOYMENT.md) for setup instructions.

## License

MIT License
