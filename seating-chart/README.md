# Seating Chart Generator - Google Sheets Add-on

Visual seating charts with drag-and-drop student placement.

**Status:** v1.0 Complete

## Features

- Load student roster from any spreadsheet column
- 5 room templates: Rows, Groups, U-Shape, Circle, Custom Grid
- Drag-and-drop student placement
- Swap students by dragging one onto another
- Double-click to remove a student from their seat
- Randomize seating with one click
- Save and load multiple configurations
- Export seating chart to a new sheet

## How It Works

1. Open a Google Sheets spreadsheet with student names in a column
2. Click **Extensions > Seating Chart > Open Seating Chart**
3. Select the column containing student names
4. Choose a room template and set dimensions
5. Drag students from the pool to seats, or click Randomize
6. Save your configuration for later use

## Technical Details

**Files:**

- `Code.gs` - Apps Script backend (roster reading, save/load, export)
- `Sidebar.html` - UI with embedded CSS and JavaScript
- `appsscript.json` - Manifest

**OAuth Scope:**

- `https://www.googleapis.com/auth/spreadsheets` — Read roster, save configurations

**Cloud Project:**

This add-on has its own Google Cloud project (`seating-chart`) separate from other Classroom Essentials add-ons.

**Costs:**

- Free to run (Apps Script, no billable APIs)
- $5 one-time Marketplace registration (covers all your apps)

## Room Templates

| Template | Description |
|----------|-------------|
| Rows | Traditional classroom with rows facing front |
| Groups | 2x2 collaborative pods |
| U-Shape | Discussion-friendly U arrangement |
| Circle | Round table or circle time |
| Custom | User-defined grid dimensions |

## Development

### Local Development

```bash
# Install clasp (Google Apps Script CLI)
npm install -g @google/clasp

# Login to Google
clasp login

# Create new project
clasp create --type sheets --title "Seating Chart Generator"

# Push code
clasp push

# Open in browser
clasp open
```

### Testing

1. Open any Google Sheets spreadsheet with a column of names
2. Reload to see **Seating Chart** in Extensions menu
3. Test loading roster from different columns
4. Test all 5 templates
5. Test drag-and-drop, randomize, clear
6. Test save/load configurations
7. Test export to sheet

## Roadmap

- [x] v1.0: Core functionality with templates and drag-and-drop
- [ ] v1.1: Print-friendly view
- [ ] v2.0: Export to Google Slides
- [ ] v2.1: Student photos from Google Classroom

## License

MIT License - Free to use, modify, and distribute
