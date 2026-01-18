# Classroom Essentials

Free Google Workspace add-ons for teachers. Simple, powerful tools that work where you already work.

## Tools

### 1. Classroom Timer (Google Slides Add-on)

Embeddable countdown timer directly in your presentations. Perfect for activities, transitions, and time management.

**Features:**
- Preset times: 5min, 10min, 15min, custom
- Visual progress bar with percentage
- Sound alerts when time is up
- Pause/resume functionality
- Clean, distraction-free interface

**Status:** ✅ In Development

### 2. Random Student Picker (Coming Soon)

Fairly pick students with participation tracking.

### 3. Group Maker (Coming Soon)

Generate balanced random groups in seconds.

### 4. Seating Chart Generator (Coming Soon)

Visual seating charts with drag-and-drop.

## Why Classroom Essentials?

- **Free Forever**: Core features completely free, no ads
- **Works Where You Work**: Integrates directly into Google Workspace
- **Privacy First**: Data stays in your Google account
- **Teacher Built**: Designed by educators, for educators

## Installation

Each add-on will be published to the Google Workspace Marketplace. Links coming soon!

## Architecture

Each add-on is an **independent project** with its own Google Cloud project, OAuth consent screen, and Marketplace listing. This ensures:

- **Minimal permissions** — Users only grant what each app needs
- **Independent publishing** — Each add-on reviewed/approved separately
- **Isolated risk** — Issues with one app don't affect others
- **Clear user consent** — Users see exactly what each app does

### Project Structure

```text
classroom-essentials/
├── timer-addon/          # Classroom Timer (own Cloud project)
├── student-picker/       # Random Student Picker (own Cloud project)
├── group-maker/          # Group Maker (own Cloud project)
├── seating-chart/        # Seating Chart Generator (own Cloud project)
└── docs/                 # Shared documentation
```

### Add-ons & OAuth Scopes

| Add-on | Google App | OAuth Scope |
|--------|------------|-------------|
| Classroom Timer | Slides | `presentations` |
| Random Student Picker | Sheets | `spreadsheets` |
| Group Maker | Sheets | `spreadsheets` |
| Seating Chart Generator | Sheets/Slides | `spreadsheets`, `presentations` |

### Costs

- **Apps Script hosting**: Free
- **Google Cloud Project**: Free (no billable APIs)
- **Marketplace registration**: $5 one-time (covers all apps)

## Tech Stack

- **Google Apps Script** (JavaScript)
- **Google Slides API** (Timer, Seating Chart)
- **Google Sheets API** (Picker, Groups, Seating)
- **Google Classroom API** (Roster integration, future)

## Contributing

These tools are open source! Contributions welcome.

## License

MIT License - See LICENSE file for details

## Author

Built with ❤️ for teachers everywhere by Rob Wolfe
