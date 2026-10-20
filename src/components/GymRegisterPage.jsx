import React, { useState, useMemo } from 'react';
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
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';

const TAIWAN_DISTRICTS = {
  '台北市': ['大安區', '信義區', '中山區', '中正區', '松山區', '內湖區', '士林區', '北投區', '南港區', '文山區', '萬華區', '大同區'],
  '新北市': ['板橋區', '中和區', '新莊區', '三重區', '永和區', '土城區', '汐止區', '新店區', '蘆洲區', '淡水區', '樹林區', '林口區', '三峽區', '五股區', '鶯歌區', '泰山區', '八里區', '瑞芳區', '深坑區', '三芝區', '萬里區', '金山區', '貢寮區', '石門區', '雙溪區', '石碇區', '坪林區', '平溪區', '烏來區'],
  '基隆市': ['仁愛區', '信義區', '中正區', '中山區', '安樂區', '暖暖區', '七堵區'],
  '桃園市': ['桃園區', '中壢區', '平鎮區', '八德區', '楊梅區', '蘆竹區', '大溪區', '龜山區', '大園區', '觀音區', '新屋區', '龍潭區', '復興區'],
  '新竹市': ['東區', '北區', '香山區'],
  '新竹縣': ['竹北市', '竹東鎮', '新埔鎮', '關西鎮', '湖口鄉', '新豐鄉', '芎林鄉', '橫山鄉', '北埔鄉', '寶山鄉', '峨眉鄉', '尖石鄉', '五峰鄉'],
  '苗栗縣': ['苗栗市', '頭份市', '竹南鎮', '後龍鎮', '通霄鎮', '苑裡鎮', '卓蘭鎮', '造橋鄉', '西湖鄉', '頭屋鄉', '公館鄉', '銅鑼鄉', '三義鄉', '大湖鄉', '獅潭鄉', '三灣鄉', '南庄鄉', '泰安鄉'],
  '台中市': ['西屯區', '北屯區', '南屯區', '北區', '西區', '中區', '東區', '南區', '豐原區', '大里區', '太平區', '清水區', '沙鹿區', '大甲區', '東勢區', '烏日區', '神岡區', '大雅區', '潭子區', '后里區', '霧峰區', '梧棲區', '龍井區', '大肚區', '外埔區', '大安區', '石岡區', '新社區', '和平區'],
  '彰化縣': ['彰化市', '員林市', '和美鎮', '鹿港鎮', '溪湖鎮', '二林鎮', '田中鎮', '北斗鎮', '花壇鄉', '芬園鄉', '大村鄉', '永靖鄉', '伸港鄉', '線西鄉', '福興鄉', '秀水鄉', '埔心鄉', '埔鹽鄉', '大城鄉', '芳苑鄉', '竹塘鄉', '社頭鄉', '二水鄉', '田尾鄉', '埤頭鄉', '溪州鄉'],
  '南投縣': ['南投市', '埔里鎮', '草屯鎮', '竹山鎮', '集集鎮', '名間鄉', '鹿谷鄉', '中寮鄉', '魚池鄉', '國姓鄉', '水里鄉', '信義鄉', '仁愛鄉'],
  '雲林縣': ['斗六市', '斗南鎮', '虎尾鎮', '西螺鎮', '土庫鎮', '北港鎮', '古坑鄉', '大埤鄉', '莿桐鄉', '林內鄉', '二崙鄉', '崙背鄉', '麥寮鄉', '東勢鄉', '褒忠鄉', '台西鄉', '元長鄉', '四湖鄉', '口湖鄉', '水林鄉'],
  '嘉義市': ['西區', '東區'],
  '嘉義縣': ['太保市', '朴子市', '布袋鎮', '大林鎮', '民雄鄉', '溪口鄉', '新港鄉', '六腳鄉', '東石鄉', '義竹鄉', '鹿草鄉', '水上鄉', '中埔鄉', '竹崎鄉', '梅山鄉', '番路鄉', '大埔鄉', '阿里山鄉'],
  '台南市': ['東區', '北區', '中西區', '安平區', '安南區', '永康區', '南區', '新營區', '善化區', '新市區', '歸仁區', '仁德區', '麻豆區', '佳里區', '白河區', '柳營區', '後壁區', '東山區', '下營區', '六甲區', '官田區', '大內區', '西港區', '七股區', '將軍區', '北門區', '學甲區', '鹽水區', '安定區', '山上區', '玉井區', '楠西區', '南化區', '左鎮區', '關廟區', '龍崎區'],
  '高雄市': ['左營區', '三民區', '鼓山區', '苓雅區', '前鎮區', '新興區', '前金區', '楠梓區', '小港區', '鳳山區', '鹽埕區', '旗津區', '仁武區', '大社區', '岡山區', '路竹區', '阿蓮區', '田寮區', '燕巢區', '橋頭區', '梓官區', '彌陀區', '永安區', '湖內區', '大寮區', '林園區', '鳥松區', '大樹區', '旗山區', '美濃區', '六龜區', '內門區', '杉林區', '甲仙區', '桃源區', '那瑪夏區', '茂林區', '茄萣區'],
  '屏東縣': ['屏東市', '潮州鎮', '東港鎮', '恆春鎮', '萬丹鄉', '長治鄉', '麟洛鄉', '九如鄉', '里港鄉', '鹽埔鄉', '高樹鄉', '萬巒鄉', '內埔鄉', '竹田鄉', '新埤鄉', '枋寮鄉', '新園鄉', '崁頂鄉', '林邊鄉', '南州鄉', '佳冬鄉', '琉球鄉', '車城鄉', '滿州鄉', '枋山鄉', '三地門鄉', '霧臺鄉', '瑪家鄉', '泰武鄉', '來義鄉', '春日鄉', '獅子鄉', '牡丹鄉'],
  '宜蘭縣': ['宜蘭市', '羅東鎮', '蘇澳鎮', '頭城鎮', '礁溪鄉', '壯圍鄉', '員山鄉', '冬山鄉', '五結鄉', '三星鄉', '大同鄉', '南澳鄉'],
  '花蓮縣': ['花蓮市', '吉安鄉', '新城鄉', '玉里鎮', '鳳林鎮', '壽豐鄉', '光復鄉', '豐濱鄉', '瑞穗鄉', '富里鄉', '秀林鄉', '萬榮鄉', '卓溪鄉'],
  '台東縣': ['台東市', '成功鎮', '關山鎮', '卑南鄉', '大武鄉', '太麻里鄉', '東河鄉', '長濱鄉', '鹿野鄉', '池上鄉', '綠島鄉', '延平鄉', '海端鄉', '達仁鄉', '金峰鄉', '蘭嶼鄉'],
  '澎湖縣': ['馬公市', '湖西鄉', '白沙鄉', '西嶼鄉', '望安鄉', '七美鄉'],
  '金門縣': ['金城鎮', '金湖鎮', '金沙鎮', '金寧鄉', '烈嶼鄉', '烏坵鄉'],
  '連江縣': ['南竿鄉', '北竿鄉', '莒光鄉', '東引鄉']
};

