const SPREADSHEET_ID = '1HPKzvpi2_2nzpn1aRRF2mz_tvHs3SAgvI2846Xs4_vk';
const SHEET_NAME = 'Booking Inquiries';
const HEADERS = [
  'Submitted At',
  'Guest Name',
  'Email',
  'Phone',
  'Guests',
  'Residence',
  'Check In',
  'Check Out',
  'Nights',
  'Additions',
  'Estimate (USD)'
];

function doPost(e) {
  const data = e && e.parameter;

  if (!data) {
    throw new Error('Missing form submission.');
  }

  if (data.website) {
    return ContentService.createTextOutput('ok');
  }

  const required = [
    'guestName',
    'guestEmail',
    'guestPhone',
    'guestCount',
    'residence',
    'checkIn',
    'checkOut',
    'nights',
    'estimate'
  ];

  required.forEach(key => {
    if (!String(data[key] || '').trim()) {
      throw new Error('Missing required field: ' + key);
    }
  });

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.guestEmail)) {
    throw new Error('Invalid email address.');
  }

  const guests = Number(data.guestCount);
  const nightCount = Number(data.nights);
  const estimate = Number(data.estimate);

  if (!Number.isInteger(guests) || guests < 1 || guests > 20) {
    throw new Error('Guest count must be between 1 and 20.');
  }

  if (!Number.isInteger(nightCount) || nightCount < 1) {
    throw new Error('Stay must be at least one night.');
  }

  if (!Number.isFinite(estimate) || estimate < 0) {
    throw new Error('Invalid estimate.');
  }

  const checkIn = parseDate(data.checkIn);
  const checkOut = parseDate(data.checkOut);
  const dateNights = (
    Date.UTC(
      checkOut.getFullYear(),
      checkOut.getMonth(),
      checkOut.getDate()
    ) -
    Date.UTC(
      checkIn.getFullYear(),
      checkIn.getMonth(),
      checkIn.getDate()
    )
  ) / 86400000;

  if (dateNights !== nightCount) {
    throw new Error('Nights must match the submitted dates.');
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
    }

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
    } else {
      const existingHeaders = sheet
        .getRange(1, 1, 1, HEADERS.length)
        .getDisplayValues()[0];

      if (HEADERS.some((header, index) => existingHeaders[index] !== header)) {
        throw new Error(
          'The Booking Inquiries tab has unexpected headers. No row was added.'
        );
      }
    }

    sheet.appendRow([
      new Date(),
      safeCell(data.guestName),
      safeCell(data.guestEmail),
      safeCell(data.guestPhone),
      guests,
      safeCell(data.residence),
      checkIn,
      checkOut,
      nightCount,
      safeCell(data.additions || ''),
      estimate
    ]);
  } finally {
    lock.releaseLock();
  }

  return ContentService.createTextOutput('ok');
}

function parseDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error('Invalid date.');
  }

  const parts = value.split('-').map(Number);
  const date = new Date(parts[0], parts[1] - 1, parts[2]);

  if (
    date.getFullYear() !== parts[0] ||
    date.getMonth() !== parts[1] - 1 ||
    date.getDate() !== parts[2]
  ) {
    throw new Error('Invalid date.');
  }

  return date;
}

function safeCell(value) {
  const text = String(value);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}
