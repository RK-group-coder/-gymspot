import React from 'react';
import { 
  Navigation, 
  Calendar,
  Eye
} from 'lucide-react';
import { formatDistance, buildGoogleMapsRouteUrl, buildGoogleMapsPlaceUrl } from '../utils/geo';

export default function GymCard({ 
  gym, 
  userLat, 
  userLng, 
  isSelected, 
  onSelect, 
  onOpenDetail,
  onOpenBooking
}) {
  const googleRouteUrl = buildGoogleMapsRouteUrl(gym.address, userLat, userLng);
  const googlePlaceUrl = gym.googleMapsUrl || buildGoogleMapsPlaceUrl(gym.name, gym.address);
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

      {/* Top Image + Distance Badge */}
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
      </div>

      {/* Card Body */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, gap: '12px' }}>
        {/* Name and Region */}
        <div>
          <div style={{ marginBottom: '4px' }}>
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
          </div>
          <h3 style={{ 
            fontSize: '17px', 
            fontWeight: 800, 
            color: '#f8fafc', 
            lineHeight: 1.35,
            margin: 0
          }}>
            {gym.name}
          </h3>
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
          <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>小時制場租</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
            <span style={{ fontSize: '24px', fontWeight: 900, color: '#b4ff04' }}>
              ${gym.pricing.hourlyRate || gym.pricing.offPeakPerHour || 200}
            </span>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>/小時</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '6px', marginTop: 'auto', paddingTop: '6px' }}>
          {/* Booking Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onOpenBooking) {
                onOpenBooking(gym);
              } else {
                onOpenDetail(gym, 'booking');
              }
            }}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              background: '#1e293b',
              color: '#f8fafc',
              border: '1px solid #334155',
              borderRadius: '10px',
              padding: '9px 6px',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'background 0.18s',
              whiteSpace: 'nowrap'
            }}
          >
            <Calendar size={14} color="#ffffff" style={{ filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.7))' }} />
            <span>預約上課</span>
          </button>

          {/* View Venue on Google Maps Button (查看場館) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetail(gym, 'view');
            }}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              background: '#162235',
              color: '#f8fafc',
              border: '1px solid #2a3b53',
              borderRadius: '10px',
              padding: '9px 6px',
              fontSize: '12.5px',
              fontWeight: 700,
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'background 0.18s',
              whiteSpace: 'nowrap'
            }}
            title="查看場館所有照片與場館介紹"
          >
            <Eye size={14} color="#ffffff" style={{ filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.7))' }} />
            <span>查看場館</span>
          </button>

          {/* Google Maps Route Button */}
          <a
            href={googleRouteUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              background: 'linear-gradient(135deg, #b4ff04 0%, #8ce000 100%)',
              color: '#0a1402',
              textDecoration: 'none',
              borderRadius: '10px',
              padding: '9px 6px',
              fontSize: '12.5px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(180, 255, 4, 0.35)',
              whiteSpace: 'nowrap'
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
