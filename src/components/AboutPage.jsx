import React from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Building2, 
  AlertCircle, 
  CheckCircle2, 
  Dumbbell, 
  Clock, 
  DollarSign, 
  ShieldCheck, 
  Sparkles,
  Mail,
  MessageSquare
} from 'lucide-react';

export default function AboutPage({ onNavigateHome, onOpenRegister, onOpenTerms }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#070a10',
      color: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      {/* 1. Header Navigation */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(7, 10, 16, 0.92)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #1e293b',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div 
          onClick={onNavigateHome}
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <img 
            src="/brand-icon.png" 
            alt="肌動組" 
            style={{ height: '40px', width: 'auto', mixBlendMode: 'screen' }} 
          />
          <img 
            src="/brand-text.png" 
            alt="GYMspot" 
            style={{ height: '26px', width: 'auto', marginLeft: '6px', mixBlendMode: 'screen' }} 
          />
        </div>

        <button
          onClick={onNavigateHome}
          style={{
            background: '#b4ff04',
            color: '#0a1402',
            border: 'none',
            borderRadius: '12px',
            padding: '9px 18px',
            fontSize: '13px',
            fontWeight: 900,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 0 16px rgba(180, 255, 4, 0.35)',
            transition: 'all 0.15s ease'
          }}
        >
          <ArrowLeft size={16} strokeWidth={3} />
          <span>返回地圖找場館</span>
        </button>
      </header>

      {/* 2. Main Article Container */}
      <main style={{
        maxWidth: '920px',
        margin: '0 auto',
        padding: '60px 24px 90px',
        position: 'relative'
      }}>
        {/* Ambient Glow */}
        <div style={{
          position: 'absolute',
          top: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '500px',
          height: '240px',
          background: 'radial-gradient(ellipse at center, rgba(180, 255, 4, 0.12) 0%, rgba(7, 10, 16, 0) 70%)',
          filter: 'blur(50px)',
          zIndex: 0,
          pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Main Title */}
          <div style={{ textAlign: 'center', marginBottom: '36px', marginTop: '10px' }}>
            <h1 style={{
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: 900,
              lineHeight: 1.3,
              margin: '0 0 18px',
              color: '#ffffff',
              letterSpacing: '-0.5px'
            }}>
              為什麼我們創立<br />
              <span>
                「<span style={{ color: '#ffffff', textShadow: '0 0 22px rgba(255, 255, 255, 0.85)' }}>肌動組 GYM</span><span style={{ color: '#b4ff04', textShadow: '0 0 25px rgba(180, 255, 4, 0.55)' }}>spot</span>」
              </span>
            </h1>

            <p style={{
              fontSize: '16px',
              color: '#cbd5e1',
              maxWidth: '680px',
              margin: '0 auto',
              lineHeight: 1.8
            }}>
              由一群資深自由教練與熱愛重訓的工程師共同發起。
            </p>
          </div>

          {/* Section A: 我們在台灣看見了什麼問題？ (純文字自然段落，無列點) */}
          <section style={{
            background: 'rgba(15, 23, 42, 0.65)',
            border: '1px solid #1e293b',
            borderRadius: '24px',
            padding: '36px 32px',
            marginBottom: '36px'
          }}>
            <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#ffffff', margin: '0 0 18px', lineHeight: 1.4 }}>
              我們看見的痛點：要在台灣找一個能帶人的場地，到底有多難？
            </h2>

            <div style={{
              fontSize: '15px',
              lineHeight: 2.1,
              color: '#cbd5e1',
              letterSpacing: '0.3px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}>
              <p style={{ margin: 0 }}>
                我們團隊的幾位夥伴，過去其實也全都是在第一線接案的自由健身教練。在真正出來自己帶課後才深刻發現，要在台灣找到一間「能合法友善帶人」的場租健身房，真的非常非常困難。
              </p>
              <p style={{ margin: 0 }}>
                就算有些店家確實有提供場租服務，資訊也極端不透明——每家店家點開 Google Maps 一家家找，根本看不出哪間能租、哪間不能租；有些店家明明有在做場租，網路上卻連一丁點費用與規則都沒有放出來。往往在手機前面花了好幾個小時、好不容易篩選出幾家後，教練還得親自頂著大太陽一家家實地走訪現場，櫃檯詢問後才能問到真實報價、確認深蹲架台數與器材規格，整個過程既繁瑣又心力交瘁。
              </p>
            </div>
          </section>

          {/* Section B: 於是，肌動組打算如何解決？ (自然流暢段落，無列點) */}
          <section style={{
            background: 'linear-gradient(145deg, rgba(180, 255, 4, 0.08) 0%, rgba(13, 19, 31, 0.95) 100%)',
            border: '1.5px solid rgba(180, 255, 4, 0.4)',
            borderRadius: '24px',
            padding: '36px 32px',
            boxShadow: '0 0 35px rgba(180, 255, 4, 0.12)',
            marginBottom: '40px'
          }}>
            <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#ffffff', margin: '0 0 18px', lineHeight: 1.4 }}>
              於是，我們決定徹底終結這場找場地的折磨
            </h2>

            <div style={{
              fontSize: '15px',
              lineHeight: 2.1,
              color: '#e2e8f0',
              letterSpacing: '0.3px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}>
              <p style={{ margin: 0 }}>
                正因為我們自己親身走過這段到處碰壁的痛苦過程，才下定決心打造「肌動組 GYMspot」。我們要把全台灣所有願意提供場租的健身房與工作室，通通搬上即時地圖——尖峰離峰每小時場租多少、學員要不要加清潔費、有幾座深蹲架、是競技槓還是普通器材，全部實名實價攤開在陽光下，讓教練 10 秒鐘就能比價定位，再也不用逐一私訊碰運氣、更不必頂著風雨四處走訪確認。
              </p>
              <p style={{ margin: 0 }}>
                更重要的是，我們堅持「0 課堂抽成」並提供線上深蹲架秒級排程鎖位，讓自由教練能把 100% 的血汗收益留給自己，到場時保證有專屬器材可用，帶著學員體面安心地專注於每一次訓練。
              </p>
            </div>
          </section>

          {/* Action Callout Box */}
          <div style={{
            background: 'rgba(17, 24, 39, 0.85)',
            border: '1px solid #243248',
            borderRadius: '20px',
            padding: '28px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#ffffff', margin: 0 }}>
              加入肌動組，一起翻轉台灣自由健身生態
            </h3>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0, maxWidth: '520px' }}>
              無論您是尋求優質場地的自由教練，還是希望提高離峰收益的健身房主，肌動組都是您最可靠的夥伴。
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button
                onClick={onNavigateHome}
                style={{
                  background: '#b4ff04',
                  color: '#0a1402',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 0 16px rgba(180, 255, 4, 0.35)'
                }}
              >
                <MapPin size={16} /> 立即開始地圖探索
              </button>

              <button
                onClick={onOpenRegister}
                style={{
                  background: '#1e293b',
                  color: '#ffffff',
                  border: '1px solid #334155',
                  borderRadius: '12px',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Building2 size={16} /> 場館免費入駐申請
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* 3. Footer */}
      <footer style={{
        background: '#04060a',
        borderTop: '1px solid #1e293b',
        padding: '36px 24px'
      }}>
        <div style={{
          maxWidth: '920px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          textAlign: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/brand-icon.png" alt="肌動組" style={{ height: '30px', width: 'auto', mixBlendMode: 'screen' }} />
            <span style={{ fontSize: '14px', fontWeight: 900, color: '#ffffff' }}>肌動組 GYMspot</span>
          </div>

          <div style={{
            display: 'flex',
            gap: '24px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            fontSize: '12.5px',
            color: '#94a3b8'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Mail size={13} color="#b4ff04" /> 客服信箱：contact@gymspot.tw
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MessageSquare size={13} color="#b4ff04" /> 官方 LINE 合作諮詢：@gymspot
            </span>
          </div>

          <div style={{
            display: 'flex',
            gap: '14px',
            fontSize: '11.5px',
            color: '#64748b'
          }}>
            <button
              onClick={onOpenTerms}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#64748b',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              服務條款與隱私權協議
            </button>
            <span>·</span>
            <span>© 2026 肌動組 GYMspot All Rights Reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
