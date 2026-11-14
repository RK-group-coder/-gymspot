import React, { useState } from 'react';
import { X, Loader2, AlertTriangle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function AuthModal({ 
  isOpen, 
  onClose, 
  onLogin, 
  onLoginAsCoach 
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  if (!isOpen) return null;

  const handleRealGoogleLogin = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });

      if (error) {
        throw error;
      }

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Supabase Google OAuth Error:', err);
      setErrorMessage(err.message || 'Google 登入請求失敗');
      setIsLoading(false);
    }
  };

  return (
    <div 
      id="auth-modal-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 3500,
        background: 'rgba(4, 7, 14, 0.88)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        overflowY: 'auto'
      }}
    >
      <div 
        id="auth-modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '430px',
          minHeight: '440px',
          borderRadius: '26px',
          border: '1px solid rgba(180, 255, 4, 0.32)',
          boxShadow: '0 30px 70px -15px rgba(0, 0, 0, 0.95), 0 0 50px rgba(180, 255, 4, 0.16)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          animation: 'fadeInScale 0.22s ease-out',
          /* 健身房背景圖 + 品牌霓虹綠與深邃黑漸層 */
          background: `
            linear-gradient(180deg, rgba(8, 14, 24, 0.82) 0%, rgba(5, 9, 16, 0.95) 60%, rgba(5, 8, 15, 0.98) 100%),
            radial-gradient(circle at 50% 0%, rgba(180, 255, 4, 0.25) 0%, transparent 70%),
            radial-gradient(circle at 50% 100%, rgba(180, 255, 4, 0.12) 0%, transparent 60%),
            url('/gym-dark-bg.jpg') center 30%/cover no-repeat
          `
        }}
      >
        {/* Top Lime Edge Light Bar */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '15%',
          right: '15%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, #b4ff04 50%, transparent 100%)',
          boxShadow: '0 0 14px #b4ff04'
        }} />

        {/* Top Header & Close Button */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '20px 22px 0',
          position: 'relative',
          zIndex: 2
        }}>
          <button
            id="auth-modal-close-btn"
            onClick={onClose}
            aria-label="關閉"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              background: 'rgba(0, 0, 0, 0.45)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#cbd5e1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              backdropFilter: 'blur(6px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.borderColor = 'rgba(180, 255, 4, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.45)';
              e.currentTarget.style.color = '#cbd5e1';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Center Hero: Brand Graphic + Titles */}
        <div style={{
          padding: '0 32px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2
        }}>
          {/* Glowing Brand Icon Badge */}
          <div style={{
            width: '78px',
            height: '78px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, rgba(180, 255, 4, 0.2) 0%, rgba(10, 16, 26, 0.8) 100%)',
            border: '1px solid rgba(180, 255, 4, 0.5)',
            boxShadow: '0 0 35px rgba(180, 255, 4, 0.3), inset 0 0 15px rgba(180, 255, 4, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            backdropFilter: 'blur(8px)'
          }}>
            <img 
              src="/brand-icon-transparent.png" 
              alt="GYMspot" 
              style={{ 
                width: '52px', 
                height: '52px', 
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 10px rgba(180, 255, 4, 0.6))'
              }} 
            />
          </div>

          {/* GYMspot Brand Text */}
          <img 
            src="/brand-text-transparent.png" 
            alt="肌動組 GYMspot" 
            style={{ 
              height: '28px', 
              width: 'auto', 
              objectFit: 'contain', 
              marginBottom: '12px',
              filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.6))'
            }} 
          />

          <h2 style={{
            margin: 0,
            fontSize: '22px',
            fontWeight: 900,
            color: '#ffffff',
            letterSpacing: '0.02em',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.7)'
          }}>
            Google 登入
          </h2>

          <p style={{
            margin: '8px 0 0',
            fontSize: '13px',
            color: '#94a3b8',
            lineHeight: 1.5,
            maxWidth: '300px'
          }}>
            自由教練場租媒合平台<br />
            使用 Google 帳號一秒快速安全登入
          </p>
        </div>

        {/* Bottom Actions: Google Login Button */}
        <div style={{
          padding: '24px 32px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2
        }}>
          {!isLoading ? (
            <button
              id="btn-real-google-login"
              type="button"
              onClick={handleRealGoogleLogin}
              style={{
                width: '100%',
                background: '#ffffff',
                color: '#1f2937',
                border: '1px solid rgba(255, 255, 255, 0.9)',
                borderRadius: '16px',
                padding: '15px 20px',
                fontSize: '15px',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                boxShadow: '0 6px 25px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 255, 255, 0.2)',
                transition: 'all 0.18s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.6), 0 0 30px rgba(180, 255, 4, 0.45)';
                e.currentTarget.style.borderColor = '#b4ff04';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 6px 25px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.9)';
              }}
            >
              {/* Official Google 4-Color G Logo SVG */}
              <svg width="22" height="22" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>使用 Google 帳戶登入</span>
            </button>
          ) : (
            <div style={{
              width: '100%',
              background: 'rgba(180, 255, 4, 0.12)',
              border: '1px solid rgba(180, 255, 4, 0.45)',
              borderRadius: '16px',
              padding: '15px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              color: '#b4ff04',
              fontSize: '14.5px',
              fontWeight: 800,
              boxShadow: '0 0 20px rgba(180, 255, 4, 0.2)'
            }}>
              <Loader2 size={18} style={{ animation: 'spin 0.8s linear infinite' }} />
              <span>正在前往 Google 官方授權...</span>
            </div>
          )}

          {errorMessage && (
            <div style={{
              marginTop: '12px',
              width: '100%',
              padding: '10px 14px',
              borderRadius: '12px',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#f87171',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxSizing: 'border-box'
            }}>
              <AlertTriangle size={15} style={{ flexShrink: 0 }} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Subtitle Brand Footer Note */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontSize: '11px',
            color: '#64748b',
            marginTop: '16px'
          }}>
            <span style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: '#b4ff04',
              boxShadow: '0 0 6px #b4ff04'
            }}></span>
            <span>肌動組 GYMspot • 自由教練場租首選平台</span>
          </div>
        </div>
      </div>
    </div>
  );
}
