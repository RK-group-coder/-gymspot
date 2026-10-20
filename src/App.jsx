import React, { useState, useMemo, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import CoachMapFilter from './components/CoachMapFilter';
import LeafletMap from './components/LeafletMap';
import GymCard from './components/GymCard';
import GymDetailModal from './components/GymDetailModal';
import GymRegisterModal from './components/GymRegisterModal';
import MonetizationModal from './components/MonetizationModal';
import CoachProModal from './components/CoachProModal';
import ProfileModal from './components/ProfileModal';
import TermsModal from './components/TermsModal';
import TopUpModal from './components/TopUpModal';
import { INITIAL_GYMS, PRESET_LOCATIONS } from './data/mockGyms';
import { calculateDistanceKm, getCurrentPositionAsync } from './utils/geo';
import { 
  MapPin, 
  Map as MapIcon, 
  ListFilter, 
  Dumbbell, 
  AlertCircle, 
  CheckCircle2,
  Building2,
  Navigation
} from 'lucide-react';

export default function App() {
  // Master Gyms List (supports dynamic additions from registration form)
  const [gyms, setGyms] = useState(INITIAL_GYMS);

  // User Location State (Default: 台北大安商圈)
  const [userLocation, setUserLocation] = useState({
    lat: 25.0416,
    lng: 121.5438,
    name: '台北大安 (忠孝復興商圈)'
  });
  const [isLocating, setIsLocating] = useState(false);
  const [selectedPresetLocId, setSelectedPresetLocId] = useState('loc-tp-daan');

  // Filters State (Two-tier City and District)
  const [activeCity, setActiveCity] = useState('全部縣市');
  const [activeDistrict, setActiveDistrict] = useState('全部行政區');
  const [searchQuery, setSearchQuery] = useState('');
  const [focusTarget, setFocusTarget] = useState(null);
  const [sortBy, setSortBy] = useState('distance');

  // UI Selection & Modals
  const [selectedGym, setSelectedGym] = useState(null);
  const [detailModalGym, setDetailModalGym] = useState(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isMonetizationModalOpen, setIsMonetizationModalOpen] = useState(false);
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const SHEET_SNAPS = [0.11, 0.38, 0.64];
  const [sheetSnap, setSheetSnap] = useState(1);
  const [isDraggingSheet, setIsDraggingSheet] = useState(false);
  const asideRef = useRef(null);
  const dragRef = useRef({ startY: 0, startH: 0, mainH: 1, moved: false });

  const handleSheetPointerDown = (e) => {
    const aside = asideRef.current;
    if (!aside) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      startY: e.clientY,
      startH: aside.offsetHeight,
      mainH: aside.parentElement.offsetHeight || 1,
      moved: false
    };
    setIsDraggingSheet(true);
  };
  const handleSheetPointerMove = (e) => {
    if (!isDraggingSheet) return;
    const d = dragRef.current;
    const dy = d.startY - e.clientY;
    if (Math.abs(dy) > 5) d.moved = true;
    const h = Math.min(d.mainH * 0.8, Math.max(d.mainH * 0.08, d.startH + dy));
    asideRef.current.style.setProperty('--sheet-h', `${h}px`);
  };
  const handleSheetPointerUp = (e) => {
    if (!isDraggingSheet) return;
    const d = dragRef.current;
    setIsDraggingSheet(false);
    let next;
    if (!d.moved) {
      next = (sheetSnap + 1) % SHEET_SNAPS.length;
    } else {
      const ratio = (d.startH + (d.startY - e.clientY)) / d.mainH;
      next = SHEET_SNAPS.reduce((best, s, i) =>
        Math.abs(s - ratio) < Math.abs(SHEET_SNAPS[best] - ratio) ? i : best, 0);
    }
    asideRef.current.style.removeProperty('--sheet-h');
    setSheetSnap(next);
  };
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [points, setPoints] = useState(() => Number(localStorage.getItem('gymspot_points') || 0));
  useEffect(() => { localStorage.setItem('gymspot_points', String(points)); }, [points]);
  const [toastMessage, setToastMessage] = useState(null);
  const [mobileTab, setMobileTab] = useState('split'); // 'split', 'list', 'map'

  const handleToggleLogin = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      setToastMessage('已成功退出登入，切換為訪客模式');
    } else {
      setIsLoggedIn(true);
      setToastMessage('歡迎回來！已登入認證自由教練 (Alex Lin)');
    }
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // City Map Focus Coordinates
  const CITY_COORDINATES = {
    '台北市': { lat: 25.0428, lng: 121.5450, zoom: 13 },
    '新北市': { lat: 25.0135, lng: 121.4645, zoom: 13 },
    '台中市': { lat: 24.1508, lng: 120.6635, zoom: 13 },
    '高雄市': { lat: 22.6698, lng: 120.3023, zoom: 13 },
    '全部縣市': { lat: 24.5000, lng: 121.0000, zoom: 8 }
  };

  // Dynamic City List with venue count marked on the left
  const cityList = useMemo(() => {
    const counts = {};
    gyms.forEach(g => {
      counts[g.city] = (counts[g.city] || 0) + 1;
    });
    const knownOrder = ['台北市', '新北市', '台中市', '高雄市'];
    const otherCities = Object.keys(counts).filter(c => !knownOrder.includes(c));
    const sortedCities = [...knownOrder.filter(c => counts[c]), ...otherCities];
    return [
      { name: '全部縣市', count: gyms.length },
      ...sortedCities.map(city => ({ name: city, count: counts[city] }))
    ];
  }, [gyms]);

  // Dynamic District List with venue count marked on the left
  const districtList = useMemo(() => {
    const relevantGyms = activeCity === '全部縣市'
      ? gyms
      : gyms.filter(g => g.city === activeCity);

    const counts = {};
    relevantGyms.forEach(g => {
      counts[g.district] = (counts[g.district] || 0) + 1;
    });
    const sortedDistricts = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
    return [
      { name: '全部行政區', count: relevantGyms.length },
      ...sortedDistricts.map(district => ({ name: district, count: counts[district] }))
    ];
  }, [gyms, activeCity]);

  // Filter Handlers with automatic map camera fly-to
  const handleCityChange = (cityName) => {
    setActiveCity(cityName);
    setActiveDistrict('全部行政區');
    setSelectedGym(null);
    if (CITY_COORDINATES[cityName]) {
      setFocusTarget(CITY_COORDINATES[cityName]);
    }
  };

  const handleDistrictChange = (districtName) => {
    setActiveDistrict(districtName);
    setSelectedGym(null);
    if (districtName === '全部行政區') {
      if (CITY_COORDINATES[activeCity]) {
        setFocusTarget(CITY_COORDINATES[activeCity]);
      }
    } else {
      const target = gyms.find(g => (activeCity === '全部縣市' || g.city === activeCity) && g.district === districtName);
      if (target) {
        setFocusTarget({ lat: target.lat, lng: target.lng, zoom: 14 });
      }
    }
  };

  const handleResetFilters = () => {
    setActiveCity('全部縣市');
    setActiveDistrict('全部行政區');
    setSearchQuery('');
    setSelectedGym(null);
    setFocusTarget(CITY_COORDINATES['全部縣市']);
  };

  // Trigger GPS Geolocation
  const handleTriggerLocate = async () => {
    setIsLocating(true);
    try {
      const pos = await getCurrentPositionAsync();
      setUserLocation({
        lat: pos.lat,
        lng: pos.lng,
        name: `我的即時 GPS 座標 (${pos.lat.toFixed(4)}, ${pos.lng.toFixed(4)})`
      });
      setSelectedPresetLocId(null);
    } catch (err) {
      alert(err.message || '無法取得目前定位，已保留常用商圈');
    } finally {
      setIsLocating(false);
    }
  };

  // Handle Gym Registered Success
  const handleRegisterSuccess = (newGym) => {
    setGyms(prev => [newGym, ...prev]);
    setSelectedGym(newGym);
    setDetailModalGym(newGym);
  };

  // Calculate Distances and Apply Two-tier Filters & Sorting
  const processedGyms = useMemo(() => {
    let list = gyms.map((gym) => {
      const distance = calculateDistanceKm(
        userLocation.lat,
        userLocation.lng,
        gym.lat,
        gym.lng
      );
      return {
        ...gym,
        distanceKm: distance
      };
    });

    // 1. City Filter (第一層縣市篩選)
    if (activeCity !== '全部縣市') {
      list = list.filter(gym => gym.city === activeCity);
    }

    // 2. District Filter (第二層行政區篩選)
    if (activeDistrict !== '全部行政區') {
      list = list.filter(gym => gym.district === activeDistrict);
    }

    // 3. Keyword Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(gym => 
        gym.name.toLowerCase().includes(q) ||
        gym.address.toLowerCase().includes(q) ||
        gym.nearMrt.toLowerCase().includes(q) ||
        gym.district.toLowerCase().includes(q) ||
        gym.city.toLowerCase().includes(q) ||
        (gym.tags && gym.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    // 4. Sorting
    list.sort((a, b) => {
      if (sortBy === 'distance') {
        return (a.distanceKm || 0) - (b.distanceKm || 0);
      }
      if (sortBy === 'price_low') {
        return (a.pricing.offPeakPerHour || 0) - (b.pricing.offPeakPerHour || 0);
      }
      if (sortBy === 'price_peak_low') {
        return (a.pricing.peakPerHour || 0) - (b.pricing.peakPerHour || 0);
      }
      if (sortBy === 'rating') {
        return (b.rating || 0) - (a.rating || 0);
      }
      return 0;
    });

    return list;
  }, [gyms, userLocation, activeCity, activeDistrict, searchQuery, sortBy]);

  const verifiedCount = useMemo(() => gyms.filter(g => g.isVerified).length, [gyms]);

  return (
    <div style={{ height: '100vh', maxHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0a0d14', overflow: 'hidden' }}>
      {/* 1. Header Navbar */}
      <Navbar
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenTerms={() => setIsTermsModalOpen(true)}
        onOpenRegister={() => setIsRegisterModalOpen(true)}
        onOpenTopUp={() => setIsTopUpOpen(true)}
        points={points}
        isLoggedIn={isLoggedIn}
        onToggleLogin={handleToggleLogin}
      />
      {isTopUpOpen && (
        <TopUpModal
          points={points}
          onClose={() => setIsTopUpOpen(false)}
          onTopUp={(pts, price) => {
            setPoints(p => p + pts);
            setIsTopUpOpen(false);
            setToastMessage(`儲值成功！已加值 ${pts} 點 (NT$ ${price})`);
          }}
        />
      )}

      {/* 2. Main Workspace: Left Controls & List + Right Full Map */}
      <main className="app-main" style={{
        flex: 1,
        minHeight: 0,
        height: 'calc(100vh - 68px)',
        maxHeight: 'calc(100vh - 68px)',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Left Column: All Features (Search, Filters, Gym Cards) */}
        <aside
          ref={asideRef}
          className={`app-aside${isDraggingSheet ? ' dragging' : ''}`}
          style={{ '--snap-h': `${SHEET_SNAPS[sheetSnap] * 100}%`,
          width: '490px',
          minWidth: '420px',
          maxWidth: '520px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#0c101a',
          borderRight: '1px solid #1f293d',
          zIndex: 10,
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div
            className="sheet-handle-zone"
            onPointerDown={handleSheetPointerDown}
            onPointerMove={handleSheetPointerMove}
            onPointerUp={handleSheetPointerUp}
            onPointerCancel={handleSheetPointerUp}
            aria-label="展開或收合清單"
          >
            <div className="sheet-handle" />
          </div>
          {/* Top of Sidebar: Two-tier City & District Filter */}
          <div style={{ flexShrink: 0 }}>
            <CoachMapFilter
              activeCity={activeCity}
              onCityChange={handleCityChange}
              activeDistrict={activeDistrict}
              onDistrictChange={handleDistrictChange}
              cityList={cityList}
              districtList={districtList}
              onResetFilters={handleResetFilters}
            />
          </div>

          {/* Scrollable Gym Cards Results List */}
          <div className="app-list-scroll" style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 20px 50px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {/* Header inside list */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#e2e8f0' }}>
                場租健身房清單 ({processedGyms.length})
              </span>
              <span style={{ fontSize: '12px', color: '#b4ff04', fontWeight: 700 }}>
                ✓ 100% 查核保證
              </span>
            </div>

            {/* Cards List */}
            {processedGyms.length === 0 ? (
              <div style={{
                background: '#111827',
                border: '1px dashed #243248',
                borderRadius: '16px',
                padding: '40px 20px',
                textAlign: 'center',
                marginTop: '10px'
              }}>
                <AlertCircle size={36} color="#64748b" style={{ margin: '0 auto 12px' }} />
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f8fafc', marginBottom: '6px' }}>
                  沒有找到符合的場租健身房
                </h3>
                <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '16px' }}>
                  目前所選區域暫無符合條件的場租健身房。
                </p>
                <button
                  onClick={handleResetFilters}
                  style={{
                    background: '#b4ff04',
                    color: '#0a1402',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    fontSize: '13px',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  清除所有篩選條件
                </button>
              </div>
            ) : (
              processedGyms.map((gym) => (
                <GymCard
                  key={gym.id}
                  gym={gym}
                  userLat={userLocation.lat}
                  userLng={userLocation.lng}
                  isSelected={selectedGym && selectedGym.id === gym.id}
                  onSelect={() => setSelectedGym(gym)}
                  onOpenDetail={(targetGym) => setDetailModalGym(targetGym)}
                />
              ))
            )}

            {/* Bottom Recruiting Callout */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(180, 255, 4, 0.12) 0%, rgba(6, 182, 212, 0.08) 100%)',
              border: '1px solid rgba(180, 255, 4, 0.25)',
              borderRadius: '16px',
              padding: '18px',
              marginTop: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              flexShrink: 0
            }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#b4ff04', marginBottom: '4px' }}>
                  您是健身房 / 工作室經營者嗎？
                </div>
                <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: '1.5' }}>
                  加入第一波名冊，讓想找場地的自由教練直接在地圖上看見您的報價表！
                </div>
              </div>
              <button
                onClick={() => setIsRegisterModalOpen(true)}
                style={{
                  background: '#b4ff04',
                  color: '#0a1402',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '9px 16px',
                  fontSize: '13px',
                  fontWeight: 900,
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'center'
                }}
              >
                立即免費登記入駐
              </button>
            </div>
          </div>
        </aside>

        {/* Right Column: Full Interactive Leaflet Map */}
        <section className="app-map" style={{
          flex: 1,
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          background: '#090d16'
        }}>
          <LeafletMap
            gyms={processedGyms}
            userLat={userLocation.lat}
            userLng={userLocation.lng}
            selectedGym={selectedGym}
            onSelectGym={(gym) => setSelectedGym(gym)}
            onOpenDetail={(gym) => setDetailModalGym(gym)}
            focusTarget={focusTarget}
          />
        </section>
      </main>

      {/* 5. Modals */}
      {detailModalGym && (
        <GymDetailModal
          gym={detailModalGym}
          userLat={userLocation.lat}
          userLng={userLocation.lng}
          onClose={() => setDetailModalGym(null)}
        />
      )}

      {isRegisterModalOpen && (
        <GymRegisterModal
          isOpen={isRegisterModalOpen}
          onClose={() => setIsRegisterModalOpen(false)}
          onRegisterSuccess={handleRegisterSuccess}
        />
      )}

      {isMonetizationModalOpen && (
        <MonetizationModal
          isOpen={isMonetizationModalOpen}
          onClose={() => setIsMonetizationModalOpen(false)}
        />
      )}

      {isProModalOpen && (
        <CoachProModal
          isOpen={isProModalOpen}
          onClose={() => setIsProModalOpen(false)}
        />
      )}

      {/* Coach Profile Modal (個人頁面) */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />

      {/* Platform Terms Modal (條款) */}
      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div 
          id="toast-notification"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 3000,
            background: 'rgba(15, 23, 42, 0.96)',
            border: '1px solid #b4ff04',
            color: '#f8fafc',
            padding: '12px 20px',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6), 0 0 16px rgba(180, 255, 4, 0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '13px',
            fontWeight: 700
          }}
        >
          <CheckCircle2 size={18} color="#b4ff04" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
