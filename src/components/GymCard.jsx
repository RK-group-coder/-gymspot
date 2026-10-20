import React from 'react';
import { 
  MapPin, 
  Navigation, 
  Star, 
  ShieldCheck, 
  Award, 
  Dumbbell, 
  Clock, 
  CheckCircle2, 
  ExternalLink,
  MessageCircle,
  FileText
} from 'lucide-react';
import { formatDistance, buildGoogleMapsRouteUrl } from '../utils/geo';

export default function GymCard({ 
  gym, 
  userLat, 
  userLng, 
  isSelected, 
  onSelect, 
  onOpenDetail 
}) {
  const googleRouteUrl = buildGoogleMapsRouteUrl(gym.address, userLat, userLng);
  const isFreeCleanFee = gym.pricing.studentCleanFee === 0;

  return (
    <div
      onClick={onSelect}
      style={{
        background: isSelected ? 'linear-gradient(180deg, #1f2c42 0%, #172233 100%)' : '#141c2c',
        borderRadius: '16px',
        border: isSelected ? '2px solid #b4ff04' : '1px solid #1f2c42',
        overflow: 'hidden',
        boxShadow: isSelected 
          ? '0 12px 28px rgba(0,0,0,0.6), 0 0 16px rgba(180, 255, 4, 0.35)' 
          : '0 4px 16px rgba(0,0,0,0.3)',
        transition: 'all 0.22s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        flexShrink: 0
      }}
    >

      {/* Top Image + Badges */}
      <div style={{ position: 'relative', height: '170px', overflow: 'hidden' }}>
        <img
          src={gym.coverImage}
          alt={gym.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.06)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 40%, rgba(10,13,20,0.95) 100%)'
        }} />

        {/* Distance Badge */}
        {gym.distanceKm !== undefined && (
          <div style={{
            position: 'absolute',
            bottom: '10px',
            right: '12px',
            background: 'rgba(15, 23, 42, 0.88)',
            border: '1px solid #ffffff',
            backdropFilter: 'blur(8px)',
            color: '#ffffff',
            fontSize: '12px',
            fontWeight: 800,
            padding: '3px 10px',
            borderRadius: '9999px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.35), 0 2px 8px rgba(0,0,0,0.5)',
            textShadow: '0 0 6px rgba(255, 255, 255, 0.6)'
          }}>
            <Navigation size={12} color="#ffffff" style={{ filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.8))' }} />
            <span>距您 {formatDistance(gym.distanceKm)}</span>
          </div>
        )}

        {/* Rating */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '12px',
          background: 'rgba(17, 24, 39, 0.85)',
          backdropFilter: 'blur(8px)',
          color: '#fbbf24',
          fontSize: '12px',
          fontWeight: 700,
          padding: '3px 8px',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <Star size={13} fill="#fbbf24" color="#fbbf24" />
          <span>{gym.rating}</span>
          <span style={{ color: '#94a3b8', fontSize: '11px', fontWeight: 500 }}>({gym.reviewCount})</span>
        </div>
      </div>

      {/* Card Body */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, gap: '12px' }}>
        {/* Name and Verification */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            <span style={{
              fontSize: '11px',
              color: '#ffffff',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              textShadow: '0 0 8px rgba(255, 255, 255, 0.6)'
            }}>
              {gym.city} · {gym.district}
            </span>
            {gym.isVerified && (
              <span style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '3px', 
                color: '#b4ff04', 
                fontSize: '11px', 
                fontWeight: 700,
                background: 'rgba(180, 255, 4, 0.12)',
                padding: '1px 6px',
                borderRadius: '4px'
              }}>
                <ShieldCheck size={12} /> 已查核營登保險
              </span>
            )}
          </div>
          <h3 style={{ 
            fontSize: '17px', 
            fontWeight: 800, 
            color: '#f8fafc', 
            lineHeight: 1.35,
            marginBottom: '4px'
          }}>
            {gym.name}
          </h3>
          <p style={{ fontSize: '12px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <MapPin size={13} color="#64748b" style={{ flexShrink: 0 }} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {gym.nearMrt}
            </span>
          </p>
        </div>

        {/* Pricing Dashboard */}
        <div style={{
          background: '#0c121e',
          borderRadius: '12px',
          padding: '12px 14px',
          border: '1px solid #1a2436',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>離峰時段場租</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
              <span style={{ fontSize: '22px', fontWeight: 900, color: '#b4ff04' }}>
                ${gym.pricing.offPeakPerHour}
              </span>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>/小時</span>
            </div>
          </div>

          <div style={{ width: '1px', height: '32px', background: '#1e293b' }} />

          <div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>尖峰時段場租</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
              <span style={{ fontSize: '20px', fontWeight: 800, color: '#f3f4f6' }}>
                ${gym.pricing.peakPerHour}
              </span>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>/小時</span>
            </div>
          </div>
        </div>

        {/* Clean Fee Highlight */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 10px',
          borderRadius: '8px',
          background: isFreeCleanFee ? 'rgba(180, 255, 4, 0.12)' : 'rgba(234, 179, 8, 0.08)',
          border: isFreeCleanFee ? '1px solid rgba(180, 255, 4, 0.3)' : '1px solid rgba(234, 179, 8, 0.2)'
        }}>
          <CheckCircle2 size={14} color={isFreeCleanFee ? '#b4ff04' : '#eab308'} style={{ flexShrink: 0 }} />
          <span style={{ fontSize: '12px', fontWeight: 700, color: isFreeCleanFee ? '#b4ff04' : '#facc15' }}>
            {isFreeCleanFee ? '學員免人頭清潔費' : `學員清潔費 $${gym.pricing.studentCleanFee}/次`}
          </span>
          <span style={{ fontSize: '11px', color: '#94a3b8', marginLeft: 'auto' }}>
            {gym.pricing.packageDeals?.[0]?.note || '包套另有優惠'}
          </span>
        </div>

        {/* Equipment Badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          <span style={{
            fontSize: '11px',
            background: '#1a2436',
            color: '#cbd5e1',
            padding: '3px 8px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <Dumbbell size={11} color="#ffffff" style={{ filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.7))' }} /> 深蹲架 {gym.equipment.squatRacksCount} 座
          </span>
          {gym.equipment.turfZone && (
            <span style={{
              fontSize: '11px',
              background: '#1a2436',
              color: '#b4ff04',
              padding: '3px 8px',
              borderRadius: '6px'
            }}>
              🌿 專用草皮
            </span>
          )}
          {gym.equipment.eleikoPlates && (
            <span style={{
              fontSize: '11px',
              background: '#1a2436',
              color: '#fbbf24',
              padding: '3px 8px',
              borderRadius: '6px'
            }}>
              ⭐ Eleiko賽事槓
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '8px', marginTop: 'auto', paddingTop: '6px' }}>
          {/* Detail View Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetail(gym);
            }}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              background: '#1e293b',
              color: '#f8fafc',
              border: '1px solid #334155',
              borderRadius: '10px',
              padding: '9px 12px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'background 0.18s'
            }}
          >
            <FileText size={15} color="#ffffff" style={{ filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.7))' }} />
            <span>看完整報價</span>
          </button>

          {/* Google Maps Route Button */}
          <a
            href={googleRouteUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              background: 'linear-gradient(135deg, #b4ff04 0%, #8ce000 100%)',
              color: '#0a1402',
              textDecoration: 'none',
              borderRadius: '10px',
              padding: '9px 14px',
              fontSize: '13px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(180, 255, 4, 0.35)'
            }}
            title="開啟 Google Maps 路線導航"
          >
            <Navigation size={14} />
            <span>路線導航</span>
          </a>
        </div>
      </div>
    </div>
  );
}
