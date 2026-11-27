// 廠商專屬後台資料與排程同步管理工具

const PORTAL_CREDS_KEY = 'gymspot_venue_portal_creds_v1';
const VENUE_BOOKINGS_KEY = 'gymspot_venue_bookings_v1';
const VENUE_SCHEDULE_OVERRIDES_KEY = 'gymspot_venue_schedule_overrides_v1';

export const DEFAULT_VENUE_PASSCODE = 'gymspot12345';

export function getVenuePortalCreds(venueId) {
  try {
    const raw = localStorage.getItem(PORTAL_CREDS_KEY);
    const all = raw ? JSON.parse(raw) : {};
    if (venueId) {
      return all[venueId] || {
        route: `/venue/${venueId}`,
        passcode: DEFAULT_VENUE_PASSCODE,
        updatedAt: null
      };
    }
    return all;
  } catch {
    return venueId ? { route: `/venue/${venueId}`, passcode: DEFAULT_VENUE_PASSCODE, updatedAt: null } : {};
  }
}

export function ensureVenuePortalCreds(venueId) {
  try {
    const raw = localStorage.getItem(PORTAL_CREDS_KEY);
    const all = raw ? JSON.parse(raw) : {};
    if (!all[venueId]) {
      all[venueId] = {
        route: `/venue/${venueId}`,
        passcode: DEFAULT_VENUE_PASSCODE,
        createdAt: new Date().toLocaleString('zh-TW'),
        updatedAt: null
      };
      localStorage.setItem(PORTAL_CREDS_KEY, JSON.stringify(all));
    }
    return all[venueId];
  } catch {
    return { route: `/venue/${venueId}`, passcode: DEFAULT_VENUE_PASSCODE };
  }
}

export function updateVenuePortalPasscode(venueId, newPasscode) {
  try {
    const raw = localStorage.getItem(PORTAL_CREDS_KEY);
    const all = raw ? JSON.parse(raw) : {};
    const current = all[venueId] || { route: `/venue/${venueId}` };
    all[venueId] = {
      ...current,
      route: `/venue/${venueId}`,
      passcode: newPasscode.trim(),
      updatedAt: new Date().toLocaleString('zh-TW')
    };
    localStorage.setItem(PORTAL_CREDS_KEY, JSON.stringify(all));
    return all[venueId];
  } catch {
    return null;
  }
}

export function getVenueBookings(venueId) {
  try {
    const raw = localStorage.getItem(VENUE_BOOKINGS_KEY);
    const all = raw ? JSON.parse(raw) : [];
    if (venueId) {
      return all.filter((b) => b.gymId === venueId);
    }
    return all;
  } catch {
    return [];
  }
}

export function addVenueBooking(bookingRecord) {
  try {
    const raw = localStorage.getItem(VENUE_BOOKINGS_KEY);
    const all = raw ? JSON.parse(raw) : [];
    const next = [bookingRecord, ...all];
    localStorage.setItem(VENUE_BOOKINGS_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event('gymspot_venue_bookings_updated'));
    return bookingRecord;
  } catch {
    return bookingRecord;
  }
}

export function updateVenueBookingStatus(bookingId, status) {
  try {
    const raw = localStorage.getItem(VENUE_BOOKINGS_KEY);
    const all = raw ? JSON.parse(raw) : [];
    const next = all.map((b) =>
      b.bookingId === bookingId
        ? { ...b, status, reviewedAt: new Date().toLocaleString('zh-TW') }
        : b
    );
    localStorage.setItem(VENUE_BOOKINGS_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event('gymspot_venue_bookings_updated'));
    return next;
  } catch {
    return [];
  }
}

export function getVenueScheduleOverride(venueId) {
  try {
    const raw = localStorage.getItem(VENUE_SCHEDULE_OVERRIDES_KEY);
    const all = raw ? JSON.parse(raw) : {};
    return all[venueId] || {
      weeklySchedule: null, // null 代表沿用場館預設，若為 object 則覆寫
      closedDates: [],      // ['2026-11-30', ...]
      closedSlots: []       // ['2026-11-28-15', ...]
    };
  } catch {
    return { weeklySchedule: null, closedDates: [], closedSlots: [] };
  }
}

export function saveVenueScheduleOverride(venueId, overrideData) {
  try {
    const raw = localStorage.getItem(VENUE_SCHEDULE_OVERRIDES_KEY);
    const all = raw ? JSON.parse(raw) : {};
    all[venueId] = overrideData;
    localStorage.setItem(VENUE_SCHEDULE_OVERRIDES_KEY, JSON.stringify(all));
    window.dispatchEvent(new Event('gymspot_venue_schedule_updated'));
    return overrideData;
  } catch {
    return overrideData;
  }
}
