import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeft,
  Lock,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  KeyRound,
  Copy,
  Check
} from 'lucide-react';
import {
  getVenuePortalCreds,
  updateVenuePortalPasscode,
  getVenueBookings,
  updateVenueBookingStatus,
  getVenueScheduleOverride,
  saveVenueScheduleOverride,
  DEFAULT_VENUE_PASSCODE
} from '../utils/venuePortalStore';

const WEEKDAYS = [
  { key: 1, label: '週一' },
  { key: 2, label: '週二' },
  { key: 3, label: '週三' },
  { key: 4, label: '週四' },
  { key: 5, label: '週五' },
  { key: 6, label: '週六' },
  { key: 7, label: '週日' }
];

const HOURS = Array.from({ length: 16 }, (_, i) => 8 + i);

export default function VenuePortalPage({ venueId, gyms = [], onNavigateHome }) {
  // 從現有場館與審核後台資料尋找此場館
  const venue = useMemo(() => {
    const fromGyms = gyms.find((g) => g.id === venueId);
    if (fromGyms) return fromGyms;
    try {
      const apps = JSON.parse(localStorage.getItem('gymspot_admin_applications_v1') || '[]');
      const found = apps.find((a) => a.id === venueId);
      if (found) return found;
    } catch {}
    return {
      id: venueId,
      name: `合作場館 (${venueId})`,
      address: '',
      availableSchedule: null
    };
  }, [venueId, gyms]);

  const [creds, setCreds] = useState(() => getVenuePortalCreds(venueId));
  const [isAuthed, setIsAuthed] = useState(() => {
    return sessionStorage.getItem(`gymspot_venue_authed_${venueId}`) === 'true';
  });
  const [passInput, setPassInput] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'schedule' | 'settings'
  const [bookings, setBookings] = useState(() => getVenueBookings(venueId));

  // 時段與休假設定
  const [scheduleOverride, setScheduleOverride] = useState(() => {
    const ov = getVenueScheduleOverride(venueId);
    if (!ov.weeklySchedule) {
      const base = {};
      if (venue.availableSchedule && Object.keys(venue.availableSchedule).length > 0) {
        Object.assign(base, venue.availableSchedule);
      } else {
        WEEKDAYS.forEach((d) => HOURS.forEach((h) => { base[`${d.key}-${h}`] = true; }));
      }
      return { ...ov, weeklySchedule: base };
    }
    return ov;
  });

  // 特定日期休假 / 單時段劃除輸入
  const [holidayDateInput, setHolidayDateInput] = useState(() => {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  });
  const [blockSlotDate, setBlockSlotDate] = useState(() => {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  });
  const [blockSlotHour, setBlockSlotHour] = useState(14);

  // 密碼修改
  const [newPasscode, setNewPasscode] = useState('');
  const [passSavedMsg, setPassSavedMsg] = useState('');
  const [copiedUrl, setCopiedUrl] = useState(false);

  useEffect(() => {
    const refreshBookings = () => setBookings(getVenueBookings(venueId));
    window.addEventListener('gymspot_venue_bookings_updated', refreshBookings);
    return () => window.removeEventListener('gymspot_venue_bookings_updated', refreshBookings);
  }, [venueId]);

  const handleLogin = (e) => {
    e.preventDefault();
    const latest = getVenuePortalCreds(venueId);
    const expected = latest.passcode || DEFAULT_VENUE_PASSCODE;
    if (passInput.trim() === expected) {
      setIsAuthed(true);
      setAuthError('');
      sessionStorage.setItem(`gymspot_venue_authed_${venueId}`, 'true');
    } else {
      setAuthError('密碼錯誤，請重新輸入');
    }
  };

  const handleBookingAction = (bookingId, nextStatus) => {
    updateVenueBookingStatus(bookingId, nextStatus);
    setBookings(getVenueBookings(venueId));
  };

  const persistOverride = (nextOv) => {
    setScheduleOverride(nextOv);
    saveVenueScheduleOverride(venueId, nextOv);
  };

  const toggleWeeklySlot = (dayKey, hour) => {
    const key = `${dayKey}-${hour}`;
    const nextWeekly = {
      ...(scheduleOverride.weeklySchedule || {}),
      [key]: !scheduleOverride.weeklySchedule?.[key]
    };
    persistOverride({ ...scheduleOverride, weeklySchedule: nextWeekly });
  };

  const handleAddClosedDate = () => {
    if (!holidayDateInput) return;
    const list = scheduleOverride.closedDates || [];
    if (list.includes(holidayDateInput)) return;
    persistOverride({
      ...scheduleOverride,
      closedDates: [...list, holidayDateInput].sort()
    });
  };

  const handleRemoveClosedDate = (dateStr) => {
    persistOverride({
      ...scheduleOverride,
      closedDates: (scheduleOverride.closedDates || []).filter((d) => d !== dateStr)
    });
  };

  const handleAddClosedSlot = () => {
    if (!blockSlotDate) return;
    const key = `${blockSlotDate}-${blockSlotHour}`;
    const list = scheduleOverride.closedSlots || [];
    if (list.includes(key)) return;
    persistOverride({
      ...scheduleOverride,
      closedSlots: [...list, key].sort()
    });
  };

  const handleRemoveClosedSlot = (key) => {
    persistOverride({
      ...scheduleOverride,
      closedSlots: (scheduleOverride.closedSlots || []).filter((k) => k !== key)
    });
  };

  const handleSavePasscode = (e) => {
    e.preventDefault();
    if (!newPasscode.trim() || newPasscode.trim().length < 4) {
      alert('新密碼請至少輸入 4 個字元');
      return;
    }
    const updated = updateVenuePortalPasscode(venueId, newPasscode.trim());
    setCreds(updated);
    setNewPasscode('');
    setPassSavedMsg('密碼已更新並同步至平台後台');
    setTimeout(() => setPassSavedMsg(''), 3000);
  };

  const portalFullUrl = `${typeof window !== 'undefined' ? window.location.origin : 'https://www.gymspot.space'}/venue/${venueId}`;

  if (!isAuthed) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#070a10',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '400px',
          background: '#111622',
          border: '1px solid #1f2937',
          borderRadius: '12px',
          padding: '28px 24px',
          color: '#f8fafc'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Lock size={18} color="#94a3b8" />
            <h1 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>合作場館管理後台</h1>
          </div>
          <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '20px' }}>
            {venue.name}
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                場館登入密碼（預設：gymspot12345）
              </label>
              <input
                type="password"
                value={passInput}
                onChange={(e) => setPassInput(e.target.value)}
                placeholder="請輸入密碼"
                autoFocus
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  background: '#090d16',
                  border: '1px solid #263042',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  color: '#fff',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
            {authError && (
              <div style={{ fontSize: '12px', color: '#ef4444' }}>{authError}</div>
            )}
            <button
              type="submit"
              style={{
                background: '#b4ff04',
                color: '#0a1402',
                border: 'none',
                borderRadius: '8px',
                padding: '10px',
                fontSize: '14px',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              登入場館後台
            </button>
            <button
              type="button"
              onClick={onNavigateHome}
              style={{
                background: 'transparent',
                color: '#94a3b8',
                border: '1px solid #263042',
                borderRadius: '8px',
                padding: '9px',
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              返回前台首頁
            </button>
          </form>
        </div>
      </div>
    );
  }

  const pendingCount = bookings.filter((b) => b.status === 'pending').length;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#070a10',
      color: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Top Bar */}
      <header style={{
        background: '#0b0f17',
        borderBottom: '1px solid #1f2937',
        padding: '14px 24px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={onNavigateHome}
              style={{
                background: '#182030',
                border: '1px solid #263042',
                borderRadius: '6px',
                padding: '7px 12px',
                color: '#cbd5e1',
                fontSize: '12.5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <ArrowLeft size={14} /> 前台首頁
            </button>
            <div>
              <h1 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>{venue.name}</h1>
              <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>合作場館專屬管理後台</div>
            </div>
          </div>

          <button
            onClick={() => {
              sessionStorage.removeItem(`gymspot_venue_authed_${venueId}`);
              setIsAuthed(false);
            }}
            style={{
              background: '#182030',
              border: '1px solid #263042',
              borderRadius: '6px',
              padding: '7px 12px',
              color: '#cbd5e1',
              fontSize: '12.5px',
              cursor: 'pointer'
            }}
          >
            登出
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #1f2937', marginBottom: '22px', flexWrap: 'wrap' }}>
          {[
            { key: 'bookings', label: `預約收件匣 (${bookings.length})${pendingCount > 0 ? ` · ${pendingCount} 待確認` : ''}` },
            { key: 'schedule', label: '時段與休假管理' },
            { key: 'settings', label: '帳號與密碼設定' }
          ].map((tab) => {
            const active = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  borderBottom: active ? '2px solid #b4ff04' : '2px solid transparent',
                  color: active ? '#ffffff' : '#94a3b8',
                  padding: '10px 16px',
                  fontSize: '13.5px',
                  fontWeight: active ? 700 : 500,
                  cursor: 'pointer'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: 預約收件匣 */}
        {activeTab === 'bookings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {bookings.length === 0 ? (
              <div style={{
                background: '#111622',
                border: '1px solid #1f2937',
                borderRadius: '10px',
                padding: '48px 20px',
                textAlign: 'center',
                color: '#94a3b8',
                fontSize: '14px'
              }}>
                目前尚無教練發送預約申請。當教練於前台送出預約時，教練完整資料將會顯示於此處。
              </div>
            ) : (
              bookings.map((b) => (
                <div
                  key={b.bookingId}
                  style={{
                    background: '#111622',
                    border: '1px solid #1f2937',
                    borderRadius: '10px',
                    padding: '18px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                      <span style={{ fontSize: '12px', color: '#94a3b8', marginRight: '10px' }}>單號 #{b.bookingId}</span>
                      <strong style={{ fontSize: '16px', color: '#f8fafc' }}>
                        {b.coach?.name || b.coachName || '自由教練'}
                      </strong>
                      <span style={{ fontSize: '12.5px', color: '#94a3b8', marginLeft: '10px' }}>
                        會員編號：{b.coach?.coachId || 'A0001'}
                      </span>
                    </div>

                    <div style={{ fontSize: '12.5px', fontWeight: 700 }}>
                      {b.status === 'pending' && <span style={{ color: '#f59e0b' }}>待場館確認</span>}
                      {b.status === 'approved' && <span style={{ color: '#10b981' }}>已同意預約</span>}
                      {b.status === 'cancelled' && <span style={{ color: '#ef4444' }}>已取消／婉拒</span>}
                    </div>
                  </div>

                  {/* 預約時間與聯絡資訊 */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
                    gap: '10px',
                    background: '#090d16',
                    border: '1px solid #1f2937',
                    borderRadius: '8px',
                    padding: '12px 14px',
                    fontSize: '13px'
                  }}>
                    <div>
                      <span style={{ color: '#64748b' }}>預約日期：</span>
                      <strong style={{ color: '#f8fafc' }}>{b.dateStr} ({b.dayName})</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748b' }}>預約時段：</span>
                      <strong style={{ color: '#b4ff04' }}>{(b.slots || []).join('、')}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748b' }}>聯絡電話：</span>
                      <span style={{ color: '#f8fafc' }}>{b.coach?.phone || '未提供'}</span>
                    </div>
                    <div>
                      <span style={{ color: '#64748b' }}>Gmail：</span>
                      <span style={{ color: '#f8fafc' }}>{b.coach?.email || '未提供'}</span>
                    </div>
                    <div>
                      <span style={{ color: '#64748b' }}>Instagram：</span>
                      <span style={{ color: '#f8fafc' }}>{b.coach?.instagram || '未提供'}</span>
                    </div>
                    <div>
                      <span style={{ color: '#64748b' }}>備註：</span>
                      <span style={{ color: '#cbd5e1' }}>{b.bookingNote || '無'}</span>
                    </div>
                  </div>

                  {/* 教練專業證照清單 */}
                  <div style={{ fontSize: '12.5px', color: '#cbd5e1' }}>
                    <span style={{ color: '#94a3b8', fontWeight: 600 }}>教練填寫之專業證照：</span>
                    {(b.coach?.certifications || []).length > 0
                      ? b.coach.certifications.map((c) => c.name || c).join('、')
                      : '未填寫'}
                  </div>

                  {/* 操作按鈕 */}
                  {b.status === 'pending' && (
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                      <button
                        type="button"
                        onClick={() => handleBookingAction(b.bookingId, 'cancelled')}
                        style={{
                          background: '#182030',
                          border: '1px solid #ef4444',
                          color: '#f87171',
                          borderRadius: '6px',
                          padding: '7px 14px',
                          fontSize: '12.5px',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        取消／婉拒
                      </button>
                      <button
                        type="button"
                        onClick={() => handleBookingAction(b.bookingId, 'approved')}
                        style={{
                          background: '#b4ff04',
                          border: 'none',
                          color: '#0a1402',
                          borderRadius: '6px',
                          padding: '7px 16px',
                          fontSize: '12.5px',
                          fontWeight: 800,
                          cursor: 'pointer'
                        }}
                      >
                        同意預約
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: 時段與休假管理 */}
        {activeTab === 'schedule' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* 1. 特定日期休假（整天休息） */}
            <div style={{
              background: '#111622',
              border: '1px solid #1f2937',
              borderRadius: '10px',
              padding: '18px 20px'
            }}>
              <h2 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 6px' }}>特定日期公休（整天不開放預約）</h2>
              <p style={{ fontSize: '12.5px', color: '#94a3b8', margin: '0 0 14px' }}>
                設定特定假日或公休日後，前台該日期所有時段將自動顯示為不開放。
              </p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '12px' }}>
                <input
                  type="date"
                  value={holidayDateInput}
                  onChange={(e) => setHolidayDateInput(e.target.value)}
                  style={{
                    background: '#090d16',
                    border: '1px solid #263042',
                    borderRadius: '6px',
                    padding: '7px 10px',
                    color: '#fff',
                    fontSize: '13px'
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddClosedDate}
                  style={{
                    background: '#b4ff04',
                    color: '#0a1402',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '8px 14px',
                    fontSize: '12.5px',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  設為公休日
                </button>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {(scheduleOverride.closedDates || []).length === 0 ? (
                  <span style={{ fontSize: '12px', color: '#64748b' }}>目前無設定特定公休日</span>
                ) : (
                  (scheduleOverride.closedDates || []).map((d) => (
                    <span
                      key={d}
                      style={{
                        background: '#182030',
                        border: '1px solid #334155',
                        borderRadius: '6px',
                        padding: '4px 10px',
                        fontSize: '12px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      {d}
                      <button
                        type="button"
                        onClick={() => handleRemoveClosedDate(d)}
                        style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', padding: 0, fontWeight: 800 }}
                      >
                        ✕
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* 2. 單日單時段劃除（場館自用） */}
            <div style={{
              background: '#111622',
              border: '1px solid #1f2937',
              borderRadius: '10px',
              padding: '18px 20px'
            }}>
              <h2 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 6px' }}>特定日期單一時段劃除（場館自用）</h2>
              <p style={{ fontSize: '12.5px', color: '#94a3b8', margin: '0 0 14px' }}>
                若特定日期的某個小時場館確定自己需要使用，可直接於此劃除，前台將同步關閉該時段。
              </p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '12px' }}>
                <input
                  type="date"
                  value={blockSlotDate}
                  onChange={(e) => setBlockSlotDate(e.target.value)}
                  style={{
                    background: '#090d16',
                    border: '1px solid #263042',
                    borderRadius: '6px',
                    padding: '7px 10px',
                    color: '#fff',
                    fontSize: '13px'
                  }}
                />
                <select
                  value={blockSlotHour}
                  onChange={(e) => setBlockSlotHour(Number(e.target.value))}
                  style={{
                    background: '#090d16',
                    border: '1px solid #263042',
                    borderRadius: '6px',
                    padding: '7px 10px',
                    color: '#fff',
                    fontSize: '13px'
                  }}
                >
                  {HOURS.map((h) => (
                    <option key={h} value={h}>
                      {String(h).padStart(2, '0')}:00 - {String(h + 1).padStart(2, '0')}:00
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={handleAddClosedSlot}
                  style={{
                    background: '#182030',
                    color: '#f8fafc',
                    border: '1px solid #334155',
                    borderRadius: '6px',
                    padding: '8px 14px',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  劃除此時段
                </button>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {(scheduleOverride.closedSlots || []).length === 0 ? (
                  <span style={{ fontSize: '12px', color: '#64748b' }}>目前無劃除之特定時段</span>
                ) : (
                  (scheduleOverride.closedSlots || []).map((k) => {
                    const parts = k.split('-');
                    const hr = parts.pop();
                    const datePart = parts.join('-');
                    return (
                      <span
                        key={k}
                        style={{
                          background: '#182030',
                          border: '1px solid #334155',
                          borderRadius: '6px',
                          padding: '4px 10px',
                          fontSize: '12px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        {datePart} {String(hr).padStart(2, '0')}:00
                        <button
                          type="button"
                          onClick={() => handleRemoveClosedSlot(k)}
                          style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', padding: 0, fontWeight: 800 }}
                        >
                          ✕
                        </button>
                      </span>
                    );
                  })
                )}
              </div>
            </div>

            {/* 3. 每週常態開放時段表 */}
            <div style={{
              background: '#111622',
              border: '1px solid #1f2937',
              borderRadius: '10px',
              padding: '18px 20px'
            }}>
              <h2 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 6px' }}>每週常態開放時段表（點擊直接關閉或開啟）</h2>
              <p style={{ fontSize: '12.5px', color: '#94a3b8', margin: '0 0 14px' }}>
                變更後將即時同步至前台預約時段表。
              </p>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'center', minWidth: '560px' }}>
                  <thead>
                    <tr>
                      <th style={{ padding: '8px', color: '#94a3b8', borderBottom: '1px solid #1f2937' }}>時段</th>
                      {WEEKDAYS.map((d) => (
                        <th key={d.key} style={{ padding: '8px', color: '#f8fafc', borderBottom: '1px solid #1f2937' }}>{d.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {HOURS.map((hr) => (
                      <tr key={hr}>
                        <td style={{ padding: '6px', color: '#94a3b8', borderBottom: '1px solid #151c28', fontWeight: 600 }}>
                          {String(hr).padStart(2, '0')}:00
                        </td>
                        {WEEKDAYS.map((d) => {
                          const isOpen = !!scheduleOverride.weeklySchedule?.[`${d.key}-${hr}`];
                          return (
                            <td key={d.key} style={{ padding: '3px', borderBottom: '1px solid #151c28' }}>
                              <button
                                type="button"
                                onClick={() => toggleWeeklySlot(d.key, hr)}
                                style={{
                                  width: '100%',
                                  padding: '5px 0',
                                  borderRadius: '4px',
                                  border: isOpen ? '1px solid rgba(180, 255, 4, 0.4)' : '1px solid #1f2937',
                                  background: isOpen ? 'rgba(180, 255, 4, 0.12)' : '#090d16',
                                  color: isOpen ? '#b4ff04' : '#475569',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  fontSize: '11.5px'
                                }}
                              >
                                {isOpen ? '開放' : '關閉'}
                              </button>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: 帳號與密碼設定 */}
        {activeTab === 'settings' && (
          <div style={{
            background: '#111622',
            border: '1px solid #1f2937',
            borderRadius: '10px',
            padding: '22px',
            maxWidth: '540px'
          }}>
            <h2 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 14px' }}>專屬管理網址與密碼設定</h2>

            <div style={{ marginBottom: '18px' }}>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>場館專屬後台網址</div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: '#090d16',
                border: '1px solid #263042',
                borderRadius: '6px',
                padding: '8px 12px',
                fontSize: '13px',
                color: '#cbd5e1'
              }}>
                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{portalFullUrl}</span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(portalFullUrl);
                    setCopiedUrl(true);
                    setTimeout(() => setCopiedUrl(false), 2000);
                  }}
                  style={{
                    background: '#182030',
                    border: '1px solid #334155',
                    borderRadius: '4px',
                    color: '#fff',
                    padding: '3px 8px',
                    fontSize: '11.5px',
                    cursor: 'pointer'
                  }}
                >
                  {copiedUrl ? '已複製' : '複製'}
                </button>
              </div>
            </div>

            <form onSubmit={handleSavePasscode} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>
                  目前密碼：<strong style={{ color: '#f8fafc' }}>{creds.passcode}</strong>
                </label>
                <input
                  type="text"
                  value={newPasscode}
                  onChange={(e) => setNewPasscode(e.target.value)}
                  placeholder="輸入新密碼（至少 4 碼）"
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    background: '#090d16',
                    border: '1px solid #263042',
                    borderRadius: '6px',
                    padding: '9px 12px',
                    color: '#fff',
                    fontSize: '13.5px'
                  }}
                />
              </div>
              {passSavedMsg && (
                <div style={{ fontSize: '12.5px', color: '#10b981', fontWeight: 600 }}>{passSavedMsg}</div>
              )}
              <button
                type="submit"
                style={{
                  background: '#b4ff04',
                  color: '#0a1402',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '9px 16px',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  alignSelf: 'flex-start'
                }}
              >
                儲存新密碼
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
