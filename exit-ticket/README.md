# Exit Ticket - Google Slides Add-on

Quick end-of-class poll or question to check understanding.

**Status:** Coming Soon

## Features (Planned)

- Create quick polls/questions during presentations
- Multiple question types (multiple choice, short answer, thumbs up/down)
- Display results in real-time
- Export responses to Sheets
- Anonymous or named responses

## Technical Details

**OAuth Scope:**

- `https://www.googleapis.com/auth/presentations` — Display in Slides

**Cloud Project:**

This add-on has its own Google Cloud project (`exit-ticket`) separate from other Classroom Essentials add-ons.

**Files (to be created):**

- `Code.gs` - Apps Script backend
- `Sidebar.html` - UI
- `appsscript.json` - Manifest

## Development

See [DEPLOYMENT.md](../docs/DEPLOYMENT.md) for setup instructions.

## License

MIT License
