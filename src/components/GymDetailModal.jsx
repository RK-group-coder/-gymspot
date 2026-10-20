import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Navigation, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  CheckCircle2, 
  FileSpreadsheet, 
  Clock, 
  Award, 
  Dumbbell, 
  Copy, 
  Check, 
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { buildGoogleMapsRouteUrl, formatDistance } from '../utils/geo';

export default function GymDetailModal({ gym, userLat, userLng, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!gym) return null;

  const googleRouteUrl = buildGoogleMapsRouteUrl(gym.address, userLat, userLng);
  const isFreeCleanFee = gym.pricing.studentCleanFee === 0;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(gym.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 2000,
      background: 'rgba(5, 8, 15, 0.85)',
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
          maxWidth: '840px',
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.75)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 20,
            background: 'rgba(17, 24, 39, 0.8)',
            border: '1px solid #374151',
            color: '#cbd5e1',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background 0.15s'
          }}
        >
          <X size={18} />
        </button>

        {/* Hero Banner Image */}
        <div style={{ position: 'relative', height: '240px', width: '100%' }}>
          <img
            src={gym.coverImage}
            alt={gym.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 20%, #111827 100%)'
          }} />

          {/* Badges on image */}
          <div style={{ position: 'absolute', bottom: '16px', left: '24px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {gym.isVerified && (
              <span style={{
                background: '#b4ff04',
                color: '#0a1402',
                fontSize: '12px',
                fontWeight: 900,
                padding: '4px 10px',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                boxShadow: '0 0 10px rgba(180, 255, 4, 0.4)'
              }}>
                <ShieldCheck size={14} /> 合格審核認證 (營登/消防/意外險)
              </span>
            )}
          </div>
        </div>

        {/* Modal Main Content */}
        <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* Header Title & Address */}
          <div>
            <div style={{ fontSize: '13px', color: '#ffffff', textShadow: '0 0 8px rgba(255, 255, 255, 0.6)', fontWeight: 800, marginBottom: '4px' }}>
              {gym.brand} · {gym.city} {gym.district}
            </div>
            <h2 style={{ fontSize: '26px', fontWeight: 900, color: '#f8fafc', lineHeight: 1.25, marginBottom: '8px' }}>
              {gym.name}
            </h2>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', color: '#94a3b8', fontSize: '13px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={15} color="#ffffff" style={{ filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.7))' }} />
                <span style={{ color: '#e2e8f0' }}>{gym.address}</span>
                <button
                  onClick={handleCopyAddress}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: copied ? '#b4ff04' : '#64748b',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px',
                    fontSize: '12px'
                  }}
                  title="複製地址"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copied ? '已複製' : '複製'}</span>
                </button>
              </div>

              <span>•</span>
              <span>{gym.nearMrt}</span>

              {gym.distanceKm !== undefined && (
                <>
                  <span>•</span>
                  <span style={{ color: '#ffffff', textShadow: '0 0 6px rgba(255, 255, 255, 0.6)', fontWeight: 800 }}>
                    距您約 {formatDistance(gym.distanceKm)}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* SECTION 1: Transparent Pricing Sheet (場租透明報價單) */}
          <div style={{
            background: '#0d131f',
            borderRadius: '16px',
            border: '1px solid #1e293b',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <FileSpreadsheet size={20} color="#b4ff04" />
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                場租透明報價表 (官方核定)
              </h3>
            </div>

            {/* Price Compare Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '14px',
              marginBottom: '16px'
            }}>
              {(gym.pricing.hourlyRate && gym.pricing.offPeakPerHour === gym.pricing.peakPerHour) ? (
                /* Unified Hourly Rate Card */
                <div style={{
                  background: 'linear-gradient(135deg, rgba(180, 255, 4, 0.08) 0%, #141c2c 100%)',
                  padding: '16px',
                  borderRadius: '12px',
                  border: '1px solid rgba(180, 255, 4, 0.4)'
                }}>
                  <div style={{ fontSize: '12px', color: '#b4ff04', fontWeight: 800, marginBottom: '4px' }}>
                    小時制場租 (全時段統一)
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '32px', fontWeight: 900, color: '#b4ff04' }}>
                      ${gym.pricing.hourlyRate}
                    </span>
                    <span style={{ fontSize: '13px', color: '#64748b' }}>/ hr</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                    <Clock size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    {gym.openSlotsCount ? `每週開放 ${gym.openSlotsCount} 個時段格 (8:00~24:00)` : (gym.pricing.offPeakHoursRange || '依開放課表預約')}
                  </div>
                </div>
              ) : (
                <>
                  {/* Off Peak */}
                  <div style={{
                    background: '#141c2c',
                    padding: '16px',
                    borderRadius: '12px',
                    border: '1px solid #243248'
                  }}>
                    <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600, marginBottom: '4px' }}>
                      離峰時段場租 (每小時)
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '8px' }}>
                      <span style={{ fontSize: '30px', fontWeight: 900, color: '#b4ff04' }}>
                        ${gym.pricing.offPeakPerHour}
                      </span>
                      <span style={{ fontSize: '13px', color: '#64748b' }}>/ hr</span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                      <Clock size={12} style={{ display: 'inline', marginRight: '4px' }} />
                      {gym.pricing.offPeakHoursRange}
                    </div>
                  </div>

                  {/* Peak */}
                  <div style={{
                    background: '#141c2c',
                    padding: '16px',
                    borderRadius: '12px',
                    border: '1px solid #243248'
                  }}>
                    <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600, marginBottom: '4px' }}>
                      尖峰時段場租 (每小時)
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '8px' }}>
                      <span style={{ fontSize: '28px', fontWeight: 800, color: '#f3f4f6' }}>
                        ${gym.pricing.peakPerHour}
                      </span>
                      <span style={{ fontSize: '13px', color: '#64748b' }}>/ hr</span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                      <Clock size={12} style={{ display: 'inline', marginRight: '4px' }} />
                      {gym.pricing.peakHoursRange}
                    </div>
                  </div>
                </>
              )}

              {/* Clean fee */}
              <div style={{
                background: isFreeCleanFee ? 'rgba(180, 255, 4, 0.12)' : '#141c2c',
                padding: '16px',
                borderRadius: '12px',
                border: isFreeCleanFee ? '1px solid rgba(180, 255, 4, 0.3)' : '1px solid #243248'
              }}>
                <div style={{ fontSize: '12px', color: isFreeCleanFee ? '#b4ff04' : '#94a3b8', fontWeight: 600, marginBottom: '4px' }}>
                  學員人頭清潔費
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '24px', fontWeight: 800, color: isFreeCleanFee ? '#b4ff04' : '#fbbf24' }}>
                    {isFreeCleanFee ? '完全免收費' : `$${gym.pricing.studentCleanFee} 元/次`}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                  {gym.pricing.cleanFeeDesc}
                </div>
              </div>
            </div>

            {/* Package Discounts */}
            {gym.pricing.packageDeals && gym.pricing.packageDeals.length > 0 && (
              <div>
                <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 700, marginBottom: '8px' }}>
                  💳 包套時數大宗方案 (更優惠)：
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                  {gym.pricing.packageDeals.map((deal, idx) => (
                    <div key={idx} style={{
                      background: '#111827',
                      border: '1px solid #1f2c42',
                      borderRadius: '10px',
                      padding: '10px 12px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 700, color: '#f8fafc', fontSize: '13px' }}>{deal.hours} 小時包套</span>
                        <span style={{ color: '#b4ff04', fontWeight: 800, fontSize: '14px' }}>${deal.price}</span>
                      </div>
                      <div style={{ fontSize: '11px', color: '#ffffff', opacity: 0.85, marginTop: '2px' }}>
                        {deal.note}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SECTION 2: Equipment & Amenities (器材設施規格) */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#f8fafc', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Dumbbell size={18} color="#ffffff" style={{ filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.7))' }} />
              器材規格與場館設施
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '10px'
            }}>
              <div style={{ background: '#0d131f', padding: '12px', borderRadius: '10px', border: '1px solid #1e293b' }}>
                <div style={{ fontSize: '11px', color: '#64748b' }}>深蹲架配備</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc', marginTop: '2px' }}>
                  共 {gym.equipment.squatRacksCount} 座 (充足不搶架)
                </div>
              </div>

              <div style={{ background: '#0d131f', padding: '12px', borderRadius: '10px', border: '1px solid #1e293b' }}>
                <div style={{ fontSize: '11px', color: '#64748b' }}>衝刺草皮區</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: gym.equipment.turfZone ? '#b4ff04' : '#94a3b8', marginTop: '2px' }}>
                  {gym.equipment.turfZone ? gym.equipment.turfLength : '無草皮區'}
                </div>
              </div>

              <div style={{ background: '#0d131f', padding: '12px', borderRadius: '10px', border: '1px solid #1e293b' }}>
                <div style={{ fontSize: '11px', color: '#64748b' }}>啞鈴最高重量</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc', marginTop: '2px' }}>
                  最高至 {gym.equipment.dumbbellsMaxKg} KG
                </div>
              </div>

              <div style={{ background: '#0d131f', padding: '12px', borderRadius: '10px', border: '1px solid #1e293b' }}>
                <div style={{ fontSize: '11px', color: '#64748b' }}>賽事槓鈴 Eleiko</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: gym.equipment.eleikoPlates ? '#fbbf24' : '#64748b', marginTop: '2px' }}>
                  {gym.equipment.eleikoPlates ? '有 (賽事專用槓)' : '一般商用標準槓'}
                </div>
              </div>

              <div style={{ background: '#0d131f', padding: '12px', borderRadius: '10px', border: '1px solid #1e293b' }}>
                <div style={{ fontSize: '11px', color: '#64748b' }}>獨立 VIP 包廂</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc', marginTop: '2px' }}>
                  {gym.equipment.privateRoom ? '具備獨立包廂' : '開放式公共區域'}
                </div>
              </div>

              <div style={{ background: '#0d131f', padding: '12px', borderRadius: '10px', border: '1px solid #1e293b' }}>
                <div style={{ fontSize: '11px', color: '#64748b' }}>衛浴淋浴 & 停車</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc', marginTop: '2px' }}>
                  {gym.equipment.showerAvailable ? '可淋浴' : '無淋浴'} · {gym.equipment.freeParking ? '附免費停車' : '鄰近收費停車'}
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: Compliance & Requirements (入場資格與場地規範) */}
          <div style={{
            background: '#0d131f',
            borderRadius: '14px',
            border: '1px solid #1e293b',
            padding: '16px'
          }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#cbd5e1', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} color="#b4ff04" />
              自由教練入場與退改規範
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#94a3b8' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={14} color="#b4ff04" style={{ flexShrink: 0 }} />
                <span><strong style={{ color: '#e2e8f0' }}>證照資格：</strong>{gym.requirements.certRequired}</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={14} color="#b4ff04" style={{ flexShrink: 0 }} />
                <span><strong style={{ color: '#e2e8f0' }}>安全急救：</strong>{gym.requirements.cprRequired ? '需備有有效 CPR+AED 證照' : '無特殊限制'}</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={14} color="#b4ff04" style={{ flexShrink: 0 }} />
                <span><strong style={{ color: '#e2e8f0' }}>場館投保：</strong>{gym.requirements.insuranceIncluded}</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={14} color="#b4ff04" style={{ flexShrink: 0 }} />
                <span><strong style={{ color: '#e2e8f0' }}>取消政策：</strong>{gym.requirements.cancellationPolicy}</span>
              </li>
            </ul>
          </div>

          {/* Action Footer: Route Navigation + Direct Contact */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            paddingTop: '12px',
            borderTop: '1px solid #1f2c42'
          }}>
            {/* Google Route */}
            <a
              href={googleRouteUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: '1 1 200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #b4ff04 0%, #8ce000 100%)',
                color: '#0a1402',
                textDecoration: 'none',
                borderRadius: '12px',
                padding: '12px 18px',
                fontWeight: 900,
                fontSize: '14px',
                boxShadow: '0 4px 14px rgba(180, 255, 4, 0.4)'
              }}
            >
              <Navigation size={18} />
              <span>Google Maps 一鍵路線導航</span>
            </a>

            {/* Line ID */}
            <a
              href={`https://line.me/R/ti/p/${encodeURIComponent(gym.lineId)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: '#06c755',
                color: '#ffffff',
                textDecoration: 'none',
                borderRadius: '12px',
                padding: '12px 18px',
                fontWeight: 700,
                fontSize: '14px'
              }}
            >
              <MessageCircle size={18} />
              <span>加 LINE 詢問 ({gym.lineId})</span>
            </a>

            {/* Phone */}
            <a
              href={`tel:${gym.phone}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: '#1e293b',
                color: '#f8fafc',
                textDecoration: 'none',
                borderRadius: '12px',
                padding: '12px 18px',
                fontWeight: 700,
                fontSize: '14px',
                border: '1px solid #334155'
              }}
            >
              <Phone size={18} color="#ffffff" />
              <span>通話聯繫</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
