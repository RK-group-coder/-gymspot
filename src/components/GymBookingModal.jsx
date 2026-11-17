import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Phone,
  MessageCircle,
  ShieldCheck,
  Check,
  ArrowRight,
  Info,
  Layers,
  Sparkles,
  FileText,
  ChevronLeft,
  ChevronRight,
  Sun,
  Sunset,
  Moon,
  LayoutGrid,
  SlidersHorizontal,
  Coins,
  Eye
} from 'lucide-react';
import { getStoredCoachCerts } from '../utils/certUtils';

// 每天 8:00 到 24:00，一小時一格，總共 16 格 (做成 4x4 的格子)
const TIME_SLOTS = Array.from({ length: 16 }, (_, i) => {
  const start = 8 + i;
  const end = start + 1;
  const startStr = String(start).padStart(2, '0') + ':00';
  const endStr = String(end).padStart(2, '0') + ':00';
  return {
    hour: start,
    label: `${startStr} - ${endStr}`,
    shortLabel: `${startStr}`
  };
});

// 產生未來 7 天日期 (包含今天起算，至多提前 7 天)
function getNext7Days() {
  const days = [];
  const now = new Date();
  const weekDayNames = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];

  for (let i = 0; i < 7; i++) {
    const targetDate = new Date(now);
    targetDate.setDate(now.getDate() + i);

    const year = targetDate.getFullYear();
    const month = targetDate.getMonth() + 1;
    const date = targetDate.getDate();
    const dayOfWeek = targetDate.getDay(); // 0 is Sunday, 1 is Mon...
    const dayKey = dayOfWeek === 0 ? 7 : dayOfWeek; // 1 to 7

    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    const displayLabel = i === 0 ? '今天' : (i === 1 ? '明天' : (i === 2 ? '後天' : `${month}/${date}`));

    days.push({
      dateStr,
      fullDateStr: `${year}年${month}月${date}日`,
      month,
      date,
      dayKey,
      dayName: weekDayNames[dayOfWeek],
      displayLabel,
      isToday: i === 0
    });
  }
  return days;
}

