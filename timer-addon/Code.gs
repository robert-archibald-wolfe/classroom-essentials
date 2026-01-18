/**
 * Classroom Timer - Google Slides Add-on
 *
 * A simple countdown timer for classroom activities.
 * Displays in sidebar while presenting slides.
 */

/**
 * Runs when add-on is installed
 */
function onInstall(e) {
  onOpen(e);
}

/**
 * Runs when presentation is opened
 * Creates custom menu in Add-ons
 */
function onOpen(e) {
  SlidesApp.getUi()
    .createAddonMenu()
    .addItem('Start Timer', 'showTimerSidebar')
    .addItem('About', 'showAbout')
    .addToUi();
}

/**
 * Opens the timer sidebar
 */
function showTimerSidebar() {
  const html = HtmlService.createHtmlOutputFromFile('Sidebar')
    .setTitle('Classroom Timer')
    .setWidth(300);

  SlidesApp.getUi().showSidebar(html);
}

/**
 * Shows information about the add-on
 */
function showAbout() {
  const ui = SlidesApp.getUi();

  const message = 'Classroom Timer v1.0\n\n' +
    'A simple countdown timer for classroom activities.\n\n' +
    'Features:\n' +
    '• Preset times (5, 10, 15 minutes)\n' +
    '• Custom durations\n' +
    '• Visual progress indicator\n' +
    '• Sound alerts\n' +
    '• Pause/resume functionality\n\n' +
    'Built with ❤️ for teachers\n\n' +
    'Part of Classroom Essentials suite';

  ui.alert('About Classroom Timer', message, ui.ButtonSet.OK);
}

/**
 * Logs timer usage for analytics (optional)
 * Only tracks duration, no personal data
 */
function logTimerUsage(durationMinutes) {
  try {
    // Optional: Send anonymous usage data
    // For now, just log to Apps Script logs
    console.log('Timer started: ' + durationMinutes + ' minutes');
  } catch (e) {
    // Fail silently - analytics shouldn't break functionality
    console.error('Analytics error: ' + e.message);
  }
}
