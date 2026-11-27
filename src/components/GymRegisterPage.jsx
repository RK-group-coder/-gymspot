import React, { useState, useMemo, useRef } from 'react';
import { 
  Building2, 
  FileSpreadsheet, 
  Upload, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink, 
  Phone, 
  MessageSquare, 
  Mail, 
  Clock, 
  Calendar, 
  Check, 
  RotateCcw, 
  Camera, 
  Image as ImageIcon, 
  Trash2,
  AlertCircle,
  FileText,
  ChevronDown,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { saveApplication } from '../utils/adminStorage';
import { TAIWAN_DISTRICTS, TAIWAN_CITIES } from '../utils/geo';
import AntiFraudModal from './AntiFraudModal';
import { VenueTermsContent, LegalFooter } from './LegalPages';

// 1 到 7 星期定義
const WEEKDAYS = [
  { key: 1, name: '週一', num: '1' },
  { key: 2, name: '週二', num: '2' },
  { key: 3, name: '週三', num: '3' },
  { key: 4, name: '週四', num: '4' },
  { key: 5, name: '週五', num: '5' },
  { key: 6, name: '週六', num: '6' },
  { key: 7, name: '週日', num: '7' }
];

// 每天 8:00 到 24:00，一小時一格，共 16 格 (4x4 格子)
const TIME_SLOTS = Array.from({ length: 16 }, (_, i) => {
  const start = 8 + i;
  const end = start + 1;
  const startStr = String(start).padStart(2, '0') + ':00';
  const endStr = String(end).padStart(2, '0') + ':00';
  return {
    hour: start,
    label: `${startStr} - ${endStr}`,
    shortLabel: `${start}:00`
  };
});

// 預設 8:00~24:00 全時段勾選 (共 16 格)
const getInitialSchedule = () => {
  const sched = {};
  for (let d = 1; d <= 7; d++) {
    for (let h = 8; h <= 23; h++) {
      sched[`${d}-${h}`] = true;
    }
  }
  return sched;
};

// 店家身分確認：場館對外聯絡管道（擇一填寫，由官方傳訊核驗）
const VERIFY_CHANNELS = [
  {
    key: 'ig',
    label: '官方 Instagram 帳號',
    inputLabel: '官方 Instagram 帳號或連結',
    placeholder: '例如：@forge_gym_tw 或 https://www.instagram.com/forge_gym_tw',
    fieldName: 'igHandle'
  },
  {
    key: 'line',
    label: '官方 LINE ID / 官方帳號',
    inputLabel: '官方 LINE ID / 官方帳號或連結',
    placeholder: '例如：@forgegym 或 https://lin.ee/xxxxxx',
    fieldName: 'officialLine'
  },
  {
    key: 'fb',
    label: 'Facebook 粉絲專頁網址',
    inputLabel: 'Facebook 粉絲專頁網址',
    placeholder: '例如：https://www.facebook.com/forgegym.tw',
    fieldName: 'fbPageUrl'
  }
];

export default function GymRegisterPage({ onNavigateHome, onOpenTerms, onOpenAntiFraud, onRegisterSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    shortName: '',
    city: '台北市',
    district: '大安區',
    address: '',
    phone: '',
    email: '',
    verifyChannel: 'ig',
    igHandle: '',
    officialLine: '',
    fbPageUrl: '',
    gymIntro: '',
    coachIntro: '',
    coverImage: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=900&auto=format&fit=crop',
    hourlyRate: 200,
    studentCleanFee: 0,
    cleanFeeDesc: '免收學員人頭清潔費',
    certRequired: '需具備合格國際體適能證照 (ACE / NASM / ACSM / NSCA)',
    verifiedDoc: '已透過場館官方帳號私訊核驗'
  });

  const [schedule, setSchedule] = useState(getInitialSchedule);
  const [venuePhotos, setVenuePhotos] = useState([]);
  const photoInputRef = useRef(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const coverInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);
  const [submittedGymData, setSubmittedGymData] = useState(null);

  // SECTION 7: 合作條款閱讀與簽署狀態
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isAntiFraudOpen, setIsAntiFraudOpen] = useState(false);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [isAgreedTerms, setIsAgreedTerms] = useState(false);
  const [agreedTermsTimestamp, setAgreedTermsTimestamp] = useState(null);
  const termsScrollRef = useRef(null);

  const selectedSlotsCount = useMemo(() => {
    return Object.values(schedule).filter(Boolean).length;
  }, [schedule]);

  const toggleSlot = (dayKey, hour) => {
    setSchedule(prev => ({
      ...prev,
      [`${dayKey}-${hour}`]: !prev[`${dayKey}-${hour}`]
    }));
  };

  const toggleDayAll = (dayKey) => {
    setSchedule(prev => {
      const isAllChecked = TIME_SLOTS.every(slot => prev[`${dayKey}-${slot.hour}`]);
      const next = { ...prev };
      TIME_SLOTS.forEach(slot => {
        next[`${dayKey}-${slot.hour}`] = !isAllChecked;
      });
      return next;
    });
  };

  const toggleTimeSlotAll = (hour) => {
    setSchedule(prev => {
      const isAllChecked = WEEKDAYS.every(d => prev[`${d.key}-${hour}`]);
      const next = { ...prev };
      WEEKDAYS.forEach(d => {
        next[`${d.key}-${hour}`] = !isAllChecked;
      });
      return next;
    });
  };

  const selectAllSchedule = () => {
    const next = {};
    WEEKDAYS.forEach(d => {
      TIME_SLOTS.forEach(s => {
        next[`${d.key}-${s.hour}`] = true;
      });
    });
    setSchedule(next);
  };

  const clearAllSchedule = () => {
    setSchedule({});
  };

  const selectWeekdaysOnly = () => {
    setSchedule(prev => {
      const next = { ...prev };
      [1, 2, 3, 4, 5].forEach(d => {
        TIME_SLOTS.forEach(s => {
          next[`${d}-${s.hour}`] = true;
        });
      });
      [6, 7].forEach(d => {
        TIME_SLOTS.forEach(s => {
          next[`${d}-${s.hour}`] = false;
        });
      });
      return next;
    });
  };

  const selectWeekendsOnly = () => {
    setSchedule(prev => {
      const next = { ...prev };
      [1, 2, 3, 4, 5].forEach(d => {
        TIME_SLOTS.forEach(s => {
          next[`${d}-${s.hour}`] = false;
        });
      });
      [6, 7].forEach(d => {
        TIME_SLOTS.forEach(s => {
          next[`${d}-${s.hour}`] = true;
        });
      });
      return next;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCityChange = (e) => {
    const newCity = e.target.value;
    const defaultDistrict = (TAIWAN_DISTRICTS[newCity] && TAIWAN_DISTRICTS[newCity][0]) || '';
    setFormData(prev => ({
      ...prev,
      city: newCity,
      district: defaultDistrict
    }));
  };

  const processNewPhotos = (files) => {
    if (!files || files.length === 0) return;
    
    const imageFiles = files.filter(f => f.type ? f.type.startsWith('image/') : true);
    if (imageFiles.length === 0) {
      alert('請選取圖片檔案（支援 JPG、PNG、WEBP）');
      return;
    }

    if (venuePhotos.length >= 10) {
      alert('最多只能上傳 10 張場館照片，如需更換請先刪除已有照片。');
      return;
    }

    const availableSlots = 10 - venuePhotos.length;
    let filesToAdd = imageFiles;
    if (imageFiles.length > availableSlots) {
      alert(`場館照片至多 10 張，已自動為您選取前 ${availableSlots} 張。`);
      filesToAdd = imageFiles.slice(0, availableSlots);
    }

    const newPhotos = filesToAdd.map(file => ({
      name: file.name,
      preview: URL.createObjectURL(file)
    }));
    setVenuePhotos(prev => [...prev, ...newPhotos]);
  };

  const handlePhotoUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processNewPhotos(Array.from(e.target.files));
      e.target.value = '';
    }
  };

  const setCoverFromFile = (file) => {
    if (!file) return;
    if (file.type && !file.type.startsWith('image/')) {
      alert('請選取圖片檔案（支援 JPG、PNG、WEBP）');
      return;
    }
    setCoverPhoto(prev => {
      if (prev && prev.preview && prev.preview.startsWith('blob:')) {
        try { URL.revokeObjectURL(prev.preview); } catch (_) {}
      }
      return { name: file.name, preview: URL.createObjectURL(file) };
    });
  };

  const handleCoverUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCoverFromFile(e.target.files[0]);
      e.target.value = '';
    }
  };

  const removeCover = () => {
    setCoverPhoto(prev => {
      if (prev && prev.preview && prev.preview.startsWith('blob:')) {
        try { URL.revokeObjectURL(prev.preview); } catch (_) {}
      }
      return null;
    });
  };

  const removePhoto = (indexToRemove) => {
    setVenuePhotos(prev => {
      const target = prev[indexToRemove];
      if (target && target.preview && target.preview.startsWith('blob:')) {
        try {
          URL.revokeObjectURL(target.preview);
        } catch (_) {}
      }
      return prev.filter((_, idx) => idx !== indexToRemove);
    });
  };

  const handleVerifyOnGoogleMaps = () => {
    const query = encodeURIComponent(formData.address || `${formData.city} ${formData.name}` || '健身房');
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const handleOpenTermsModal = () => {
    setIsTermsModalOpen(true);
  };

  const handleTermsScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 25) {
      setHasScrolledToBottom(true);
    }
  };

  const handleAgreeTerms = () => {
    setIsAgreedTerms(true);
    setAgreedTermsTimestamp(new Date().toLocaleString());
    setIsTermsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!coverPhoto) {
      alert('請上傳「首頁圖」（顯示於首頁場館卡片的封面圖）');
      return;
    }
    if (venuePhotos.length < 4) {
      alert(`請至少上傳 4 張場館／器材照片（目前已選取 ${venuePhotos.length} 張，還差 ${4 - venuePhotos.length} 張）`);
      return;
    }
    if (venuePhotos.length > 10) {
      alert(`場館／器材照片至多上傳 10 張（目前已選取 ${venuePhotos.length} 張）`);
      return;
    }
    if (!isAgreedTerms) {
      alert('請先點擊第 7 點「查閱合作條款」，滾動至最下方並按下「我已詳閱並同意」後方可提交！');
      return;
    }
    setIsSubmitting(true);

    setTimeout(() => {
      const hourlyPrice = Number(formData.hourlyRate) || 200;
      const coachIntroText = formData.coachIntro?.trim() || '無特殊介紹';
      const gymIntroText = formData.gymIntro?.trim() || '無場館介紹';
      const newGym = {
        id: `gym-reg-${Date.now()}`,
        name: formData.name || '新進駐場租健身房',
        shortName: (formData.shortName || formData.name || '新進駐場館').trim(),
        brand: formData.name,
        city: formData.city,
        district: formData.district || '市區',
        address: formData.address || `${formData.city}${formData.district}`,
        nearMrt: '交通便利',
        lat: 25.0400 + (Math.random() - 0.5) * 0.05,
        lng: 121.5400 + (Math.random() - 0.5) * 0.05,
        rating: 5.0,
        reviewCount: 1,
        phone: formData.phone || '02-8888-9999',
        email: formData.email,
        lineId: formData.officialLine || '',
        igHandle: formData.igHandle || '',
        fbPageUrl: formData.fbPageUrl || '',
        gymIntro: gymIntroText,
        coachIntro: coachIntroText,
        coverImage: coverPhoto ? coverPhoto.preview : formData.coverImage,
        photos: venuePhotos.map(p => p.preview),
        pricing: {
          hourlyRate: hourlyPrice,
          offPeakPerHour: hourlyPrice,
          peakPerHour: hourlyPrice,
          studentCleanFee: Number(formData.studentCleanFee) || 0,
          cleanFeeDesc: formData.cleanFeeDesc,
          peakHoursRange: '依週時段表格勾選開放',
          offPeakHoursRange: '全時段小時制場租',
          packageDeals: []
        },
        availableSchedule: schedule,
        openSlotsCount: selectedSlotsCount,
        equipment: {
          squatRacksCount: 4,
          turfZone: true,
          turfLength: '12米專用功能衝刺草皮',
          eleikoPlates: true,
          dumbbellsMaxKg: 50,
          privateRoom: true,
          showerAvailable: true,
          freeWater: true,
          freeParking: false
        },
        requirements: {
          certRequired: formData.certRequired,
          cprRequired: true,
          indoorShoesOnly: true,
          insuranceIncluded: '已投保公共意外責任險',
          cancellationPolicy: '一經預約即無法取消'
        },
        tags: [
          Number(formData.studentCleanFee) === 0 ? '免學員費' : '',
          '第一波特約入駐'
        ].filter(Boolean),
        isVerified: true,
        isFeatured: true,
        verifiedDoc: formData.verifiedDoc,
        agreedTerms: true,
        agreedTermsAt: agreedTermsTimestamp
      };

      // Confetti burst
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 }
      });

      // 儲存至管理員審核隊列 (Pending Application Queue)
      const newApp = {
        id: newGym.id,
        name: newGym.name,
        shortName: newGym.shortName,
        brand: newGym.brand,
        city: newGym.city,
        district: newGym.district,
        address: newGym.address,
        phone: newGym.phone,
        email: newGym.email,
        officialLine: formData.officialLine || '',
        igHandle: formData.igHandle || '',
        fbPageUrl: formData.fbPageUrl || '',
        gymIntro: gymIntroText,
        coachIntro: coachIntroText,
        hourlyRate: hourlyPrice,
        studentCleanFee: Number(formData.studentCleanFee) || 0,
        cleanFeeDesc: formData.cleanFeeDesc,
        certRequired: formData.certRequired,
        verifiedDoc: formData.verifiedDoc,
        coverImage: newGym.coverImage,
        photos: newGym.photos,
        openSlotsCount: selectedSlotsCount,
        availableSchedule: schedule,
        agreedTerms: true,
        agreedTermsAt: agreedTermsTimestamp,
        status: 'pending',
        createdAt: new Date().toISOString(),
        reviewerNote: ''
      };
      saveApplication(newApp);

      if (onRegisterSuccess) {
        onRegisterSuccess(newGym);
      }

      setSubmittedGymData(newGym);
      setIsSubmitting(false);
      setIsSubmittedSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 800);
  };

  const handleResetForm = () => {
    setIsSubmittedSuccess(false);
    setSubmittedGymData(null);
    setFormData({
      name: '',
      shortName: '',
      city: '台北市',
      district: '大安區',
      address: '',
      phone: '',
      email: '',
      verifyChannel: 'ig',
      igHandle: '',
      officialLine: '',
      fbPageUrl: '',
      gymIntro: '',
      coachIntro: '',
      coverImage: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=900&auto=format&fit=crop',
      hourlyRate: 200,
      studentCleanFee: 0,
      cleanFeeDesc: '免收學員人頭清潔費',
      certRequired: '需具備合格國際體適能證照 (ACE / NASM / ACSM / NSCA)',
      verifiedDoc: '已透過場館官方帳號私訊核驗'
    });
    setSchedule(getInitialSchedule());
    setVenuePhotos([]);
    setCoverPhoto(null);
    setIsAgreedTerms(false);
    setAgreedTermsTimestamp(null);
    setHasScrolledToBottom(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#070a10',
      color: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      {/* Dark Gym Background (fixed) with brand-green accents */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: [
          'radial-gradient(ellipse at 50% 0%, rgba(180, 255, 4, 0.18) 0%, rgba(7, 10, 16, 0) 55%)',
          'radial-gradient(ellipse at 100% 100%, rgba(180, 255, 4, 0.10) 0%, rgba(7, 10, 16, 0) 50%)',
          'linear-gradient(180deg, rgba(7, 10, 16, 0.78) 0%, rgba(7, 10, 16, 0.88) 100%)',
          "url('/gym-dark-bg.jpg')"
        ].join(', '),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      {/* Background Ambient Glow */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '1000px',
        height: '400px',
        background: 'radial-gradient(ellipse at top, rgba(180, 255, 4, 0.12) 0%, rgba(7, 10, 16, 0) 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Main Container */}
      <div style={{
        maxWidth: '920px',
        margin: '0 auto',
        padding: '36px 20px 80px',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{
            fontSize: 'clamp(26px, 4.5vw, 38px)',
            fontWeight: 900,
            color: '#ffffff',
            margin: '0 0 14px',
            letterSpacing: '-0.02em',
            lineHeight: 1.25
          }}>
            健身房／工作室「場租服務」登記上架
          </h1>

          <p style={{
            fontSize: '15px',
            color: '#94a3b8',
            maxWidth: '680px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            提交您的場館地址、官方聯絡管道與場租報價表，確認身分後即時在 <strong style={{ color: '#ffffff', textShadow: '0 0 8px rgba(255, 255, 255, 0.6)' }}>GYMspot map 場租地圖</strong> 上線，免費吸引全台自由教練預約帶課！
          </p>
        </div>

        {/* If Form is already submitted successfully */}
        {isSubmittedSuccess && submittedGymData ? (
          <div style={{
            background: 'linear-gradient(180deg, #0e1726 0%, #070d18 100%)',
            border: '1px solid #10b981',
            borderRadius: '20px',
            padding: '36px 28px',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 24px rgba(16, 185, 129, 0.2)'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '2px solid #10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 18px',
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)'
            }}>
              <CheckCircle2 size={36} color="#10b981" />
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#f8fafc', marginBottom: '10px' }}>
              場租上架申請已成功提交！
            </h2>
            <p style={{ fontSize: '14px', color: '#94a3b8', maxWidth: '580px', margin: '0 auto 24px', lineHeight: 1.6 }}>
              感謝您申請加入肌動組 GYMspot！我們的人工審核團隊已收到您的資料，並已即時將您的場館加入預覽清單中。
            </p>

            {/* Registered Gym Preview Card */}
            <div style={{
              background: '#090e18',
              border: '1px solid #1e293b',
              borderRadius: '16px',
              padding: '20px',
              maxWidth: '540px',
              margin: '0 auto 28px',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '17px', fontWeight: 900, color: '#ffffff' }}>
                  {submittedGymData.name}
                </span>
                <span style={{
                  background: 'rgba(180, 255, 4, 0.12)',
                  color: '#b4ff04',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '3px 8px',
                  borderRadius: '6px',
                  border: '1px solid rgba(180, 255, 4, 0.3)'
                }}>
                  審核中 (第一波免費特約)
                </span>
              </div>
              <div style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '8px' }}>
                📍 {submittedGymData.city} {submittedGymData.district} · {submittedGymData.address}
              </div>
              <div style={{ display: 'flex', gap: '20px', fontSize: '13px', paddingTop: '10px', borderTop: '1px solid #192335', flexWrap: 'wrap' }}>
                <div>小時制場租：<strong style={{ color: '#b4ff04' }}>NT$ {submittedGymData.pricing.hourlyRate || submittedGymData.pricing.offPeakPerHour}</strong> / hr</div>
                <div>每週開放時段：<strong style={{ color: '#ffffff' }}>{submittedGymData.openSlotsCount || 112} / 112 個小時格</strong></div>
              </div>
              <div style={{ fontSize: '12.5px', color: '#94a3b8', paddingTop: '10px', marginTop: '10px', borderTop: '1px solid #192335', lineHeight: 1.5 }}>
                <strong style={{ color: '#cbd5e1' }}>給教練的介紹：</strong>
                <span style={{ color: submittedGymData.coachIntro && submittedGymData.coachIntro !== '無特殊介紹' ? '#e2e8f0' : '#64748b', marginLeft: '4px' }}>
                  {submittedGymData.coachIntro || '無特殊介紹'}
                </span>
              </div>
              {submittedGymData.verifyAccount && (
                <div style={{
                  marginTop: '12px',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  background: 'rgba(180, 255, 4, 0.08)',
                  border: '1px solid rgba(180, 255, 4, 0.28)',
                  fontSize: '12.5px',
                  color: '#b4ff04',
                  fontWeight: 700,
                  lineHeight: 1.5
                }}>
                  💬 我們將會傳訊息至您的「{submittedGymData.verifyChannelLabel}：{submittedGymData.verifyAccount}」做確認，請留意訊息！
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <button
                onClick={onNavigateHome}
                style={{
                  background: 'linear-gradient(135deg, #b4ff04 0%, #8ce000 100%)',
                  color: '#0a1402',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 28px',
                  fontSize: '14px',
                  fontWeight: 900,
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(180, 255, 4, 0.4)'
                }}
              >
                前往地圖查看
              </button>
              <button
                onClick={() => {
                  window.history.pushState({}, '', '/admin');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
                style={{
                  background: 'rgba(180, 255, 4, 0.12)',
                  color: '#b4ff04',
                  border: '1px solid rgba(180, 255, 4, 0.3)',
                  borderRadius: '12px',
                  padding: '12px 22px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                前往管理後台審核 (/admin)
              </button>
              <button
                onClick={handleResetForm}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#cbd5e1',
                  border: '1px solid #334155',
                  borderRadius: '12px',
                  padding: '12px 20px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                登記另一間分店
              </button>
            </div>
          </div>
        ) : (
          /* Main Form Card */
          <div style={{
            background: 'linear-gradient(180deg, #0e1522 0%, #080d16 100%)',
            border: '1px solid #1e293b',
            borderRadius: '24px',
            padding: '36px 32px',
            boxShadow: '0 20px 45px rgba(0, 0, 0, 0.6)'
          }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
              
              {/* SECTION 1: 基本資料與地址 */}
              <div style={{
                background: '#0a0f1a',
                padding: '24px',
                borderRadius: '16px',
                border: '1px solid #192336'
              }}>
                <div style={{ marginBottom: '18px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                    1. 場館資訊與 Google Maps 地址
                  </h3>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                    請填寫與 Google 地圖商家一致的名稱與地址，方便教練比對導航
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                      場館全名 <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="例如：Forge 鍛造體能運動空間"
                      value={formData.name}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        background: '#121927',
                        border: '1px solid #243248',
                        borderRadius: '10px',
                        padding: '11px 14px',
                        color: '#fff',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#b4ff04'}
                      onBlur={(e) => e.target.style.borderColor = '#243248'}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                      場館簡稱 <span style={{ color: '#ef4444' }}>*</span>
                      <span style={{ fontSize: '11.5px', color: '#b4ff04', fontWeight: 600, marginLeft: '6px' }}>（地圖地標只顯示此簡稱）</span>
                    </label>
                    <input
                      type="text"
                      name="shortName"
                      required
                      maxLength={14}
                      placeholder="例如：Forge 鍛造體能"
                      value={formData.shortName}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        background: '#121927',
                        border: '1px solid #243248',
                        borderRadius: '10px',
                        padding: '11px 14px',
                        color: '#fff',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#b4ff04'}
                      onBlur={(e) => e.target.style.borderColor = '#243248'}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                      所在城市 <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleCityChange}
                      style={{
                        width: '100%',
                        background: '#121927',
                        border: '1px solid #243248',
                        borderRadius: '10px',
                        padding: '11px 12px',
                        color: '#fff',
                        fontSize: '14px',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#b4ff04'}
                      onBlur={(e) => e.target.style.borderColor = '#243248'}
                    >
                      <option value="" disabled>請選擇城市</option>
                      {TAIWAN_CITIES.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                      行政區 <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <select
                      name="district"
                      required
                      value={formData.district}
                      onChange={handleChange}
                      disabled={!formData.city}
                      style={{
                        width: '100%',
                        background: '#121927',
                        border: '1px solid #243248',
                        borderRadius: '10px',
                        padding: '11px 12px',
                        color: '#fff',
                        fontSize: '14px',
                        outline: 'none',
                        cursor: formData.city ? 'pointer' : 'not-allowed',
                        opacity: formData.city ? 1 : 0.6
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#b4ff04'}
                      onBlur={(e) => e.target.style.borderColor = '#243248'}
                    >
                      {!formData.city ? (
                        <option value="" disabled>請先選擇城市</option>
                      ) : (
                        (TAIWAN_DISTRICTS[formData.city] || []).map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))
                      )}
                    </select>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label style={{ fontSize: '13px', color: '#cbd5e1', fontWeight: 600 }}>
                      詳細營業地址 (需與 Google 地圖商家一致) <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleVerifyOnGoogleMaps}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#b4ff04',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <ExternalLink size={13} /> 在 Google Maps 上預覽核對
                    </button>
                  </div>
                  <input
                    type="text"
                    name="address"
                    required
                    placeholder="例如：台北市大安區忠孝東路四段 181 巷 35 號 B1"
                    value={formData.address}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      background: '#121927',
                      border: '1px solid #243248',
                      borderRadius: '10px',
                      padding: '11px 14px',
                      color: '#fff',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#b4ff04'}
                    onBlur={(e) => e.target.style.borderColor = '#243248'}
                  />
                </div>
              </div>

              {/* SECTION 2: 小時制場租費用與每週開放時段 */}
              <div style={{
                background: '#0a0f1a',
                padding: '24px',
                borderRadius: '16px',
                border: '1px solid #192336'
              }}>
                {/* Section Header */}
                <div style={{ marginBottom: '18px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                    2. 小時制場租費用與每週開放時段
                  </h3>
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
                    設定統一小時制場租收費（統一價錢收費，不做多堂優惠，僅開放教練進行 1 對 1 課程），並在下方時間表格勾選可以場租的時段
                  </div>
                </div>

                {/* Pricing Inputs */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '22px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#b4ff04', marginBottom: '6px', fontWeight: 800 }}>
                      小時制場租費用 (NT$) <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="number"
                      name="hourlyRate"
                      required
                      min="50"
                      max="5000"
                      value={formData.hourlyRate ?? ''}
                      onChange={handleChange}
                      placeholder="統一價錢收費，不做多堂優惠，僅限 1 對 1 課程（例如：200）"
                      style={{
                        width: '100%',
                        background: '#121927',
                        border: '1px solid #243248',
                        borderRadius: '10px',
                        padding: '11px 14px',
                        color: '#fff',
                        fontSize: '16px',
                        fontWeight: 800,
                        outline: 'none'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#b4ff04'}
                      onBlur={(e) => e.target.style.borderColor = '#243248'}
                    />
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '6px', fontWeight: 600 }}>
                      統一價錢收費，不做多堂優惠（每小時一格計費，僅開放教練做 1 對 1 課程）
                    </div>
                  </div>
                </div>

                {/* SCHEDULE TABLE SECTION: 1 到 7，每天 8:00 到 24:00 */}
                <div style={{
                  background: '#070b13',
                  borderRadius: '14px',
                  border: '1px solid #1c2738',
                  padding: '18px 16px'
                }}>
                  {/* Table Toolbar */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    flexWrap: 'wrap',
                    marginBottom: '14px',
                    paddingBottom: '12px',
                    borderBottom: '1px solid #172033'
                  }}>
                    <div>
                      <h4 style={{ fontSize: '14.5px', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                        每週開放時段勾選 (1 到 7，每天 08:00 到 24:00)
                      </h4>
                      <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '3px' }}>
                        可以的時段請勾選起來（預設全時段開放，可直接點擊格子或利用快速按鈕）
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        background: 'rgba(180, 255, 4, 0.1)',
                        border: '1px solid rgba(180, 255, 4, 0.3)',
                        borderRadius: '8px',
                        padding: '4px 10px',
                        fontSize: '12px',
                        color: '#cbd5e1'
                      }}>
                        已勾選開放：<strong style={{ color: '#b4ff04', fontSize: '14px' }}>{selectedSlotsCount}</strong> / 112 格
                      </div>
                    </div>
                  </div>

                  {/* Quick Select Buttons */}
                  <div style={{
                    display: 'flex',
                    gap: '8px',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    marginBottom: '14px'
                  }}>
                    <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>快速切換：</span>
                    <button
                      type="button"
                      onClick={selectAllSchedule}
                      style={{
                        background: '#141d2c',
                        border: '1px solid #28374e',
                        color: '#f8fafc',
                        borderRadius: '6px',
                        padding: '4px 10px',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = '#b4ff04'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = '#28374e'}
                    >
                      全部勾選 (1~7 全開)
                    </button>

                    <button
                      type="button"
                      onClick={selectWeekdaysOnly}
                      style={{
                        background: '#141d2c',
                        border: '1px solid #28374e',
                        color: '#f8fafc',
                        borderRadius: '6px',
                        padding: '4px 10px',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = '#b4ff04'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = '#28374e'}
                    >
                      僅平日 (1~5)
                    </button>

                    <button
                      type="button"
                      onClick={selectWeekendsOnly}
                      style={{
                        background: '#141d2c',
                        border: '1px solid #28374e',
                        color: '#f8fafc',
                        borderRadius: '6px',
                        padding: '4px 10px',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = '#b4ff04'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = '#28374e'}
                    >
                      僅週末 (6~7)
                    </button>

                    <button
                      type="button"
                      onClick={clearAllSchedule}
                      style={{
                        background: '#141d2c',
                        border: '1px solid #28374e',
                        color: '#94a3b8',
                        borderRadius: '6px',
                        padding: '4px 10px',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = '#ef4444'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = '#28374e'}
                    >
                      全部取消
                    </button>
                  </div>

                  {/* Scrollable Schedule Grid */}
                  <div style={{
                    overflowX: 'auto',
                    borderRadius: '10px',
                    border: '1px solid #1a2436',
                    background: '#090e18'
                  }}>
                    <table style={{
                      width: '100%',
                      minWidth: '660px',
                      borderCollapse: 'separate',
                      borderSpacing: '4px',
                      padding: '8px'
                    }}>
                      <thead>
                        <tr>
                          <th style={{
                            padding: '10px 8px',
                            fontSize: '12px',
                            fontWeight: 800,
                            color: '#94a3b8',
                            background: '#0f172a',
                            borderRadius: '8px',
                            textAlign: 'center',
                            width: '115px'
                          }}>
                            時段 (08:00-24:00)
                          </th>
                          {WEEKDAYS.map(d => {
                            const isDayAllChecked = TIME_SLOTS.every(s => schedule[`${d.key}-${s.hour}`]);
                            return (
                              <th
                                key={d.key}
                                onClick={() => toggleDayAll(d.key)}
                                title={`點擊切換 ${d.name} 全部時段`}
                                style={{
                                  padding: '8px 4px',
                                  fontSize: '12.5px',
                                  fontWeight: 800,
                                  color: isDayAllChecked ? '#b4ff04' : '#f8fafc',
                                  background: isDayAllChecked ? 'rgba(180, 255, 4, 0.12)' : '#0f172a',
                                  border: isDayAllChecked ? '1px solid rgba(180, 255, 4, 0.35)' : '1px solid #1e293b',
                                  borderRadius: '8px',
                                  textAlign: 'center',
                                  cursor: 'pointer',
                                  userSelect: 'none',
                                  transition: 'all 0.15s ease'
                                }}
                              >
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                                  <span>{d.name} ({d.num})</span>
                                  <span style={{ fontSize: '10.5px', color: isDayAllChecked ? '#b4ff04' : '#64748b' }}>
                                    {isDayAllChecked ? '全開' : '點擊切換'}
                                  </span>
                                </div>
                              </th>
                            );
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {TIME_SLOTS.map(slot => {
                          const isSlotAllChecked = WEEKDAYS.every(d => schedule[`${d.key}-${slot.hour}`]);
                          return (
                            <tr key={slot.hour}>
                              {/* Row Time Slot Header */}
                              <td
                                onClick={() => toggleTimeSlotAll(slot.hour)}
                                title="點擊切換此時段全星期"
                                style={{
                                  padding: '6px 6px',
                                  fontSize: '11.5px',
                                  fontWeight: 700,
                                  color: isSlotAllChecked ? '#b4ff04' : '#94a3b8',
                                  background: isSlotAllChecked ? 'rgba(180, 255, 4, 0.08)' : '#0d131f',
                                  border: isSlotAllChecked ? '1px solid rgba(180, 255, 4, 0.3)' : '1px solid #192336',
                                  borderRadius: '6px',
                                  textAlign: 'center',
                                  cursor: 'pointer',
                                  userSelect: 'none',
                                  whiteSpace: 'nowrap'
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                                  <Clock size={11} color={isSlotAllChecked ? '#b4ff04' : '#64748b'} />
                                  <span>{slot.label}</span>
                                </div>
                              </td>

                              {/* 7 Days Cells (1 to 7) */}
                              {WEEKDAYS.map(d => {
                                const isChecked = !!schedule[`${d.key}-${slot.hour}`];
                                return (
                                  <td
                                    key={d.key}
                                    onClick={() => toggleSlot(d.key, slot.hour)}
                                    title={`${d.name} ${slot.label}：${isChecked ? '可預約場租 (點擊取消)' : '未開放 (點擊勾選)'}`}
                                    style={{
                                      padding: '5px 4px',
                                      textAlign: 'center',
                                      cursor: 'pointer',
                                      userSelect: 'none',
                                      borderRadius: '6px',
                                      background: isChecked ? 'rgba(180, 255, 4, 0.16)' : 'rgba(15, 23, 42, 0.45)',
                                      border: isChecked ? '1px solid #b4ff04' : '1px solid #1e293b',
                                      boxShadow: isChecked ? '0 0 6px rgba(180, 255, 4, 0.15)' : 'none',
                                      transition: 'all 0.12s ease'
                                    }}
                                  >
                                    <div style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      gap: '4px',
                                      fontSize: '11.5px',
                                      fontWeight: 800,
                                      color: isChecked ? '#b4ff04' : '#475569'
                                    }}>
                                      <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => {}} // handled by td onClick
                                        style={{
                                          accentColor: '#b4ff04',
                                          cursor: 'pointer',
                                          width: '13px',
                                          height: '13px',
                                          margin: 0
                                        }}
                                      />
                                      <span>{isChecked ? '可預約' : '—'}</span>
                                    </div>
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* SECTION 3 / 4: 場館介紹 與 給教練的話或規則 */}
              {[
                {
                  num: '3',
                  name: 'gymIntro',
                  title: '場館介紹',
                  hint: '介紹您的場館環境特色、器材與氛圍（若未填寫，前台將自動顯示「無場館介紹」）',
                  placeholder: '例如：本館位於大安區捷運站旁，空間約 80 坪，配備 4 座深蹲架、自由重量區與衝刺草皮區，採光明亮、空調舒適...'
                },
                {
                  num: '4',
                  name: 'coachIntro',
                  title: '給教練的話或規則',
                  hint: '給進駐教練的叮嚀、帶課規範或入場須知（若未填寫，前台將自動顯示「無特殊介紹」）',
                  placeholder: '例如：入場需穿著乾淨室內訓練鞋；深蹲架與衝刺草皮區熱門時段請禮貌輪替；器材使用完畢請歸位並擦拭...'
                }
              ].map(sec => {
                const len = formData[sec.name]?.length || 0;
                return (
                  <div key={sec.name} style={{
                    background: '#0a0f1a',
                    padding: '24px',
                    borderRadius: '16px',
                    border: '1px solid #192336'
                  }}>
                    <div style={{
                      marginBottom: '14px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '8px'
                    }}>
                      <div>
                        <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#f8fafc', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span>{sec.num}. {sec.title}</span>
                          <span style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: '6px',
                            background: '#121927',
                            color: '#94a3b8',
                            border: '1px solid #243248'
                          }}>
                            選填
                          </span>
                        </h3>
                        <div style={{ fontSize: '12.5px', color: '#94a3b8', marginTop: '6px' }}>
                          {sec.hint}
                        </div>
                      </div>

                      <div style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: len >= 1000 ? 'rgba(239, 68, 68, 0.15)' : '#121927',
                        color: len >= 1000 ? '#ef4444' : '#64748b',
                        border: '1px solid ' + (len >= 1000 ? 'rgba(239, 68, 68, 0.4)' : '#243248')
                      }}>
                        {len} / 1000 字
                      </div>
                    </div>

                    <textarea
                      name={sec.name}
                      maxLength={1000}
                      rows={5}
                      placeholder={sec.placeholder}
                      value={formData[sec.name] || ''}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        background: '#121927',
                        border: '1px solid #243248',
                        borderRadius: '10px',
                        padding: '12px 14px',
                        color: '#fff',
                        fontSize: '14px',
                        outline: 'none',
                        resize: 'vertical',
                        lineHeight: 1.6,
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#b4ff04'}
                      onBlur={(e) => e.target.style.borderColor = '#243248'}
                    />
                  </div>
                );
              })}

              {/* SECTION 5: 場館聯繫管道 */}
              <div style={{
                background: '#0a0f1a',
                padding: '24px',
                borderRadius: '16px',
                border: '1px solid #192336'
              }}>
                <div style={{ marginBottom: '18px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                    5. 場館聯繫管道
                  </h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                      場館聯繫電話 <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="phone"
                      required
                      placeholder="例如：02-2775-8899"
                      value={formData.phone}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        background: '#121927',
                        border: '1px solid #243248',
                        borderRadius: '10px',
                        padding: '11px 14px',
                        color: '#fff',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#b4ff04'}
                      onBlur={(e) => e.target.style.borderColor = '#243248'}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                      場租專用 Gmail <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="例如：gymspot.tw@gmail.com"
                      pattern="[A-Za-z0-9._%+\-]+@gmail\.com"
                      title="請輸入 Gmail 信箱 (@gmail.com)"
                      value={formData.email}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        background: '#121927',
                        border: '1px solid #243248',
                        borderRadius: '10px',
                        padding: '11px 14px',
                        color: '#fff',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#b4ff04'}
                      onBlur={(e) => e.target.style.borderColor = '#243248'}
                    />
                    <div style={{ fontSize: '12px', color: '#b4ff04', marginTop: '6px', fontWeight: 600 }}>
                      Gmail 用於自動發送教練預約通知
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 6: 提供場館照片及器材照片 */}
              <div style={{
                background: '#0a0f1a',
                padding: '24px',
                borderRadius: '16px',
                border: '1px solid #192336'
              }}>
                <div style={{
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                        6. 首頁圖與場館／器材照片
                      </h3>
                      <span style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        color: venuePhotos.length >= 4 && venuePhotos.length <= 10 ? '#b4ff04' : '#ef4444'
                      }}>
                        至少 4 張，至多 10 張 *
                      </span>
                    </div>
                    <div style={{ fontSize: '12.5px', color: '#94a3b8', marginTop: '6px' }}>
                      左側上傳 1 張首頁圖；右側上傳 4～10 張場館／器材照片（建議：場地全貌、深蹲架、自由重量區、有氧及特色器材）
                    </div>
                  </div>

                  {/* Status / Count Pill */}
                  <div style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    padding: '6px 12px',
                    borderRadius: '8px',
                    background: venuePhotos.length >= 4 ? 'rgba(180, 255, 4, 0.12)' : venuePhotos.length > 0 ? 'rgba(245, 158, 11, 0.15)' : '#121927',
                    color: venuePhotos.length >= 4 ? '#b4ff04' : venuePhotos.length > 0 ? '#f59e0b' : '#94a3b8',
                    border: venuePhotos.length >= 4 ? '1px solid rgba(180, 255, 4, 0.3)' : venuePhotos.length > 0 ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid #243248',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    {venuePhotos.length >= 4 ? (
                      <CheckCircle2 size={14} color="#b4ff04" />
                    ) : (
                      <AlertCircle size={14} color={venuePhotos.length > 0 ? '#f59e0b' : '#94a3b8'} />
                    )}
                    <span>
                      {venuePhotos.length === 0 && '尚未上傳（至少 4 張，至多 10 張）'}
                      {venuePhotos.length > 0 && venuePhotos.length < 4 && `已選 ${venuePhotos.length} / 10 張（還差 ${4 - venuePhotos.length} 張）`}
                      {venuePhotos.length >= 4 && venuePhotos.length < 10 && `已選 ${venuePhotos.length} / 10 張（已達標，可再新增 ${10 - venuePhotos.length} 張）`}
                      {venuePhotos.length === 10 && '已選 10 / 10 張（已達上限）'}
                    </span>
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                  gap: '22px',
                  alignItems: 'start'
                }}>
                  {/* 左側：首頁圖 */}
                  <div>
                    <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#e2e8f0', marginBottom: '4px' }}>
                      首頁圖 <span style={{ color: '#ef4444' }}>*</span>
                      <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#94a3b8', marginLeft: '8px' }}>1 張・顯示於首頁場館卡片</span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '10px' }}>
                      請選一張最能代表場館的照片作為封面
                    </div>

                    {coverPhoto ? (
                      <div style={{
                        position: 'relative',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border: '2px solid #b4ff04',
                        aspectRatio: '4 / 3',
                        background: '#0d131f'
                      }}>
                        <img src={coverPhoto.preview} alt="首頁圖" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        <div style={{
                          position: 'absolute', top: '8px', left: '8px',
                          background: '#b4ff04', color: '#0a1402', fontSize: '11px', fontWeight: 900,
                          padding: '2px 8px', borderRadius: '5px'
                        }}>
                          首頁圖
                        </div>
                        <div style={{ position: 'absolute', top: '8px', right: '8px', display: 'flex', gap: '6px' }}>
                          <button
                            type="button"
                            onClick={() => coverInputRef.current && coverInputRef.current.click()}
                            style={{ background: 'rgba(0,0,0,0.75)', border: 'none', borderRadius: '6px', color: '#fff', fontSize: '11.5px', fontWeight: 700, padding: '4px 8px', cursor: 'pointer' }}
                          >
                            更換
                          </button>
                          <button
                            type="button"
                            onClick={removeCover}
                            title="刪除首頁圖"
                            style={{ background: 'rgba(0,0,0,0.75)', border: 'none', borderRadius: '6px', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
                          >
                            <Trash2 size={13} color="#ef4444" />
                          </button>
                        </div>
                        <div style={{
                          position: 'absolute', bottom: 0, left: 0, right: 0,
                          background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
                          padding: '14px 10px 6px', fontSize: '11px', color: '#e2e8f0',
                          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                        }}>
                          {coverPhoto.name}
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => coverInputRef.current && coverInputRef.current.click()}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                            setCoverFromFile(e.dataTransfer.files[0]);
                          }
                        }}
                        style={{
                          border: '2px dashed #243248',
                          borderRadius: '12px',
                          aspectRatio: '4 / 3',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                          cursor: 'pointer',
                          background: '#121927',
                          padding: '16px'
                        }}
                      >
                        <ImageIcon size={32} color="#64748b" style={{ marginBottom: '10px' }} />
                        <div style={{ fontSize: '14px', color: '#cbd5e1', fontWeight: 700 }}>點擊上傳首頁圖</div>
                        <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>支援 JPG、PNG、WEBP，僅 1 張</div>
                      </div>
                    )}
                    <input
                      ref={coverInputRef}
                      type="file"
                      accept="image/png, image/jpeg, image/webp"
                      onChange={handleCoverUpload}
                      style={{ display: 'none' }}
                    />
                  </div>

                  {/* 右側：場館／器材照片 */}
                  <div>
                    <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#e2e8f0', marginBottom: '4px' }}>
                      場館／器材照片 <span style={{ color: '#ef4444' }}>*</span>
                      <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#94a3b8', marginLeft: '8px' }}>4～10 張・查看場館時的照片牆</span>
                    </div>
                    <div style={{ height: '16px' }} />
                  {/* Upload Zone */}
                  <div
                    onClick={() => {
                      if (venuePhotos.length < 10 && photoInputRef.current) {
                        photoInputRef.current.click();
                      }
                    }}
                    style={{
                      border: `2px dashed ${venuePhotos.length >= 10 ? '#334155' : '#243248'}`,
                      borderRadius: '12px',
                      padding: '26px 20px',
                      textAlign: 'center',
                      cursor: venuePhotos.length >= 10 ? 'default' : 'pointer',
                      background: venuePhotos.length >= 10 ? '#0d131f' : '#121927',
                      transition: 'all 0.2s ease',
                      opacity: venuePhotos.length >= 10 ? 0.8 : 1
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                        processNewPhotos(Array.from(e.dataTransfer.files));
                      }
                    }}
                  >
                    <ImageIcon size={32} color={venuePhotos.length >= 10 ? '#475569' : '#64748b'} style={{ margin: '0 auto 10px' }} />
                    <div style={{ fontSize: '14px', color: venuePhotos.length >= 10 ? '#94a3b8' : '#cbd5e1', fontWeight: 700 }}>
                      {venuePhotos.length >= 10 ? '已達 10 張照片上限' : '點擊上傳或拖曳場館／器材照片至此'}
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
                      {venuePhotos.length >= 10 
                        ? '如需更換照片，請點擊下方預覽圖右上角的垃圾桶圖示刪除' 
                        : `支援 JPG、PNG、WEBP，至少 4 張，至多 10 張（目前 ${venuePhotos.length} / 10）`}
                    </div>
                    <input
                      ref={photoInputRef}
                      type="file"
                      multiple
                      accept="image/png, image/jpeg, image/webp"
                      disabled={venuePhotos.length >= 10}
                      onChange={handlePhotoUpload}
                      onClick={(e) => e.stopPropagation()}
                      style={{ display: 'block', margin: '14px auto 0', color: '#94a3b8', fontSize: '12px' }}
                    />
                  </div>

                  {/* Photo Previews Grid */}
                  {venuePhotos.length > 0 && (
                    <div style={{ marginTop: '16px' }}>
                      <div style={{
                        fontSize: '12.5px',
                        fontWeight: 700,
                        marginBottom: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '8px'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: venuePhotos.length >= 4 ? '#b4ff04' : '#f59e0b'
                        }}>
                          {venuePhotos.length >= 4 ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                          <span>
                            已選取 {venuePhotos.length} / 10 張照片
                            {venuePhotos.length < 4 && `（還需 ${4 - venuePhotos.length} 張才可提交）`}
                          </span>
                        </div>
                      </div>

                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                        gap: '12px'
                      }}>
                        {venuePhotos.map((photo, idx) => (
                          <div
                            key={idx}
                            style={{
                              position: 'relative',
                              borderRadius: '10px',
                              overflow: 'hidden',
                              border: '1px solid #243248',
                              background: '#0d131f',
                              aspectRatio: '4 / 3'
                            }}
                          >
                            <img
                              src={photo.preview}
                              alt={photo.name}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => removePhoto(idx)}
                              title="刪除照片"
                              style={{
                                position: 'absolute',
                                top: '6px',
                                right: '6px',
                                background: 'rgba(0, 0, 0, 0.75)',
                                border: 'none',
                                borderRadius: '6px',
                                color: '#ef4444',
                                cursor: 'pointer',
                                padding: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.15s ease'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.9)'}
                              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.75)'}
                            >
                              <Trash2 size={13} color="#fff" />
                            </button>
                            <div style={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              right: 0,
                              background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
                              padding: '4px 6px',
                              fontSize: '10.5px',
                              color: '#e2e8f0',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}>
                              {idx + 1}. {photo.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  </div>
                </div>
              </div>

              {/* SECTION 7: 合作條款 */}
              <div style={{
                background: '#0a0f1a',
                padding: '24px',
                borderRadius: '16px',
                border: isAgreedTerms ? '1px solid rgba(180, 255, 4, 0.4)' : '1px solid #192336',
                boxShadow: isAgreedTerms ? '0 0 20px rgba(180, 255, 4, 0.08)' : 'none',
                transition: 'all 0.2s ease'
              }}>
                <div style={{
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                        7. 合作條款
                      </h3>
                      <span style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        color: isAgreedTerms ? '#b4ff04' : '#ef4444'
                      }}>
                        必簽署 *
                      </span>
                    </div>
                    <div style={{ fontSize: '12.5px', color: '#94a3b8', marginTop: '6px' }}>
                      為保障雙方權益與場地安全，請點擊查閱並同意《GYMspot 合作場館服務條款 V1.0》
                    </div>
                  </div>

                  {/* Status Text */}
                  <div style={{
                    fontSize: '12.5px',
                    fontWeight: 700,
                    color: isAgreedTerms ? '#b4ff04' : '#ef4444',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <span>{isAgreedTerms ? '已完成條款簽署' : '尚未同意合作條款'}</span>
                  </div>
                </div>

                {/* Terms Action Block */}
                <div style={{
                  background: '#121927',
                  border: '1px solid #243248',
                  borderRadius: '12px',
                  padding: '18px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '14px'
                }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc' }}>
                      《GYMspot 合作場館服務條款 V1.0》
                    </div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
                      {isAgreedTerms 
                        ? `已於 ${agreedTermsTimestamp} 完成線上詳閱並簽署同意`
                        : '點擊右方按鈕查閱條款，需滑動滾輪至最下方才可點擊「同意」'}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleOpenTermsModal}
                    style={{
                      background: isAgreedTerms ? 'transparent' : 'linear-gradient(135deg, #b4ff04 0%, #8ce000 100%)',
                      color: isAgreedTerms ? '#b4ff04' : '#0a1402',
                      border: isAgreedTerms ? '1px solid #b4ff04' : 'none',
                      borderRadius: '10px',
                      padding: '10px 22px',
                      fontSize: '13.5px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: isAgreedTerms ? 'none' : '0 4px 14px rgba(180, 255, 4, 0.35)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span>{isAgreedTerms ? '重新查閱條款' : '點擊查閱條款'}</span>
                  </button>
                </div>
              </div>

              {/* Submit Buttons */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '14px',
                paddingTop: '10px'
              }}>
                <button
                  type="button"
                  onClick={onNavigateHome}
                  style={{
                    background: '#1e293b',
                    color: '#cbd5e1',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '14px 24px',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#334155'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#1e293b'}
                >
                  取消返回
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting || !isAgreedTerms}
                  title={!isAgreedTerms ? '請先點擊第 8 點查閱並同意合作條款' : '提交'}
                  style={{
                    background: isAgreedTerms
                      ? 'linear-gradient(135deg, #b4ff04 0%, #8ce000 100%)'
                      : '#1a2333',
                    color: isAgreedTerms ? '#0a1402' : '#64748b',
                    border: isAgreedTerms ? 'none' : '1px solid #243248',
                    borderRadius: '12px',
                    padding: '14px 40px',
                    fontSize: '15px',
                    fontWeight: 900,
                    cursor: (isSubmitting || !isAgreedTerms) ? 'not-allowed' : 'pointer',
                    boxShadow: isAgreedTerms ? '0 4px 18px rgba(180, 255, 4, 0.45)' : 'none',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    opacity: isAgreedTerms ? 1 : 0.55
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner" style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid #0a1402',
                        borderTopColor: 'transparent',
                        borderRadius: '50%',
                        display: 'inline-block',
                        animation: 'spin 0.8s linear infinite'
                      }} />
                      提交中...
                    </>
                  ) : (
                    '提交'
                  )}
                </button>
              </div>

            </form>
          </div>
        )}
      </div>

      {/* Footer (Multi-Column Horizontal Layout with Stacked Policies) */}
      <LegalFooter
        onNavigateHome={onNavigateHome}
        onNavigate={(path) => onOpenTerms(path)}
      />
      <AntiFraudModal isOpen={isAntiFraudOpen} onClose={() => setIsAntiFraudOpen(false)} />

      {/* SECTION 7: 合作條款閱讀與簽署彈窗 (Modal) */}
      {isTermsModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2500,
            background: 'rgba(5, 8, 15, 0.88)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setIsTermsModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '740px',
              maxHeight: '86vh',
              background: '#0d131f',
              border: '1px solid #243248',
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85)',
              overflow: 'hidden'
            }}
          >
            {/* Modal Header */}
            <div style={{
              padding: '20px 26px',
              borderBottom: '1px solid #1e293b',
              background: '#0a0f1a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 900, color: '#f8fafc', margin: 0 }}>
                  肌動組 GYMspot · 特約場館入駐合作規範
                </h3>
                <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
                  請向下滾動閱讀完整條款，滑動至最下方方可啟用「我已詳閱並同意」
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsTermsModalOpen(false)}
                title="關閉"
                style={{
                  background: '#192336',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.15s ease'
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Scrollable Content Box (白底黑字正式條款排版 — GYMspot 合作場館服務條款 V1.0) */}
            <div
              ref={termsScrollRef}
              onScroll={handleTermsScroll}
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '28px 32px',
                fontSize: '14.5px',
                color: '#1f2937',
                lineHeight: 1.85,
                background: '#ffffff'
              }}
            >
              <VenueTermsContent />

              {/* End of Document marker */}
              <div style={{
                textAlign: 'center',
                padding: '18px 0 8px',
                marginTop: '24px',
                borderTop: '1px dashed #d1d5db',
                color: hasScrolledToBottom ? '#15803d' : '#6b7280',
                fontSize: '13px',
                fontWeight: 800
              }}>
                {hasScrolledToBottom 
                  ? '✓ 已閱讀至條款最底部，您現在可以點擊下方「我已詳閱並同意合作條款」按鈕'
                  : '請向下滾動閱讀至條款最底部以啟用同意按鈕'}
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: '16px 26px',
              borderTop: '1px solid #1e293b',
              background: '#0a0f1a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              flexWrap: 'wrap'
            }}>
              <div style={{ fontSize: '12.5px', color: hasScrolledToBottom ? '#b4ff04' : '#94a3b8' }}>
                {hasScrolledToBottom ? '✓ 已完整閱讀全部條款' : '⚠️ 需滑動至最下方才可啟用同意按鈕'}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsTermsModalOpen(false)}
                  style={{
                    background: '#1e293b',
                    color: '#cbd5e1',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '10px 18px',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  取消
                </button>

                <button
                  type="button"
                  disabled={!hasScrolledToBottom}
                  onClick={handleAgreeTerms}
                  style={{
                    background: hasScrolledToBottom 
                      ? 'linear-gradient(135deg, #b4ff04 0%, #8ce000 100%)' 
                      : '#192336',
                    color: hasScrolledToBottom ? '#0a1402' : '#64748b',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '10px 24px',
                    fontSize: '13.5px',
                    fontWeight: 900,
                    cursor: hasScrolledToBottom ? 'pointer' : 'not-allowed',
                    boxShadow: hasScrolledToBottom ? '0 4px 14px rgba(180, 255, 4, 0.4)' : 'none',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Check size={16} />
                  <span>我已詳閱並同意合作條款</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
