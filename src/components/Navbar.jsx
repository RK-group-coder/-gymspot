import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  User, 
  FileText, 
  LogOut, 
  Building2, 
  ShieldCheck, 
  ChevronRight,
  Sparkles,
  Wallet,
  Coins,
  Info
} from 'lucide-react';

export default function Navbar({ 
  onOpenProfile, 
  onOpenTerms, 
  onOpenAbout,
  onOpenRegister, 
  onOpenTopUp,
  points = 0,
  isLoggedIn = true, 
  onToggleLogin 
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="app-header" style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: 'rgba(10, 13, 20, 0.94)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid #1e293b',
      padding: '12px 28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: '64px'
    }}>
      {/* 1. Left: Brand Logo (字體往右移適當間距、移除所有懸停特效) */}
      <div 
        id="navbar-brand"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{ 
          cursor: 'pointer',
          userSelect: 'none',
          display: 'flex',
          alignItems: 'center',
          height: '54px'
        }}
      >
        {/* 圖標不用動 */}
        <img 
          className="brand-icon-img"
          src="/brand-icon.png" 
          alt="肌動組圖標"
          style={{
            height: '48px',
            width: 'auto',
            objectFit: 'contain',
            mixBlendMode: 'screen',
            flexShrink: 0
          }}
        />

        {/* 字稍微下移一點、往右移適當間距、並且保持大字體 */}
        <img 
          className="brand-text-img"
          src="/brand-text.png" 
          alt="肌動組 GYMspot"
          style={{
            height: '33px',
            width: 'auto',
            objectFit: 'contain',
            mixBlendMode: 'screen',
            marginLeft: '6px', // 往右移一點，與圖標保持適度舒適間距
            transform: 'translateY(3px)',
            flexShrink: 0
          }}
        />
      </div>

      {/* 2. Right: Points + Hamburger Button (三條線) & Dropdown Menu */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div
        id="navbar-points-badge"
        className="nav-points"
        onClick={onOpenTopUp}
        title="點擊儲值"
        style={{
          display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px',
          borderRadius: '12px', background: 'rgba(180,255,4,0.08)', border: '1px solid rgba(180,255,4,0.5)',
          color: '#b4ff04', fontWeight: 900, fontSize: '14px', cursor: 'pointer', userSelect: 'none'
        }}
      >
        <Coins size={16} color="#b4ff04" /> {points} 點
      </div>
      <div ref={menuRef} style={{ position: 'relative' }}>
        <button
          id="navbar-hamburger-btn"
          className="nav-burger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="選單"
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: isMenuOpen ? '#1e293b' : 'rgba(17, 24, 39, 0.85)',
            border: isMenuOpen ? '1px solid #ffffff' : '1px solid #243248',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.18s ease',
            boxShadow: isMenuOpen ? '0 0 10px rgba(255, 255, 255, 0.35)' : '0 2px 10px rgba(0, 0, 0, 0.3)'
          }}
        >
          {isMenuOpen ? <X size={22} color="#ffffff" /> : <Menu size={22} color="#ffffff" />}
        </button>

        {/* Dropdown Flyout Card */}
        {isMenuOpen && (
          <div 
            id="navbar-dropdown-menu"
            style={{
              position: 'absolute',
              right: 0,
              top: '52px',
              width: '280px',
              background: '#0d131f',
              border: '1px solid #243248',
              borderRadius: '16px',
              boxShadow: '0 20px 45px rgba(0, 0, 0, 0.65)',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              zIndex: 1100,
              animation: 'dropdownFadeIn 0.18s ease-out'
            }}
          >
            {/* User Profile Mini Header */}
            {isLoggedIn ? (
              <div 
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenProfile();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 12px',
                  background: 'rgba(17, 24, 39, 0.9)',
                  borderRadius: '12px',
                  border: '1px solid #1f293d',
                  marginBottom: '8px',
                  cursor: 'pointer',
                  transition: 'background 0.15s'
                }}
              >
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #b4ff04 0%, #ffffff 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '14px',
                  color: '#0a1402'
                }}>
                  AL
                </div>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#f8fafc' }}>
                    林峻 (Alex Lin)
                  </div>
                  <div style={{ fontSize: '11px', color: '#b4ff04', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#b4ff04', display: 'inline-block', boxShadow: '0 0 6px #b4ff04' }}></span>
                    認證自由教練
                  </div>
                </div>
                <ChevronRight size={16} color="#64748b" />
              </div>
            ) : (
              <div style={{
                padding: '12px',
                background: 'rgba(17, 24, 39, 0.7)',
                borderRadius: '12px',
                marginBottom: '8px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>
                  您目前為訪客模式
                </div>
                <button
                  onClick={() => {
                    onToggleLogin();
                    setIsMenuOpen(false);
                  }}
                  style={{
                    width: '100%',
                    background: '#b4ff04',
                    color: '#0a1402',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px',
                    fontSize: '12px',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  以教練身份登入
                </button>
              </div>
            )}

            {/* Menu Item 1: 個人頁面 */}
            <button
              id="menu-btn-profile"
              onClick={() => {
                setIsMenuOpen(false);
                onOpenProfile();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                padding: '10px 14px',
                background: 'transparent',
                border: 'none',
                borderRadius: '10px',
                color: '#e2e8f0',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#1e293b'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <User size={17} color="#ffffff" />
              <span style={{ flex: 1 }}>個人頁面</span>
              <span style={{ fontSize: '11px', color: '#64748b' }}>資歷 / 評價</span>
            </button>

            {/* Menu Item 2: 條款 */}
            <button
              id="menu-btn-terms"
              onClick={() => {
                setIsMenuOpen(false);
                onOpenTerms();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                padding: '10px 14px',
                background: 'transparent',
                border: 'none',
                borderRadius: '10px',
                color: '#e2e8f0',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#1e293b'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <FileText size={17} color="#ffffff" />
              <span style={{ flex: 1 }}>服務條款與隱私權</span>
            </button>

            {/* Menu Item: 關於我們 */}
            <button
              id="menu-btn-about"
              onClick={() => {
                setIsMenuOpen(false);
                onOpenAbout();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                padding: '10px 14px',
                background: 'transparent',
                border: 'none',
                borderRadius: '10px',
                color: '#e2e8f0',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#1e293b'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <Info size={17} color="#ffffff" />
              <span style={{ flex: 1 }}>關於我們</span>
              <span style={{ fontSize: '11px', color: '#64748b' }}>品牌理念</span>
            </button>

            {/* Menu Item 3: 健身房入駐 (保留原重要申請功能) */}
            <button
              id="menu-btn-gym-register"
              onClick={() => {
                setIsMenuOpen(false);
                onOpenRegister();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                padding: '10px 14px',
                background: 'transparent',
                border: 'none',
                borderRadius: '10px',
                color: '#e2e8f0',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#1e293b'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <Building2 size={17} color="#ffffff" />
              <span style={{ flex: 1 }}>場館免費入駐申請</span>
            </button>

            <button
              id="menu-btn-topup"
              onClick={() => { setIsMenuOpen(false); onOpenTopUp(); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '10px 14px',
                background: 'transparent', border: 'none', borderRadius: '10px', color: '#e2e8f0',
                fontSize: '13px', fontWeight: 600, cursor: 'pointer', textAlign: 'left'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#1e293b'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <Wallet size={17} color="#ffffff" />
              <span style={{ flex: 1 }}>點數儲值</span>
              <span style={{ fontSize: '11px', color: '#b4ff04', fontWeight: 800 }}>{points} 點</span>
            </button>

            {/* Divider */}
            <div style={{ height: '1px', background: '#1e293b', margin: '6px 4px' }} />

            {/* Menu Item 4: 退出登入 (or 重新登入) */}
            <button
              id="menu-btn-logout"
              onClick={() => {
                setIsMenuOpen(false);
                onToggleLogin();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                padding: '10px 14px',
                background: 'transparent',
                border: 'none',
                borderRadius: '10px',
                color: isLoggedIn ? '#f87171' : '#ffffff',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = isLoggedIn ? 'rgba(239, 68, 68, 0.12)' : '#1e293b'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <LogOut size={17} color="#ffffff" />
              <span>{isLoggedIn ? '退出登入' : '登入教練帳號'}</span>
            </button>
          </div>
        )}
      </div>
      </div>
    </header>
  );
}