export default function GymBookingModal({ 
  gym, 
  isOpen, 
  onClose, 
  onBookingSuccess,
  userPoints,
  onDeductPoints,
  onOpenTopUp,
  embedded = false
}) {
  const days = useMemo(() => getNext7Days(), []);
  // 預設選取今天
  const [selectedDateStr, setSelectedDateStr] = useState(days[0]?.dateStr || '');
  const [selectedSlotHours, setSelectedSlotHours] = useState([]); // Array of hours e.g. [14, 15]
  
  // 教練帳戶剩餘點數 (每時段固定 30 點)
  const [localPoints, setLocalPoints] = useState(() => {
    if (userPoints !== undefined && userPoints !== null) return userPoints;
    const saved = localStorage.getItem('gymspot_points');
    return saved !== null ? Number(saved) : 300; // 預設 300 點方便教練體驗
  });
  const currentPoints = userPoints !== undefined && userPoints !== null ? userPoints : localPoints;

  // Coach note (教練基本資料於註冊時即已記錄，課程統一固定為 1 對 1 私人指導)
  const [bookingNote, setBookingNote] = useState('');
  
  // Submit state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingReceipt, setBookingReceipt] = useState(null);
  const [viewingCertModalIndex, setViewingCertModalIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 640);
  const receiptCoachCerts = useMemo(() => getStoredCoachCerts(), [isOpen]);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (!isOpen || !gym) return null;

  const pointsPerSlot = 30; // 每預約 1 時段扣抵 30 點
  const hourlyRate = gym.pricing?.hourlyRate || gym.pricing?.offPeakPerHour || 200;
  
  // 取得場館註冊時勾選的時段表；若無則預設全開
  const schedule = gym.availableSchedule || {};
  const hasCustomSchedule = gym.availableSchedule && Object.keys(gym.availableSchedule).length > 0;

  // 目前選取的日期物件
  const activeDayObj = days.find(d => d.dateStr === selectedDateStr) || days[0];

  // 判斷某日某時段場館是否開放
  const isSlotAvailableAt = (dayKey, hour) => {
    if (!hasCustomSchedule) {
      if (dayKey === 7 && hour === 23) return false; // 週日 23:00 店家常態未開放示範
      return true;
    }
    return !!schedule[`${dayKey}-${hour}`];
  };

  // 判斷是否被其他教練約走 (已滿)
  const isSlotOccupied = (dayKey, hour, dateStr) => {
    if (gym.occupiedSchedule) return !!gym.occupiedSchedule[`${dayKey}-${hour}`];
    if (gym.bookedSlots) return gym.bookedSlots.includes(`${dateStr}-${hour}`);
    // 示範熱門時段已滿 (週三 19:00、週四 18:00、週五 20:00、週六 15:00)
    return (dayKey === 3 && hour === 19) || (dayKey === 4 && hour === 18) || (dayKey === 5 && hour === 20) || (dayKey === 6 && hour === 15);
  };

  // 判斷店家是否因應現場情況手動暫時關閉 (暫時關閉)
  const isSlotTempClosed = (dayKey, hour, dateStr) => {
    if (gym.tempClosedSchedule) return !!gym.tempClosedSchedule[`${dayKey}-${hour}`];
    if (gym.tempClosedSlots) return gym.tempClosedSlots.includes(`${dateStr}-${hour}`);
    // 示範店家手動暫時關閉 (週三 13:00、週四 14:00、週五 14:00)
    return (dayKey === 3 && hour === 13) || (dayKey === 4 && hour === 14) || (dayKey === 5 && hour === 14);
  };

  // 檢查是否太近 (提前 2 小時限制：若為當天，時段需至少距離現在 2 小時以上，友善店家準備)
  const isSlotTooSoon = (dateStr, hour) => {
    const isToday = days[0]?.dateStr === dateStr;
    if (!isToday) return false;

    const now = new Date();
    const slotStartTime = new Date();
    slotStartTime.setHours(hour, 0, 0, 0);

    const diffMs = slotStartTime.getTime() - now.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    return diffHours < 2; // 未滿 2 小時完整準備緩衝
  };

  // 判斷某時段是否被教練選中 (針對目前選取日期)
  const isSlotSelected = (hour) => {
    return selectedSlotHours.includes(hour);
  };

  // 取得時段狀態 (已預約-深綠色、可預約、未開放-灰底、已滿-灰底、暫時關閉-灰底、須提前兩小時預約-灰底無鬧鐘)
  const getSlotState = (slot, dayKey, dateStr) => {
    const hour = slot.hour;
    const isSelected = selectedSlotHours.includes(hour);

    // 1. 被自己選擇 (深綠色)
    if (isSelected) {
      return {
        type: 'booked_by_me',
        label: '✔ 已選擇',
        canClick: true,
        tooltip: '您已選取此時段 (點擊可移除選取)'
      };
    }

    // 2. 截止限制：當天未滿 2 小時 (灰底，框框字裡寫「須提前兩小時預約」，不放鬧鐘圖案)
    if (isSlotTooSoon(dateStr, hour)) {
      return {
        type: 'too_soon',
        label: '須提前兩小時預約',
        canClick: false,
        tooltip: '友善店家準備：需至少提前 2 小時預約'
      };
    }

    // 3. 店家因應情況手動暫時關閉 (設備保養或場地調配，灰底)
    if (isSlotTempClosed(dayKey, hour, dateStr)) {
      return {
        type: 'temp_closed',
        label: '暫時關閉',
        canClick: false,
        tooltip: '店家因應情況手動暫時關閉此時段（設備維護或場地調配）'
      };
    }

    // 4. 被其他教練約走 (已滿，灰底)
    if (isSlotOccupied(dayKey, hour, dateStr)) {
      return {
        type: 'occupied',
        label: '已滿',
        canClick: false,
        tooltip: '此時段已被其他教練預約（已滿）'
      };
    }

    // 5. 店家常態未開放 (灰底)
    if (!isSlotAvailableAt(dayKey, hour)) {
      return {
        type: 'not_open',
        label: '未開放',
        canClick: false,
        tooltip: '店家此時段未開放營業'
      };
    }

    // 6. 額度不足檢查：若未選此時段，且目前剩餘可用額度小於 1 次 (無法再選)
    const remainingUsablePoints = currentPoints - (selectedSlotHours.length * pointsPerSlot);
    if (remainingUsablePoints < pointsPerSlot) {
      return {
        type: 'insufficient_points',
        label: '額度不足',
        canClick: true, // 點擊時跳出提醒引導購買方案，不加入選取
        tooltip: `可用預約次數不足以選取此時段（目前可用 ${Math.max(0, Math.floor(remainingUsablePoints / pointsPerSlot))} 次），點擊可前往購買方案`
      };
    }

    // 7. 可預約 (正常開放預約，每時段扣抵 1 次額度)
    return {
      type: 'available',
      label: '可預約',
      canClick: true,
      tooltip: `點擊預約 ${slot.label} (使用 1 次預約額度)`
    };
  };

  // 切換選取時段
  const toggleSlotSelection = (hour, dayKey, dateStr) => {
    // 1. 如果此時段已被選取，點擊永遠允許取消選取
    if (selectedSlotHours.includes(hour)) {
      setSelectedSlotHours(prev => prev.filter(h => h !== hour));
      return;
    }

    const slotObj = TIME_SLOTS.find(s => s.hour === hour) || { hour };
    const slotState = getSlotState(slotObj, dayKey, dateStr);

    if (!slotState.canClick) {
      if (slotState.type === 'too_soon') {
        alert('為保障店家現場有充裕時間確認人流與準備設備，需至少提前 2 小時預約！');
      } else if (slotState.type === 'occupied') {
        alert('此時段已被其他教練約走（已滿），請選擇其他可預約時段！');
      } else if (slotState.type === 'temp_closed') {
        alert('店家此時段手動暫時關閉（設備保養或場地調配），暫不開放！');
      } else if (slotState.type === 'not_open') {
        alert('店家此時段未開放營業！');
      }
      return;
    }

    // 2. 關鍵限制：在預約額度不夠時 無法繼續選取時段！
    const currentUsedPoints = selectedSlotHours.length * pointsPerSlot;
    const remainingUsablePoints = currentPoints - currentUsedPoints;
    const nextPointsNeeded = (selectedSlotHours.length + 1) * pointsPerSlot;

    if (nextPointsNeeded > currentPoints) {
      alert(
        `【可用預約次數不足，無法繼續選取時段】\n\n` +
        `• 您的帳戶總可用額度：${Math.floor(currentPoints / pointsPerSlot)} 次\n` +
        `• 目前已選取：${selectedSlotHours.length} 小時（使用 ${selectedSlotHours.length} 次額度）\n` +
        `• 剩餘可用額度：${Math.max(0, Math.floor(remainingUsablePoints / pointsPerSlot))} 次\n\n` +
        `在預約額度不夠時無法繼續選取時段！請先購買媒合方案或取消其他已選時段。`
      );
      if (onOpenTopUp) {
        onOpenTopUp();
      }
      return;
    }

    // 額度足夠，加入選取
    setSelectedSlotHours(prev => [...prev, hour].sort((a, b) => a - b));
  };

  // 計算次數與金額
  const totalHours = selectedSlotHours.length;
  const totalPointsNeeded = totalHours * pointsPerSlot;
  const totalPrice = totalHours * hourlyRate;

  // 切換日期時重設選取時段
  const handleSelectDate = (dateStr) => {
    setSelectedDateStr(dateStr);
    setSelectedSlotHours([]);
  };

  // 送出預約
  const handleConfirmBooking = (e) => {
    e?.preventDefault();
    if (totalHours === 0) {
      alert('請至少選擇 1 個可預約時段');
      return;
    }

    if (currentPoints < totalPointsNeeded) {
      alert(`目前帳戶可用預約額度不足！\n您的可用額度：${Math.floor(currentPoints / pointsPerSlot)} 次\n本次預約需使用：${totalHours} 次\n請先購買媒合方案後再進行預約。`);
      if (onOpenTopUp) onOpenTopUp();
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newBalance = Math.max(0, currentPoints - totalPointsNeeded);
      setLocalPoints(newBalance);
      localStorage.setItem('gymspot_points', String(newBalance));
      if (onDeductPoints) onDeductPoints(totalPointsNeeded);

      const receipt = {
        bookingId: `BK-${Date.now().toString().slice(-6)}`,
        gymName: gym.name,
        gymAddress: gym.address,
        gymPhone: gym.phone,
        gymEmail: gym.email,
        gymLineId: gym.lineId,
        dateStr: activeDayObj.fullDateStr,
        dayName: activeDayObj.dayName,
        slots: selectedSlotHours.map(h => `${String(h).padStart(2, '0')}:00 - ${String(h + 1).padStart(2, '0')}:00`),
        totalHours,
        pointsPerSlot,
        totalPoints: totalPointsNeeded,
        remainingPoints: newBalance,
        hourlyRate,
        totalPrice,
        courseType: '1 對 1 私人指導課',
        bookingNote: bookingNote.trim() || '無特殊需求',
        createdAt: new Date().toLocaleString('zh-TW')
      };

      setBookingReceipt(receipt);
      setIsSubmitting(false);
      if (onBookingSuccess) {
        onBookingSuccess(receipt);
      }
    }, 450);
  };

  // 預約成功畫面
  if (bookingReceipt) {
    const lineShareText = encodeURIComponent(
      `【GYMspot 自由教練預約申請】\n` +
      `場館：${bookingReceipt.gymName}\n` +
      `日期：${bookingReceipt.dateStr} (${bookingReceipt.dayName})\n` +
      `時段：${bookingReceipt.slots.join('、')}\n` +
      `課程：${bookingReceipt.courseType}\n` +
      `使用媒合額度：${bookingReceipt.totalHours} 次\n` +
      `📜 教練專業證照：已隨單檢附 ${receiptCoachCerts.length} 張證照證明照片（店家現場可直接查驗核對）\n` +
      `備註：${bookingReceipt.bookingNote}\n` +
      `預約單號：#${bookingReceipt.bookingId}`
    );

    const currentCert = viewingCertModalIndex !== null ? receiptCoachCerts[viewingCertModalIndex] : null;

    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2500,
        background: 'rgba(5, 8, 15, 0.88)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}>
        <div style={{
          background: '#0d131f',
          border: '1px solid #1f2c42',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '540px',
          padding: '28px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.75), 0 0 24px rgba(180, 255, 4, 0.15)',
          animation: 'fadeIn 0.22s ease'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(180, 255, 4, 0.12)',
              border: '2px solid #b4ff04',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px',
              color: '#b4ff04'
            }}>
              <CheckCircle2 size={32} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
              預約申請已成功送出！
            </h3>
            <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '6px' }}>
              預約單號：<span style={{ color: '#b4ff04', fontWeight: 700 }}>#{bookingReceipt.bookingId}</span>
            </div>
          </div>

          {/* Receipt Card */}
          <div style={{
            background: '#070b13',
            border: '1px solid #1a2536',
            borderRadius: '14px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            fontSize: '13px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #141d2c', paddingBottom: '8px' }}>
              <span style={{ color: '#64748b' }}>預約場館</span>
              <strong style={{ color: '#f8fafc' }}>{bookingReceipt.gymName}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #141d2c', paddingBottom: '8px' }}>
              <span style={{ color: '#64748b' }}>預約日期</span>
              <strong style={{ color: '#b4ff04' }}>{bookingReceipt.dateStr} ({bookingReceipt.dayName})</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #141d2c', paddingBottom: '8px' }}>
              <span style={{ color: '#64748b' }}>上課時段</span>
              <div style={{ textAlign: 'right' }}>
                {bookingReceipt.slots.map((s, idx) => (
                  <div key={idx} style={{ color: '#f8fafc', fontWeight: 700 }}>{s}</div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #141d2c', paddingBottom: '8px' }}>
              <span style={{ color: '#64748b' }}>指導模式</span>
              <span style={{ color: '#b4ff04', fontWeight: 700 }}>{bookingReceipt.courseType}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #141d2c', paddingBottom: '8px' }}>
              <span style={{ color: '#64748b' }}>使用預約額度</span>
              <strong style={{ color: '#b4ff04', fontSize: '16px' }}>
                {bookingReceipt.totalHours} 次 <span style={{ fontSize: '11px', color: '#94a3b8' }}>(剩餘：{Math.floor(bookingReceipt.remainingPoints / pointsPerSlot)} 次)</span>
              </strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #141d2c', paddingBottom: '8px' }}>
              <span style={{ color: '#64748b' }}>預約備註</span>
              <span style={{ color: '#cbd5e1' }}>{bookingReceipt.bookingNote}</span>
            </div>
            {/* 隨單檢附之教練證照照片按鈕 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#64748b' }}>教練證照證明</span>
              <button
                type="button"
                onClick={() => setViewingCertModalIndex(0)}
                style={{
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid #10b981',
                  color: '#34d399',
                  borderRadius: '6px',
                  padding: '3px 10px',
                  fontSize: '11.5px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Eye size={13} />
                <span>查看證照照片 ({receiptCoachCerts.length}張)</span>
              </button>
            </div>
          </div>

          {/* Quick Notice */}
          <div style={{
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '10px',
            padding: '10px 14px',
            fontSize: '12px',
            color: '#cbd5e1',
            marginBottom: '20px',
            lineHeight: 1.5
          }}>
            <ShieldCheck size={15} color="#10b981" style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
            <strong style={{ color: '#10b981' }}>店家查核保障：</strong>
            本單已自動檢附教練之專業證照圖檔證明。店家現場如有需要可隨時查驗核對。預約一經送出即確認保留。
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* 查看教練證照照片按鈕 (場館若有疑慮，直接點擊看一眼) */}
            <button
              type="button"
              onClick={() => setViewingCertModalIndex(0)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.22) 0%, rgba(6, 78, 59, 0.45) 100%)',
                border: '1.5px solid #10b981',
                color: '#a7f3d0',
                borderRadius: '12px',
                padding: '11px 16px',
                fontWeight: 800,
                fontSize: '13.5px',
                cursor: 'pointer',
                boxShadow: '0 0 14px rgba(16, 185, 129, 0.25)'
              }}
            >
              <Eye size={17} color="#34d399" />
              <span>[ 查看教練證照照片 ({receiptCoachCerts.length}張證明) ]</span>
            </button>

            {bookingReceipt.gymLineId && (
              <a
                href={`https://line.me/R/ti/p/${encodeURIComponent(bookingReceipt.gymLineId)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: '#06c755',
                  color: '#ffffff',
                  textDecoration: 'none',
                  borderRadius: '12px',
                  padding: '11px 16px',
                  fontWeight: 800,
                  fontSize: '13.5px'
                }}
              >
                <MessageCircle size={17} />
                <span>一鍵傳送 LINE 預約明細 ({bookingReceipt.gymLineId})</span>
              </a>
            )}

            {bookingReceipt.gymEmail && (
              <a
                href={`mailto:${bookingReceipt.gymEmail}?subject=${encodeURIComponent(`【GYMspot預約】${bookingReceipt.dateStr} 教練${bookingReceipt.coachName}場租預約`)}&body=${lineShareText}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: '#1e293b',
                  color: '#f8fafc',
                  border: '1px solid #334155',
                  textDecoration: 'none',
                  borderRadius: '12px',
                  padding: '11px 16px',
                  fontWeight: 700,
                  fontSize: '13.5px'
                }}
              >
                <MessageCircle size={17} color="#ea4335" />
                <span>以 Gmail 發送確認信給場館</span>
              </a>
            )}

            <button
              onClick={() => {
                setBookingReceipt(null);
                onClose();
              }}
              style={{
                background: '#162030',
                color: '#cbd5e1',
                border: 'none',
                borderRadius: '12px',
                padding: '11px 16px',
                fontWeight: 700,
                fontSize: '13.5px',
                cursor: 'pointer'
              }}
            >
              完成並返回地圖
            </button>
          </div>
        </div>

        {/* Certificate Viewer Lightbox for Gym Manager / Coach */}
        {currentCert && (
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 3500,
            background: 'rgba(3, 6, 12, 0.94)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>
            <div style={{
              background: '#0b111c',
              border: '1px solid #233148',
              borderRadius: '18px',
              width: '100%',
              maxWidth: '680px',
              maxHeight: '92vh',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 60px rgba(0,0,0,0.85), 0 0 30px rgba(16, 185, 129, 0.25)',
              overflow: 'hidden'
            }}>
              {/* Lightbox Header */}
              <div style={{
                padding: '14px 20px',
                borderBottom: '1px solid #1c2738',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#070c14'
              }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#f8fafc' }}>
                    {currentCert.name}
                  </div>
                  <div style={{ fontSize: '11px', color: '#10b981', marginTop: '2px' }}>
                    第 {viewingCertModalIndex + 1} / {receiptCoachCerts.length} 張 · 教練自主檢附之合格證照
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setViewingCertModalIndex(null)}
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: 'none',
                    color: '#cbd5e1',
                    borderRadius: '6px',
                    padding: '5px',
                    cursor: 'pointer'
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Lightbox Image Preview */}
              <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#04070e'
              }}>
                <img 
                  src={currentCert.imageUrl} 
                  alt={currentCert.name}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '60vh',
                    borderRadius: '10px',
                    border: '1px solid #233148',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
                    objectFit: 'contain'
                  }}
                />
              </div>

              {/* Lightbox Footer & Navigation */}
              <div style={{
                padding: '12px 20px',
                borderTop: '1px solid #1c2738',
                background: '#070c14',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    type="button"
                    disabled={viewingCertModalIndex === 0}
                    onClick={() => setViewingCertModalIndex(prev => Math.max(0, prev - 1))}
                    style={{
                      background: viewingCertModalIndex === 0 ? '#131b28' : '#1e293b',
                      color: viewingCertModalIndex === 0 ? '#475569' : '#f8fafc',
                      border: '1px solid #2a374a',
                      borderRadius: '6px',
                      padding: '5px 10px',
                      fontSize: '11.5px',
                      cursor: viewingCertModalIndex === 0 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    ← 上一張
                  </button>
                  <button
                    type="button"
                    disabled={viewingCertModalIndex >= receiptCoachCerts.length - 1}
                    onClick={() => setViewingCertModalIndex(prev => Math.min(receiptCoachCerts.length - 1, prev + 1))}
                    style={{
                      background: viewingCertModalIndex >= receiptCoachCerts.length - 1 ? '#131b28' : '#1e293b',
                      color: viewingCertModalIndex >= receiptCoachCerts.length - 1 ? '#475569' : '#f8fafc',
                      border: '1px solid #2a374a',
                      borderRadius: '6px',
                      padding: '5px 10px',
                      fontSize: '11.5px',
                      cursor: viewingCertModalIndex >= receiptCoachCerts.length - 1 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    下一張 →
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setViewingCertModalIndex(null)}
                  style={{
                    background: '#1e293b',
                    color: '#f8fafc',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    padding: '6px 14px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  關閉預覽
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  const bookingInnerContent = (
    <div style={{
      background: embedded ? '#080808' : '#0d131f',
      border: embedded ? '1px solid #1f1f1f' : '1px solid #1f2c42',
      borderRadius: embedded ? '14px' : '20px',
      width: '100%',
      maxWidth: embedded ? '100%' : '760px',
      maxHeight: embedded ? 'none' : '92vh',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: embedded ? 'none' : '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 20px rgba(180, 255, 4, 0.1)',
      overflow: 'hidden'
    }}>
      {/* Modal Top Header */}
      {!embedded && (
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid #1a2536',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#090e18'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#f8fafc', margin: 0 }}>
                預約上課 · {gym.name}
              </h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px', fontSize: '12.5px' }}>
              <span style={{ color: '#94a3b8' }}>預約規則：</span>
              <strong style={{ color: '#b4ff04', fontSize: '14px' }}>每小時使用 1 次額度</strong>
              <span style={{ color: '#334155' }}>|</span>
              <span style={{ color: '#94a3b8' }}>可用額度：</span>
              <strong style={{ color: '#b4ff04', fontSize: '14px' }}>{Math.floor(currentPoints / pointsPerSlot)} 次</strong>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: '#1a2436',
              border: 'none',
              color: '#94a3b8',
              borderRadius: '8px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            title="關閉"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Modal Body - Scrollable */}
      <div style={{
        flex: 1,
        overflowY: embedded ? 'visible' : 'auto',
        padding: embedded ? (isMobile ? '14px 12px' : '20px') : (isMobile ? '16px 14px' : '20px 24px'),
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? '16px' : '20px'
      }}>
        {/* Friendly Buffer Notice Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(180, 255, 4, 0.08) 0%, rgba(239, 68, 68, 0.06) 100%)',
          border: '1px solid rgba(180, 255, 4, 0.25)',
          borderRadius: '12px',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '12.5px'
        }}>
          <ShieldCheck size={16} color="#b4ff04" style={{ flexShrink: 0 }} />
          <span style={{ color: '#cbd5e1' }}>
            <strong style={{ color: '#f8fafc' }}>預約須知：</strong>
            為維護店家現場準備動線與人流管制，預約需 <strong style={{ color: '#b4ff04' }}>至少提前 2 小時</strong> 送出；<strong style={{ color: '#f87171' }}>一經預約即無法取消</strong>。
          </span>
        </div>

        {/* STEP 1: 7-Day Date Tabs (未來 7 天日期切換) */}
        <div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={15} color="#b4ff04" />
              <span>1. 選擇預約日期 (開放未來 7 天)：</span>
            </label>
          </div>

          {/* Date Tabs Strip */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, minmax(46px, 1fr))',
            gap: isMobile ? '5px' : '6px',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            paddingBottom: '2px'
          }}>
            {days.map((d) => {
              const isSelected = d.dateStr === selectedDateStr;
              return (
                <button
                  key={d.dateStr}
                  type="button"
                  onClick={() => handleSelectDate(d.dateStr)}
                  style={{
                    background: isSelected 
                      ? (embedded ? '#1a1a1a' : 'linear-gradient(180deg, #1f2c42 0%, #141f30 100%)')
                      : (embedded ? '#111111' : '#090e18'),
                    border: isSelected ? '1.5px solid #b4ff04' : (embedded ? '1px solid #262626' : '1px solid #192336'),
                    borderRadius: '10px',
                    padding: isMobile ? '7px 2px' : '8px 4px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2px',
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 0 10px rgba(180, 255, 4, 0.25)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span style={{ fontSize: '11px', color: isSelected ? '#b4ff04' : '#64748b', fontWeight: 600 }}>
                    {d.displayLabel}
                  </span>
                  <strong style={{ fontSize: isMobile ? '12.5px' : '13px', color: isSelected ? '#ffffff' : '#e2e8f0', fontWeight: 800 }}>
                    {d.dayName}
                  </strong>
                  <span style={{ fontSize: '10px', color: isSelected ? '#b4ff04' : '#475569' }}>
                    {d.month}/{d.date}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP 2: 16 格時段選擇 (桌機 4x4、手機 2x8 完美網格，乾淨俐落、視覺極致舒適) */}
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '10px',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            <label style={{
              fontSize: '13.5px',
              fontWeight: 800,
              color: '#cbd5e1',
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '6px'
            }}>
              <Clock size={16} color="#b4ff04" />
              <span>
                2. 選擇上課時段 · 
                <span style={{ color: '#b4ff04', marginLeft: '6px' }}>
                  {activeDayObj.displayLabel} ({activeDayObj.dayName} {activeDayObj.month}/{activeDayObj.date})
                </span>
              </span>
              {totalHours > 0 && (
                <span style={{
                  background: '#b4ff04',
                  color: '#0a1402',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  fontSize: '11px',
                  fontWeight: 900
                }}>
                  已選 {totalHours} 小時 (使用 {totalHours} 次額度)
                </span>
              )}
            </label>

            {/* 額度達上限警示標籤 */}
            {currentPoints - totalPointsNeeded < pointsPerSlot && totalHours > 0 && (
              <span style={{
                background: 'rgba(245, 158, 11, 0.15)',
                border: '1px solid #f59e0b',
                color: '#fbbf24',
                padding: '3px 10px',
                borderRadius: '10px',
                fontSize: '11px',
                fontWeight: 800
              }}>
                ⚠️ 可用額度已達上限，無法再選
              </span>
            )}

            {/* 這個框上方顯示可用預約額度 */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: currentPoints - totalPointsNeeded < pointsPerSlot 
                ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(20, 20, 20, 0.9) 100%)' 
                : 'linear-gradient(135deg, rgba(180, 255, 4, 0.12) 0%, rgba(20, 20, 20, 0.9) 100%)',
              border: currentPoints - totalPointsNeeded < pointsPerSlot
                ? '1px solid rgba(245, 158, 11, 0.55)'
                : '1px solid rgba(180, 255, 4, 0.45)',
              padding: '5px 12px',
              borderRadius: '10px',
              boxShadow: currentPoints - totalPointsNeeded < pointsPerSlot
                ? '0 0 12px rgba(245, 158, 11, 0.15)'
                : '0 0 12px rgba(180, 255, 4, 0.15)'
            }}>
              <span style={{ fontSize: '12px', color: '#cbd5e1', fontWeight: 600 }}>可用額度：</span>
              <strong style={{ 
                color: currentPoints - totalPointsNeeded < pointsPerSlot ? '#fbbf24' : '#b4ff04', 
                fontSize: '14.5px', 
                fontWeight: 900 
              }}>
                {Math.max(0, Math.floor((currentPoints - totalPointsNeeded) / pointsPerSlot))} 次
              </strong>
              {totalHours > 0 && (
                <span style={{ fontSize: '11px', color: '#64748b' }}>
                  (共 {Math.floor(currentPoints / pointsPerSlot)} 次)
                </span>
              )}
              {onOpenTopUp && (
                <button
                  type="button"
                  onClick={onOpenTopUp}
                  style={{
                    marginLeft: '4px',
                    background: currentPoints - totalPointsNeeded < pointsPerSlot
                      ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                      : 'rgba(180, 255, 4, 0.18)',
                    border: currentPoints - totalPointsNeeded < pointsPerSlot 
                      ? '1px solid #f59e0b' 
                      : '1px solid #b4ff04',
                    color: currentPoints - totalPointsNeeded < pointsPerSlot ? '#0f172a' : '#b4ff04',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                  title="購買媒合方案"
                >
                  + 購買方案
                </button>
              )}
            </div>
          </div>

          {/* 桌機 4x4、手機 2x8 格子 (總共 16 格，手機點擊面積寬敞直覺) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: isMobile ? '8px' : '10px',
            background: embedded ? '#0d0d0d' : '#070b13',
            borderRadius: '14px',
            border: embedded ? '1px solid #222222' : '1px solid #1c2738',
            padding: isMobile ? '10px' : '14px'
          }}>
            {TIME_SLOTS.map(slot => {
              const slotState = getSlotState(slot, activeDayObj.dayKey, activeDayObj.dateStr);

              let cardBg = embedded ? '#141414' : '#080d16';
              let cardBorder = '1px solid rgba(180, 255, 4, 0.35)';
              let timeColor = '#f8fafc';
              let statusColor = '#b4ff04';
              let cursor = 'pointer';
              let boxShadow = 'none';

              if (slotState.type === 'booked_by_me') {
                cardBg = 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)';
                cardBorder = '1.5px solid #10b981';
                timeColor = '#ffffff';
                statusColor = '#a7f3d0';
                boxShadow = '0 0 14px rgba(16, 185, 129, 0.45)';
                cursor = 'pointer';
              } else if (slotState.type === 'insufficient_points') {
                cardBg = embedded ? '#121212' : '#0c121e';
                cardBorder = '1px dashed rgba(245, 158, 11, 0.55)';
                timeColor = '#94a3b8';
                statusColor = '#fbbf24';
                cursor = 'pointer';
                boxShadow = 'none';
              } else if (
                slotState.type === 'not_open' || 
                slotState.type === 'occupied' || 
                slotState.type === 'temp_closed' || 
                slotState.type === 'too_soon'
              ) {
                cardBg = embedded ? '#161616' : '#121824';
                cardBorder = embedded ? '1px solid #262626' : '1px solid #1e293b';
                timeColor = '#64748b';
                statusColor = '#64748b';
                cursor = 'not-allowed';
                boxShadow = 'none';
              } else {
                cardBg = embedded ? '#141414' : 'linear-gradient(180deg, #101827 0%, #0d1422 100%)';
                cardBorder = '1px solid rgba(180, 255, 4, 0.35)';
                timeColor = '#f8fafc';
                statusColor = '#b4ff04';
                cursor = 'pointer';
              }

              return (
                <button
                  key={slot.hour}
                  type="button"
                  disabled={!slotState.canClick && slotState.type !== 'booked_by_me'}
                  onClick={() => toggleSlotSelection(slot.hour, activeDayObj.dayKey, activeDayObj.dateStr)}
                  style={{
                    padding: isMobile ? '11px 6px' : '12px 6px',
                    borderRadius: '10px',
                    border: cardBorder,
                    background: cardBg,
                    color: timeColor,
                    cursor,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    boxShadow,
                    transition: 'all 0.15s ease',
                    userSelect: 'none'
                  }}
                  title={slotState.tooltip}
                >
                  <span style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '0.2px' }}>
                    {slot.label}
                  </span>
                  <span style={{
                    fontSize: slotState.type === 'too_soon' ? '10.5px' : '11px',
                    fontWeight: 700,
                    color: statusColor,
                    whiteSpace: 'nowrap'
                  }}>
                    {slotState.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP 3: 預約備註需求 */}
        <div style={{
          background: embedded ? '#0d0d0d' : '#070b13',
          border: embedded ? '1px solid #222222' : '1px solid #1c2738',
          borderRadius: '14px',
          padding: isMobile ? '14px 12px' : '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FileText size={15} color="#b4ff04" />
              <span>3. 預約備註需求（選填）：</span>
            </label>
            <span style={{
              background: 'rgba(180, 255, 4, 0.1)',
              color: '#b4ff04',
              padding: '3px 10px',
              borderRadius: '6px',
              fontSize: '11.5px',
              fontWeight: 700
            }}>
              僅限 1 對 1 私人教課
            </span>
          </div>

          <input
            type="text"
            placeholder="若有特殊需求可於此留言（選填）"
            value={bookingNote}
            onChange={(e) => setBookingNote(e.target.value)}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              background: embedded ? '#141414' : '#121927',
              border: embedded ? '1px solid #2a2a2a' : '1px solid #243248',
              borderRadius: '8px',
              padding: '11px 14px',
              color: '#fff',
              fontSize: '13.5px',
              outline: 'none',
              transition: 'border-color 0.18s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#b4ff04'}
            onBlur={(e) => e.target.style.borderColor = embedded ? '#2a2a2a' : '#243248'}
          />
        </div>
      </div>

      {/* Modal Bottom Sticky Summary & Action Bar */}
      <div style={{
        padding: embedded ? (isMobile ? '14px 12px' : '16px 20px') : (isMobile ? '14px 16px' : '16px 24px'),
        background: embedded ? '#0d0d0d' : '#090e18',
        borderTop: embedded ? '1px solid #1f1f1f' : '1px solid #1a2536',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'stretch' : 'center',
        justifyContent: 'space-between',
        gap: isMobile ? '12px' : '16px',
        flexWrap: 'wrap'
      }}>
        {/* Left Summary */}
        <div>
          <div style={{ fontSize: '12px', color: '#94a3b8' }}>
            已選時段：
            {totalHours > 0 ? (
              <strong style={{ color: '#f8fafc', marginLeft: '4px' }}>
                {activeDayObj.fullDateStr} ({activeDayObj.dayName}) · 共 {totalHours} 小時
              </strong>
            ) : (
              <span style={{ color: '#ef4444', marginLeft: '4px' }}>尚未選取時段</span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '3px' }}>
            <span style={{ fontSize: '12px', color: '#64748b' }}>本次使用預約額度：</span>
            <span style={{ fontSize: '22px', fontWeight: 900, color: '#b4ff04' }}>
              {totalHours}
            </span>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>
              次 (每小時使用 1 次額度)
            </span>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: isMobile ? '100%' : 'auto' }}>
          {!embedded && (
            <button
              type="button"
              onClick={onClose}
              style={{
                background: '#162030',
                color: '#94a3b8',
                border: '1px solid #223046',
                borderRadius: '10px',
                padding: '10px 16px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              取消
            </button>
          )}

          <button
            type="button"
            disabled={totalHours === 0 || isSubmitting || totalPointsNeeded > currentPoints}
            onClick={handleConfirmBooking}
            style={{
              flex: isMobile ? 1 : 'initial',
              height: isMobile ? '46px' : 'auto',
              background: (totalHours > 0 && totalPointsNeeded <= currentPoints)
                ? 'linear-gradient(135deg, #b4ff04 0%, #8ce000 100%)' 
                : '#1e293b',
              color: (totalHours > 0 && totalPointsNeeded <= currentPoints) ? '#0a1402' : '#64748b',
              border: 'none',
              borderRadius: '10px',
              padding: '10px 22px',
              fontSize: '14px',
              fontWeight: 900,
              cursor: (totalHours > 0 && totalPointsNeeded <= currentPoints) ? 'pointer' : 'not-allowed',
              boxShadow: (totalHours > 0 && totalPointsNeeded <= currentPoints) ? '0 4px 14px rgba(180, 255, 4, 0.4)' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.18s ease'
            }}
          >
            <span>
              {isSubmitting 
                ? '預約處理中...' 
                : totalPointsNeeded > currentPoints 
                  ? `額度不足 (差 ${totalHours - Math.floor(currentPoints / pointsPerSlot)} 次)` 
                  : totalHours > 0 
                    ? `確認送出預約 (使用 ${totalHours} 次額度)` 
                    : '確認送出預約上課'}
            </span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  if (embedded) {
    return bookingInnerContent;
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 2200,
      background: 'rgba(5, 8, 15, 0.88)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      {bookingInnerContent}
    </div>
  );
}
