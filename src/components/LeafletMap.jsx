import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Crosshair, ExternalLink, Navigation, Layers } from 'lucide-react';
import { buildGoogleMapsRouteUrl, formatDistance } from '../utils/geo';

export default function LeafletMap({
  gyms = [],
  userLat,
  userLng,
  selectedGym,
  onSelectGym,
  onOpenDetail,
  focusTarget
}) {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const markersRef = useRef({});
  const userMarkerRef = useRef(null);
  const tileLayerRef = useRef(null);

  // Map Style: 'google' (Google Maps standard) | 'dark' (Google Maps dark) | 'satellite' (Google Hybrid)
  const [mapStyle, setMapStyle] = useState('google');

  // 1. Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Reset container if Leaflet left an ID
    if (mapContainerRef.current._leaflet_id) {
      mapContainerRef.current._leaflet_id = null;
    }

    const initialLat = userLat || 25.0428;
    const initialLng = userLng || 121.5512;

    const mapInstance = L.map(mapContainerRef.current, {
      center: [initialLat, initialLng],
      zoom: 14,
      zoomControl: false
    });

    // Zoom control at bottom-right
    L.control.zoom({ position: 'bottomright' }).addTo(mapInstance);

    setMap(mapInstance);

    // Trigger invalidateSize to smoothly recalculate full viewport size
    const timer1 = setTimeout(() => {
      mapInstance.invalidateSize();
    }, 100);
    const timer2 = setTimeout(() => {
      mapInstance.invalidateSize();
    }, 400);

    const handleResize = () => {
      mapInstance.invalidateSize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('resize', handleResize);
      markersRef.current = {};
      userMarkerRef.current = null;
      tileLayerRef.current = null;
      mapInstance.remove();
      setMap(null);
    };
  }, []);

  // 2. Switch Google Maps Tile Layer
  useEffect(() => {
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    let url = 'https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';
    let className = '';

    if (mapStyle === 'satellite') {
      url = 'https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}';
    } else if (mapStyle === 'dark') {
      url = 'https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';
      className = 'map-tiles-dark';
    }

    const tileLayer = L.tileLayer(url, {
      subdomains: ['0', '1', '2', '3'],
      maxZoom: 20,
      className,
      attribution: '&copy; Google Maps'
    }).addTo(map);

    tileLayerRef.current = tileLayer;
    map.invalidateSize();
  }, [map, mapStyle]);

  // 3. Update User Marker
  useEffect(() => {
    if (!map || !userLat || !userLng) return;

    if (userMarkerRef.current) {
      userMarkerRef.current.setLatLng([userLat, userLng]);
    } else {
      const userIcon = L.divIcon({
        className: 'user-pulse-marker',
        iconSize: [22, 22],
        iconAnchor: [11, 11]
      });

      const userMarker = L.marker([userLat, userLng], {
        icon: userIcon,
        zIndexOffset: 1000
      }).addTo(map);

      userMarker.bindTooltip('您的目前定位點', {
        permanent: false,
        direction: 'top',
        className: 'user-tooltip'
      });

      userMarkerRef.current = userMarker;
    }
  }, [map, userLat, userLng]);

  // 4. Update Gym Markers (Only displays the stores specified in the gyms array!)
  useEffect(() => {
    if (!map) return;

    // Clear old markers that no longer exist
    Object.keys(markersRef.current).forEach((id) => {
      if (!gyms.some((g) => g.id === id)) {
        markersRef.current[id].remove();
        delete markersRef.current[id];
      }
    });

    // Add or update markers
    gyms.forEach((gym) => {
      const isSelected = selectedGym && selectedGym.id === gym.id;
      const priceText = `$${gym.pricing.offPeakPerHour}`;
      const bubbleClass = `pin-bubble ${isSelected ? 'active' : ''}`;

      const iconHtml = `
        <div class="${bubbleClass}">
          <span>${priceText}/h</span>
          <div class="pin-tail"></div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-gym-pin',
        html: iconHtml,
        iconSize: [80, 36],
        iconAnchor: [40, 36]
      });

      if (markersRef.current[gym.id]) {
        markersRef.current[gym.id].setIcon(customIcon);
        markersRef.current[gym.id].setLatLng([gym.lat, gym.lng]);
      } else {
        const marker = L.marker([gym.lat, gym.lng], { icon: customIcon }).addTo(map);

        marker.on('click', () => {
          onSelectGym(gym);
        });

        // Popup Content
        const googleRouteUrl = buildGoogleMapsRouteUrl(gym.address, userLat, userLng);
        const popupHtml = `
          <div style="width: 250px; padding: 14px; font-family: system-ui, sans-serif;">
            <div style="font-size: 11px; color: #ffffff; text-shadow: 0 0 8px rgba(255,255,255,0.6); font-weight: 800; margin-bottom: 2px;">
              ${gym.city} · ${gym.district}
            </div>
            <div style="font-size: 15px; font-weight: 800; color: #f8fafc; margin-bottom: 6px; line-height: 1.3;">
              ${gym.name}
            </div>
            <div style="display: flex; justify-content: space-between; align-items: baseline; background: #0c121e; padding: 8px 10px; border-radius: 8px; margin-bottom: 10px;">
              <div>
                <span style="font-size: 11px; color: #94a3b8;">離峰</span>
                <span style="font-size: 16px; font-weight: 800; color: #b4ff04; margin-left: 4px;">$${gym.pricing.offPeakPerHour}</span>
              </div>
              <div>
                <span style="font-size: 11px; color: #94a3b8;">尖峰</span>
                <span style="font-size: 15px; font-weight: 800; color: #f1f5f9; margin-left: 4px;">$${gym.pricing.peakPerHour}</span>
              </div>
            </div>
            <div style="font-size: 12px; color: #b4ff04; font-weight: 700; margin-bottom: 10px;">
              ${gym.pricing.studentCleanFee === 0 ? '✓ 學員完全免收清潔費' : `• 學員清潔費 $${gym.pricing.studentCleanFee}`}
            </div>
            <div style="display: flex; gap: 6px;">
              <a href="${googleRouteUrl}" target="_blank" rel="noopener noreferrer" style="
                flex: 1; 
                text-align: center;
                background: #b4ff04; 
                color: #0a1402; 
                text-decoration: none; 
                padding: 7px 10px; 
                border-radius: 6px; 
                font-weight: 800; 
                font-size: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 4px;
              ">
                Google 導航
              </a>
            </div>
          </div>
        `;
        marker.bindPopup(popupHtml, { maxWidth: 280, minWidth: 240 });

        markersRef.current[gym.id] = marker;
      }
    });
  }, [map, gyms, selectedGym, userLat, userLng]);

  // 5. Center on selected gym
  useEffect(() => {
    if (!map || !selectedGym) return;
    map.flyTo([selectedGym.lat, selectedGym.lng], 15, { duration: 0.8 });
    if (markersRef.current[selectedGym.id]) {
      markersRef.current[selectedGym.id].openPopup();
    }
  }, [map, selectedGym]);

  // 6. Smoothly fly to city / district focus target
  useEffect(() => {
    if (!map || !focusTarget) return;
    map.flyTo([focusTarget.lat, focusTarget.lng], focusTarget.zoom || 13, { duration: 0.9 });
  }, [map, focusTarget]);

  // 7. Handle re-center on user
  const handleRecenter = () => {
    if (!map || !userLat || !userLng) return;
    map.flyTo([userLat, userLng], 14, { duration: 0.8 });
  };

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }} />

      {/* Floating Map Controls Bar (Google Maps Style Switcher + Recenter) */}
      <div style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
        zIndex: 900,
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        {/* Style Switcher */}
        <div style={{
          background: 'rgba(17, 24, 39, 0.94)',
          backdropFilter: 'blur(10px)',
          border: '1px solid #1f293d',
          borderRadius: '10px',
          padding: '3px',
          display: 'flex',
          gap: '3px',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.5)'
        }}>
          {[
            { id: 'google', label: '🗺️ Google 街道' },
            { id: 'dark', label: '🌙 暗黑模式' },
            { id: 'satellite', label: '🛰️ Google 衛星' }
          ].map(s => (
            <button
              key={s.id}
              onClick={() => setMapStyle(s.id)}
              style={{
                background: mapStyle === s.id ? '#b4ff04' : 'transparent',
                color: mapStyle === s.id ? '#0a1402' : '#cbd5e1',
                border: 'none',
                borderRadius: '7px',
                padding: '6px 10px',
                fontSize: '11px',
                fontWeight: mapStyle === s.id ? 800 : 500,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap'
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Re-center Button */}
        <button
          onClick={handleRecenter}
          title="移至我的目前位置"
          style={{
            background: 'rgba(17, 24, 39, 0.94)',
            backdropFilter: 'blur(10px)',
            color: '#ffffff',
            border: '1px solid rgba(255, 255, 255, 0.75)',
            borderRadius: '10px',
            padding: '8px 12px',
            fontSize: '11px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            boxShadow: '0 0 12px rgba(255, 255, 255, 0.35), 0 4px 14px rgba(0, 0, 0, 0.5)',
            textShadow: '0 0 6px rgba(255, 255, 255, 0.7)'
          }}
        >
          <Crosshair size={14} color="#ffffff" style={{ filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.8))' }} />
          <span>定位</span>
        </button>
      </div>

      {/* Map Legend */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        zIndex: 900,
        background: 'rgba(10, 13, 20, 0.92)',
        backdropFilter: 'blur(10px)',
        border: '1px solid #1e293b',
        borderRadius: '10px',
        padding: '8px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        fontSize: '11px',
        color: '#94a3b8',
        boxShadow: '0 4px 14px rgba(0,0,0,0.4)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffffff', boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)', display: 'inline-block' }}></span>
          <span>您目前位置</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: '12px', height: '12px', borderRadius: '4px', background: '#b4ff04', display: 'inline-block', boxShadow: '0 0 6px rgba(180, 255, 4, 0.6)' }}></span>
          <span>合作場租店家</span>
        </div>
      </div>
    </div>
  );
}