const TAIWAN_CITIES = Object.keys(TAIWAN_DISTRICTS);

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

// 每天 8:00 到 24:00，一小時一格，共 16 格
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

// 預設 8:00~24:00 全時段勾選
const getInitialSchedule = () => {
  const sched = {};
  for (let d = 1; d <= 7; d++) {
    for (let h = 8; h <= 23; h++) {
      sched[`${d}-${h}`] = true;
    }
  }
  return sched;
};

export default function GymRegisterPage({ onNavigateHome, onOpenTerms, onRegisterSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    city: '台北市',
    district: '大安區',
    address: '',
    phone: '',
    lineId: '',
    igHandle: '',
    coverImage: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=900&auto=format&fit=crop',
    hourlyRate: 200,
    studentCleanFee: 0,
    cleanFeeDesc: '免收學員人頭清潔費',
    certRequired: '需具備合格國際體適能證照 (ACE / NASM / ACSM / NSCA)',
    verifiedDoc: '營利事業登記證、消防安檢審查、公共意外責任險證明'
  });

  const [schedule, setSchedule] = useState(getInitialSchedule);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);
  const [submittedGymData, setSubmittedGymData] = useState(null);

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

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files).map(f => f.name);
      setUploadedFiles(prev => [...new Set([...prev, ...files])]);
    }
  };

  const handleVerifyOnGoogleMaps = () => {
    const query = encodeURIComponent(formData.address || `${formData.city} ${formData.name}` || '健身房');
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const hourlyPrice = Number(formData.hourlyRate) || 200;
      const newGym = {
        id: `gym-reg-${Date.now()}`,
        name: formData.name || '新進駐場租健身房',
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
        lineId: formData.lineId || '@new_gym',
        igHandle: formData.igHandle || 'gym.tw',
        coverImage: formData.coverImage,
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
          cancellationPolicy: '開課前 6 小時可線上取消'
        },
        tags: [
          Number(formData.studentCleanFee) === 0 ? '免學員費' : '',
          '第一波特約入駐'
        ].filter(Boolean),
        isVerified: true,
        isFeatured: true,
        verifiedDoc: formData.verifiedDoc
      };

      // Confetti burst
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 }
      });

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
      city: '台北市',
      district: '大安區',
      address: '',
      phone: '',
      lineId: '',
      igHandle: '',
      coverImage: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=900&auto=format&fit=crop',
      hourlyRate: 200,
      studentCleanFee: 0,
      cleanFeeDesc: '免收學員人頭清潔費',
      certRequired: '需具備合格國際體適能證照 (ACE / NASM / ACSM / NSCA)',
      verifiedDoc: '營利事業登記證、消防安檢審查、公共意外責任險證明'
    });
    setSchedule(getInitialSchedule());
    setUploadedFiles([]);
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
            提交您的場館地址、核驗證明文件與場租報價表，審核通過後即時在 <strong style={{ color: '#ffffff', textShadow: '0 0 8px rgba(255, 255, 255, 0.6)' }}>Google Maps 場租地圖</strong> 上線，免費吸引全台自由教練進駐帶課！
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'rgba(180, 255, 4, 0.1)',
                    border: '1px solid rgba(180, 255, 4, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Building2 size={18} color="#b4ff04" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                      1. 場館資訊與 Google Maps 地址
                    </h3>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                      請填寫與 Google 地圖商家一致的名稱與地址，方便教練比對導航
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'rgba(180, 255, 4, 0.1)',
                    border: '1px solid rgba(180, 255, 4, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <FileSpreadsheet size={18} color="#b4ff04" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                      2. 小時制場租費用與每週開放時段
                    </h3>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                      設定統一小時制場租收費，並在下方時間表格勾選可以場租的時段
                    </div>
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
                      placeholder="例如：200"
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
                    <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '5px' }}>
                      每小時公定場租費率（每小時一格計費）
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                      學員清潔費 (0 代表免收)
                    </label>
                    <input
                      type="number"
                      name="studentCleanFee"
                      value={formData.studentCleanFee ?? ''}
                      onChange={handleChange}
                      placeholder="0"
                      style={{
                        width: '100%',
                        background: '#121927',
                        border: '1px solid #243248',
                        borderRadius: '10px',
                        padding: '11px 14px',
                        color: '#fff',
                        fontSize: '15px',
                        fontWeight: 600,
                        outline: 'none'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#b4ff04'}
                      onBlur={(e) => e.target.style.borderColor = '#243248'}
                    />
                    <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '5px' }}>
                      若向學員酌收人頭清潔費可填寫，無則填 0
                    </div>
                  </div>
                </div>

                {/* SCHEDULE TABLE SECTION: 1 到 7，每天 8. 到 24. */}
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
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Calendar size={16} color="#b4ff04" />
                        <h4 style={{ fontSize: '14.5px', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                          每週開放時段勾選 (1 到 7，每天 8. 到 24.)
                        </h4>
                      </div>
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
                            時段 (8.-24.)
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
                                    title={`${d.name} ${slot.label}：${isChecked ? '可約場租 (點擊取消)' : '未開放 (點擊勾選)'}`}
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
                                      <span>{isChecked ? '可約' : '—'}</span>
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

              {/* SECTION 3: 證明文件審核 */}
              <div style={{
                background: '#0a0f1a',
                padding: '24px',
                borderRadius: '16px',
                border: '1px solid #192336'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'rgba(245, 158, 11, 0.12)',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <ShieldCheck size={18} color="#f59e0b" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                      3. 證明文件審核 (營利登記、消防與公共責任險)
                    </h3>
                  </div>
                </div>

                <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.5, marginBottom: '16px' }}>
                  為維護自由教練與學員安全，經審核合格後將獲得 <span style={{ color: '#b4ff04', fontWeight: 800 }}>「已查核認證標章」</span>，大幅提升教練預約意願。
                </p>

                <div style={{
                  border: '2px dashed #243248',
                  borderRadius: '12px',
                  padding: '28px 20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: '#121927',
                  transition: 'all 0.2s ease'
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                    const files = Array.from(e.dataTransfer.files).map(f => f.name);
                    setUploadedFiles(prev => [...new Set([...prev, ...files])]);
                  }
                }}
                >
                  <Upload size={32} color="#64748b" style={{ margin: '0 auto 10px' }} />
                  <div style={{ fontSize: '14px', color: '#cbd5e1', fontWeight: 700 }}>
                    點擊上傳或拖曳文件檔案至此
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
                    支援 PDF、JPG、PNG（營登執照、消防合格證明、公共意外責任險保單）
                  </div>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    style={{ display: 'block', margin: '14px auto 0', color: '#94a3b8', fontSize: '12px' }}
                  />
                </div>

                {uploadedFiles.length > 0 && (
                  <div style={{
                    marginTop: '14px',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    background: 'rgba(180, 255, 4, 0.08)',
                    border: '1px solid rgba(180, 255, 4, 0.25)',
                    fontSize: '13px',
                    color: '#b4ff04',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <CheckCircle2 size={16} />
                    <span>已選取 {uploadedFiles.length} 個憑證檔案：{uploadedFiles.join(', ')}</span>
                  </div>
                )}
              </div>

              {/* SECTION 4: 聯絡資訊 */}
              <div style={{
                background: '#0a0f1a',
                padding: '24px',
                borderRadius: '16px',
                border: '1px solid #192336'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Phone size={18} color="#ffffff" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                      4. 場館聯繫管道 (方便教練預約對接)
                    </h3>
                  </div>
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
                      場租專用 LINE ID (方便教練私訊)
                    </label>
                    <input
                      type="text"
                      name="lineId"
                      placeholder="例如：@gym_rental"
                      value={formData.lineId}
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
                  disabled={isSubmitting}
                  style={{
                    background: 'linear-gradient(135deg, #b4ff04 0%, #8ce000 100%)',
                    color: '#0a1402',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '14px 36px',
                    fontSize: '15px',
                    fontWeight: 900,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    boxShadow: '0 4px 18px rgba(180, 255, 4, 0.45)',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
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
                      審核資料提交中...
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      立即提交入駐審核 (第一波免費)
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{
        background: '#04060a',
        borderTop: '1px solid #1e293b',
        padding: '36px 24px'
      }}>
        <div style={{
          maxWidth: '920px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          textAlign: 'center'
        }}>
          <div 
            onClick={onNavigateHome}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
          >
            <img src="/brand-icon.png" alt="肌動組" style={{ height: '30px', width: 'auto', mixBlendMode: 'screen' }} />
            <span style={{ fontSize: '14px', fontWeight: 900, color: '#ffffff' }}>肌動組 GYMspot</span>
          </div>

          <div style={{
            display: 'flex',
            gap: '24px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            fontSize: '12.5px',
            color: '#94a3b8'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Mail size={13} color="#b4ff04" /> 客服信箱：contact@gymspot.tw
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MessageSquare size={13} color="#b4ff04" /> 官方 LINE 合作諮詢：@gymspot
            </span>
          </div>

          <div style={{
            display: 'flex',
            gap: '14px',
            fontSize: '11.5px',
            color: '#64748b'
          }}>
            <button
              onClick={onOpenTerms}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#64748b',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              服務條款與隱私權協議
            </button>
            <span>·</span>
            <span>© 2026 肌動組 GYMspot All Rights Reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
