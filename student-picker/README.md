# Random Student Picker - Google Sheets Add-on

Fairly pick students with participation tracking.

**Status:** v1.0 Complete

## Features

- Load student roster from any spreadsheet column
- Visual spinning animation when picking
- Participation tracking (who's been called)
- "No repeats" mode - everyone gets called before repeating
- Pick history with timestamps
- Reset participation at any time

## How It Works

1. Open a Google Sheets spreadsheet with student names in a column
2. Click **Extensions > Student Picker > Open Student Picker**
3. Select the column containing student names
4. Click "Pick a Student" to randomly select someone
5. The spinner animates and lands on a random student
6. Participation progress shows how many have been called

## Technical Details

**Files:**

- `Code.gs` - Apps Script backend (roster reading, participation tracking)
- `Sidebar.html` - UI with spinner animation
- `appsscript.json` - Manifest

**OAuth Scope:**

- `https://www.googleapis.com/auth/spreadsheets` — Read roster from Sheets

**Cloud Project:**

This add-on has its own Google Cloud project (`student-picker`) separate from other Classroom Essentials add-ons.

**Costs:**

- Free to run (Apps Script, no billable APIs)
- $5 one-time Marketplace registration (covers all your apps)

## Development

### Local Development

```bash
# Install clasp (Google Apps Script CLI)
npm install -g @google/clasp

# Login to Google
clasp login

# Create new project
clasp create --type sheets --title "Random Student Picker"

# Push code
clasp push

# Open in browser
clasp open
```

### Testing

1. Open any Google Sheets spreadsheet with a column of names
2. Reload to see **Student Picker** in Extensions menu
3. Test loading roster from different columns
4. Test picking students multiple times
5. Verify no repeats until all called
6. Test reset functionality

## Roadmap

- [x] v1.0: Core picker with participation tracking
- [ ] v1.1: Sound effects on pick
- [ ] v1.2: Absence marking (skip absent students)
- [ ] v2.0: Import roster from Google Classroom

## License

MIT License - Free to use, modify, and distribute
