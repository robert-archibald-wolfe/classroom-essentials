# Random Student Picker - Google Sheets Add-on

Fairly pick students with participation tracking.

**Status:** Coming Soon

## Features (Planned)

- Random student selection from class roster
- Participation tracking (who's been called)
- "No repeats" mode until everyone participates
- Import roster from Google Classroom
- Visual spinner animation

## Technical Details

**OAuth Scope:**

- `https://www.googleapis.com/auth/spreadsheets` — Read class roster from Sheets

**Cloud Project:**

This add-on has its own Google Cloud project (`student-picker`) separate from other Classroom Essentials add-ons.

**Files (to be created):**

- `Code.gs` - Apps Script backend
- `Sidebar.html` - UI
- `appsscript.json` - Manifest

## Development

See [DEPLOYMENT.md](../docs/DEPLOYMENT.md) for setup instructions.

## License

MIT License
