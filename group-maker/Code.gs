/**
 * Group Maker - Google Sheets Add-on
 *
 * Generate balanced random groups in seconds.
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
    .addItem('Open Group Maker', 'showGroupsSidebar')
    .addItem('About', 'showAbout')
    .addToUi();
}

/**
 * Opens the group maker sidebar
 */
function showGroupsSidebar() {
  const html = HtmlService.createHtmlOutputFromFile('Sidebar')
    .setTitle('Group Maker')
    .setWidth(340);

  SpreadsheetApp.getUi().showSidebar(html);
}

/**
 * Shows information about the add-on
 */
function showAbout() {
  const ui = SpreadsheetApp.getUi();

  const message = 'Group Maker v1.0\n\n' +
    'Generate balanced random groups in seconds.\n\n' +
    'Features:\n' +
    '• Create groups by size or count\n' +
    '• Shuffle and regenerate\n' +
    '• Export groups to sheet\n' +
    '• Save group configurations\n\n' +
    'Built with love for teachers\n\n' +
    'Part of Classroom Essentials suite';

  ui.alert('About Group Maker', message, ui.ButtonSet.OK);
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
// Group Storage
// ===================

/**
 * Saves a group configuration
 * @param {string} name - Configuration name
 * @param {Object} config - Configuration data
 */
function saveGroupConfiguration(name, config) {
  const props = PropertiesService.getDocumentProperties();
  const configs = JSON.parse(props.getProperty('groupConfigs') || '{}');

  configs[name] = {
    ...config,
    lastModified: new Date().toISOString()
  };

  props.setProperty('groupConfigs', JSON.stringify(configs));
  return { success: true };
}

/**
 * Loads a group configuration
 * @param {string} name - Configuration name
 * @return {Object|null} Configuration data or null if not found
 */
function loadGroupConfiguration(name) {
  const props = PropertiesService.getDocumentProperties();
  const configs = JSON.parse(props.getProperty('groupConfigs') || '{}');
  return configs[name] || null;
}

/**
 * Lists all saved configurations
 * @return {Object[]} Array of config metadata
 */
function listGroupConfigurations() {
  const props = PropertiesService.getDocumentProperties();
  const configs = JSON.parse(props.getProperty('groupConfigs') || '{}');

  return Object.keys(configs).map(name => ({
    name: name,
    lastModified: configs[name].lastModified
  }));
}

/**
 * Deletes a configuration
 * @param {string} name - Configuration name to delete
 */
function deleteGroupConfiguration(name) {
  const props = PropertiesService.getDocumentProperties();
  const configs = JSON.parse(props.getProperty('groupConfigs') || '{}');

  delete configs[name];
  props.setProperty('groupConfigs', JSON.stringify(configs));
  return { success: true };
}

// ===================
// Export Functions
// ===================

/**
 * Exports groups to a new sheet
 * @param {string} configName - Name for the new sheet
 * @param {Object[][]} groups - Array of groups, each containing student objects
 * @return {string} Name of created sheet
 */
function exportGroupsToSheet(configName, groups) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Create unique sheet name
  let sheetName = configName + ' - Groups';
  let counter = 1;
  while (ss.getSheetByName(sheetName)) {
    sheetName = configName + ' - Groups (' + counter + ')';
    counter++;
  }

  const newSheet = ss.insertSheet(sheetName);

  // Title
  newSheet.getRange(1, 1).setValue('Groups: ' + configName);
  newSheet.getRange(1, 1).setFontWeight('bold').setFontSize(14);

  // Find max group size
  const maxSize = Math.max(...groups.map(g => g.length));

  // Headers
  groups.forEach((group, i) => {
    const cell = newSheet.getRange(3, i + 1);
    cell.setValue('Group ' + (i + 1));
    cell.setFontWeight('bold');
    cell.setBackground('#e8f0fe');
  });

  // Group members
  groups.forEach((group, groupIndex) => {
    group.forEach((student, memberIndex) => {
      newSheet.getRange(4 + memberIndex, groupIndex + 1).setValue(student.name);
    });
  });

  // Auto-resize columns
  for (let c = 1; c <= groups.length; c++) {
    newSheet.autoResizeColumn(c);
  }

  return sheetName;
}
