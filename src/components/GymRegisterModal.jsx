import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  MapPin, 
  FileSpreadsheet, 
  Upload, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function GymRegisterModal({ isOpen, onClose, onRegisterSuccess }) {
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
    turfLength: '12米專用功能草皮',
    eleikoPlates: true,
    dumbbellsMaxKg: 50,
    privateRoom: true,
    showerAvailable: true,
    freeParking: false,
    certRequired: '需具備合格四大國際認證體適能證照',
    verifiedDoc: '營利事業登記證、消防安檢審查、公共意外責任險證明'
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

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
      setUploadedFiles(files);
    }
  };

  const handleVerifyOnGoogleMaps = () => {
    const query = encodeURIComponent(formData.address || formData.name || '健身房');
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      // Create new gym record
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
          offPeakPerHour: Number(formData.offPeakPerHour) || 150,
          peakPerHour: Number(formData.peakPerHour) || 220,
          studentCleanFee: Number(formData.studentCleanFee) || 0,
          cleanFeeDesc: formData.cleanFeeDesc,
          peakHoursRange: formData.peakHoursRange,
          offPeakHoursRange: '除尖峰外皆為離峰時段',
          packageDeals: [
            { hours: 10, price: Number(formData.offPeakPerHour) * 9.5, note: '95折優惠' },
            { hours: 30, price: Number(formData.offPeakPerHour) * 27, note: '9折優惠' }
          ]
        },
        equipment: {
          squatRacksCount: Number(formData.squatRacksCount) || 3,
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
          formData.studentCleanFee === 0 ? '免學員費' : '',
          '新進駐特約'
        ].filter(Boolean),
        isVerified: true,
        isFeatured: false,
        verifiedDoc: formData.verifiedDoc
      };

      // Confetti burst
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      onRegisterSuccess(newGym);
      setIsSubmitting(false);
      onClose();
    }, 700);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 2100,
      background: 'rgba(5, 8, 15, 0.88)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }} onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#111827',
          border: '1px solid #243248',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '780px',
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.75)',
          position: 'relative',
          padding: '28px'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(17, 24, 39, 0.8)',
            border: '1px solid #374151',
            color: '#cbd5e1',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '22px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(180, 255, 4, 0.12)', color: '#b4ff04', fontSize: '12px', fontWeight: 700, padding: '4px 10px', borderRadius: '9999px', marginBottom: '8px' }}>
            <Sparkles size={14} /> 第一波免費入駐審核申請
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#f8fafc', marginBottom: '6px' }}>
            健身房 / 工作室「場租服務」登記上架
          </h2>
          <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.5 }}>
            提交您的場館地址、核驗證明文件與場租報價表，審核通過後即時在 <strong style={{ color: '#ffffff', textShadow: '0 0 6px rgba(255, 255, 255, 0.6)' }}>Google Maps 場租地圖</strong> 上線，免費吸引全台自由教練進駐帶課！
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* STEP 1: 基本資料與地址 */}
          <div style={{ background: '#0d131f', padding: '18px', borderRadius: '14px', border: '1px solid #1e293b' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Building2 size={18} color="#b4ff04" />
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                1. 場館資訊與 Google Maps 地址
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                  場館全名 *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="例如：Forge 鍛造體能運動空間"
                  value={formData.name}
                  onChange={handleChange}
                  style={{ width: '100%', background: '#141c2c', border: '1px solid #243248', borderRadius: '8px', padding: '9px 12px', color: '#fff', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                  品牌 / 體系簡稱
                </label>
                <input
                  type="text"
                  name="brand"
                  placeholder="例如：Forge Fitness"
                  value={formData.brand}
                  onChange={handleChange}
                  style={{ width: '100%', background: '#141c2c', border: '1px solid #243248', borderRadius: '8px', padding: '9px 12px', color: '#fff', fontSize: '13px' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '120px 140px 1fr', gap: '10px', marginBottom: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                  所在城市 *
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  style={{ width: '100%', background: '#141c2c', border: '1px solid #243248', borderRadius: '8px', padding: '9px 10px', color: '#fff', fontSize: '13px' }}
                >
                  <option value="台北市">台北市</option>
                  <option value="新北市">新北市</option>
                  <option value="台中市">台中市</option>
                  <option value="高雄市">高雄市</option>
                  <option value="桃園市">桃園市</option>
                  <option value="台南市">台南市</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                  行政區 *
                </label>
                <input
                  type="text"
                  name="district"
                  required
                  placeholder="例如：大安區"
                  value={formData.district}
                  onChange={handleChange}
                  style={{ width: '100%', background: '#141c2c', border: '1px solid #243248', borderRadius: '8px', padding: '9px 12px', color: '#fff', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                  鄰近捷運 / 地標
                </label>
                <input
                  type="text"
                  name="nearMrt"
                  placeholder="例如：捷運忠孝敦化站步行 3 分鐘"
                  value={formData.nearMrt}
                  onChange={handleChange}
                  style={{ width: '100%', background: '#141c2c', border: '1px solid #243248', borderRadius: '8px', padding: '9px 12px', color: '#fff', fontSize: '13px' }}
                />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '12px', color: '#cbd5e1', fontWeight: 600 }}>
                  詳細營業地址 (需與 Google 地圖商家一致) *
                </label>
                <button
                  type="button"
                  onClick={handleVerifyOnGoogleMaps}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#ffffff',
                    fontSize: '11px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <ExternalLink size={12} /> 在 Google Maps 上預覽
                </button>
              </div>
              <input
                type="text"
                name="address"
                required
                placeholder="例如：台北市大安區忠孝東路四段 181 巷 35 號 B1"
                value={formData.address}
                onChange={handleChange}
                style={{ width: '100%', background: '#141c2c', border: '1px solid #243248', borderRadius: '8px', padding: '9px 12px', color: '#fff', fontSize: '13px' }}
              />
            </div>
          </div>

          {/* STEP 2: 場租報價單 */}
          <div style={{ background: '#0d131f', padding: '18px', borderRadius: '14px', border: '1px solid #1e293b' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <FileSpreadsheet size={18} color="#ffffff" style={{ filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.7))' }} />
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                2. 場租報價單設定 (公開透明比價)
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#b4ff04', marginBottom: '6px', fontWeight: 700 }}>
                  離峰每小時場租 (NT$) *
                </label>
                <input
                  type="number"
                  name="offPeakPerHour"
                  required
                  value={formData.offPeakPerHour}
                  onChange={handleChange}
                  style={{ width: '100%', background: '#141c2c', border: '1px solid #243248', borderRadius: '8px', padding: '9px 12px', color: '#fff', fontSize: '15px', fontWeight: 700 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#f8fafc', marginBottom: '6px', fontWeight: 700 }}>
                  尖峰每小時場租 (NT$) *
                </label>
                <input
                  type="number"
                  name="peakPerHour"
                  required
                  value={formData.peakPerHour}
                  onChange={handleChange}
                  style={{ width: '100%', background: '#141c2c', border: '1px solid #243248', borderRadius: '8px', padding: '9px 12px', color: '#fff', fontSize: '15px', fontWeight: 700 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                  學員清潔費 (0 代表免收)
                </label>
                <input
                  type="number"
                  name="studentCleanFee"
                  value={formData.studentCleanFee}
                  onChange={handleChange}
                  style={{ width: '100%', background: '#141c2c', border: '1px solid #243248', borderRadius: '8px', padding: '9px 12px', color: '#fff', fontSize: '14px' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                  尖峰時段定義
                </label>
                <input
                  type="text"
                  name="peakHoursRange"
                  value={formData.peakHoursRange}
                  onChange={handleChange}
                  style={{ width: '100%', background: '#141c2c', border: '1px solid #243248', borderRadius: '8px', padding: '9px 12px', color: '#fff', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                  包套優惠備註
                </label>
                <input
                  type="text"
                  name="packageDealText"
                  placeholder="例如：買20小時送2小時"
                  value={formData.packageDealText}
                  onChange={handleChange}
                  style={{ width: '100%', background: '#141c2c', border: '1px solid #243248', borderRadius: '8px', padding: '9px 12px', color: '#fff', fontSize: '13px' }}
                />
              </div>
            </div>
          </div>

          {/* STEP 3: 器材與環境勾選 */}
          <div style={{ background: '#0d131f', padding: '18px', borderRadius: '14px', border: '1px solid #1e293b' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#f8fafc', marginBottom: '12px' }}>
              3. 器材規格與設施
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#e2e8f0', cursor: 'pointer' }}>
                <input type="checkbox" name="turfZone" checked={formData.turfZone} onChange={handleChange} />
                <span>具備衝刺草皮區</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#e2e8f0', cursor: 'pointer' }}>
                <input type="checkbox" name="eleikoPlates" checked={formData.eleikoPlates} onChange={handleChange} />
                <span>Eleiko 賽事級槓片</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#e2e8f0', cursor: 'pointer' }}>
                <input type="checkbox" name="privateRoom" checked={formData.privateRoom} onChange={handleChange} />
                <span>獨立 VIP 私教包廂</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#e2e8f0', cursor: 'pointer' }}>
                <input type="checkbox" name="showerAvailable" checked={formData.showerAvailable} onChange={handleChange} />
                <span>提供乾濕分離淋浴</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#e2e8f0', cursor: 'pointer' }}>
                <input type="checkbox" name="freeParking" checked={formData.freeParking} onChange={handleChange} />
                <span>提供免費專屬車位</span>
              </label>
            </div>
          </div>

          {/* STEP 4: 證明文件上傳 (營利事業登記證、消防、保險) */}
          <div style={{ background: '#0d131f', padding: '18px', borderRadius: '14px', border: '1px solid #1e293b' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <ShieldCheck size={18} color="#f59e0b" />
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                4. 證明文件審核 (營利登記、消防與公共責任險)
              </h3>
            </div>
            <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '12px' }}>
              為維護自由教練與學員安全，經審核合格後將獲得 <span style={{ color: '#b4ff04', fontWeight: 700 }}>「已查核認證標章」</span>，大幅提升教練預約意願。
            </p>

            <div style={{
              border: '2px dashed #243248',
              borderRadius: '10px',
              padding: '18px',
              textAlign: 'center',
              cursor: 'pointer',
              background: '#111827'
            }}>
              <Upload size={24} color="#64748b" style={{ margin: '0 auto 8px' }} />
              <div style={{ fontSize: '13px', color: '#cbd5e1', fontWeight: 600 }}>
                點擊上傳或拖曳文件檔案至此
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
                支援 PDF、JPG、PNG（營登執照、消防合格證明、公共意外責任險保單）
              </div>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                style={{ display: 'block', margin: '10px auto 0', color: '#94a3b8', fontSize: '12px' }}
              />
            </div>

            {uploadedFiles.length > 0 && (
              <div style={{ marginTop: '10px', fontSize: '12px', color: '#b4ff04', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={14} />
                <span>已選取 {uploadedFiles.length} 個憑證檔案：{uploadedFiles.join(', ')}</span>
              </div>
            )}
          </div>

          {/* STEP 5: 聯絡資訊 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                場館聯繫電話 *
              </label>
              <input
                type="text"
                name="phone"
                required
                placeholder="例如：02-2775-8899"
                value={formData.phone}
                onChange={handleChange}
                style={{ width: '100%', background: '#0d131f', border: '1px solid #243248', borderRadius: '8px', padding: '9px 12px', color: '#fff', fontSize: '13px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                場租專用 LINE ID (方便教練預約)
              </label>
              <input
                type="text"
                name="lineId"
                placeholder="例如：@gym_rental"
                value={formData.lineId}
                onChange={handleChange}
                style={{ width: '100%', background: '#0d131f', border: '1px solid #243248', borderRadius: '8px', padding: '9px 12px', color: '#fff', fontSize: '13px' }}
              />
            </div>
          </div>

          {/* Submit Action */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: '#1e293b',
                color: '#cbd5e1',
                border: 'none',
                borderRadius: '10px',
                padding: '12px 20px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              取消
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                background: 'linear-gradient(135deg, #b4ff04 0%, #8ce000 100%)',
                color: '#0a1402',
                border: 'none',
                borderRadius: '10px',
                padding: '12px 28px',
                fontSize: '14px',
                fontWeight: 900,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 14px rgba(180, 255, 4, 0.4)'
              }}
            >
              {isSubmitting ? '審核資料提交中...' : '立即提交入駐審核 (第一波免費)'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
