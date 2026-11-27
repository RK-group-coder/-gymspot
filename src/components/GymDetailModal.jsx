import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  MapPin,
  Navigation,
  Clock,
  Copy,
  Check,
  Calendar,
  FileText,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { buildGoogleMapsRouteUrl, formatDistance } from '../utils/geo';
import GymBookingModal from './GymBookingModal';

const DAY_NAMES = ['一', '二', '三', '四', '五', '六', '日'];
const HOURS = Array.from({ length: 16 }, (_, i) => 8 + i);

const FALLBACK_GALLERY_PHOTOS = [
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=900&auto=format&fit=crop'
];

const cardStyle = {
  background: '#080808',
  borderRadius: '14px',
  border: '1px solid #1f1f1f',
  padding: '18px'
};

const sectionTitle = {
  fontSize: '15px',
  fontWeight: 800,
  color: '#f8fafc',
  margin: '0 0 12px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
};

export default function GymDetailModal({
  gym,
  userLat,
  userLng,
  onClose,
  onOpenBooking,
  mode = 'view',
  userPoints,
  onDeductPoints,
  onOpenTopUp,
  onBookingSuccess
}) {
  const [copied, setCopied] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [activeTab, setActiveTab] = useState(() => (mode === 'booking' ? 'booking' : 'overview'));
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 640);
  const contactRef = useRef(null);
  const photoWallRef = useRef(null);
  const dragStateRef = useRef({ isDown: false, startX: 0, scrollLeft: 0, moved: false });
  const lightboxTouchXRef = useRef(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    setLightboxIndex(null);
    setActiveTab(mode === 'booking' ? 'booking' : 'overview');
  }, [gym, mode]);

  // 場館／器材照片（右側上傳的 4~10 張；若示範場館未設定 photos 則提供預設多張器材環境照）
  const photos = gym
    ? (Array.isArray(gym.photos) && gym.photos.length > 0
        ? gym.photos
        : FALLBACK_GALLERY_PHOTOS)
    : [];

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex(i => (i + 1) % photos.length);
      if (e.key === 'ArrowLeft') setLightboxIndex(i => (i - 1 + photos.length) % photos.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, photos.length]);

  if (!gym) return null;

  const googleRouteUrl = buildGoogleMapsRouteUrl(gym.address, userLat, userLng);
  const hourlyRate = gym.pricing?.hourlyRate || gym.pricing?.offPeakPerHour || 200;
  const schedule = gym.availableSchedule || null;
  const hasSchedule = schedule && Object.keys(schedule).length > 0;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(gym.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollPhotoWall = (direction) => {
    if (!photoWallRef.current) return;
    const scrollAmount = 260;
    photoWallRef.current.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
    });
  };

  const channelBtn = (bg, color = '#fff') => ({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: bg,
    color,
    textDecoration: 'none',
    borderRadius: '12px',
    padding: '12px 18px',
    fontWeight: 700,
    fontSize: '14px',
    border: 'none'
  });

  const responsiveCardStyle = {
    ...cardStyle,
    padding: isMobile ? '15px 14px' : '18px'
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 2000,
      background: 'rgba(0, 0, 0, 0.88)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: isMobile ? 'flex-end' : 'center',
      justifyContent: 'center',
      padding: isMobile ? '0' : '20px'
    }} onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#000000',
          border: '1px solid #222222',
          borderRadius: isMobile ? '20px 20px 0 0' : '20px',
          width: '100%',
          maxWidth: '840px',
          maxHeight: isMobile ? '94dvh' : '92vh',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.95)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'sticky',
            top: isMobile ? '12px' : '16px',
            alignSelf: 'flex-end',
            marginRight: isMobile ? '12px' : '16px',
            marginBottom: '-50px',
            zIndex: 30,
            background: 'rgba(0, 0, 0, 0.78)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            color: '#f8fafc',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(0,0,0,0.5)'
          }}
        >
          <X size={18} />
        </button>

        {/* 1. 首頁圖 Hero 背景視覺區（最上方特色背景） */}
        <div style={{
          position: 'relative',
          minHeight: isMobile ? '195px' : '250px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: isMobile ? '24px 16px 18px' : '32px 28px 24px',
          overflow: 'hidden',
          borderRadius: '20px 20px 0 0',
          borderBottom: '1px solid rgba(180, 255, 4, 0.22)'
        }}>
          {/* 首頁圖背景層 */}
          {gym.coverImage && (
            <img
              src={gym.coverImage}
              alt={gym.name}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                filter: 'brightness(0.88) contrast(1.08)',
                transform: 'scale(1.02)'
              }}
            />
          )}

          {/* 特色多層光影漸層遮罩 */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: [
              'radial-gradient(circle at 85% 20%, rgba(180, 255, 4, 0.18) 0%, transparent 45%)',
              'linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.72) 58%, #000000 100%)'
            ].join(', ')
          }} />

          {/* 前景文字與地址資訊 */}
          <div style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ flex: '1 1 260px', minWidth: 0 }}>
              {gym.distanceKm !== undefined && (
                <div style={{ marginBottom: '8px' }}>
                  <span style={{
                    display: 'inline-block',
                    background: 'rgba(0, 0, 0, 0.78)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    fontSize: '12px',
                    fontWeight: 800,
                    padding: '4px 10px',
                    borderRadius: '9999px'
                  }}>
                    距您約 {formatDistance(gym.distanceKm)}
                  </span>
                </div>
              )}

              <h2 style={{
                fontSize: isMobile ? '20px' : 'clamp(22px, 3.5vw, 28px)',
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.25,
                margin: '0 0 10px',
                textShadow: '0 2px 14px rgba(0, 0, 0, 0.85)'
              }}>
                {gym.name}
              </h2>

              <div style={{
                display: 'inline-flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                padding: isMobile ? '6px 10px' : '6px 12px',
                borderRadius: '10px',
                fontSize: isMobile ? '12px' : '13px',
                maxWidth: '100%'
              }}>
                <MapPin size={14} color="#b4ff04" style={{ flexShrink: 0 }} />
                <span style={{ color: '#f1f5f9', fontWeight: 600, wordBreak: 'break-all' }}>{gym.address}</span>
                <button
                  onClick={handleCopyAddress}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.14)',
                    borderRadius: '6px',
                    padding: '2px 8px',
                    color: copied ? '#b4ff04' : '#cbd5e1',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    flexShrink: 0
                  }}
                  title="複製地址"
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copied ? '已複製' : '複製'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 兩分頁導覽列：總覽 / 預約 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            borderBottom: '1px solid #222222',
            background: '#000000',
            position: 'sticky',
            top: 0,
            zIndex: 15,
            padding: isMobile ? '0 8px' : '0 28px'
          }}
        >
          {[
            { key: 'overview', label: '總覽' },
            { key: 'booking', label: '預約' }
          ].map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                style={{
                  position: 'relative',
                  background: 'transparent',
                  border: 'none',
                  padding: isMobile ? '13px 0 12px' : '15px 0 13px',
                  fontSize: isMobile ? '14.5px' : '15px',
                  fontWeight: isActive ? 900 : 700,
                  color: isActive ? '#b4ff04' : '#9ca3af',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  letterSpacing: '0.04em',
                  transition: 'color 0.15s ease'
                }}
              >
                <span>{tab.label}</span>
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '48px',
                      height: '3.5px',
                      background: '#b4ff04',
                      borderRadius: '4px 4px 0 0',
                      boxShadow: '0 -2px 10px rgba(180, 255, 4, 0.45)'
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div style={{ padding: isMobile ? '14px 12px 26px' : '24px 28px 28px', display: 'flex', flexDirection: 'column', gap: isMobile ? '14px' : '20px' }}>
          {/* 分頁 1：總覽 */}
          {activeTab === 'overview' && (
            <>
              {/* 右滑場館／器材照片牆 */}
              <div style={responsiveCardStyle}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <h3 style={{ ...sectionTitle, marginBottom: 0, fontSize: isMobile ? '14.5px' : '15px' }}>
                    <span>場館／器材照片牆</span>
                    <span style={{ fontSize: '12px', color: '#b4ff04', fontWeight: 700 }}>
                      共 {photos.length} 張
                    </span>
                  </h3>
                  {!isMobile && photos.length > 1 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <button
                        type="button"
                        onClick={() => scrollPhotoWall('left')}
                        title="向左滑動照片"
                        style={{
                          background: '#111111',
                          border: '1px solid #262626',
                          color: '#cbd5e1',
                          borderRadius: '7px',
                          width: '28px',
                          height: '28px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}
                      >
                        <ChevronLeft size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollPhotoWall('right')}
                        title="向右滑動照片"
                        style={{
                          background: '#111111',
                          border: '1px solid #262626',
                          color: '#b4ff04',
                          borderRadius: '7px',
                          width: '28px',
                          height: '28px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}
                      >
                        <ChevronRight size={15} />
                      </button>
                    </div>
                  )}
                </div>

                {photos.length === 0 ? (
                  <div style={{ fontSize: '13px', color: '#64748b' }}>此場館尚未提供照片</div>
                ) : (
                  <div
                    ref={photoWallRef}
                    className="photo-wall-scroll"
                    onMouseDown={(e) => {
                      if (!photoWallRef.current) return;
                      dragStateRef.current = {
                        isDown: true,
                        startX: e.pageX - photoWallRef.current.offsetLeft,
                        scrollLeft: photoWallRef.current.scrollLeft,
                        moved: false
                      };
                    }}
                    onMouseMove={(e) => {
                      if (!dragStateRef.current.isDown || !photoWallRef.current) return;
                      const x = e.pageX - photoWallRef.current.offsetLeft;
                      const walk = x - dragStateRef.current.startX;
                      if (Math.abs(walk) > 6) {
                        dragStateRef.current.moved = true;
                        e.preventDefault();
                        photoWallRef.current.scrollLeft = dragStateRef.current.scrollLeft - walk;
                      }
                    }}
                    onMouseUp={() => {
                      dragStateRef.current.isDown = false;
                    }}
                    onMouseLeave={() => {
                      dragStateRef.current.isDown = false;
                    }}
                    style={{
                      display: 'flex',
                      gap: isMobile ? '10px' : '12px',
                      overflowX: 'auto',
                      paddingBottom: isMobile ? '2px' : '8px',
                      WebkitOverflowScrolling: 'touch',
                      touchAction: 'pan-x pan-y',
                      userSelect: 'none',
                      cursor: 'grab'
                    }}
                  >
                    {photos.map((p, idx) => (
                      <button
                        key={p + idx}
                        type="button"
                        onClick={() => {
                          if (dragStateRef.current.moved) {
                            dragStateRef.current.moved = false;
                            return;
                          }
                          setLightboxIndex(idx);
                        }}
                        title={`點擊放大照片 #${idx + 1}`}
                        style={{
                          position: 'relative',
                          flex: isMobile ? '0 0 190px' : '0 0 230px',
                          height: isMobile ? '134px' : '160px',
                          padding: 0,
                          border: '1px solid #222222',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          background: '#050505',
                          touchAction: 'pan-x pan-y'
                        }}
                      >
                        <img
                          src={p}
                          alt={`${gym.name} 照片 ${idx + 1}`}
                          loading="lazy"
                          draggable={false}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                            pointerEvents: 'none',
                            transition: 'transform 0.25s ease'
                          }}
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* 照片牆下方：左右兩個寬型長方形按鈕（立即預約課表時段、Google Maps 路線導航）＋ 右側小時制場租價錢 */}
                <div
                  ref={contactRef}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: isMobile ? '8px' : '12px',
                    marginTop: isMobile ? '12px' : '16px',
                    paddingTop: isMobile ? '12px' : '16px',
                    borderTop: '1px solid #1f1f1f'
                  }}
                >
                  {/* 左側：桌機與手機皆為左右並排的兩個寬型長方形按鈕 */}
                  <div
                    style={{
                      flex: 1,
                      minWidth: 0,
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: isMobile ? '8px' : '12px'
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveTab('booking')}
                      style={{
                        width: '100%',
                        height: isMobile ? '46px' : '48px',
                        minHeight: isMobile ? '46px' : '48px',
                        background: 'linear-gradient(135deg, #b4ff04 0%, #8ce000 100%)',
                        color: '#0a1402',
                        border: 'none',
                        borderRadius: '10px',
                        padding: isMobile ? '0 8px' : '0 20px',
                        fontSize: isMobile ? '12.5px' : '14px',
                        fontWeight: 900,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: isMobile ? '5px' : '8px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(180, 255, 4, 0.35)',
                        transition: 'transform 0.15s ease',
                        whiteSpace: 'nowrap'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                      <Calendar size={isMobile ? 15 : 18} style={{ flexShrink: 0 }} />
                      <span>{isMobile ? '立即預約時段' : '立即預約課表時段'}</span>
                    </button>

                    <a
                      href={googleRouteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        width: '100%',
                        height: isMobile ? '46px' : '48px',
                        minHeight: isMobile ? '46px' : '48px',
                        background: '#111111',
                        color: '#f8fafc',
                        border: '1px solid #2a2a2a',
                        borderRadius: '10px',
                        padding: isMobile ? '0 8px' : '0 20px',
                        fontSize: isMobile ? '12.5px' : '14px',
                        fontWeight: 800,
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: isMobile ? '5px' : '8px',
                        transition: 'border-color 0.15s ease',
                        whiteSpace: 'nowrap',
                        boxSizing: 'border-box'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#b4ff04'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#2a2a2a'; }}
                    >
                      <Navigation size={isMobile ? 15 : 18} color="#b4ff04" style={{ flexShrink: 0 }} />
                      <span>{isMobile ? 'Google 導航' : 'Google Maps 路線導航'}</span>
                    </a>
                  </div>

                  {/* 右側：小時制場租價錢 */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '2px',
                    padding: isMobile ? '0 0 0 2px' : '0 6px 0 8px',
                    flexShrink: 0,
                    whiteSpace: 'nowrap'
                  }}>
                    <span style={{
                      fontSize: isMobile ? '25px' : '34px',
                      fontWeight: 900,
                      color: '#b4ff04',
                      lineHeight: 1
                    }}>
                      ${hourlyRate}
                    </span>
                    <span style={{ fontSize: isMobile ? '11.5px' : '13px', color: '#94a3b8', fontWeight: 700 }}>
                      /小時
                    </span>
                  </div>
                </div>
              </div>

              {/* 場館介紹 */}
              <div style={responsiveCardStyle}>
                <h3 style={sectionTitle}>
                  場館介紹
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: gym.gymIntro && gym.gymIntro !== '無場館介紹' ? '#e2e8f0' : '#94a3b8',
                  lineHeight: 1.7,
                  margin: 0,
                  whiteSpace: 'pre-wrap'
                }}>
                  {gym.gymIntro?.trim() || '無場館介紹'}
                </p>
              </div>

              {/* 給教練的話或規則 */}
              <div style={responsiveCardStyle}>
                <h3 style={sectionTitle}>
                  給教練的話或規則
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: gym.coachIntro && gym.coachIntro !== '無特殊介紹' ? '#e2e8f0' : '#94a3b8',
                  lineHeight: 1.7,
                  margin: 0,
                  whiteSpace: 'pre-wrap'
                }}>
                  {gym.coachIntro?.trim() || '無特殊介紹'}
                </p>
              </div>
            </>
          )}

          {/* 分頁 2：預約 */}
          {activeTab === 'booking' && (
            <GymBookingModal
              gym={gym}
              isOpen={true}
              embedded={true}
              onClose={onClose}
              userPoints={userPoints}
              onDeductPoints={onDeductPoints}
              onOpenTopUp={onOpenTopUp}
              onBookingSuccess={onBookingSuccess}
            />
          )}
        </div>
      </div>

      {/* 照片牆放大檢視 */}
      {lightboxIndex !== null && photos[lightboxIndex] && (
        <div
          onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
          onTouchStart={(e) => {
            if (e.touches && e.touches.length === 1) {
              lightboxTouchXRef.current = e.touches[0].clientX;
            }
          }}
          onTouchEnd={(e) => {
            if (lightboxTouchXRef.current === null || photos.length <= 1) return;
            const endX = e.changedTouches?.[0]?.clientX;
            if (typeof endX === 'number') {
              const deltaX = endX - lightboxTouchXRef.current;
              if (Math.abs(deltaX) > 40) {
                if (deltaX < 0) {
                  setLightboxIndex((lightboxIndex + 1) % photos.length);
                } else {
                  setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length);
                }
              }
            }
            lightboxTouchXRef.current = null;
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 3000,
            background: 'rgba(0, 0, 0, 0.94)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
        >
          <img
            src={photos[lightboxIndex]}
            alt={`照片 ${lightboxIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
            draggable={false}
            style={{ maxWidth: '90vw', maxHeight: '88vh', borderRadius: '12px', boxShadow: '0 20px 50px rgba(0,0,0,0.8)', userSelect: 'none' }}
          />
          {photos.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length); }}
                style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.12)', border: 'none', color: '#fff', borderRadius: '50%', width: '44px', height: '44px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % photos.length); }}
                style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.12)', border: 'none', color: '#fff', borderRadius: '50%', width: '44px', height: '44px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
