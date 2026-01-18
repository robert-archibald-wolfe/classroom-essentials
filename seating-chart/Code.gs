/**
 * Seating Chart Generator - Google Sheets Add-on
 *
 * Create visual seating charts with drag-and-drop,
 * room templates, and save/load functionality.
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
    .addItem('Open Seating Chart', 'showSeatingChartSidebar')
    .addItem('About', 'showAbout')
    .addToUi();
}

/**
 * Opens the seating chart sidebar
 */
function showSeatingChartSidebar() {
  const html = HtmlService.createHtmlOutputFromFile('Sidebar')
    .setTitle('Seating Chart')
    .setWidth(360);

  SpreadsheetApp.getUi().showSidebar(html);
}

/**
 * Shows information about the add-on
 */
function showAbout() {
  const ui = SpreadsheetApp.getUi();

  const message = 'Seating Chart Generator v1.0\n\n' +
    'Create visual seating charts for your classroom.\n\n' +
    'Features:\n' +
    '• Room templates (rows, groups, U-shape, circle)\n' +
    '• Drag-and-drop student placement\n' +
    '• Randomize seating\n' +
    '• Save and load configurations\n' +
    '• Export to sheet\n\n' +
    'Built with love for teachers\n\n' +
    'Part of Classroom Essentials suite';

  ui.alert('About Seating Chart', message, ui.ButtonSet.OK);
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
// Configuration Storage
// ===================

/**
 * Saves a seating configuration
 * @param {string} name - Configuration name
 * @param {Object} config - Configuration data
 */
function saveConfiguration(name, config) {
  const props = PropertiesService.getDocumentProperties();
  const configs = JSON.parse(props.getProperty('seatingConfigs') || '{}');

  configs[name] = {
    ...config,
    lastModified: new Date().toISOString()
  };

  props.setProperty('seatingConfigs', JSON.stringify(configs));
  return { success: true };
}

/**
 * Loads a seating configuration
 * @param {string} name - Configuration name
 * @return {Object|null} Configuration data or null if not found
 */
function loadConfiguration(name) {
  const props = PropertiesService.getDocumentProperties();
  const configs = JSON.parse(props.getProperty('seatingConfigs') || '{}');
  return configs[name] || null;
}

/**
 * Lists all saved configurations
 * @return {Object[]} Array of config metadata
 */
function listConfigurations() {
  const props = PropertiesService.getDocumentProperties();
  const configs = JSON.parse(props.getProperty('seatingConfigs') || '{}');

  return Object.keys(configs).map(name => ({
    name: name,
    lastModified: configs[name].lastModified
  }));
}

/**
 * Deletes a configuration
 * @param {string} name - Configuration name to delete
 */
function deleteConfiguration(name) {
  const props = PropertiesService.getDocumentProperties();
  const configs = JSON.parse(props.getProperty('seatingConfigs') || '{}');

  delete configs[name];
  props.setProperty('seatingConfigs', JSON.stringify(configs));
  return { success: true };
}

// ===================
// Export Functions
// ===================

/**
 * Exports seating chart to a new sheet
 * @param {string} configName - Name for the new sheet
 * @param {Object} data - Seating data with students, seats, and assignments
 * @return {string} Name of created sheet
 */
function exportToSheet(configName, data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Create unique sheet name
  let sheetName = configName + ' - Seating';
  let counter = 1;
  while (ss.getSheetByName(sheetName)) {
    sheetName = configName + ' - Seating (' + counter + ')';
    counter++;
  }

  const newSheet = ss.insertSheet(sheetName);

  // Title
  newSheet.getRange(1, 1).setValue('Seating Chart: ' + configName);
  newSheet.getRange(1, 1).setFontWeight('bold').setFontSize(14);

  // Find grid dimensions
  let maxRow = 0;
  let maxCol = 0;
  data.seats.forEach(seat => {
    if (seat.row !== undefined) maxRow = Math.max(maxRow, seat.row);
    if (seat.col !== undefined) maxCol = Math.max(maxCol, seat.col);
  });

  // Build seat lookup
  const seatMap = {};
  data.seats.forEach(seat => {
    if (seat.row !== undefined && seat.col !== undefined) {
      seatMap[seat.row + '-' + seat.col] = seat.id;
    }
  });

  // Build assignment lookup (seatId -> studentName)
  const assignmentMap = {};
  Object.keys(data.assignments || {}).forEach(studentId => {
    const seatId = data.assignments[studentId];
    if (seatId) {
      const student = data.students.find(s => s.id === studentId);
      if (student) {
        assignmentMap[seatId] = student.name;
      }
    }
  });

  // Write grid
  for (let r = 0; r <= maxRow; r++) {
    for (let c = 0; c <= maxCol; c++) {
      const seatId = seatMap[r + '-' + c];
      const studentName = seatId ? (assignmentMap[seatId] || '[Empty]') : '';
      if (studentName) {
        const cell = newSheet.getRange(r + 3, c + 1);
        cell.setValue(studentName);
        if (studentName !== '[Empty]') {
          cell.setBackground('#e8f0fe');
        }
      }
    }
  }

  // Auto-resize columns
  for (let c = 1; c <= maxCol + 1; c++) {
    newSheet.autoResizeColumn(c);
  }

  return sheetName;
}
