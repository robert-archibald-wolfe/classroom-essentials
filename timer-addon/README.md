# Classroom Timer - Google Slides Add-on

A simple, elegant countdown timer that embeds directly into Google Slides presentations.

## Features

- **Preset Times**: Quick buttons for 5, 10, 15 minutes
- **Custom Time**: Set any duration in minutes and seconds
- **Visual Feedback**: Large countdown display with progress ring
- **Sound Alerts**: Optional sound when time expires
- **Pause/Resume**: Full control over timer
- **Clean Design**: Minimal, distraction-free interface

## How It Works

1. Open a Google Slides presentation
2. Click **Add-ons → Classroom Timer → Start Timer**
3. Choose a preset time or enter custom duration
4. Timer appears in sidebar - present your slides while timer runs
5. Optional: Share your screen with timer visible

## Installation

### From Google Workspace Marketplace (Coming Soon)
1. Visit the [Workspace Marketplace](https://workspace.google.com/marketplace)
2. Search for "Classroom Timer"
3. Click **Install**

### Manual Installation (Developers)
1. Open a Google Slides presentation
2. Go to **Extensions → Apps Script**
3. Copy the contents of `Code.gs` and `Sidebar.html` into the editor
4. Save and reload your presentation

## Usage Tips

**During Presentations:**
- Keep timer sidebar open while presenting
- Students can see the countdown on your shared screen
- Pause for questions, resume when continuing

**Activity Management:**
- Start timer before giving instructions
- Use visual progress ring for quick time checks
- Sound alert signals transition to next activity

**Best Practices:**
- Test timer before class starts
- Add 30 seconds buffer for transitions
- Use 5-minute timer for quick activities
- Use 15-minute timer for longer work sessions

## Technical Details

**Files:**

- `Code.gs` - Apps Script backend (timer logic, menu creation)
- `Sidebar.html` - HTML/CSS/JS frontend (UI and timer display)
- `appsscript.json` - Manifest (permissions and metadata)

**OAuth Scope:**

- `https://www.googleapis.com/auth/presentations` — Required to display sidebar in Slides

**Cloud Project:**

This add-on has its own Google Cloud project (`classroom-timer`) separate from other Classroom Essentials add-ons. This ensures users only grant the permissions this specific tool needs.

**Technologies:**

- Google Apps Script (JavaScript)
- HTML5/CSS3
- Web Audio API (for alerts)

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
clasp create --type slides --title "Classroom Timer"

# Push code
clasp push

# Open in browser
clasp open
```

### Testing
1. Open any Google Slides presentation
2. Reload to see **Classroom Timer** in Add-ons menu
3. Test all presets and custom times
4. Verify sound alert works
5. Test pause/resume functionality

## Roadmap

- [ ] v1.0: Basic timer with presets
- [ ] v1.1: Persist timer state across page reloads
- [ ] v1.2: Multiple timer templates (Pomodoro, breaks, etc.)
- [ ] v1.3: Visual themes (colors, styles)
- [ ] v2.0: Full-screen timer mode

## Support

Found a bug? Have a feature request?

- **Issues**: [GitHub Issues](https://github.com/yourusername/classroom-essentials/issues)
- **Email**: support@classroomessentials.com

## License

MIT License - Free to use, modify, and distribute
