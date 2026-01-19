# Attendance Tracker - Google Sheets Add-on

Quick daily attendance from class roster.

**Status:** Coming Soon

## Features (Planned)

- Load roster from spreadsheet
- One-click present/absent marking
- Date-stamped attendance records
- Export attendance history
- Absence patterns and reports
- Late arrival tracking

## Technical Details

**OAuth Scope:**

- `https://www.googleapis.com/auth/spreadsheets` — Read roster, save attendance

**Cloud Project:**

This add-on has its own Google Cloud project (`attendance-tracker`) separate from other Classroom Essentials add-ons.

**Files (to be created):**

- `Code.gs` - Apps Script backend
- `Sidebar.html` - UI
- `appsscript.json` - Manifest

## Development

See [DEPLOYMENT.md](../docs/DEPLOYMENT.md) for setup instructions.

## License

MIT License
