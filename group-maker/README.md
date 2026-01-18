# Group Maker - Google Sheets Add-on

Generate balanced random groups in seconds.

**Status:** v1.0 Complete

## Features

- Load student roster from any spreadsheet column
- Create groups by size (e.g., "groups of 4") or by count (e.g., "5 groups")
- Balanced distribution - groups differ by at most 1 student
- Shuffle to regenerate with same settings
- Color-coded group cards
- Save and load group configurations
- Export groups to a new sheet

## How It Works

1. Open a Google Sheets spreadsheet with student names in a column
2. Click **Extensions > Group Maker > Open Group Maker**
3. Select the column containing student names
4. Choose: groups by size or by number of groups
5. Click "Generate Groups" to create random groups
6. Shuffle to remix, or export to a sheet

## Technical Details

**Files:**

- `Code.gs` - Apps Script backend (roster reading, save/load, export)
- `Sidebar.html` - UI with group cards
- `appsscript.json` - Manifest

**OAuth Scope:**

- `https://www.googleapis.com/auth/spreadsheets` — Read roster, export groups

**Cloud Project:**

This add-on has its own Google Cloud project (`group-maker`) separate from other Classroom Essentials add-ons.

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
clasp create --type sheets --title "Group Maker"

# Push code
clasp push

# Open in browser
clasp open
```

### Testing

1. Open any Google Sheets spreadsheet with a column of names
2. Reload to see **Group Maker** in Extensions menu
3. Test loading roster from different columns
4. Test both grouping modes (by size, by count)
5. Test shuffle and regenerate
6. Test save/load configurations
7. Test export to sheet

## Roadmap

- [x] v1.0: Basic random groups with save/export
- [ ] v2.0: Constraint system
  - "Keep apart" rules (students who shouldn't be together)
  - "Keep together" rules (students who must be grouped)
  - Constraint satisfaction algorithm
- [ ] v2.1: Balance by attribute (e.g., skill level column)
- [ ] v3.0: Import constraints from Google Classroom

## Algorithm Notes (for v2.0)

The constraint system will use an **iterative repair algorithm**:

1. Generate initial random groups
2. Identify constraint violations
3. Swap students between groups to fix violations
4. Repeat until all constraints satisfied or max iterations reached
5. Report if constraints are unsatisfiable

This approach handles both hard constraints (must satisfy) and soft constraints (prefer to satisfy) efficiently.

## License

MIT License - Free to use, modify, and distribute
