import React from 'react';
import { 
  Crosshair, 
  Search, 
  MapPin, 
  TrendingUp, 
  ShieldCheck, 
  FileSpreadsheet, 
  Navigation,
  ArrowRight
} from 'lucide-react';

export default function HeroBanner({ 
  onTriggerLocate, 
  isLocating, 
  userLocationName,
  onOpenRegister,
  gymCount,
  verifiedCount
}) {
  return (
    <div style={{
      background: 'radial-gradient(ellipse at 80% 20%, rgba(180, 255, 4, 0.15) 0%, rgba(17, 24, 39, 0) 70%), linear-gradient(180deg, #0e1524 0%, #0a0d14 100%)',
      borderBottom: '1px solid #1f293d',
      padding: '24px 28px 20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px'
      }}>
        {/* Left Column: Heading & Value Prop */}
        <div style={{ flex: '1 1 560px', minWidth: '320px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(180, 255, 4, 0.1)', border: '1px solid rgba(180, 255, 4, 0.25)', borderRadius: '9999px', padding: '4px 12px', marginBottom: '12px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#b4ff04', display: 'inline-block', boxShadow: '0 0 8px #b4ff04' }}></span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#b4ff04' }}>
              第一波健身房入駐招募中 · 審核上架免手續費
            </span>
          </div>

          <h1 style={{
            fontSize: '32px',
            fontWeight: 800,
            lineHeight: 1.25,
            letterSpacing: '-0.8px',
            color: '#f8fafc',
            marginBottom: '10px'
          }}>
            自由教練帶課好幫手 · <span style={{ 
              background: 'linear-gradient(135deg, #b4ff04 0%, #ffffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>透明場租地圖比價</span>
          </h1>

          <p style={{ fontSize: '15px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '18px', maxWidth: '620px' }}>
            教練隨時定位目前位置，尋找方圓 <strong style={{ color: '#f3f4f6' }}>1 ~ 10 公里內</strong>合法合格健身房，直接看尖離峰報價單、免收學員清潔費標籤與 Google Maps 一鍵路線導航！
          </p>

          {/* Quick Stats Badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#111827', padding: '6px 14px', borderRadius: '10px', border: '1px solid #1f293d' }}>
              <ShieldCheck size={18} color="#b4ff04" />
              <span style={{ fontSize: '13px', color: '#cbd5e1' }}>
                已查核場館：<strong style={{ color: '#fff' }}>{verifiedCount} 間</strong>
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#111827', padding: '6px 14px', borderRadius: '10px', border: '1px solid #1f293d' }}>
              <FileSpreadsheet size={18} color="#ffffff" style={{ filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.7))' }} />
              <span style={{ fontSize: '13px', color: '#cbd5e1' }}>
                透明公開報價表：<strong style={{ color: '#ffffff', textShadow: '0 0 6px rgba(255, 255, 255, 0.6)' }}>100% 同步</strong>
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#111827', padding: '6px 14px', borderRadius: '10px', border: '1px solid #1f293d' }}>
              <Navigation size={18} color="#f59e0b" />
              <span style={{ fontSize: '13px', color: '#cbd5e1' }}>
                路線規劃：<strong style={{ color: '#f59e0b' }}>Google Maps 串接</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Instant GPS Locator Card */}
        <div style={{
          flex: '0 1 420px',
          minWidth: '300px',
          background: 'linear-gradient(145deg, #182234 0%, #111827 100%)',
          border: '1px solid #243248',
          borderRadius: '16px',
          padding: '20px',
          boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.6)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Crosshair size={18} color="#ffffff" style={{ filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.8))' }} />
              教練目前定位座標
            </span>
            <span style={{ fontSize: '12px', color: '#b4ff04', background: 'rgba(180, 255, 4, 0.12)', padding: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>
              即時計算距離
            </span>
          </div>

          <div style={{
            background: '#0a0d14',
            borderRadius: '10px',
            padding: '12px 14px',
            border: '1px solid #1e293b',
            marginBottom: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <MapPin size={20} color="#ffffff" style={{ flexShrink: 0, filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.7))' }} />
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '11px', color: '#64748b' }}>基準定位點</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#f1f5f9', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                {userLocationName}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={onTriggerLocate}
              disabled={isLocating}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: isLocating ? '#334155' : 'rgba(255, 255, 255, 0.12)',
                border: '1px solid #ffffff',
                color: '#ffffff',
                boxShadow: isLocating ? 'none' : '0 0 10px rgba(255, 255, 255, 0.25)',
                borderRadius: '10px',
                padding: '10px 14px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: isLocating ? 'not-allowed' : 'pointer',
                transition: 'all 0.18s ease'
              }}
            >
              <Crosshair size={16} />
              {isLocating ? 'GPS 定位搜尋中...' : '重新定位我的位置'}
            </button>

            <button
              onClick={onOpenRegister}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                background: '#1f293d',
                color: '#b4ff04',
                border: '1px solid rgba(180, 255, 4, 0.3)',
                borderRadius: '10px',
                padding: '10px 14px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              我是場館方
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
