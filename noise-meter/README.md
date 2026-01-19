# Noise Meter - Google Slides Add-on

Visual noise level indicator for classroom management.

**Status:** Coming Soon

## Features (Planned)

- Real-time noise level display using microphone
- Visual meter (green/yellow/red zones)
- Configurable thresholds
- Voice level reminders (whisper, talking, presenting)
- Optional sound alert when too loud
- Full-screen display mode

## Technical Details

**OAuth Scopes:**

- `https://www.googleapis.com/auth/presentations` — Display in Slides
- Microphone access via browser API

**Cloud Project:**

This add-on has its own Google Cloud project (`noise-meter`) separate from other Classroom Essentials add-ons.

**Files (to be created):**

- `Code.gs` - Apps Script backend
- `Sidebar.html` - UI with Web Audio API
- `appsscript.json` - Manifest

## Development

See [DEPLOYMENT.md](../docs/DEPLOYMENT.md) for setup instructions.

## License

MIT License
