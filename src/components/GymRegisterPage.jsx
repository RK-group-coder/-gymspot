import React, { useState } from 'react';
import { 
  Building2, 
  FileSpreadsheet, 
  Upload, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink,
  Dumbbell,
  Phone,
  MessageSquare,
  Mail
} from 'lucide-react';
import confetti from 'canvas-confetti';

const TAIWAN_CITIES = [
  '台北市', '新北市', '基隆市', '桃園市', '新竹市', '新竹縣', 
  '苗栗縣', '台中市', '彰化縣', '南投縣', '雲林縣', '嘉義市', 
  '嘉義縣', '台南市', '高雄市', '屏東縣', '宜蘭縣', '花蓮縣', '台東縣'
];

export default function GymRegisterPage({ onNavigateHome, onOpenTerms, onRegisterSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    city: '台北市',
    district: '',
    address: '',
    nearMrt: '',
    phone: '',
    lineId: '',
    igHandle: '',
    coverImage: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=900&auto=format&fit=crop',
    offPeakPerHour: 160,
    peakPerHour: 240,
    peakHoursRange: '平日 18:00 - 22:00',
    studentCleanFee: 0,
    cleanFeeDesc: '免收學員人頭清潔費',
    packageDealText: '10小時 $1,500 / 30小時 $4,200',
    squatRacksCount: 4,
    turfZone: true,
    turfLength: '12米專用功能衝刺草皮',
    eleikoPlates: true,
    dumbbellsMaxKg: 50,
    privateRoom: true,
    showerAvailable: true,
    freeParking: false,
    certRequired: '需具備合格國際體適能證照 (ACE / NASM / ACSM / NSCA)',
    verifiedDoc: '營利事業登記證、消防安檢審查、公共意外責任險證明'
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);
  const [submittedGymData, setSubmittedGymData] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
      const newGym = {
        id: `gym-reg-${Date.now()}`,
        name: formData.name || '新進駐場租健身房',
        brand: formData.brand || formData.name,
        city: formData.city,
        district: formData.district || '市區',
        address: formData.address || `${formData.city}${formData.district}`,
        nearMrt: formData.nearMrt || '鄰近大眾交通站點',
        lat: 25.0400 + (Math.random() - 0.5) * 0.05,
        lng: 121.5400 + (Math.random() - 0.5) * 0.05,
        rating: 5.0,
        reviewCount: 1,
        phone: formData.phone || '02-8888-9999',
        lineId: formData.lineId || '@new_gym',
        igHandle: formData.igHandle || 'gym.tw',
        coverImage: formData.coverImage,
        pricing: {
          offPeakPerHour: Number(formData.offPeakPerHour) || 160,
          peakPerHour: Number(formData.peakPerHour) || 240,
          studentCleanFee: Number(formData.studentCleanFee) || 0,
          cleanFeeDesc: formData.cleanFeeDesc,
          peakHoursRange: formData.peakHoursRange,
          offPeakHoursRange: '除尖峰外皆為離峰時段',
          packageDeals: [
            { hours: 10, price: Math.round(Number(formData.offPeakPerHour) * 9.5), note: '95折優惠' },
            { hours: 30, price: Math.round(Number(formData.offPeakPerHour) * 27), note: '9折優惠' }
          ]
        },
        equipment: {
          squatRacksCount: Number(formData.squatRacksCount) || 4,
          turfZone: formData.turfZone,
          turfLength: formData.turfLength,
          eleikoPlates: formData.eleikoPlates,
          dumbbellsMaxKg: Number(formData.dumbbellsMaxKg) || 50,
          privateRoom: formData.privateRoom,
          showerAvailable: formData.showerAvailable,
          freeWater: true,
          freeParking: formData.freeParking
        },
        requirements: {
          certRequired: formData.certRequired,
          cprRequired: true,
          indoorShoesOnly: true,
          insuranceIncluded: '已投保公共意外責任險',
          cancellationPolicy: '開課前 6 小時可線上取消'
        },
        tags: [
          `深蹲架${formData.squatRacksCount}座`,
          formData.turfZone ? '有衝刺草皮' : '',
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
      brand: '',
      city: '台北市',
      district: '',
      address: '',
      nearMrt: '',
      phone: '',
      lineId: '',
      igHandle: '',
      coverImage: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=900&auto=format&fit=crop',
      offPeakPerHour: 160,
      peakPerHour: 240,
      peakHoursRange: '平日 18:00 - 22:00',
      studentCleanFee: 0,
      cleanFeeDesc: '免收學員人頭清潔費',
      packageDealText: '10小時 $1,500 / 30小時 $4,200',
      squatRacksCount: 4,
      turfZone: true,
      turfLength: '12米專用功能衝刺草皮',
      eleikoPlates: true,
      dumbbellsMaxKg: 50,
      privateRoom: true,
      showerAvailable: true,
      freeParking: false,
      certRequired: '需具備合格國際體適能證照 (ACE / NASM / ACSM / NSCA)',
      verifiedDoc: '營利事業登記證、消防安檢審查、公共意外責任險證明'
    });
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
              <div style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '6px' }}>
                📍 {submittedGymData.city} {submittedGymData.district} · {submittedGymData.address}
              </div>
              <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '8px' }}>
                🚇 {submittedGymData.nearMrt}
              </div>
              <div style={{ display: 'flex', gap: '16px', fontSize: '13px', paddingTop: '8px', borderTop: '1px solid #192335' }}>
                <div>離峰每小時：<strong style={{ color: '#b4ff04' }}>NT$ {submittedGymData.pricing.offPeakPerHour}</strong></div>
                <div>尖峰每小時：<strong style={{ color: '#ffffff' }}>NT$ {submittedGymData.pricing.peakPerHour}</strong></div>
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

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '16px' }}>
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
                      品牌 / 體系簡稱
                    </label>
                    <input
                      type="text"
                      name="brand"
                      placeholder="例如：Forge Fitness"
                      value={formData.brand}
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

                <div style={{ display: 'grid', gridTemplateColumns: '140px 160px 1fr', gap: '12px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                      所在城市 <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        background: '#121927',
                        border: '1px solid #243248',
                        borderRadius: '10px',
                        padding: '11px 12px',
                        color: '#fff',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    >
                      {TAIWAN_CITIES.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                      行政區 <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="district"
                      required
                      placeholder="例如：大安區"
                      value={formData.district}
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
                      鄰近捷運 / 地標描述
                    </label>
                    <input
                      type="text"
                      name="nearMrt"
                      placeholder="例如：捷運忠孝敦化站步行 3 分鐘"
                      value={formData.nearMrt}
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

              {/* SECTION 2: 場租報價單 */}
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
                    <FileSpreadsheet size={18} color="#ffffff" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                      2. 場租報價單設定 (公開透明比價)
                    </h3>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                      公開清楚的計費與包套優惠，能顯著提高自由教練挑選預約的意願
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#b4ff04', marginBottom: '6px', fontWeight: 800 }}>
                      離峰每小時場租 (NT$) <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="number"
                      name="offPeakPerHour"
                      required
                      value={formData.offPeakPerHour}
                      onChange={handleChange}
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
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#f8fafc', marginBottom: '6px', fontWeight: 800 }}>
                      尖峰每小時場租 (NT$) <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="number"
                      name="peakPerHour"
                      required
                      value={formData.peakPerHour}
                      onChange={handleChange}
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
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                      學員清潔費 (0 代表免收)
                    </label>
                    <input
                      type="number"
                      name="studentCleanFee"
                      value={formData.studentCleanFee}
                      onChange={handleChange}
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
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                      尖峰時段定義
                    </label>
                    <input
                      type="text"
                      name="peakHoursRange"
                      value={formData.peakHoursRange}
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
                      包套優惠備註
                    </label>
                    <input
                      type="text"
                      name="packageDealText"
                      placeholder="例如：10小時 $1,500 / 30小時 $4,200"
                      value={formData.packageDealText}
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

              {/* SECTION 3: 器材與環境規格 */}
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
                    <Dumbbell size={18} color="#b4ff04" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                      3. 器材規格與設施
                    </h3>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                      勾選您場館具備的硬體優勢，教練可精準按規格檢索
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                      深蹲架數量 (座)
                    </label>
                    <input
                      type="number"
                      name="squatRacksCount"
                      value={formData.squatRacksCount}
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
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                      啞鈴最大重量 (KG)
                    </label>
                    <input
                      type="number"
                      name="dumbbellsMaxKg"
                      value={formData.dumbbellsMaxKg}
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
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 14px',
                    background: formData.turfZone ? 'rgba(180, 255, 4, 0.08)' : '#121927',
                    border: formData.turfZone ? '1px solid rgba(180, 255, 4, 0.35)' : '1px solid #243248',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#e2e8f0',
                    transition: 'all 0.15s ease'
                  }}>
                    <input
                      type="checkbox"
                      name="turfZone"
                      checked={formData.turfZone}
                      onChange={handleChange}
                      style={{ accentColor: '#b4ff04', width: '16px', height: '16px' }}
                    />
                    <span>具備衝刺草皮區</span>
                  </label>

                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 14px',
                    background: formData.eleikoPlates ? 'rgba(180, 255, 4, 0.08)' : '#121927',
                    border: formData.eleikoPlates ? '1px solid rgba(180, 255, 4, 0.35)' : '1px solid #243248',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#e2e8f0',
                    transition: 'all 0.15s ease'
                  }}>
                    <input
                      type="checkbox"
                      name="eleikoPlates"
                      checked={formData.eleikoPlates}
                      onChange={handleChange}
                      style={{ accentColor: '#b4ff04', width: '16px', height: '16px' }}
                    />
                    <span>Eleiko 賽事級槓片</span>
                  </label>

                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 14px',
                    background: formData.privateRoom ? 'rgba(180, 255, 4, 0.08)' : '#121927',
                    border: formData.privateRoom ? '1px solid rgba(180, 255, 4, 0.35)' : '1px solid #243248',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#e2e8f0',
                    transition: 'all 0.15s ease'
                  }}>
                    <input
                      type="checkbox"
                      name="privateRoom"
                      checked={formData.privateRoom}
                      onChange={handleChange}
                      style={{ accentColor: '#b4ff04', width: '16px', height: '16px' }}
                    />
                    <span>獨立 VIP 私教包廂</span>
                  </label>

                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 14px',
                    background: formData.showerAvailable ? 'rgba(180, 255, 4, 0.08)' : '#121927',
                    border: formData.showerAvailable ? '1px solid rgba(180, 255, 4, 0.35)' : '1px solid #243248',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#e2e8f0',
                    transition: 'all 0.15s ease'
                  }}>
                    <input
                      type="checkbox"
                      name="showerAvailable"
                      checked={formData.showerAvailable}
                      onChange={handleChange}
                      style={{ accentColor: '#b4ff04', width: '16px', height: '16px' }}
                    />
                    <span>提供乾濕分離淋浴</span>
                  </label>

                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 14px',
                    background: formData.freeParking ? 'rgba(180, 255, 4, 0.08)' : '#121927',
                    border: formData.freeParking ? '1px solid rgba(180, 255, 4, 0.35)' : '1px solid #243248',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#e2e8f0',
                    transition: 'all 0.15s ease'
                  }}>
                    <input
                      type="checkbox"
                      name="freeParking"
                      checked={formData.freeParking}
                      onChange={handleChange}
                      style={{ accentColor: '#b4ff04', width: '16px', height: '16px' }}
                    />
                    <span>提供免費專屬車位</span>
                  </label>
                </div>
              </div>

              {/* SECTION 4: 證明文件審核 */}
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
                      4. 證明文件審核 (營利登記、消防與公共責任險)
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

              {/* SECTION 5: 聯絡資訊 */}
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
                      5. 場館聯繫管道 (方便教練預約對接)
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
