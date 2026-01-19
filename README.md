# Classroom Essentials

Free Google Workspace add-ons for teachers. Simple, powerful tools that work where you already work.

## Tools

### Ready to Use

| Add-on | App | Description | Status |
|--------|-----|-------------|--------|
| [Classroom Timer](timer-addon/) | Slides | Countdown timer with presets, pause/resume | v1.0 |
| [Seating Chart](seating-chart/) | Sheets | Drag-and-drop seating with templates | v1.0 |
| [Student Picker](student-picker/) | Sheets | Random picker with participation tracking | v1.0 |
| [Group Maker](group-maker/) | Sheets | Random groups by size or count | v1.0 |

### Coming Soon

| Add-on | App | Description |
|--------|-----|-------------|
| [Exit Ticket](exit-ticket/) | Slides | Quick polls to check understanding |
| [Countdown Overlay](countdown-overlay/) | Slides | Full-screen timer overlay |
| [Noise Meter](noise-meter/) | Slides | Visual noise level indicator |
| [Task Checklist](task-checklist/) | Slides | Student-facing task display |
| [Attendance Tracker](attendance-tracker/) | Sheets | Quick daily attendance |
| [Parking Lot](parking-lot/) | Slides | Digital questions board |
| [Learning Objectives](learning-objectives/) | Slides | Formatted objectives generator |
| [Rubric Builder](rubric-builder/) | Sheets | Create and apply rubrics |
| [Station Rotation](station-rotation/) | Slides | Multi-timer for stations |
| [Discussion Tracker](discussion-tracker/) | Sheets | Track participation equity |
| [Sub Plans](sub-plans/) | Docs | Substitute teacher instructions |
| [Parent Contact Log](parent-contact-log/) | Sheets | Track parent communications |

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
├── timer-addon/          # Classroom Timer
├── seating-chart/        # Seating Chart Generator
├── student-picker/       # Random Student Picker
├── group-maker/          # Group Maker
├── exit-ticket/          # Exit Ticket
├── countdown-overlay/    # Countdown Overlay
├── noise-meter/          # Noise Meter
├── task-checklist/       # Task Checklist
├── attendance-tracker/   # Attendance Tracker
├── parking-lot/          # Parking Lot
├── learning-objectives/  # Learning Objectives
├── rubric-builder/       # Rubric Builder
├── station-rotation/     # Station Rotation Timer
├── discussion-tracker/   # Discussion Tracker
├── sub-plans/            # Sub Plans Template
├── parent-contact-log/   # Parent Contact Log
└── docs/                 # Shared documentation
```

### Costs

- **Apps Script hosting**: Free
- **Google Cloud Project**: Free (no billable APIs)
- **Marketplace registration**: $5 one-time (covers all apps)

## Tech Stack

- **Google Apps Script** (JavaScript)
- **Google Slides API** (presentation add-ons)
- **Google Sheets API** (spreadsheet add-ons)
- **Google Docs API** (document add-ons)

## Contributing

These tools are open source! Contributions welcome.

## License

MIT License - See LICENSE file for details

## Author

Built with love for teachers everywhere by Rob Wolfe
