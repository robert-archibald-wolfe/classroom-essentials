/**
 * Random Student Picker - Google Sheets Add-on
 *
 * Fairly pick students with participation tracking.
 * Ensures everyone gets called before repeating.
 */

/**
 * Runs when add-on is installed
 */
function onInstall(e) {
  onOpen(e);
}

/**
 * Runs when spreadsheet is opened
 * Creates custom menu in Extensions
 */
function onOpen(e) {
  SpreadsheetApp.getUi()
    .createAddonMenu()
    .addItem('Open Student Picker', 'showPickerSidebar')
    .addItem('Reset Participation', 'resetParticipation')
    .addItem('About', 'showAbout')
    .addToUi();
}

/**
 * Opens the student picker sidebar
 */
function showPickerSidebar() {
  const html = HtmlService.createHtmlOutputFromFile('Sidebar')
    .setTitle('Student Picker')
    .setWidth(320);

  SpreadsheetApp.getUi().showSidebar(html);
}

/**
 * Shows information about the add-on
 */
function showAbout() {
  const ui = SpreadsheetApp.getUi();

  const message = 'Random Student Picker v1.0\n\n' +
    'Fairly pick students for participation.\n\n' +
    'Features:\n' +
    '• Random selection from roster\n' +
    '• Participation tracking\n' +
    '• No repeats until everyone is called\n' +
    '• Visual spinner animation\n' +
    '• History of picks\n\n' +
    'Built with love for teachers\n\n' +
    'Part of Classroom Essentials suite';

  ui.alert('About Student Picker', message, ui.ButtonSet.OK);
}

// ===================
// Roster Functions
// ===================

/**
 * Gets column headers from row 1 of active sheet
 * @return {string[]} Array of header names
 */
function getColumnHeaders() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastCol = sheet.getLastColumn();

  if (lastCol === 0) {
    return [];
  }

  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  return headers.filter(h => h !== '').map(h => String(h));
}

/**
 * Gets student names from a specific column
 * @param {string} columnHeader - The header name of the column to read
 * @return {Object[]} Array of student objects with id and name
 */
function getStudentsFromColumn(columnHeader) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastCol = sheet.getLastColumn();
  const lastRow = sheet.getLastRow();

  if (lastCol === 0 || lastRow <= 1) {
    return [];
  }

  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  const colIndex = headers.findIndex(h => String(h) === columnHeader);

  if (colIndex === -1) {
    return [];
  }

  const data = sheet.getRange(2, colIndex + 1, lastRow - 1, 1).getValues();
  const students = [];

  data.forEach((row, index) => {
    const name = String(row[0]).trim();
    if (name !== '') {
      students.push({
        id: 's' + index,
        name: name
      });
    }
  });

  return students;
}

// ===================
// Participation Tracking
// ===================

/**
 * Gets participation data for current sheet
 * @return {Object} Participation state
 */
function getParticipation() {
  const props = PropertiesService.getDocumentProperties();
  const sheetId = SpreadsheetApp.getActiveSheet().getSheetId();
  const key = 'participation_' + sheetId;
  const data = props.getProperty(key);

  if (!data) {
    return {
      called: [],
      history: []
    };
  }

  return JSON.parse(data);
}

/**
 * Saves participation data
 * @param {Object} participation - Participation state
 */
function saveParticipation(participation) {
  const props = PropertiesService.getDocumentProperties();
  const sheetId = SpreadsheetApp.getActiveSheet().getSheetId();
  const key = 'participation_' + sheetId;
  props.setProperty(key, JSON.stringify(participation));
}

/**
 * Marks a student as called
 * @param {string} studentId - The student ID
 * @param {string} studentName - The student name
 */
function markStudentCalled(studentId, studentName) {
  const participation = getParticipation();

  if (!participation.called.includes(studentId)) {
    participation.called.push(studentId);
  }

  participation.history.unshift({
    id: studentId,
    name: studentName,
    time: new Date().toISOString()
  });

  // Keep only last 50 history items
  if (participation.history.length > 50) {
    participation.history = participation.history.slice(0, 50);
  }

  saveParticipation(participation);
  return participation;
}

/**
 * Resets participation tracking
 */
function resetParticipation() {
  const props = PropertiesService.getDocumentProperties();
  const sheetId = SpreadsheetApp.getActiveSheet().getSheetId();
  const key = 'participation_' + sheetId;

  props.setProperty(key, JSON.stringify({
    called: [],
    history: []
  }));

  SpreadsheetApp.getUi().alert('Participation Reset', 'All students are now available to be picked again.', SpreadsheetApp.getUi().ButtonSet.OK);
}

/**
 * Gets participation data for frontend
 * @return {Object} Participation state with counts
 */
function getParticipationState() {
  return getParticipation();
}
