import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  User, 
  FileText, 
  LogOut, 
  LogIn,
  Building2, 
  ShieldCheck, 
  ChevronRight,
  Sparkles,
  Wallet,
  Coins,
  Info,
  MapPin
} from 'lucide-react';
import AntiFraudModal from './AntiFraudModal';

export default function Navbar({ 
  onOpenProfile, 
  onOpenTerms, 
  onOpenAntiFraud,
  onOpenAbout,
  onOpenRegister, 
  onOpenTopUp,
  onNavigateHome,
  onOpenAdmin,
  currentPath = '/',
  points = 0,
  isLoggedIn = true, 
  userRole = 'coach',
  onToggleLogin,
  onOpenAuth
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAntiFraudOpen, setIsAntiFraudOpen] = useState(false);
  const menuRef = useRef(null);

  // Close on Escape key and prevent background scroll when drawer is open
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isMenuOpen]);

  return (
    <>
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
        onClick={() => {
          if (onNavigateHome) onNavigateHome();
          else window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        style={{ 
          cursor: 'pointer',
          userSelect: 'none',
          display: 'flex',
          alignItems: 'center',
          height: '54px'
        }}
      >
        {/* 圖標 100% 去背 */}
        <img 
          className="brand-icon-img"
          src="/brand-icon-transparent.png" 
          alt="肌動組圖標"
          style={{
            height: '48px',
            width: 'auto',
            objectFit: 'contain',
            flexShrink: 0
          }}
        />

        {/* 字稍微下移一點、往右移適當間距、並且保持大字體 */}
        <img 
          className="brand-text-img"
          src="/brand-text-transparent.png" 
          alt="肌動組 GYMspot"
          style={{
            height: '33px',
            width: 'auto',
            objectFit: 'contain',
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
        title="購買媒合方案"
        style={{
          display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px',
          borderRadius: '12px', background: 'rgba(180,255,4,0.08)', border: '1px solid rgba(180,255,4,0.5)',
          color: '#b4ff04', fontWeight: 900, fontSize: '13.5px', cursor: 'pointer', userSelect: 'none'
        }}
      >
        可預約 {Math.floor(points / 30)} 次
      </div>
      <div ref={menuRef} style={{ position: 'relative' }}>
        <button
          id="navbar-hamburger-btn"
          className="nav-burger"
          onClick={() => setIsMenuOpen(true)}
          aria-label="開啟選單"
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'rgba(17, 24, 39, 0.85)',
            border: '1px solid #243248',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.18s ease',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#ffffff';
            e.currentTarget.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#243248';
            e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
          }}
        >
          <Menu size={22} color="#ffffff" />
        </button>
      </div>
      </div>
    </header>

      {/* 3. Full Right-Side Slide-out Drawer (Rendered outside <header> so backdrop-filter doesn't trap fixed positioning over the header) */}
      {isMenuOpen && (
        <>
          {/* Backdrop Overlay */}
          <div 
            id="drawer-backdrop"
            className="drawer-backdrop"
            onClick={() => setIsMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.35)',
              zIndex: 2500,
              cursor: 'pointer'
            }}
          />

          {/* Right Sliding Drawer Panel */}
          <aside 
            id="navbar-drawer-panel"
            className="drawer-panel"
            aria-label="導航選單抽屜"
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: 'min(360px, 88vw)',
              height: '100vh',
              height: '100dvh',
              background: '#0a0f19',
              borderLeft: '1px solid #1e293b',
              boxShadow: '-12px 0 45px rgba(0, 0, 0, 0.85)',
              zIndex: 2501,
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto'
            }}
          >
            {/* Drawer Top Header: Title + Close Button */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '18px 20px',
              borderBottom: '1px solid #192335'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  fontSize: '15px',
                  fontWeight: 900,
                  letterSpacing: '0.04em',
                  color: '#ffffff',
                  textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
                }}>
                  功能選單
                </span>
              </div>

              {/* Close Button (X) */}
              <button
                id="drawer-close-btn"
                onClick={() => setIsMenuOpen(false)}
                aria-label="關閉選單"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid #2a374f',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.borderColor = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = '#2a374f';
                }}
              >
                <X size={20} color="#ffffff" />
              </button>
            </div>

            {/* Drawer Body Scroll Content */}
            <div style={{
              flex: 1,
              padding: '16px 18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              {/* Points Mini Bar */}
              <div
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenTopUp();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  background: 'transparent',
                  border: '1px solid transparent',
                  marginBottom: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#1a2436';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '14px', color: '#e2e8f0', fontWeight: 700 }}>可用預約次數</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '15px', fontWeight: 900, color: '#b4ff04' }}>{Math.floor(points / 30)} 次</span>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>購買方案</span>
                </div>
              </div>

              {/* Navigation Section Label */}
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, padding: '4px 6px 2px', letterSpacing: '0.06em' }}>
                導航導覽
              </div>

              {/* Menu Item 1: 返回地圖找場館 */}
              <button
                id="menu-btn-home"
                onClick={() => {
                  setIsMenuOpen(false);
                  if (onNavigateHome) onNavigateHome();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '12px 14px',
                  background: currentPath === '/' ? 'rgba(180, 255, 4, 0.08)' : 'transparent',
                  border: currentPath === '/' ? '1px solid rgba(180, 255, 4, 0.28)' : '1px solid transparent',
                  borderRadius: '12px',
                  color: '#e2e8f0',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#1a2436'}
                onMouseLeave={(e) => e.currentTarget.style.background = currentPath === '/' ? 'rgba(180, 255, 4, 0.08)' : 'transparent'}
              >
                <MapPin size={18} color="#b4ff04" />
                <span style={{ flex: 1, color: '#b4ff04', fontWeight: 800 }}>返回地圖找場館</span>
                <span style={{ fontSize: '11px', color: '#64748b' }}>探索地圖</span>
              </button>

              {/* Menu Item 2: 個人頁面 */}
              <button
                id="menu-btn-profile"
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenProfile();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '12px 14px',
                  background: 'transparent',
                  border: '1px solid transparent',
                  borderRadius: '12px',
                  color: '#e2e8f0',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#1a2436'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <User size={18} color="#ffffff" />
                <span style={{ flex: 1 }}>個人頁面</span>
                <span style={{ fontSize: '11px', color: '#64748b' }}>資歷 / 評價</span>
              </button>

              {/* Menu Item 3: 服務條款與隱私權 */}
              <button
                id="menu-btn-terms"
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenTerms();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '12px 14px',
                  background: 'transparent',
                  border: '1px solid transparent',
                  borderRadius: '12px',
                  color: '#e2e8f0',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#1a2436'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <FileText size={18} color="#ffffff" />
                <span style={{ flex: 1 }}>服務條款與隱私權</span>
                <span style={{ fontSize: '11px', color: '#64748b' }}>法律規範</span>
              </button>

              {/* Menu Item 4: 關於我們 */}
              <button
                id="menu-btn-about"
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenAbout();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '12px 14px',
                  background: currentPath === '/about' ? 'rgba(180, 255, 4, 0.08)' : 'transparent',
                  border: currentPath === '/about' ? '1px solid rgba(180, 255, 4, 0.28)' : '1px solid transparent',
                  borderRadius: '12px',
                  color: '#e2e8f0',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#1a2436'}
                onMouseLeave={(e) => e.currentTarget.style.background = currentPath === '/about' ? 'rgba(180, 255, 4, 0.08)' : 'transparent'}
              >
                <Info size={18} color="#ffffff" />
                <span style={{ flex: 1 }}>關於/聯絡我們</span>
                <span style={{ fontSize: '11px', color: '#64748b' }}>品牌理念</span>
              </button>

              {/* Menu Item 5: 場館免費入駐申請 */}
              <button
                id="menu-btn-gym-register"
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenRegister();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '12px 14px',
                  background: 'transparent',
                  border: '1px solid transparent',
                  borderRadius: '12px',
                  color: '#e2e8f0',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#1a2436'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <Building2 size={18} color="#ffffff" />
                <span style={{ flex: 1 }}>場館免費入駐申請</span>
                <span style={{ fontSize: '11px', color: '#b4ff04' }}>審核中</span>
              </button>

              {/* Menu Item 5.5: 審核管理後台 (Admin Panel) */}
              <button
                id="menu-btn-admin"
                onClick={() => {
                  setIsMenuOpen(false);
                  if (onOpenAdmin) onOpenAdmin();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '12px 14px',
                  background: currentPath === '/admin' ? 'rgba(180, 255, 4, 0.08)' : 'transparent',
                  border: currentPath === '/admin' ? '1px solid rgba(180, 255, 4, 0.28)' : '1px solid transparent',
                  borderRadius: '12px',
                  color: '#e2e8f0',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#1a2436'}
                onMouseLeave={(e) => e.currentTarget.style.background = currentPath === '/admin' ? 'rgba(180, 255, 4, 0.08)' : 'transparent'}
              >
                <ShieldCheck size={18} color="#b4ff04" />
                <span style={{ flex: 1 }}>場館入駐審核後台</span>
                <span style={{ fontSize: '10.5px', color: '#b4ff04', background: 'rgba(180, 255, 4, 0.12)', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>ADMIN</span>
              </button>

              {/* Menu Item 6: 預約媒合方案 */}
              <button
                id="menu-btn-topup"
                onClick={() => { 
                  setIsMenuOpen(false); 
                  onOpenTopUp(); 
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '12px 14px',
                  background: 'transparent',
                  border: '1px solid transparent',
                  borderRadius: '12px',
                  color: '#e2e8f0',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#1a2436'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <Wallet size={18} color="#ffffff" />
                <span style={{ flex: 1 }}>預約媒合方案</span>
                <span style={{ fontSize: '12px', color: '#b4ff04', fontWeight: 800 }}>可預約 {Math.floor(points / 30)} 次</span>
              </button>
            </div>

            {/* Drawer Bottom Footer */}
            <div style={{
              padding: '16px 18px',
              borderTop: '1px solid #192335',
              background: 'rgba(10, 15, 25, 0.95)'
            }}>
              {/* Logout / Login button */}
              <button
                id="menu-btn-logout"
                onClick={() => {
                  setIsMenuOpen(false);
                  if (isLoggedIn) {
                    onToggleLogin();
                  } else {
                    if (onOpenAuth) {
                      onOpenAuth();
                    } else {
                      onToggleLogin();
                    }
                  }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '11px',
                  background: isLoggedIn ? 'rgba(239, 68, 68, 0.08)' : 'rgba(180, 255, 4, 0.08)',
                  border: isLoggedIn ? '1px solid rgba(239, 68, 68, 0.25)' : '1px solid rgba(180, 255, 4, 0.3)',
                  borderRadius: '10px',
                  color: isLoggedIn ? '#f87171' : '#b4ff04',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = isLoggedIn ? 'rgba(239, 68, 68, 0.18)' : 'rgba(180, 255, 4, 0.18)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = isLoggedIn ? 'rgba(239, 68, 68, 0.08)' : 'rgba(180, 255, 4, 0.08)';
                }}
              >
                {isLoggedIn ? (
                  <LogOut size={16} color="#f87171" />
                ) : (
                  <LogIn size={16} color="#b4ff04" />
                )}
                <span>{isLoggedIn ? '退出登入' : '登入/註冊'}</span>
              </button>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '7px', marginTop: '12px' }}>
                <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#ffffff', letterSpacing: '0.04em' }}>
                  Follow Us
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <a
                    href="https://www.instagram.com/gymspot_official?knvt=Njh3OHBiMnkxb2N5&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram (@gymspot_official)"
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '7px',
                      background: '#1e1e1e',
                      border: '1px solid #333333',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textDecoration: 'none'
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                  <a
                    href="https://www.threads.com/@gymdpot_official?igshid=NTc4MTIwNjQ2YQ=="
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Threads (@gymdpot_official)"
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '7px',
                      background: '#1e1e1e',
                      border: '1px solid #333333',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textDecoration: 'none'
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="4" />
                      <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
                    </svg>
                  </a>
                </div>
              </div>

              <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '11px', color: '#475569', lineHeight: 1.6 }}>
                <div>
                  肌動組 GYMspot • 自由教練場租媒合平台 ·{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      if (onOpenAntiFraud) onOpenAntiFraud();
                      else setIsAntiFraudOpen(true);
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      padding: 0,
                      color: '#b4ff04',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    防詐騙宣導
                  </button>
                </div>
                <div style={{ color: '#64748b' }}>聯絡信箱：official@gymspot.space</div>
              </div>
            </div>
          </aside>
        </>
      )}
      <AntiFraudModal isOpen={isAntiFraudOpen} onClose={() => setIsAntiFraudOpen(false)} />
    </>
  );
}
